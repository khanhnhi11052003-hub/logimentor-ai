/**
 * POST /api/ai/voice-turn
 * Xử lý trọn vẹn 1 lượt hội thoại Voice-to-Voice bằng Gemini 2.5 Flash Multimodal:
 * 1. Nghe trực tiếp file ghi âm của ứng viên (hiểu cực chuẩn cả Tiếng Việt lẫn thuật ngữ Logistics tiếng Anh:
 *    FEFO, FIFO, WMS, TMS, OMS, Bill of Lading, C/O Form E, Safety Stock, ROP, Cost per Drop, Overselling...).
 * 2. Quyết định thông minh xem cần hỏi xoáy thêm 1 ý ngắn (Follow-up) hay ghi nhận tích cực để chuyển sang câu tiếp theo.
 * 3. Sinh lời đáp tự nhiên, ấm áp như Quản lý Nhân sự / Vận hành thật đang đối thoại trực tiếp (tách biệt sạch 100% Việt hoặc Anh).
 */

const VOICE_TURN_SCHEMA = {
  type: "OBJECT",
  required: ["transcript", "needs_followup", "display_reply", "spoken_reply"],
  properties: {
    transcript: {
      type: "STRING",
      description:
        "Bản phiên âm sạch sẽ, chính xác câu trả lời giọng nói của ứng viên, viết đúng các thuật ngữ chuyên ngành Logistics và con số."
    },
    needs_followup: {
      type: "BOOLEAN",
      description:
        "Đặt true nếu câu trả lời của ứng viên còn quá ngắn, thiếu con số tính toán trọng tâm của Case Study hoặc bỏ sót ý chính và chưa từng hỏi phụ ở câu này. Đặt false nếu ứng viên đã trả lời khá đầy đủ hoặc đã hỏi phụ rồi."
    },
    display_reply: {
      type: "STRING",
      description:
        "Lời phản hồi ngắn gọn (1-3 câu) hiển thị trên khung chat của Mentor: khen đúng ý ứng viên vừa nêu, sau đó hỏi thêm 1 câu gợi mở (nếu needs_followup=true) hoặc lời khích lệ chuyển câu (nếu needs_followup=false)."
    },
    spoken_reply: {
      type: "STRING",
      description:
        "Kịch bản lời nói dành riêng cho bộ đọc giọng nói AI: tự nhiên như người thật nói chuyện trực tiếp. Nếu lang='vi' thì viết THUẦN VIỆT 100% (không chêm từ tiếng Anh gây ngọng, viết rõ đơn vị tiền tệ/phần trăm). Nếu lang='en' thì viết 100% Tiếng Anh chuẩn tự nhiên."
    }
  }
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-gemini-api-key");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Use POST /api/ai/voice-turn" });
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
        message: "Missing GEMINI_API_KEY"
      });
    }

    const {
      audioDataUrl = "",
      draftText = "",
      lang = "vi",
      level = "Junior",
      mentorName = "Anh Hoàng Nam",
      trackName = "Logistics",
      questionText = "",
      expectedKeywords = [],
      caseHint = "",
      fallbackProbe = "",
      alreadyAskedFollowup = false,
      hasNextQuestion = true,
      nextQuestionNumber = 2
    } = body;

    const isEn = lang === "en";
    const parts = [];

    if (audioDataUrl && audioDataUrl.includes(",")) {
      const [meta, base64Data] = audioDataUrl.split(",");
      const mimeMatch = meta.match(/data:([^;]+)/);
      const cleanMime = mimeMatch ? mimeMatch[1] : "audio/webm";
      if (base64Data && base64Data.length > 64) {
        parts.push({
          inlineData: {
            mimeType: cleanMime,
            data: base64Data
          }
        });
      }
    }

    const systemPrompt = isEn
      ? `You are ${mentorName}, a warm, sharp, and encouraging ${level}-level Logistics Interviewer (${trackName}).
TASKS:
1. If audio is attached, transcribe the candidate's spoken answer accurately into English (preserving exact logistics terms like WMS, TMS, FEFO, Bill of Lading, Safety Stock, C/O Form E, and numbers). If audio is silent/empty, use the provided draftText.
2. Decide needs_followup:
   - If alreadyAskedFollowup is true, you MUST set needs_followup = false.
   - Otherwise, set needs_followup = true ONLY IF the candidate missed key quantitative calculations or gave a very brief/incomplete answer (< 30 words or missing core constraint).
3. Write display_reply and spoken_reply in 100% NATURAL CONVERSATIONAL ENGLISH (zero Vietnamese words):
   - Specifically acknowledge 1 concrete point the candidate just said so they feel truly heard!
   - If needs_followup = true: naturally ask 1 concise, supportive follow-up question (inspired by: "${fallbackProbe}").
   - If needs_followup = false: give a warm, brief 1-sentence compliment on their answer${hasNextQuestion ? ` (do NOT ask Question ${nextQuestionNumber} yet—just acknowledge smoothly in 1 short sentence)` : ", and congratulate them on completing the final question"}.`
      : `Bạn là ${mentorName}, người phỏng vấn thực chiến thân thiện, điềm đạm và sắc bén ngành ${trackName} (cấp độ ${level}).
NHIỆM VỤ:
1. Nếu có đính kèm file ghi âm (inlineData), hãy nghe và phiên âm CHÍNH XÁC lời nói của sinh viên sang văn bản Tiếng Việt trong trường "transcript" (tự động viết chuẩn các thuật ngữ chuyên ngành sinh viên nói như WMS, TMS, OMS, FEFO, FIFO, Quarantine, Cycle Count, Safety Stock, ROP, Cost per Drop, FADR, NDR, B/L, C/O Form E, HS Code, DEM/DET và các con số tính toán; bỏ từ đệm ờ, à). Nếu không có file âm thanh hoặc âm thanh rỗng, dùng nội dung draftText.
2. Quyết định "needs_followup":
   - Nếu alreadyAskedFollowup = true: BẮT BUỘC đặt needs_followup = false.
   - Nếu alreadyAskedFollowup = false: Đặt needs_followup = true khi câu trả lời quá ngắn (< 25 từ) hoặc bỏ sót con số tính toán/ràng buộc cốt lõi của tình huống; ngược lại nếu sinh viên trả lời đã có hướng giải quyết và số liệu hợp lý thì đặt needs_followup = false.
3. Viết "display_reply" và "spoken_reply" tự nhiên, ấm áp như đang ngồi trò chuyện trực tiếp 1-1:
   - Nhắc lại ngắn gọn 1 ý đúng mà sinh viên vừa nói để sinh viên thấy người phỏng vấn thực sự lắng nghe mình!
   - Nếu needs_followup = true: Hỏi gợi mở thêm 1 câu ngắn gọn, tự nhiên (bám sát ý gợi ý: "${fallbackProbe}").
   - Nếu needs_followup = false: Khen/ghi nhận ngắn gọn trong ĐÚNG 1 câu súc tích${hasNextQuestion ? ` (chưa tự đặt câu hỏi số ${nextQuestionNumber}, chỉ chốt 1 câu chuyển ý mượt mà)` : " và chúc mừng bạn ấy vừa hoàn thành câu hỏi cuối cùng"}.
   - QUAN TRỌNG TUYỆT ĐỐI CHO "spoken_reply": Phải viết THUẦN VIỆT 100% để bộ đọc giọng nói phát âm mượt như người thật (ví dụ viết "hệ thống quản lý kho" thay vì WMS, "nguyên tắc hết hạn trước xuất trước" thay vì FEFO, "tiền thu hộ" thay vì COD, viết rõ đơn vị đồng/phần trăm, TUYỆT ĐỐI không chêm tiếng Anh lộn xộn trong spoken_reply).`;

    parts.push({
      text: JSON.stringify({
        current_question: questionText,
        expected_keywords: expectedKeywords,
        case_calculation_hint: caseHint,
        already_asked_followup: Boolean(alreadyAskedFollowup),
        browser_draft_transcript_fallback: draftText || ""
      })
    });

    const candidateConfigs = [
      { model: "gemini-3.8-flash", thinkingConfig: { thinkingLevel: "LOW" } },
      { model: "gemini-3.5-flash-lite" },
      { model: "gemini-3.8-flash" }
    ];
    let lastErr = "";
    let lastStatus = 500;

    for (const cfg of candidateConfigs) {
      try {
        const genConfig = {
          temperature: 0.35,
          maxOutputTokens: 500,
          responseMimeType: "application/json",
          responseSchema: VOICE_TURN_SCHEMA
        };
        if (cfg.thinkingConfig) {
          genConfig.thinkingConfig = cfg.thinkingConfig;
        }

        const resp = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${cfg.model}:generateContent`,
          {
            method: "POST",
            signal: AbortSignal.timeout(25000),
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": apiKey
            },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: systemPrompt }]
              },
              contents: [{ role: "user", parts }],
              generationConfig: genConfig
            })
          }
        );

        if (!resp.ok) {
          lastStatus = resp.status;
          lastErr = await resp.text();
          if (resp.status === 401 || resp.status === 403) break;
          continue;
        }

        const data = await resp.json();
        const rawJson = (data?.candidates?.[0]?.content?.parts || [])
          .filter(p => !p.thought)
          .map(p => p.text || "")
          .join("")
          .trim();
        if (!rawJson) continue;

        const parsed = JSON.parse(rawJson);
        if (alreadyAskedFollowup) {
          parsed.needs_followup = false;
        }
        return res.status(200).json(parsed);
      } catch (loopErr) {
        lastErr = loopErr?.message || String(loopErr);
        continue;
      }
    }

    return res.status(lastStatus).json({
      error: "GEMINI_VOICE_TURN_FAILED",
      details: lastErr.slice(0, 500)
    });
  } catch (err) {
    return res.status(500).json({
      error: "INTERNAL_VOICE_TURN_ERROR",
      message: err?.message || String(err)
    });
  }
}
