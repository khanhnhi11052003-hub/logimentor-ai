/**
 * LogiMentor AI — EdTech Student Edition (v2.0 UI & True Bilingual Neural Voice Engine)
 * - Giao diện chuẩn Linear / Notion hiện đại, dùng hệ thống Vector SVG sắc nét (không dùng emoji thô)
 * - Bộ đọc giọng nói Song ngữ Việt – Anh thế hệ mới:
 *   + Chặn triệt để giọng SAPI5 cổ điển ("Microsoft An") gây méo tiếng & dồn chữ
 *   + Ưu tiên giọng Azure Online Natural đa ngôn ngữ (Edge) hoặc tách luồng Song ngữ thực thụ (vi-VN + en-US trên Chrome)
 *   + Chuẩn hóa số tiền, ký hiệu toán học (>=, <=, 02x40'HC, 11/11), ngắt nghỉ lấy hơi 300ms tự nhiên giữa các mệnh đề.
 */

(function () {
  const DATA = window.LOGISTICS_DATA;

  const savedProvider =
    sessionStorage.getItem("logimentor_provider") ||
    localStorage.getItem("logimentor_provider") ||
    sessionStorage.getItem("logivoice_provider") ||
    localStorage.getItem("logivoice_provider") ||
    "builtin";

  const savedGeminiKey =
    sessionStorage.getItem("logimentor_gemini_key") ||
    localStorage.getItem("logimentor_gemini_key") ||
    sessionStorage.getItem("logivoice_gemini_key") ||
    localStorage.getItem("logivoice_gemini_key") ||
    "";

  const savedSttEngine =
    sessionStorage.getItem("logimentor_stt_engine") ||
    localStorage.getItem("logimentor_stt_engine") ||
    "webspeech_hybrid";

  const savedCozeBotId =
    sessionStorage.getItem("logimentor_coze_bot_id") ||
    localStorage.getItem("logimentor_coze_bot_id") ||
    "";

  const savedCozeToken =
    sessionStorage.getItem("logimentor_coze_token") ||
    localStorage.getItem("logimentor_coze_token") ||
    "";

  const state = {
    currentView: "home",
    selectedTrackId: DATA.tracks[1].id,
    selectedLevel: "Junior",
    selectedLang: "vi",
    startMode: "full",
    detectedRegion: "north",

    activeSessionId: "",
    questionsPlan: [],
    currentQIndex: 0,
    hasAskedFollowUpByQ: {},
    primaryDraftByQ: {},
    qaAnswersByQ: {},

    // Voice, Barge-in & Mic State
    enableAiVoice: true,
    enableBargeIn: true,
    voiceRate: 0.96,
    isAiSpeaking: false,
    isAnalyzing: false,
    isMicRecording: false,
    userStoppedMic: true,
    activeMicTargetTextarea: null,
    activeMicRetryBtn: null,
    committedSpeechPrefix: "",
    lastAiSpokenText: "",
    spokenClausesSoFar: [],
    interruptionLog: [],
    lastAiBubbleEl: null,
    activeBrainAbortController: null,
    questionAskedAt: 0,
    firstTypedOrSpokenAt: 0,
    elapsedSec: 0,
    elapsedInterval: null,

    // Mini Calculator
    calcExpr: "",
    calcCurrentResult: "0",
    calcJustEvaluated: false,

    // 3-Stage Voice AI Config (STT / Brain / TTS)
    sttEngine: savedSttEngine, // 'webspeech_hybrid' | 'gemini_audio'
    aiProvider: savedProvider, // 'builtin' | 'gemini' | 'coze'
    geminiApiKey: savedGeminiKey,
    cozeBotId: savedCozeBotId,
    cozeApiToken: savedCozeToken,
    supabaseUrl: localStorage.getItem("logimentor_supabase_url") || "https://gcamnevqiwbdoqkfwexi.supabase.co",
    supabaseAnonKey: localStorage.getItem("logimentor_supabase_anon_key") || "sb_publishable_LhfjnyQxP1WSSYOlx2-LPg_Lt32C04n",
    cloudTeacherSessions: [],
    isCloudConnected: false,
    studentProfile: (() => {
      try {
        const raw = localStorage.getItem("logimentor_student_profile_v1");
        if (raw) return JSON.parse(raw);
      } catch (_) {}
      return { name: "", mssv: "", email: "", classCode: "LOGI-K22A" };
    })(),
    currentReportSession: null
  };

  // ==================== CRISP LUCIDE VECTOR ICONS ====================
  const ICONS = {
    truck: `<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`,
    warehouse: `<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><rect width="12" height="12" x="6" y="10"/></svg>`,
    bike: `<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>`,
    ship: `<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/></svg>`,
    "git-fork": `<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg>`,
    "bar-chart-3": `<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`,
    bot: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>`,
    mic: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
    table: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 9v12"/></svg>`,
    arrowUpRight: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    cross: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    refresh: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`
  };

  // ==================== DOM REFERENCES ====================
  const el = {};
  function initDOM() {
    const ids = [
      "view-home", "view-interview", "view-report",
      "btnBrandHome", "streakCountText", "sessionCountText", "btnOpenHistoryDrawer",
      "btnOpenApiModal", "apiConnectionDot", "apiStatusShortText",
      "domainsGrid",
      "btnBackHomeFromRoom", "roomTrackBadge", "roomLevelBadge", "roomDialectBadge",
      "questionStepperPills", "roomElapsedTimer", "btnFinishSessionEarly",
      "interviewLayoutGrid", "mentorStageCard", "mentorAvatarIcon", "mentorNameLabel", "mentorRoleChip",
      "mentorStatusText", "waveformVisualizer", "voiceRateSelect", "btnReplayQuestionAudio", "chkEnableAiVoice", "chkEnableBargeIn",
      "chatStream", "keywordHintPanel", "hintKeywordsTags", "hintGuideBullets",
      "btnMicRecord", "micBtnLabel", "btnToggleKeywordHints",
      "starBadgeS", "starBadgeT", "starBadgeA", "starBadgeR",
      "vietlishQuickChips", "answerTranscriptInput", "micLiveNotice", "btnClearTranscript", "btnSubmitAnswer",
      "caseStudyAside", "btnToggleMobileSheet", "mobileSheetToggleLabel",
      "caseDomainBadge", "caseBoardTitle", "caseBoardTableMount", "caseNotesList",
      "tabBtnCalculator", "tabBtnScratchpad", "utilPaneCalculator", "utilPaneScratchpad",
      "calcExpressionDisplay", "calcResultDisplay", "calcLastHistory", "btnInsertCalcToAnswer",
      "scratchpadTextarea",
      "btnBackHomeFromReport", "reportSessionIdBadge", "btnToggleScoreJson", "btnPrintReport",
      "rawJsonPanel", "rawJsonPre", "btnCopyRawJson",
      "reportScoreCircleArc", "reportTotalScoreNum", "reportTrackBadge", "reportLevelBadge",
      "reportRecommendationTitle", "reportTimestampSub", "reportExecSummaryBox",
      "reportRadarMount", "reportRadarBarsMount", "reportQuestionsMount",
      "quickStartModal", "qsDomainIconBox", "qsDomainCodeBadge", "qsDomainTitle", "qsCasePreviewText",
      "btnCloseQuickStart", "qsLevelGroup", "qsLangGroup", "qsStartModeGroup", "btnCancelQuickStart", "btnStartPracticeNow",
      "historyModal", "btnClearAllHistory", "btnCloseHistoryModal", "historySessionsList",
      "apiConfigModal", "btnCloseApiModal", "sttEngineSelect", "aiProviderSelect", "geminiKeyFieldWrap",
      "geminiApiKeyInput", "cozeConfigFieldWrap", "cozeBotIdInput", "cozeApiTokenInput",
      "chkRememberGeminiKey", "btnCancelApiModal", "btnSaveApiModal",
      "view-teacher", "btnOpenTeacherPortal", "btnBackHomeFromTeacher", "btnExportTeacherExcel",
      "teacherDomainFilter", "teacherSearchInput",
      "tkActiveStudents", "tkTotalSessionsSub", "tkClassAvgScore", "tkPassRateSub",
      "tkStrongestAxis", "tkStrongestAxisScore", "tkWeakestAxis", "tkWeakestAxisScore",
      "teacherVisibleCountBadge", "teacherStudentsTbody", "teacherKnowledgeGapsList", "teacherActionInsightBox",
      "teacherStudentModal", "tsModalMssvBadge", "tsModalTrackBadge", "tsModalStudentName",
      "tsModalMetaSub", "btnCloseTeacherStudentModal", "tsModalTotalScore", "tsModalRadarMount",
      "tsModalRadarBarsMount", "tsModalMatchedKws", "tsModalMissingKws", "tsModalFeedbackBox",
      "btnOkTeacherStudentModal",
      "dmLevelBadge", "dmXpText", "dmGoalLabel", "dmProgressFill", "btnQuickLaunchRecommended",
      "teacherCloudStatusBadge", "teacherCloudDot", "teacherCloudStatusText", "btnSyncTeacherCloud",
      "teacherClassCodeInput", "qsStudentName", "qsStudentMssv", "qsStudentEmail", "qsClassCode",
      "supabaseUrlInput", "supabaseAnonKeyInput"
    ];
    ids.forEach(id => {
      el[id] = document.getElementById(id);
    });
  }

  function escapeHtml(raw) {
    if (raw === null || raw === undefined) return "";
    return String(raw)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getTrackById(trackId) {
    return DATA.tracks.find(t => t.id === trackId) || DATA.tracks[0];
  }

  function getActiveTrack() {
    return getTrackById(state.selectedTrackId);
  }

  function getActiveMentor() {
    return DATA.mentorsByLevel[state.selectedLevel] || DATA.mentorsByLevel.Junior;
  }

  // ==================== GAMIFICATION: STREAK & SESSIONS ====================
  const SESSIONS_STORAGE_KEY = "logimentor_student_sessions_v1";
  const STREAK_STORAGE_KEY = "logimentor_student_streak_v1";

  function getTodayIsoDate() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")}`;
  }

  function getSavedSessions() {
    try {
      const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return [];
  }

  function saveSessionRecord(sessionObj) {
    const list = getSavedSessions().filter(s => s.sessionId !== sessionObj.sessionId);
    sessionObj.studentProfile = { ...(state.studentProfile || {}) };
    list.unshift(sessionObj);
    const trimmed = list.slice(0, 30);
    trimmed.forEach((item, idx) => {
      if (idx >= 5 && Array.isArray(item.answers)) {
        item.answers.forEach(a => a && delete a.audioDataUrl);
      }
    });
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(trimmed));
    } catch (_) {
      trimmed.forEach(item => {
        if (Array.isArray(item.answers)) item.answers.forEach(a => a && delete a.audioDataUrl);
      });
      try {
        localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(trimmed));
      } catch (__) {}
    }
    recordDailyPracticeStreak();
    refreshNavbarGamificationPills();
    syncSessionToCloud(sessionObj);
  }

  function saveStudentProfileFromModal() {
    const profile = {
      name: (el.qsStudentName?.value || "").trim(),
      mssv: (el.qsStudentMssv?.value || "").trim(),
      email: (el.qsStudentEmail?.value || "").trim(),
      classCode: ((el.qsClassCode?.value || "LOGI-K22A").trim() || "LOGI-K22A").toUpperCase()
    };
    state.studentProfile = profile;
    try {
      localStorage.setItem("logimentor_student_profile_v1", JSON.stringify(profile));
    } catch (_) {}
  }

  function buildCloudPayloadFromSession(sess) {
    const ev = sess.evaluation || {};
    const qEvals = Array.isArray(ev.question_evaluations) ? ev.question_evaluations : [];
    const matched = new Set();
    const missing = new Set();
    qEvals.forEach(q => {
      (q.matched_keywords || []).forEach(k => matched.add(k));
      (q.missing_keywords || []).forEach(k => missing.add(k));
    });
    const prof = sess.studentProfile || state.studentProfile || {};
    return {
      session_id: sess.sessionId || `sess_${Date.now()}`,
      class_code: (prof.classCode || "LOGI-K22A").toUpperCase(),
      mssv: prof.mssv || `SV-${String(Date.now()).slice(-4)}`,
      student_name: prof.name || "Sinh viên Thực hành",
      student_email: prof.email || "sinhvien@edu.vn",
      track_id: sess.trackId || "WMS",
      level: sess.level || "Junior",
      language: sess.language || "vi",
      total_score: Number(ev.total_score) || 0,
      radar_scores: ev.radar_scores || {
        domain_knowledge: 0,
        case_study_solving: 0,
        kpi_data_thinking: 0,
        communication_star: 0
      },
      matched_keywords: Array.from(matched),
      missing_keywords: Array.from(missing),
      feedback: qEvals[0]?.feedback || ev.executive_summary?.weaknesses?.[0] || ""
    };
  }

  async function syncSessionToCloud(sessionObj) {
    const payload = buildCloudPayloadFromSession(sessionObj);
    const isHttp = window.location.protocol === "http:" || window.location.protocol === "https:";

    // 1. Ưu tiên Serverless API trên Vercel (/api/sessions)
    if (isHttp) {
      try {
        const resp = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (resp.ok) {
          state.isCloudConnected = true;
          return true;
        }
      } catch (_) {}
    }

    // 2. Fallback: Gọi trực tiếp Supabase REST API nếu đã nhập URL & Anon Key trong cấu hình
    const sbUrl = (state.supabaseUrl || "").replace(/\/+$/, "");
    const sbKey = state.supabaseAnonKey || "";
    if (sbUrl && sbKey) {
      try {
        const resp = await fetch(`${sbUrl}/rest/v1/interview_sessions`, {
          method: "POST",
          headers: {
            apikey: sbKey,
            Authorization: `Bearer ${sbKey}`,
            "Content-Type": "application/json",
            Prefer: "resolution=merge-duplicates"
          },
          body: JSON.stringify(payload)
        });
        if (resp.ok) {
          state.isCloudConnected = true;
          return true;
        }
      } catch (_) {}
    }
    return false;
  }

  function updateTeacherCloudStatusUI(connected, labelText) {
    if (el.teacherCloudStatusBadge) {
      el.teacherCloudStatusBadge.classList.toggle("live", Boolean(connected));
    }
    if (el.teacherCloudStatusText) {
      el.teacherCloudStatusText.textContent = labelText;
    }
  }

  async function fetchTeacherSessionsFromCloud() {
    const classCode = ((el.teacherClassCodeInput?.value || "LOGI-K22A").trim() || "LOGI-K22A").toUpperCase();
    const isHttp = window.location.protocol === "http:" || window.location.protocol === "https:";
    updateTeacherCloudStatusUI(false, "Đang đồng bộ Cloud...");

    // 1. Thử lấy từ Vercel Serverless /api/sessions
    if (isHttp) {
      try {
        const resp = await fetch(`/api/sessions?class_code=${encodeURIComponent(classCode)}`);
        if (resp.ok) {
          const data = await resp.json();
          if (data && data.configured && Array.isArray(data.sessions)) {
            state.cloudTeacherSessions = data.sessions;
            state.isCloudConnected = true;
            updateTeacherCloudStatusUI(true, `Cloud Live (${data.sessions.length} bài)`);
            renderTeacherPortal();
            return true;
          }
        }
      } catch (_) {}
    }

    // 2. Fallback: Lấy trực tiếp từ Supabase REST API nếu đã cấu hình URL + Anon Key
    const sbUrl = (state.supabaseUrl || "").replace(/\/+$/, "");
    const sbKey = state.supabaseAnonKey || "";
    if (sbUrl && sbKey) {
      try {
        const params = new URLSearchParams({ select: "*", order: "created_at.desc", limit: "500" });
        if (classCode !== "ALL") params.append("class_code", `eq.${classCode}`);
        const resp = await fetch(`${sbUrl}/rest/v1/interview_sessions?${params.toString()}`, {
          headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` }
        });
        if (resp.ok) {
          const rows = await resp.json();
          if (Array.isArray(rows)) {
            state.cloudTeacherSessions = rows;
            state.isCloudConnected = true;
            updateTeacherCloudStatusUI(true, `Supabase Live (${rows.length} bài)`);
            renderTeacherPortal();
            return true;
          }
        }
      } catch (_) {}
    }

    state.isCloudConnected = false;
    updateTeacherCloudStatusUI(false, "Chế độ Demo / Local");
    renderTeacherPortal();
    return false;
  }

  function getStreakInfo() {
    try {
      const raw = localStorage.getItem(STREAK_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return { count: 1, lastDate: getTodayIsoDate() };
  }

  function recordDailyPracticeStreak() {
    const today = getTodayIsoDate();
    const info = getStreakInfo();
    if (info.lastDate === today) {
      info.count = Math.max(1, Number(info.count) || 1);
    } else {
      const prev = new Date(info.lastDate + "T00:00:00");
      const curr = new Date(today + "T00:00:00");
      const diffDays = Math.round((curr - prev) / 86400000);
      info.count = diffDays === 1 ? (Number(info.count) || 1) + 1 : 1;
      info.lastDate = today;
    }
    try {
      localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(info));
    } catch (_) {}
    return info;
  }

  function refreshNavbarGamificationPills() {
    const sessions = getSavedSessions();
    const streak = getStreakInfo();
    if (el.streakCountText) el.streakCountText.textContent = `${streak.count} ngày Streak`;
    if (el.sessionCountText) el.sessionCountText.textContent = `${sessions.length} buổi đã tập`;

    // Cập nhật Daily Mission & XP Card
    const xp = sessions.length * 50;
    const todayIso = getTodayIsoDate();
    const todaySessions = sessions.filter(s => (s.createdAt || "").slice(0, 10) === todayIso).length;
    const levelLabel =
      xp >= 300 ? "🏆 Chuyên gia Supply Chain" : xp >= 100 ? "🚀 Thực chiến Junior" : "⚡ Tân binh Logistics";

    if (el.dmLevelBadge) el.dmLevelBadge.textContent = levelLabel;
    if (el.dmXpText) el.dmXpText.textContent = `${xp} XP`;
    if (el.dmGoalLabel) {
      el.dmGoalLabel.innerHTML =
        todaySessions >= 1
          ? `Mục tiêu hôm nay: <strong>${todaySessions}/1 buổi ✓ Đạt!</strong>`
          : `Mục tiêu hôm nay: <strong>0/1 buổi</strong>`;
    }
    if (el.dmProgressFill) {
      el.dmProgressFill.style.width = `${todaySessions >= 1 ? 100 : 12}%`;
    }

    const isGeminiReady = state.aiProvider === "gemini" && Boolean(state.geminiApiKey);
    const isCozeReady = state.aiProvider === "coze" && Boolean(state.cozeBotId && state.cozeApiToken);
    if (el.apiConnectionDot) {
      el.apiConnectionDot.classList.toggle("connected", isGeminiReady || isCozeReady);
    }
    if (el.apiStatusShortText) {
      el.apiStatusShortText.textContent = isGeminiReady
        ? "Gemini 2.0 Live"
        : isCozeReady
        ? "Coze Bot Live"
        : "Voice AI (0đ)";
    }

    renderDomainsGrid();
  }

  // ==================== ROUTING ====================
  function switchView(viewName, hashTarget) {
    if (viewName !== "interview") {
      stopAllAiSpeech();
      stopElapsedTimer();
      if (state.isMicRecording && state.activeMicTargetTextarea === el.answerTranscriptInput) {
        stopMicRecording();
      }
    }

    state.currentView = viewName;
    const views = {
      home: el["view-home"],
      interview: el["view-interview"],
      report: el["view-report"],
      teacher: el["view-teacher"]
    };
    Object.entries(views).forEach(([k, dom]) => {
      if (dom) dom.classList.toggle("active", k === viewName);
    });

    if (hashTarget && window.location.hash !== `#${hashTarget}`) {
      try {
        history.replaceState(null, "", `#${hashTarget}`);
      } catch (_) {
        window.location.hash = hashTarget;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleHashChange() {
    const rawHash = (window.location.hash || "#/").replace(/^#/, "");
    if (rawHash === "/teacher") {
      renderTeacherPortal();
      switchView("teacher", "/teacher");
      fetchTeacherSessionsFromCloud();
      return;
    } else if (rawHash.startsWith("/report/")) {
      const sessionId = rawHash.replace("/report/", "").trim();
      const found = getSavedSessions().find(s => s.sessionId === sessionId);
      if (found) {
        renderReportView(found);
        switchView("report", `/report/${found.sessionId}`);
        return;
      }
    } else if (rawHash.startsWith("/interview") && state.questionsPlan.length > 0) {
      switchView("interview", "/interview");
      return;
    }
    switchView("home", "/");
  }

  // ==================== HOME PAGE: 6 BENTO DOMAIN CARDS ====================
  function renderDomainsGrid() {
    if (!el.domainsGrid) return;
    const sessions = getSavedSessions();
    el.domainsGrid.innerHTML = DATA.tracks
      .map(track => {
        const iconSvg = ICONS[track.lucideIcon] || ICONS.warehouse;
        const cleanCaseLabel = (track.casePreviewLabel || "").replace(/^📊\s*/, "");
        const trackSessions = sessions.filter(s => s.trackId === track.id);
        const bestScore =
          trackSessions.length > 0
            ? Math.max(...trackSessions.map(s => Number(s.evaluation?.total_score) || 0))
            : null;
        const masteryHtml =
          bestScore !== null
            ? `<span class="domain-mastery-pill mastered tabular-nums">Cao nhất: ${bestScore}đ ★</span>`
            : `<span class="domain-mastery-pill">Chưa thử</span>`;

        return `
          <article
            class="domain-card"
            data-track-id="${escapeHtml(track.id)}"
            style="--card-accent: ${escapeHtml(track.accentColor)};"
            tabindex="0"
            role="button"
            aria-label="Luyện tập ngành ${escapeHtml(track.name)}"
          >
            <div class="domain-card-top">
              <div
                class="domain-icon-frame"
                style="background:${escapeHtml(track.pastelBg)}; border-color:${escapeHtml(track.pastelBorder)}; color:${escapeHtml(track.accentColor)};"
              >
                ${iconSvg}
              </div>
              ${masteryHtml}
            </div>

            <div>
              <h3 class="domain-card-title">${escapeHtml(track.name)}</h3>
              <p class="domain-card-desc" style="margin-top:0.28rem;">${escapeHtml(track.description)}</p>
            </div>

            <div class="domain-case-preview">
              <span style="color:${escapeHtml(track.accentColor)}; display:inline-flex;">${ICONS.table}</span>
              <span>${escapeHtml(cleanCaseLabel)}</span>
            </div>

            <div class="domain-card-cta" style="color:${escapeHtml(track.accentColor)};">
              <span>Luyện ngay</span>
              <span class="cta-arrow-circle">${ICONS.arrowUpRight}</span>
            </div>
          </article>
        `;
      })
      .join("");

    el.domainsGrid.querySelectorAll(".domain-card").forEach(card => {
      const openModal = () => openQuickStartModal(card.getAttribute("data-track-id"));
      card.addEventListener("click", openModal);
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal();
        }
      });
    });
  }

  function openQuickStartModal(trackId) {
    state.selectedTrackId = trackId || DATA.tracks[0].id;
    const track = getActiveTrack();
    if (el.qsDomainIconBox) {
      el.qsDomainIconBox.innerHTML = ICONS[track.lucideIcon] || ICONS.warehouse;
      el.qsDomainIconBox.style.background = track.pastelBg;
      el.qsDomainIconBox.style.color = track.accentColor;
    }
    if (el.qsDomainCodeBadge) {
      el.qsDomainCodeBadge.textContent = `CHUYÊN NGÀNH ${track.code}`;
      el.qsDomainCodeBadge.style.color = track.accentColor;
    }
    if (el.qsDomainTitle) el.qsDomainTitle.textContent = track.name;
    if (el.qsCasePreviewText) {
      el.qsCasePreviewText.textContent = (track.casePreviewLabel || "").replace(/^📊\s*/, "");
    }
    const prof = state.studentProfile || {};
    if (el.qsStudentName) el.qsStudentName.value = prof.name || "";
    if (el.qsStudentMssv) el.qsStudentMssv.value = prof.mssv || "";
    if (el.qsStudentEmail) el.qsStudentEmail.value = prof.email || "";
    if (el.qsClassCode) el.qsClassCode.value = prof.classCode || "LOGI-K22A";
    if (el.quickStartModal) el.quickStartModal.classList.add("open");
  }

  // ==================== TRUE BILINGUAL VI/EN NEURAL VOICE ENGINE ====================
  const synth = window.speechSynthesis || null;
  let activeAudioEl = null;
  let speechTokenCounter = 0;
  let speechPauseTimer = null;

  function ensureVoicesLoaded(timeoutMs = 280) {
    if (!synth) return Promise.resolve([]);
    const existing = synth.getVoices();
    if (existing && existing.length > 0) return Promise.resolve(existing);
    return new Promise(resolve => {
      let resolved = false;
      const done = () => {
        if (resolved) return;
        resolved = true;
        resolve(synth.getVoices() || []);
      };
      synth.addEventListener("voiceschanged", done, { once: true });
      setTimeout(done, timeoutMs);
    });
  }

  /**
   * Lựa chọn giọng đọc thông minh:
   * - TUYỆT ĐỐI LOẠI BỎ giọng SAPI5 offline cổ điển trên Windows ("Microsoft An", "Microsoft David", "Microsoft Zira")
   *   vì các giọng offline này đọc tiếng Anh sai hoàn toàn và bị dính/dồn chữ.
   * - Ưu tiên số 1: Giọng đa ngôn ngữ Azure Neural Online trên Edge ("Microsoft HoaiMy Online (Natural)", "Microsoft NamMinh Online (Natural)").
   * - Ưu tiên số 2: Cặp giọng song ngữ Chrome ("Google Tiếng Việt" cho mệnh đề Việt + "Google US English" cho thuật ngữ Anh).
   */
  function pickBestVoices(voices) {
    const isLegacyOfflineSapi = v =>
      /Microsoft\s+(An|David|Zira|Mark|Hazel|George)\b/i.test(v.name) && !/Online|Natural/i.test(v.name);

    // 1. Tìm giọng Azure Multilingual Online Natural (đọc tốt cả Việt & Anh trong 1 hơi)
    const azureViNatural = voices.find(
      v => v.lang.toLowerCase().startsWith("vi") && /Online.*Natural|HoaiMy|NamMinh/i.test(v.name)
    );
    const azureEnNatural = voices.find(
      v =>
        v.lang.toLowerCase().startsWith("en") &&
        /Online.*Natural|Aria|Jenny|Guy|Ava|Andrew/i.test(v.name)
    );

    // 2. Tìm giọng Google Neural (Chrome)
    const googleVi = voices.find(
      v => v.lang.toLowerCase().startsWith("vi") && /Google/i.test(v.name) && !isLegacyOfflineSapi(v)
    );
    const googleEn =
      voices.find(v => /Google US English/i.test(v.name)) ||
      voices.find(v => v.lang.toLowerCase().startsWith("en-us") && !isLegacyOfflineSapi(v)) ||
      voices.find(v => v.lang.toLowerCase().startsWith("en") && !isLegacyOfflineSapi(v));

    // 3. Bất kỳ giọng vi-VN tốt nào không nằm trong danh sách SAPI5 lỗi, hoặc fallback giọng vi-VN mặc định của máy
    const cleanOtherVi = voices.find(
      v => v.lang.toLowerCase().startsWith("vi") && !isLegacyOfflineSapi(v)
    );
    const anyViFallback = voices.find(v => v.lang.toLowerCase().startsWith("vi"));
    const anyEnFallback = voices.find(v => v.lang.toLowerCase().startsWith("en"));

    return {
      multilingualViVoice: azureViNatural || null,
      viVoice: azureViNatural || googleVi || cleanOtherVi || anyViFallback || null,
      enVoice: azureEnNatural || googleEn || anyEnFallback || null
    };
  }

  function unlockAudioPlayback() {
    try {
      if (synth) {
        if (synth.paused) synth.resume();
        const silent = new SpeechSynthesisUtterance("");
        silent.volume = 0;
        synth.speak(silent);
      }
      const AudioContextCls = window.AudioContext || window.webkitAudioContext;
      if (AudioContextCls && audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }
    } catch (_) {}
  }

  /**
   * Tiền xử lý văn bản trước khi đọc (Chống 100% lỗi đọc sai số tiền, ký hiệu toán học và dính chữ):
   * - Xóa dấu phẩy ngăn cách hàng nghìn kiểu Anh (1,150 -> 1150) để tiếng Việt không đọc thành "một phẩy một năm không"
   * - Đổi >=, <=, $, 02x40'HC, giờ giấc 06:00 – 09:00, ngày Sale 11/11 sang lời nói tự nhiên
   * - Biến các từ viết tắt đánh vần (WMS -> W M S, SKU -> S K U, KPI -> K P I) để giọng Anh đọc rõ từng chữ cái
   * - Thêm dấu chấm nghỉ hơi hợp lý tại các dấu hai chấm, gạch ngang và mục đánh số (1), (2), (3).
   */
  function prepareCleanSpokenScript(rawText, lang) {
    if (!rawText) return "";
    let s = String(rawText)
      .replace(/[*#_~`]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (lang === "en") {
      return s
        .replace(/02x40'HC/gi, "two 40-foot High Cube containers")
        .replace(/40'HC/gi, "40-foot High Cube")
        .replace(/>=\s*(\d+(?:\.\d+)?%?)/g, "at least $1")
        .replace(/<=\s*(\d[\d,.]*)/g, "at most $1")
        .replace(/\(1\)/g, ". First, ")
        .replace(/\(2\)/g, ". Second, ")
        .replace(/\(3\)/g, ". Third, ")
        .replace(/\bB\/L\b/g, "Bill of Lading")
        .replace(/\bC\/O\b/g, "Certificate of Origin")
        .replace(/\bWMS\b/g, "W M S")
        .replace(/\bTMS\b/g, "T M S")
        .replace(/\bOMS\b/g, "O M S")
        .replace(/\bSKU\b/g, "S K U")
        .replace(/\bSKUs\b/g, "S K Us")
        .replace(/\bKPI\b/g, "K P I")
        .replace(/\bKPIs\b/g, "K P Is")
        .replace(/\bSLA\b/g, "S L A")
        .replace(/\bROP\b/g, "R O P")
        .replace(/\bATP\b/g, "A T P")
        .replace(/\bNDR\b/g, "N D R")
        .replace(/\bFADR\b/g, "F A D R")
        .replace(/\bUAT\b/g, "U A T")
        .replace(/\bBRDs?\b/g, "B R D")
        .replace(/\s*—\s*/g, ". ")
        .replace(/\s+/g, " ")
        .trim();
    }

    // XỬ LÝ VĂN BẢN TIẾNG VIỆT PHA THUẬT NGỮ TIẾNG ANH:
    // 1. Ngày hội Sale 11/11, 12/12
    s = s
      .replace(/\b11\/11\b/g, "11 tháng 11")
      .replace(/\b12\/12\b/g, "12 tháng 12");

    // 2. Xóa dấu phẩy hàng nghìn trong con số (VD: 11,500 -> 11500; 4,050,000 -> 4050000; $85,000 -> $85000)
    s = s.replace(/(\d),(?=\d{3}\b)/g, "$1").replace(/(\d),(?=\d{3})/g, "$1");

    // 3. Chuyển đổi tiền tệ, container, giờ giấc và toán tử so sánh sang lời nói rõ ràng
    s = s
      .replace(/\$(\d+)/g, "$1 đô la Mỹ")
      .replace(/(\d+)đ\/đơn/gi, "$1 đồng một đơn")
      .replace(/(\d+)đ\/thùng/gi, "$1 đồng một thùng")
      .replace(/(\d+)đ\/chuyến/gi, "$1 đồng một chuyến")
      .replace(/(\d+)đ\b/gi, "$1 đồng")
      .replace(/02x40'HC/gi, "2 container 40 feet cao")
      .replace(/40'HC/gi, "container 40 feet cao")
      .replace(/(\d{1,2}):00\s*[–-]\s*(\d{1,2}):00/g, "từ $1 giờ đến $2 giờ")
      .replace(/\b0(\d):(\d{2})\b/g, "$1 giờ $2 phút")
      .replace(/\b(\d{1,2}):00\b/g, "$1 giờ")
      .replace(/\b(\d{1,2}):(\d{2})\b/g, "$1 giờ $2 phút")
      .replace(/>=\s*(\d+(?:\.\d+)?)\s*%/g, "từ $1 phần trăm trở lên")
      .replace(/<=\s*(\d+(?:\.\d+)?)\s*%/g, "tối đa $1 phần trăm")
      .replace(/>=\s*(\d+)/g, "tối thiểu $1")
      .replace(/<=\s*(\d+)/g, "tối đa $1")
      .replace(/>\s*(\d+(?:\.\d+)?)\s*tấn/gi, "trên $1 tấn")
      .replace(/\(1\)/g, ". Thứ nhất, ")
      .replace(/\(2\)/g, ". Thứ hai, ")
      .replace(/\(3\)/g, ". Thứ ba, ");

    // 4. Bỏ ngoặc đơn lặp lại dư thừa làm câu đọc bị dài dòng dồn chữ, nhưng GIỮ NGUYÊN thuật ngữ tiếng Anh chuẩn!
    s = s
      .replace(/\(\s*([A-Za-z0-9\s\/&-]{2,35})\s*\)/g, ", $1, ")
      .replace(/\bB\/L\b/g, "Bill of Lading")
      .replace(/\bP\/L\b/g, "Packing List")
      .replace(/\bC\/O Form E\b/gi, "C O Form E")
      .replace(/\bC\/O\b/g, "C O")
      .replace(/\bD\/O\b/g, "D O")
      .replace(/\bDEM\/DET\b/g, "DEM and DET")
      .replace(/\bVNACCS\/VCIS\b/gi, "VNACCS")
      .replace(/\bS&OP\b/g, "S and O P")
      .replace(/\bWMS\b/g, "W M S")
      .replace(/\bTMS\b/g, "T M S")
      .replace(/\bOMS\b/g, "O M S")
      .replace(/\bERP\b/g, "E R P")
      .replace(/\bSKU\b/g, "S K U")
      .replace(/\bKPI\b/g, "K P I")
      .replace(/\bSLA\b/g, "S L A")
      .replace(/\bCOD\b/g, "C O D")
      .replace(/\bROP\b/g, "R O P")
      .replace(/\bATP\b/g, "A T P")
      .replace(/\bNDR\b/g, "N D R")
      .replace(/\bFADR\b/g, "F A D R")
      .replace(/\bNFR\b/g, "N F R")
      .replace(/\bIRA\b/g, "I R A")
      .replace(/\bPOD\b/g, "P O D")
      .replace(/\bPDA\b/g, "P D A")
      .replace(/\bUAT\b/g, "U A T")
      .replace(/\bBRD\b/g, "B R D")
      .replace(/\bFOB\b/g, "F O B")
      .replace(/\bCIF\b/g, "C I F")
      .replace(/\bFCA\b/g, "F C A")
      .replace(/\bFCL\b/g, "F C L")
      .replace(/\bLCL\b/g, "L C L")
      .replace(/\bHS Code\b/gi, "H S Code")
      .replace(/\bCBM\b/g, "C B M")
      .replace(/\s*[—–]\s*/g, ". ")
      .replace(/\s*:\s*/g, ". ")
      .replace(/,\s*,+/g, ", ")
      .replace(/\.\s*\.+/g, ". ")
      .replace(/\s+/g, " ")
      .trim();

    return s;
  }

  /**
   * Tách văn bản thành các câu ngắn vừa hơi thở (tối đa ~130 ký tự) để có nhịp nghỉ tự nhiên 280ms giữa các câu.
   */
  function splitIntoBreathableClauses(text) {
    const sentences = text
      .split(/(?<=[.!?])\s+|\n+/)
      .map(x => x.trim())
      .filter(Boolean);

    const clauses = [];
    sentences.forEach(sent => {
      if (sent.length <= 135) {
        clauses.push(sent);
      } else {
        const subParts = sent.split(/,\s+/);
        let acc = "";
        subParts.forEach(part => {
          if ((acc + ", " + part).length > 130 && acc) {
            clauses.push(acc.trim());
            acc = part;
          } else {
            acc = acc ? acc + ", " + part : part;
          }
        });
        if (acc.trim()) clauses.push(acc.trim());
      }
    });
    return clauses;
  }

  /**
   * Bộ tách từ Song ngữ Việt – Anh (Dành cho trình duyệt Chrome / Cloud TTS chỉ có giọng đơn ngữ):
   * Phát hiện chính xác cụm từ tiếng Anh chuyên ngành để giao cho giọng Bản xứ Mỹ (en-US) đọc tròn vành rõ chữ!
   */
  const ENGLISH_TERM_REGEX =
    /\b(?:Time Windows?|Empty Miles|Backhaul|Route Optimization|Milk-run|Geofencing|Telematics|Load Factor|Fill Rate|Split Delivery|Sub-contractors?|Truck No-show Rate|Damage Rate|Cost per Ton-Km|ABC Analysis|Slotting|Re-slotting|Fast-moving|Golden Zone|Batch Picking|Wave Picking|Single Picking|Pick Frequency|Staging|Outbound|Inbound|Cut-off time|Cut-off|FEFO|FIFO|Quarantine|Audit Trail|Cycle Count|Root Cause Analysis|Inventory Adjustment|Blind Count|Cost per Successful Drop|Cost per Drop|Mega Sale|Dynamic Routing|Smart Locker|Capacity Planning|Part-time|Overflow|Incoterms|Local Charges|Nomination|Bill of Lading|Packing List|Commercial Invoice|Invoice|Gross Weight|Free time|Manifest|e-Manifest|Form E|H S Code|DEM and DET|DEM|Advance Ruling|Post-Clearance Audit|Bullwhip Effect|S and O P|Sell-out|Sell-in|Forecast Error|Forecast Bias|MAPE|WAPE|Days of Supply|Daily Usage|Lead Time|Safety Stock|Dual Sourcing|Line Stoppage|Service Level|Inventory Turnover|Consignment|Gemba Walk|Shadowing|User Stories|User Story|As-Is|To-Be|Exception Flows?|Edge Cases?|Acceptance Criteria|Happy Path|Partial Receipt|Offline Queue|Overselling|Oversell|Flash Sale|Cron-job|Buffer Stock|Webhook|Real-time Sync|Soft Allocation|Master Data Governance|Master Data|Cubiscan|UoM Conversion|Validation Rule|Single Source of Truth|Intern|Fresher|Junior|Senior|Ops Mentor|Logistics Mentor|Supply Chain Director|STAR|OTIF|VNACCS|SLOB|W M S|T M S|O M S|E R P|S K U|K P I|S L A|C O D|R O P|A T P|N D R|F A D R|N F R|I R A|P O D|P D A|U A T|B R D|F O B|C I F|F C A|F C L|L C L|C O|D O|C B M|P K G 20|M I L K 01|B E E F 05|A I R F R Y 09)\b/gi;

  function tokenizeBilingualSegments(clauseText) {
    const segments = [];
    let lastIndex = 0;
    ENGLISH_TERM_REGEX.lastIndex = 0;
    let match;

    while ((match = ENGLISH_TERM_REGEX.exec(clauseText)) !== null) {
      const beforeVi = clauseText.slice(lastIndex, match.index).replace(/^[\s,]+|[\s,]+$/g, "");
      if (beforeVi) {
        segments.push({ lang: "vi", text: beforeVi });
      }
      segments.push({ lang: "en", text: match[0].trim() });
      lastIndex = match.index + match[0].length;
    }

    const tailVi = clauseText.slice(lastIndex).replace(/^[\s,]+|[\s,]+$/g, "");
    if (tailVi) {
      segments.push({ lang: "vi", text: tailVi });
    }
    return segments.length ? segments : [{ lang: "vi", text: clauseText }];
  }

  // Cập nhật 3 trạng thái trực quan của AI Mentor Stage (#4F46E5 Indigo, #10B981 Emerald, Shimmer)
  function setMentorStageVisual(mode, statusMessage, waveRunning = false) {
    if (!el.mentorStageCard) return;
    el.mentorStageCard.classList.remove(
      "state-ai-asking",
      "state-user-answering",
      "state-ai-analyzing",
      "wave-active"
    );

    if (mode === "user_answering") {
      el.mentorStageCard.classList.add("state-user-answering");
      if (el.mentorAvatarIcon) el.mentorAvatarIcon.innerHTML = ICONS.mic;
    } else if (mode === "ai_analyzing") {
      el.mentorStageCard.classList.add("state-ai-analyzing");
      if (el.mentorAvatarIcon) el.mentorAvatarIcon.innerHTML = ICONS.sparkles;
    } else {
      el.mentorStageCard.classList.add("state-ai-asking");
      if (el.mentorAvatarIcon) el.mentorAvatarIcon.innerHTML = ICONS.bot;
    }

    if (waveRunning) {
      el.mentorStageCard.classList.add("wave-active");
    } else if (el.waveformVisualizer) {
      el.waveformVisualizer.querySelectorAll(".wf-bar").forEach(b => {
        b.style.height = "";
      });
    }

    if (statusMessage && el.mentorStatusText) {
      el.mentorStatusText.textContent = statusMessage;
    }
  }

  let bargeInAnimId = null;
  let bargeInSpeechStartMs = 0;

  function abortPendingBrainRequests() {
    if (state.activeBrainAbortController) {
      try {
        state.activeBrainAbortController.abort();
      } catch (_) {}
      state.activeBrainAbortController = null;
    }
  }

  function stopBargeInMonitor() {
    if (bargeInAnimId) {
      cancelAnimationFrame(bargeInAnimId);
      bargeInAnimId = null;
    }
    bargeInSpeechStartMs = 0;
  }

  /**
   * Cơ chế Ngắt lời giữa chừng (Barge-in):
   * Khi AI đang nói và trình duyệt đã có luồng Mic bật Echo Cancellation (AEC),
   * giám sát dải tần giọng người (300Hz-3400Hz). Nếu sinh viên nói đè liên tục >= 280ms -> Ngắt AI trong < 50ms!
   */
  async function startBargeInMonitor() {
    stopBargeInMonitor();
    if (!state.enableBargeIn || !state.isAiSpeaking || state.isMicRecording) return;
    if (!mediaStream || !mediaStream.active) return; // Chỉ chạy ngầm khi người dùng đã cấp quyền Mic

    try {
      const AudioContextCls = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCls) return;
      if (!audioCtx || audioCtx.state === "closed") audioCtx = new AudioContextCls();
      if (audioCtx.state === "suspended") await audioCtx.resume();
      if (!analyserNode) {
        const src = audioCtx.createMediaStreamSource(mediaStream);
        analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 128;
        src.connect(analyserNode);
      }

      const bins = new Uint8Array(analyserNode.frequencyBinCount);
      const monitorStartedAt = performance.now();
      const checkVoiceEnergy = () => {
        if (!state.isAiSpeaking || !state.enableBargeIn || state.isMicRecording) {
          stopBargeInMonitor();
          return;
        }
        // Bỏ qua 700ms đầu để tránh âm thanh loa ngoài vừa phát dội lại mic
        if (performance.now() - monitorStartedAt < 700) {
          bargeInAnimId = requestAnimationFrame(checkVoiceEnergy);
          return;
        }
        analyserNode.getByteFrequencyData(bins);
        // Lấy trung bình dải tần giọng người (bỏ nhiễu nền siêu trầm)
        let sum = 0;
        const startBin = 2;
        const endBin = Math.min(bins.length, 24);
        for (let i = startBin; i < endBin; i++) sum += bins[i];
        const avgEnergy = sum / Math.max(1, endBin - startBin);

        if (avgEnergy > 45) {
          if (!bargeInSpeechStartMs) {
            bargeInSpeechStartMs = performance.now();
          } else if (performance.now() - bargeInSpeechStartMs >= 280) {
            triggerBargeInInterruption();
            return;
          }
        } else {
          bargeInSpeechStartMs = 0;
        }
        bargeInAnimId = requestAnimationFrame(checkVoiceEnergy);
      };
      bargeInAnimId = requestAnimationFrame(checkVoiceEnergy);
    } catch (_) {}
  }

  /**
   * Thực thi Ngắt lời (< 50ms) + Cắt ngắn ngữ cảnh hội thoại (Context Truncation)
   */
  function triggerBargeInInterruption() {
    stopBargeInMonitor();
    const spokenBeforeInterrupt = state.spokenClausesSoFar.join(" ").trim();
    stopAllAiSpeech();
    abortPendingBrainRequests();

    state.interruptionLog.push({
      questionIndex: state.currentQIndex,
      spokenBeforeInterrupt: spokenBeforeInterrupt || "(Đang mở đầu câu)",
      timestamp: Date.now()
    });

    // Hiển thị dấu vết Context Truncation trực quan ngay trên bóng chat của AI vừa bị ngắt lời
    if (state.lastAiBubbleEl && !state.lastAiBubbleEl.querySelector(".chat-interrupted-tag")) {
      const snippet = spokenBeforeInterrupt
        ? `"...${spokenBeforeInterrupt.slice(-52)}"`
        : "đầu câu";
      const tag = document.createElement("div");
      tag.className = "chat-interrupted-tag";
      tag.textContent = `Barge-in · Đã ngắt lời AI tại ${snippet}`;
      state.lastAiBubbleEl.appendChild(tag);
    }

    // Tự động chuyển sang thu giọng sinh viên ngay lập tức
    if (el.answerTranscriptInput) {
      toggleMicForTextarea(el.answerTranscriptInput);
    }
  }

  function stopAllAiSpeech() {
    speechTokenCounter++;
    state.isAiSpeaking = false;
    stopBargeInMonitor();
    if (speechPauseTimer) {
      clearTimeout(speechPauseTimer);
      speechPauseTimer = null;
    }
    if (activeAudioEl) {
      try {
        activeAudioEl.pause();
        activeAudioEl.src = "";
      } catch (_) {}
      activeAudioEl = null;
    }
    if (synth) {
      try {
        synth.cancel();
      } catch (_) {}
    }
    if (!state.isMicRecording && !state.isAnalyzing) {
      setMentorStageVisual(
        "ai_asking",
        state.selectedLang === "en"
          ? "Ready — Click Mic to speak or edit your answer below."
          : "Sẵn sàng — Bấm Mic để trả lời hoặc tính toán & gõ trực tiếp bên dưới.",
        false
      );
    }
  }

  async function speakMentorText(rawText) {
    state.lastAiSpokenText = rawText;
    state.spokenClausesSoFar = [];
    state.questionAskedAt = Date.now();

    if (!state.enableAiVoice || !rawText) {
      setMentorStageVisual(
        "ai_asking",
        state.selectedLang === "en"
          ? "Question posted. Take your time to think & answer!"
          : "Đã hiển thị câu hỏi. Bạn thoải mái suy nghĩ và trả lời nhé!",
        false
      );
      return;
    }

    stopAllAiSpeech();
    const myToken = ++speechTokenCounter;
    state.isAiSpeaking = true;
    startBargeInMonitor();

    const lang = state.selectedLang;
    setMentorStageVisual(
      "ai_asking",
      lang === "en"
        ? "AI Mentor is speaking (Speak over anytime to interrupt)..."
        : "AI Mentor đang đặt câu hỏi (Có thể nói đè để ngắt lời nếu bật Barge-in)...",
      true
    );

    const preparedScript = prepareCleanSpokenScript(rawText, lang);
    const clauses = splitIntoBreathableClauses(preparedScript);
    const voices = await ensureVoicesLoaded();
    if (myToken !== speechTokenCounter) return;

    // Đợi 45ms sau synth.cancel() và resume() để tránh lỗi trình duyệt Chrome/Edge im lặng
    await new Promise(r => setTimeout(r, 45));
    if (myToken !== speechTokenCounter) return;
    if (synth && synth.paused) {
      try { synth.resume(); } catch (_) {}
    }

    const { multilingualViVoice, viVoice, enVoice } = pickBestVoices(voices);
    const userRate = Number(state.voiceRate) || 0.96;

    const finishSpeaking = () => {
      if (myToken !== speechTokenCounter) return;
      state.isAiSpeaking = false;
      stopBargeInMonitor();
      state.questionAskedAt = Date.now();
      setMentorStageVisual(
        "ai_asking",
        lang === "en"
          ? "Your turn! Speak via Mic or edit your answer freely."
          : "Tới lượt bạn! Bấm Mic để nói hoặc bấm máy tính & sửa thuật ngữ thoải mái.",
        false
      );
    };

    // NHÁNH 1: Chế độ Tiếng Anh 100% (English Mode)
    if (lang === "en" && enVoice && synth) {
      let idx = 0;
      const speakNextEnClause = () => {
        if (myToken !== speechTokenCounter) return;
        if (idx >= clauses.length) {
          finishSpeaking();
          return;
        }
        const clauseText = clauses[idx++];
        const u = new SpeechSynthesisUtterance(clauseText);
        u.voice = enVoice;
        u.lang = enVoice.lang;
        u.rate = userRate;
        u.pitch = 1.0;
        u.onend = () => {
          if (myToken !== speechTokenCounter) return;
          state.spokenClausesSoFar.push(clauseText);
          speechPauseTimer = setTimeout(speakNextEnClause, 280);
        };
        u.onerror = speakNextEnClause;
        synth.speak(u);
      };
      speakNextEnClause();
      return;
    }

    // NHÁNH 2: Trình duyệt có Giọng Đa Ngôn Ngữ Azure Natural Online (Edge HoaiMy / NamMinh Natural)
    if (lang === "vi" && multilingualViVoice && synth) {
      let idx = 0;
      const speakNextMultilingualClause = () => {
        if (myToken !== speechTokenCounter) return;
        if (idx >= clauses.length) {
          finishSpeaking();
          return;
        }
        const clauseText = clauses[idx++];
        const u = new SpeechSynthesisUtterance(clauseText);
        u.voice = multilingualViVoice;
        u.lang = multilingualViVoice.lang;
        u.rate = userRate;
        u.pitch = 1.0;
        u.onend = () => {
          if (myToken !== speechTokenCounter) return;
          state.spokenClausesSoFar.push(clauseText);
          speechPauseTimer = setTimeout(speakNextMultilingualClause, 300);
        };
        u.onerror = speakNextMultilingualClause;
        synth.speak(u);
      };
      speakNextMultilingualClause();
      return;
    }

    // NHÁNH 3: Trình duyệt Chrome có cặp giọng Google Tiếng Việt + Google US English
    if (lang === "vi" && viVoice && enVoice && synth) {
      const queue = [];
      clauses.forEach(cl => {
        const segs = tokenizeBilingualSegments(cl);
        segs.forEach((seg, sIdx) => {
          queue.push({
            lang: seg.lang,
            text: seg.text,
            pauseAfterMs: sIdx === segs.length - 1 ? 300 : 75
          });
        });
      });

      let qIdx = 0;
      const playNextQueueItem = () => {
        if (myToken !== speechTokenCounter) return;
        if (qIdx >= queue.length) {
          finishSpeaking();
          return;
        }
        const item = queue[qIdx++];
        const u = new SpeechSynthesisUtterance(item.text);
        if (item.lang === "en") {
          u.voice = enVoice;
          u.lang = enVoice.lang;
          u.rate = Math.min(1.0, userRate);
        } else {
          u.voice = viVoice;
          u.lang = viVoice.lang;
          u.rate = userRate;
        }
        u.onend = () => {
          if (myToken !== speechTokenCounter) return;
          state.spokenClausesSoFar.push(item.text);
          speechPauseTimer = setTimeout(playNextQueueItem, item.pauseAfterMs);
        };
        u.onerror = playNextQueueItem;
        synth.speak(u);
      };
      playNextQueueItem();
      return;
    }

    // NHÁNH 4: Cloud TTS Proxy (/api/tts trên Vercel) hoặc Fallback OS Speech
    const isHttp = window.location.protocol === "http:" || window.location.protocol === "https:";
    if (isHttp) {
      const streamQueue = [];
      if (lang === "en") {
        clauses.forEach(cl => streamQueue.push({ tl: "en", text: cl, pauseMs: 280 }));
      } else {
        clauses.forEach(cl => {
          const segs = tokenizeBilingualSegments(cl);
          segs.forEach((seg, sIdx) => {
            streamQueue.push({
              tl: seg.lang === "en" ? "en" : "vi",
              text: seg.text,
              pauseMs: sIdx === segs.length - 1 ? 300 : 65
            });
          });
        });
      }

      const preloadedAudios = streamQueue.map(item => {
        const url = `/api/tts?tl=${encodeURIComponent(item.tl)}&q=${encodeURIComponent(
          item.text.slice(0, 175)
        )}`;
        const a = new Audio(url);
        a.preload = "auto";
        a.playbackRate = userRate;
        return { audio: a, pauseMs: item.pauseMs, text: item.text };
      });

      let sIdx = 0;
      const playNextPreloaded = () => {
        if (myToken !== speechTokenCounter) return;
        if (sIdx >= preloadedAudios.length) {
          finishSpeaking();
          return;
        }
        const current = preloadedAudios[sIdx++];
        activeAudioEl = current.audio;
        current.audio.onended = () => {
          if (myToken !== speechTokenCounter) return;
          state.spokenClausesSoFar.push(current.text);
          speechPauseTimer = setTimeout(playNextPreloaded, current.pauseMs);
        };
        current.audio.onerror = () => {
          if (myToken !== speechTokenCounter) return;
          playNextPreloaded();
        };
        current.audio.play().catch(() => finishSpeaking());
      };
      playNextPreloaded();
      return;
    }

    // NHÁNH 5 (Fallback cuối cùng khi chạy file:// và chưa load được voice): dùng giọng mặc định hệ điều hành
    if (synth) {
      const u = new SpeechSynthesisUtterance(preparedScript);
      u.lang = lang === "en" ? "en-US" : "vi-VN";
      u.rate = userRate;
      u.onend = finishSpeaking;
      u.onerror = finishSpeaking;
      synth.speak(u);
      return;
    }

    finishSpeaking();
  }

  // ==================== MICROPHONE CAPTURE & VIET-ENG SPEECH RECOGNITION ====================
  let recognition = null;
  let mediaStream = null;
  let mediaRecorder = null;
  let recordedChunks = [];
  let audioCtx = null;
  let analyserNode = null;
  let freqAnimId = null;

  function applyPhoneticVietlishFix(text) {
    if (!text) return "";
    let out = text;
    (DATA.phoneticCorrections || []).forEach(rule => {
      out = out.replace(rule.pattern, rule.replace);
    });
    return out;
  }

  function detectVietnameseDialect(text) {
    if (!text || state.selectedLang === "en") return;
    const lower = text.toLowerCase();
    if (/\b(răng|rứa|mô|tê|ni|nớ|chừ|bữa ni|đà nẵng|huế|tiên sa|chu lai)\b/i.test(lower)) {
      state.detectedRegion = "central";
    } else if (
      /\b(dạ|nha|nghen|hen|thiệt|hông|tụi em|giùm|cát lái|sài gòn|tp\.?\s*hcm|bình dương|thủ đức)\b/i.test(
        lower
      )
    ) {
      state.detectedRegion = "south";
    } else if (/\b(vâng|nhé|đấy|thế ạ|hải phòng|hà nội|nội bài|lạng sơn)\b/i.test(lower)) {
      state.detectedRegion = "north";
    }
    updateDialectBadgeUI();
  }

  function updateDialectBadgeUI() {
    if (!el.roomDialectBadge) return;
    if (state.selectedLang === "en") {
      el.roomDialectBadge.textContent = "English Native Voice";
      return;
    }
    const labels = {
      north: "Song ngữ Việt (Bắc) – Anh",
      central: "Song ngữ Việt (Trung) – Anh",
      south: "Song ngữ Việt (Nam) – Anh"
    };
    el.roomDialectBadge.textContent = labels[state.detectedRegion] || labels.north;
  }

  function adaptMentorToneByRegion(text) {
    if (!text || state.selectedLang === "en") return text;
    if (state.detectedRegion === "south") {
      return text
        .replace(/\bVâng,\s*/g, "Dạ, ")
        .replace(/\bnhé([.!?])/g, "nha$1")
        .replace(/\bnhé\b/g, "nha");
    }
    if (state.detectedRegion === "central") {
      return text
        .replace(/\bVâng,\s*/g, "Dạ, ")
        .replace(/\bnhé([.!?])/g, "nha bạn$1");
    }
    return text;
  }

  async function startMicAudioCaptureAndWaveform() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    try {
      if (!mediaStream || !mediaStream.active) {
        // Bật chuẩn WebRTC AEC (Chống dội âm loa) + Lọc ồn nền + Cân bằng âm lượng cho STT & Barge-in
        mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            channelCount: 1
          }
        });
      }
      recordedChunks = [];
      if (typeof MediaRecorder !== "undefined") {
        const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? "audio/webm;codecs=opus"
          : "";
        mediaRecorder = mime
          ? new MediaRecorder(mediaStream, { mimeType: mime })
          : new MediaRecorder(mediaStream);
        mediaRecorder.ondataavailable = e => {
          if (e.data && e.data.size > 0) recordedChunks.push(e.data);
        };
        mediaRecorder.start(250);
      }

      const AudioContextCls = window.AudioContext || window.webkitAudioContext;
      if (AudioContextCls && el.waveformVisualizer) {
        if (!audioCtx || audioCtx.state === "closed") {
          audioCtx = new AudioContextCls();
        }
        if (audioCtx.state === "suspended") await audioCtx.resume();
        if (!analyserNode) {
          const source = audioCtx.createMediaStreamSource(mediaStream);
          analyserNode = audioCtx.createAnalyser();
          analyserNode.fftSize = 128;
          source.connect(analyserNode);
        }

        const bars = el.waveformVisualizer.querySelectorAll(".wf-bar");
        const dataArr = new Uint8Array(analyserNode.frequencyBinCount);
        const renderBars = () => {
          if (!state.isMicRecording || !analyserNode) return;
          analyserNode.getByteFrequencyData(dataArr);
          bars.forEach((bar, i) => {
            const v = dataArr[(i * 2) % dataArr.length] || 0;
            const h = Math.max(6, Math.min(30, Math.round((v / 255) * 30)));
            bar.style.height = `${h}px`;
          });
          freqAnimId = requestAnimationFrame(renderBars);
        };
        renderBars();
      }
    } catch (_) {}
  }

  /**
   * Tầng 1 STT Nâng cao (Tùy chọn): Gửi Audio đã thu âm sang Gemini 2.0 Flash Multimodal
   * để phiên âm chuẩn xác 95-98% tiếng Việt pha thuật ngữ tiếng Anh Logistics (Vietlish).
   */
  async function transcribeAudioWithGemini(audioDataUrl, track) {
    if (!audioDataUrl || !state.geminiApiKey) return "";
    const parts = audioDataUrl.split(",");
    if (parts.length < 2) return "";
    const base64Audio = parts[1];
    const mimeMatch = parts[0].match(/data:([^;]+);/);
    const mimeType = mimeMatch ? mimeMatch[1] : "audio/webm";
    const domainTerms = (track?.vietlishTerms || []).join(", ");

    try {
      const resp = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": state.geminiApiKey
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `Hãy phiên âm chính xác nguyên văn đoạn ghi âm phỏng vấn ngành Logistics (${track?.name || "Logistics"}). Chú ý giữ nguyên chuẩn các thuật ngữ tiếng Anh nếu người nói có nhắc đến: ${domainTerms}. Chỉ trả về đúng văn bản đã chép, không giải thích thêm.`
                  },
                  {
                    inline_data: {
                      mime_type: mimeType,
                      data: base64Audio
                    }
                  }
                ]
              }
            ],
            generationConfig: { temperature: 0.1 }
          })
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        return (data?.candidates?.[0]?.content?.parts?.[0]?.text || "").trim();
      }
    } catch (_) {}
    return "";
  }

  /**
   * Tầng 2 Brain (Tùy chọn Coze Bot API — coze.com):
   * Gọi Coze Bot kèm AbortSignal để hủy tức thì khi người dùng ngắt lời (Barge-in).
   */
  async function askCozeBotBrain(userAnswer, qObj, signal) {
    if (!state.cozeBotId || !state.cozeApiToken) return null;
    try {
      const lastInterrupt = state.interruptionLog[state.interruptionLog.length - 1];
      const interruptCtx =
        lastInterrupt && lastInterrupt.questionIndex === state.currentQIndex
          ? `\n[Lưu ý: Ứng viên vừa ngắt lời AI tại đoạn "${lastInterrupt.spokenBeforeInterrupt}"]`
          : "";

      const queryText = `[Ngành: ${getActiveTrack().name} | Cấp độ: ${state.selectedLevel}]
Câu hỏi hiện tại: ${qObj.question_text}${interruptCtx}
Trả lời của sinh viên: "${userAnswer}"
Hãy đóng vai AI Logistics Mentor nhận xét ngắn gọn 1-2 câu sắc bén và hỏi xoáy 1 chi tiết thực chiến liên quan (Tiếng Việt).`;

      const resp = await fetch("https://api.coze.com/open_api/v2/chat", {
        method: "POST",
        signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.cozeApiToken}`
        },
        body: JSON.stringify({
          bot_id: state.cozeBotId,
          user: state.activeSessionId || "student_logimentor",
          query: queryText,
          stream: false
        })
      });
      if (resp.ok) {
        const json = await resp.json();
        const answerMsg = (json.messages || []).find(
          m => m.role === "assistant" && m.type === "answer" && m.content
        );
        if (answerMsg && answerMsg.content) {
          return answerMsg.content.trim();
        }
      }
    } catch (_) {}
    return null;
  }

  function stopAndCollectRecordedAudio() {
    if (freqAnimId) {
      cancelAnimationFrame(freqAnimId);
      freqAnimId = null;
    }
    return new Promise(resolve => {
      if (!mediaRecorder || mediaRecorder.state === "inactive") {
        resolve({ audioUrl: "", audioDataUrl: "" });
        return;
      }
      mediaRecorder.onstop = () => {
        if (!recordedChunks.length) {
          resolve({ audioUrl: "", audioDataUrl: "" });
          return;
        }
        const blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || "audio/webm" });
        const audioUrl = URL.createObjectURL(blob);
        if (blob.size <= 350 * 1024) {
          const reader = new FileReader();
          reader.onloadend = () => resolve({ audioUrl, audioDataUrl: String(reader.result || "") });
          reader.onerror = () => resolve({ audioUrl, audioDataUrl: "" });
          reader.readAsDataURL(blob);
        } else {
          resolve({ audioUrl, audioDataUrl: "" });
        }
      };
      try {
        mediaRecorder.stop();
      } catch (_) {
        resolve({ audioUrl: "", audioDataUrl: "" });
      }
    });
  }

  function initSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return;

    recognition = new SpeechRec();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      state.isMicRecording = true;
      if (state.activeMicTargetTextarea === el.answerTranscriptInput) {
        if (el.btnMicRecord) el.btnMicRecord.classList.add("recording");
        if (el.micBtnLabel) el.micBtnLabel.textContent = "Đang thu âm... (Bấm để dừng Mic)";
        setMentorStageVisual(
          "user_answering",
          state.selectedLang === "en"
            ? "Listening to you — Pause anytime to calculate or edit text."
            : "Bạn đang trả lời — Cứ dừng lại tính toán thoải mái, không tự động ngắt câu.",
          true
        );
      } else if (state.activeMicRetryBtn) {
        state.activeMicRetryBtn.textContent = "Đang thu âm... (Bấm để dừng)";
        state.activeMicRetryBtn.classList.add("recording");
      }
    };

    recognition.onresult = event => {
      const targetBox = state.activeMicTargetTextarea || el.answerTranscriptInput;
      if (!targetBox) return;

      if (!state.firstTypedOrSpokenAt) state.firstTypedOrSpokenAt = Date.now();

      let sessionFinal = "";
      let sessionInterim = "";
      for (let i = 0; i < event.results.length; i++) {
        const seg = event.results[i][0].transcript;
        if (event.results[i].isFinal) sessionFinal += seg + " ";
        else sessionInterim += seg;
      }

      const combinedRaw = [state.committedSpeechPrefix, sessionFinal.trim(), sessionInterim.trim()]
        .filter(Boolean)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      const fixedText =
        state.selectedLang === "vi" ? applyPhoneticVietlishFix(combinedRaw) : combinedRaw;

      targetBox.value = fixedText;
      if (targetBox === el.answerTranscriptInput) {
        updateStarBadges(fixedText);
        detectVietnameseDialect(fixedText);
      }
    };

    recognition.onerror = () => {};

    recognition.onend = () => {
      // Giữ luồng nghe liên tục kể cả khi sinh viên ngừng nói lâu để tính toán (không tự ngắt câu)
      if (!state.userStoppedMic && state.isMicRecording) {
        const targetBox = state.activeMicTargetTextarea || el.answerTranscriptInput;
        if (targetBox) state.committedSpeechPrefix = targetBox.value.trim();
        try {
          recognition.start();
          return;
        } catch (_) {}
      }

      state.isMicRecording = false;
      if (el.btnMicRecord) el.btnMicRecord.classList.remove("recording");
      if (el.micBtnLabel) el.micBtnLabel.textContent = "Bấm để nói tiếp (Alt + M)";
      if (state.activeMicRetryBtn) {
        state.activeMicRetryBtn.textContent = "Ghi âm giọng nói";
        state.activeMicRetryBtn.classList.remove("recording");
      }
      if (!state.isAnalyzing && !state.isAiSpeaking) {
        setMentorStageVisual(
          "ai_asking",
          "Bạn có thể chỉnh sửa lại thuật ngữ tiếng Anh rồi bấm 'Hoàn thành & Gửi câu trả lời'.",
          false
        );
      }
    };
  }

  function toggleMicForTextarea(targetTextarea, retryBtnEl = null) {
    if (state.isAiSpeaking) stopAllAiSpeech();
    if (!recognition) {
      if (targetTextarea) targetTextarea.focus();
      if (el.micLiveNotice) {
        el.micLiveNotice.textContent =
          "Trình duyệt hiện tại không hỗ trợ nhận diện giọng nói. Vui lòng nhập trực tiếp hoặc mở trên Chrome / Edge.";
      }
      return;
    }

    if (state.isMicRecording) {
      stopMicRecording();
      return;
    }

    state.activeMicTargetTextarea = targetTextarea;
    state.activeMicRetryBtn = retryBtnEl;
    state.userStoppedMic = false;
    state.committedSpeechPrefix = targetTextarea ? targetTextarea.value.trim() : "";
    recognition.lang = state.selectedLang === "en" ? "en-US" : "vi-VN";
    startMicAudioCaptureAndWaveform();
    try {
      recognition.start();
    } catch (_) {}
  }

  function stopMicRecording() {
    state.userStoppedMic = true;
    state.isMicRecording = false;
    if (freqAnimId) {
      cancelAnimationFrame(freqAnimId);
      freqAnimId = null;
    }
    if (recognition) {
      try {
        recognition.stop();
      } catch (_) {}
    }
    if (el.btnMicRecord) el.btnMicRecord.classList.remove("recording");
    if (el.micBtnLabel) el.micBtnLabel.textContent = "Bấm để nói tiếp (Alt + M)";
    if (state.activeMicRetryBtn) {
      state.activeMicRetryBtn.textContent = "Ghi âm giọng nói";
      state.activeMicRetryBtn.classList.remove("recording");
    }
  }

  // ==================== INTERVIEW ROOM EXECUTION ====================
  function startNewPracticeSession() {
    const track = getActiveTrack();
    const mentor = getActiveMentor();

    state.activeSessionId = `sess-${track.id}-${Date.now().toString().slice(-6)}`;
    state.questionsPlan = JSON.parse(JSON.stringify(track.questions || []));
    const caseIdx = state.questionsPlan.findIndex(q => Boolean(q.case_study_board));
    state.currentQIndex = state.startMode === "case_first" && caseIdx !== -1 ? caseIdx : 0;

    state.hasAskedFollowUpByQ = {};
    state.primaryDraftByQ = {};
    state.qaAnswersByQ = {};
    state.elapsedSec = 0;

    if (el.quickStartModal) el.quickStartModal.classList.remove("open");
    if (el.roomTrackBadge) el.roomTrackBadge.textContent = track.shortTitle;
    if (el.roomLevelBadge) el.roomLevelBadge.textContent = state.selectedLevel;
    if (el.mentorNameLabel) el.mentorNameLabel.textContent = mentor.name;
    if (el.mentorRoleChip) el.mentorRoleChip.textContent = mentor.badge;
    if (el.scratchpadTextarea) el.scratchpadTextarea.value = "";
    resetMiniCalculator();
    updateDialectBadgeUI();
    renderVietlishQuickChips(track);

    switchView("interview", "/interview");
    startElapsedTimer();
    loadQuestionIntoRoom(state.currentQIndex, true);
  }

  function startElapsedTimer() {
    stopElapsedTimer();
    state.elapsedSec = 0;
    const renderTime = () => {
      if (!el.roomElapsedTimer) return;
      const mm = String(Math.floor(state.elapsedSec / 60)).padStart(2, "0");
      const ss = String(state.elapsedSec % 60).padStart(2, "0");
      el.roomElapsedTimer.textContent = `${mm}:${ss}`;
    };
    renderTime();
    state.elapsedInterval = setInterval(() => {
      state.elapsedSec++;
      renderTime();
    }, 1000);
  }

  function stopElapsedTimer() {
    if (state.elapsedInterval) {
      clearInterval(state.elapsedInterval);
      state.elapsedInterval = null;
    }
  }

  function renderQuestionStepperPills() {
    if (!el.questionStepperPills) return;
    el.questionStepperPills.innerHTML = state.questionsPlan
      .map((q, idx) => {
        const isDone = Boolean(state.qaAnswersByQ[idx]);
        const isActive = idx === state.currentQIndex;
        const label = q.case_study_board ? `Câu ${idx + 1} · Case Study` : `Câu ${idx + 1}`;
        return `<button type="button" class="q-step-pill ${isActive ? "active" : ""} ${
          isDone && !isActive ? "done" : ""
        }" data-step-q="${idx}">${isDone ? "✓ " : ""}${label}</button>`;
      })
      .join("");

    el.questionStepperPills.querySelectorAll(".q-step-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        if (state.isAnalyzing) return;
        const targetIdx = parseInt(btn.getAttribute("data-step-q"), 10);
        if (!Number.isNaN(targetIdx) && targetIdx !== state.currentQIndex) {
          stopMicRecording();
          state.currentQIndex = targetIdx;
          loadQuestionIntoRoom(targetIdx, false);
        }
      });
    });
  }

  function renderVietlishQuickChips(track) {
    if (!el.vietlishQuickChips) return;
    const terms = track.vietlishTerms || ["FEFO", "WMS", "Bill of Lading", "SLA", "KPI"];
    el.vietlishQuickChips.innerHTML = terms
      .map(
        t =>
          `<button type="button" class="vietlish-chip" data-term="${escapeHtml(t)}">+ ${escapeHtml(
            t
          )}</button>`
      )
      .join("");

    el.vietlishQuickChips.querySelectorAll(".vietlish-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        insertTextAtCursor(el.answerTranscriptInput, chip.getAttribute("data-term") || "");
      });
    });
  }

  function insertTextAtCursor(textarea, textToInsert) {
    if (!textarea || !textToInsert) return;
    const start = textarea.selectionStart ?? textarea.value.length;
    const end = textarea.selectionEnd ?? textarea.value.length;
    const before = textarea.value.slice(0, start);
    const after = textarea.value.slice(end);
    const needSpaceBefore = before.length > 0 && !/\s$/.test(before);
    const needSpaceAfter = after.length > 0 && !/^\s/.test(after);
    const inserted = `${needSpaceBefore ? " " : ""}${textToInsert}${needSpaceAfter ? " " : ""}`;
    textarea.value = before + inserted + after;
    const newPos = start + inserted.length;
    textarea.focus();
    textarea.setSelectionRange(newPos, newPos);
    if (textarea === el.answerTranscriptInput) updateStarBadges(textarea.value);
  }

  function updateStarBadges(text) {
    const clean = text || "";
    const hasS =
      /(tình huống|bối cảnh|khi|lúc đó|hiện tại|tại kho|tại bưu cục|ca điều phối|situation|when|during)/i.test(
        clean
      );
    const hasT =
      /(mục tiêu|nhiệm vụ|yêu cầu|đảm bảo|cần phải|định mức|task|goal|target|ensure)/i.test(clean);
    const hasA =
      /(bước 1|bước 2|trước tiên|đầu tiên|tiếp theo|thực hiện|khóa|điều xe|tính toán|tu chỉnh|action|first|second)/i.test(
        clean
      );
    const hasR =
      /\d+\s*(%|đ|đồng|triệu|usd|\$|thùng|cuộn|máy|đơn|kg|cbm|ngày)/i.test(clean) ||
      /(kết quả|tiết kiệm|giảm|đạt được|result|saved|reduced)/i.test(clean);

    if (el.starBadgeS) el.starBadgeS.classList.toggle("lit", hasS);
    if (el.starBadgeT) el.starBadgeT.classList.toggle("lit", hasT);
    if (el.starBadgeA) el.starBadgeA.classList.toggle("lit", hasA);
    if (el.starBadgeR) el.starBadgeR.classList.toggle("lit", hasR);
  }

  function loadQuestionIntoRoom(qIdx, isInitialGreeting) {
    const q = state.questionsPlan[qIdx];
    if (!q) return;

    renderQuestionStepperPills();
    updateCaseStudyPanelForQuestion(q);

    if (el.keywordHintPanel) el.keywordHintPanel.style.display = "none";
    if (el.answerTranscriptInput) {
      const prevSaved = state.qaAnswersByQ[qIdx]?.userAnswer || "";
      el.answerTranscriptInput.value = prevSaved;
      updateStarBadges(prevSaved);
    }
    state.committedSpeechPrefix = "";
    state.firstTypedOrSpokenAt = 0;

    if (isInitialGreeting && el.chatStream) {
      el.chatStream.innerHTML = "";
    }

    const isEn = state.selectedLang === "en";
    const mentor = getActiveMentor();
    const qPrompt = isEn ? q.question_text_en : q.question_text;

    let displayMsg = "";
    if (isInitialGreeting) {
      displayMsg = isEn
        ? `Hello! I am ${mentor.name}. Welcome to your ${getActiveTrack().nameEn} (${state.selectedLevel}) practice.\n\nQuestion ${qIdx + 1} — ${q.title}:\n${qPrompt}`
        : `Chào bạn! Mình là ${mentor.name}. Chúng ta bắt đầu buổi luyện tập chuyên ngành ${getActiveTrack().name} nhé.\n\nCâu hỏi ${qIdx + 1} — ${q.title}:\n${qPrompt}`;
    } else {
      displayMsg = isEn
        ? `Question ${qIdx + 1} — ${q.title}:\n${qPrompt}`
        : `Câu hỏi ${qIdx + 1} — ${q.title}:\n${qPrompt}`;
    }

    const adapted = adaptMentorToneByRegion(displayMsg);
    appendChatBubble("ai", adapted, `Câu ${qIdx + 1}`, false);
    speakMentorText(adapted);
  }

  function updateCaseStudyPanelForQuestion(q) {
    const hasBoard = Boolean(q && q.case_study_board);
    if (el.interviewLayoutGrid) {
      el.interviewLayoutGrid.classList.toggle("has-case-study", hasBoard);
    }
    if (el.caseStudyAside) {
      el.caseStudyAside.classList.remove("sheet-open");
    }
    if (!hasBoard) {
      if (el.caseBoardTableMount) el.caseBoardTableMount.innerHTML = "";
      if (el.caseNotesList) el.caseNotesList.innerHTML = "";
      return;
    }

    const board = q.case_study_board;
    if (el.caseDomainBadge) {
      el.caseDomainBadge.textContent = `CASE STUDY · ${q.domain} · ${q.question_id.toUpperCase()}`;
    }
    if (el.caseBoardTitle) {
      el.caseBoardTitle.textContent = q.title;
    }

    const headersHtml = (board.table_headers || [])
      .map(h => `<th>${escapeHtml(h)}</th>`)
      .join("");

    const rowsHtml = (board.table_rows || [])
      .map((row, rIdx) => {
        const tds = row
          .map((cell, cIdx) => {
            const str = String(cell ?? "");
            if (/-\d+/.test(str) || /lệch phân nhóm|quá hạn|đã lố|cấm/i.test(str)) {
              return `<td class="td-neg">${escapeHtml(str)}</td>`;
            }
            if (/còn 5 ngày|24\.0%|20\.0%|phạt|11 ngày/i.test(str)) {
              return `<td class="td-warn">${escapeHtml(str)}</td>`;
            }
            return `<td style="${cIdx === 0 ? "font-weight:700; white-space:nowrap;" : ""}">${escapeHtml(
              str
            )}</td>`;
          })
          .join("");
        return `<tr data-ridx="${rIdx}" title="Nhấp vào dòng để trích xuất số liệu xuống Ghi chú nháp">${tds}</tr>`;
      })
      .join("");

    if (el.caseBoardTableMount) {
      el.caseBoardTableMount.innerHTML = `
        <div class="case-board-box">
          <div class="case-context-banner">${escapeHtml(board.context || "")}</div>
          ${board.unit_hint ? `<div class="case-unit-hint">${escapeHtml(board.unit_hint)}</div>` : ""}
          <div class="case-table-scroll">
            <table class="case-data-table tabular-nums">
              <thead><tr>${headersHtml}</tr></thead>
              <tbody>${rowsHtml}</tbody>
            </table>
          </div>
        </div>
      `;

      el.caseBoardTableMount.querySelectorAll("tbody tr").forEach(tr => {
        tr.addEventListener("click", () => {
          const rIdx = parseInt(tr.getAttribute("data-ridx"), 10);
          const rData = (board.table_rows || [])[rIdx];
          if (!rData || !el.scratchpadTextarea) return;
          const line = `• ${rData.join(" | ")}`;
          if (!el.scratchpadTextarea.value.includes(rData[0])) {
            el.scratchpadTextarea.value =
              (el.scratchpadTextarea.value.trim() ? el.scratchpadTextarea.value.trim() + "\n" : "") +
              line;
          }
          switchUtilityTab("scratchpad");
        });
      });
    }

    if (el.caseNotesList) {
      el.caseNotesList.innerHTML = (board.notes || []).map(n => `<li>${escapeHtml(n)}</li>`).join("");
    }
  }

  function toggleKeywordHintsDrawer() {
    if (!el.keywordHintPanel) return;
    const isOpen = el.keywordHintPanel.style.display === "block";
    if (isOpen) {
      el.keywordHintPanel.style.display = "none";
      return;
    }

    const q = state.questionsPlan[state.currentQIndex];
    if (!q) return;

    if (el.hintKeywordsTags) {
      el.hintKeywordsTags.innerHTML = (q.expected_keywords || [])
        .map(
          kw =>
            `<button type="button" class="hint-kw-chip" data-kw="${escapeHtml(kw)}">+ ${escapeHtml(
              kw
            )}</button>`
        )
        .join("");
      el.hintKeywordsTags.querySelectorAll(".hint-kw-chip").forEach(btn => {
        btn.addEventListener("click", () => {
          insertTextAtCursor(el.answerTranscriptInput, btn.getAttribute("data-kw") || "");
        });
      });
    }

    if (el.hintGuideBullets) {
      el.hintGuideBullets.innerHTML = (q.keyword_hints_vi || [])
        .map(b => `<li>${escapeHtml(b)}</li>`)
        .join("");
    }

    el.keywordHintPanel.style.display = "block";
  }

  function appendChatBubble(role, text, metaLabel, isProbe = false, audioUrl = "") {
    if (!el.chatStream) return;
    const div = document.createElement("div");
    div.className = `chat-msg ${role === "ai" ? "chat-msg-ai" : "chat-msg-user"} ${
      isProbe ? "is-probe" : ""
    }`;

    const who =
      role === "ai"
        ? `<span class="msg-role-badge">${ICONS.bot} <span>${escapeHtml(getActiveMentor().name)}</span></span>`
        : `<span class="msg-role-badge"><span>Câu trả lời của bạn</span></span>`;

    const audioHtml =
      role === "user" && audioUrl
        ? `<div class="audio-playback-bar">
             <span style="font-size:0.72rem; font-weight:700;">Bản thu giọng nói:</span>
             <audio controls preload="metadata" src="${escapeHtml(audioUrl)}"></audio>
           </div>`
        : "";

    div.innerHTML = `
      <div class="chat-msg-meta">
        ${who}
        <span>${escapeHtml(metaLabel || "")}</span>
      </div>
      <div style="white-space:pre-line;">${escapeHtml(text)}</div>
      ${audioHtml}
    `;
    el.chatStream.appendChild(div);
    if (role === "ai") {
      state.lastAiBubbleEl = div;
    }
    el.chatStream.scrollTop = el.chatStream.scrollHeight;
  }

  // ==================== MINI CALCULATOR (+, -, ×, ÷, %, C) ====================
  function switchUtilityTab(tabName) {
    const isCalc = tabName === "calculator";
    if (el.tabBtnCalculator) el.tabBtnCalculator.classList.toggle("active", isCalc);
    if (el.tabBtnScratchpad) el.tabBtnScratchpad.classList.toggle("active", !isCalc);
    if (el.utilPaneCalculator) el.utilPaneCalculator.classList.toggle("active", isCalc);
    if (el.utilPaneScratchpad) el.utilPaneScratchpad.classList.toggle("active", !isCalc);
  }

  function formatNumberReadable(num) {
    if (!Number.isFinite(num)) return "Lỗi phép tính";
    const rounded = Math.round(num * 10000) / 10000;
    return rounded.toLocaleString("en-US", { maximumFractionDigits: 4 });
  }

  function safeEvaluateMathExpression(exprStr) {
    if (!exprStr || !exprStr.trim()) return 0;
    let sanitized = exprStr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/,/g, "")
      .replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

    if (!/^[0-9+\-*/().\s]+$/.test(sanitized)) return NaN;
    const tokens = sanitized.match(/\d+(?:\.\d+)?|[+\-*/()]/g);
    if (!tokens) return 0;

    const output = [];
    const ops = [];
    const prec = { "+": 1, "-": 1, "*": 2, "/": 2 };

    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (/^\d/.test(t)) {
        output.push(parseFloat(t));
      } else if (
        t === "-" &&
        (i === 0 || ["+", "-", "*", "/", "("].includes(tokens[i - 1])) &&
        i + 1 < tokens.length &&
        /^\d/.test(tokens[i + 1])
      ) {
        output.push(-parseFloat(tokens[++i]));
      } else if (t === "(") {
        ops.push(t);
      } else if (t === ")") {
        while (ops.length && ops[ops.length - 1] !== "(") output.push(ops.pop());
        ops.pop();
      } else if (prec[t]) {
        while (ops.length && prec[ops[ops.length - 1]] >= prec[t]) {
          output.push(ops.pop());
        }
        ops.push(t);
      }
    }
    while (ops.length) output.push(ops.pop());

    const stack = [];
    for (const item of output) {
      if (typeof item === "number") {
        stack.push(item);
      } else {
        const b = stack.pop() ?? 0;
        const a = stack.pop() ?? 0;
        if (item === "+") stack.push(a + b);
        else if (item === "-") stack.push(a - b);
        else if (item === "*") stack.push(a * b);
        else if (item === "/") stack.push(b === 0 ? NaN : a / b);
      }
    }
    return stack.length ? stack[stack.length - 1] : 0;
  }

  function resetMiniCalculator() {
    state.calcExpr = "";
    state.calcCurrentResult = "0";
    state.calcJustEvaluated = false;
    updateCalculatorScreen();
  }

  function updateCalculatorScreen() {
    const prettyExpr = (state.calcExpr || "0")
      .replace(/\*/g, " × ")
      .replace(/\//g, " ÷ ")
      .replace(/\+/g, " + ")
      .replace(/-/g, " − ");
    if (el.calcExpressionDisplay) el.calcExpressionDisplay.textContent = prettyExpr;
    if (el.calcResultDisplay) el.calcResultDisplay.textContent = state.calcCurrentResult;
  }

  function handleCalculatorInput(key) {
    if (key === "C") {
      resetMiniCalculator();
      return;
    }
    if (key === "BACK") {
      if (state.calcJustEvaluated) {
        resetMiniCalculator();
        return;
      }
      state.calcExpr = state.calcExpr.slice(0, -1);
      const preview = safeEvaluateMathExpression(state.calcExpr);
      state.calcCurrentResult = Number.isFinite(preview) ? formatNumberReadable(preview) : "0";
      updateCalculatorScreen();
      return;
    }
    if (key === "=") {
      if (!state.calcExpr) return;
      const val = safeEvaluateMathExpression(state.calcExpr);
      const formatted = formatNumberReadable(val);
      if (el.calcLastHistory && Number.isFinite(val)) {
        el.calcLastHistory.textContent = `${state.calcExpr
          .replace(/\*/g, "×")
          .replace(/\//g, "÷")} = ${formatted}`;
      }
      state.calcCurrentResult = formatted;
      state.calcExpr = Number.isFinite(val) ? String(Math.round(val * 10000) / 10000) : "";
      state.calcJustEvaluated = true;
      updateCalculatorScreen();
      return;
    }

    const isOperator = ["+", "-", "*", "/"].includes(key);
    if (state.calcJustEvaluated) {
      if (!isOperator && key !== "%") state.calcExpr = "";
      state.calcJustEvaluated = false;
    }

    if (isOperator && /[+\-*/]$/.test(state.calcExpr)) {
      state.calcExpr = state.calcExpr.slice(0, -1) + key;
    } else {
      state.calcExpr += key;
    }

    if (!/[+\-*/]$/.test(state.calcExpr)) {
      const liveVal = safeEvaluateMathExpression(state.calcExpr);
      if (Number.isFinite(liveVal)) state.calcCurrentResult = formatNumberReadable(liveVal);
    }
    updateCalculatorScreen();
  }

  // ==================== SUBMIT ANSWER ====================
  async function handleRoomSubmitAnswer() {
    if (state.isAnalyzing) return;
    stopAllAiSpeech();

    let recorded = { audioUrl: "", audioDataUrl: "" };
    if (state.isMicRecording) {
      stopMicRecording();
      recorded = await stopAndCollectRecordedAudio();
    } else {
      recorded = await stopAndCollectRecordedAudio();
    }

    let rawInput = el.answerTranscriptInput ? el.answerTranscriptInput.value.trim() : "";

    // Tầng 1 STT Nâng cao: Nếu bật Gemini Audio STT & có bản thu âm -> Phiên âm lại cực chuẩn Vietlish
    if (
      state.sttEngine === "gemini_audio" &&
      state.geminiApiKey &&
      recorded.audioDataUrl
    ) {
      setMentorStageVisual(
        "ai_analyzing",
        "Đang chuẩn hóa phiên âm giọng nói Vietlish qua Gemini 2.0 Audio STT...",
        false
      );
      const refinedTranscript = await transcribeAudioWithGemini(
        recorded.audioDataUrl,
        getActiveTrack()
      );
      if (refinedTranscript) {
        rawInput = refinedTranscript;
      }
    }

    if (!rawInput) {
      if (el.answerTranscriptInput) el.answerTranscriptInput.focus();
      return;
    }

    const cleanAnswer = state.selectedLang === "vi" ? applyPhoneticVietlishFix(rawInput) : rawInput;
    detectVietnameseDialect(cleanAnswer);

    const qIdx = state.currentQIndex;
    const qObj = state.questionsPlan[qIdx];
    const wordCount = cleanAnswer.split(/\s+/).filter(Boolean).length;
    const latencySec =
      state.questionAskedAt && state.firstTypedOrSpokenAt
        ? Number(
            Math.max(1.0, Math.min(30, (state.firstTypedOrSpokenAt - state.questionAskedAt) / 1000)).toFixed(
              1
            )
          )
        : 3.5;

    appendChatBubble(
      "user",
      cleanAnswer,
      `${wordCount} từ · Phản xạ ${latencySec}s`,
      false,
      recorded.audioUrl
    );

    if (el.answerTranscriptInput) el.answerTranscriptInput.value = "";
    state.committedSpeechPrefix = "";
    state.firstTypedOrSpokenAt = 0;
    updateStarBadges("");

    const missedCaseConstraint =
      qObj.followup_rule_regex && !new RegExp(qObj.followup_rule_regex, "i").test(cleanAnswer);
    const tooBrief = wordCount < 20;

    if (!state.hasAskedFollowUpByQ[qIdx] && (missedCaseConstraint || tooBrief)) {
      state.hasAskedFollowUpByQ[qIdx] = true;
      state.primaryDraftByQ[qIdx] = {
        text: cleanAnswer,
        audioUrl: recorded.audioUrl,
        audioDataUrl: recorded.audioDataUrl,
        latencySec
      };

      const isEn = state.selectedLang === "en";
      let fullProbe = "";

      // Nếu đang kết nối Brain Coze Bot (coze.com), gọi Coze với AbortController (hỗ trợ hủy khi Barge-in)
      if (state.aiProvider === "coze" && state.cozeBotId && state.cozeApiToken) {
        abortPendingBrainRequests();
        state.activeBrainAbortController = new AbortController();
        state.isAnalyzing = true;
        setMentorStageVisual("ai_analyzing", "Coze Bot Brain đang suy nghĩ câu hỏi phản biện...", false);
        const cozeReply = await askCozeBotBrain(
          cleanAnswer,
          qObj,
          state.activeBrainAbortController.signal
        );
        state.isAnalyzing = false;
        if (cozeReply) fullProbe = cozeReply;
      }

      if (!fullProbe) {
        const probeBody = isEn ? qObj.followup_probe_en : qObj.followup_probe_vi;
        const probePrefix = isEn
          ? "Good point! Let me ask one follow-up detail:\n"
          : "Hướng tiếp cận tốt đấy! Mình hỏi sâu thêm một chi tiết thực tế này nhé:\n";
        fullProbe = adaptMentorToneByRegion(probePrefix + probeBody);
      }

      appendChatBubble("ai", fullProbe, "Câu hỏi gợi mở tầng 2", true);
      speakMentorText(fullProbe);
      return;
    }

    const prevDraft = state.primaryDraftByQ[qIdx];
    const finalCombinedText = prevDraft
      ? `${prevDraft.text}\n[Bổ sung]: ${cleanAnswer}`
      : cleanAnswer;

    state.qaAnswersByQ[qIdx] = {
      userAnswer: finalCombinedText,
      audioUrl: recorded.audioUrl || prevDraft?.audioUrl || "",
      audioDataUrl: recorded.audioDataUrl || prevDraft?.audioDataUrl || "",
      latencySec: prevDraft?.latencySec || latencySec,
      wordCount: finalCombinedText.split(/\s+/).filter(Boolean).length
    };

    renderQuestionStepperPills();

    const nextUnansweredIdx = state.questionsPlan.findIndex((_, i) => i > qIdx && !state.qaAnswersByQ[i]);
    const anyRemainingIdx = state.questionsPlan.findIndex((_, i) => !state.qaAnswersByQ[i]);
    const targetNextIdx = nextUnansweredIdx !== -1 ? nextUnansweredIdx : anyRemainingIdx;

    if (targetNextIdx !== -1) {
      state.isAnalyzing = true;
      if (el.btnSubmitAnswer) el.btnSubmitAnswer.disabled = true;
      setMentorStageVisual(
        "ai_analyzing",
        "AI Mentor đang phân tích câu trả lời và chuẩn bị tình huống tiếp theo...",
        false
      );

      await new Promise(r => setTimeout(r, 600));
      state.isAnalyzing = false;
      if (el.btnSubmitAnswer) el.btnSubmitAnswer.disabled = false;

      state.currentQIndex = targetNextIdx;
      loadQuestionIntoRoom(targetNextIdx, false);
    } else {
      await finalizeSessionAndOpenReport();
    }
  }

  // ==================== GEMINI API & DETERMINISTIC SCORING ====================
  const SEMANTIC_CONCEPT_SYNONYMS = {
    fefo: /(fefo|phe phô|hết hạn trước xuất trước|ưu tiên hạn dùng)/i,
    fifo: /(fifo|phi phô|nhập trước xuất trước)/i,
    quarantine: /(quarantine|cách ly|khu cách ly|biệt trữ|khóa lô|khóa mã)/i,
    "audit trail": /(audit trail|lịch sử giao dịch|truy vết|nhật ký hệ thống|log wms)/i,
    "cycle count": /(cycle count|kiểm kê định kỳ|đếm chéo|kiểm đếm lại)/i,
    "root cause analysis": /(root cause|nguyên nhân gốc|điều tra nguyên nhân|nhân viên thời vụ|ca đêm)/i,
    "inventory adjustment": /(inventory adjustment|điều chỉnh tồn kho|bút toán điều chỉnh|biên bản điều chỉnh)/i,
    "giờ cấm tải": /(cấm tải|khung giờ cấm|06:00|6h|nội đô)/i,
    "load factor": /(load factor|fill rate|lấp đầy|tải trọng|quá tải|2,?100)/i,
    "time window": /(time window|khung giờ nhận|trước 08|đúng giờ)/i,
    "split delivery": /(split|tách đơn|tách xe|2 xe 1\.9|hai xe 1\.9)/i,
    "route optimization": /(route|tối ưu tuyến|lộ trình|ghép tuyến|milk-run)/i,
    backhaul: /(backhaul|chiều về|quay đầu|hàng về)/i,
    "empty miles": /(empty miles|chạy rỗng|xe rỗng)/i,
    "cost per drop": /(cost per drop|chi phí.*đơn|11,?000|15,?000|16,?000)/i,
    fadr: /(fadr|giao thành công lần đầu|83\.2|83\.3|92%|93%)/i,
    ndr: /(ndr|giao thất bại|hoàn hàng|giao lại)/i,
    "dynamic routing": /(dynamic routing|đảo lộ trình|đảo thứ tự|trước 17:00|trước 18:00|ưu tiên văn phòng)/i,
    "c/o form e": /(form e|mẫu e|c\/o)/i,
    "hs code": /(hs code|mã hs|8481)/i,
    manifest: /(manifest|tu chỉnh|sửa vận đơn|36,?400)/i,
    "dem/det": /(dem|det|lưu bãi|lưu cont|\$270|\$750)/i,
    "nợ c/o": /(nợ c\/o|bổ sung.*30 ngày|hoàn thuế|tạm nộp)/i,
    "vnaccs/vcis": /(vnaccs|ecus|tờ khai|thông quan)/i,
    "days of supply": /(days of supply|dos|7\.47|7\.5 ngày|số ngày tồn)/i,
    "safety stock": /(safety stock|tồn kho an toàn|9,?750)/i,
    rop: /(rop|reorder point|điểm đặt hàng lại|18,?150)/i,
    "dual sourcing": /(dual sourcing|nội địa|việt á|mua bù|nhà cung cấp phụ)/i,
    atp: /(atp|available to promise|tồn khả dụng)/i,
    "buffer stock": /(buffer|tồn đệm|tỷ lệ kênh|allocation)/i,
    "webhook / real-time sync": /(webhook|real-time|thời gian thực|event-driven|kafka|redis)/i,
    "soft allocation": /(soft allocation|giữ chỗ|khóa tồn tạm|reservation)/i
  };

  function evaluateSingleQuestionLocally(qObj, userAnswerText) {
    const clean = (userAnswerText || "").trim();
    if (!clean) {
      return {
        question_id: qObj.question_id,
        score: 0,
        matched_keywords: [],
        missing_keywords: [...(qObj.expected_keywords || [])],
        feedback:
          "Bạn chưa nhập câu trả lời cho câu hỏi này. Hãy bấm 'Thử trả lời lại câu này' bên dưới để luyện tập nhé.",
        ideal_answer: qObj.ideal_answer,
        subscores: { domain: 0, caseSolving: 0, kpiData: 0, commStar: 0 }
      };
    }

    const lower = clean.toLowerCase();
    const words = clean.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const expected = qObj.expected_keywords || [];

    const matched = [];
    const missing = [];

    expected.forEach(kw => {
      const kwNorm = kw.toLowerCase().trim();
      const syn = SEMANTIC_CONCEPT_SYNONYMS[kwNorm];
      const baseToken = kwNorm.split(/[\/(\s]/)[0];
      const isHit =
        lower.includes(kwNorm) ||
        (syn && syn.test(clean)) ||
        (baseToken.length >= 4 && lower.includes(baseToken));
      if (isHit) matched.push(kw);
      else missing.push(kw);
    });

    const kwRatio = expected.length ? matched.length / expected.length : 0.65;
    const hasNumbers = /\d+\s*(%|đ|đồng|triệu|usd|\$|thùng|cuộn|máy|đơn|kg|cbm|ngày)/i.test(clean);
    const hasSteps =
      /(bước 1|bước 2|đầu tiên|thứ nhất|tiếp theo|kết quả|\(s\)|\(a\)|first|second|step 1)/i.test(
        clean
      );

    const domainScore = Math.min(98, Math.round(45 + kwRatio * 44 + Math.min(wordCount * 0.12, 9)));
    const caseScore = Math.min(
      98,
      Math.round(46 + kwRatio * 34 + (hasSteps ? 12 : 0) + (hasNumbers ? 6 : 0))
    );
    const kpiScore = Math.min(98, Math.round(42 + (hasNumbers ? 28 : 4) + kwRatio * 24));
    const starScore = Math.min(
      98,
      Math.round(48 + (hasSteps ? 22 : 5) + (wordCount >= 35 ? 18 : wordCount * 0.4) + (hasNumbers ? 8 : 0))
    );

    const qScore =
      wordCount < 10
        ? Math.min(42, Math.round((domainScore + caseScore) / 3))
        : Math.round(domainScore * 0.3 + caseScore * 0.3 + kpiScore * 0.2 + starScore * 0.2);

    let feedback = "";
    if (missing.length === 0 && hasNumbers) {
      feedback =
        "Rất xuất sắc! Bạn nắm chắc toàn bộ từ khóa chuyên ngành, tính toán số liệu chuẩn xác và trình bày giải pháp mạch lạc.";
    } else if (matched.length > 0) {
      feedback = `Đi đúng trọng tâm khi nêu được ${matched.slice(0, 3).join(", ")}${
        hasNumbers ? " kèm dẫn chứng số liệu" : ""
      }. Cần bổ sung thêm ${missing.slice(0, 3).join(", ")}${
        !hasNumbers ? " và trích dẫn con số tính toán cụ thể" : ""
      } để bài trả lời hoàn chỉnh 100%.`;
    } else {
      feedback = `Câu trả lời còn khái quát, chưa chạm tới các chốt chặn nghiệp vụ quan trọng (${missing
        .slice(0, 3)
        .join(", ")}). Hãy tham khảo gợi ý chuyên gia bên phải và thử trả lời lại nhé!`;
    }

    return {
      question_id: qObj.question_id,
      score: qScore,
      matched_keywords: matched,
      missing_keywords: missing,
      feedback,
      ideal_answer: qObj.ideal_answer,
      subscores: {
        domain: domainScore,
        caseSolving: caseScore,
        kpiData: kpiScore,
        commStar: starScore
      }
    };
  }

  function recomputeAggregateFromQuestionEvals(qEvals) {
    const answered = qEvals.filter(e => e.score > 0);
    const src = answered.length ? answered : qEvals;
    const avg = fn => Math.round(src.reduce((s, item) => s + fn(item), 0) / Math.max(1, src.length));

    const domainKnowledge = avg(e => e.subscores?.domain ?? e.score);
    const caseStudySolving = avg(e => e.subscores?.caseSolving ?? e.score);
    const kpiDataThinking = avg(e => e.subscores?.kpiData ?? e.score);
    const communicationStar = avg(e => e.subscores?.commStar ?? e.score);

    const totalScore = Math.round(
      domainKnowledge * 0.3 +
        caseStudySolving * 0.3 +
        kpiDataThinking * 0.2 +
        communicationStar * 0.2
    );

    let recommendation = "Consider / Hold";
    if (totalScore >= 85) recommendation = "Strong Hire";
    else if (totalScore >= 72) recommendation = "Proceed to Next Round";
    else if (totalScore < 55) recommendation = "No Hire";

    const allMatched = [];
    const allMissing = [];
    qEvals.forEach(ev => {
      (ev.matched_keywords || []).forEach(k => {
        if (!allMatched.includes(k)) allMatched.push(k);
      });
      (ev.missing_keywords || []).forEach(k => {
        if (!allMissing.includes(k)) allMissing.push(k);
      });
    });

    const strengths = [];
    const weaknesses = [];

    if (allMatched.length > 0) {
      strengths.push(`Vận dụng đúng bản chất các thuật ngữ cốt lõi: ${allMatched.slice(0, 6).join(", ")}.`);
    }
    if (kpiDataThinking >= 75) {
      strengths.push("Phân tích tốt dữ liệu bảng tình huống để đưa ra quyết định điều phối/kho vận định lượng.");
    }
    if (communicationStar >= 75) {
      strengths.push("Cấu trúc trả lời rõ ràng, có trình tự hành động hợp lý theo mô hình STAR.");
    }
    if (!strengths.length) {
      strengths.push("Đã hoàn thành phiên luyện tập và tiếp cận được bài toán thực tế của ngành.");
    }

    if (allMissing.length > 0) {
      weaknesses.push(`Cần bổ sung các thuật ngữ & bước kiểm soát còn thiếu: ${allMissing.slice(0, 6).join(", ")}.`);
    }
    if (kpiDataThinking < 70) {
      weaknesses.push("Nên bấm máy tính và nêu rõ con số cụ thể (%, chi phí, chênh lệch tồn, SLA) trong lời nói.");
    }
    if (!weaknesses.length) {
      weaknesses.push("Phong độ rất tốt — có thể nâng lên cấp độ Senior hoặc thử sức bằng Tiếng Anh.");
    }

    return {
      total_score: totalScore,
      recommendation,
      cheating_risk_level: "Low",
      radar_scores: {
        domain_knowledge: domainKnowledge,
        case_study_solving: caseStudySolving,
        kpi_data_thinking: kpiDataThinking,
        communication_star: communicationStar
      },
      executive_summary: {
        strengths: strengths.slice(0, 3),
        weaknesses: weaknesses.slice(0, 3)
      },
      question_evaluations: qEvals.map(ev => ({
        question_id: ev.question_id,
        score: ev.score,
        matched_keywords: ev.matched_keywords,
        missing_keywords: ev.missing_keywords,
        feedback: ev.feedback,
        ideal_answer: ev.ideal_answer
      }))
    };
  }

  const GEMINI_SCORING_PROMPT = `Bạn là một AI Logistics Mentor & Chuyên gia cấp cao ngành Logistics và Chuỗi cung ứng với 15 năm kinh nghiệm.
Nhiệm vụ của bạn là chấm điểm và sửa bài phỏng vấn cho sinh viên một cách khách quan, sắc bén, bám sát thực tế vận hành tại Việt Nam và quốc tế.
QUY TẮC:
1. Tính total_score (0-100) và 4 trục radar_scores (domain_knowledge, case_study_solving, kpi_data_thinking, communication_star).
2. Phân loại chính xác expected_keywords thành matched_keywords và missing_keywords.
3. Đặt cheating_risk_level = "Low".
4. BẮT BUỘC trả về đúng JSON Schema quy định.`;

  const GEMINI_RESPONSE_SCHEMA = {
    type: "OBJECT",
    required: [
      "total_score",
      "recommendation",
      "cheating_risk_level",
      "radar_scores",
      "executive_summary",
      "question_evaluations"
    ],
    properties: {
      total_score: { type: "INTEGER" },
      recommendation: {
        type: "STRING",
        enum: ["Strong Hire", "Proceed to Next Round", "Consider / Hold", "No Hire"]
      },
      cheating_risk_level: { type: "STRING", enum: ["Low", "Medium", "High"] },
      radar_scores: {
        type: "OBJECT",
        required: ["domain_knowledge", "case_study_solving", "kpi_data_thinking", "communication_star"],
        properties: {
          domain_knowledge: { type: "INTEGER" },
          case_study_solving: { type: "INTEGER" },
          kpi_data_thinking: { type: "INTEGER" },
          communication_star: { type: "INTEGER" }
        }
      },
      executive_summary: {
        type: "OBJECT",
        required: ["strengths", "weaknesses"],
        properties: {
          strengths: { type: "ARRAY", items: { type: "STRING" } },
          weaknesses: { type: "ARRAY", items: { type: "STRING" } }
        }
      },
      question_evaluations: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          required: ["question_id", "score", "matched_keywords", "missing_keywords", "feedback", "ideal_answer"],
          properties: {
            question_id: { type: "STRING" },
            score: { type: "INTEGER" },
            matched_keywords: { type: "ARRAY", items: { type: "STRING" } },
            missing_keywords: { type: "ARRAY", items: { type: "STRING" } },
            feedback: { type: "STRING" },
            ideal_answer: { type: "STRING" }
          }
        }
      }
    }
  };

  async function scoreSessionWithGeminiOrFallback(track, level, questions, answersMap) {
    const localQEvals = questions.map((q, idx) =>
      evaluateSingleQuestionLocally(q, answersMap[idx]?.userAnswer || "")
    );
    const localFallbackReport = recomputeAggregateFromQuestionEvals(localQEvals);

    const payload = {
      job_title: track.name,
      level,
      scoring_weights: { domain: 35, case_study: 35, communication: 30 },
      proctoring_logs: { tab_switch_count: 0, fullscreen_exit_count: 0, paste_detected: false },
      questions_and_answers: questions.map((q, idx) => ({
        question_id: q.question_id,
        title: q.title,
        question_text: q.question_text,
        case_study_board: q.case_study_board || undefined,
        expected_keywords: q.expected_keywords,
        candidate_answer: answersMap[idx]?.userAnswer || "(Chưa trả lời)",
        ideal_answer_reference: q.ideal_answer
      }))
    };

    if (window.location.protocol.startsWith("http") && state.aiProvider === "gemini") {
      try {
        const headers = { "Content-Type": "application/json" };
        if (state.geminiApiKey) headers["x-gemini-api-key"] = state.geminiApiKey;
        const r = await fetch("/api/ai/score-session", {
          method: "POST",
          headers,
          body: JSON.stringify(payload)
        });
        if (r.ok) {
          const json = await r.json();
          json.cheating_risk_level = "Low";
          return json;
        }
      } catch (_) {}
    }

    if (state.aiProvider === "gemini" && state.geminiApiKey) {
      try {
        const resp = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": state.geminiApiKey
            },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: GEMINI_SCORING_PROMPT }] },
              contents: [
                {
                  role: "user",
                  parts: [{ text: `Chấm điểm phiên luyện tập:\n${JSON.stringify(payload, null, 2)}` }]
                }
              ],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json",
                responseSchema: GEMINI_RESPONSE_SCHEMA
              }
            })
          }
        );
        if (resp.ok) {
          const data = await resp.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            parsed.cheating_risk_level = "Low";
            return parsed;
          }
        }
      } catch (_) {}
    }

    return localFallbackReport;
  }

  async function rescoreSingleQuestionImmediately(qObj, newAnswerText) {
    const localEv = evaluateSingleQuestionLocally(qObj, newAnswerText);
    if (state.aiProvider === "gemini" && state.geminiApiKey && newAnswerText.trim()) {
      try {
        const singleSchema = {
          type: "OBJECT",
          required: ["score", "matched_keywords", "missing_keywords", "feedback"],
          properties: {
            score: { type: "INTEGER" },
            matched_keywords: { type: "ARRAY", items: { type: "STRING" } },
            missing_keywords: { type: "ARRAY", items: { type: "STRING" } },
            feedback: { type: "STRING" }
          }
        };
        const resp = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": state.geminiApiKey
            },
            body: JSON.stringify({
              system_instruction: {
                parts: [
                  {
                    text: "Bạn là AI Logistics Mentor 15 năm kinh nghiệm. Hãy chấm lại câu trả lời mới của sinh viên theo expected_keywords, số liệu tính toán và cấu trúc STAR. Trả về JSON."
                  }
                ]
              },
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: JSON.stringify({
                        question_id: qObj.question_id,
                        question_text: qObj.question_text,
                        case_study_board: qObj.case_study_board,
                        expected_keywords: qObj.expected_keywords,
                        ideal_answer: qObj.ideal_answer,
                        student_retry_answer: newAnswerText
                      })
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json",
                responseSchema: singleSchema
              }
            })
          }
        );
        if (resp.ok) {
          const data = await resp.json();
          const txt = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (txt) {
            const parsed = JSON.parse(txt);
            return {
              ...localEv,
              score: Number(parsed.score) || localEv.score,
              matched_keywords: parsed.matched_keywords || localEv.matched_keywords,
              missing_keywords: parsed.missing_keywords || localEv.missing_keywords,
              feedback: parsed.feedback || localEv.feedback
            };
          }
        }
      } catch (_) {}
    }
    return localEv;
  }

  async function finalizeSessionAndOpenReport() {
    stopAllAiSpeech();
    stopMicRecording();
    stopElapsedTimer();

    const pendingInput = el.answerTranscriptInput ? el.answerTranscriptInput.value.trim() : "";
    if (pendingInput && !state.qaAnswersByQ[state.currentQIndex]) {
      state.qaAnswersByQ[state.currentQIndex] = {
        userAnswer: state.selectedLang === "vi" ? applyPhoneticVietlishFix(pendingInput) : pendingInput,
        audioUrl: "",
        audioDataUrl: "",
        latencySec: 3.0,
        wordCount: pendingInput.split(/\s+/).filter(Boolean).length
      };
    }

    state.isAnalyzing = true;
    setMentorStageVisual("ai_analyzing", "AI Mentor đang chấm điểm 4 trục và tổng hợp sửa bài...", false);

    const track = getActiveTrack();
    const reportJson = await scoreSessionWithGeminiOrFallback(
      track,
      state.selectedLevel,
      state.questionsPlan,
      state.qaAnswersByQ
    );

    const sessionRecord = {
      sessionId: state.activeSessionId || `sess-${track.id}-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleString("vi-VN"),
      trackId: track.id,
      trackName: track.name,
      trackShort: track.shortTitle,
      level: state.selectedLevel,
      lang: state.selectedLang,
      questions: JSON.parse(JSON.stringify(state.questionsPlan)),
      answers: state.questionsPlan.map((_, idx) => ({
        userAnswer: state.qaAnswersByQ[idx]?.userAnswer || "",
        audioUrl: state.qaAnswersByQ[idx]?.audioUrl || "",
        audioDataUrl: state.qaAnswersByQ[idx]?.audioDataUrl || "",
        latencySec: state.qaAnswersByQ[idx]?.latencySec || 0
      })),
      reportJson
    };

    state.isAnalyzing = false;
    saveSessionRecord(sessionRecord);
    renderReportView(sessionRecord);
    switchView("report", `/report/${sessionRecord.sessionId}`);
  }

  // ==================== REPORT VIEW (/report/[sessionId]) ====================
  function renderCircularProgress(score) {
    const safeScore = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
    if (el.reportTotalScoreNum) el.reportTotalScoreNum.textContent = String(safeScore);
    if (el.reportScoreCircleArc) {
      const radius = 62;
      const circumference = 2 * Math.PI * radius; // ~389.56
      const offset = circumference - (safeScore / 100) * circumference;
      el.reportScoreCircleArc.style.strokeDasharray = `${circumference.toFixed(2)}`;
      requestAnimationFrame(() => {
        el.reportScoreCircleArc.style.strokeDashoffset = `${offset.toFixed(2)}`;
      });
    }
  }

  function buildFourAxisRadarData(radarScores) {
    return [
      { label: "Kiến thức nghiệp vụ", val: Number(radarScores?.domain_knowledge) || 0 },
      { label: "Xử lý tình huống", val: Number(radarScores?.case_study_solving) || 0 },
      { label: "Tư duy KPI/Số liệu", val: Number(radarScores?.kpi_data_thinking) || 0 },
      { label: "Giao tiếp STAR", val: Number(radarScores?.communication_star) || 0 }
    ];
  }

  function buildFourAxisRadarSvg(radarScores) {
    const size = 248;
    const cx = size / 2;
    const cy = size / 2;
    const maxR = 82;
    const axes = buildFourAxisRadarData(radarScores);

    const step = (Math.PI * 2) / 4;
    const start = -Math.PI / 2;
    const pt = (i, pct) => {
      const a = start + i * step;
      const r = (Math.max(0, Math.min(100, pct)) / 100) * maxR;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    };

    const rings = [25, 50, 75, 100]
      .map(lv => {
        const poly = axes.map((_, i) => pt(i, lv).join(",")).join(" ");
        return `<polygon points="${poly}" fill="none" stroke="#E2E8F0" stroke-width="1" />`;
      })
      .join("");

    const lines = axes
      .map((_, i) => {
        const [x, y] = pt(i, 100);
        return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#CBD5E1" stroke-width="1" />`;
      })
      .join("");

    const labels = axes
      .map((ax, i) => {
        const [lx, ly] = pt(i, 126);
        return `<text x="${lx}" y="${ly}" fill="#0F172A" font-size="10.5" font-weight="700" text-anchor="middle" dominant-baseline="middle">${ax.label} (${ax.val})</text>`;
      })
      .join("");

    const dataPoly = axes.map((ax, i) => pt(i, ax.val).join(",")).join(" ");
    const dots = axes
      .map((ax, i) => {
        const [px, py] = pt(i, ax.val);
        return `<circle cx="${px}" cy="${py}" r="4.8" fill="#4F46E5" stroke="#FFFFFF" stroke-width="1.8" />`;
      })
      .join("");

    return `
      <svg width="${size + 144}" height="${size + 16}" viewBox="-72 -8 ${size + 144} ${
      size + 16
    }" style="max-width:100%; overflow:visible;">
        ${rings}
        ${lines}
        <polygon points="${dataPoly}" fill="rgba(79, 70, 229, 0.16)" stroke="#4F46E5" stroke-width="2.4" />
        ${dots}
        ${labels}
      </svg>
    `;
  }

  function buildRadarBarsHtml(radarScores) {
    return buildFourAxisRadarData(radarScores)
      .map(
        ax => `
        <div class="r-bar-item">
          <div class="r-bar-top">
            <span>${ax.label}</span>
            <span style="color:#4F46E5;">${ax.val}/100</span>
          </div>
          <div class="r-bar-track">
            <div class="r-bar-fill" style="width:${Math.max(0, Math.min(100, ax.val))}%;"></div>
          </div>
        </div>
      `
      )
      .join("");
  }

  function renderFourAxisRadarChart(radarScores) {
    if (el.reportRadarMount) {
      el.reportRadarMount.innerHTML = buildFourAxisRadarSvg(radarScores);
    }
    if (el.reportRadarBarsMount) {
      el.reportRadarBarsMount.innerHTML = buildRadarBarsHtml(radarScores);
    }
  }

  function renderReportOverviewSummary(sessionObj) {
    const r = sessionObj.reportJson;
    if (el.reportSessionIdBadge) el.reportSessionIdBadge.textContent = `/report/${sessionObj.sessionId}`;
    if (el.reportTrackBadge) el.reportTrackBadge.textContent = sessionObj.trackShort || sessionObj.trackName;
    if (el.reportLevelBadge) el.reportLevelBadge.textContent = sessionObj.level;
    if (el.reportTimestampSub) {
      el.reportTimestampSub.textContent = `Hoàn thành lúc ${sessionObj.createdAt} · Chuyên ngành: ${sessionObj.trackName}`;
    }

    const recMap = {
      "Strong Hire": "Xuất sắc! Phản xạ thực chiến tiệm cận chuẩn Chuyên gia",
      "Proceed to Next Round": "Rất tốt! Đủ năng lực vượt qua vòng phỏng vấn chuyên môn",
      "Consider / Hold": "Khá tiềm năng — Hãy thử trả lời lại để bổ sung các từ khóa còn thiếu",
      "No Hire": "Khởi đầu tốt — Tham khảo gợi ý chuyên gia bên dưới và thử trả lời lại nhé"
    };
    if (el.reportRecommendationTitle) {
      el.reportRecommendationTitle.textContent =
        recMap[r.recommendation] || recMap["Proceed to Next Round"];
    }

    renderCircularProgress(r.total_score);
    renderFourAxisRadarChart(r.radar_scores || {});

    const strengths = r.executive_summary?.strengths || [];
    const weaknesses = r.executive_summary?.weaknesses || [];
    if (el.reportExecSummaryBox) {
      el.reportExecSummaryBox.innerHTML = `
        <div class="exec-box exec-strengths">
          <h4>Điểm mạnh đã thể hiện</h4>
          <ul>${strengths.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
        </div>
        <div class="exec-box exec-weaknesses">
          <h4>Điểm cần trau dồi thêm</h4>
          <ul>${weaknesses.map(w => `<li>${escapeHtml(w)}</li>`).join("")}</ul>
        </div>
      `;
    }

    if (el.rawJsonPre) {
      el.rawJsonPre.textContent = JSON.stringify(r, null, 2);
    }
  }

  function renderReportView(sessionObj) {
    state.currentReportSession = sessionObj;
    renderReportOverviewSummary(sessionObj);

    if (!el.reportQuestionsMount) return;
    const questions = sessionObj.questions || [];
    const qEvals = sessionObj.reportJson?.question_evaluations || [];

    el.reportQuestionsMount.innerHTML = questions
      .map((qObj, idx) => {
        const ans = sessionObj.answers?.[idx] || { userAnswer: "" };
        const ev =
          qEvals.find(item => item.question_id === qObj.question_id) ||
          qEvals[idx] || {
            question_id: qObj.question_id,
            score: 0,
            matched_keywords: [],
            missing_keywords: qObj.expected_keywords || [],
            feedback: "",
            ideal_answer: qObj.ideal_answer
          };

        const qScore = Number(ev.score) || 0;
        const scoreStyle =
          qScore >= 80
            ? "background:#ECFDF5; color:#047857; border:1px solid #6EE7B7;"
            : qScore >= 60
            ? "background:#EEF2FF; color:#4F46E5; border:1px solid #C7D2FE;"
            : "background:#FFF1F2; color:#BE123C; border:1px solid #FECDD3;";

        const matchedTags = (ev.matched_keywords || [])
          .map(k => `<span class="kw-tag kw-matched">${ICONS.check} <span>${escapeHtml(k)}</span></span>`)
          .join("");
        const missingTags = (ev.missing_keywords || [])
          .map(k => `<span class="kw-tag kw-missing">${ICONS.cross} <span>${escapeHtml(k)}</span></span>`)
          .join("");

        const audioSrc = ans.audioUrl || ans.audioDataUrl || "";
        const audioBlock = audioSrc
          ? `<div class="audio-playback-bar" style="margin-top:0.55rem;">
               <span style="font-size:0.72rem; font-weight:700; color:#4F46E5;">Bản thu âm:</span>
               <audio controls preload="metadata" src="${escapeHtml(audioSrc)}"></audio>
             </div>`
          : "";

        return `
          <article class="q-eval-card" data-q-card="${idx}">
            <div class="q-eval-top">
              <div class="q-eval-title-wrap">
                <span class="room-domain-pill">Câu ${idx + 1} · ${escapeHtml(qObj.question_id)}</span>
                <strong style="font-size:0.96rem;">${escapeHtml(qObj.title)}</strong>
              </div>
              <span class="q-score-pill" id="qScoreBadge_${idx}" style="${scoreStyle}">${qScore} / 100</span>
            </div>

            <div class="q-prompt-box">
              Đề bài: "${escapeHtml(qObj.question_text)}"
            </div>

            <div class="q-feedback-banner" id="qFeedbackBox_${idx}">
              <strong>Nhận xét của AI Mentor:</strong> ${escapeHtml(ev.feedback)}
            </div>

            <div class="keywords-audit-row" id="qKeywordsRow_${idx}">
              <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted);">Từ khóa chuyên ngành:</span>
              ${matchedTags || `<span class="kw-tag kw-missing">Chưa khớp từ khóa mục tiêu</span>`}
              ${missingTags}
            </div>

            <div class="side-by-side-answers">
              <div class="ans-pane ans-student">
                <div class="ans-pane-head">Câu trả lời của bạn</div>
                <div id="qStudentAnsText_${idx}" style="white-space:pre-line;">${
                  ans.userAnswer
                    ? escapeHtml(ans.userAnswer)
                    : `<em style="color:var(--text-muted);">(Chưa trả lời câu hỏi này)</em>`
                }</div>
                ${audioBlock}
              </div>

              <div class="ans-pane ans-expert">
                <div class="ans-pane-head">Gợi ý trả lời chuẩn chuyên gia</div>
                <div style="white-space:pre-line;">${escapeHtml(ev.ideal_answer || qObj.ideal_answer)}</div>
              </div>
            </div>

            <div class="q-eval-footer no-print">
              <span style="font-size:0.77rem; color:var(--text-muted);">
                Bổ sung các thẻ từ khóa còn thiếu ở trên và bấm thử lại để AI chấm lại ngay tại chỗ.
              </span>
              <button type="button" class="btn-retry-inline" data-open-retry="${idx}">
                ${ICONS.refresh}
                <span>Thử trả lời lại câu này</span>
              </button>
            </div>

            <div class="inline-retry-studio no-print" id="retryStudio_${idx}">
              <div class="inline-retry-toolbar">
                <strong style="font-size:0.84rem; color:#3730A3;">Luyện trả lời lại Câu ${idx + 1}</strong>
                <button type="button" class="btn-mic" data-retry-mic="${idx}">
                  Ghi âm giọng nói
                </button>
              </div>
              <textarea
                class="inline-retry-textarea"
                id="retryInput_${idx}"
                placeholder="Bấm 'Ghi âm giọng nói' hoặc viết lại câu trả lời hoàn chỉnh hơn tại đây..."
              >${escapeHtml(ans.userAnswer || "")}</textarea>
              <div style="display:flex; justify-content:flex-end; gap:0.5rem;">
                <button type="button" class="btn-ghost-sm" data-cancel-retry="${idx}">Đóng</button>
                <button type="button" class="btn-primary-cta" data-submit-retry="${idx}">
                  Chấm điểm lại ngay
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    el.reportQuestionsMount.querySelectorAll("[data-open-retry]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-open-retry"), 10);
        const studio = document.getElementById(`retryStudio_${idx}`);
        if (studio) {
          studio.classList.toggle("open");
          const inp = document.getElementById(`retryInput_${idx}`);
          if (studio.classList.contains("open") && inp) inp.focus();
        }
      });
    });

    el.reportQuestionsMount.querySelectorAll("[data-cancel-retry]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-cancel-retry"), 10);
        stopMicRecording();
        document.getElementById(`retryStudio_${idx}`)?.classList.remove("open");
      });
    });

    el.reportQuestionsMount.querySelectorAll("[data-retry-mic]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-retry-mic"), 10);
        const inp = document.getElementById(`retryInput_${idx}`);
        toggleMicForTextarea(inp, btn);
      });
    });

    el.reportQuestionsMount.querySelectorAll("[data-submit-retry]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const idx = parseInt(btn.getAttribute("data-submit-retry"), 10);
        const inp = document.getElementById(`retryInput_${idx}`);
        if (!inp || !inp.value.trim()) {
          if (inp) inp.focus();
          return;
        }
        stopMicRecording();
        const recAudio = await stopAndCollectRecordedAudio();

        const fixedRetryText =
          sessionObj.lang === "vi" ? applyPhoneticVietlishFix(inp.value.trim()) : inp.value.trim();
        inp.value = fixedRetryText;

        btn.disabled = true;
        btn.textContent = "Đang chấm lại...";

        const qObj = sessionObj.questions[idx];
        const updatedSingleEval = await rescoreSingleQuestionImmediately(qObj, fixedRetryText);

        sessionObj.answers[idx] = {
          userAnswer: fixedRetryText,
          audioUrl: recAudio.audioUrl || sessionObj.answers[idx]?.audioUrl || "",
          audioDataUrl: recAudio.audioDataUrl || sessionObj.answers[idx]?.audioDataUrl || "",
          latencySec: 2.5
        };

        const mergedEvals = sessionObj.questions.map((q, i) => {
          if (i === idx) return updatedSingleEval;
          const existingSchemaEv =
            sessionObj.reportJson.question_evaluations.find(e => e.question_id === q.question_id) ||
            sessionObj.reportJson.question_evaluations[i];
          const fallbackLocal = evaluateSingleQuestionLocally(q, sessionObj.answers[i]?.userAnswer || "");
          return existingSchemaEv ? { ...fallbackLocal, ...existingSchemaEv } : fallbackLocal;
        });

        sessionObj.reportJson = recomputeAggregateFromQuestionEvals(mergedEvals);
        saveSessionRecord(sessionObj);
        renderReportView(sessionObj);
      });
    });
  }

  // ==================== HISTORY MODAL ====================
  function renderHistoryModalList() {
    if (!el.historySessionsList) return;
    const list = getSavedSessions();
    if (!list.length) {
      el.historySessionsList.innerHTML = `
        <div style="text-align:center; padding:2.2rem 1rem; color:var(--text-muted); font-size:0.88rem;">
          Chưa có buổi luyện tập nào được lưu. Hãy chọn một chuyên ngành ở Trang chủ để bắt đầu buổi tập đầu tiên.
        </div>
      `;
      return;
    }

    el.historySessionsList.innerHTML = list
      .map(s => {
        const sc = Number(s.reportJson?.total_score) || 0;
        const color = sc >= 80 ? "#059669" : sc >= 65 ? "#4F46E5" : "#E11D48";
        return `
          <div class="history-item-card" data-open-sess="${escapeHtml(s.sessionId)}">
            <div>
              <div style="display:flex; gap:0.4rem; align-items:center; flex-wrap:wrap; margin-bottom:0.2rem;">
                <span class="room-domain-pill">${escapeHtml(s.trackShort || s.trackName)}</span>
                <span class="room-level-pill">${escapeHtml(s.level)}</span>
                <span style="font-size:0.74rem; color:var(--text-muted);">${escapeHtml(s.createdAt)}</span>
              </div>
              <div style="font-size:0.83rem; font-weight:700; color:var(--text-primary);">
                Phiên: <code>/report/${escapeHtml(s.sessionId)}</code>
              </div>
            </div>
            <div style="text-align:right;">
              <div class="tabular-nums" style="font-size:1.35rem; font-weight:800; color:${color};">${sc}/100</div>
              <span style="font-size:0.73rem; font-weight:700; color:var(--indigo-600);">Mở báo cáo →</span>
            </div>
          </div>
        `;
      })
      .join("");

    el.historySessionsList.querySelectorAll("[data-open-sess]").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-open-sess");
        const found = list.find(x => x.sessionId === id);
        if (found) {
          el.historyModal?.classList.remove("open");
          renderReportView(found);
          switchView("report", `/report/${found.sessionId}`);
        }
      });
    });
  }

  // ==================== TEACHER PORTAL (/teacher) ====================
  const KNOWLEDGE_GAP_HINTS = {
    "Quarantine": "Nhắc SV quy tắc khóa mã SKU & tách khu cách ly hàng cận date trước khi kiểm đếm.",
    "Audit Trail": "Hướng dẫn SV truy xuất lịch sử giao dịch WMS để tìm nguyên nhân gốc rễ.",
    "Cycle Count": "Ôn tập phương pháp kiểm kê vòng quay định kỳ không cần dừng kho.",
    "Cost per Drop": "Cho SV thực hành lại công thức chia tổng chi phí tuyến cho số điểm giao thành công.",
    "Giờ cấm tải": "Cập nhật lại khung giờ cấm tải xe >2.5 tấn tại TP.HCM & Hà Nội.",
    "Load Factor": "Nhắc cách tính hệ số lấp đầy trọng tải (kg) và thể tích (CBM).",
    "Safety Buffer": "Giải thích công thức tồn kho đệm (ATP) khi chạy Flash Sale đa sàn.",
    "DEM/DET": "Phân biệt rõ phí lưu bãi (DEM) và lưu vỏ container (DET) khi chậm thông quan.",
    "VGM": "Nhấn mạnh hạn nộp phiếu xác nhận khối lượng toàn phần trước giờ Cut-off.",
    "Root Cause Analysis": "Rèn tư duy 5-Why tìm nguyên nhân gốc thay vì chỉ xử lý bề mặt."
  };

  function getMergedTeacherRoster() {
    // 1. Nếu đã kết nối Supabase Cloud và có bài làm thật từ các máy sinh viên -> nhóm theo MSSV
    if (state.isCloudConnected && Array.isArray(state.cloudTeacherSessions) && state.cloudTeacherSessions.length > 0) {
      const grouped = new Map();
      state.cloudTeacherSessions.forEach(row => {
        const key = (row.mssv || row.student_email || row.session_id || "").toUpperCase();
        const existing = grouped.get(key);
        const matched = Array.isArray(row.matched_keywords) ? row.matched_keywords : [];
        const missing = Array.isArray(row.missing_keywords) ? row.missing_keywords : [];
        if (!existing) {
          grouped.set(key, {
            mssv: row.mssv || "SV-CLOUD",
            name: row.student_name || "Sinh viên",
            email: row.student_email || "sinhvien@edu.vn",
            trackId: row.track_id || "WMS",
            level: row.level || "Junior",
            sessionsCount: 1,
            totalScore: Number(row.total_score) || 0,
            radarScores: row.radar_scores || {
              domain_knowledge: 0,
              case_study_solving: 0,
              kpi_data_thinking: 0,
              communication_star: 0
            },
            matchedKeywords: [...matched],
            missingKeywords: [...missing],
            lastDate: (row.created_at || new Date().toISOString()).slice(0, 10),
            feedback: row.feedback || "Đã đồng bộ từ Supabase Cloud.",
            isLiveSession: true
          });
        } else {
          existing.sessionsCount += 1;
          matched.forEach(k => {
            if (!existing.matchedKeywords.includes(k)) existing.matchedKeywords.push(k);
          });
          missing.forEach(k => {
            if (!existing.missingKeywords.includes(k)) existing.missingKeywords.push(k);
          });
        }
      });
      return Array.from(grouped.values());
    }

    // 2. Fallback khi chạy Local / Demo (chưa kết nối Cloud): gộp phiên vừa luyện cục bộ + danh sách mẫu
    const baseRoster = Array.isArray(DATA.teacherDemoClassRoster) ? DATA.teacherDemoClassRoster : [];
    const localSessions = getSavedSessions();

    const localMapped = localSessions.map((sess, idx) => {
      const ev = sess.evaluation || {};
      const radar = ev.radar_scores || {
        domain_knowledge: 70,
        case_study_solving: 70,
        kpi_data_thinking: 70,
        communication_star: 70
      };
      const qEvals = Array.isArray(ev.question_evaluations) ? ev.question_evaluations : [];
      const matchedSet = new Set();
      const missingSet = new Set();
      qEvals.forEach(q => {
        (q.matched_keywords || []).forEach(k => matchedSet.add(k));
        (q.missing_keywords || []).forEach(k => missingSet.add(k));
      });
      const prof = sess.studentProfile || {};
      const firstFeedback = qEvals[0]?.feedback || (ev.executive_summary?.weaknesses?.[0]) || "Phiên luyện tập trực tiếp từ trình duyệt.";
      return {
        mssv: prof.mssv || `SV-LIVE-${String(idx + 1).padStart(2, "0")}`,
        name: prof.name || `Sinh viên Thực hành #${idx + 1} (Vừa luyện)`,
        email: prof.email || "sinhvien.demo@edu.vn",
        trackId: sess.trackId || "WMS",
        level: sess.level || "Junior",
        sessionsCount: 1,
        totalScore: Number(ev.total_score) || 70,
        radarScores: radar,
        matchedKeywords: Array.from(matchedSet),
        missingKeywords: Array.from(missingSet),
        lastDate: (sess.createdAt || new Date().toISOString()).slice(0, 10),
        feedback: firstFeedback,
        isLiveSession: true
      };
    });

    return [...localMapped, ...baseRoster];
  }

  function getFilteredTeacherRoster() {
    const all = getMergedTeacherRoster();
    const domainFilter = el.teacherDomainFilter ? el.teacherDomainFilter.value : "ALL";
    const search = el.teacherSearchInput ? el.teacherSearchInput.value.trim().toLowerCase() : "";

    return all.filter(st => {
      const matchDomain = domainFilter === "ALL" || st.trackId === domainFilter;
      const matchQuery =
        !search ||
        st.name.toLowerCase().includes(search) ||
        st.mssv.toLowerCase().includes(search) ||
        st.email.toLowerCase().includes(search);
      return matchDomain && matchQuery;
    });
  }

  function renderTeacherPortal() {
    const filtered = getFilteredTeacherRoster();
    const totalClassSize = Math.max(40, filtered.length);
    const totalSessions = filtered.reduce((acc, s) => acc + (Number(s.sessionsCount) || 1), 0);
    const avgScore =
      filtered.length > 0
        ? (filtered.reduce((acc, s) => acc + (Number(s.totalScore) || 0), 0) / filtered.length).toFixed(1)
        : "0.0";
    const passCount = filtered.filter(s => (Number(s.totalScore) || 0) >= 70).length;
    const passPct = filtered.length > 0 ? Math.round((passCount / filtered.length) * 100) : 0;

    // Tính trung bình 4 trục Radar toàn lớp
    const axisKeys = [
      { key: "domain_knowledge", label: "Kiến thức nghiệp vụ" },
      { key: "case_study_solving", label: "Xử lý tình huống" },
      { key: "kpi_data_thinking", label: "Tư duy KPI/Số liệu" },
      { key: "communication_star", label: "Giao tiếp STAR" }
    ];
    const axisAvgs = axisKeys.map(ax => {
      const avg =
        filtered.length > 0
          ? Math.round(
              filtered.reduce((sum, st) => sum + (Number(st.radarScores?.[ax.key]) || 0), 0) / filtered.length
            )
          : 0;
      return { ...ax, avg };
    });
    const sortedAxes = [...axisAvgs].sort((a, b) => b.avg - a.avg);
    const strongest = sortedAxes[0] || { label: "--", avg: 0 };
    const weakest = sortedAxes[sortedAxes.length - 1] || { label: "--", avg: 0 };

    if (el.tkActiveStudents) el.tkActiveStudents.textContent = `${filtered.length} / ${totalClassSize}`;
    if (el.tkTotalSessionsSub) el.tkTotalSessionsSub.textContent = `${totalSessions} lượt phỏng vấn hoàn thành`;
    if (el.tkClassAvgScore) el.tkClassAvgScore.textContent = `${avgScore}`;
    if (el.tkPassRateSub) el.tkPassRateSub.textContent = `${passPct}% đạt chuẩn Junior (≥70đ)`;
    if (el.tkStrongestAxis) el.tkStrongestAxis.textContent = strongest.label;
    if (el.tkStrongestAxisScore) el.tkStrongestAxisScore.textContent = `Trung bình ${strongest.avg}/100`;
    if (el.tkWeakestAxis) el.tkWeakestAxis.textContent = weakest.label;
    if (el.tkWeakestAxisScore) el.tkWeakestAxisScore.textContent = `Trung bình ${weakest.avg}/100`;
    if (el.teacherVisibleCountBadge) el.teacherVisibleCountBadge.textContent = `${filtered.length} sinh viên`;

    // Render bảng danh sách sinh viên
    if (el.teacherStudentsTbody) {
      if (filtered.length === 0) {
        el.teacherStudentsTbody.innerHTML = `
          <tr>
            <td colspan="6" style="text-align:center; padding:1.5rem; color:#64748B;">
              Không tìm thấy sinh viên phù hợp với bộ lọc hiện tại.
            </td>
          </tr>
        `;
      } else {
        el.teacherStudentsTbody.innerHTML = filtered
          .map((st, idx) => {
            const score = Number(st.totalScore) || 0;
            const scoreCls = score >= 80 ? "high" : score >= 70 ? "mid" : "low";
            const r = st.radarScores || {};
            const liveBadge = st.isLiveSession
              ? `<span style="font-size:0.68rem; background:#DCFCE7; color:#15803D; padding:1px 5px; border-radius:4px; margin-left:4px;">Mới</span>`
              : "";
            return `
              <tr>
                <td>
                  <div class="t-student-name">${escapeHtml(st.name)}${liveBadge}</div>
                  <div class="t-student-sub tabular-nums">${escapeHtml(st.mssv)} • ${escapeHtml(st.email)}</div>
                </td>
                <td>
                  <span class="room-domain-pill" style="font-size:0.72rem;">${escapeHtml(st.trackId)}</span>
                  <div class="t-student-sub">${escapeHtml(st.level)}</div>
                </td>
                <td style="text-align:center;" class="tabular-nums">${Number(st.sessionsCount) || 1}</td>
                <td style="text-align:center;">
                  <span class="t-score-pill ${scoreCls} tabular-nums">${score}</span>
                </td>
                <td class="t-radar-mini tabular-nums">
                  ${r.domain_knowledge || 0} · ${r.case_study_solving || 0} · ${r.kpi_data_thinking || 0} · ${r.communication_star || 0}
                </td>
                <td style="text-align:right;">
                  <button type="button" class="btn-view-radar" data-student-idx="${idx}">Xem Radar</button>
                </td>
              </tr>
            `;
          })
          .join("");

        el.teacherStudentsTbody.querySelectorAll(".btn-view-radar").forEach(btn => {
          btn.addEventListener("click", () => {
            const i = Number(btn.getAttribute("data-student-idx"));
            if (!Number.isNaN(i) && filtered[i]) {
              openTeacherStudentModal(filtered[i]);
            }
          });
        });
      }
    }

    // Tổng hợp thống kê kiến thức cả lớp hay sai / bỏ sót nhất
    const gapCounts = {};
    filtered.forEach(st => {
      (st.missingKeywords || []).forEach(kw => {
        gapCounts[kw] = (gapCounts[kw] || 0) + 1;
      });
    });
    const sortedGaps = Object.entries(gapCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    if (el.teacherKnowledgeGapsList) {
      if (sortedGaps.length === 0) {
        el.teacherKnowledgeGapsList.innerHTML = `<p style="font-size:0.84rem; color:#64748B;">Chưa ghi nhận lỗ hổng từ khóa nào ở nhóm này.</p>`;
      } else {
        el.teacherKnowledgeGapsList.innerHTML = sortedGaps
          .map(([kw, count]) => {
            const pct = filtered.length > 0 ? Math.round((count / filtered.length) * 100) : 0;
            const hint =
              KNOWLEDGE_GAP_HINTS[kw] ||
              `Gợi ý: Nhấn mạnh lại khái niệm & tình huống thực tế liên quan đến "${kw}" trên lớp.`;
            return `
              <div class="gap-item-card">
                <div class="gap-item-top">
                  <span>${escapeHtml(kw)}</span>
                  <span class="tabular-nums">${pct}% lớp bỏ sót (${count}/${filtered.length} SV)</span>
                </div>
                <div class="gap-bar-track">
                  <div class="gap-bar-fill" style="width:${pct}%;"></div>
                </div>
                <div class="gap-item-hint">${escapeHtml(hint)}</div>
              </div>
            `;
          })
          .join("");
      }
    }

    if (el.teacherActionInsightBox) {
      const topGapName = sortedGaps[0]?.[0] || "các chỉ số KPI";
      el.teacherActionInsightBox.innerHTML = `
        <strong>💡 Gợi ý giảng dạy cho Thầy/Cô buổi tới:</strong><br/>
        Trục năng lực thấp nhất của lớp hiện là <strong>${escapeHtml(weakest.label)} (${weakest.avg}/100)</strong> và kiến thức bị thiếu nhiều nhất là <strong>${escapeHtml(topGapName)}</strong>. Thầy/Cô có thể dành 15 phút đầu giờ chữa mẫu 1 Case Study về chủ đề này.
      `;
    }
  }

  function openTeacherStudentModal(student) {
    if (!student || !el.teacherStudentModal) return;
    if (el.tsModalMssvBadge) el.tsModalMssvBadge.textContent = student.mssv;
    if (el.tsModalTrackBadge) el.tsModalTrackBadge.textContent = `${student.trackId} • ${student.level}`;
    if (el.tsModalStudentName) el.tsModalStudentName.textContent = student.name;
    if (el.tsModalMetaSub) {
      el.tsModalMetaSub.textContent = `${student.email} • ${student.sessionsCount} buổi đã luyện • Gần nhất: ${student.lastDate}`;
    }
    if (el.tsModalTotalScore) el.tsModalTotalScore.textContent = `${student.totalScore}/100`;
    if (el.tsModalRadarMount) el.tsModalRadarMount.innerHTML = buildFourAxisRadarSvg(student.radarScores);
    if (el.tsModalRadarBarsMount) el.tsModalRadarBarsMount.innerHTML = buildRadarBarsHtml(student.radarScores);

    if (el.tsModalMatchedKws) {
      const matched = student.matchedKeywords || [];
      el.tsModalMatchedKws.innerHTML =
        matched.length > 0
          ? matched.map(k => `<span class="kw-chip-matched">${ICONS.check} ${escapeHtml(k)}</span>`).join("")
          : `<span style="font-size:0.78rem; color:#64748B;">Chưa ghi nhận</span>`;
    }
    if (el.tsModalMissingKws) {
      const missing = student.missingKeywords || [];
      el.tsModalMissingKws.innerHTML =
        missing.length > 0
          ? missing.map(k => `<span class="kw-chip-missing">${ICONS.cross} ${escapeHtml(k)}</span>`).join("")
          : `<span style="font-size:0.78rem; color:#059669;">Không thiếu từ khóa trọng tâm</span>`;
    }
    if (el.tsModalFeedbackBox) {
      el.tsModalFeedbackBox.innerHTML = `<strong>Nhận xét AI Mentor:</strong> ${escapeHtml(student.feedback || "")}`;
    }
    el.teacherStudentModal.classList.add("open");
  }

  function exportTeacherExcelCsv() {
    const rows = getFilteredTeacherRoster();
    const headers = [
      "STT",
      "MSSV",
      "Ho va ten",
      "Email",
      "Mang nganh",
      "Cap do",
      "So buoi da tap",
      "Diem tong (0-100)",
      "Kien thuc nghiep vu",
      "Xu ly tinh huong",
      "Tu duy KPI/So lieu",
      "Giao tiep STAR",
      "Tu khoa con thieu",
      "Ngay luyen gan nhat"
    ];

    const csvEscape = val => {
      const str = String(val === null || val === undefined ? "" : val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const lines = [headers.map(csvEscape).join(",")];
    rows.forEach((st, idx) => {
      const r = st.radarScores || {};
      const line = [
        idx + 1,
        st.mssv,
        st.name,
        st.email,
        st.trackId,
        st.level,
        st.sessionsCount || 1,
        st.totalScore || 0,
        r.domain_knowledge || 0,
        r.case_study_solving || 0,
        r.kpi_data_thinking || 0,
        r.communication_star || 0,
        (st.missingKeywords || []).join("; "),
        st.lastDate || getTodayIsoDate()
      ];
      lines.push(line.map(csvEscape).join(","));
    });

    // UTF-8 BOM để mở trực tiếp trên Microsoft Excel không bị lỗi font tiếng Việt
    const csvContent = "\uFEFF" + lines.join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Bang_Diem_LogiMentor_Lop_LOGI-K22A_${getTodayIsoDate()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // ==================== BIND EVENTS ====================
  function bindEvents() {
    window.addEventListener("hashchange", handleHashChange);

    if (el.btnBrandHome) {
      el.btnBrandHome.addEventListener("click", e => {
        e.preventDefault();
        switchView("home", "/");
      });
    }

    if (el.btnQuickLaunchRecommended) {
      el.btnQuickLaunchRecommended.addEventListener("click", () => {
        const doneTracks = new Set(getSavedSessions().map(s => s.trackId));
        const nextTrack = DATA.tracks.find(t => !doneTracks.has(t.id)) || DATA.tracks[1] || DATA.tracks[0];
        openQuickStartModal(nextTrack.id);
      });
    }

    const bindSegGroup = (container, attr, onSelect) => {
      if (!container) return;
      container.querySelectorAll(".seg-pill").forEach(btn => {
        btn.addEventListener("click", () => {
          container.querySelectorAll(".seg-pill").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          onSelect(btn.getAttribute(attr));
        });
      });
    };

    bindSegGroup(el.qsLevelGroup, "data-level", val => {
      if (val) state.selectedLevel = val;
    });
    bindSegGroup(el.qsLangGroup, "data-lang", val => {
      if (val) state.selectedLang = val;
    });
    bindSegGroup(el.qsStartModeGroup, "data-start-mode", val => {
      if (val) state.startMode = val;
    });

    [el.btnCloseQuickStart, el.btnCancelQuickStart].forEach(b => {
      if (b) b.addEventListener("click", () => el.quickStartModal?.classList.remove("open"));
    });
    if (el.btnStartPracticeNow) {
      el.btnStartPracticeNow.addEventListener("click", () => {
        unlockAudioPlayback();
        saveStudentProfileFromModal();
        startNewPracticeSession();
      });
    }

    if (el.btnOpenHistoryDrawer) {
      el.btnOpenHistoryDrawer.addEventListener("click", () => {
        renderHistoryModalList();
        el.historyModal?.classList.add("open");
      });
    }
    if (el.btnCloseHistoryModal) {
      el.btnCloseHistoryModal.addEventListener("click", () => el.historyModal?.classList.remove("open"));
    }
    if (el.btnClearAllHistory) {
      el.btnClearAllHistory.addEventListener("click", () => {
        if (!window.confirm("Xóa toàn bộ lịch sử luyện tập trên trình duyệt này?")) return;
        localStorage.removeItem(SESSIONS_STORAGE_KEY);
        refreshNavbarGamificationPills();
        renderHistoryModalList();
      });
    }

    const syncApiModalFieldsVisibility = () => {
      const providerVal = el.aiProviderSelect ? el.aiProviderSelect.value : state.aiProvider;
      const sttVal = el.sttEngineSelect ? el.sttEngineSelect.value : state.sttEngine;
      const needGemini = providerVal === "gemini" || sttVal === "gemini_audio";
      if (el.geminiKeyFieldWrap) {
        el.geminiKeyFieldWrap.style.display = needGemini ? "block" : "none";
      }
      if (el.cozeConfigFieldWrap) {
        el.cozeConfigFieldWrap.style.display = providerVal === "coze" ? "block" : "none";
      }
    };

    if (el.btnOpenApiModal) {
      el.btnOpenApiModal.addEventListener("click", () => {
        if (el.sttEngineSelect) el.sttEngineSelect.value = state.sttEngine;
        if (el.aiProviderSelect) el.aiProviderSelect.value = state.aiProvider;
        if (el.geminiApiKeyInput) el.geminiApiKeyInput.value = state.geminiApiKey;
        if (el.cozeBotIdInput) el.cozeBotIdInput.value = state.cozeBotId;
        if (el.cozeApiTokenInput) el.cozeApiTokenInput.value = state.cozeApiToken;
        if (el.supabaseUrlInput) el.supabaseUrlInput.value = state.supabaseUrl;
        if (el.supabaseAnonKeyInput) el.supabaseAnonKeyInput.value = state.supabaseAnonKey;
        syncApiModalFieldsVisibility();
        el.apiConfigModal?.classList.add("open");
      });
    }
    if (el.aiProviderSelect) {
      el.aiProviderSelect.addEventListener("change", syncApiModalFieldsVisibility);
    }
    if (el.sttEngineSelect) {
      el.sttEngineSelect.addEventListener("change", syncApiModalFieldsVisibility);
    }
    [el.btnCloseApiModal, el.btnCancelApiModal].forEach(b => {
      if (b) b.addEventListener("click", () => el.apiConfigModal?.classList.remove("open"));
    });
    if (el.btnSaveApiModal) {
      el.btnSaveApiModal.addEventListener("click", () => {
        state.sttEngine = el.sttEngineSelect ? el.sttEngineSelect.value : "webspeech_hybrid";
        state.aiProvider = el.aiProviderSelect ? el.aiProviderSelect.value : "builtin";
        state.geminiApiKey = el.geminiApiKeyInput ? el.geminiApiKeyInput.value.trim() : "";
        state.cozeBotId = el.cozeBotIdInput ? el.cozeBotIdInput.value.trim() : "";
        state.cozeApiToken = el.cozeApiTokenInput ? el.cozeApiTokenInput.value.trim() : "";
        state.supabaseUrl = el.supabaseUrlInput ? el.supabaseUrlInput.value.trim() : "";
        state.supabaseAnonKey = el.supabaseAnonKeyInput ? el.supabaseAnonKeyInput.value.trim() : "";
        const remember = el.chkRememberGeminiKey ? el.chkRememberGeminiKey.checked : true;

        localStorage.setItem("logimentor_supabase_url", state.supabaseUrl);
        localStorage.setItem("logimentor_supabase_anon_key", state.supabaseAnonKey);

        sessionStorage.setItem("logimentor_stt_engine", state.sttEngine);
        sessionStorage.setItem("logimentor_provider", state.aiProvider);
        sessionStorage.setItem("logimentor_gemini_key", state.geminiApiKey);
        sessionStorage.setItem("logimentor_coze_bot_id", state.cozeBotId);
        sessionStorage.setItem("logimentor_coze_token", state.cozeApiToken);
        sessionStorage.setItem("logivoice_provider", state.aiProvider);
        sessionStorage.setItem("logivoice_gemini_key", state.geminiApiKey);

        if (remember) {
          localStorage.setItem("logimentor_stt_engine", state.sttEngine);
          localStorage.setItem("logimentor_provider", state.aiProvider);
          localStorage.setItem("logimentor_gemini_key", state.geminiApiKey);
          localStorage.setItem("logimentor_coze_bot_id", state.cozeBotId);
          localStorage.setItem("logimentor_coze_token", state.cozeApiToken);
          localStorage.setItem("logivoice_provider", state.aiProvider);
          localStorage.setItem("logivoice_gemini_key", state.geminiApiKey);
        }
        refreshNavbarGamificationPills();
        el.apiConfigModal?.classList.remove("open");
      });
    }

    // Interview Room Controls
    if (el.btnBackHomeFromRoom) {
      el.btnBackHomeFromRoom.addEventListener("click", () => switchView("home", "/"));
    }
    if (el.btnFinishSessionEarly) {
      el.btnFinishSessionEarly.addEventListener("click", finalizeSessionAndOpenReport);
    }
    if (el.voiceRateSelect) {
      el.voiceRateSelect.addEventListener("change", () => {
        state.voiceRate = parseFloat(el.voiceRateSelect.value) || 0.96;
        if (state.isAiSpeaking && state.lastAiSpokenText) {
          speakMentorText(state.lastAiSpokenText);
        }
      });
    }
    if (el.btnReplayQuestionAudio) {
      el.btnReplayQuestionAudio.addEventListener("click", () => {
        unlockAudioPlayback();
        if (state.lastAiSpokenText) speakMentorText(state.lastAiSpokenText);
      });
    }
    if (el.chkEnableAiVoice) {
      el.chkEnableAiVoice.addEventListener("change", () => {
        state.enableAiVoice = el.chkEnableAiVoice.checked;
        if (!state.enableAiVoice) stopAllAiSpeech();
      });
    }
    if (el.chkEnableBargeIn) {
      el.chkEnableBargeIn.addEventListener("change", () => {
        state.enableBargeIn = el.chkEnableBargeIn.checked;
        if (!state.enableBargeIn) stopBargeInMonitor();
        else if (state.isAiSpeaking) startBargeInMonitor();
      });
    }

    if (el.btnMicRecord) {
      el.btnMicRecord.addEventListener("click", () => toggleMicForTextarea(el.answerTranscriptInput));
    }
    if (el.btnToggleKeywordHints) {
      el.btnToggleKeywordHints.addEventListener("click", toggleKeywordHintsDrawer);
    }
    if (el.answerTranscriptInput) {
      el.answerTranscriptInput.addEventListener("input", () => {
        if (!state.firstTypedOrSpokenAt && el.answerTranscriptInput.value.trim()) {
          state.firstTypedOrSpokenAt = Date.now();
        }
        updateStarBadges(el.answerTranscriptInput.value);
      });
    }
    if (el.btnClearTranscript) {
      el.btnClearTranscript.addEventListener("click", () => {
        if (el.answerTranscriptInput) {
          el.answerTranscriptInput.value = "";
          state.committedSpeechPrefix = "";
          updateStarBadges("");
          el.answerTranscriptInput.focus();
        }
      });
    }
    if (el.btnSubmitAnswer) {
      el.btnSubmitAnswer.addEventListener("click", handleRoomSubmitAnswer);
    }

    if (el.tabBtnCalculator) {
      el.tabBtnCalculator.addEventListener("click", () => switchUtilityTab("calculator"));
    }
    if (el.tabBtnScratchpad) {
      el.tabBtnScratchpad.addEventListener("click", () => switchUtilityTab("scratchpad"));
    }
    document.querySelectorAll(".calc-key").forEach(keyBtn => {
      keyBtn.addEventListener("click", () => {
        const k = keyBtn.getAttribute("data-calc");
        if (k) handleCalculatorInput(k);
      });
    });
    if (el.btnInsertCalcToAnswer) {
      el.btnInsertCalcToAnswer.addEventListener("click", () => {
        const val = state.calcCurrentResult || "0";
        insertTextAtCursor(el.answerTranscriptInput, val);
        if (el.scratchpadTextarea) {
          const hist = el.calcLastHistory?.textContent || val;
          el.scratchpadTextarea.value =
            (el.scratchpadTextarea.value.trim() ? el.scratchpadTextarea.value.trim() + "\n" : "") +
            `• Tính toán: ${hist}`;
        }
      });
    }

    if (el.btnToggleMobileSheet && el.caseStudyAside) {
      el.btnToggleMobileSheet.addEventListener("click", () => {
        const open = el.caseStudyAside.classList.toggle("sheet-open");
        if (el.mobileSheetToggleLabel) {
          el.mobileSheetToggleLabel.textContent = open ? "Thu gọn" : "Mở rộng";
        }
      });
    }

    document.addEventListener("keydown", e => {
      if (state.currentView === "interview" && e.altKey && (e.key === "m" || e.key === "M")) {
        e.preventDefault();
        toggleMicForTextarea(el.answerTranscriptInput);
      }
    });

    if (el.btnBackHomeFromReport) {
      el.btnBackHomeFromReport.addEventListener("click", () => switchView("home", "/"));
    }
    if (el.btnToggleScoreJson && el.rawJsonPanel) {
      el.btnToggleScoreJson.addEventListener("click", () => {
        const open = el.rawJsonPanel.style.display === "block";
        el.rawJsonPanel.style.display = open ? "none" : "block";
      });
    }
    if (el.btnCopyRawJson && el.rawJsonPre) {
      el.btnCopyRawJson.addEventListener("click", () => {
        if (navigator.clipboard && el.rawJsonPre.textContent) {
          navigator.clipboard.writeText(el.rawJsonPre.textContent);
          el.btnCopyRawJson.textContent = "Đã Copy";
          setTimeout(() => {
            el.btnCopyRawJson.textContent = "Copy JSON";
          }, 1500);
        }
      });
    }
    if (el.btnPrintReport) {
      el.btnPrintReport.addEventListener("click", () => window.print());
    }

    // Teacher Portal Events
    if (el.btnOpenTeacherPortal) {
      el.btnOpenTeacherPortal.addEventListener("click", () => {
        renderTeacherPortal();
        switchView("teacher", "/teacher");
        fetchTeacherSessionsFromCloud();
      });
    }
    if (el.btnSyncTeacherCloud) {
      el.btnSyncTeacherCloud.addEventListener("click", fetchTeacherSessionsFromCloud);
    }
    if (el.teacherClassCodeInput) {
      el.teacherClassCodeInput.addEventListener("change", fetchTeacherSessionsFromCloud);
    }
    if (el.btnBackHomeFromTeacher) {
      el.btnBackHomeFromTeacher.addEventListener("click", () => switchView("home", "/"));
    }
    if (el.teacherDomainFilter) {
      el.teacherDomainFilter.addEventListener("change", renderTeacherPortal);
    }
    if (el.teacherSearchInput) {
      el.teacherSearchInput.addEventListener("input", renderTeacherPortal);
    }
    if (el.btnExportTeacherExcel) {
      el.btnExportTeacherExcel.addEventListener("click", exportTeacherExcelCsv);
    }
    [el.btnCloseTeacherStudentModal, el.btnOkTeacherStudentModal].forEach(b => {
      if (b) b.addEventListener("click", () => el.teacherStudentModal?.classList.remove("open"));
    });

    [el.quickStartModal, el.historyModal, el.apiConfigModal, el.teacherStudentModal].forEach(overlay => {
      if (!overlay) return;
      overlay.addEventListener("click", e => {
        if (e.target === overlay) overlay.classList.remove("open");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initDOM();
    ensureVoicesLoaded();
    initSpeechRecognition();
    renderDomainsGrid();
    refreshNavbarGamificationPills();
    bindEvents();
    handleHashChange();
  });
})();
