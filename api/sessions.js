/**
 * /api/sessions — Vercel Serverless API kết nối Supabase PostgreSQL
 *
 * Biến môi trường cần cài trong Vercel Dashboard (Settings -> Environment Variables):
 *   - SUPABASE_URL: https://xxxx.supabase.co
 *   - SUPABASE_ANON_KEY (hoặc SUPABASE_SERVICE_ROLE_KEY)
 *
 * Hỗ trợ:
 *   - GET  /api/sessions?class_code=LOGI-K22A  -> Trả về danh sách phiên thi cho Cổng Giảng viên
 *   - POST /api/sessions                       -> Lưu kết quả buổi phỏng vấn của sinh viên lên Cloud
 */

import { verifyTeacherToken } from "./teacher-auth.js";

function getSupabaseConfig() {
  const url = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";
  return { url, key };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-teacher-token");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { url, key } = getSupabaseConfig();
  if (!url || !key) {
    return res.status(503).json({
      configured: false,
      error: "Supabase chưa được cấu hình biến môi trường (SUPABASE_URL / SUPABASE_ANON_KEY) trên Vercel."
    });
  }

  const baseEndpoint = `${url}/rest/v1/interview_sessions`;
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json"
  };

  try {
    if (req.method === "GET") {
      const teacherToken = String(req.headers["x-teacher-token"] || "");
      if (!verifyTeacherToken(teacherToken)) {
        return res.status(401).json({
          configured: true,
          error: "TEACHER_AUTH_REQUIRED",
          message: "Vui lòng đăng nhập quyền Giảng viên để xem dữ liệu lớp học."
        });
      }
      const classCode = (req.query?.class_code || "").trim();
      const params = new URLSearchParams({
        select: "*",
        order: "created_at.desc",
        limit: "500"
      });
      if (classCode && classCode.toUpperCase() !== "ALL") {
        params.append("class_code", `eq.${classCode}`);
      }

      const resp = await fetch(`${baseEndpoint}?${params.toString()}`, {
        method: "GET",
        headers
      });

      if (!resp.ok) {
        const errText = await resp.text();
        return res.status(resp.status).json({ configured: true, error: errText });
      }

      const rows = await resp.json();
      return res.status(200).json({ configured: true, sessions: rows });
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

      const payload = {
        session_id: String(body.session_id || `sess_${Date.now()}`).slice(0, 80),
        class_code: String(body.class_code || "LOGI-K22A").trim().toUpperCase().slice(0, 32),
        mssv: String(body.mssv || "SV-DEMO").trim().slice(0, 32),
        student_name: String(body.student_name || "Sinh viên Logistics").trim().slice(0, 120),
        student_email: String(body.student_email || "").trim().slice(0, 120),
        track_id: String(body.track_id || "WMS").trim().slice(0, 32),
        level: String(body.level || "Junior").trim().slice(0, 32),
        language: String(body.language || "vi").trim().slice(0, 12),
        total_score: Math.max(0, Math.min(100, Math.round(Number(body.total_score) || 0))),
        radar_scores: body.radar_scores || {
          domain_knowledge: 0,
          case_study_solving: 0,
          kpi_data_thinking: 0,
          communication_star: 0
        },
        matched_keywords: Array.isArray(body.matched_keywords) ? body.matched_keywords.slice(0, 30) : [],
        missing_keywords: Array.isArray(body.missing_keywords) ? body.missing_keywords.slice(0, 30) : [],
        feedback: String(body.feedback || "").slice(0, 1000)
      };

      const resp = await fetch(baseEndpoint, {
        method: "POST",
        headers: {
          ...headers,
          Prefer: "resolution=merge-duplicates,return=representation"
        },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        const errText = await resp.text();
        return res.status(resp.status).json({ configured: true, error: errText });
      }

      const saved = await resp.json();
      return res.status(201).json({ configured: true, saved: saved[0] || payload });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err) {
    return res.status(500).json({
      configured: true,
      error: "Cloud Sync Error",
      message: err?.message || String(err)
    });
  }
}
