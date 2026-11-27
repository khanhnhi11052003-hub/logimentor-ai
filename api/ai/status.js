/**
 * GET /api/ai/status
 * Kiểm tra trạng thái cấu hình GEMINI_API_KEY trên máy chủ Vercel (không bao giờ lộ khóa bí mật ra client).
 * Giúp toàn bộ sinh viên tự động được kích hoạt chế độ "Gemini 2.5 Studio Voice-to-Voice" ngay khi mở trang!
 */

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-gemini-api-key");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const hasServerKey = Boolean(
    (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) ||
      (process.env.GOOGLE_API_KEY && process.env.GOOGLE_API_KEY.trim())
  );

  return res.status(200).json({
    ok: true,
    geminiServerConfigured: hasServerKey,
    ttsModel: "gemini-2.5-flash-preview-tts",
    brainModel: "gemini-3.8-flash",
    voices: ["Aoede", "Charon", "Orus", "Kore", "Puck", "Leda"]
  });
}
