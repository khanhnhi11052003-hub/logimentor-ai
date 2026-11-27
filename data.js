/**
 * data.js — Dữ liệu thực chiến đồng bộ 100% với `src/data/mockCaseStudies.ts`
 * Dành riêng cho phiên bản EdTech Sinh viên tự luyện tập phỏng vấn AI ngành Logistics.
 */

window.LOGISTICS_DATA = {
  // Bộ sửa lỗi phiên âm Vietlish tự động khi sinh viên nói tiếng Việt chèn thuật ngữ chuyên ngành tiếng Anh
  phoneticCorrections: [
    { pattern: /\b(ép ô bi|phốp|f o b)\b/gi, replace: "FOB" },
    { pattern: /\b(xi ai ép|xíp|c i f)\b/gi, replace: "CIF" },
    { pattern: /\b(ép xi ây|f c a)\b/gi, replace: "FCA" },
    { pattern: /\b(biu ọp lây đinh|biu of lading|bill ọp lây đinh)\b/gi, replace: "Bill of Lading" },
    { pattern: /\b(bi eo|biu|vận đơn bi eo|b l)\b/gi, replace: "B/L" },
    { pattern: /\b(hát bi eo|hau biu|h b l)\b/gi, replace: "HBL" },
    { pattern: /\b(em bi eo|mát tơ biu|m b l)\b/gi, replace: "MBL" },
    { pattern: /\b(xi ô phom i|xi ô form e|co form e)\b/gi, replace: "C/O Form E" },
    { pattern: /\b(xi ô|giấy chứng nhận xuất xứ xi ô)\b/gi, replace: "C/O" },
    { pattern: /\b(eo xi|thư tín dụng eo xi)\b/gi, replace: "L/C" },
    { pattern: /\b(đắp liu em ét|vê kép em ét|w m s)\b/gi, replace: "WMS" },
    { pattern: /\b(ti em ét|t m s)\b/gi, replace: "TMS" },
    { pattern: /\b(ô em ét|o m s)\b/gi, replace: "OMS" },
    { pattern: /\b(i a pi|e r p)\b/gi, replace: "ERP" },
    { pattern: /\b(phi phô|f i f o)\b/gi, replace: "FIFO" },
    { pattern: /\b(phe phô|phê phô|f e f o)\b/gi, replace: "FEFO" },
    { pattern: /\b(hát ét cốt|mã hát ét|h s code)\b/gi, replace: "HS Code" },
    { pattern: /\b(ép xi eo|f c l)\b/gi, replace: "FCL" },
    { pattern: /\b(eo xi eo|l c l)\b/gi, replace: "LCL" },
    { pattern: /\b(vi gi em|v g m)\b/gi, replace: "VGM" },
    { pattern: /\b(đi ô|lệnh đi ô)\b/gi, replace: "D/O" },
    { pattern: /\b(ét eo ây|s l a)\b/gi, replace: "SLA" },
    { pattern: /\b(ét ca u|s k u)\b/gi, replace: "SKU" },
    { pattern: /\b(pi ô đi|p o d)\b/gi, replace: "POD" },
    { pattern: /\b(ô ti ai ép|o t i f)\b/gi, replace: "OTIF" },
    { pattern: /\b(em ô quy|m o q)\b/gi, replace: "MOQ" },
    { pattern: /\b(ti xi ô|t c o)\b/gi, replace: "TCO" },
    { pattern: /\b(vê nắc|vnacc)\b/gi, replace: "VNACCS/VCIS" },
    { pattern: /\b(ê cút|ecus)\b/gi, replace: "ECUS5" },
    { pattern: /\b(cắt ọp|cut off)\b/gi, replace: "Cut-off" },
    { pattern: /\b(lít tham|lead time)\b/gi, replace: "Lead Time" },
    { pattern: /\b(đem đét|dem det)\b/gi, replace: "DEM/DET" },
    { pattern: /\b(qua ran tin|qua răn tin)\b/gi, replace: "Quarantine" },
    { pattern: /\b(au đít trêu|audit trêu)\b/gi, replace: "Audit Trail" },
    { pattern: /\b(sai cồ cao|cycle cao)\b/gi, replace: "Cycle Count" },
    { pattern: /\b(sếp ti tốc|safety tốc)\b/gi, replace: "Safety Stock" },
    { pattern: /\b(a ô pi|r o p)\b/gi, replace: "ROP" },
    { pattern: /\b(ây ti pi|a t p)\b/gi, replace: "ATP" },
    { pattern: /\b(ô vơ seo|over sell|oversell)\b/gi, replace: "Overselling" },
    { pattern: /\b(xi ô đi|c o d)\b/gi, replace: "COD" },
    { pattern: /\b(en đi a|n d r)\b/gi, replace: "NDR" },
    { pattern: /\b(ép ây đi a|f a d r)\b/gi, replace: "FADR" },
    { pattern: /\b(cốt pơ đờ róp|cost per drop)\b/gi, replace: "Cost per Drop" },
    { pattern: /\b(bách hau|back haul)\b/gi, replace: "Backhaul" },
    { pattern: /\b(iu ây ti|u a t)\b/gi, replace: "UAT" },
    { pattern: /\b(bi a đi|b r d)\b/gi, replace: "BRD" }
  ],

  // Mentor theo cấp độ luyện tập của sinh viên
  mentorsByLevel: {
    "Intern/Fresher": {
      name: "Chị Minh Anh — AI Logistics Mentor",
      role: "Senior Talent Coach • Hướng dẫn tận tình",
      badge: "Coach Gợi Mở",
      stylePrompt: "Thân thiện, khích lệ tinh thần sinh viên, gợi mở tư duy thực tế ngành Logistics Việt Nam, nhận xét thẳng thắn dễ hiểu."
    },
    Junior: {
      name: "Anh Hoàng Nam — AI Ops Mentor",
      role: "Operations Manager • 10 năm kinh nghiệm thực chiến",
      badge: "Mentor Thực Chiến",
      stylePrompt: "Tập trung vào số liệu vận hành, quy trình SOP, xử lý sự cố hiện trường và kiểm tra kỹ năng tính toán KPI."
    },
    Senior: {
      name: "Anh Quốc Bảo — AI Supply Chain Director",
      role: "Supply Chain Director • 15 năm kinh nghiệm MNC",
      badge: "Chuyên Gia Cấp Cao",
      stylePrompt: "Sắc bén, đòi hỏi tư duy tối ưu chi phí tổng thể (TCO), quản trị rủi ro hệ thống và ra quyết định dựa trên dữ liệu."
    }
  },

  // 6 Nhóm ngành Logistics cốt lõi cho Sinh viên tự luyện tập
  tracks: [
    // 1. VẬN TẢI & ĐIỀU PHỐI (TMS)
    {
      id: "tms",
      code: "TMS",
      name: "Vận tải & Điều phối (TMS)",
      nameEn: "Transportation & Fleet Dispatch (TMS)",
      shortTitle: "TMS & Điều phối",
      lucideIcon: "truck",
      pastelBg: "#EEF2FF",
      pastelBorder: "#C7D2FE",
      iconBg: "#E0E7FF",
      accentColor: "#4F46E5",
      badgeText: "Fleet & Routing",
      description: "Lập kế hoạch ghép tuyến, kiểm soát khung giờ cấm tải nội đô, tối ưu hệ số lấp đầy (Fill Rate) và chi phí nhiên liệu.",
      casePreviewLabel: "📊 Case: Ghép xe cấm tải nội đô & tính Fill Rate",
      vietlishTerms: ["Time Window", "Load Factor", "Backhaul", "Empty Miles", "Split Delivery", "Route Optimization", "OTIF"],
      questions: [
        {
          question_id: "tms_q01",
          domain: "TMS",
          level: "Intern/Fresher",
          type: "warmup_star",
          time_limit_sec: 120,
          title: "Kiểm soát xe chạy rỗng (Empty Miles) & định mức nhiên liệu",
          question_text: "Khi điều phối đội xe tải giao hàng liên tỉnh, làm thế nào bạn vừa đảm bảo đúng cam kết thời gian giao hàng (Time Window) của khách, vừa giảm tỷ lệ xe quay đầu chạy rỗng (Empty Miles)? Hãy trình bày theo cấu trúc STAR.",
          question_text_en: "When dispatching an inter-provincial truck fleet, how do you meet customer Time Windows while minimizing Empty Miles on return trips? Please structure your answer using STAR.",
          expected_keywords: ["Time Window", "Backhaul", "Empty Miles", "Route Optimization", "GPS / Telematics"],
          keyword_hints_vi: [
            "Khai thác hàng chiều về (Backhaul) từ nhà cung cấp nguyên liệu hoặc sàn ghép hàng",
            "Gom đơn theo cụm tuyến (Milk-run / Route Optimization) trên phần mềm TMS",
            "Giám sát lộ trình GPS / Telematics thời gian thực để cảnh báo dừng đỗ bất thường"
          ],
          followup_probe_vi: "Nếu tài xế tự ý ghé dọc đường làm có nguy cơ trễ Time Window của siêu thị 45 phút, trên hệ thống TMS và GPS bạn thiết lập cảnh báo sớm như thế nào?",
          followup_probe_en: "If a driver makes an unauthorized stop and risks missing a supermarket Time Window by 45 minutes, what early alerts would you configure on TMS/GPS?",
          ideal_answer: "(S) Tại đội xe phân phối tuyến Bình Dương – Đồng Nai, tỷ lệ xe quay đầu rỗng từng ở mức 38% gây đội chi phí vận tải. (T) Mục tiêu giữ tỷ lệ giao đúng Time Window >= 98% và kéo Empty Miles xuống dưới 20%. (A) Tôi quy hoạch lại lịch chạy Milk-run trên TMS, thiết lập Geofencing cảnh báo dừng đỗ quá 15 phút qua GPS/Telematics; đồng thời phối hợp bộ phận Thu mua gom nguyên liệu bao bì chiều về (Backhaul) từ các nhà cung cấp dọc tuyến. (R) Sau 2 tháng, tỷ lệ giao đúng giờ đạt 98.6%, giảm 22% quãng đường chạy rỗng và tiết kiệm 14% chi phí dầu Diesel/tháng."
        },
        {
          question_id: "tms_case_01",
          domain: "TMS",
          level: "Junior",
          type: "case_study",
          time_limit_sec: 180,
          title: "Ghép tuyến nội đô tránh giờ cấm tải & Tính chi phí điều xe tối ưu",
          question_text: "Lúc 05:30 sáng tại Kho Tổng Bình Tân, bạn cần xếp xe giao 3 đơn hàng trong bảng số liệu bên phải. TP.HCM cấm xe tải trên 2.5 tấn vào nội đô từ 06:00 – 09:00 sáng. Hãy dùng máy tính mini kiểm tra tải trọng/thể tích và đề xuất phương án điều xe có tổng chi phí thấp nhất mà không bị phạt trễ giờ!",
          question_text_en: "At 05:30 AM at Binh Tan Hub, you must dispatch 3 orders shown in the right-hand table. HCMC bans trucks >2.5T from inner-city districts between 06:00 and 09:00 AM. Calculate weight/volume utilization and propose the lowest-cost dispatch plan with zero late penalties!",
          case_study_board: {
            context: "Ca điều phối 05:30 sáng | Kho Bình Tân -> TP.HCM | Cấm tải > 2.5T nội đô (Q1, Q3): 06:00 - 09:00",
            unit_hint: "Gợi ý tính: Cộng kg & CBM của ORD-101 + ORD-102 so với sức chứa XE-1.9T",
            table_headers: ["Mã Đơn / Xe", "Tuyến / Phương tiện", "Khối lượng", "Thể tích", "Giới hạn Khung giờ", "Cước chuyến / Phạt"],
            table_rows: [
              ["ORD-101", "Quận 1 (Siêu thị A)", "1,150 kg", "6.2 CBM", "Giao trước 08:00 (Nội đô)", "Phạt trễ: 2,000,000đ"],
              ["ORD-102", "Quận 3 (Chuỗi F&B B)", "950 kg", "5.4 CBM", "Giao trước 08:30 (Nội đô)", "Phạt trễ: 1,500,000đ"],
              ["ORD-103", "TP. Thủ Đức (Đại lý C)", "2,600 kg", "12.0 CBM", "Giao trước 11:30 (Ngoài vành đai)", "Phạt trễ: 1,000,000đ"],
              ["XE-1.9T (x2 xe)", "Tải nhẹ vào nội đô 24/7", "Max 1,900 kg", "Max 10.0 CBM", "Được chạy 06:00 - 09:00", "1,100,000đ / chuyến"],
              ["XE-5.0T (x1 xe)", "Tải trung (Cấm nội đô)", "Max 5,000 kg", "Max 24.0 CBM", "Cấm Q1, Q3 từ 06:00 - 09:00", "1,850,000đ / chuyến"]
            ],
            notes: [
              "Kho đang có sẵn 02 chiếc XE-1.9T và 01 chiếc XE-5.0T chờ xuất phát tại Dock.",
              "Khách hàng ORD-102 cho phép tách giao nhiều xe (Split Delivery) miễn đủ hàng trước 08:30 sáng."
            ]
          },
          expected_keywords: ["Giờ cấm tải", "Load Factor", "Time Window", "Split Delivery", "Route Optimization", "4,050,000đ"],
          keyword_hints_vi: [
            "ORD-101 + ORD-102 = 1,150 + 950 = 2,100 kg (> 1,900 kg) và 6.2 + 5.4 = 11.6 CBM (> 10.0 CBM) -> Quá tải nếu dồn vào 1 xe 1.9T!",
            "Điều 02 chiếc XE-1.9T giao nội đô Q1 & Q3 trước 08:30; điều 01 chiếc XE-5.0T giao ORD-103 đi Thủ Đức ngoài vành đai cấm tải",
            "Tổng chi phí điều xe = 2 × 1,100,000 + 1,850,000 = 4,050,000đ (tránh mức phạt trễ 4,500,000đ)"
          ],
          followup_rule_regex: "(2,?100|11\\.?6|quá tải|2\\s*xe\\s*1\\.?9|hai\\s*xe\\s*1\\.?9|4,?050|4\\.05|tách)",
          followup_probe_vi: "Khoan đã! Nếu bạn xếp cả ORD-101 (1,150 kg; 6.2 CBM) và ORD-102 (950 kg; 5.4 CBM) lên chung 1 chiếc XE-1.9T thì tổng lên tới 2,100 kg và 11.6 CBM — vượt trần 1,900 kg và 10 CBM rồi! Bạn chia xe cụ thể thế nào và tổng chi phí điều xe là bao nhiêu?",
          followup_probe_en: "Hold on! Combining ORD-101 (1,150 kg; 6.2 CBM) and ORD-102 (950 kg; 5.4 CBM) onto one 1.9T truck totals 2,100 kg and 11.6 CBM—exceeding its 1,900 kg / 10 CBM limit! How do you allocate the trucks and what is the exact total dispatch cost?",
          ideal_answer: "Bước 1 (Kiểm tra tải trọng & Giờ cấm tải): Cộng ORD-101 + ORD-102 = 2,100 kg và 11.6 CBM, vượt trần 1 xe 1.9T (1,900 kg / 10 CBM); trong khi XE-5.0T bị cấm vào Quận 1, Quận 3 khung 06:00–09:00. Bước 2 (Phương án điều phối chuẩn): Cho xuất phát lúc 05:45 gồm 02 xe 1.9T vào nội đô: Xe 1.9T #1 chở ORD-101 (1,150 kg; 6.2 CBM - Load Factor 62%) giao Quận 1 trước 08:00; Xe 1.9T #2 chở ORD-102 (950 kg; 5.4 CBM) giao Quận 3 trước 08:30. Riêng ORD-103 (2,600 kg; 12 CBM đi Thủ Đức ngoài vành đai cấm tải) điều chiếc XE-5.0T giao thẳng trước 11:30. Bước 3 (Hiệu quả chi phí): Tổng cước = 2 × 1,100,000đ + 1,850,000đ = 4,050,000đ, đạt 100% SLA Time Window, không vi phạm tải trọng và tránh được khoản phạt trễ 4,500,000đ."
        },
        {
          question_id: "tms_q03",
          domain: "TMS",
          level: "Senior",
          type: "kpi_optimization",
          time_limit_sec: 150,
          title: "Thiết lập bộ KPI đánh giá Nhà xe phụ (Sub-contractors 3PL)",
          question_text: "Khi công ty thuê ngoài 5 nhà xe phụ (Sub-contractors) chạy mùa cao điểm Tết, bạn theo dõi những chỉ số KPI nào hàng tuần để thưởng/phạt công bằng và kiểm soát chất lượng giao nhận?",
          question_text_en: "When outsourcing to 5 sub-carrier fleets during peak season, which weekly KPIs do you track to enforce SLAs and fair incentives/penalties?",
          expected_keywords: ["OTIF", "POD", "Truck No-show Rate", "Damage Rate", "Cost per Ton-Km"],
          keyword_hints_vi: [
            "OTIF (On-Time In-Full — giao đúng giờ & đủ số lượng)",
            "Tỷ lệ bỏ chuyến / trễ điều xe (Truck No-show Rate <= 2%)",
            "Thời gian hoàn chứng từ gốc POD (Proof of Delivery) để khóa sổ công nợ"
          ],
          followup_probe_vi: "Nếu một nhà xe chào giá cước rẻ hơn 8% nhưng luôn nộp trễ biên bản POD giấy tới 15 ngày làm treo công nợ khách hàng, bạn đặt điều khoản chế tài thế nào?",
          followup_probe_en: "If a sub-carrier offers 8% lower rates but delays returning signed PODs by 15 days, what contract SLA clause would you enforce?",
          ideal_answer: "(S) Mùa cao điểm Tết sản lượng tăng gấp đôi khiến đội xe nhà chỉ đáp ứng 55%, phải thuê thêm 5 nhà xe 3PL. (T) Thiết lập bộ Scorecard minh bạch kiểm soát chất lượng giao hàng. (A) Tôi áp dụng 4 KPI trên TMS: 1) OTIF >= 97%; 2) Truck No-show Rate <= 2%; 3) Tỷ lệ hư hỏng hàng < 0.1%; 4) Bắt buộc chụp e-POD lên App tài xế trong 2 giờ sau giao và hoàn POD giấy trong 5 ngày làm việc (gắn liền điều kiện giải ngân cước). (R) Phân bổ ưu tiên tuyến tốt cho Top 2 nhà xe hạng A, giữ OTIF mùa Tết đạt 97.4% và rút ngắn vòng đối soát công nợ từ 18 ngày xuống 6 ngày."
        }
      ]
    },

    // 2. KHO BÃI & TỒN KHO (WMS)
    {
      id: "wms",
      code: "WMS",
      name: "Kho bãi & Tồn kho (WMS)",
      nameEn: "Warehouse & Inventory Operations (WMS)",
      shortTitle: "WMS & Kho bãi",
      lucideIcon: "warehouse",
      pastelBg: "#ECFDF5",
      pastelBorder: "#A7F3D0",
      iconBg: "#D1FAE5",
      accentColor: "#059669",
      badgeText: "Storage & Accuracy",
      description: "Quản trị nhập xuất lưu kho trên WMS, kiểm kê Cycle Count, nguyên tắc FIFO/FEFO, quy hoạch Slotting ABC và xử lý lệch tồn.",
      casePreviewLabel: "📊 Case: Lệch tồn kho lạnh 5% & hàng cận date 5 ngày",
      vietlishTerms: ["FEFO", "FIFO", "Quarantine", "Audit Trail", "Cycle Count", "Root Cause Analysis", "Inventory Adjustment", "Slotting"],
      questions: [
        {
          question_id: "wms_q01",
          domain: "WMS",
          level: "Intern/Fresher",
          type: "warmup_star",
          time_limit_sec: 120,
          title: "Quy hoạch vị trí kệ ABC Slotting & Tối ưu quãng đường lấy hàng",
          question_text: "Trong kho phân phối có 3,000 mã SKU nhưng nhân viên lấy hàng (Picker) thường xuyên phải đi bộ quá xa dẫn đến trễ giờ xuất xe. Bạn ứng dụng phân tích ABC và Slotting trên WMS như thế nào để tăng năng suất?",
          question_text_en: "In a distribution center with 3,000 SKUs, pickers walk excessive distances causing outbound delays. How would you apply ABC classification and WMS Slotting to boost picking productivity?",
          expected_keywords: ["ABC Analysis", "Slotting", "Fast-moving", "Golden Zone", "Batch Picking"],
          keyword_hints_vi: [
            "Đưa nhóm A (20% SKU chiếm 80% lượt lấy hàng) ra dãy kệ gần khu đóng gói/Outbound và ở tầng ngang thắt lưng (Golden Zone)",
            "Gom nhiều đơn lấy 1 lượt theo đường đi chữ S (Batch / Wave Picking) trên súng PDA"
          ],
          followup_probe_vi: "Khi danh mục hàng bán chạy thay đổi theo mùa (ví dụ bánh trung thu hoặc bia nước ngọt dịp Tết), bao lâu bạn cập nhật lại Slotting một lần?",
          followup_probe_en: "When fast-moving SKUs shift seasonally, how frequently do you execute Re-slotting without disrupting daily operations?",
          ideal_answer: "(S) Kho FMCG rộng 8,000m2 với 3,000 SKU trước đây xếp hàng ngẫu nhiên vào ô trống khiến Picker mất 4.5 phút/dòng đơn. (T) Tăng năng suất lấy hàng tối thiểu 30%. (A) Tôi trích xuất dữ liệu Pick Frequency 90 ngày trên WMS để phân loại ABC, quy hoạch nhóm A (Fast-moving) ra đầu kệ gần khu Staging/Outbound và đặt ở tầng thấp Golden Zone; kết hợp chuyển sang Batch Picking theo lộ trình chữ S trên PDA. (R) Giảm 38% quãng đường đi bộ, tăng năng suất từ 42 lên 61 dòng/giờ và 100% xe xuất kho đúng Cut-off time."
        },
        {
          question_id: "wms_case_01",
          domain: "WMS",
          level: "Junior",
          type: "case_study",
          time_limit_sec: 180,
          title: "Xử lý lệch tồn kho 5% & Hàng cận date tại Kho Lạnh Thủ Đức",
          question_text: "Trong đợt kiểm kê định kỳ sáng nay tại Kho Lạnh thực phẩm, bạn phát hiện bảng số liệu bên phải có sự chênh lệch lớn ở 2 mã SKU chủ lực. Hãy dùng máy tính tính giá trị chênh lệch, đánh giá rủi ro đơn hàng sáng mai và nêu từng bước xử lý trong 24 giờ tới!",
          question_text_en: "During this morning's cycle count at Thu Duc Cold Storage, you discovered major variances in two core SKUs shown in the right-hand table. Calculate the financial variance, evaluate tomorrow morning's order risk, and outline your 24-hour action plan!",
          case_study_board: {
            context: "Ngày kiểm kê: 26/11/2026 | Kho Lạnh Thủ Đức (2°C - 4°C) | Dung sai cho phép: ±0.2%",
            unit_hint: "Tính giá trị lệch (-100 × 320,000đ) & đối chiếu HSD 5 ngày vs yêu cầu 7 ngày của Siêu thị X",
            table_headers: ["Mã SKU", "Tên hàng", "Tồn hệ thống (WMS)", "Tồn thực tế", "Chênh lệch", "Hạn sử dụng (HSD)", "Giá vốn"],
            table_rows: [
              ["MILK-01", "Sữa tươi thanh trùng 1L", "2,000 thùng", "1,900 thùng", "-100 thùng (-5.0%)", "01/12/2026 (Còn 5 ngày)", "320,000đ/thùng"],
              ["BEEF-05", "Thịt bò Úc đông mát", "500 kg", "515 kg", "+15 kg (+3.0%)", "15/12/2026 (Còn 19 ngày)", "450,000đ/kg"]
            ],
            notes: [
              "Đơn hàng siêu thị X yêu cầu giao gấp 800 thùng MILK-01 vào 06:00 sáng mai (hợp đồng bắt buộc HSD còn tối thiểu >= 7 ngày).",
              "Ca đêm hôm qua có 02 nhân viên thời vụ mới nhận việc tham gia soạn hàng xuất kho."
            ]
          },
          expected_keywords: ["FEFO", "Quarantine", "Audit Trail", "Cycle Count", "Root Cause Analysis", "Inventory Adjustment"],
          keyword_hints_vi: [
            "Giá trị lệch MILK-01: -100 × 320,000 = -32,000,000đ; BEEF-05: +15 × 450,000 = +6,750,000đ",
            "Cực kỳ quan trọng: MILK-01 chỉ còn 5 ngày HSD (< 7 ngày yêu cầu của Siêu thị X) -> Khóa mã và chuyển sang khu cách ly (Quarantine) ngay để không xuất nhầm!",
            "Đếm chéo lại kệ lân cận (Cycle Count) & truy xuất Audit Trail ca đêm có 2 nhân viên thời vụ mới"
          ],
          followup_rule_regex: "(siêu thị|supermarket|800\\s*thùng|7\\s*ngày|5\\s*ngày|6h|06:00|sáng mai|quarantine|khu cách ly|cách ly|đổi lô)",
          followup_probe_vi: "Với đơn hàng 800 thùng giao Siêu thị X vào 6h sáng mai, hàng MILK-01 hiện tại chỉ còn 5 ngày HSD trong khi siêu thị yêu cầu tối thiểu 7 ngày — bạn xử lý đơn này thế nào?",
          followup_probe_en: "Regarding the urgent 800-carton order for Supermarket X at 6:00 AM tomorrow, current MILK-01 stock only has 5 days of shelf-life left while they require at least 7 days. How do you handle this order?",
          ideal_answer: "Bước 1 (Khóa rủi ro đơn hàng & Hàng cận date): Lô MILK-01 đang lệch âm -100 thùng (-32,000,000đ giá vốn) và chỉ còn 5 ngày HSD — không đủ chuẩn >= 7 ngày của Siêu thị X. Tôi lập tức khóa mã lô này trên WMS và chuyển sang khu cách ly (Quarantine) để chặn xuất nhầm lúc 6h sáng mai; đồng thời báo khẩn Sales/Supply Planning điều chuyển lô date mới từ kho nhà máy giao cho Siêu thị X, còn 1,900 thùng cận date (trị giá 608 triệu đồng) đề xuất xả nhanh kênh HORECA theo nguyên tắc FEFO. Bước 2 (Root Cause Analysis): Thực hiện Cycle Count đếm chéo các vị trí Bin lân cận, trích xuất lịch sử giao dịch (Audit Trail) và camera ca đêm của 2 nhân viên thời vụ để xác định lỗi xuất không quét PDA hay cân nhầm sang BEEF-05 (+15 kg, +6.75 triệu đồng). Bước 3: Lập biên bản đối soát chứng từ và trình duyệt bút toán điều chỉnh tồn kho (Inventory Adjustment) trên WMS trong 24 giờ."
        },
        {
          question_id: "wms_q03",
          domain: "WMS",
          level: "Senior",
          type: "kpi_optimization",
          time_limit_sec: 150,
          title: "Thiết kế chương trình Cycle Count đạt Độ chính xác tồn kho IRA >= 99.8%",
          question_text: "Thay vì đóng cửa kho 3 ngày cuối năm để kiểm kê toàn bộ, bạn thiết kế quy trình Cycle Count hàng ngày trên WMS như thế nào để duy trì Độ chính xác tồn kho (IRA) đạt từ 99.8% trở lên?",
          question_text_en: "Instead of shutting down the warehouse for 3 days for year-end physical inventory, how do you design a daily Cycle Counting program to sustain Inventory Record Accuracy (IRA) >= 99.8%?",
          expected_keywords: ["Cycle Count", "IRA", "Blind Count", "ABC Frequency", "PDA Scanning"],
          keyword_hints_vi: [
            "Áp dụng đếm mù (Blind Count) trên PDA — ẩn số tồn hệ thống để nhân viên phải đếm thật",
            "Phân tần suất đếm theo ABC: Nhóm A đếm 2 tuần/lần, Nhóm B hàng tháng, Nhóm C hàng quý"
          ],
          followup_probe_vi: "Vì sao khi phát phiếu Cycle Count trên PDA, bạn bắt buộc phải ẩn số lượng tồn hệ thống (Blind Count)?",
          followup_probe_en: "Why must system stock quantities be hidden from counters (Blind Count) during Cycle Count execution?",
          ideal_answer: "(S) Kiểm kê đóng kho cuối năm làm ngưng trệ giao hàng 72 giờ. (T) Duy trì IRA >= 99.8% quanh năm bằng kiểm kê cuốn chiếu. (A) Tôi cấu hình WMS tự động phát lệnh Cycle Count đầu ca sáng theo tần suất ABC (nhóm A đếm 2 tuần/lần, B hàng tháng, C hàng quý) và bật chế độ Blind Count trên PDA để chống tâm lý điền khống theo số hệ thống. Mọi chênh lệch vượt ngưỡng đều tự động kích hoạt phiếu Recount độc lập cho Giám sát và truy vết Audit Trail ngay trong ca. (R) IRA duy trì đạt 99.88% suốt 4 quý và bỏ hoàn toàn đợt đóng kho cuối năm."
        }
      ]
    },

    // 3. GIAO HÀNG CHẶNG CUỐI (LAST-MILE)
    {
      id: "last_mile",
      code: "LAST_MILE",
      name: "Giao hàng chặng cuối (Last-mile)",
      nameEn: "Last-mile Delivery & Hub Operations",
      shortTitle: "Last-mile Delivery",
      lucideIcon: "bike",
      pastelBg: "#FFFBEB",
      pastelBorder: "#FDE68A",
      iconBg: "#FEF3C7",
      accentColor: "#D97706",
      badgeText: "E-Com & Hub Ops",
      description: "Vận hành bưu cục giao nhận chặng cuối, tối ưu Cost per Drop, nâng tỷ lệ giao thành công lần đầu (FADR) và đối soát tiền thu hộ COD.",
      casePreviewLabel: "📊 Case: Tính Cost per Drop & cắt tỷ lệ hoàn NDR 24%",
      vietlishTerms: ["Cost per Drop", "FADR", "NDR", "COD Reconciliation", "Dynamic Routing", "Smart Locker", "Return Scan"],
      questions: [
        {
          question_id: "lm_q01",
          domain: "LAST_MILE",
          level: "Intern/Fresher",
          type: "warmup_star",
          time_limit_sec: 120,
          title: "Kiểm soát tiền thu hộ COD & Chốt ca bưu tá cuối ngày",
          question_text: "Tại bưu cục giao hàng TMĐT với 40 shipper thu hộ hàng trăm triệu đồng tiền mặt mỗi ngày, bạn thiết lập quy trình đối soát tiền COD và hàng hoàn cuối ca như thế nào để không xảy ra thất thoát?",
          question_text_en: "At an E-commerce delivery hub with 40 riders collecting hundreds of millions VND in cash COD daily, how do you control cash reconciliation and return parcels at shift-end?",
          expected_keywords: ["COD Reconciliation", "Hạn mức ví Shipper", "VietQR động", "Return Scan", "Đối soát cuối ca"],
          keyword_hints_vi: [
            "Khóa trần tiền mặt trên tay Shipper (chạm ngưỡng 5 triệu đồng phải nộp/chuyển khoản tự động mới nhận tiếp đơn mới)",
            "Gắn mã VietQR động cho từng vận đơn để tiền chảy thẳng về tài khoản công ty và quét Return Scan 100% kiện hoàn"
          ],
          followup_probe_vi: "Nếu cuối ca một shipper báo khách đã nhận hàng nhưng xin khất sang sáng mai mới nộp tiền mặt COD thì bạn xử lý thế nào theo kỷ luật bưu cục?",
          followup_probe_en: "If a rider marks a parcel delivered without remitting COD cash and asks to delay payment until tomorrow, how do you handle it?",
          ideal_answer: "(S) Bưu cục xử lý 3,500 đơn/ngày với tỷ lệ COD tiền mặt 65%, dễ phát sinh lệch quỹ cuối ca. (T) Đảm bảo Zero Cash Discrepancy 100% trong ngày. (A) Tôi triển khai 3 chốt chặn: 1) Áp trần giữ tiền mặt 5,000,000đ trên App Shipper — chạm trần tự động khóa nhận đơn mới cho tới khi nộp quỹ; 2) In/hiển thị VietQR định danh theo mã vận đơn giúp kéo tỷ lệ tiền mặt xuống 28%; 3) Cuối ca bắt buộc quét Return Scan từng bưu kiện giao thất bại khớp trạng thái NDR trước khi ký đóng ca. (R) 100% kỳ đối soát khớp tuyệt đối suốt 6 tháng và giảm thời gian chốt ca tối từ 60 xuống 20 phút."
        },
        {
          question_id: "lm_case_01",
          domain: "LAST_MILE",
          level: "Junior",
          type: "case_study",
          time_limit_sec: 180,
          title: "Tính Cost per Drop & Cắt giảm tỷ lệ giao thất bại (NDR) dịp Mega Sale 11/11",
          question_text: "Báo cáo cuối ngày 11/11 tại Bưu cục Quận 7 (bảng bên phải) cho thấy chi phí trên mỗi đơn giao thành công (Cost per Successful Drop) đang đội lên cao. Định mức mục tiêu là Cost per Drop <= 11,500đ/đơn và tỷ lệ giao thành công lần đầu (FADR) >= 92%. Hãy dùng máy tính tính chính xác Cost per Drop từng tuyến, FADR toàn Hub và đề xuất giải pháp khắc phục cho Tuyến B & Tuyến C!",
          question_text_en: "End-of-day 11/11 metrics at District 7 Hub (right-hand table) show rising delivery costs. Targets are Cost per Successful Drop <= 11,500 VND and FADR >= 92%. Calculate the exact Cost per Drop per route, overall Hub FADR, and propose fixes for Route B and Route C!",
          case_study_board: {
            context: "Bưu cục Quận 7 (Hub Q7-LM) | Báo cáo ngày 11/11 | Mục tiêu: Cost/Drop <= 11,500đ & FADR >= 92%",
            unit_hint: "Công thức: Cost per Successful Drop = Tổng chi phí tuyến ÷ Số đơn giao thành công",
            table_headers: ["Tuyến Bưu Tá", "Tổng đơn phân tuyến", "Giao thành công", "Hoàn / Giao lại (NDR)", "Tổng chi phí tuyến", "Nguyên nhân NDR chính"],
            table_rows: [
              ["Tuyến A (Chung cư)", "160 đơn", "148 đơn", "12 đơn (7.5%)", "1,628,000đ", "Khách vắng nhà giờ hành chính"],
              ["Tuyến B (Khu Văn phòng)", "150 đơn", "114 đơn", "36 đơn (24.0%)", "1,710,000đ", "Giao sau 18:00 văn phòng đóng cửa"],
              ["Tuyến C (Nhà phố Hẻm sâu)", "120 đơn", "96 đơn", "24 đơn (20.0%)", "1,536,000đ", "Đơn COD > 2 triệu không nghe máy"]
            ],
            notes: [
              "Mỗi đơn NDR phải mang về kho quét nhập hoàn và phát lại vào hôm sau làm tốn gấp đôi chi phí phân loại.",
              "Xe tải trung chuyển đổ hàng về Bưu cục Quận 7 làm 2 đợt: Wave 1 lúc 06:30 sáng và Wave 2 lúc 13:30 chiều."
            ]
          },
          expected_keywords: ["Cost per Drop", "FADR", "NDR", "Dynamic Routing", "COD Pre-confirmation", "Smart Locker"],
          keyword_hints_vi: [
            "Kết quả bấm máy: Tuyến A = 1,628,000 ÷ 148 = 11,000đ (Đạt); Tuyến B = 1,710,000 ÷ 114 = 15,000đ (Vượt +30.4%!); Tuyến C = 1,536,000 ÷ 96 = 16,000đ (Vượt +39.1%!)",
            "FADR toàn bưu cục = (148 + 114 + 96) ÷ 430 = 358 ÷ 430 = 83.26% (< 92%)",
            "Tuyến B: Ưu tiên chia chọn sớm & đảo lộ trình giao văn phòng dứt điểm trước 17:00; Tuyến C: Callbot/Zalo xác nhận trước khi mang đơn COD > 2 triệu ra khỏi kho"
          ],
          followup_rule_regex: "(15,?000|16,?000|11,?000|83\\.?2|83\\.?3|358)",
          followup_probe_vi: "Bạn hãy dùng máy tính mini chốt con số cụ thể nhé: Cost per Successful Drop của Tuyến B và Tuyến C chính xác là bao nhiêu đồng/đơn, FADR toàn bưu cục đang đạt bao nhiêu %, và ở Wave 2 lúc 13:30 chiều bạn tổ chức chia hàng cho Tuyến B thế nào để kịp trước 17:30?",
          followup_probe_en: "Please check the exact numbers on the calculator: what is the exact Cost per Successful Drop for Route B and Route C, what is the overall Hub FADR %, and how will you prioritize Wave 2 sorting at 13:30 for Route B?",
          ideal_answer: "Bước 1 (Chẩn đoán bằng con số định lượng): Tổng FADR toàn bưu cục mới đạt 358/430 = 83.26% (hụt 8.74% so với mục tiêu 92%). Xét Cost per Successful Drop: Tuyến A đạt 1,628,000 ÷ 148 = 11,000đ/đơn (Đạt); nhưng Tuyến B vọt lên 1,710,000 ÷ 114 = 15,000đ/đơn (+30.4%) và Tuyến C đội lên 1,536,000 ÷ 96 = 16,000đ/đơn (+39.1%). Bước 2 (Giải pháp Tuyến B - Văn phòng): Gắn cờ địa chỉ Office trên hệ thống chia chọn để ưu tiên đổ bao đầu tiên ở cả Wave 1 và Wave 2 (13:30), kết hợp Dynamic Routing bắt buộc Shipper giao hết cụm tòa nhà văn phòng trước 17:00 rồi mới giao nhà dân buổi tối. Bước 3 (Giải pháp Tuyến C & Tuyến A): Kích hoạt Zalo ZNS/Callbot xác nhận hẹn giờ trước với các đơn COD > 2 triệu ở Tuyến C (chỉ xuất giao khi khách xác nhận nhận hàng), đồng thời tận dụng tủ Smart Locker/Lễ tân cho chung cư Tuyến A, đưa FADR toàn Hub vượt 93% và kéo Cost per Drop trung bình về dưới 11,300đ."
        },
        {
          question_id: "lm_q03",
          domain: "LAST_MILE",
          level: "Senior",
          type: "kpi_optimization",
          time_limit_sec: 150,
          title: "Hoạch định công suất (Capacity Planning) bưu cục mùa Mega Sale tăng 3.5 lần",
          question_text: "Sản lượng đơn hàng ngày Sale đôi (11/11, 12/12) tăng gấp 3.5 lần ngày thường. Làm sao bạn giải bài toán nhân sự giao hàng để ngày Sale không tồn đọng bưu cục mà ngày thường không bị lãng phí lương cố định?",
          question_text_en: "Double-day sale volume spikes 3.5x above normal days. How do you design Last-mile Capacity Planning to prevent backlog on peak days without inflating fixed payroll on normal days?",
          expected_keywords: ["Capacity Planning", "Crowdsourcing / Part-time", "3PL Overflow", "PUDO / Smart Locker", "Tiered Incentive"],
          keyword_hints_vi: [
            "Mô hình nhân sự 3 lớp: Đội Core Full-time (110% nền) + Cộng tác viên Part-time giao đơn trả trước tại chung cư + Đối tác 3PL xả tràn (Overflow)",
            "Thưởng bậc thang theo mốc đơn giao thành công trong 48h cao điểm"
          ],
          followup_probe_vi: "Khi thuê cộng tác viên thời vụ bên ngoài chạy ngày Sale, làm thế nào bạn ngăn ngừa rủi ro làm mất hàng hoặc thu tiền COD không nộp?",
          followup_probe_en: "When onboarding temporary/crowdsourced riders on peak days, how do you prevent parcel loss and COD cash risks?",
          ideal_answer: "(S) Sản lượng đỉnh ngày Sale gấp 3.5 lần ngày thường gây quá tải cục bộ. (T) Đảm bảo SLA giao đúng hạn >= 95% với chi phí biến đổi tối ưu. (A) Tôi thiết kế cấu trúc 3 tầng công suất: Tầng 1 (Core Riders chính thức) chuyên giao tuyến khó và đơn COD tiền mặt; Tầng 2 (Cộng tác viên Part-time) chỉ phân bổ các đơn đã thanh toán trước (Non-COD) gom theo cụm chung cư mật độ cao kèm ký quỹ/eKYC trên App; Tầng 3 kích hoạt API đẩy tràn tự động sang đối tác giao tức thời khi tồn Hub vượt 130%. (R) Giải phóng sạch đỉnh 350% sản lượng trong 48 giờ và tiết kiệm 19% chi phí nhân sự toàn quý."
        }
      ]
    },

    // 4. XUẤT NHẬP KHẨU & HẢI QUAN (CUSTOMS)
    {
      id: "customs",
      code: "CUSTOMS",
      name: "Xuất nhập khẩu & Hải quan (Customs)",
      nameEn: "Import-Export & Customs Clearance",
      shortTitle: "XNK & Hải quan",
      lucideIcon: "ship",
      pastelBg: "#F0F9FF",
      pastelBorder: "#BAE6FD",
      iconBg: "#E0F2FE",
      accentColor: "#0284C7",
      badgeText: "Incoterms & VNACCS",
      description: "Kiểm tra bộ chứng từ xuất nhập khẩu (Invoice, P/L, B/L, C/O), áp mã HS Code, truyền tờ khai VNACCS/VCIS và tối ưu phí DEM/DET tại cảng.",
      casePreviewLabel: "📊 Case: Soi lệch C/O Form E Cát Lái & tính DEM vs Thuế",
      vietlishTerms: ["C/O Form E", "HS Code", "VNACCS/VCIS", "DEM/DET", "Bill of Lading", "Manifest", "Incoterms 2020", "FOB", "CIF"],
      questions: [
        {
          question_id: "cus_q01",
          domain: "CUSTOMS",
          level: "Intern/Fresher",
          type: "warmup_star",
          time_limit_sec: 120,
          title: "Tư vấn chuyển đổi Incoterms 2020 (CIF sang FOB/FCA) để cắt phí Local Charges",
          question_text: "Nhiều doanh nghiệp nhập khẩu mua hàng theo điều kiện CIF vì thấy nhàn, nhưng khi hàng cập cảng Cát Lái lại bị đại lý hãng tàu thu phí Local Charges (CIC, THC, vệ sinh cont) rất đắt. Bạn phân tích điểm chuyển giao rủi ro và thuyết phục sếp chuyển sang mua FOB/FCA như thế nào?",
          question_text_en: "Many importers buy on CIF terms for convenience but face inflated destination Local Charges at Cat Lai Port. How would you explain risk transfer and persuade management to switch to FOB/FCA?",
          expected_keywords: ["Incoterms 2020", "FOB", "FCA", "CIF", "Local Charges", "Nomination"],
          keyword_hints_vi: [
            "Dù mua CIF hay FOB thì rủi ro hư hỏng hàng hóa đều chuyển sang người mua ngay từ khi hàng xếp lên tàu tại cảng đi!",
            "Chuyển sang FOB/FCA giúp người nhập khẩu giành quyền chỉ định Forwarder (Nomination), khóa trước trọn gói Ocean Freight + Local Charges đầu Việt Nam"
          ],
          followup_probe_vi: "Với hàng đóng nguyên container (FCL) giao cho hãng tàu tại bãi CY trước ngày tàu chạy, vì sao Incoterms 2020 khuyến khích dùng điều kiện FCA thay vì FOB?",
          followup_probe_en: "For containerized FCL cargo handed over at the Container Yard (CY) days before vessel loading, why does Incoterms 2020 recommend FCA over FOB?",
          ideal_answer: "(S) Công ty nhập 15 cont nguyên liệu/tháng theo giá CIF Cát Lái và liên tục bị Forwarder đầu bán thu phí CIC, D/O cao gấp 3 lần định mức thị trường. (T) Giảm tổng giá vốn nhập khẩu (Landed Cost) và chủ động lịch tàu. (A) Tôi lập bảng phân tích TCO chứng minh: theo Incoterms 2020, điểm chuyển giao rủi ro của CIF và FOB đều nằm tại boong tàu cảng xếp (với hàng FCL hạ bãi CY càng nên dùng FCA để tránh khoảng trống rủi ro tại bãi). Tôi đàm phán với nhà cung cấp tách giá về FOB/FCA và tổ chức chào giá cạnh tranh với 3 Forwarder nội địa kèm cam kết trần Local Charges và 14 ngày Free DEM/DET. (R) Tiết kiệm $280/container ($4,200/tháng) và chấm dứt hoàn toàn chi phí ẩn tại cảng đích."
        },
        {
          question_id: "cus_case_01",
          domain: "CUSTOMS",
          level: "Junior",
          type: "case_study",
          time_limit_sec: 180,
          title: "Xử lý sai lệch C/O Form E tại Cảng Cát Lái & Bài toán Đánh đổi Thuế vs Phí lưu bãi DEM",
          question_text: "Lô hàng 02x40'HC linh kiện van công nghiệp trị giá $85,000 từ Thượng Hải đã nằm tại Cảng Cát Lái sang ngày thứ 7 (Free time chỉ có 5 ngày). Khi đối chiếu bộ chứng từ ở bảng bên phải trước khi truyền tờ khai VNACCS, bạn phát hiện sai lệch nghiêm trọng. Hãy dùng máy tính tính tiền thuế ưu đãi và phí DEM phát sinh, từ đó đề xuất phương án thông quan tối ưu nhất!",
          question_text_en: "A 02x40'HC shipment worth $85,000 from Shanghai is on Day 7 at Cat Lai Port (only 5 days Free DEM). Reviewing the documents in the right-hand table before VNACCS filing reveals serious discrepancies. Calculate the duty impact vs. DEM charges and recommend the optimal clearance plan!",
          case_study_board: {
            context: "Lô hàng 02x40'HC tại Cảng Cát Lái | Trị giá CIF: $85,000 | Đang lưu bãi ngày thứ 7 (Free DEM: 5 ngày)",
            unit_hint: "Tính: Thuế ưu đãi ($85,000 × 10%) vs Phí DEM 2 cont nếu nằm chờ sửa C/O thêm 5 ngày (tổng 12 ngày)",
            table_headers: ["Tiêu chí Đối chiếu", "Invoice & Packing List", "Bill of Lading (B/L)", "C/O Form E (Bản gốc)", "Biểu phí / Hệ quả Hải quan"],
            table_rows: [
              ["Mã HS Code", "8481.80.99", "8481.80 (6 số)", "8481.90.00 (Lệch phân nhóm!)", "Thuế MFN: 10% | Có Form E chuẩn: 0%"],
              ["Gross Weight", "36,400 KGS", "38,200 KGS (Lệch +1,800 kg)", "36,400 KGS", "Nguy cơ luồng Đỏ kiểm hóa cân thực tế"],
              ["Phí lưu bãi (DEM)", "02 cont x 40'HC", "Đã lố 2 ngày Free time", "Chờ cấp lại C/O mất thêm 5 ngày", "Ngày 6–10: $45/cont/ngày | Từ ngày 11: $75/cont/ngày"]
            ],
            notes: [
              "Shipper xác nhận trọng lượng thực tế đóng cont đúng là 36,400 KGS (hãng tàu nhập nhầm Gross Weight trên B/L và e-Manifest).",
              "Doanh nghiệp được phép đăng ký Nợ C/O trên tờ khai VNACCS (tạm nộp thuế MFN 10%) để kéo hàng về kho trước, sau đó nộp bổ sung C/O chuẩn trong vòng 30 ngày để hoàn thuế."
            ]
          },
          expected_keywords: ["C/O Form E", "HS Code", "Manifest", "DEM/DET", "Nợ C/O", "VNACCS/VCIS"],
          keyword_hints_vi: [
            "Tiền thuế chênh lệch nếu mất ưu đãi Form E: $85,000 × 10% = $8,500 (~215 triệu đồng)",
            "Nếu để 2 cont nằm cảng chờ C/O mới thêm 5 ngày (tổng 12 ngày = 5 free + 5 ngày giá $45 + 2 ngày giá $75): Phí DEM = 2 × (225 + 150) = $750!",
            "Chiến lược tối ưu: 1) Tu chỉnh B/L & e-Manifest về 36,400 KGS ngay trong 24h trước khi truyền tờ khai; 2) Mở tờ khai xin Nợ C/O ngày thứ 8 kéo hàng về kho (chỉ tốn 3 ngày DEM = 2 × 3 × $45 = $270, tiết kiệm $480 DEM) rồi nộp bổ sung C/O Form E mới trong 30 ngày để hoàn lại $8,500 tiền thuế!"
          ],
          followup_rule_regex: "(8,?500|750|270|nợ\\s*c/?o|bổ sung\\s*30\\s*ngày|hoàn thuế|tu chỉnh|manifest)",
          followup_probe_vi: "Nếu bạn để 2 cont 40'HC nằm chờ tại Cát Lái thêm 5 ngày nữa (thành 12 ngày lưu bãi) để đợi C/O mới gửi sang thì tổng phí DEM bậc thang mất bao nhiêu USD? Làm cách nào vừa kéo hàng về kho sớm để cắt phí DEM, vừa bảo toàn được $8,500 tiền thuế ưu đãi Form E?",
          followup_probe_en: "If you leave both 40'HC containers at Cat Lai for 5 more days (12 days total) waiting for the re-issued C/O, how much tiered DEM will you pay in USD? How can you clear cargo early to stop DEM while still recovering the $8,500 Form E duty?",
          ideal_answer: "Bước 1 (Tính toán Thuế & Phí lưu bãi DEM): Tiền thuế ưu đãi C/O Form E của lô hàng là $85,000 × 10% = $8,500. Nếu để 2 cont nằm cảng chờ cấp lại C/O thêm 5 ngày (tổng 12 ngày: 5 ngày miễn phí + 5 ngày mức $45 + 2 ngày mức $75), phí DEM hãng tàu lên tới 2 × (225 + 150) = $750 (chưa tính lưu bãi cảng và trễ tiến độ nhà máy). Bước 2 (Tu chỉnh Manifest trước khi mở tờ khai): Chưa truyền tờ khai ngay khi B/L lệch +1,800 kg; lập tức yêu cầu Shipper và Đại lý tàu tu chỉnh B/L & sửa e-Manifest trên Cổng thông tin một cửa quốc gia về đúng 36,400 KGS trong 24 giờ. Bước 3 (Khai Nợ C/O kéo hàng sớm): Ngay ngày thứ 8 sau khi khớp Manifest, truyền tờ khai VNACCS đăng ký Nợ C/O Form E (tạm nộp thuế MFN $8,500) để giải phóng 2 cont về kho (chỉ chịu 3 ngày DEM = 2 × 3 × $45 = $270, tiết kiệm ngay $480 DEM). Đồng thời đôn đốc Shipper xin cấp lại C/O Form E đúng phân nhóm 8481.80, nộp bổ sung tờ khai AMA trong 30 ngày để hoàn lại trọn vẹn $8,500 tiền thuế."
        },
        {
          question_id: "cus_q03",
          domain: "CUSTOMS",
          level: "Senior",
          type: "kpi_optimization",
          time_limit_sec: 150,
          title: "Phòng vệ rủi ro Kiểm tra sau thông quan (PCA) & Xác định trước mã số HS Code",
          question_text: "Khi công ty chuẩn bị nhập khẩu một dây chuyền máy móc đồng bộ lần đầu tiên về Việt Nam có nguy cơ tranh cãi mã HS Code (thuế 0% so với 15%), bạn triển khai bước pháp lý nào trước khi hàng xuống tàu để tránh rủi ro bị truy thu thuế sau 3–5 năm?",
          question_text_en: "When importing a complex machinery line for the first time with disputed HS Codes (0% vs 15% duty), what legal step do you take prior to shipment to prevent Post-Clearance Audit tax clawbacks years later?",
          expected_keywords: ["Xác định trước mã số", "Advance Ruling", "6 Quy tắc GRI", "Catalogue kỹ thuật", "Kiểm tra sau thông quan"],
          keyword_hints_vi: [
            "Nộp hồ sơ xin 'Xác định trước mã số' (Advance Ruling) lên Tổng cục Hải quan tối thiểu 60 ngày trước khi nhập khẩu",
            "Phân tích bản chất kỹ thuật dựa trên Catalogue gốc và 6 quy tắc tổng quát phân loại hàng hóa (GRI 1–6)"
          ],
          followup_probe_vi: "Văn bản thông báo kết quả Xác định trước mã số của Tổng cục Hải quan có giá trị hiệu lực tối đa bao nhiêu năm?",
          followup_probe_en: "How many years is an official Advance Ruling notification from Vietnam Customs legally valid?",
          ideal_answer: "(S) Áp sai mã HS cho dây chuyền trị giá lớn dễ dẫn đến truy thu thuế và phạt chậm nộp 0.03%/ngày trong đợt Kiểm tra sau thông quan (PCA). (T) Khóa chặt cơ sở pháp lý mã HS trước khi hàng cập cảng. (A) Tối thiểu 60 ngày trước khi xuất hàng, tôi tổng hợp Catalogue, bản vẽ kỹ thuật và sơ đồ nguyên lý hoạt động, đối chiếu 6 quy tắc GRI, rồi nộp bộ hồ sơ xin 'Xác định trước mã số' (Advance Ruling) lên Cục Thuế XNK – Tổng cục Hải quan. Văn bản kết quả có hiệu lực pháp lý tối đa 3 năm trên toàn quốc. (R) 100% lô thiết bị thông quan nhanh chóng đúng dự toán thuế và an toàn tuyệt đối qua các kỳ thanh tra PCA."
        }
      ]
    },

    // 5. CHUỖI CUNG ỨNG (SUPPLY CHAIN)
    {
      id: "supply_chain",
      code: "SUPPLY_CHAIN",
      name: "Chuỗi cung ứng (Supply Chain)",
      nameEn: "Supply Chain & Demand/Inventory Planning",
      shortTitle: "Supply Chain",
      lucideIcon: "git-fork",
      pastelBg: "#F5F3FF",
      pastelBorder: "#DDD6FE",
      iconBg: "#EDE9FE",
      accentColor: "#7C3AED",
      badgeText: "S&OP & Inventory",
      description: "Hoạch định nhu cầu S&OP, tính toán Tồn kho an toàn (Safety Stock), Điểm đặt hàng lại (ROP), vòng quay tồn kho và đa dạng hóa nguồn cung.",
      casePreviewLabel: "📊 Case: Tính Safety Stock, ROP & cứu đứt chuyền bao bì",
      vietlishTerms: ["Safety Stock", "ROP", "Days of Supply", "Bullwhip Effect", "S&OP", "MAPE", "Dual Sourcing", "SLOB"],
      questions: [
        {
          question_id: "sc_q01",
          domain: "SUPPLY_CHAIN",
          level: "Intern/Fresher",
          type: "warmup_star",
          time_limit_sec: 120,
          title: "Kiểm soát Hiệu ứng Roi da (Bullwhip Effect) qua chu trình S&OP",
          question_text: "Trong chuỗi cung ứng FMCG, một đợt chiết khấu ngắn hạn của phòng Sales thường làm đơn đặt hàng biến động phóng đại gấp nhiều lần lên tận nhà máy sản xuất. Bạn giải thích hiện tượng này và dùng quy trình S&OP để hóa giải như thế nào?",
          question_text_en: "In an FMCG supply chain, a short-term Sales promotion often triggers massive order amplification upstream at the factory. How do you explain this phenomenon and mitigate it through S&OP?",
          expected_keywords: ["Bullwhip Effect", "S&OP", "Sell-out / POS Data", "MAPE", "Forecast Bias"],
          keyword_hints_vi: [
            "Hiện tượng Hiệu ứng Roi da (Bullwhip Effect) do đại lý ôm hàng đầu cơ (Forward Buying / Sell-in ảo)",
            "Đồng bộ lịch khuyến mãi trước 6 tuần tại cuộc họp S&OP và dự báo dựa trên dữ liệu tiêu thụ thực tế (Sell-out)"
          ],
          followup_probe_vi: "Chỉ số KPI nào bạn dùng hàng tháng để đo lường độ lệch dự báo (Forecast Error) giữa số Sales cam kết và sản lượng thực tế?",
          followup_probe_en: "Which monthly KPI metrics do you use to measure Forecast Error and Bias between Sales commitments and actual demand?",
          ideal_answer: "(S) Đây là Hiệu ứng Roi da (Bullwhip Effect): khi Sales tung chiết khấu đột ngột, nhà phân phối ôm hàng (Sell-in tăng vọt giả tạo) làm nhà máy chạy tăng ca mua dư nguyên liệu, sau đó tháng kế tiếp đơn hàng tụt dốc gây ứ đọng tồn kho. (T) Giảm sai số dự báo MAPE xuống dưới 18%. (A) Tôi thiết lập lịch họp S&OP định kỳ hàng tháng giữa Sales – Marketing – Supply – Factory, bắt buộc khóa kế hoạch Trade Promotion trước 6 tuần, bóc tách sản lượng nền (Baseline) khỏi sản lượng khuyến mãi (Uplift), đồng thời kết nối dữ liệu tồn kho nhà phân phối và Sell-out để đo WAPE/MAPE và Forecast Bias. (R) Kéo giảm MAPE từ 31% xuống 16.5% và cắt giảm 22% tồn kho chậm luân chuyển (SLOB)."
        },
        {
          question_id: "sc_case_01",
          domain: "SUPPLY_CHAIN",
          level: "Junior",
          type: "case_study",
          time_limit_sec: 180,
          title: "Tính Safety Stock, Điểm đặt hàng lại (ROP) & Giải cứu nguy cơ đứt chuyền bao bì",
          question_text: "Là Chuyên viên Hoạch định Vật tư (Material Planner) tại nhà máy Bình Dương, sáng nay bạn nhận được cảnh báo tắc cửa khẩu biên giới khiến Lead Time mã màng nhôm PKG-20 kéo dài lên 11 ngày, trong khi sức tiêu thụ của xưởng đang tăng vọt. Dựa vào bảng bên phải và máy tính mini, hãy tính: (1) Số ngày tồn kho còn đủ dùng (Days of Supply), (2) Mức Safety Stock & ROP chuẩn, và (3) Phương án mua bù khẩn cấp tối ưu chi phí nhất để không dừng chuyền!",
          question_text_en: "As Material Planner at a Binh Duong plant, border congestion stretched Lead Time for foil PKG-20 to 11 days while factory usage surged. Using the table and calculator, compute: (1) Current Days of Supply, (2) Required Safety Stock & ROP, and (3) The most cost-effective emergency bridging order to prevent a line shutdown!",
          case_study_board: {
            context: "Nhà máy FMCG Bình Dương | Mã vật tư: PKG-20 (Màng nhôm ép vỉ) | Tồn khả dụng hiện tại: 11,200 cuộn",
            unit_hint: "Tính: DOS = 11,200 ÷ 1,500 | SS = (1,650 × 11) - (1,200 × 7) | ROP = (1,200 × 7) + SS",
            table_headers: ["Thông số Hoạch định", "Mức Trung bình Lịch sử", "Biến động Thực tế Tuần này", "Ghi chú Chi phí & MOQ"],
            table_rows: [
              ["Mức tiêu thụ ngày (Daily Usage)", "1,200 cuộn / ngày", "1,500 cuộn / ngày (Đỉnh Max: 1,650)", "Tăng +25% chạy đơn hàng Tết"],
              ["Thời gian giao hàng (Lead Time)", "7 ngày (Đường bộ)", "11 ngày (Tắc biên Bằng Tường)", "Thiệt hại dừng chuyền: 180 triệu đ/ngày"],
              ["Tồn hiện tại & Hàng đi đường", "Tồn tại kho: 11,200 cuộn", "Đang đi đường (In-transit): 0 cuộn", "NCC chính: $4.0/cuộn (MOQ: 10,000 cuộn)"],
              ["NCC dự phòng nội địa (Việt Á)", "Kho tại Củ Chi", "Lead Time giao gấp: 2 ngày", "Giá: $4.6/cuộn (+15%), MOQ: 3,000 cuộn"]
            ],
            notes: [
              "Áp dụng công thức Safety Stock biên độ cực đại: SS = (Max Usage 1,650 × Max LT 11) - (Avg Usage 1,200 × Avg LT 7).",
              "Mục tiêu: Tuyệt đối không để đứt chuyền sản xuất (Zero Line-Stoppage) với tổng chi phí phát sinh thấp nhất."
            ]
          },
          expected_keywords: ["Days of Supply", "Safety Stock", "ROP", "Dual Sourcing", "Line Stoppage", "9,750"],
          keyword_hints_vi: [
            "1) Days of Supply (DOS) = 11,200 ÷ 1,500 = 7.47 ngày (< 11 ngày Lead Time -> Sẽ đứt chuyền 3.53 ngày ~ thiếu ít nhất 5,300 cuộn!)",
            "2) Safety Stock = (1,650 × 11) - (1,200 × 7) = 18,150 - 8,400 = 9,750 cuộn; ROP = 8,400 + 9,750 = 18,150 cuộn",
            "3) Đặt mua khẩn 6,000 cuộn từ NCC nội địa Việt Á (giao sau 2 ngày; phần chênh giá $0.6 × 6,000 = $3,600 ~ 91 triệu đ, rẻ hơn gấp 7 lần so với 3.5 ngày dừng chuyền mất 630 triệu đ!), song song đặt lô chính >= 15,000 cuộn!"
          ],
          followup_rule_regex: "(7\\.?4|7\\.?5|9,?750|18,?150|việt á|nội địa|5,?300|6,?000)",
          followup_probe_vi: "Kiểm tra kỹ bằng máy tính nhé: với 11,200 cuộn và tốc độ chạy 1,500 cuộn/ngày thì kho sẽ hết sạch sau 7.47 ngày — tức là đứt chuyền mất hơn 3.5 ngày trước khi hàng biên giới kịp về ở ngày 11! Cụ thể bạn đặt mua bao nhiêu cuộn từ NCC nội địa Việt Á và con số Safety Stock chuẩn tính ra là bao nhiêu?",
          followup_probe_en: "Check the numbers on the calculator: 11,200 rolls at 1,500 rolls/day lasts only 7.47 days—leaving a 3.5-day stock-out gap before the 11-day border shipment arrives! Exactly how many rolls will you order from local supplier Viet A, and what is the calculated Safety Stock?",
          ideal_answer: "Bước 1 (Tính chính xác DOS, Safety Stock & ROP): Với sức chạy mới 1,500 cuộn/ngày, tồn kho 11,200 cuộn chỉ trụ được DOS = 11,200 ÷ 1,500 = 7.47 ngày. So với Lead Time tắc biên 11 ngày, nhà máy hụt 3.53 ngày sản xuất (thiếu tối thiểu 3.53 × 1,500 = 5,300 cuộn). Tính chuẩn Safety Stock = (1,650 × 11) - (1,200 × 7) = 18,150 - 8,400 = 9,750 cuộn; từ đó Điểm đặt hàng lại ROP = 8,400 + 9,750 = 18,150 cuộn (tồn 11,200 đang thủng sâu dưới ROP). Bước 2 (Phương án cứu chuyền Dual Sourcing): Phát hành ngay PO khẩn cấp mua 6,000 cuộn từ NCC nội địa Việt Á tại Củ Chi (giao trong 2 ngày, đạt MOQ 3,000). Chi phí chênh giá 15% là $0.6 × 6,000 = $3,600 (~91 triệu đồng) — tiết kiệm hơn gấp 7 lần so với thiệt hại dừng chuyền 3.5 ngày (630 triệu đồng). Bước 3: Đồng thời đặt ngay lô chính >= 15,000 cuộn từ NCC biên giới và cập nhật lại tham số ROP mùa Tết trên hệ thống MRP."
        },
        {
          question_id: "sc_q03",
          domain: "SUPPLY_CHAIN",
          level: "Senior",
          type: "kpi_optimization",
          time_limit_sec: 150,
          title: "Tối ưu Vòng quay tồn kho bằng Ma trận phân nhóm ABC-XYZ",
          question_text: "CFO yêu cầu giảm 20% giá trị tồn kho để giải phóng vốn lưu động, nhưng Giám đốc Sales lo ngại cắt tồn kho sẽ gây đứt hàng chủ lực. Bạn dùng phương pháp phân tích dữ liệu nào để đạt cả hai mục tiêu?",
          question_text_en: "The CFO demands a 20% inventory reduction to free working capital, while Sales fears stock-outs on top sellers. Which segmentation framework do you apply to achieve both goals?",
          expected_keywords: ["ABC-XYZ Matrix", "Service Level", "SLOB", "Inventory Turnover", "VMI / Consignment"],
          keyword_hints_vi: [
            "Phân tích ma trận 9 ô ABC (giá trị doanh thu) × XYZ (độ biến động nhu cầu)",
            "Bảo vệ Service Level 99% cho nhóm AX/AY, thanh lý mạnh hàng SLOB và đàm phán ký gửi VMI/Consignment cho nhóm AZ"
          ],
          followup_probe_vi: "Đối với nhóm hàng AZ (giá trị cao nhưng nhu cầu giật cục rất khó đoán), bạn thiết lập chính sách dự trữ khác gì so với nhóm AX?",
          followup_probe_en: "For AZ items (high value but highly erratic demand), how does your stocking policy differ from AX items?",
          ideal_answer: "(S) Cắt giảm tồn kho cào bằng 20% mọi mã sẽ làm gãy doanh thu nhóm chủ lực. (T) Giảm 20% vốn tồn kho mà vẫn giữ tỷ lệ đáp ứng nhóm A >= 99%. (A) Tôi chạy ma trận 9 ô ABC-XYZ: 1) Giữ vững Buffer cho nhóm AX/AY (sức bán ổn định, đóng góp 80% doanh thu); 2) Cắt giảm sâu nhóm CZ và lập chiến dịch xả kho rổ hàng SLOB (>120 ngày không luân chuyển); 3) Với nhóm AZ (giá trị lớn, nhu cầu thất thường), chuyển sang đặt hàng theo đơn chốt (Make-to-Order) hoặc đàm phán tồn kho ký gửi nhà cung cấp (VMI / Consignment). (R) Giảm 21.5% giá trị tồn kho bình quân (DIO giảm từ 62 xuống 48 ngày) trong khi tỷ lệ Fill Rate nhóm A đạt 99.1%."
        }
      ]
    },

    // 6. BUSINESS ANALYST MẢNG LOGISTICS (LOGISTICS BA)
    {
      id: "logistics_ba",
      code: "LOGISTICS_BA",
      name: "Business Analyst mảng Logistics (Logistics BA)",
      nameEn: "Logistics & Supply Chain Business Analyst",
      shortTitle: "Logistics BA",
      lucideIcon: "bar-chart-3",
      pastelBg: "#FFF1F2",
      pastelBorder: "#FECDD3",
      iconBg: "#FFE4E6",
      accentColor: "#E11D48",
      badgeText: "WMS/OMS/TMS Tech",
      description: "Phân tích nghiệp vụ tích hợp WMS – OMS – TMS – Sàn TMĐT, thiết kế luồng API/Webhook đồng bộ tồn kho ATP, viết BRD/User Story và UAT.",
      casePreviewLabel: "📊 Case: Cứu 420 đơn Overselling Flash Sale & thiết kế ATP",
      vietlishTerms: ["ATP", "Overselling", "OMS", "WMS", "Webhook", "Buffer Stock", "BRD", "User Story", "UAT"],
      questions: [
        {
          question_id: "ba_q01",
          domain: "LOGISTICS_BA",
          level: "Intern/Fresher",
          type: "warmup_star",
          time_limit_sec: 120,
          title: "Khảo sát thực địa Gemba Walk & Thiết kế UAT phân hệ PDA nhận hàng",
          question_text: "Khi viết tài liệu BRD / User Story cho tính năng quét mã vạch nhận hàng bằng súng PDA tại kho, nhân viên kho thường thao tác khác xa quy trình lý thuyết. Là Logistics BA, bạn khảo sát thực tế và tổ chức kiểm thử UAT thế nào để lúc Go-live không bị tắc nghẽn?",
          question_text_en: "When writing BRDs/User Stories for mobile PDA receiving in a warehouse, floor operations often differ from paper SOPs. As a Logistics BA, how do you conduct discovery and UAT so Go-live succeeds smoothly?",
          expected_keywords: ["Gemba Walk", "As-Is vs To-Be", "Exception Flow", "UAT", "Acceptance Criteria"],
          keyword_hints_vi: [
            "Xuống trực tiếp sàn kho (Gemba Walk / Shadowing) theo dõi ca nhập hàng để bắt hết các ngoại lệ: tem rách, rớt Wi-Fi, hàng giao thiếu/thừa (Partial GRN)",
            "Đưa các Exception Flows vào Acceptance Criteria và mời chính Tổ trưởng kho cầm súng PDA test UAT thực địa"
          ],
          followup_probe_vi: "Hãy kể 2 kịch bản ngoại lệ (Edge Cases) điển hình tại cửa nhập kho Inbound mà nếu BA bỏ sót thì nhân viên không thể bấm hoàn tất phiếu nhập trên PDA?",
          followup_probe_en: "Name 2 classic Inbound receiving Edge Cases that, if missed by the BA, would block staff from completing GRN on their PDAs?",
          ideal_answer: "(S) Dự án triển khai WMS cho kho 12,000m2 ban đầu chỉ mô tả Happy Path nên bản Demo đầu tiên bị vướng ngay tại cửa Inbound. (T) Thiết kế luồng PDA sát thực tế 100% và Go-live an toàn. (A) Tôi thực hiện Gemba Walk đi theo nhân viên Inbound 3 ca liên tiếp, vẽ luồng As-Is vs To-Be và bổ sung 3 Exception Flows cốt lõi vào User Story: 1) Nhập kho từng phần (Partial Receipt) khi xe giao thiếu kiện; 2) Luồng in lại mã vạch nội bộ qua Bluetooth khi tem NCC bị ướt/mờ; 3) Lưu đệm Offline Queue khi đi vào góc khuất sóng Wi-Fi. Ở vòng UAT, tôi soạn 25 Test Cases từ chứng từ thật cho Key Users dưới kho trực tiếp thao tác duyệt. (R) Go-live mượt ngay ngày đầu, rút ngắn 45% thời gian làm phiếu GRN."
        },
        {
          question_id: "ba_case_01",
          domain: "LOGISTICS_BA",
          level: "Junior",
          type: "case_study",
          time_limit_sec: 180,
          title: "Giải cứu sự cố Overselling 420 đơn Flash Sale & Thiết kế lại cơ chế đồng bộ OMS – WMS",
          question_text: "Đúng 00:15 đêm Mega Sale, hệ thống OMS báo động đỏ: mã nồi chiên AIRFRY-09 bị bán lố (Oversell) do Cron-job 15 phút/lần đẩy trùng 100% tồn kho lên cả Shopee và TikTok Shop. Hãy dùng bảng số liệu và máy tính mini để: (1) Tính số máy thiếu ròng sau khi điều chuyển kho lẻ và số đơn tối đa được phép hủy dưới trần phạt 3% của sàn; (2) Nêu phương án cứu đơn trước 18:00 hôm nay và thiết kế lại luồng đồng bộ tồn kho ATP!",
          question_text_en: "At 00:15 AM during Mega Sale, OMS alerts that SKU AIRFRY-09 is oversold because a 15-minute cron-job pushed 100% physical stock to both Shopee and TikTok Shop. Using the table and calculator: (1) Compute net shortage after store transfer and max cancellable orders under the 3% NFR penalty cap; (2) Propose same-day recovery plus a redesigned OMS–WMS ATP sync architecture!",
          case_study_board: {
            context: "Sự cố 00:15 Mega Sale | SKU: AIRFRY-09 | Lỗi hiện tại: Cron-job 15 phút đẩy trùng 100% tồn lên cả 2 sàn",
            unit_hint: "Tính: Thiếu ròng = (820 + 600) - 1,000 - 280 | Trần hủy cho phép (< 3%) = 1,420 × 3%",
            table_headers: ["Hệ thống / Kênh bán", "Tồn hiển thị lúc 00:00", "Đơn đã chốt (00:00-00:15)", "Nguồn hàng Thực tế", "Quy định Phạt Sàn (SLA)"],
            table_rows: [
              ["WMS Kho Trung tâm", "1,000 máy", "—", "1,000 máy sẵn sàng đóng gói", "—"],
              ["Shopee Mall Official", "1,000 máy (Đẩy 100%)", "820 đơn", "Trừ chung kho WMS Trung tâm", "Giao ĐVVC trước 18:00; Phạt nếu hủy > 3%"],
              ["TikTok Shop Mall", "1,000 máy (Đẩy 100%)", "600 đơn", "Trừ chung kho WMS Trung tâm", "Giao ĐVVC trước 20:00; Khóa Sale nếu hủy > 3%"],
              ["Kho Chuỗi Cửa hàng lẻ", "Chưa nối sàn", "—", "280 máy (Kéo về kho mất 6 giờ)", "Phí xe điều chuyển gấp: 1,200,000đ"]
            ],
            notes: [
              "Nếu tỷ lệ hủy đơn do lỗi nhà bán (NFR) vượt quá 3.0% tổng số đơn, gian hàng Mall bị phạt điểm Sao Quả Tạ và cấm tham gia Flash Sale tháng kế tiếp.",
              "Trong kho còn sẵn 150 máy bản nâng cấp AIRFRY-09 PRO (giá vốn cao hơn 65,000đ/máy) có thể thương lượng nâng cấp miễn phí cho khách."
            ]
          },
          expected_keywords: ["ATP", "Buffer Stock", "Webhook / Real-time Sync", "Soft Allocation", "NFR (< 3%)", "140 đơn / 42 đơn"],
          keyword_hints_vi: [
            "1) Tổng đơn = 820 + 600 = 1,420 đơn -> Oversell ban đầu = 420 máy. Kéo 280 máy từ Kho lẻ về còn thiếu ròng: 420 - 280 = 140 đơn!",
            "2) Trần hủy tối đa không vượt 3%: 1,420 × 3% = 42.6 -> Chỉ được phép hủy tối đa 42 đơn! Vậy ít nhất 140 - 42 = 98 đơn (tốt nhất cả 140 đơn) phải cứu bằng cách CSKH đề xuất nâng cấp miễn phí sang mẫu AIRFRY-09 PRO (đang sẵn 150 máy)!",
            "3) Thiết kế BA: Bỏ Cron-job 15 phút; dùng Event-driven Webhook + Redis giữ chỗ tức thì (Soft Reservation) + Công thức chia tỷ lệ kênh Channel Allocation Ratio kèm Safety Buffer 5%"
          ],
          followup_rule_regex: "(140|42|98|pro|nâng cấp|3%|1,?420)",
          followup_probe_vi: "Kiểm tra con số vận hành ngay hôm nay nhé: sau khi điều chuyển 280 máy từ cửa hàng lẻ về thì bạn vẫn thiếu 140 đơn, trong khi trần phạt 3% trên tổng 1,420 đơn chỉ cho phép hủy tối đa 42 đơn! Bạn cứu ít nhất 98–140 đơn thiếu này thế nào trước 18:00, và công thức chia tồn kho an toàn (ATP / Buffer Stock) trên OMS bạn viết trong BRD ra sao?",
          followup_probe_en: "Let's check today's exact numbers: after transferring 280 store units, you are still short 140 orders while the 3% cap on 1,420 orders allows at most 42 cancellations! How do you save those 98–140 orders before 18:00, and what exact ATP / Buffer Stock sync rule will you specify in your BRD?",
          ideal_answer: "Bước 1 (Tính toán Cứu đơn & Giữ trần NFR < 3%): Tổng đơn phát sinh là 820 + 600 = 1,420 đơn trên nền tồn WMS 1,000 máy (Oversell 420 máy). Tôi lập tức tạo lệnh Stock Transfer rút 280 máy từ chuỗi cửa hàng lẻ về kho trung tâm trong 6 giờ (chi phí 1.2 triệu đồng, kịp đóng gói trước 18:00), thu hẹp mức thiếu ròng còn 420 - 280 = 140 đơn. Do trần hủy an toàn 3% của 1,420 đơn chỉ cho phép tối đa 42 đơn hủy, để bảo vệ gian hàng Mall tôi chuyển danh sách 140 đơn đặt cuối cho CSKH gọi tặng nâng cấp miễn phí lên dòng AIRFRY-09 PRO (sẵn tồn 150 máy, bù giá vốn 140 × 65,000đ = 9.1 triệu đồng — nhỏ hơn rất nhiều so với thiệt hại khóa Flash Sale tháng sau), kéo tỷ lệ hủy lỗi Shop về ~0%. Bước 2 (Thiết kế lại kiến trúc OMS – WMS trong BRD): 1) Khai tử Batch Cron-job 15 phút, chuyển sang Event-driven Webhook nhận sự kiện Order Created để khóa tồn tạm thời (Soft Allocation trên Redis) dưới 500ms; 2) Thiết lập công thức ATP đẩy sàn: Sync_Stock = (Physical_WMS - Reserved_Qty - Safety_Buffer_5%) × Channel_Ratio (Shopee 60% / TikTok 40%), và tự động gom về 1 kênh duy nhất khi tồn chạm ngưỡng Low-stock <= 30 máy."
        },
        {
          question_id: "ba_q03",
          domain: "LOGISTICS_BA",
          level: "Senior",
          type: "kpi_optimization",
          time_limit_sec: 150,
          title: "Quản trị Master Data Kích thước & Quy đổi Đơn vị tính (UoM) giữa WMS và TMS",
          question_text: "Khi tích hợp dữ liệu từ WMS sang TMS để tự động xếp tải trọng xe, lỗi kinh điển nhất là Master Data kích thước/trọng lượng SKU bị bỏ trống hoặc nhầm đơn vị Thùng vs Cái, làm thuật toán ghép xe sai hoàn toàn. Là Logistics BA, bạn thiết kế chốt chặn hệ thống như thế nào?",
          question_text_en: "When integrating WMS with TMS for automated load planning, missing SKU dimensions/weights or Piece-vs-Carton UoM mix-ups break routing algorithms. How do you design system Master Data Governance?",
          expected_keywords: ["Master Data Governance", "Cubiscan", "UoM Conversion", "Validation Rule", "Single Source of Truth"],
          keyword_hints_vi: [
            "Thiết kế System Gate lúc First-Inbound: mã hàng mới chưa cân đo Dài × Rộng × Cao × Nặng thực tế thì hệ thống chặn chưa cho Put-away/Xuất hàng",
            "Chuẩn hóa bảng Pack Hierarchy / UoM Conversion (1 Pallet = X Thùng = Y Hộp = Z Cái) và lấy WMS làm Single Source of Truth"
          ],
          followup_probe_vi: "Làm sao hệ thống tự động phát hiện nhân viên nhập nhầm đơn vị cm sang mm (làm thể tích CBM phóng đại gấp 1,000 lần) ngay trên màn hình nhập liệu?",
          followup_probe_en: "How can your input screen automatically catch a user typing millimeters instead of centimeters (inflating CBM by 1,000x)?",
          ideal_answer: "(S) Dữ liệu kích thước/trọng lượng nhập tay sai lệch ở 28% mã mới khiến TMS tính sai CBM xe tải. (T) Đảm bảo độ chính xác Master Data >= 99.5%. (A) Tôi thiết kế chốt chặn First-Inbound Gate trên WMS: bất kỳ SKU mới nào nhập kho lần đầu đều tự động bật cờ bắt buộc qua trạm cân đo Cubiscan để ghi nhận L-W-H-Weight cho từng cấp đóng gói (Base UoM -> Inner -> Master Carton -> Pallet), đồng thời cài Validation Rule cảnh báo đỏ nếu tỷ trọng Khối lượng/Thể tích nằm ngoài ngưỡng vật lý hợp lý (chặn ngay lỗi gõ nhầm mm với cm). WMS đóng vai trò Single Source of Truth đồng bộ tự động sang OMS và TMS qua API. (R) Độ chính xác tính CBM xếp xe của TMS đạt 99.7%, xóa bỏ tình trạng dôi hàng tại cửa xuất."
        }
      ]
    }
  ],

  // Dữ liệu mẫu Lớp Học Phần cho Cổng Giảng Viên (Teacher Portal)
  teacherDemoClassRoster: [
    {
      mssv: "2251040012",
      name: "Nguyễn Minh Hoàng",
      email: "hoang.nm220012@edu.vn",
      trackId: "WMS",
      level: "Junior",
      sessionsCount: 5,
      totalScore: 84,
      radarScores: { domain_knowledge: 88, case_study_solving: 84, kpi_data_thinking: 80, communication_star: 84 },
      matchedKeywords: ["FEFO", "WMS", "Audit Trail", "Cycle Count"],
      missingKeywords: ["Quarantine", "Root Cause Analysis"],
      lastDate: "2026-11-26",
      feedback: "Nắm chắc quy trình kho lạnh và đối soát WMS, cần lưu ý tách khu cách ly Quarantine rõ ràng hơn."
    },
    {
      mssv: "2251040028",
      name: "Trần Thị Thảo Vy",
      email: "vy.ttt220028@edu.vn",
      trackId: "CUSTOMS",
      level: "Junior",
      sessionsCount: 4,
      totalScore: 81,
      radarScores: { domain_knowledge: 86, case_study_solving: 80, kpi_data_thinking: 74, communication_star: 84 },
      matchedKeywords: ["B/L", "Packing List", "HS Code", "Manifest"],
      missingKeywords: ["Lệnh giao hàng (D/O)", "C/O Form E"],
      lastDate: "2026-11-26",
      feedback: "Phát âm thuật ngữ hải quan rất tốt, xử lý sai lệch chứng từ Cát Lái bài bản theo quy trình."
    },
    {
      mssv: "2251040035",
      name: "Lê Quốc Bảo",
      email: "bao.lq220035@edu.vn",
      trackId: "TMS",
      level: "Junior",
      sessionsCount: 3,
      totalScore: 72,
      radarScores: { domain_knowledge: 76, case_study_solving: 74, kpi_data_thinking: 64, communication_star: 74 },
      matchedKeywords: ["Giờ cấm tải", "Load Factor", "Backhaul"],
      missingKeywords: ["Drop-off", "Chi phí cơ hội (Opportunity Cost)"],
      lastDate: "2026-11-25",
      feedback: "Hiểu luật cấm tải nội đô nhưng tính toán hệ số lấp đầy xe còn chậm, cần luyện thêm bấm số liệu."
    },
    {
      mssv: "2251040041",
      name: "Phạm Ngọc Anh Thư",
      email: "thu.pna220041@edu.vn",
      trackId: "SUPPLY_CHAIN",
      level: "Junior",
      sessionsCount: 6,
      totalScore: 88,
      radarScores: { domain_knowledge: 90, case_study_solving: 86, kpi_data_thinking: 88, communication_star: 88 },
      matchedKeywords: ["Safety Stock", "Lead-time", "Bullwhip Effect", "ROP"],
      missingKeywords: ["Service Level Z-score"],
      lastDate: "2026-11-26",
      feedback: "Xuất sắc ở phần tính tồn kho an toàn và cấu trúc trả lời STAR mạch lạc, có số liệu định lượng rõ."
    },
    {
      mssv: "2251040053",
      name: "Võ Thành Đạt",
      email: "dat.vt220053@edu.vn",
      trackId: "LAST_MILE",
      level: "Intern/Fresher",
      sessionsCount: 2,
      totalScore: 63,
      radarScores: { domain_knowledge: 68, case_study_solving: 62, kpi_data_thinking: 55, communication_star: 67 },
      matchedKeywords: ["COD", "First-attempt Delivery"],
      missingKeywords: ["Cost per Drop", "Tỷ lệ giao thất bại", "Hub & Spoke"],
      lastDate: "2026-11-24",
      feedback: "Còn lúng túng khi tính toán Cost per Drop trên bảng số liệu, thiếu từ khóa tối ưu tuyến giao."
    },
    {
      mssv: "2251040067",
      name: "Đỗ Hoàng Gia Huy",
      email: "huy.dhg220067@edu.vn",
      trackId: "WMS",
      level: "Intern/Fresher",
      sessionsCount: 3,
      totalScore: 67,
      radarScores: { domain_knowledge: 70, case_study_solving: 66, kpi_data_thinking: 60, communication_star: 72 },
      matchedKeywords: ["FEFO", "Kiểm kê định kỳ"],
      missingKeywords: ["Quarantine", "Audit Trail", "Inventory Adjustment"],
      lastDate: "2026-11-25",
      feedback: "Trả lời đúng hướng xử lý hàng cận date nhưng bỏ sót bước khóa mã SKU và lập biên bản điều chỉnh tồn."
    },
    {
      mssv: "2251040079",
      name: "Bùi Thị Kim Ngân",
      email: "ngan.btk220079@edu.vn",
      trackId: "LOGISTICS_BA",
      level: "Junior",
      sessionsCount: 4,
      totalScore: 76,
      radarScores: { domain_knowledge: 78, case_study_solving: 76, kpi_data_thinking: 72, communication_star: 78 },
      matchedKeywords: ["Overselling", "OMS", "ATP", "API Webhook"],
      missingKeywords: ["Safety Buffer", "Soft Allocation"],
      lastDate: "2026-11-26",
      feedback: "Tư duy luồng dữ liệu OMS-WMS tốt, cần bổ sung công thức chia tồn kho an toàn ATP khi flash sale."
    },
    {
      mssv: "2251040084",
      name: "Huỳnh Tấn Phát",
      email: "phat.ht220084@edu.vn",
      trackId: "TMS",
      level: "Intern/Fresher",
      sessionsCount: 2,
      totalScore: 59,
      radarScores: { domain_knowledge: 62, case_study_solving: 58, kpi_data_thinking: 52, communication_star: 64 },
      matchedKeywords: ["Ghép chuyến", "Tải trọng"],
      missingKeywords: ["Giờ cấm tải", "Load Factor", "Drop-off"],
      lastDate: "2026-11-23",
      feedback: "Chưa nắm chắc khung giờ cấm tải xe >2.5 tấn tại TP.HCM và chưa tính được chi phí ghép xe."
    },
    {
      mssv: "2251040092",
      name: "Trương Mỹ Linh",
      email: "linh.tm220092@edu.vn",
      trackId: "CUSTOMS",
      level: "Junior",
      sessionsCount: 4,
      totalScore: 74,
      radarScores: { domain_knowledge: 77, case_study_solving: 75, kpi_data_thinking: 68, communication_star: 76 },
      matchedKeywords: ["VGM", "Cut-off time", "Hải quan điện tử"],
      missingKeywords: ["DEM/DET", "Sửa Manifest"],
      lastDate: "2026-11-25",
      feedback: "Hiểu quy trình thông quan nhưng chưa tính đến phí lưu container DEM/DET phát sinh khi sửa vận đơn."
    },
    {
      mssv: "2251040105",
      name: "Phan Văn Khải",
      email: "khai.pv220105@edu.vn",
      trackId: "WMS",
      level: "Junior",
      sessionsCount: 3,
      totalScore: 71,
      radarScores: { domain_knowledge: 74, case_study_solving: 72, kpi_data_thinking: 65, communication_star: 73 },
      matchedKeywords: ["FEFO", "WMS"],
      missingKeywords: ["Quarantine", "Audit Trail", "Cycle Count"],
      lastDate: "2026-11-24",
      feedback: "Cần trình bày câu trả lời theo cấu trúc STAR rõ hơn và kiểm tra lại nguyên nhân lệch 5% trên WMS."
    }
  ]
};
