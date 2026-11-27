/**
 * /api/teacher-auth — Xác thực quyền Giảng viên cho Cổng Quản lý Lớp
 *
 * Biến môi trường tùy chọn trên Vercel:
 *   - TEACHER_PASSCODE: Mã bảo vệ Giảng viên (mặc định: "LOGIMENTOR-GV-2026" nếu chưa cài)
 *   - TEACHER_AUTH_SECRET: Khóa ký token HMAC (tự động dẫn xuất từ passcode nếu chưa cài)
 */

import crypto from "crypto";

function getTeacherPasscode() {
  return (process.env.TEACHER_PASSCODE || "LOGIMENTOR-GV-2026").trim();
}

function getSigningSecret() {
  return (
    process.env.TEACHER_AUTH_SECRET ||
    `logimentor-hmac-${getTeacherPasscode()}-${process.env.SUPABASE_ANON_KEY || "secret"}`
  );
}

export function createTeacherToken(ttlMs = 12 * 60 * 60 * 1000) {
  const exp = Date.now() + ttlMs;
  const payload = Buffer.from(JSON.stringify({ role: "teacher", exp })).toString("base64url");
  const sig = crypto
    .createHmac("sha256", getSigningSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyTeacherToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expectedSig = crypto
    .createHmac("sha256", getSigningSecret())
    .update(payload)
    .digest("base64url");

  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return parsed?.role === "teacher" && Number(parsed?.exp) > Date.now();
  } catch (_) {
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-teacher-token");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    const token = String(req.headers["x-teacher-token"] || "");
    return res.status(200).json({ authenticated: verifyTeacherToken(token) });
  }

  if (req.method === "POST") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const inputPasscode = String(body.passcode || "").trim();
      const expected = getTeacherPasscode();

      const a = Buffer.from(inputPasscode);
      const b = Buffer.from(expected);
      const matched = a.length === b.length && crypto.timingSafeEqual(a, b);

      if (!matched) {
        return res.status(401).json({
          ok: false,
          error: "INVALID_PASSCODE",
          message: "Mã xác thực Giảng viên không đúng."
        });
      }

      const token = createTeacherToken();
      return res.status(200).json({ ok: true, token });
    } catch (err) {
      return res.status(400).json({ ok: false, error: err?.message || "Bad Request" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
