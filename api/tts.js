/**
 * GET /api/tts?tl=vi&q=...
 * Serverless TTS Audio Proxy cho Vercel — giúp trình duyệt phát giọng đọc mượt mà
 * khi máy tính/điện thoại người dùng không có sẵn giọng Web Speech API tiếng Việt.
 */

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const text = String(req.query?.q || "").trim().slice(0, 200);
  const tl = String(req.query?.tl || "vi").trim().slice(0, 10);

  if (!text) {
    return res.status(400).json({ error: "Missing query text (q)" });
  }

  try {
    const ttsUrl = `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(
      tl
    )}&q=${encodeURIComponent(text)}`;

    const upstream = await fetch(ttsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Referer: "https://translate.google.com/"
      }
    });

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: `TTS upstream error ${upstream.status}` });
    }

    const arrayBuffer = await upstream.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.status(200).send(buffer);
  } catch (err) {
    return res.status(500).json({ error: "TTS Proxy Error", message: err?.message || String(err) });
  }
}
