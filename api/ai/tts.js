/**
 * POST /api/ai/tts
 * Giọng đọc AI Studio tự nhiên, giàu cảm xúc sử dụng Google Gemini 2.5 Native Neural TTS
 * (`gemini-2.5-flash-preview-tts` / `gemini-2.5-flash-tts`).
 *
 * Đặc điểm vượt trội:
 * - Đọc trọn vẹn cả đoạn dài trong 1 hơi mượt mà (không cắt vụn câu 190 ký tự).
 * - Điều khiển cảm xúc, nhịp thở, lên giọng cuối câu hỏi như Quản lý Nhân sự / Vận hành thật.
 * - Tự động đóng gói PCM 16-bit 24kHz sang chuẩn RIFF WAV (`audio/wav`) tương thích mọi trình duyệt & iOS/Android.
 */

const ALLOWED_VOICES = new Set([
  "Aoede",
  "Charon",
  "Orus",
  "Kore",
  "Puck",
  "Leda",
  "Fenrir",
  "Zephyr"
]);

function pickDefaultVoiceByLevel(level = "Junior", requestedVoice = "") {
  if (requestedVoice && ALLOWED_VOICES.has(requestedVoice)) {
    return requestedVoice;
  }
  if (level === "Intern/Fresher") return "Aoede"; // Giọng nữ ấm áp, thân thiện, khích lệ
  if (level === "Senior") return "Orus"; // Giọng nam chững chạc, điềm tĩnh cấp Giám đốc
  return "Charon"; // Giọng nam tự nhiên, gần gũi cấp Quản lý Vận hành
}

function buildStyleDirectorPrefix(lang = "vi", level = "Junior") {
  if (lang === "en") {
    if (level === "Intern/Fresher") {
      return "Say in a warm, friendly, encouraging mentor voice at a natural conversational pace";
    }
    if (level === "Senior") {
      return "Say in a calm, poised, executive director voice with natural conversational flow";
    }
    return "Say in a natural, engaging, conversational interviewer voice at a smooth pace";
  }

  if (lang === "zh") {
    if (level === "Intern/Fresher") {
      return "Say in a warm, friendly, encouraging standard Mandarin Chinese mentor voice at a natural conversational pace";
    }
    if (level === "Senior") {
      return "Say in a calm, poised, executive standard Mandarin Chinese voice with natural conversational flow";
    }
    return "Say in a natural, engaging, conversational standard Mandarin Chinese interviewer voice at a smooth pace";
  }

  // Tiếng Việt: Hướng dẫn phong cách phát âm chuẩn giọng người Việt trò chuyện tự nhiên, ấm áp, không đọc như trả bài
  if (level === "Intern/Fresher") {
    return "Say in a warm, gentle, friendly Vietnamese mentor voice, speaking smoothly and conversationally like chatting in person";
  }
  if (level === "Senior") {
    return "Say in a calm, confident, natural Vietnamese executive voice with smooth conversational pacing";
  }
  return "Say in a warm, natural, conversational Vietnamese interviewer voice with smooth pacing and human intonation";
}

/**
 * Đóng gói dữ liệu âm thanh thô Linear PCM 16-bit (little-endian) thành file WAV chuẩn 44-byte header
 */
function pcm16ToWavBuffer(pcmBuffer, sampleRate = 24000, numChannels = 1) {
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);

  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16); // Subchunk1Size (16 cho PCM)
  header.writeUInt16LE(1, 20); // AudioFormat (1 = Linear PCM)
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-gemini-api-key");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Use POST /api/ai/tts" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const apiKey = (
      req.headers["x-gemini-api-key"] ||
      body.apiKey ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      ""
    ).trim();

    if (!apiKey) {
      return res.status(400).json({
        error: "MISSING_GEMINI_KEY",
        message: "Chưa cấu hình GEMINI_API_KEY trên Vercel hoặc trong phần Cài đặt Voice AI."
      });
    }

    const rawText = String(body.text || "").trim().slice(0, 2800);
    if (!rawText) {
      return res.status(400).json({ error: "Missing text payload" });
    }

    const lang = body.lang === "en" ? "en" : "vi";
    const level = String(body.level || "Junior");
    const voiceName = pickDefaultVoiceByLevel(level, String(body.voice || "").trim());
    const stylePrefix = buildStyleDirectorPrefix(lang, level);
    const fullPrompt = `${stylePrefix}: ${rawText}`;

    const candidateModels = [
      "gemini-3.8-flash-lite-tts",
      "gemini-3.8-flash-tts",
      "gemini-2.5-flash-preview-tts",
      "gemini-2.5-flash-tts"
    ];
    let lastStatus = 500;
    let lastErrorText = "";

    for (const modelName of candidateModels) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
        const resp = await fetch(endpoint, {
          method: "POST",
          signal: AbortSignal.timeout(12000),
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: fullPrompt }]
              }
            ],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName
                  }
                }
              }
            }
          })
        });

        if (!resp.ok) {
          lastStatus = resp.status;
          lastErrorText = await resp.text();
          if (resp.status === 401 || resp.status === 403) break;
          continue;
        }

        const data = await resp.json();
        const audioPart = (data?.candidates?.[0]?.content?.parts || []).find(
          p => p.inlineData && p.inlineData.data
        );

        if (!audioPart) {
          lastStatus = 502;
          lastErrorText = "Gemini TTS response did not contain audio inlineData";
          continue;
        }

        const rawAudioBytes = Buffer.from(audioPart.inlineData.data, "base64");
        const mimeType = String(audioPart.inlineData.mimeType || "audio/L16;rate=24000").toLowerCase();

        if (
          mimeType.includes("wav") ||
          mimeType.includes("mpeg") ||
          mimeType.includes("mp3") ||
          mimeType.includes("ogg")
        ) {
          res.setHeader("Content-Type", audioPart.inlineData.mimeType);
          res.setHeader("X-TTS-Model", modelName);
          res.setHeader("Cache-Control", "public, max-age=3600");
          return res.status(200).send(rawAudioBytes);
        }

        const rateMatch = mimeType.match(/rate=(\d+)/);
        const sampleRate = rateMatch ? parseInt(rateMatch[1], 10) : 24000;
        const wavBuffer = pcm16ToWavBuffer(rawAudioBytes, sampleRate, 1);

        res.setHeader("Content-Type", "audio/wav");
        res.setHeader("X-Gemini-Voice", voiceName);
        res.setHeader("X-TTS-Model", modelName);
        res.setHeader("Cache-Control", "public, max-age=3600");
        return res.status(200).send(wavBuffer);
      } catch (loopErr) {
        lastErrorText = loopErr?.message || String(loopErr);
        continue;
      }
    }

    return res.status(lastStatus).json({
      error: "GEMINI_TTS_FAILED",
      details: lastErrorText.slice(0, 500)
    });
  } catch (err) {
    return res.status(500).json({
      error: "INTERNAL_TTS_ERROR",
      message: err?.message || String(err)
    });
  }
}
