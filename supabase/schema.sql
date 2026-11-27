-- ============================================================================
-- LogiMentor AI — Supabase Database Schema (PostgreSQL)
-- Hướng dẫn: Vào Supabase Dashboard -> SQL Editor -> New Query -> Dán toàn bộ
-- đoạn SQL bên dưới rồi bấm RUN.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.interview_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  class_code TEXT NOT NULL DEFAULT 'LOGI-K22A',
  mssv TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL DEFAULT '',
  track_id TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'Junior',
  language TEXT NOT NULL DEFAULT 'vi',
  total_score INTEGER NOT NULL DEFAULT 0 CHECK (total_score >= 0 AND total_score <= 100),
  radar_scores JSONB NOT NULL DEFAULT '{"domain_knowledge":0,"case_study_solving":0,"kpi_data_thinking":0,"communication_star":0}'::jsonb,
  matched_keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
  missing_keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
  feedback TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index giúp Cổng Giảng Viên lọc theo lớp & mảng ngành cực nhanh
CREATE INDEX IF NOT EXISTS idx_sessions_class_code ON public.interview_sessions (class_code);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON public.interview_sessions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_mssv ON public.interview_sessions (mssv);

-- Bật Row Level Security (RLS)
ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;

-- Chính sách cho giai đoạn Pilot: Cho phép Web App đọc & ghi phiên luyện tập qua anon key
DROP POLICY IF EXISTS "Allow Pilot Insert" ON public.interview_sessions;
CREATE POLICY "Allow Pilot Insert"
  ON public.interview_sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow Pilot Select" ON public.interview_sessions;
CREATE POLICY "Allow Pilot Select"
  ON public.interview_sessions
  FOR SELECT
  TO anon, authenticated
  USING (true);
