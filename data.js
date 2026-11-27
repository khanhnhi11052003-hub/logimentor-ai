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

  // Mentor theo cấp độ luyện tập của sinh viên (Tách biệt hoàn toàn hồ sơ Tiếng Việt & Tiếng Anh)
  mentorsByLevel: {
    "Intern/Fresher": {
      name: "Chị Minh Anh — Cố vấn Nhân sự Logistics",
      spokenNameVi: "chị Minh Anh, cố vấn tuyển dụng ngành hậu cần và chuỗi cung ứng",
      nameEn: "Sarah Minh — Senior Logistics Talent Coach",
      spokenNameEn: "Sarah, your Senior Logistics Talent Coach",
      role: "Senior Talent Coach • Hướng dẫn tận tình",
      badge: "Cố Vấn Gợi Mở",
      badgeEn: "Supportive Coach",
      stylePrompt: "Thân thiện, khích lệ tinh thần sinh viên, gợi mở tư duy thực tế ngành Logistics Việt Nam, nhận xét thẳng thắn dễ hiểu."
    },
    Junior: {
      name: "Anh Hoàng Nam — Quản lý Vận hành",
      spokenNameVi: "anh Hoàng Nam, Quản lý Vận hành",
      nameEn: "Alex Nam — Logistics Operations Manager",
      spokenNameEn: "Alex, your Logistics Operations Manager",
      role: "Operations Manager • 10 năm kinh nghiệm thực chiến",
      badge: "Mentor Thực Chiến",
      badgeEn: "Operations Mentor",
      stylePrompt: "Tập trung vào số liệu vận hành, quy trình SOP, xử lý sự cố hiện trường và kiểm tra kỹ năng tính toán KPI."
    },
    Senior: {
      name: "Anh Quốc Bảo — Giám đốc Chuỗi cung ứng",
      spokenNameVi: "anh Quốc Bảo, Giám đốc Chuỗi cung ứng",
      nameEn: "David Bao — Supply Chain Director",
      spokenNameEn: "David, your Supply Chain Director",
      role: "Supply Chain Director • 15 năm kinh nghiệm MNC",
      badge: "Chuyên Gia Cấp Cao",
      badgeEn: "Executive Interviewer",
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
      spokenNameVi: "Vận tải và Điều phối đội xe",
      nameEn: "Transportation & Fleet Dispatch",
      shortTitle: "TMS & Điều phối",
      shortTitleEn: "TMS & Dispatch",
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
          title_en: "Controlling Empty Miles & Fleet Fuel Efficiency",
          question_text: "Khi điều phối đội xe tải giao hàng liên tỉnh, làm thế nào bạn vừa đảm bảo đúng cam kết thời gian giao hàng (Time Window) của khách, vừa giảm tỷ lệ xe quay đầu chạy rỗng (Empty Miles)? Hãy trình bày theo cấu trúc STAR.",
          spoken_vi: "Khi điều phối đội xe tải giao hàng liên tỉnh, làm thế nào bạn vừa đảm bảo đúng khung giờ giao hàng cam kết với khách, vừa giảm tỷ lệ xe quay đầu chạy rỗng? Hãy trình bày câu trả lời theo bốn bước: Tình huống, Nhiệm vụ, Hành động và Kết quả.",
          question_text_en: "When dispatching an inter-provincial truck fleet, how do you meet customer delivery time windows while minimizing empty miles on return trips? Please structure your answer using the STAR method.",
          expected_keywords: ["Time Window", "Backhaul", "Empty Miles", "Route Optimization", "GPS / Telematics"],
          keyword_hints_vi: [
            "Khai thác hàng chiều về (Backhaul) từ nhà cung cấp nguyên liệu hoặc sàn ghép hàng",
            "Gom đơn theo cụm tuyến (Milk-run / Route Optimization) trên phần mềm TMS",
            "Giám sát lộ trình GPS / Telematics thời gian thực để cảnh báo dừng đỗ bất thường"
          ],
          keyword_hints_en: [
            "Secure return-trip cargo (Backhaul) from raw material suppliers or freight exchanges",
            "Consolidate multi-stop routes (Milk-run / Route Optimization) on TMS",
            "Monitor real-time GPS / Telematics with geofencing alerts for unauthorized stops"
          ],
          followup_probe_vi: "Nếu tài xế tự ý ghé dọc đường làm có nguy cơ trễ Time Window của siêu thị 45 phút, trên hệ thống TMS và GPS bạn thiết lập cảnh báo sớm như thế nào?",
          spoken_probe_vi: "Nếu tài xế tự ý ghé dọc đường làm có nguy cơ trễ giờ nhận hàng của siêu thị bốn mươi lăm phút, trên phần mềm điều phối và định vị hành trình, bạn thiết lập cảnh báo sớm như thế nào?",
          followup_probe_en: "If a driver makes an unauthorized stop and risks missing a supermarket delivery window by 45 minutes, what early alerts would you configure on your TMS and GPS system?",
          ideal_answer: "(S) Tại đội xe phân phối tuyến Bình Dương – Đồng Nai, tỷ lệ xe quay đầu rỗng từng ở mức 38% gây đội chi phí vận tải. (T) Mục tiêu giữ tỷ lệ giao đúng Time Window >= 98% và kéo Empty Miles xuống dưới 20%. (A) Tôi quy hoạch lại lịch chạy Milk-run trên TMS, thiết lập Geofencing cảnh báo dừng đỗ quá 15 phút qua GPS/Telematics; đồng thời phối hợp bộ phận Thu mua gom nguyên liệu bao bì chiều về (Backhaul) từ các nhà cung cấp dọc tuyến. (R) Sau 2 tháng, tỷ lệ giao đúng giờ đạt 98.6%, giảm 22% quãng đường chạy rỗng và tiết kiệm 14% chi phí dầu Diesel/tháng."
        },
        {
          question_id: "tms_case_01",
          domain: "TMS",
          level: "Junior",
          type: "case_study",
          time_limit_sec: 180,
          title: "Ghép tuyến nội đô tránh giờ cấm tải & Tính chi phí điều xe tối ưu",
          title_en: "Inner-City Truck Ban Routing & Optimal Dispatch Costing",
          question_text: "Lúc 05:30 sáng tại Kho Tổng Bình Tân, bạn cần xếp xe giao 3 đơn hàng trong bảng số liệu bên phải. TP.HCM cấm xe tải trên 2.5 tấn vào nội đô từ 06:00 – 09:00 sáng. Hãy dùng máy tính mini kiểm tra tải trọng/thể tích và đề xuất phương án điều xe có tổng chi phí thấp nhất mà không bị phạt trễ giờ!",
          spoken_vi: "Lúc năm giờ ba mươi sáng tại Kho Tổng Bình Tân, bạn cần xếp xe giao ba đơn hàng trong bảng số liệu bên phải. Thành phố Hồ Chí Minh cấm xe tải trên hai phẩy năm tấn vào nội đô từ sáu giờ đến chín giờ sáng. Bạn hãy dùng máy tính kiểm tra tải trọng, thể tích và đề xuất phương án điều xe có tổng chi phí thấp nhất mà không bị phạt trễ giờ nhé!",
          question_text_en: "At 5:30 AM at the Binh Tan Hub, you must dispatch 3 orders shown in the right-hand table. Ho Chi Minh City bans trucks over 2.5 tons from inner-city districts between 6:00 AM and 9:00 AM. Use the calculator to check weight and volume limits, and propose the lowest-cost dispatch plan with zero late penalties!",
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
          case_study_board_en: {
            context: "05:30 AM Dispatch | Binh Tan Hub -> HCMC | Inner-city ban (>2.5T in Dist. 1 & 3): 06:00 - 09:00",
            unit_hint: "Hint: Sum kg & CBM of ORD-101 + ORD-102 vs. single 1.9T Truck capacity",
            table_headers: ["Order / Truck", "Route / Vehicle Type", "Weight", "Volume", "Time Window / Rule", "Trip Cost / Penalty"],
            table_rows: [
              ["ORD-101", "District 1 (Supermarket A)", "1,150 kg", "6.2 CBM", "Before 08:00 (Inner-city)", "Late fine: 2,000,000 VND"],
              ["ORD-102", "District 3 (F&B Chain B)", "950 kg", "5.4 CBM", "Before 08:30 (Inner-city)", "Late fine: 1,500,000 VND"],
              ["ORD-103", "Thu Duc City (Distributor C)", "2,600 kg", "12.0 CBM", "Before 11:30 (Outer ring)", "Late fine: 1,000,000 VND"],
              ["TRUCK-1.9T (x2)", "Light truck (24/7 inner-city)", "Max 1,900 kg", "Max 10.0 CBM", "Allowed 06:00 - 09:00", "1,100,000 VND / trip"],
              ["TRUCK-5.0T (x1)", "Medium truck (Banned 6-9h)", "Max 5,000 kg", "Max 24.0 CBM", "Banned Dist 1, 3 (06:00-09:00)", "1,850,000 VND / trip"]
            ],
            notes: [
              "Available at loading dock: 02 units of TRUCK-1.9T and 01 unit of TRUCK-5.0T.",
              "Customer ORD-102 allows Split Delivery across multiple trucks as long as full qty arrives before 08:30."
            ]
          },
          expected_keywords: ["Giờ cấm tải", "Load Factor", "Time Window", "Split Delivery", "Route Optimization", "4,050,000đ"],
          keyword_hints_vi: [
            "ORD-101 + ORD-102 = 1,150 + 950 = 2,100 kg (> 1,900 kg) và 6.2 + 5.4 = 11.6 CBM (> 10.0 CBM) -> Quá tải nếu dồn vào 1 xe 1.9T!",
            "Điều 02 chiếc XE-1.9T giao nội đô Q1 & Q3 trước 08:30; điều 01 chiếc XE-5.0T giao ORD-103 đi Thủ Đức ngoài vành đai cấm tải",
            "Tổng chi phí điều xe = 2 × 1,100,000 + 1,850,000 = 4,050,000đ (tránh mức phạt trễ 4,500,000đ)"
          ],
          keyword_hints_en: [
            "ORD-101 + ORD-102 = 2,100 kg (> 1,900 kg) and 11.6 CBM (> 10.0 CBM) -> Overloads a single 1.9T truck!",
            "Dispatch both 1.9T trucks for inner-city Dist. 1 & Dist. 3 before 08:30; dispatch the 5.0T truck for ORD-103 (Thu Duc outer ring)",
            "Total dispatch cost = 2 × 1,100,000 + 1,850,000 = 4,050,000 VND (avoiding 4,500,000 VND in late penalties)"
          ],
          followup_rule_regex: "(2,?100|11\\.?6|quá tải|overload|2\\s*xe\\s*1\\.?9|two\\s*1\\.?9|both\\s*1\\.?9|hai\\s*xe\\s*1\\.?9|4,?050|4\\.05|tách|split)",
          followup_probe_vi: "Khoan đã! Nếu bạn xếp cả ORD-101 (1,150 kg; 6.2 CBM) và ORD-102 (950 kg; 5.4 CBM) lên chung 1 chiếc XE-1.9T thì tổng lên tới 2,100 kg và 11.6 CBM — vượt trần 1,900 kg và 10 CBM rồi! Bạn chia xe cụ thể thế nào và tổng chi phí điều xe là bao nhiêu?",
          spoken_probe_vi: "Khoan đã! Nếu bạn xếp cả đơn một không một và đơn một không hai lên chung một chiếc xe một phẩy chín tấn thì tổng khối lượng lên tới hai nghìn một trăm ki lô gam và mười một phẩy sáu mét khối, vượt trần tải trọng cho phép rồi! Bạn chia xe cụ thể thế nào và tổng chi phí điều xe là bao nhiêu?",
          followup_probe_en: "Hold on! Combining ORD-101 and ORD-102 onto a single 1.9-ton truck totals 2,100 kilograms and 11.6 cubic meters, which exceeds its 1,900-kilogram and 10-cubic-meter limit! How do you allocate the trucks and what is the exact total dispatch cost?",
          ideal_answer: "Bước 1 (Kiểm tra tải trọng & Giờ cấm tải): Cộng ORD-101 + ORD-102 = 2,100 kg và 11.6 CBM, vượt trần 1 xe 1.9T (1,900 kg / 10 CBM); trong khi XE-5.0T bị cấm vào Quận 1, Quận 3 khung 06:00–09:00. Bước 2 (Phương án điều phối chuẩn): Cho xuất phát lúc 05:45 gồm 02 xe 1.9T vào nội đô: Xe 1.9T #1 chở ORD-101 (1,150 kg; 6.2 CBM - Load Factor 62%) giao Quận 1 trước 08:00; Xe 1.9T #2 chở ORD-102 (950 kg; 5.4 CBM) giao Quận 3 trước 08:30. Riêng ORD-103 (2,600 kg; 12 CBM đi Thủ Đức ngoài vành đai cấm tải) điều chiếc XE-5.0T giao thẳng trước 11:30. Bước 3 (Hiệu quả chi phí): Tổng cước = 2 × 1,100,000đ + 1,850,000đ = 4,050,000đ, đạt 100% SLA Time Window, không vi phạm tải trọng và tránh được khoản phạt trễ 4,500,000đ."
        },
        {
          question_id: "tms_q03",
          domain: "TMS",
          level: "Senior",
          type: "kpi_optimization",
          time_limit_sec: 150,
          title: "Thiết lập bộ KPI đánh giá Nhà xe phụ (Sub-contractors 3PL)",
          title_en: "Designing Weekly Scorecard KPIs for Sub-contracted 3PL Fleets",
          question_text: "Khi công ty thuê ngoài 5 nhà xe phụ (Sub-contractors) chạy mùa cao điểm Tết, bạn theo dõi những chỉ số KPI nào hàng tuần để thưởng/phạt công bằng và kiểm soát chất lượng giao nhận?",
          spoken_vi: "Khi công ty thuê ngoài năm nhà xe phụ chạy mùa cao điểm Tết, bạn theo dõi những chỉ số đánh giá hiệu quả nào hàng tuần để thưởng phạt công bằng và kiểm soát chất lượng giao nhận?",
          question_text_en: "When outsourcing to five sub-contracted carrier fleets during peak season, which weekly KPIs do you track to enforce service agreements and fair incentives or penalties?",
          expected_keywords: ["OTIF", "POD", "Truck No-show Rate", "Damage Rate", "Cost per Ton-Km"],
          keyword_hints_vi: [
            "OTIF (On-Time In-Full — giao đúng giờ & đủ số lượng)",
            "Tỷ lệ bỏ chuyến / trễ điều xe (Truck No-show Rate <= 2%)",
            "Thời gian hoàn chứng từ gốc POD (Proof of Delivery) để khóa sổ công nợ"
          ],
          keyword_hints_en: [
            "OTIF (On-Time In-Full delivery performance >= 97%)",
            "Truck No-show / Late Dispatch Rate (<= 2%)",
            "On-time POD (Proof of Delivery) return lead time for billing closure"
          ],
          followup_probe_vi: "Nếu một nhà xe chào giá cước rẻ hơn 8% nhưng luôn nộp trễ biên bản POD giấy tới 15 ngày làm treo công nợ khách hàng, bạn đặt điều khoản chế tài thế nào?",
          spoken_probe_vi: "Nếu một nhà xe chào giá cước rẻ hơn tám phần trăm nhưng luôn nộp trễ biên bản giao nhận gốc tới mười lăm ngày làm treo công nợ khách hàng, bạn đặt điều khoản chế tài trong hợp đồng như thế nào?",
          followup_probe_en: "If a sub-carrier offers 8 percent lower rates but consistently delays returning signed Proof of Delivery documents by 15 days, what contract penalty clause would you enforce?",
          ideal_answer: "(S) Mùa cao điểm Tết sản lượng tăng gấp đôi khiến đội xe nhà chỉ đáp ứng 55%, phải thuê thêm 5 nhà xe 3PL. (T) Thiết lập bộ Scorecard minh bạch kiểm soát chất lượng giao hàng. (A) Tôi áp dụng 4 KPI trên TMS: 1) OTIF >= 97%; 2) Truck No-show Rate <= 2%; 3) Tỷ lệ hư hỏng hàng < 0.1%; 4) Bắt buộc chụp e-POD lên App tài xế trong 2 giờ sau giao và hoàn POD giấy trong 5 ngày làm việc (gắn liền điều kiện giải ngân cước). (R) Phân bổ ưu tiên tuyến tốt cho Top 2 nhà xe hạng A, giữ OTIF mùa Tết đạt 97.4% và rút ngắn vòng đối soát công nợ từ 18 ngày xuống 6 ngày."
        }
      ]
    },

    // 2. KHO BÃI & TỒN KHO (WMS)
    {
      id: "wms",
      code: "WMS",
      name: "Kho bãi & Tồn kho (WMS)",
      spokenNameVi: "Quản lý Kho bãi và Tồn kho",
      nameEn: "Warehouse & Inventory Operations",
      shortTitle: "WMS & Kho bãi",
      shortTitleEn: "WMS & Warehouse",
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
          title_en: "ABC Warehouse Slotting & Order Picking Path Optimization",
          question_text: "Trong kho phân phối có 3,000 mã SKU nhưng nhân viên lấy hàng (Picker) thường xuyên phải đi bộ quá xa dẫn đến trễ giờ xuất xe. Bạn ứng dụng phân tích ABC và Slotting trên WMS như thế nào để tăng năng suất?",
          spoken_vi: "Trong kho phân phối có ba nghìn mã hàng nhưng nhân viên soạn hàng thường xuyên phải đi bộ quá xa dẫn đến trễ giờ xuất xe. Bạn ứng dụng phương pháp phân loại nhóm hàng chủ lực A B C và quy hoạch vị trí kệ trên hệ thống quản lý kho như thế nào để tăng năng suất?",
          question_text_en: "In a distribution center with 3,000 SKUs, order pickers walk excessive distances causing outbound truck delays. How would you apply ABC classification and warehouse slotting to boost picking productivity?",
          expected_keywords: ["ABC Analysis", "Slotting", "Fast-moving", "Golden Zone", "Batch Picking"],
          keyword_hints_vi: [
            "Đưa nhóm A (20% SKU chiếm 80% lượt lấy hàng) ra dãy kệ gần khu đóng gói/Outbound và ở tầng ngang thắt lưng (Golden Zone)",
            "Gom nhiều đơn lấy 1 lượt theo đường đi chữ S (Batch / Wave Picking) trên súng PDA"
          ],
          keyword_hints_en: [
            "Place Class-A fast-moving SKUs (20% SKUs driving 80% picks) near outbound staging at waist-level Golden Zone racks",
            "Combine multi-order picks into S-shape Batch / Wave Picking paths on mobile barcode scanners"
          ],
          followup_probe_vi: "Khi danh mục hàng bán chạy thay đổi theo mùa (ví dụ bánh trung thu hoặc bia nước ngọt dịp Tết), bao lâu bạn cập nhật lại Slotting một lần?",
          spoken_probe_vi: "Khi danh mục hàng bán chạy thay đổi theo mùa, ví dụ bánh trung thu hoặc bia nước ngọt dịp Tết, bao lâu bạn rà soát và sắp xếp lại vị trí kệ một lần để không làm gián đoạn vận hành?",
          followup_probe_en: "When fast-moving items shift seasonally, how frequently do you execute re-slotting without disrupting daily warehouse operations?",
          ideal_answer: "(S) Kho FMCG rộng 8,000m2 với 3,000 SKU trước đây xếp hàng ngẫu nhiên vào ô trống khiến Picker mất 4.5 phút/dòng đơn. (T) Tăng năng suất lấy hàng tối thiểu 30%. (A) Tôi trích xuất dữ liệu Pick Frequency 90 ngày trên WMS để phân loại ABC, quy hoạch nhóm A (Fast-moving) ra đầu kệ gần khu Staging/Outbound và đặt ở tầng thấp Golden Zone; kết hợp chuyển sang Batch Picking theo lộ trình chữ S trên PDA. (R) Giảm 38% quãng đường đi bộ, tăng năng suất từ 42 lên 61 dòng/giờ và 100% xe xuất kho đúng Cut-off time."
        },
        {
          question_id: "wms_case_01",
          domain: "WMS",
          level: "Junior",
          type: "case_study",
          time_limit_sec: 180,
          title: "Xử lý lệch tồn kho 5% & Hàng cận date tại Kho Lạnh Thủ Đức",
          title_en: "Resolving 5% Stock Variance & Short Shelf-Life Risk in Cold Storage",
          question_text: "Trong đợt kiểm kê định kỳ sáng nay tại Kho Lạnh thực phẩm, bạn phát hiện bảng số liệu bên phải có sự chênh lệch lớn ở 2 mã SKU chủ lực. Hãy dùng máy tính tính giá trị chênh lệch, đánh giá rủi ro đơn hàng sáng mai và nêu từng bước xử lý trong 24 giờ tới!",
          spoken_vi: "Trong đợt kiểm kê định kỳ sáng nay tại Kho Lạnh thực phẩm Thủ Đức, bạn phát hiện bảng số liệu bên phải có sự chênh lệch lớn ở hai mặt hàng chủ lực. Hãy dùng máy tính để tính giá trị tiền chênh lệch, đánh giá rủi ro đối với đơn hàng siêu thị sáng mai và nêu từng bước xử lý trong hai mươi tư giờ tới!",
          question_text_en: "During this morning's cycle count at Thu Duc Cold Storage, you discovered major variances in two core SKUs shown in the right-hand table. Calculate the financial variance, evaluate tomorrow morning's supermarket order risk, and outline your 24-hour action plan!",
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
          case_study_board_en: {
            context: "Count Date: Nov 26, 2026 | Thu Duc Cold Storage (2°C - 4°C) | Allowed Tolerance: ±0.2%",
            unit_hint: "Compute variance value (-100 × 320,000 VND) & check 5-day remaining shelf-life vs. Supermarket X's 7-day rule",
            table_headers: ["SKU Code", "Product", "WMS System Qty", "Physical Qty", "Variance", "Expiry / Shelf-Life", "Unit Cost"],
            table_rows: [
              ["MILK-01", "Pasteurized Milk 1L", "2,000 cartons", "1,900 cartons", "-100 cartons (-5.0%)", "Dec 01 (5 days left)", "320,000 VND/ctn"],
              ["BEEF-05", "Chilled Aussie Beef", "500 kg", "515 kg", "+15 kg (+3.0%)", "Dec 15 (19 days left)", "450,000 VND/kg"]
            ],
            notes: [
              "Supermarket X ordered 800 cartons of MILK-01 for 06:00 AM tomorrow (contract strictly requires remaining shelf-life >= 7 days).",
              "Last night's outbound shift included 02 newly onboarded temporary pickers."
            ]
          },
          expected_keywords: ["FEFO", "Quarantine", "Audit Trail", "Cycle Count", "Root Cause Analysis", "Inventory Adjustment"],
          keyword_hints_vi: [
            "Giá trị lệch MILK-01: -100 × 320,000 = -32,000,000đ; BEEF-05: +15 × 450,000 = +6,750,000đ",
            "Cực kỳ quan trọng: MILK-01 chỉ còn 5 ngày HSD (< 7 ngày yêu cầu của Siêu thị X) -> Khóa mã và chuyển sang khu cách ly (Quarantine) ngay để không xuất nhầm!",
            "Đếm chéo lại kệ lân cận (Cycle Count) & truy xuất Audit Trail ca đêm có 2 nhân viên thời vụ mới"
          ],
          keyword_hints_en: [
            "Variance value: MILK-01 = -100 × 320,000 = -32,000,000 VND; BEEF-05 = +15 × 450,000 = +6,750,000 VND",
            "Critical: MILK-01 has only 5 days shelf-life (< 7 days required by Supermarket X) -> Lock batch in WMS Quarantine immediately!",
            "Recount adjacent bins (Cycle Count) and inspect WMS Audit Trail + CCTV from last night's temp-staff shift"
          ],
          followup_rule_regex: "(siêu thị|supermarket|800\\s*thùng|800\\s*carton|7\\s*ngày|7\\s*day|5\\s*ngày|5\\s*day|6h|06:00|sáng mai|quarantine|khu cách ly|cách ly|đổi lô)",
          followup_probe_vi: "Với đơn hàng 800 thùng giao Siêu thị X vào 6h sáng mai, hàng MILK-01 hiện tại chỉ còn 5 ngày HSD trong khi siêu thị yêu cầu tối thiểu 7 ngày — bạn xử lý đơn này thế nào?",
          spoken_probe_vi: "Với đơn hàng tám trăm thùng sữa giao cho Siêu thị X vào sáu giờ sáng mai, lô sữa hiện tại chỉ còn năm ngày hạn sử dụng trong khi siêu thị yêu cầu tối thiểu bảy ngày. Bạn xử lý đơn hàng này như thế nào?",
          followup_probe_en: "Regarding the urgent 800-carton milk order for Supermarket X at 6:00 AM tomorrow, the current batch only has 5 days of shelf-life left while they require at least 7 days. How do you handle this order?",
          ideal_answer: "Bước 1 (Khóa rủi ro đơn hàng & Hàng cận date): Lô MILK-01 đang lệch âm -100 thùng (-32,000,000đ giá vốn) và chỉ còn 5 ngày HSD — không đủ chuẩn >= 7 ngày của Siêu thị X. Tôi lập tức khóa mã lô này trên WMS và chuyển sang khu cách ly (Quarantine) để chặn xuất nhầm lúc 6h sáng mai; đồng thời báo khẩn Sales/Supply Planning điều chuyển lô date mới từ kho nhà máy giao cho Siêu thị X, còn 1,900 thùng cận date (trị giá 608 triệu đồng) đề xuất xả nhanh kênh HORECA theo nguyên tắc FEFO. Bước 2 (Root Cause Analysis): Thực hiện Cycle Count đếm chéo các vị trí Bin lân cận, trích xuất lịch sử giao dịch (Audit Trail) và camera ca đêm của 2 nhân viên thời vụ để xác định lỗi xuất không quét PDA hay cân nhầm sang BEEF-05 (+15 kg, +6.75 triệu đồng). Bước 3: Lập biên bản đối soát chứng từ và trình duyệt bút toán điều chỉnh tồn kho (Inventory Adjustment) trên WMS trong 24 giờ."
        },
        {
          question_id: "wms_q03",
          domain: "WMS",
          level: "Senior",
          type: "kpi_optimization",
          time_limit_sec: 150,
          title: "Thiết kế chương trình Cycle Count đạt Độ chính xác tồn kho IRA >= 99.8%",
          title_en: "Designing Daily Cycle Counting for >= 99.8% Inventory Accuracy",
          question_text: "Thay vì đóng cửa kho 3 ngày cuối năm để kiểm kê toàn bộ, bạn thiết kế quy trình Cycle Count hàng ngày trên WMS như thế nào để duy trì Độ chính xác tồn kho (IRA) đạt từ 99.8% trở lên?",
          spoken_vi: "Thay vì phải đóng cửa kho ba ngày cuối năm để kiểm kê toàn bộ, bạn thiết kế quy trình kiểm kê cuốn chiếu hàng ngày trên hệ thống quản lý kho như thế nào để duy trì độ chính xác tồn kho đạt từ chín mươi chín phẩy tám phần trăm trở lên?",
          question_text_en: "Instead of shutting down the warehouse for three days for year-end physical inventory, how do you design a daily cycle counting program to sustain Inventory Record Accuracy at 99.8 percent or higher?",
          expected_keywords: ["Cycle Count", "IRA", "Blind Count", "ABC Frequency", "PDA Scanning"],
          keyword_hints_vi: [
            "Áp dụng đếm mù (Blind Count) trên PDA — ẩn số tồn hệ thống để nhân viên phải đếm thật",
            "Phân tần suất đếm theo ABC: Nhóm A đếm 2 tuần/lần, Nhóm B hàng tháng, Nhóm C hàng quý"
          ],
          keyword_hints_en: [
            "Enforce Blind Counting on mobile scanners — hide system stock quantities so staff must count physically",
            "Stratify count frequency by ABC velocity: Class A bi-weekly, Class B monthly, Class C quarterly"
          ],
          followup_probe_vi: "Vì sao khi phát phiếu Cycle Count trên PDA, bạn bắt buộc phải ẩn số lượng tồn hệ thống (Blind Count)?",
          spoken_probe_vi: "Vì sao khi phát phiếu kiểm kê trên thiết bị cầm tay, bạn bắt buộc phải ẩn số lượng tồn kho trên hệ thống để nhân viên đếm mù?",
          followup_probe_en: "Why must system stock quantities be hidden from warehouse counters through blind counting during cycle count execution?",
          ideal_answer: "(S) Kiểm kê đóng kho cuối năm làm ngưng trệ giao hàng 72 giờ. (T) Duy trì IRA >= 99.8% quanh năm bằng kiểm kê cuốn chiếu. (A) Tôi cấu hình WMS tự động phát lệnh Cycle Count đầu ca sáng theo tần suất ABC (nhóm A đếm 2 tuần/lần, B hàng tháng, C hàng quý) và bật chế độ Blind Count trên PDA để chống tâm lý điền khống theo số hệ thống. Mọi chênh lệch vượt ngưỡng đều tự động kích hoạt phiếu Recount độc lập cho Giám sát và truy vết Audit Trail ngay trong ca. (R) IRA duy trì đạt 99.88% suốt 4 quý và bỏ hoàn toàn đợt đóng kho cuối năm."
        }
      ]
    },

    // 3. GIAO HÀNG CHẶNG CUỐI (LAST-MILE)
    {
      id: "last_mile",
      code: "LAST_MILE",
      name: "Giao hàng chặng cuối (Last-mile)",
      spokenNameVi: "Giao hàng chặng cuối",
      nameEn: "Last-mile Delivery & Hub Operations",
      shortTitle: "Giao nhận Chặng cuối",
      shortTitleEn: "Last-mile Delivery",
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
          title_en: "Cash-on-Delivery (COD) Reconciliation & Shift-End Hub Closing",
          question_text: "Tại bưu cục giao hàng TMĐT với 40 shipper thu hộ hàng trăm triệu đồng tiền mặt mỗi ngày, bạn thiết lập quy trình đối soát tiền COD và hàng hoàn cuối ca như thế nào để không xảy ra thất thoát?",
          spoken_vi: "Tại bưu cục giao hàng thương mại điện tử với bốn mươi bưu tá thu hộ hàng trăm triệu đồng tiền mặt mỗi ngày, bạn thiết lập quy trình đối soát tiền thu hộ và kiểm đếm hàng hoàn cuối ca như thế nào để không xảy ra thất thoát?",
          question_text_en: "At an E-commerce delivery hub with 40 couriers collecting large amounts of cash on delivery daily, how do you control cash reconciliation and return parcels at shift-end?",
          expected_keywords: ["COD Reconciliation", "Hạn mức ví Shipper", "VietQR động", "Return Scan", "Đối soát cuối ca"],
          keyword_hints_vi: [
            "Khóa trần tiền mặt trên tay Shipper (chạm ngưỡng 5 triệu đồng phải nộp/chuyển khoản tự động mới nhận tiếp đơn mới)",
            "Gắn mã VietQR động cho từng vận đơn để tiền chảy thẳng về tài khoản công ty và quét Return Scan 100% kiện hoàn"
          ],
          keyword_hints_en: [
            "Enforce an in-hand cash ceiling on the courier app (auto-block new dispatches once cash hits threshold until remitted)",
            "Use dynamic order-level QR payment codes to minimize cash handling and require 100% Return Scan on failed parcels before shift sign-off"
          ],
          followup_probe_vi: "Nếu cuối ca một shipper báo khách đã nhận hàng nhưng xin khất sang sáng mai mới nộp tiền mặt COD thì bạn xử lý thế nào theo kỷ luật bưu cục?",
          spoken_probe_vi: "Nếu cuối ca có một bưu tá báo khách đã nhận hàng nhưng xin khất sang sáng mai mới nộp lại tiền mặt thu hộ, bạn xử lý như thế nào theo kỷ luật bưu cục?",
          followup_probe_en: "If a courier marks a parcel as delivered without remitting the collected cash and asks to delay payment until tomorrow morning, how do you handle it?",
          ideal_answer: "(S) Bưu cục xử lý 3,500 đơn/ngày với tỷ lệ COD tiền mặt 65%, dễ phát sinh lệch quỹ cuối ca. (T) Đảm bảo Zero Cash Discrepancy 100% trong ngày. (A) Tôi triển khai 3 chốt chặn: 1) Áp trần giữ tiền mặt 5,000,000đ trên App Shipper — chạm trần tự động khóa nhận đơn mới cho tới khi nộp quỹ; 2) In/hiển thị VietQR định danh theo mã vận đơn giúp kéo tỷ lệ tiền mặt xuống 28%; 3) Cuối ca bắt buộc quét Return Scan từng bưu kiện giao thất bại khớp trạng thái NDR trước khi ký đóng ca. (R) 100% kỳ đối soát khớp tuyệt đối suốt 6 tháng và giảm thời gian chốt ca tối từ 60 xuống 20 phút."
        },
        {
          question_id: "lm_case_01",
          domain: "LAST_MILE",
          level: "Junior",
          type: "case_study",
          time_limit_sec: 180,
          title: "Tính Cost per Drop & Cắt giảm tỷ lệ giao thất bại (NDR) dịp Mega Sale 11/11",
          title_en: "Calculating Cost per Drop & Reducing Failed Deliveries on 11/11 Peak Day",
          question_text: "Báo cáo cuối ngày 11/11 tại Bưu cục Quận 7 (bảng bên phải) cho thấy chi phí trên mỗi đơn giao thành công (Cost per Successful Drop) đang đội lên cao. Định mức mục tiêu là Cost per Drop <= 11,500đ/đơn và tỷ lệ giao thành công lần đầu (FADR) >= 92%. Hãy dùng máy tính tính chính xác Cost per Drop từng tuyến, FADR toàn Hub và đề xuất giải pháp khắc phục cho Tuyến B & Tuyến C!",
          spoken_vi: "Báo cáo cuối ngày hội mua sắm mười một tháng mười một tại Bưu cục Quận Bảy ở bảng bên phải cho thấy chi phí trên mỗi đơn giao thành công đang đội lên cao. Định mức mục tiêu là chi phí tối đa mười một nghìn năm trăm đồng một đơn và tỷ lệ giao thành công lần đầu đạt từ chín mươi hai phần trăm trở lên. Bạn hãy dùng máy tính để tính chính xác chi phí trên mỗi đơn của từng tuyến, tỷ lệ giao thành công toàn bưu cục và đề xuất giải pháp khắc phục cho Tuyến B và Tuyến C!",
          question_text_en: "End-of-day November 11 peak metrics at the District 7 Hub in the right-hand table show rising delivery costs. Targets are Cost per Successful Drop at most 11,500 VND and First-Attempt Delivery Rate at least 92 percent. Calculate the exact Cost per Drop per route, overall Hub First-Attempt Delivery Rate, and propose operational fixes for Route B and Route C!",
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
          case_study_board_en: {
            context: "District 7 Hub | Nov 11 Peak Report | Targets: Cost/Drop <= 11,500 VND & FADR >= 92%",
            unit_hint: "Formula: Cost per Successful Drop = Total Route Cost ÷ Successful Deliveries",
            table_headers: ["Courier Route", "Assigned Parcels", "Delivered", "Failed / NDR", "Total Route Cost", "Primary Failure Reason"],
            table_rows: [
              ["Route A (Apartments)", "160 parcels", "148 parcels", "12 (7.5%)", "1,628,000 VND", "Recipients away during work hours"],
              ["Route B (Office Towers)", "150 parcels", "114 parcels", "36 (24.0%)", "1,710,000 VND", "Attempted after 18:00 (offices closed)"],
              ["Route C (Deep Alleys)", "120 parcels", "96 parcels", "24 (20.0%)", "1,536,000 VND", "High-COD (>2M VND) unreachable phone"]
            ],
            notes: [
              "Every failed NDR parcel requires return scanning and re-dispatch the next day, doubling hub handling costs.",
              "Linehaul feeder trucks arrive at District 7 Hub in two waves: Wave 1 at 06:30 and Wave 2 at 13:30."
            ]
          },
          expected_keywords: ["Cost per Drop", "FADR", "NDR", "Dynamic Routing", "COD Pre-confirmation", "Smart Locker"],
          keyword_hints_vi: [
            "Kết quả bấm máy: Tuyến A = 1,628,000 ÷ 148 = 11,000đ (Đạt); Tuyến B = 1,710,000 ÷ 114 = 15,000đ (Vượt +30.4%!); Tuyến C = 1,536,000 ÷ 96 = 16,000đ (Vượt +39.1%!)",
            "FADR toàn bưu cục = (148 + 114 + 96) ÷ 430 = 358 ÷ 430 = 83.26% (< 92%)",
            "Tuyến B: Ưu tiên chia chọn sớm & đảo lộ trình giao văn phòng dứt điểm trước 17:00; Tuyến C: Callbot/Zalo xác nhận trước khi mang đơn COD > 2 triệu ra khỏi kho"
          ],
          keyword_hints_en: [
            "Calculated Cost/Drop: Route A = 11,000 VND (Pass); Route B = 1,710,000 ÷ 114 = 15,000 VND (+30.4% over); Route C = 1,536,000 ÷ 96 = 16,000 VND (+39.1% over)",
            "Overall Hub FADR = (148 + 114 + 96) ÷ 430 = 358 ÷ 430 = 83.26% (below 92% target)",
            "Route B: Priority sort Wave 2 at 13:30 & Dynamic Routing to finish offices before 17:00; Route C: Automated pre-call confirmation before dispatching high-value COD"
          ],
          followup_rule_regex: "(15,?000|16,?000|11,?000|83\\.?2|83\\.?3|358)",
          followup_probe_vi: "Bạn hãy dùng máy tính mini chốt con số cụ thể nhé: Cost per Successful Drop của Tuyến B và Tuyến C chính xác là bao nhiêu đồng/đơn, FADR toàn bưu cục đang đạt bao nhiêu %, và ở Wave 2 lúc 13:30 chiều bạn tổ chức chia hàng cho Tuyến B thế nào để kịp trước 17:30?",
          spoken_probe_vi: "Bạn hãy dùng máy tính chốt con số cụ thể nhé. Chi phí trên mỗi đơn giao thành công của Tuyến B và Tuyến C chính xác là bao nhiêu đồng, tỷ lệ giao thành công toàn bưu cục đang đạt bao nhiêu phần trăm, và ở chuyến xe chiều lúc mười ba giờ ba mươi bạn tổ chức chia chọn hàng cho Tuyến B thế nào để giao kịp giờ hành chính?",
          followup_probe_en: "Please check the exact numbers on the calculator: what is the exact Cost per Successful Drop for Route B and Route C, what is the overall Hub First-Attempt Delivery Rate percentage, and how will you prioritize Wave 2 sorting at 1:30 PM for Route B?",
          ideal_answer: "Bước 1 (Chẩn đoán bằng con số định lượng): Tổng FADR toàn bưu cục mới đạt 358/430 = 83.26% (hụt 8.74% so với mục tiêu 92%). Xét Cost per Successful Drop: Tuyến A đạt 1,628,000 ÷ 148 = 11,000đ/đơn (Đạt); nhưng Tuyến B vọt lên 1,710,000 ÷ 114 = 15,000đ/đơn (+30.4%) và Tuyến C đội lên 1,536,000 ÷ 96 = 16,000đ/đơn (+39.1%). Bước 2 (Giải pháp Tuyến B - Văn phòng): Gắn cờ địa chỉ Office trên hệ thống chia chọn để ưu tiên đổ bao đầu tiên ở cả Wave 1 và Wave 2 (13:30), kết hợp Dynamic Routing bắt buộc Shipper giao hết cụm tòa nhà văn phòng trước 17:00 rồi mới giao nhà dân buổi tối. Bước 3 (Giải pháp Tuyến C & Tuyến A): Kích hoạt Zalo ZNS/Callbot xác nhận hẹn giờ trước với các đơn COD > 2 triệu ở Tuyến C (chỉ xuất giao khi khách xác nhận nhận hàng), đồng thời tận dụng tủ Smart Locker/Lễ tân cho chung cư Tuyến A, đưa FADR toàn Hub vượt 93% và kéo Cost per Drop trung bình về dưới 11,300đ."
        },
        {
          question_id: "lm_q03",
          domain: "LAST_MILE",
          level: "Senior",
          type: "kpi_optimization",
          time_limit_sec: 150,
          title: "Hoạch định công suất (Capacity Planning) bưu cục mùa Mega Sale tăng 3.5 lần",
          title_en: "Last-Mile Hub Capacity Planning for 3.5x Mega Sale Volume Spikes",
          question_text: "Sản lượng đơn hàng ngày Sale đôi (11/11, 12/12) tăng gấp 3.5 lần ngày thường. Làm sao bạn giải bài toán nhân sự giao hàng để ngày Sale không tồn đọng bưu cục mà ngày thường không bị lãng phí lương cố định?",
          spoken_vi: "Sản lượng đơn hàng vào các ngày hội mua sắm mười một tháng mười một và mười hai tháng mười hai tăng gấp ba phẩy năm lần ngày thường. Làm sao bạn giải bài toán nhân sự giao hàng để ngày cao điểm không bị ứ đọng bưu cục mà ngày thường không bị lãng phí quỹ lương cố định?",
          question_text_en: "Double-day mega sale parcel volume spikes 3.5 times above normal days. How do you design last-mile capacity planning to prevent hub backlog on peak days without inflating fixed payroll on normal days?",
          expected_keywords: ["Capacity Planning", "Crowdsourcing / Part-time", "3PL Overflow", "PUDO / Smart Locker", "Tiered Incentive"],
          keyword_hints_vi: [
            "Mô hình nhân sự 3 lớp: Đội Core Full-time (110% nền) + Cộng tác viên Part-time giao đơn trả trước tại chung cư + Đối tác 3PL xả tràn (Overflow)",
            "Thưởng bậc thang theo mốc đơn giao thành công trong 48h cao điểm"
          ],
          keyword_hints_en: [
            "Three-tier fleet model: Core full-time couriers (110% baseline) + Part-time crowdsourced riders for prepaid apartment clusters + On-demand 3PL overflow API",
            "Tiered volume incentives during the 48-hour peak window"
          ],
          followup_probe_vi: "Khi thuê cộng tác viên thời vụ bên ngoài chạy ngày Sale, làm thế nào bạn ngăn ngừa rủi ro làm mất hàng hoặc thu tiền COD không nộp?",
          spoken_probe_vi: "Khi thuê cộng tác viên thời vụ bên ngoài chạy tăng cường ngày cao điểm, làm thế nào bạn ngăn ngừa rủi ro làm mất hàng hoặc thu tiền mặt của khách mà không nộp về bưu cục?",
          followup_probe_en: "When onboarding temporary crowdsourced couriers during peak days, how do you prevent parcel loss and cash-on-delivery theft risks?",
          ideal_answer: "(S) Sản lượng đỉnh ngày Sale gấp 3.5 lần ngày thường gây quá tải cục bộ. (T) Đảm bảo SLA giao đúng hạn >= 95% với chi phí biến đổi tối ưu. (A) Tôi thiết kế cấu trúc 3 tầng công suất: Tầng 1 (Core Riders chính thức) chuyên giao tuyến khó và đơn COD tiền mặt; Tầng 2 (Cộng tác viên Part-time) chỉ phân bổ các đơn đã thanh toán trước (Non-COD) gom theo cụm chung cư mật độ cao kèm ký quỹ/eKYC trên App; Tầng 3 kích hoạt API đẩy tràn tự động sang đối tác giao tức thời khi tồn Hub vượt 130%. (R) Giải phóng sạch đỉnh 350% sản lượng trong 48 giờ và tiết kiệm 19% chi phí nhân sự toàn quý."
        }
      ]
    },

    // 4. XUẤT NHẬP KHẨU & HẢI QUAN (CUSTOMS)
    {
      id: "customs",
      code: "CUSTOMS",
      name: "Xuất nhập khẩu & Hải quan (Customs)",
      spokenNameVi: "Xuất nhập khẩu và Hải quan",
      nameEn: "Import-Export & Customs Clearance",
      shortTitle: "XNK & Hải quan",
      shortTitleEn: "Customs & Trade",
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
          title_en: "Switching Incoterms 2020 from CIF to FOB/FCA to Cut Destination Local Charges",
          question_text: "Nhiều doanh nghiệp nhập khẩu mua hàng theo điều kiện CIF vì thấy nhàn, nhưng khi hàng cập cảng Cát Lái lại bị đại lý hãng tàu thu phí Local Charges (CIC, THC, vệ sinh cont) rất đắt. Bạn phân tích điểm chuyển giao rủi ro và thuyết phục sếp chuyển sang mua FOB/FCA như thế nào?",
          spoken_vi: "Nhiều doanh nghiệp nhập khẩu thường mua hàng theo điều kiện giao hàng bao gồm tiền hàng, bảo hiểm và cước tàu vì thấy nhàn, nhưng khi hàng cập cảng Cát Lái lại bị đại lý hãng tàu thu phụ phí tại cảng đích rất đắt. Bạn phân tích điểm chuyển giao rủi ro theo quy tắc thương mại quốc tế năm hai nghìn không trăm hai mươi và thuyết phục ban giám đốc chuyển sang tự thuê tàu như thế nào?",
          question_text_en: "Many importers buy on CIF terms for convenience, yet face inflated destination local charges when cargo arrives at Cat Lai Port. How would you explain the exact risk transfer point under Incoterms 2020 and persuade management to switch to FOB or FCA?",
          expected_keywords: ["Incoterms 2020", "FOB", "FCA", "CIF", "Local Charges", "Nomination"],
          keyword_hints_vi: [
            "Dù mua CIF hay FOB thì rủi ro hư hỏng hàng hóa đều chuyển sang người mua ngay từ khi hàng xếp lên tàu tại cảng đi!",
            "Chuyển sang FOB/FCA giúp người nhập khẩu giành quyền chỉ định Forwarder (Nomination), khóa trước trọn gói Ocean Freight + Local Charges đầu Việt Nam"
          ],
          keyword_hints_en: [
            "Under both CIF and FOB, cargo damage risk transfers to the buyer at the port of loading once placed on board!",
            "Switching to FOB/FCA gives the importer forwarder nomination control, locking in all-in ocean freight and transparent destination local charges"
          ],
          followup_probe_vi: "Với hàng đóng nguyên container (FCL) giao cho hãng tàu tại bãi CY trước ngày tàu chạy, vì sao Incoterms 2020 khuyến khích dùng điều kiện FCA thay vì FOB?",
          spoken_probe_vi: "Đối với hàng đóng nguyên công ten nơ giao cho hãng tàu tại bãi cảng vài ngày trước khi tàu chạy, vì sao quy tắc thương mại quốc tế khuyến khích dùng điều kiện giao cho người chuyên chở tại bãi thay vì điều kiện giao lên boong tàu?",
          followup_probe_en: "For containerized full-container-load cargo handed over at the container yard days before vessel loading, why does Incoterms 2020 recommend FCA over FOB?",
          ideal_answer: "(S) Công ty nhập 15 cont nguyên liệu/tháng theo giá CIF Cát Lái và liên tục bị Forwarder đầu bán thu phí CIC, D/O cao gấp 3 lần định mức thị trường. (T) Giảm tổng giá vốn nhập khẩu (Landed Cost) và chủ động lịch tàu. (A) Tôi lập bảng phân tích TCO chứng minh: theo Incoterms 2020, điểm chuyển giao rủi ro của CIF và FOB đều nằm tại boong tàu cảng xếp (với hàng FCL hạ bãi CY càng nên dùng FCA để tránh khoảng trống rủi ro tại bãi). Tôi đàm phán với nhà cung cấp tách giá về FOB/FCA và tổ chức chào giá cạnh tranh với 3 Forwarder nội địa kèm cam kết trần Local Charges và 14 ngày Free DEM/DET. (R) Tiết kiệm $280/container ($4,200/tháng) và chấm dứt hoàn toàn chi phí ẩn tại cảng đích."
        },
        {
          question_id: "cus_case_01",
          domain: "CUSTOMS",
          level: "Junior",
          type: "case_study",
          time_limit_sec: 180,
          title: "Xử lý sai lệch C/O Form E tại Cảng Cát Lái & Bài toán Đánh đổi Thuế vs Phí lưu bãi DEM",
          title_en: "Resolving C/O Form E Discrepancies at Cat Lai Port & Duty vs. Demurrage Trade-off",
          question_text: "Lô hàng 02x40'HC linh kiện van công nghiệp trị giá $85,000 từ Thượng Hải đã nằm tại Cảng Cát Lái sang ngày thứ 7 (Free time chỉ có 5 ngày). Khi đối chiếu bộ chứng từ ở bảng bên phải trước khi truyền tờ khai VNACCS, bạn phát hiện sai lệch nghiêm trọng. Hãy dùng máy tính tính tiền thuế ưu đãi và phí DEM phát sinh, từ đó đề xuất phương án thông quan tối ưu nhất!",
          spoken_vi: "Lô hàng hai công ten nơ bốn mươi phít cao chở linh kiện van công nghiệp trị giá tám mươi lăm nghìn đô la Mỹ từ Thượng Hải đã nằm tại Cảng Cát Lái sang ngày thứ bảy, trong khi thời gian miễn phí lưu bãi chỉ có năm ngày. Khi đối chiếu bộ chứng từ ở bảng bên phải trước khi truyền tờ khai hải quan điện tử, bạn phát hiện sai lệch nghiêm trọng. Hãy dùng máy tính tính tiền thuế ưu đãi và phí lưu bãi phát sinh, từ đó đề xuất phương án thông quan tối ưu nhất!",
          question_text_en: "A shipment of two 40-foot High Cube containers worth 85,000 US dollars from Shanghai is on Day 7 at Cat Lai Port, with only 5 days of free demurrage. Reviewing the documents in the right-hand table before customs filing reveals serious discrepancies. Use the calculator to compute the duty impact versus demurrage charges and recommend the optimal clearance plan!",
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
          case_study_board_en: {
            context: "02x40'HC Shipment at Cat Lai Port | CIF Value: $85,000 | Currently Day 7 at port (Free DEM: 5 days)",
            unit_hint: "Compute: Duty savings ($85,000 × 10%) vs. 2-container DEM if waiting 5 more days for re-issued C/O (12 days total)",
            table_headers: ["Check Item", "Invoice & Packing List", "Bill of Lading (B/L)", "Original C/O Form E", "Tariff / Customs Impact"],
            table_rows: [
              ["HS Code", "8481.80.99", "8481.80 (6-digit)", "8481.90.00 (Subheading mismatch!)", "MFN Duty: 10% | Valid Form E: 0%"],
              ["Gross Weight", "36,400 KGS", "38,200 KGS (+1,800 kg mismatch)", "36,400 KGS", "Red-channel physical inspection risk"],
              ["Demurrage (DEM)", "02 x 40'HC", "2 days past Free Time", "Re-issuing C/O takes +5 days", "Days 6–10: $45/cntr/day | Day 11+: $75/cntr/day"]
            ],
            notes: [
              "Shipper confirmed actual gross weight is 36,400 KGS (carrier typed 38,200 KGS in error on B/L and e-Manifest).",
              "Customs regulations allow declaring 'Pending C/O Submission' (paying 10% MFN duty upfront to release cargo early, then submitting corrected C/O within 30 days for a full refund)."
            ]
          },
          expected_keywords: ["C/O Form E", "HS Code", "Manifest", "DEM/DET", "Nợ C/O", "VNACCS/VCIS"],
          keyword_hints_vi: [
            "Tiền thuế chênh lệch nếu mất ưu đãi Form E: $85,000 × 10% = $8,500 (~215 triệu đồng)",
            "Nếu để 2 cont nằm cảng chờ C/O mới thêm 5 ngày (tổng 12 ngày = 5 free + 5 ngày giá $45 + 2 ngày giá $75): Phí DEM = 2 × (225 + 150) = $750!",
            "Chiến lược tối ưu: 1) Tu chỉnh B/L & e-Manifest về 36,400 KGS ngay trong 24h trước khi truyền tờ khai; 2) Mở tờ khai xin Nợ C/O ngày thứ 8 kéo hàng về kho (chỉ tốn 3 ngày DEM = 2 × 3 × $45 = $270, tiết kiệm $480 DEM) rồi nộp bổ sung C/O Form E mới trong 30 ngày để hoàn lại $8,500 tiền thuế!"
          ],
          keyword_hints_en: [
            "Preferential Form E duty at stake: $85,000 × 10% = $8,500",
            "Leaving 2 containers at port for 5 more days (12 days total = 5 free + 5×$45 + 2×$75): Total DEM = 2 × ($225 + $150) = $750!",
            "Optimal plan: 1) Amend B/L & e-Manifest weight to 36,400 KGS within 24h BEFORE filing declaration; 2) File customs on Day 8 with Pending C/O (paying only 3 days DEM = $270, saving $480) and submit re-issued Form E within 30 days to refund the $8,500 duty!"
          ],
          followup_rule_regex: "(8,?500|750|270|nợ\\s*c/?o|pending\\s*c/?o|30\\s*ngày|30\\s*day|hoàn thuế|refund|tu chỉnh|amend|manifest)",
          followup_probe_vi: "Nếu bạn để 2 cont 40'HC nằm chờ tại Cát Lái thêm 5 ngày nữa (thành 12 ngày lưu bãi) để đợi C/O mới gửi sang thì tổng phí DEM bậc thang mất bao nhiêu USD? Làm cách nào vừa kéo hàng về kho sớm để cắt phí DEM, vừa bảo toàn được $8,500 tiền thuế ưu đãi Form E?",
          spoken_probe_vi: "Nếu bạn để hai công ten nơ nằm chờ tại Cát Lái thêm năm ngày nữa thành mười hai ngày lưu bãi để đợi giấy chứng nhận xuất xứ mới gửi sang thì tổng phí lưu bãi bậc thang mất bao nhiêu đô la Mỹ? Làm cách nào vừa kéo hàng về kho sớm để cắt phí lưu bãi, vừa bảo toàn được tám nghìn năm trăm đô la tiền thuế ưu đãi?",
          followup_probe_en: "If you leave both 40-foot containers at Cat Lai for five more days—making 12 days total—waiting for the re-issued Certificate of Origin, how much tiered demurrage will you pay in US dollars? How can you clear cargo early to stop demurrage while still recovering the 8,500-dollar preferential duty?",
          ideal_answer: "Bước 1 (Tính toán Thuế & Phí lưu bãi DEM): Tiền thuế ưu đãi C/O Form E của lô hàng là $85,000 × 10% = $8,500. Nếu để 2 cont nằm cảng chờ cấp lại C/O thêm 5 ngày (tổng 12 ngày: 5 ngày miễn phí + 5 ngày mức $45 + 2 ngày mức $75), phí DEM hãng tàu lên tới 2 × (225 + 150) = $750 (chưa tính lưu bãi cảng và trễ tiến độ nhà máy). Bước 2 (Tu chỉnh Manifest trước khi mở tờ khai): Chưa truyền tờ khai ngay khi B/L lệch +1,800 kg; lập tức yêu cầu Shipper và Đại lý tàu tu chỉnh B/L & sửa e-Manifest trên Cổng thông tin một cửa quốc gia về đúng 36,400 KGS trong 24 giờ. Bước 3 (Khai Nợ C/O kéo hàng sớm): Ngay ngày thứ 8 sau khi khớp Manifest, truyền tờ khai VNACCS đăng ký Nợ C/O Form E (tạm nộp thuế MFN $8,500) để giải phóng 2 cont về kho (chỉ chịu 3 ngày DEM = 2 × 3 × $45 = $270, tiết kiệm ngay $480 DEM). Đồng thời đôn đốc Shipper xin cấp lại C/O Form E đúng phân nhóm 8481.80, nộp bổ sung tờ khai AMA trong 30 ngày để hoàn lại trọn vẹn $8,500 tiền thuế."
        },
        {
          question_id: "cus_q03",
          domain: "CUSTOMS",
          level: "Senior",
          type: "kpi_optimization",
          time_limit_sec: 150,
          title: "Phòng vệ rủi ro Kiểm tra sau thông quan (PCA) & Xác định trước mã số HS Code",
          title_en: "Mitigating Post-Clearance Audit Risk via Advance HS Tariff Rulings",
          question_text: "Khi công ty chuẩn bị nhập khẩu một dây chuyền máy móc đồng bộ lần đầu tiên về Việt Nam có nguy cơ tranh cãi mã HS Code (thuế 0% so với 15%), bạn triển khai bước pháp lý nào trước khi hàng xuống tàu để tránh rủi ro bị truy thu thuế sau 3–5 năm?",
          spoken_vi: "Khi công ty chuẩn bị nhập khẩu một dây chuyền máy móc đồng bộ lần đầu tiên về Việt Nam có nguy cơ tranh cãi về mã số phân loại hàng hóa với mức thuế không phần trăm so với mười lăm phần trăm, bạn triển khai bước pháp lý nào trước khi hàng xuống tàu để tránh rủi ro bị kiểm tra sau thông quan và truy thu thuế sau ba đến năm năm?",
          question_text_en: "When importing a complex machinery line for the first time with disputed HS tariff classification—zero percent versus 15 percent duty—what legal step do you take prior to shipment to prevent Post-Clearance Audit tax clawbacks years later?",
          expected_keywords: ["Xác định trước mã số", "Advance Ruling", "6 Quy tắc GRI", "Catalogue kỹ thuật", "Kiểm tra sau thông quan"],
          keyword_hints_vi: [
            "Nộp hồ sơ xin 'Xác định trước mã số' (Advance Ruling) lên Tổng cục Hải quan tối thiểu 60 ngày trước khi nhập khẩu",
            "Phân tích bản chất kỹ thuật dựa trên Catalogue gốc và 6 quy tắc tổng quát phân loại hàng hóa (GRI 1–6)"
          ],
          keyword_hints_en: [
            "Submit an official 'Advance Tariff Ruling' application to Customs HQ at least 60 days prior to shipment",
            "Substantiate classification with technical drawings, OEM catalogues, and the 6 General Rules of Interpretation (GRI 1–6)"
          ],
          followup_probe_vi: "Văn bản thông báo kết quả Xác định trước mã số của Tổng cục Hải quan có giá trị hiệu lực tối đa bao nhiêu năm?",
          spoken_probe_vi: "Văn bản thông báo kết quả xác định trước mã số hàng hóa của Tổng cục Hải quan có giá trị hiệu lực pháp lý tối đa bao nhiêu năm?",
          followup_probe_en: "For how many years does an official Advance Tariff Ruling notification from Customs remain legally valid?",
          ideal_answer: "(S) Áp sai mã HS cho dây chuyền trị giá lớn dễ dẫn đến truy thu thuế và phạt chậm nộp 0.03%/ngày trong đợt Kiểm tra sau thông quan (PCA). (T) Khóa chặt cơ sở pháp lý mã HS trước khi hàng cập cảng. (A) Tối thiểu 60 ngày trước khi xuất hàng, tôi tổng hợp Catalogue, bản vẽ kỹ thuật và sơ đồ nguyên lý hoạt động, đối chiếu 6 quy tắc GRI, rồi nộp bộ hồ sơ xin 'Xác định trước mã số' (Advance Ruling) lên Cục Thuế XNK – Tổng cục Hải quan. Văn bản kết quả có hiệu lực pháp lý tối đa 3 năm trên toàn quốc. (R) 100% lô thiết bị thông quan nhanh chóng đúng dự toán thuế và an toàn tuyệt đối qua các kỳ thanh tra PCA."
        }
      ]
    },

    // 5. CHUỖI CUNG ỨNG (SUPPLY CHAIN)
    {
      id: "supply_chain",
      code: "SUPPLY_CHAIN",
      name: "Chuỗi cung ứng (Supply Chain)",
      spokenNameVi: "Hoạch định Chuỗi cung ứng",
      nameEn: "Supply Chain & Inventory Planning",
      shortTitle: "Chuỗi cung ứng",
      shortTitleEn: "Supply Chain",
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
          title_en: "Mitigating the Bullwhip Effect through Monthly S&OP Governance",
          question_text: "Trong chuỗi cung ứng FMCG, một đợt chiết khấu ngắn hạn của phòng Sales thường làm đơn đặt hàng biến động phóng đại gấp nhiều lần lên tận nhà máy sản xuất. Bạn giải thích hiện tượng này và dùng quy trình S&OP để hóa giải như thế nào?",
          spoken_vi: "Trong chuỗi cung ứng hàng tiêu dùng nhanh, một đợt chiết khấu ngắn hạn của phòng kinh doanh thường làm đơn đặt hàng biến động phóng đại gấp nhiều lần lên tận nhà máy sản xuất. Bạn giải thích hiện tượng hiệu ứng roi da này và dùng quy trình phối hợp kế hoạch bán hàng và vận hành để hóa giải như thế nào?",
          question_text_en: "In an FMCG supply chain, a short-term sales trade promotion often triggers massive order amplification upstream at the manufacturing plant. How do you explain this phenomenon and mitigate it through Sales and Operations Planning?",
          expected_keywords: ["Bullwhip Effect", "S&OP", "Sell-out / POS Data", "MAPE", "Forecast Bias"],
          keyword_hints_vi: [
            "Hiện tượng Hiệu ứng Roi da (Bullwhip Effect) do đại lý ôm hàng đầu cơ (Forward Buying / Sell-in ảo)",
            "Đồng bộ lịch khuyến mãi trước 6 tuần tại cuộc họp S&OP và dự báo dựa trên dữ liệu tiêu thụ thực tế (Sell-out)"
          ],
          keyword_hints_en: [
            "Identify the Bullwhip Effect caused by distributor forward-buying (artificial Sell-in spike followed by order slump)",
            "Lock trade promotion calendars 6 weeks ahead in monthly S&OP and anchor forecasts on end-consumer Sell-out / POS data"
          ],
          followup_probe_vi: "Chỉ số KPI nào bạn dùng hàng tháng để đo lường độ lệch dự báo (Forecast Error) giữa số Sales cam kết và sản lượng thực tế?",
          spoken_probe_vi: "Chỉ số đánh giá nào bạn dùng hàng tháng để đo lường sai số dự báo và độ chệch xu hướng giữa con số phòng kinh doanh cam kết so với sản lượng tiêu thụ thực tế?",
          followup_probe_en: "Which monthly metrics do you use to measure forecast accuracy error and systematic bias between sales commitments and actual demand?",
          ideal_answer: "(S) Đây là Hiệu ứng Roi da (Bullwhip Effect): khi Sales tung chiết khấu đột ngột, nhà phân phối ôm hàng (Sell-in tăng vọt giả tạo) làm nhà máy chạy tăng ca mua dư nguyên liệu, sau đó tháng kế tiếp đơn hàng tụt dốc gây ứ đọng tồn kho. (T) Giảm sai số dự báo MAPE xuống dưới 18%. (A) Tôi thiết lập lịch họp S&OP định kỳ hàng tháng giữa Sales – Marketing – Supply – Factory, bắt buộc khóa kế hoạch Trade Promotion trước 6 tuần, bóc tách sản lượng nền (Baseline) khỏi sản lượng khuyến mãi (Uplift), đồng thời kết nối dữ liệu tồn kho nhà phân phối và Sell-out để đo WAPE/MAPE và Forecast Bias. (R) Kéo giảm MAPE từ 31% xuống 16.5% và cắt giảm 22% tồn kho chậm luân chuyển (SLOB)."
        },
        {
          question_id: "sc_case_01",
          domain: "SUPPLY_CHAIN",
          level: "Junior",
          type: "case_study",
          time_limit_sec: 180,
          title: "Tính Safety Stock, Điểm đặt hàng lại (ROP) & Giải cứu nguy cơ đứt chuyền bao bì",
          title_en: "Calculating Safety Stock, Reorder Point & Emergency Bridging Supply",
          question_text: "Là Chuyên viên Hoạch định Vật tư (Material Planner) tại nhà máy Bình Dương, sáng nay bạn nhận được cảnh báo tắc cửa khẩu biên giới khiến Lead Time mã màng nhôm PKG-20 kéo dài lên 11 ngày, trong khi sức tiêu thụ của xưởng đang tăng vọt. Dựa vào bảng bên phải và máy tính mini, hãy tính: (1) Số ngày tồn kho còn đủ dùng (Days of Supply), (2) Mức Safety Stock & ROP chuẩn, và (3) Phương án mua bù khẩn cấp tối ưu chi phí nhất để không dừng chuyền!",
          spoken_vi: "Với vai trò chuyên viên hoạch định vật tư tại nhà máy Bình Dương, sáng nay bạn nhận được cảnh báo tắc cửa khẩu biên giới khiến thời gian giao hàng mã màng nhôm kéo dài lên mười một ngày, trong khi mức tiêu thụ của xưởng đang tăng vọt. Dựa vào bảng số liệu bên phải và máy tính, hãy tính: Thứ nhất, số ngày tồn kho hiện tại còn đủ dùng. Thứ hai, mức tồn kho an toàn và điểm đặt hàng lại chuẩn. Và thứ ba, phương án mua bù khẩn cấp có chi phí tối ưu nhất để không bị dừng dây chuyền sản xuất!",
          question_text_en: "As Material Planner at a Binh Duong factory, border congestion just stretched lead time for packaging foil PKG-20 to 11 days while daily factory usage surged. Using the table and calculator, compute: first, current Days of Supply; second, required Safety Stock and Reorder Point; and third, the most cost-effective emergency bridging order to prevent a production line shutdown!",
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
          case_study_board_en: {
            context: "Binh Duong FMCG Plant | SKU: PKG-20 (Blister Foil) | Current On-Hand Stock: 11,200 rolls",
            unit_hint: "Compute: DOS = 11,200 ÷ 1,500 | SS = (1,650 × 11) - (1,200 × 7) | ROP = (1,200 × 7) + SS",
            table_headers: ["Planning Parameter", "Historical Baseline", "Current Week Spike", "Cost & MOQ Terms"],
            table_rows: [
              ["Daily Usage", "1,200 rolls / day", "1,500 rolls / day (Peak Max: 1,650)", "+25% surge for Tet production"],
              ["Replenishment Lead Time", "7 days (Cross-border)", "11 days (Border congestion)", "Line-down loss: 180M VND / day"],
              ["On-Hand & In-Transit", "On-hand: 11,200 rolls", "In-transit: 0 rolls", "Primary vendor: $4.0/roll (MOQ: 10,000)"],
              ["Backup Local Vendor (Viet A)", "Warehouse in Cu Chi", "Express Lead Time: 2 days", "Price: $4.6/roll (+15%), MOQ: 3,000 rolls"]
            ],
            notes: [
              "Use Max-Max Safety Stock formula: SS = (Max Usage 1,650 × Max LT 11) - (Avg Usage 1,200 × Avg LT 7).",
              "Objective: Guarantee Zero Line-Stoppage at the lowest incremental procurement cost."
            ]
          },
          expected_keywords: ["Days of Supply", "Safety Stock", "ROP", "Dual Sourcing", "Line Stoppage", "9,750"],
          keyword_hints_vi: [
            "1) Days of Supply (DOS) = 11,200 ÷ 1,500 = 7.47 ngày (< 11 ngày Lead Time -> Sẽ đứt chuyền 3.53 ngày ~ thiếu ít nhất 5,300 cuộn!)",
            "2) Safety Stock = (1,650 × 11) - (1,200 × 7) = 18,150 - 8,400 = 9,750 cuộn; ROP = 8,400 + 9,750 = 18,150 cuộn",
            "3) Đặt mua khẩn 6,000 cuộn từ NCC nội địa Việt Á (giao sau 2 ngày; phần chênh giá $0.6 × 6,000 = $3,600 ~ 91 triệu đ, rẻ hơn gấp 7 lần so với 3.5 ngày dừng chuyền mất 630 triệu đ!), song song đặt lô chính >= 15,000 cuộn!"
          ],
          keyword_hints_en: [
            "1) Days of Supply (DOS) = 11,200 ÷ 1,500 = 7.47 days (< 11-day Lead Time -> 3.53-day stock-out gap = ~5,300 rolls short!)",
            "2) Safety Stock = (1,650 × 11) - (1,200 × 7) = 9,750 rolls; Reorder Point (ROP) = 8,400 + 9,750 = 18,150 rolls",
            "3) Place emergency PO for 6,000 rolls from local vendor Viet A (arrives in 2 days; $3,600 price premium ~91M VND saves 630M VND in line-down losses!), while ordering >= 15,000 rolls from primary supplier"
          ],
          followup_rule_regex: "(7\\.?4|7\\.?5|9,?750|18,?150|việt á|viet a|nội địa|local|5,?300|6,?000)",
          followup_probe_vi: "Kiểm tra kỹ bằng máy tính nhé: với 11,200 cuộn và tốc độ chạy 1,500 cuộn/ngày thì kho sẽ hết sạch sau 7.47 ngày — tức là đứt chuyền mất hơn 3.5 ngày trước khi hàng biên giới kịp về ở ngày 11! Cụ thể bạn đặt mua bao nhiêu cuộn từ NCC nội địa Việt Á và con số Safety Stock chuẩn tính ra là bao nhiêu?",
          spoken_probe_vi: "Bạn kiểm tra kỹ bằng máy tính nhé. Với mười một nghìn hai trăm cuộn và tốc độ chạy một nghìn năm trăm cuộn mỗi ngày thì kho sẽ hết sạch sau bảy phẩy bốn mươi bảy ngày, tức là đứt chuyền mất hơn ba ngày rưỡi trước khi hàng biên giới kịp về ở ngày thứ mười một! Cụ thể bạn đặt mua bao nhiêu cuộn từ nhà cung cấp nội địa Việt Á và mức tồn kho an toàn chuẩn tính ra là bao nhiêu?",
          followup_probe_en: "Check the numbers on the calculator: 11,200 rolls at 1,500 rolls per day lasts only 7.47 days—leaving a 3.5-day stock-out gap before the 11-day cross-border shipment arrives! Exactly how many rolls will you order from local backup supplier Viet A, and what is the calculated Safety Stock?",
          ideal_answer: "Bước 1 (Tính chính xác DOS, Safety Stock & ROP): Với sức chạy mới 1,500 cuộn/ngày, tồn kho 11,200 cuộn chỉ trụ được DOS = 11,200 ÷ 1,500 = 7.47 ngày. So với Lead Time tắc biên 11 ngày, nhà máy hụt 3.53 ngày sản xuất (thiếu tối thiểu 3.53 × 1,500 = 5,300 cuộn). Tính chuẩn Safety Stock = (1,650 × 11) - (1,200 × 7) = 18,150 - 8,400 = 9,750 cuộn; từ đó Điểm đặt hàng lại ROP = 8,400 + 9,750 = 18,150 cuộn (tồn 11,200 đang thủng sâu dưới ROP). Bước 2 (Phương án cứu chuyền Dual Sourcing): Phát hành ngay PO khẩn cấp mua 6,000 cuộn từ NCC nội địa Việt Á tại Củ Chi (giao trong 2 ngày, đạt MOQ 3,000). Chi phí chênh giá 15% là $0.6 × 6,000 = $3,600 (~91 triệu đồng) — tiết kiệm hơn gấp 7 lần so với thiệt hại dừng chuyền 3.5 ngày (630 triệu đồng). Bước 3: Đồng thời đặt ngay lô chính >= 15,000 cuộn từ NCC biên giới và cập nhật lại tham số ROP mùa Tết trên hệ thống MRP."
        },
        {
          question_id: "sc_q03",
          domain: "SUPPLY_CHAIN",
          level: "Senior",
          type: "kpi_optimization",
          time_limit_sec: 150,
          title: "Tối ưu Vòng quay tồn kho bằng Ma trận phân nhóm ABC-XYZ",
          title_en: "Working Capital Optimization via the 9-Box ABC-XYZ Matrix",
          question_text: "CFO yêu cầu giảm 20% giá trị tồn kho để giải phóng vốn lưu động, nhưng Giám đốc Sales lo ngại cắt tồn kho sẽ gây đứt hàng chủ lực. Bạn dùng phương pháp phân tích dữ liệu nào để đạt cả hai mục tiêu?",
          spoken_vi: "Giám đốc tài chính yêu cầu giảm hai mươi phần trăm giá trị tồn kho để giải phóng vốn lưu động, nhưng Giám đốc kinh doanh lại lo ngại cắt giảm tồn kho sẽ gây đứt gãy các mặt hàng chủ lực. Bạn dùng phương pháp phân nhóm dữ liệu nào để đạt được cả hai mục tiêu trên?",
          question_text_en: "The Chief Financial Officer demands a 20 percent inventory reduction to free working capital, while the Sales Director fears stock-outs on top-selling products. Which inventory segmentation framework do you apply to achieve both goals?",
          expected_keywords: ["ABC-XYZ Matrix", "Service Level", "SLOB", "Inventory Turnover", "VMI / Consignment"],
          keyword_hints_vi: [
            "Phân tích ma trận 9 ô ABC (giá trị doanh thu) × XYZ (độ biến động nhu cầu)",
            "Bảo vệ Service Level 99% cho nhóm AX/AY, thanh lý mạnh hàng SLOB và đàm phán ký gửi VMI/Consignment cho nhóm AZ"
          ],
          keyword_hints_en: [
            "Segment SKUs using the 9-box ABC (revenue contribution) × XYZ (demand variability) matrix",
            "Protect 99% Service Level on AX/AY items, liquidate SLOB (>120 days slow-moving), and shift erratic high-value AZ items to Make-to-Order or VMI/Consignment"
          ],
          followup_probe_vi: "Đối với nhóm hàng AZ (giá trị cao nhưng nhu cầu giật cục rất khó đoán), bạn thiết lập chính sách dự trữ khác gì so với nhóm AX?",
          spoken_probe_vi: "Đối với nhóm hàng có giá trị cao nhưng nhu cầu mua lại giật cục rất khó đoán định, bạn thiết lập chính sách dự trữ và đặt hàng khác gì so với nhóm hàng bán đều mỗi ngày?",
          followup_probe_en: "For Class AZ items—high financial value but highly erratic demand—how does your stocking policy differ from steady Class AX items?",
          ideal_answer: "(S) Cắt giảm tồn kho cào bằng 20% mọi mã sẽ làm gãy doanh thu nhóm chủ lực. (T) Giảm 20% vốn tồn kho mà vẫn giữ tỷ lệ đáp ứng nhóm A >= 99%. (A) Tôi chạy ma trận 9 ô ABC-XYZ: 1) Giữ vững Buffer cho nhóm AX/AY (sức bán ổn định, đóng góp 80% doanh thu); 2) Cắt giảm sâu nhóm CZ và lập chiến dịch xả kho rổ hàng SLOB (>120 ngày không luân chuyển); 3) Với nhóm AZ (giá trị lớn, nhu cầu thất thường), chuyển sang đặt hàng theo đơn chốt (Make-to-Order) hoặc đàm phán tồn kho ký gửi nhà cung cấp (VMI / Consignment). (R) Giảm 21.5% giá trị tồn kho bình quân (DIO giảm từ 62 xuống 48 ngày) trong khi tỷ lệ Fill Rate nhóm A đạt 99.1%."
        }
      ]
    },

    // 6. BUSINESS ANALYST MẢNG LOGISTICS (LOGISTICS BA)
    {
      id: "logistics_ba",
      code: "LOGISTICS_BA",
      name: "Business Analyst mảng Logistics (Logistics BA)",
      spokenNameVi: "Phân tích Nghiệp vụ hệ thống Logistics",
      nameEn: "Logistics Systems Business Analyst",
      shortTitle: "Logistics BA",
      shortTitleEn: "Logistics BA",
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
          title_en: "Warehouse Floor Discovery (Gemba Walk) & Mobile Receiving UAT Design",
          question_text: "Khi viết tài liệu BRD / User Story cho tính năng quét mã vạch nhận hàng bằng súng PDA tại kho, nhân viên kho thường thao tác khác xa quy trình lý thuyết. Là Logistics BA, bạn khảo sát thực tế và tổ chức kiểm thử UAT thế nào để lúc Go-live không bị tắc nghẽn?",
          spoken_vi: "Khi viết tài liệu đặc tả yêu cầu nghiệp vụ cho tính năng quét mã vạch nhận hàng bằng thiết bị cầm tay tại kho, nhân viên kho thường thao tác khác xa quy trình trên giấy. Với vai trò chuyên viên phân tích nghiệp vụ, bạn khảo sát thực địa tại kho và tổ chức kiểm thử nghiệm thu như thế nào để ngày vận hành chính thức không bị tắc nghẽn?",
          question_text_en: "When writing business requirement documents and user stories for mobile barcode receiving in a warehouse, floor operations often differ sharply from paper SOPs. As a Logistics Business Analyst, how do you conduct on-site discovery and user acceptance testing so Go-live succeeds smoothly?",
          expected_keywords: ["Gemba Walk", "As-Is vs To-Be", "Exception Flow", "UAT", "Acceptance Criteria"],
          keyword_hints_vi: [
            "Xuống trực tiếp sàn kho (Gemba Walk / Shadowing) theo dõi ca nhập hàng để bắt hết các ngoại lệ: tem rách, rớt Wi-Fi, hàng giao thiếu/thừa (Partial GRN)",
            "Đưa các Exception Flows vào Acceptance Criteria và mời chính Tổ trưởng kho cầm súng PDA test UAT thực địa"
          ],
          keyword_hints_en: [
            "Conduct on-floor Gemba Walks shadowing receiving shifts to capture real exceptions: torn barcodes, Wi-Fi dead zones, partial deliveries",
            "Embed Exception Flows into Acceptance Criteria and run hands-on UAT directly with warehouse team leads on physical devices"
          ],
          followup_probe_vi: "Hãy kể 2 kịch bản ngoại lệ (Edge Cases) điển hình tại cửa nhập kho Inbound mà nếu BA bỏ sót thì nhân viên không thể bấm hoàn tất phiếu nhập trên PDA?",
          spoken_probe_vi: "Bạn hãy kể hai tình huống ngoại lệ điển hình tại cửa nhập kho mà nếu chuyên viên phân tích nghiệp vụ bỏ sót khi thiết kế phần mềm, nhân viên kho sẽ bị kẹt không thể bấm hoàn tất phiếu nhập trên máy quét?",
          followup_probe_en: "Name two classic inbound receiving edge cases that, if missed by the Business Analyst, would block warehouse staff from completing goods receipt on their handheld scanners?",
          ideal_answer: "(S) Dự án triển khai WMS cho kho 12,000m2 ban đầu chỉ mô tả Happy Path nên bản Demo đầu tiên bị vướng ngay tại cửa Inbound. (T) Thiết kế luồng PDA sát thực tế 100% và Go-live an toàn. (A) Tôi thực hiện Gemba Walk đi theo nhân viên Inbound 3 ca liên tiếp, vẽ luồng As-Is vs To-Be và bổ sung 3 Exception Flows cốt lõi vào User Story: 1) Nhập kho từng phần (Partial Receipt) khi xe giao thiếu kiện; 2) Luồng in lại mã vạch nội bộ qua Bluetooth khi tem NCC bị ướt/mờ; 3) Lưu đệm Offline Queue khi đi vào góc khuất sóng Wi-Fi. Ở vòng UAT, tôi soạn 25 Test Cases từ chứng từ thật cho Key Users dưới kho trực tiếp thao tác duyệt. (R) Go-live mượt ngay ngày đầu, rút ngắn 45% thời gian làm phiếu GRN."
        },
        {
          question_id: "ba_case_01",
          domain: "LOGISTICS_BA",
          level: "Junior",
          type: "case_study",
          time_limit_sec: 180,
          title: "Giải cứu sự cố Overselling 420 đơn Flash Sale & Thiết kế lại cơ chế đồng bộ OMS – WMS",
          title_en: "Recovering 420 Oversold Flash-Sale Orders & Redesigning OMS–WMS ATP Sync",
          question_text: "Đúng 00:15 đêm Mega Sale, hệ thống OMS báo động đỏ: mã nồi chiên AIRFRY-09 bị bán lố (Oversell) do Cron-job 15 phút/lần đẩy trùng 100% tồn kho lên cả Shopee và TikTok Shop. Hãy dùng bảng số liệu và máy tính mini để: (1) Tính số máy thiếu ròng sau khi điều chuyển kho lẻ và số đơn tối đa được phép hủy dưới trần phạt 3% của sàn; (2) Nêu phương án cứu đơn trước 18:00 hôm nay và thiết kế lại luồng đồng bộ tồn kho ATP!",
          spoken_vi: "Đúng không giờ mười lăm phút đêm hội mua sắm, hệ thống quản lý đơn hàng báo động đỏ: mặt hàng nồi chiên không dầu bị bán vượt quá số lượng tồn kho thực tế, do tác vụ đồng bộ mười lăm phút một lần đã đẩy trùng một trăm phần trăm tồn kho lên cả hai sàn thương mại điện tử. Bạn hãy dùng bảng số liệu và máy tính để: Thứ nhất, tính số máy còn thiếu ròng sau khi kéo hàng từ kho cửa hàng lẻ về, và số đơn tối đa được phép hủy dưới mức trần phạt ba phần trăm của sàn. Thứ hai, nêu phương án cứu đơn trước mười tám giờ hôm nay và thiết kế lại cơ chế đồng bộ tồn kho khả dụng theo thời gian thực!",
          question_text_en: "At 12:15 AM during Mega Sale, your Order Management System alerts that air-fryer SKU AIRFRY-09 is oversold because a 15-minute batch job pushed 100 percent of physical stock to both Shopee and TikTok Shop simultaneously. Using the table and calculator: first, compute the net shortage after retail store transfer and the maximum cancellable orders under the 3 percent seller-fault penalty cap; second, propose a same-day order recovery plan plus a redesigned real-time Available-to-Promise sync architecture!",
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
          case_study_board_en: {
            context: "00:15 AM Mega Sale Incident | SKU: AIRFRY-09 | Root Bug: 15-min Cron-job pushed 100% stock to both channels",
            unit_hint: "Compute: Net Shortage = (820 + 600) - 1,000 - 280 | Max Allowed Cancellations (< 3%) = 1,420 × 3%",
            table_headers: ["System / Channel", "Displayed Stock (00:00)", "Orders Placed (00:00-00:15)", "Actual Physical Supply", "Marketplace SLA & Penalty"],
            table_rows: [
              ["Central DC WMS", "1,000 units", "—", "1,000 units ready to pack", "—"],
              ["Shopee Mall Official", "1,000 units (100% push)", "820 orders", "Draws from Central DC WMS", "Handover before 18:00; Penalty if NFR > 3%"],
              ["TikTok Shop Mall", "1,000 units (100% push)", "600 orders", "Draws from Central DC WMS", "Handover before 20:00; Campaign ban if NFR > 3%"],
              ["Retail Store Network", "Offline (Unlinked)", "—", "280 units (6h transfer to DC)", "Express transfer truck: 1,200,000 VND"]
            ],
            notes: [
              "Exceeding a 3.0% Non-Fulfillment Rate (NFR) triggers Mall penalty points and bans the brand from next month's Flash Sale.",
              "Central DC also holds 150 units of upgraded model AIRFRY-09 PRO (+65,000 VND higher unit cost) eligible for complimentary customer upgrades."
            ]
          },
          expected_keywords: ["ATP", "Buffer Stock", "Webhook / Real-time Sync", "Soft Allocation", "NFR (< 3%)", "140 đơn / 42 đơn"],
          keyword_hints_vi: [
            "1) Tổng đơn = 820 + 600 = 1,420 đơn -> Oversell ban đầu = 420 máy. Kéo 280 máy từ Kho lẻ về còn thiếu ròng: 420 - 280 = 140 đơn!",
            "2) Trần hủy tối đa không vượt 3%: 1,420 × 3% = 42.6 -> Chỉ được phép hủy tối đa 42 đơn! Vậy ít nhất 140 - 42 = 98 đơn (tốt nhất cả 140 đơn) phải cứu bằng cách CSKH đề xuất nâng cấp miễn phí sang mẫu AIRFRY-09 PRO (đang sẵn 150 máy)!",
            "3) Thiết kế BA: Bỏ Cron-job 15 phút; dùng Event-driven Webhook + Redis giữ chỗ tức thì (Soft Reservation) + Công thức chia tỷ lệ kênh Channel Allocation Ratio kèm Safety Buffer 5%"
          ],
          keyword_hints_en: [
            "1) Total orders = 820 + 600 = 1,420 -> Initial oversell = 420 units. After pulling 280 retail units, net shortage = 140 orders!",
            "2) Max cancellations under 3% cap: 1,420 × 3% = 42.6 -> Max 42 orders! Save at least 98–140 orders via complimentary upgrade to AIRFRY-09 PRO (150 units on hand)!",
            "3) BA Architecture: Replace 15-min batch cron with Event-driven Webhooks + sub-second Soft Allocation + Channel Ratio split with 5% Safety Buffer"
          ],
          followup_rule_regex: "(140|42|98|pro|nâng cấp|upgrade|3%|1,?420)",
          followup_probe_vi: "Kiểm tra con số vận hành ngay hôm nay nhé: sau khi điều chuyển 280 máy từ cửa hàng lẻ về thì bạn vẫn thiếu 140 đơn, trong khi trần phạt 3% trên tổng 1,420 đơn chỉ cho phép hủy tối đa 42 đơn! Bạn cứu ít nhất 98–140 đơn thiếu này thế nào trước 18:00, và công thức chia tồn kho an toàn (ATP / Buffer Stock) trên OMS bạn viết trong BRD ra sao?",
          spoken_probe_vi: "Kiểm tra con số vận hành ngay hôm nay nhé. Sau khi điều chuyển hai trăm tám mươi máy từ chuỗi cửa hàng lẻ về kho trung tâm thì bạn vẫn còn thiếu một trăm bốn mươi đơn, trong khi mức trần phạt ba phần trăm trên tổng một nghìn bốn trăm hai mươi đơn chỉ cho phép hủy tối đa bốn mươi hai đơn! Bạn cứu số đơn thiếu này như thế nào trước mười tám giờ chiều nay, và công thức chia tỷ lệ tồn kho dự phòng an toàn trên hệ thống bạn thiết kế ra sao?",
          followup_probe_en: "Let's check today's exact numbers: after transferring 280 retail store units, you are still short 140 orders while the 3 percent cap on 1,420 orders allows at most 42 cancellations! How do you save those 98 to 140 orders before 6:00 PM today, and what exact Available-to-Promise and Safety Buffer formula will you specify in your BRD?",
          ideal_answer: "Bước 1 (Tính toán Cứu đơn & Giữ trần NFR < 3%): Tổng đơn phát sinh là 820 + 600 = 1,420 đơn trên nền tồn WMS 1,000 máy (Oversell 420 máy). Tôi lập tức tạo lệnh Stock Transfer rút 280 máy từ chuỗi cửa hàng lẻ về kho trung tâm trong 6 giờ (chi phí 1.2 triệu đồng, kịp đóng gói trước 18:00), thu hẹp mức thiếu ròng còn 420 - 280 = 140 đơn. Do trần hủy an toàn 3% của 1,420 đơn chỉ cho phép tối đa 42 đơn hủy, để bảo vệ gian hàng Mall tôi chuyển danh sách 140 đơn đặt cuối cho CSKH gọi tặng nâng cấp miễn phí lên dòng AIRFRY-09 PRO (sẵn tồn 150 máy, bù giá vốn 140 × 65,000đ = 9.1 triệu đồng — nhỏ hơn rất nhiều so với thiệt hại khóa Flash Sale tháng sau), kéo tỷ lệ hủy lỗi Shop về ~0%. Bước 2 (Thiết kế lại kiến trúc OMS – WMS trong BRD): 1) Khai tử Batch Cron-job 15 phút, chuyển sang Event-driven Webhook nhận sự kiện Order Created để khóa tồn tạm thời (Soft Allocation trên Redis) dưới 500ms; 2) Thiết lập công thức ATP đẩy sàn: Sync_Stock = (Physical_WMS - Reserved_Qty - Safety_Buffer_5%) × Channel_Ratio (Shopee 60% / TikTok 40%), và tự động gom về 1 kênh duy nhất khi tồn chạm ngưỡng Low-stock <= 30 máy."
        },
        {
          question_id: "ba_q03",
          domain: "LOGISTICS_BA",
          level: "Senior",
          type: "kpi_optimization",
          time_limit_sec: 150,
          title: "Quản trị Master Data Kích thước & Quy đổi Đơn vị tính (UoM) giữa WMS và TMS",
          title_en: "Master Data Governance for SKU Dimensions & Unit-of-Measure Across WMS and TMS",
          question_text: "Khi tích hợp dữ liệu từ WMS sang TMS để tự động xếp tải trọng xe, lỗi kinh điển nhất là Master Data kích thước/trọng lượng SKU bị bỏ trống hoặc nhầm đơn vị Thùng vs Cái, làm thuật toán ghép xe sai hoàn toàn. Là Logistics BA, bạn thiết kế chốt chặn hệ thống như thế nào?",
          spoken_vi: "Khi tích hợp dữ liệu từ hệ thống quản lý kho sang phần mềm điều phối xe để tự động tính tải trọng xếp hàng, lỗi kinh điển nhất là dữ liệu gốc về kích thước và trọng lượng sản phẩm bị bỏ trống hoặc nhầm lẫn đơn vị tính giữa Thùng và Cái, làm thuật toán ghép xe tính sai hoàn toàn. Với vai trò chuyên viên phân tích nghiệp vụ, bạn thiết kế các chốt chặn kiểm soát dữ liệu trên hệ thống như thế nào?",
          question_text_en: "When integrating WMS with TMS for automated load planning, missing SKU dimensions and weights or Piece-versus-Carton unit mix-ups completely break routing algorithms. As a Logistics Business Analyst, how do you design system-level Master Data Governance?",
          expected_keywords: ["Master Data Governance", "Cubiscan", "UoM Conversion", "Validation Rule", "Single Source of Truth"],
          keyword_hints_vi: [
            "Thiết kế System Gate lúc First-Inbound: mã hàng mới chưa cân đo Dài × Rộng × Cao × Nặng thực tế thì hệ thống chặn chưa cho Put-away/Xuất hàng",
            "Chuẩn hóa bảng Pack Hierarchy / UoM Conversion (1 Pallet = X Thùng = Y Hộp = Z Cái) và lấy WMS làm Single Source of Truth"
          ],
          keyword_hints_en: [
            "Enforce a First-Inbound System Gate: block Put-away/Outbound for any new SKU until physical L×W×H and weight are captured via dimensioning scale",
            "Standardize Pack Hierarchy / UoM Conversion (Pallet -> Carton -> Inner -> Piece) with WMS as the Single Source of Truth"
          ],
          followup_probe_vi: "Làm sao hệ thống tự động phát hiện nhân viên nhập nhầm đơn vị cm sang mm (làm thể tích CBM phóng đại gấp 1,000 lần) ngay trên màn hình nhập liệu?",
          spoken_probe_vi: "Làm sao phần mềm có thể tự động phát hiện ngay lập tức khi nhân viên gõ nhầm đơn vị xăng ti mét sang mi li mét làm thể tích kiện hàng bị phóng đại gấp một nghìn lần ngay trên màn hình nhập liệu?",
          followup_probe_en: "How can your validation rules automatically catch an operator typing millimeters instead of centimeters—which inflates cubic volume by 1,000 times—right on the input screen?",
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
