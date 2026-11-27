/**
 * src/data/mockCaseStudies.ts
 * Bộ dữ liệu thực chiến 6 nhóm ngành Logistics dành riêng cho Sinh viên tự luyện tập (EdTech Edition).
 * Mỗi ngành gồm bộ câu hỏi theo cấp độ + tối thiểu 1 Case Study có bảng số liệu định lượng (`case_study_board`)
 * để luyện phản xạ phân tích 2 cột (65/35) kết hợp Ghi chú nháp (Scratchpad) & Máy tính mini (Calculator).
 */

export interface CaseStudyBoard {
  context: string;
  unit_hint?: string;
  table_headers: string[];
  table_rows: string[][];
  notes: string[];
}

export interface PracticeQuestion {
  question_id: string;
  domain: 'TMS' | 'WMS' | 'LAST_MILE' | 'CUSTOMS' | 'SUPPLY_CHAIN' | 'LOGISTICS_BA';
  level: 'Intern/Fresher' | 'Junior' | 'Senior';
  type: 'warmup_star' | 'case_study' | 'kpi_optimization';
  time_limit_sec: number;
  title: string;
  question_text: string;
  question_text_en: string;
  case_study_board?: CaseStudyBoard;
  expected_keywords: string[];
  keyword_hints_vi: string[];
  ai_followup_rule?: string;
  followup_probe_vi: string;
  followup_probe_en: string;
  ideal_answer: string;
  ideal_answer_en?: string;
}

export interface LogisticsTrack {
  id: string;
  code: 'TMS' | 'WMS' | 'LAST_MILE' | 'CUSTOMS' | 'SUPPLY_CHAIN' | 'LOGISTICS_BA';
  name: string;
  nameEn: string;
  shortTitle: string;
  lucideIcon: 'truck' | 'warehouse' | 'bike' | 'ship' | 'git-fork' | 'bar-chart-3';
  pastelBg: string;
  pastelBorder: string;
  accentColor: string;
  badgeText: string;
  description: string;
  casePreviewLabel: string;
  questions: PracticeQuestion[];
}

export const MOCK_LOGISTICS_TRACKS: LogisticsTrack[] = [
  // ============================================================================
  // 1. VẬN TẢI & ĐIỀU PHỐI (TMS)
  // ============================================================================
  {
    id: 'tms',
    code: 'TMS',
    name: 'Vận tải & Điều phối (TMS)',
    nameEn: 'Transportation & Fleet Dispatch (TMS)',
    shortTitle: 'TMS & Điều phối',
    lucideIcon: 'truck',
    pastelBg: '#EEF2FF',
    pastelBorder: '#C7D2FE',
    accentColor: '#4F46E5',
    badgeText: 'Fleet & Routing',
    description: 'Lập kế hoạch ghép tuyến, kiểm soát khung giờ cấm tải nội đô, tối ưu hệ số lấp đầy (Fill Rate) và chi phí nhiên liệu.',
    casePreviewLabel: 'Bảng ghép xe tránh giờ cấm tải & tính Fill Rate',
    questions: [
      {
        question_id: 'tms_q01',
        domain: 'TMS',
        level: 'Intern/Fresher',
        type: 'warmup_star',
        time_limit_sec: 120,
        title: 'Kiểm soát xe chạy rỗng (Empty Miles) & định mức nhiên liệu',
        question_text: 'Khi điều phối đội xe tải giao hàng liên tỉnh, làm thế nào bạn vừa đảm bảo đúng cam kết thời gian giao hàng (Time Window) của khách, vừa giảm tỷ lệ xe quay đầu chạy rỗng (Empty Miles)? Hãy trình bày theo cấu trúc STAR.',
        question_text_en: 'When dispatching an inter-provincial truck fleet, how do you meet customer Time Windows while minimizing Empty Miles on return trips? Please structure your answer using STAR.',
        expected_keywords: ['Time Window', 'Backhaul', 'Empty Miles', 'Route Optimization', 'GPS / Telematics'],
        keyword_hints_vi: [
          'Khai thác hàng chiều về (Backhaul) qua sàn ghép hàng hoặc kho đối tác',
          'Theo dõi hành trình GPS / Telematics thời gian thực để cảnh báo kẹt xe',
          'Gom đơn cùng tuyến (Consolidation / Milk-run) theo khung giờ nhận hàng'
        ],
        followup_probe_vi: 'Nếu tài xế tự ý ghé dọc đường làm trễ Time Window của siêu thị 45 phút, trên hệ thống TMS và GPS bạn thiết lập cảnh báo sớm như thế nào?',
        followup_probe_en: 'If a driver makes an unauthorized stop and risks missing a supermarket Time Window by 45 minutes, what early alerts would you configure on TMS/GPS?',
        ideal_answer: '(S) Tại đội xe phân phối hàng tiêu dùng tuyến Bình Dương – Đồng Nai, tỷ lệ xe quay đầu rỗng từng ở mức 38% gây đội chi phí vận tải. (T) Mục tiêu là giữ tỷ lệ giao đúng Time Window >= 98% đồng thời kéo giảm Empty Miles xuống dưới 20%. (A) Tôi quy hoạch lại lịch chạy theo mô hình Milk-run trên TMS, thiết lập Geofencing và cảnh báo dừng đỗ bất thường qua GPS/Telematics; đồng thời kết nối bộ phận Thu mua để lấy nguyên liệu bao bì chiều về (Backhaul) từ các nhà cung cấp cùng cung đường. (R) Sau 2 tháng, tỷ lệ giao đúng giờ đạt 98.6%, giảm 22% quãng đường chạy rỗng và tiết kiệm 14% chi phí dầu Diesel/tháng.'
      },
      {
        question_id: 'tms_case_01',
        domain: 'TMS',
        level: 'Junior',
        type: 'case_study',
        time_limit_sec: 180,
        title: 'Ghép tuyến nội đô tránh giờ cấm tải & Tính chi phí điều xe tối ưu',
        question_text: 'Lúc 05:30 sáng tại Kho Tổng Bình Tân, bạn cần xếp xe giao 3 đơn hàng trong bảng số liệu bên phải. TP.HCM cấm xe tải trên 2.5 tấn vào nội đô từ 06:00 – 09:00 sáng. Hãy dùng máy tính kiểm tra tải trọng/thể tích và đề xuất phương án điều xe có tổng chi phí thấp nhất mà không bị phạt trễ giờ!',
        question_text_en: 'At 05:30 AM at Binh Tan Hub, you must dispatch 3 orders shown in the right-hand table. HCMC bans trucks >2.5T from inner-city districts between 06:00 and 09:00 AM. Calculate weight/volume utilization and propose the lowest-cost dispatch plan with zero late penalties!',
        case_study_board: {
          context: 'Ca điều phối 05:30 sáng | Kho Bình Tân -> TP.HCM | Cấm tải > 2.5T nội đô (Q1, Q3): 06:00 - 09:00',
          unit_hint: 'Gợi ý: Kiểm tra tổng kg & CBM của ORD-101 + ORD-102 so với sức chứa xe 1.9T',
          table_headers: ['Mã Đơn / Xe', 'Tuyến / Loại phương tiện', 'Khối lượng', 'Thể tích', 'Yêu cầu / Giới hạn giờ', 'Chi phí / Mức phạt'],
          table_rows: [
            ['ORD-101', 'Giao Quận 1 (Siêu thị A)', '1,150 kg', '6.2 CBM', 'Giao trước 08:00 (Nội đô)', 'Phạt trễ: 2,000,000đ'],
            ['ORD-102', 'Giao Quận 3 (Chuỗi F&B B)', '950 kg', '5.4 CBM', 'Giao trước 08:30 (Nội đô)', 'Phạt trễ: 1,500,000đ'],
            ['ORD-103', 'Giao TP. Thủ Đức (Đại lý C)', '2,600 kg', '12.0 CBM', 'Giao trước 11:30 (Ngoài vành đai)', 'Phạt trễ: 1,000,000đ'],
            ['XE-1.9T (x2 xe)', 'Tải nhẹ chạy nội đô 24/7', 'Max 1,900 kg', 'Max 10.0 CBM', 'Được vào Q1, Q3 giờ cao điểm', '1,100,000đ / chuyến'],
            ['XE-5.0T (x1 xe)', 'Tải trung (Bị cấm nội đô)', 'Max 5,000 kg', 'Max 24.0 CBM', 'Cấm vào Q1, Q3 từ 06:00 - 09:00', '1,850,000đ / chuyến']
          ],
          notes: [
            'Hiện kho có sẵn 02 chiếc XE-1.9T và 01 chiếc XE-5.0T đang chờ tại Dock.',
            'Khách hàng ORD-102 cho phép tách làm 2 đợt giao (Split Delivery) miễn đủ hàng trước 08:30 sáng.'
          ]
        },
        expected_keywords: ['Giờ cấm tải', 'Load Factor / Fill Rate', 'Time Window', 'Split Delivery / Điều 2 xe 1.9T', 'Route Optimization', 'Chi phí vận chuyển'],
        keyword_hints_vi: [
          'Cộng thử ORD-101 + ORD-102: 1,150 + 950 = 2,100 kg (> 1,900 kg) và 6.2 + 5.4 = 11.6 CBM (> 10 CBM) -> Quá tải nếu nhét 1 xe 1.9T!',
          'XE-5.0T không thể vào Q1, Q3 lúc 06:00-09:00 nhưng giao tốt ORD-103 đi Thủ Đức ngoài vành đai (hoặc xuất phát sau 09:00 kịp trước 11:30)',
          'So sánh tổng cước 2 xe 1.9T + 1 xe 5.0T (4,050,000đ) vs phương án 1 xe 1.9T quay vòng / tách lô nếu kịp giờ'
        ],
        ai_followup_rule: 'Nếu sinh viên gom cả ORD-101 và ORD-102 vào chung 1 chuyến XE-1.9T mà quên cộng tải trọng (2,100 kg > 1,900 kg), hãy hỏi xoáy ngay về lỗi quá tải đăng kiểm.',
        followup_probe_vi: 'Khoan đã! Nếu bạn xếp cả ORD-101 (1,150 kg; 6.2 CBM) và ORD-102 (950 kg; 5.4 CBM) lên cùng 1 chiếc XE-1.9T thì tổng là 2,100 kg và 11.6 CBM — vượt trần tải trọng 1,900 kg và 10 CBM rồi! Bạn xử lý bài toán quá tải này và tính tổng chi phí điều xe ra sao?',
        followup_probe_en: 'Hold on! Combining ORD-101 (1,150 kg; 6.2 CBM) and ORD-102 (950 kg; 5.4 CBM) onto one 1.9T truck totals 2,100 kg and 11.6 CBM—exceeding its 1,900 kg and 10 CBM capacity! How do you resolve this overload and what is the exact total dispatch cost?',
        ideal_answer: 'Bước 1 (Phân tích tải trọng & Giờ cấm tải): Tổng ORD-101 + ORD-102 là 2,100 kg và 11.6 CBM, vượt giới hạn 1 xe 1.9T (1,900 kg / 10 CBM); đồng thời XE-5.0T bị cấm vào Quận 1, Quận 3 khung 06:00–09:00 nên không thể giao 2 đơn sáng sớm này. Bước 2 (Phương án điều phối tối ưu): Điều cả 02 chiếc XE-1.9T xuất phát lúc 05:45 vào nội đô: Xe 1.9T #1 chở ORD-101 (1,150 kg; 6.2 CBM - Fill rate 62% CBM) giao Quận 1 trước 08:00; Xe 1.9T #2 chở ORD-102 (950 kg; 5.4 CBM) giao Quận 3 trước 08:30 (hoặc ghép thêm 650 kg của ORD-103 nếu cùng hướng). Với ORD-103 (2,600 kg; 12 CBM đi Thủ Đức ngoài vành đai cấm tải), điều chiếc XE-5.0T giao thẳng trước 11:30 (Fill rate 52% tải, 50% CBM). Bước 3 (Hiệu quả chi phí): Tổng chi phí = 2 × 1,100,000đ + 1,850,000đ = 4,050,000đ, đảm bảo 100% đúng Time Window, tránh tuyệt đối khoản phạt trễ 4,500,000đ và không vi phạm luật quá tải/cấm tải.'
      },
      {
        question_id: 'tms_q03',
        domain: 'TMS',
        level: 'Senior',
        type: 'kpi_optimization',
        time_limit_sec: 150,
        title: 'Thiết lập bộ KPI đánh giá Nhà xe phụ (Sub-contractors 3PL)',
        question_text: 'Khi công ty thuê ngoài 5 nhà xe phụ (Sub-contractors) chạy mùa cao điểm Tết, bạn sẽ theo dõi những chỉ số KPI nào hàng tuần để thưởng/phạt công bằng và kiểm soát chất lượng giao nhận?',
        question_text_en: 'When outsourcing to 5 sub-carrier fleets during Lunar New Year peak season, which weekly KPIs would you track to enforce SLAs and fair incentives/penalties?',
        expected_keywords: ['OTIF (On-Time In-Full)', 'POD Return Lead-time', 'Cargo Damage Rate', 'Truck Acceptance / No-show Rate', 'Cost per Ton-Km'],
        keyword_hints_vi: [
          'OTIF (Giao đúng giờ & đủ số lượng)',
          'Tỷ lệ điều xe thành công / không bỏ chuyến (Truck No-show Rate)',
          'Thời gian hoàn trả chứng từ gốc POD (Proof of Delivery) để đối soát công nợ'
        ],
        followup_probe_vi: 'Nếu một nhà xe có giá cước rẻ hơn 8% nhưng tỷ lệ trả biên bản POD chậm tới 15 ngày làm treo công nợ khách hàng, bạn đặt điều khoản chế tài trong hợp đồng thế nào?',
        followup_probe_en: 'If a sub-carrier offers 8% cheaper rates but delays returning signed PODs by 15 days—blocking customer billing—what contract SLA clause would you enforce?',
        ideal_answer: '(S) Vào cao điểm Tết, sản lượng tăng gấp đôi khiến đội xe nhà chỉ đáp ứng 55%, phải thuê thêm 5 nhà xe 3PL. (T) Cần bộ Scorecard minh bạch để đảm bảo chất lượng đồng nhất. (A) Tôi áp dụng 4 KPI cốt lõi trên TMS: 1) OTIF >= 97%; 2) Truck No-show Rate <= 2% sau khi đã nhận lệnh điều xe; 3) Tỷ lệ hư hỏng/thất thoát hàng < 0.1%; 4) Hạn nộp bản chụp e-POD trên App tài xế trong 2 giờ và POD giấy trong 5 ngày làm việc (gắn liền điều kiện thanh toán cước). (R) Phân bổ lại sản lượng cho Top 2 nhà xe đạt điểm A, giúp OTIF mùa Tết giữ vững 97.4% và rút ngắn vòng quay đối soát công nợ từ 18 ngày xuống 6 ngày.'
      }
    ]
  },

  // ============================================================================
  // 2. KHO BÃI & TỒN KHO (WMS)
  // ============================================================================
  {
    id: 'wms',
    code: 'WMS',
    name: 'Kho bãi & Tồn kho (WMS)',
    nameEn: 'Warehouse & Inventory Operations (WMS)',
    shortTitle: 'WMS & Kho bãi',
    lucideIcon: 'warehouse',
    pastelBg: '#ECFDF5',
    pastelBorder: '#A7F3D0',
    accentColor: '#059669',
    badgeText: 'Storage & Accuracy',
    description: 'Quản trị nhập xuất lưu kho trên WMS, kiểm kê Cycle Count, nguyên tắc FIFO/FEFO, quy hoạch Slotting ABC và xử lý lệch tồn.',
    casePreviewLabel: 'Bảng lệch tồn kho lạnh 5% & hàng cận date 5 ngày',
    questions: [
      {
        question_id: 'wms_q01',
        domain: 'WMS',
        level: 'Intern/Fresher',
        type: 'warmup_star',
        time_limit_sec: 120,
        title: 'Quy hoạch vị trí kệ ABC Slotting & Tối ưu quãng đường lấy hàng',
        question_text: 'Trong kho phân phối có 3,000 mã SKU nhưng nhân viên lấy hàng (Picker) thường xuyên phàn nàn phải đi bộ quá xa dẫn đến trễ giờ xuất xe. Bạn sẽ ứng dụng phân tích ABC và Slotting trên WMS như thế nào để cải thiện năng suất?',
        question_text_en: 'In a distribution center with 3,000 SKUs, pickers complain about excessive walking distances causing outbound delays. How would you apply ABC classification and WMS Slotting to boost picking productivity?',
        expected_keywords: ['ABC Analysis', 'Slotting', 'Fast-moving', 'Golden Zone', 'Batch / Wave Picking'],
        keyword_hints_vi: [
          'Phân nhóm A (20% SKU chiếm 80% tần suất xuất) đặt gần khu Staging/Outbound và ở tầng kệ ngang tầm tay (Golden Zone)',
          'Kết hợp gom đơn Batch Picking / Wave Picking trên súng quét PDA để giảm số lượt đi lại'
        ],
        followup_probe_vi: 'Khi cơ cấu hàng bán chạy thay đổi đột ngột theo mùa (ví dụ mùa Trung Thu hoặc Tết), bao lâu bạn chạy lại Re-slotting một lần để không làm xáo trộn vận hành kho?',
        followup_probe_en: 'When fast-moving SKUs shift seasonally, how frequently do you execute Re-slotting without disrupting daily warehouse operations?',
        ideal_answer: '(S) Tại kho FMCG rộng 8,000m2 với 3,000 SKU, hàng mới về thường được Put-away vào bất kỳ ô trống nào khiến Picker mất trung bình 4.5 phút/dòng đơn. (T) Mục tiêu tăng năng suất lấy hàng thêm 30% trước mùa cao điểm. (A) Tôi trích xuất lịch sử xuất kho 90 ngày từ WMS để phân loại ABC theo tần suất Pick (Pick Frequency), quy hoạch lại nhóm A (Fast-moving) ra dãy kệ đầu gần cửa Dock xuất và đặt ở tầng thấp Golden Zone; đồng thời chuyển từ Single Picking sang Batch Picking theo tuyến chữ S trên PDA. (R) Quãng đường di chuyển của Picker giảm 38%, năng suất tăng từ 42 dòng/giờ lên 61 dòng/giờ và 100% chuyến xe xuất bến đúng Cut-off time.'
      },
      {
        question_id: 'wms_case_01',
        domain: 'WMS',
        level: 'Junior',
        type: 'case_study',
        time_limit_sec: 180,
        title: 'Xử lý lệch tồn kho 5% & Hàng cận date tại Kho Lạnh Thủ Đức',
        question_text: 'Trong đợt kiểm kê định kỳ sáng nay tại Kho Lạnh thực phẩm, bạn phát hiện bảng số liệu bên phải có sự chênh lệch lớn ở 2 mã SKU chủ lực. Hãy tính giá trị chênh lệch, đánh giá rủi ro đơn hàng sáng mai và nêu từng bước xử lý trong 24 giờ tới!',
        question_text_en: 'During this morning’s cycle count at Thu Duc Cold Storage, you found major variances in two core SKUs shown in the right-hand table. Calculate the financial variance, evaluate tomorrow morning’s order risk, and outline your 24-hour action plan!',
        case_study_board: {
          context: 'Ngày kiểm kê: 26/11/2026 | Kho Lạnh Thủ Đức (2°C - 4°C) | Ngưỡng sai lệch cho phép: ±0.2%',
          unit_hint: 'Dùng Máy tính mini nhân số lượng lệch với đơn giá vốn & kiểm tra điều kiện HSD 7 ngày của Siêu thị X',
          table_headers: ['Mã SKU', 'Tên hàng', 'Tồn WMS', 'Tồn thực tế', 'Chênh lệch', 'Hạn sử dụng (HSD)', 'Giá vốn đơn vị'],
          table_rows: [
            ['MILK-01', 'Sữa tươi thanh trùng 1L', '2,000 thùng', '1,900 thùng', '-100 thùng (-5.0%)', '01/12/2026 (Còn 5 ngày)', '320,000đ / thùng'],
            ['BEEF-05', 'Thịt bò Úc đông mát', '500 kg', '515 kg', '+15 kg (+3.0%)', '15/12/2026 (Còn 19 ngày)', '450,000đ / kg']
          ],
          notes: [
            'Đơn hàng gấp Siêu thị X yêu cầu giao 800 thùng MILK-01 vào 06:00 sáng mai (Hợp đồng bắt buộc HSD còn tối thiểu >= 7 ngày).',
            'Ca đêm hôm qua có 02 nhân viên thời vụ mới nhận việc tham gia soạn hàng xuất kho.'
          ]
        },
        expected_keywords: ['FEFO', 'Quarantine', 'Audit Trail', 'Cycle Count', 'Root Cause Analysis', 'Inventory Adjustment'],
        keyword_hints_vi: [
          'Giá trị lệch MILK-01: -100 × 320,000 = -32,000,000đ; BEEF-05: +15 × 450,000 = +6,750,000đ',
          'Cảnh báo đỏ: Lô MILK-01 chỉ còn 5 ngày HSD (< 7 ngày yêu cầu của Siêu thị X) -> Phải khóa mã chuyển sang khu Quarantine để tránh xuất nhầm bị trả hàng!',
          'Truy vết Audit Trail ca đêm có 2 nhân viên thời vụ mới & đếm chéo lại vị trí kệ lân cận (Cycle Count)'
        ],
        ai_followup_rule: 'Nếu ứng viên chỉ nói chung chung về việc kiểm tra lại kho mà quên nhắc đến đơn hàng siêu thị X sáng mai (yêu cầu HSD tối thiểu 7 ngày trong khi hàng chỉ còn 5 ngày), hãy hỏi xoáy ngay.',
        followup_probe_vi: 'Với đơn hàng 800 thùng giao Siêu thị X vào 6h sáng mai, hàng MILK-01 hiện tại chỉ còn 5 ngày HSD trong khi siêu thị yêu cầu tối thiểu 7 ngày — bạn xử lý đơn gấp này thế nào để không bị phạt hợp đồng?',
        followup_probe_en: 'Regarding the urgent 800-carton order for Supermarket X at 6:00 AM tomorrow, current MILK-01 stock only has 5 days of shelf-life left while they require at least 7 days. How do you handle this order?',
        ideal_answer: 'Bước 1 (Khoanh vùng rủi ro ngay lập tức): Lô MILK-01 đang lệch âm -100 thùng (tương đương -32,000,000đ giá vốn, độ chính xác chỉ đạt 95%) và chỉ còn 5 ngày HSD — vi phạm điều khoản HSD >= 7 ngày của Siêu thị X. Tôi lập tức khóa lô này trên WMS, chuyển sang trạng thái cách ly (Quarantine) để chặn xuất nhầm lúc 6h sáng mai; đồng thời báo khẩn Sales/Supply Planning điều chuyển lô date mới từ kho nhà máy sang giao cho Siêu thị X, còn 1,900 thùng cận date (trị giá 608 triệu đồng) đề xuất đẩy bán khuyến mãi kênh HORECA/tiêu thụ nhanh theo nguyên tắc FEFO. Bước 2 (Điều tra nguyên nhân gốc rễ - Root Cause Analysis): Tổ chức Cycle Count đếm chéo lại các Bin kế cận, trích xuất lịch sử giao dịch (Audit Trail) và camera ca đêm của 2 nhân viên thời vụ xem có xuất nhầm không quét PDA hoặc cân sai mã BEEF-05 (+15 kg, +6.75 triệu đồng) hay không. Bước 3: Lập biên bản giải trình đối soát chứng từ nhập xuất và trình Giám đốc kho phê duyệt bút toán điều chỉnh tồn kho (Inventory Adjustment) trên WMS trong vòng 24 giờ.'
      },
      {
        question_id: 'wms_q03',
        domain: 'WMS',
        level: 'Senior',
        type: 'kpi_optimization',
        time_limit_sec: 150,
        title: 'Thiết lập quy trình kiểm soát Độ chính xác tồn kho (IRA >= 99.8%)',
        question_text: 'Thay vì đóng cửa kho 3 ngày cuối năm để kiểm kê toàn bộ (Wall-to-Wall Physical Inventory), bạn thiết kế chương trình Cycle Count hàng ngày như thế nào để duy trì độ chính xác tồn kho (IRA) đạt từ 99.8% trở lên?',
        question_text_en: 'Instead of shutting down the warehouse for 3 days for year-end physical inventory, how would you design a daily Cycle Counting program to sustain Inventory Record Accuracy (IRA) >= 99.8%?',
        expected_keywords: ['Cycle Count', 'IRA (Inventory Record Accuracy)', 'Blind Count', 'ABC Frequency', 'PDA Barcode Scanning'],
        keyword_hints_vi: [
          'Đếm mù (Blind Count — nhân viên đếm trên PDA không thấy trước con số tồn hệ thống)',
          'Tần suất theo ABC: Nhóm A đếm hàng tuần/tháng, Nhóm B hàng quý, Nhóm C 6 tháng/lần'
        ],
        followup_probe_vi: 'Vì sao khi giao phiếu Cycle Count cho nhân viên kho bạn bắt buộc phải ẩn số tồn hệ thống (Blind Count)?',
        followup_probe_en: 'Why must system stock quantities be hidden from counters (Blind Count) during Cycle Count execution?',
        ideal_answer: '(S) Đóng kho kiểm kê cuối năm làm gián đoạn đơn hàng 72 giờ và tốn chi phí tăng ca lớn. (T) Thiết lập cơ chế kiểm kê cuốn chiếu hàng ngày đạt IRA >= 99.8%. (A) Tôi cấu hình module Cycle Count tự động trên WMS vào đầu ca sáng (khi ít biến động giao dịch) theo tần suất ABC: SKU nhóm A giá trị cao đếm 1 lần/2 tuần, nhóm B 1 lần/tháng, nhóm C 1 lần/quý; áp dụng cơ chế Blind Count trên súng PDA (ẩn số tồn hệ thống để chống tâm lý nhìn số điền bừa). Nếu phát hiện lệch vượt ngưỡng dung sai, hệ thống tự động sinh phiếu Recount cho Giám sát đếm lại độc lập và truy vết Audit Trail trong ngày. (R) Duy trì IRA ổn định ở mức 99.88% suốt 4 quý và được Kiểm toán chấp thuận bỏ đợt đóng kho cuối năm.'
      }
    ]
  },

  // ============================================================================
  // 3. GIAO HÀNG CHẶNG CUỐI (LAST-MILE)
  // ============================================================================
  {
    id: 'last_mile',
    code: 'LAST_MILE',
    name: 'Giao hàng chặng cuối (Last-mile)',
    nameEn: 'Last-mile Delivery & Hub Operations',
    shortTitle: 'Last-mile Delivery',
    lucideIcon: 'bike',
    pastelBg: '#FFFBEB',
    pastelBorder: '#FDE68A',
    accentColor: '#D97706',
    badgeText: 'E-Com & Hub Ops',
    description: 'Vận hành bưu cục giao nhận chặng cuối, tối ưu Cost per Drop, nâng tỷ lệ giao thành công lần đầu (FADR) và đối soát tiền thu hộ COD.',
    casePreviewLabel: 'Bảng tính Cost per Drop & xử lý tỷ lệ hoàn NDR 24%',
    questions: [
      {
        question_id: 'lm_q01',
        domain: 'LAST_MILE',
        level: 'Intern/Fresher',
        type: 'warmup_star',
        time_limit_sec: 120,
        title: 'Kiểm soát rủi ro tiền thu hộ (COD) & Chốt ca bưu tá cuối ngày',
        question_text: 'Tại bưu cục giao hàng TMĐT với 40 shipper, mỗi ngày thu hộ hàng trăm triệu đồng tiền mặt COD. Là Điều phối trưởng bưu cục, bạn kiểm soát quy trình nộp tiền COD và hàng hoàn cuối ngày như thế nào để tránh thất thoát hoặc shipper chiếm dụng vốn?',
        question_text_en: 'At an E-commerce delivery hub with 40 riders collecting hundreds of millions VND in cash COD daily, how do you control cash reconciliation and return parcels at shift-end to prevent cash leakage?',
        expected_keywords: ['COD Reconciliation', 'Hạn mức tín dụng ví Shipper', 'QR / Cashless COD', 'Quét nhập kho hoàn (Return Scan)', 'Đối soát cuối ca (Shift Cut-off)'],
        keyword_hints_vi: [
          'Khóa hạn mức tiền mặt giữ trên tay Shipper (ví dụ chạm trần 5 triệu đồng trên App phải nộp/chuyển khoản ngay mới mở khóa nhận đơn mới)',
          'Khuyến khích quét VietQR động cho từng mã vận đơn để tiền chảy thẳng về tài khoản công ty'
        ],
        followup_probe_vi: 'Nếu một shipper báo khách đã nhận hàng nhưng hệ thống chưa ghi nhận tiền COD và shipper xin khất sang ngày mai mới nộp, bạn xử lý ra sao?',
        followup_probe_en: 'If a rider marks a parcel delivered without remitting COD cash and asks to delay payment until tomorrow, how do you enforce hub rules?',
        ideal_answer: '(S) Bưu cục xử lý 3,500 đơn/ngày với 65% đơn COD tiền mặt, tiềm ẩn rủi ro lệch quỹ cuối ca. (T) Đảm bảo 100% đối soát khớp tiền và hàng hoàn trong ngày (Zero Cash Discrepancy). (A) Tôi áp dụng 3 chốt chặn: 1) Đặt hạn mức COD tối đa 5,000,000đ trên App Shipper — vượt ngưỡng phải chuyển khoản nộp quỹ tự động mới được nhận bao hàng tiếp; 2) Triển khai mã VietQR định danh gắn theo từng mã vận đơn AWB giúp giảm tỷ lệ thu tiền mặt xuống còn 28%; 3) Cuối ca bắt buộc quét Return Scan từng kiện giao thất bại khớp với trạng thái NDR trên hệ thống trước khi ký chốt ca. (R) Duy trì 100% kỳ đối soát không lệch tiền trong 6 tháng liên tiếp và rút ngắn thời gian chốt ca tối từ 60 phút xuống 20 phút.'
      },
      {
        question_id: 'lm_case_01',
        domain: 'LAST_MILE',
        level: 'Junior',
        type: 'case_study',
        time_limit_sec: 180,
        title: 'Tính Cost per Drop & Cắt giảm tỷ lệ giao thất bại (NDR) dịp Mega Sale 11/11',
        question_text: 'Báo cáo cuối ngày 11/11 tại Bưu cục Quận 7 (bảng bên phải) cho thấy chi phí trên mỗi đơn giao thành công (Cost per Successful Drop) đang đội lên cao. Định mức mục tiêu của công ty là Cost per Drop <= 11,500đ/đơn và tỷ lệ giao thành công lần đầu (FADR) >= 92%. Hãy dùng máy tính tính chính xác Cost per Drop của từng tuyến và đề xuất giải pháp khắc phục cho Tuyến B & Tuyến C!',
        question_text_en: 'End-of-day 11/11 metrics at District 7 Hub (right-hand table) show rising delivery costs. Company targets are Cost per Successful Drop <= 11,500 VND and First Attempt Delivery Rate (FADR) >= 92%. Calculate the exact Cost per Drop per route and propose targeted fixes for Route B and Route C!',
        case_study_board: {
          context: 'Bưu cục Quận 7 (Hub Q7-LM) | Báo cáo vận hành 11/11 | Mục tiêu: Cost/Drop <= 11,500đ & FADR >= 92%',
          unit_hint: 'Công thức: Cost per Successful Drop = Tổng chi phí tuyến ÷ Số đơn giao thành công',
          table_headers: ['Tuyến Giao Hàng', 'Tổng đơn phân tuyến', 'Giao thành công', 'Hoàn / Giao lại (NDR)', 'Tổng chi phí tuyến', 'Nguyên nhân NDR chính'],
          table_rows: [
            ['Tuyến A (Chung cư)', '160 đơn', '148 đơn', '12 đơn (7.5%)', '1,628,000đ', 'Khách bận giờ hành chính'],
            ['Tuyến B (Tòa nhà Văn phòng)', '150 đơn', '114 đơn', '36 đơn (24.0%)', '1,710,000đ', 'Shipper đến sau 18:00 văn phòng đóng cửa'],
            ['Tuyến C (Nhà phố Hẻm sâu)', '120 đơn', '96 đơn', '24 đơn (20.0%)', '1,536,000đ', 'Đơn COD > 2 triệu khách không nghe máy / từ chối']
          ],
          notes: [
            'Mỗi đơn NDR phải giao lại vào ngày hôm sau làm tốn gấp đôi công sức phân loại và quãng đường di chuyển.',
            'Hàng từ Kho trung tâm đổ về Bưu cục Quận 7 thành 2 sóng (Wave 1 lúc 06:30 sáng và Wave 2 lúc 13:30 chiều).'
          ]
        },
        expected_keywords: ['Cost per Drop', 'FADR (First Attempt Delivery Rate)', 'NDR (Non-Delivery Report)', 'Dynamic Routing / Đảo thứ tự giao', 'COD Pre-confirmation', 'Smart Locker / Lễ tân'],
        keyword_hints_vi: [
          'Tính bằng Máy tính mini: Tuyến A = 1,628,000 ÷ 148 = 11,000đ (Đạt); Tuyến B = 1,710,000 ÷ 114 = 15,000đ (Vượt trần!); Tuyến C = 1,536,000 ÷ 96 = 16,000đ (Cao nhất!)',
          'Tổng FADR toàn bưu cục = (148 + 114 + 96) ÷ 430 = 358 ÷ 430 = 83.26% (Thấp hơn chuẩn 92%)',
          'Giải pháp Tuyến B: Ưu tiên chia chọn Wave sớm & đảo lộ trình giao tòa nhà văn phòng trước 16:30; Tuyến C: Xác nhận tự động Zalo/Callbot trước khi xuất bưu cục với đơn COD giá trị cao'
        ],
        ai_followup_rule: 'Nếu sinh viên chưa nêu con số tính toán cụ thể (11,000đ; 15,000đ; 16,000đ hoặc FADR 83.26%), hãy yêu cầu tính rõ số liệu để chứng minh lập luận.',
        followup_probe_vi: 'Bạn hãy dùng máy tính chốt con số cụ thể giúp tôi nhé: Cost per Successful Drop của Tuyến B và Tuyến C đang là bao nhiêu đồng/đơn, vượt định mức 11,500đ bao nhiêu %, và nếu ngày mai hàng Wave 2 về trễ lúc 14:30 thì bạn ưu tiên chia hàng cho Tuyến B thế nào?',
        followup_probe_en: 'Let’s quantify it precisely: what is the exact Cost per Successful Drop for Route B and Route C compared to the 11,500 VND target, and how will you prioritize sorting Wave 2 at 14:30 tomorrow for Route B?',
        ideal_answer: 'Bước 1 (Phân tích số liệu định lượng): Tổng FADR toàn bưu cục chỉ đạt 358/430 = 83.26% (thấp hơn mục tiêu 92% tới 8.74 điểm %). Xét Cost per Successful Drop: Tuyến A đạt 1,628,000 ÷ 148 = 11,000đ/đơn (Đạt chuẩn); nhưng Tuyến B vọt lên 1,710,000 ÷ 114 = 15,000đ/đơn (+30.4% so với định mức) và Tuyến C cao nhất ở mức 1,536,000 ÷ 96 = 16,000đ/đơn (+39.1%). Bước 2 (Xử lý dứt điểm Tuyến B - Khu Văn phòng): Tái cấu trúc thứ tự chia chọn ở cả Wave 1 và Wave 2 — gắn thẻ ưu tiên mã B2B/Office để băng chuyền đẩy ra đầu tiên, bắt buộc Shipper đảo lộ trình giao dứt điểm khối tòa nhà văn phòng trước 17:00 chiều rồi mới quay sang giao khu dân cư buổi tối. Bước 3 (Xử lý Tuyến C & Tuyến A): Kích hoạt tin nhắn Zalo ZNS/Callbot xác nhận khung giờ nhận hàng trước khi phát đơn COD > 2 triệu ở Tuyến C (chỉ mang đi giao khi khách xác nhận có mặt để chống đơn ảo/bom hàng), đồng thời đăng ký tủ Smart Locker hoặc điểm gửi lễ tân cho khu chung cư Tuyến A. Kết quả dự kiến kéo FADR lên trên 93% và đưa Cost per Drop trung bình toàn Hub về dưới 11,300đ/đơn.'
      },
      {
        question_id: 'lm_q03',
        domain: 'LAST_MILE',
        level: 'Senior',
        type: 'kpi_optimization',
        time_limit_sec: 150,
        title: 'Thiết kế mô hình Crowdsourcing / Đội xe linh hoạt giờ cao điểm',
        question_text: 'Sản lượng đơn hàng ngày Sale đôi (11/11, 12/12) cao gấp 3.5 lần ngày thường. Nếu tuyển quá nhiều shipper cố định thì ngày thường dư người, còn tuyển ít thì ngày Sale vỡ trận tồn đọng bưu cục. Bạn giải bài toán cân bằng công suất (Capacity Planning) này như thế nào?',
        question_text_en: 'Double-day sale parcel volume spikes 3.5x above normal days. Hiring full-time riders creates idle cost on normal days, while understaffing causes hub backlog during sales. How do you design Capacity Planning for Last-mile?',
        expected_keywords: ['Capacity Planning', 'Part-time / Crowdsourced Riders', '3PL Overflow Partner', 'PUDO / Drop-off Points', 'Piece-rate Incentive'],
        keyword_hints_vi: [
          'Cấu trúc nhân sự 3 tầng: Core Full-time (đáp ứng nền 100-120%) + Cộng tác viên Part-time theo ca + Đối tác 3PL xả tràn (Overflow)',
          'Cơ chế thưởng lũy tiến theo mốc sản lượng (Tiered Piece-rate Bonus) trong 48h cao điểm'
        ],
        followup_probe_vi: 'Khi dùng tài xế thời vụ / công nghệ bên ngoài vào ngày Sale, rủi ro lớn nhất là thái độ phục vụ và thất lạc hàng — bạn kiểm soát rủi ro này thế nào?',
        followup_probe_en: 'When onboarding temporary/crowdsourced riders on peak days, how do you mitigate service quality drops and parcel loss risks?',
        ideal_answer: '(S) Chênh lệch đỉnh – đáy sản lượng Last-mile lên tới 3.5 lần trong các chiến dịch Mega Sale. (T) Đảm bảo SLA giao hàng đúng hạn >= 95% mà không làm phình chi phí định phí ngày thường. (A) Tôi xây dựng mô hình công suất 3 lớp: Lớp 1 (Core Riders biên chế) gánh 110% sản lượng ngày thường và chuyên phụ trách đơn COD giá trị cao; Lớp 2 (Flex Part-time & Sinh viên khu vực) nhận các đơn trả trước (Prepaid/Non-COD) ở chung cư mật độ cao nơi 1 điểm dừng giao được 20–30 gói; Lớp 3 ký sẵn hợp đồng xả tràn tự động với đối tác giao tức thời khi tồn bưu cục vượt ngưỡng 130%. (R) Xử lý trơn tru đỉnh 350% sản lượng trong 48 giờ, không phát sinh tồn đọng qua ngày và tiết kiệm 19% tổng chi phí nhân sự cả quý.'
      }
    ]
  },

  // ============================================================================
  // 4. XUẤT NHẬP KHẨU & HẢI QUAN (CUSTOMS)
  // ============================================================================
  {
    id: 'customs',
    code: 'CUSTOMS',
    name: 'Xuất nhập khẩu & Hải quan (Customs)',
    nameEn: 'Import-Export & Customs Clearance',
    shortTitle: 'XNK & Hải quan',
    lucideIcon: 'ship',
    pastelBg: '#F0F9FF',
    pastelBorder: '#BAE6FD',
    accentColor: '#0284C7',
    badgeText: 'Incoterms & VNACCS',
    description: 'Kiểm tra bộ chứng từ xuất nhập khẩu (Invoice, P/L, B/L, C/O), áp mã HS Code, truyền tờ khai VNACCS/VCIS và tối ưu phí DEM/DET tại cảng.',
    casePreviewLabel: 'Bảng soi lệch C/O Form E Cát Lái & tính phí DEM/Thuế',
    questions: [
      {
        question_id: 'cus_q01',
        domain: 'CUSTOMS',
        level: 'Intern/Fresher',
        type: 'warmup_star',
        time_limit_sec: 120,
        title: 'Phân biệt rủi ro Incoterms 2020 (FOB vs CIF / FCA) khi nhập khẩu FCL',
        question_text: 'Nhiều doanh nghiệp Việt Nam có thói quen mua hàng nhập khẩu theo điều kiện CIF thay vì FOB, sau đó bị đại lý tàu thu phí Local Charges rất cao tại cảng đích (như CIC, THC, vệ sinh cont). Dưới góc độ chuyên viên XNK, bạn phân tích điểm chuyển giao rủi ro và tư vấn lại điều khoản mua hàng như thế nào?',
        question_text_en: 'Many importers buy on CIF terms instead of FOB and end up paying inflated destination Local Charges. As an Import-Export specialist, how would you explain risk transfer and advise renegotiating Incoterms 2020?',
        expected_keywords: ['Incoterms 2020', 'FOB / FCA', 'CIF', 'Local Charges (THC, CIC, D/O)', 'Quyền chỉ định hãng tàu (Nomination)'],
        keyword_hints_vi: [
          'Cả FOB và CIF đều chuyển giao rủi ro hàng hóa ngay khi hàng xếp lên boong tàu tại cảng đi (Port of Loading), không phải cảng đích!',
          'Mua FOB/FCA giúp người nhập khẩu chủ động đàm phán cước biển + khóa trần Local Charges đầu Việt Nam và kiểm soát lịch tàu'
        ],
        followup_probe_vi: 'Với hàng đóng container giao tại bãi CY trước khi tàu cập, vì sao ICC khuyến nghị dùng FCA thay cho FOB trong Incoterms 2020?',
        followup_probe_en: 'For containerized cargo handed over at the Container Yard (CY) prior to vessel loading, why does ICC recommend FCA over FOB in Incoterms 2020?',
        ideal_answer: '(S) Doanh nghiệp nhập khẩu 15 cont nguyên liệu/tháng từ Trung Quốc theo giá CIF Cát Lái tưởng rẻ, nhưng khi lấy D/O bị Forwarder chỉ định của người bán thu phí CIC, ইমbalance và chứng từ cao gấp 3 lần thị trường. (T) Tối ưu tổng chi phí Landed Cost và giành quyền chủ động lịch tàu. (A) Tôi lập bảng so sánh TCO chứng minh: dù mua CIF người bán trả cước biển, nhưng rủi ro hàng hóa vẫn chuyển giao cho người mua ngay tại lan can/boong tàu cảng xếp giống hệt FOB (và với hàng cont hạ bãi CY nên ưu tiên FCA). Tôi đàm phán chuyển hợp đồng sang FOB/FCA, đồng thời đấu thầu cước với 3 Forwarder uy tín trong nước trọn gói Ocean Freight + Local Charges đầu nhận. (R) Giảm ngay $280/cont tổng chi phí nhập khẩu (tiết kiệm hơn $4,200/tháng) và chủ động xin được 14 ngày Free time DEM/DET.'
      },
      {
        question_id: 'cus_case_01',
        domain: 'CUSTOMS',
        level: 'Junior',
        type: 'case_study',
        time_limit_sec: 180,
        title: 'Xử lý sai lệch C/O Form E tại Cảng Cát Lái & Bài toán Đánh đổi Thuế vs Phí lưu bãi DEM',
        question_text: 'Lô hàng 02x40\'HC linh kiện van công nghiệp trị giá $85,000 từ Thượng Hải đã nằm tại Cảng Cát Lái sang ngày thứ 7 (Free time chỉ có 5 ngày). Khi đối chiếu bộ chứng từ ở bảng bên phải trước khi truyền tờ khai VNACCS, bạn phát hiện sai lệch nghiêm trọng. Hãy tính số tiền thuế ưu đãi và phí DEM phát sinh, từ đó đề xuất phương án thông quan tối ưu nhất!',
        question_text_en: 'A 02x40\'HC shipment worth $85,000 from Shanghai is on Day 7 at Cat Lai Port (only 5 days Free DEM). Reviewing the documents in the right-hand table before VNACCS filing reveals critical discrepancies. Calculate the duty impact vs. DEM charges and recommend the optimal clearance strategy!',
        case_study_board: {
          context: 'Lô hàng 02x40\'HC cập Cảng Cát Lái | Trị giá CIF: $85,000 | Đang lưu bãi ngày thứ 7 (Free time: 5 ngày)',
          unit_hint: 'So sánh tiền thuế ưu đãi 10% ($8,500) với phí DEM nếu nằm chờ tại cảng vs phương án Nợ C/O 30 ngày',
          table_headers: ['Tiêu chí Đối chiếu', 'Invoice & Packing List', 'Bill of Lading (B/L)', 'C/O Form E (Bản gốc)', 'Biểu phí / Hệ quả Hải quan'],
          table_rows: [
            ['Mã HS Code', '8481.80.99', '8481.80 (Ghi 6 số)', '8481.90.00 (Lệch phân nhóm!)', 'Thuế MFN: 10% | Thuế có Form E hợp lệ: 0%'],
            ['Gross Weight', '36,400 KGS', '38,200 KGS (Lệch +1,800 kg)', '36,400 KGS', 'Nguy cơ phân luồng Đỏ kiểm hóa cân thực tế'],
            ['Phí lưu bãi (DEM)', '02 cont x 40\'HC', 'Đã lố 2 ngày Free time', 'Xin cấp lại C/O mới mất thêm 5 ngày', 'Ngày 6–10: $45/cont/ngày | Từ ngày 11: $75/cont/ngày']
          ],
          notes: [
            'Shipper xác nhận thực tế hàng xuất đúng là 36,400 KGS (nhân viên hãng tàu gõ nhầm Gross Weight trên B/L và Manifest).',
            'Theo Thông tư 33/2023/TT-BTC, doanh nghiệp được phép khai nợ C/O (tạm tính thuế MFN) để giải phóng hàng về kho rồi nộp bổ sung C/O chuẩn trong vòng 30 ngày để hoàn thuế.'
          ]
        },
        expected_keywords: ['C/O Form E', 'HS Code', 'Manifest / Tu chỉnh B/L', 'DEM/DET', 'Khai nợ C/O (Nộp bổ sung 30 ngày)', 'VNACCS/VCIS'],
        keyword_hints_vi: [
          'Tính tiền thuế chênh lệch: $85,000 × 10% = $8,500 (Tương đương ~215 triệu đồng — tuyệt đối không được bỏ quyền lợi C/O!)',
          'Nếu để 2 cont nằm cảng chờ sửa C/O thêm 5 ngày (tổng lưu 12 ngày = 5 ngày free + 5 ngày mức $45 + 2 ngày mức $75): Phí DEM = 2 cont × (5×45 + 2×75) = $750 (chưa kể phí lưu kho cảng Storage!)',
          'Giải pháp tối ưu kép: 1) Yêu cầu hãng tàu/đại lý tu chỉnh Manifest & B/L về đúng 36,400 KGS ngay trong 24h; 2) Truyền tờ khai VNACCS xin NỢ C/O (tạm nộp thuế MFN 10%), kéo hàng về kho ngày thứ 8 (chỉ tốn 3 ngày DEM = 2 × 3 × $45 = $270), đồng thời yêu cầu Shipper cấp lại C/O Form E chuẩn HS 8481.80 để nộp bổ sung hoàn lại $8,500 tiền thuế!'
        ],
        ai_followup_rule: 'Nếu sinh viên chọn để hàng nằm chết tại Cát Lái chờ C/O mới gửi sang mà không tính phí DEM lũy tiến hoặc quên cơ chế khai nợ C/O 30 ngày, hãy hỏi xoáy ngay.',
        followup_probe_vi: 'Nếu bạn để 2 cont 40\'HC nằm chờ tại Cát Lái thêm 5 ngày nữa (tổng thành 12 ngày lưu bãi) để đợi Shipper gửi C/O mới sang thì tổng phí DEM lũy tiến mất bao nhiêu USD? Có cách nào vừa kéo hàng về kho ngay để cắt phí DEM, vừa lấy lại được $8,500 tiền thuế ưu đãi Form E không?',
        followup_probe_en: 'If you leave both 40\'HC containers sitting at Cat Lai for 5 more days (12 days total) waiting for the re-issued C/O, how much progressive DEM will you pay in USD? How can you pull the cargo out immediately to stop DEM while still recovering the $8,500 Form E duty savings?',
        ideal_answer: 'Bước 1 (Định lượng thiệt hại Thuế & Phí lưu bãi DEM): Chênh lệch thuế nhập khẩu giữa MFN (10%) và C/O Form E (0%) là $85,000 × 10% = $8,500. Nếu để 2 cont nằm chờ tại Cát Lái thêm 5 ngày đợi cấp lại C/O (tổng lưu 12 ngày: 5 ngày miễn phí + 5 ngày bậc 1 giá $45 + 2 ngày bậc 2 giá $75), riêng phí DEM hãng tàu đã mất 2 × (225 + 150) = $750 (chưa tính phí lưu bãi cảng Cát Lái và đứt nguyên liệu sản xuất). Bước 2 (Xử lý sai lệch Gross Weight trước khi mở tờ khai): Tuyệt đối chưa truyền tờ khai ngay khi Manifest lệch 1,800 kg; lập tức yêu cầu Shipper & Đại lý hãng tàu gửi điện tu chỉnh B/L và sửa e-Manifest trên Cổng thông tin một cửa quốc gia về đúng 36,400 KGS trong 24 giờ để tránh bị phạt vi phạm hành chính và kiểm hóa cân cont. Bước 3 (Chiến lược Nợ C/O giải phóng hàng sớm): Ngay ngày thứ 8 sau khi khớp Manifest, truyền tờ khai VNACCS theo chế độ đăng ký Nợ C/O Form E (tạm nộp thuế MFN $8,500), kéo 2 cont về kho (chỉ chịu 3 ngày DEM = 2 × 3 × $45 = $270, tiết kiệm ngay $480 phí DEM). Song song đó yêu cầu Shipper xin cấp lại C/O Form E đúng mã HS 8481.80, nộp bổ sung tờ khai AMA trong hạn 30 ngày để hoàn lại đủ 100% số tiền thuế $8,500.'
      },
      {
        question_id: 'cus_q03',
        domain: 'CUSTOMS',
        level: 'Senior',
        type: 'kpi_optimization',
        time_limit_sec: 150,
        title: 'Quản trị rủi ro Kiểm tra sau thông quan (Post-Clearance Audit) & Phân loại HS Code',
        question_text: 'Khi nhập khẩu một mặt hàng máy móc tổ hợp lần đầu tiên về Việt Nam có nhiều cách hiểu mã HS Code khác nhau (mức thuế chênh nhau từ 0% lên 15%), bạn làm gì trước khi hàng về cảng để bảo vệ doanh nghiệp khỏi rủi ro bị truy thu thuế sau thông quan 5 năm?',
        question_text_en: 'When importing a new integrated machinery line for the first time with ambiguous HS Codes (0% vs 15% duty), what proactive steps do you take before shipment arrival to protect the company from 5-year Post-Clearance Audit tax clawbacks?',
        expected_keywords: ['Xác định trước mã số (Advance Ruling)', '6 Quy tắc GRI', 'Catalogue / Bản vẽ kỹ thuật', 'Tổng cục Hải quan', 'Kiểm tra sau thông quan (PCA)'],
        keyword_hints_vi: [
          'Nộp hồ sơ xin Xác định trước mã số (Advance Ruling) lên Tổng cục Hải quan tối thiểu 30–60 ngày trước khi xuất nhập khẩu',
          'Áp dụng 6 quy tắc tổng quát phân loại hàng hóa (GRI 1–6) kèm Catalogue kỹ thuật gốc'
        ],
        followup_probe_vi: 'Văn bản thông báo kết quả Xác định trước mã số của Tổng cục Hải quan có hiệu lực pháp lý tối đa bao lâu?',
        followup_probe_en: 'How long is an official Advance Ruling on HS classification from Vietnam Customs legally valid?',
        ideal_answer: '(S) Dây chuyền thiết bị mới trị giá lớn nếu áp nhầm mã HS 0% thay vì 15% có thể bị ấn định truy thu hàng tỷ đồng cộng tiền chậm nộp 0.03%/ngày khi Kiểm tra sau thông quan (PCA). (T) Đảm bảo tuân thủ pháp luật hải quan 100% và dự toán chuẩn giá vốn. (A) Tối thiểu 60 ngày trước khi mở L/C hoặc xếp hàng, tôi thu thập Catalogue, sơ đồ nguyên lý hoạt động và thành phần cấu tạo từ nhà sản xuất, đối chiếu Chú giải pháp lý Chương/Phân nhóm theo 6 quy tắc GRI, sau đó lập hồ sơ xin "Xác định trước mã số" (Advance Ruling) gửi Cục Thuế XNK – Tổng cục Hải quan. Văn bản trả lời có hiệu lực pháp lý tới 3 năm làm căn cứ thông quan thống nhất tại mọi chi cục cảng và miễn trừ rủi ro phạt truy thu PCA. (R) Giúp 100% lô máy móc dự án thông quan luồng Xanh/Vàng suôn sẻ và giữ an toàn tuyệt đối qua các kỳ kiểm toán hải quan.'
      }
    ]
  },

  // ============================================================================
  // 5. CHUỖI CUNG ỨNG (SUPPLY CHAIN)
  // ============================================================================
  {
    id: 'supply_chain',
    code: 'SUPPLY_CHAIN',
    name: 'Chuỗi cung ứng (Supply Chain)',
    nameEn: 'Supply Chain & Demand/Inventory Planning',
    shortTitle: 'Supply Chain',
    lucideIcon: 'git-fork',
    pastelBg: '#F5F3FF',
    pastelBorder: '#DDD6FE',
    accentColor: '#7C3AED',
    badgeText: 'S&OP & Inventory',
    description: 'Hoạch định nhu cầu S&OP, tính toán Tồn kho an toàn (Safety Stock), Điểm đặt hàng lại (ROP), vòng quay tồn kho ITO và đa dạng hóa nhà cung cấp.',
    casePreviewLabel: 'Bảng tính Safety Stock, ROP & xử lý tắc biên đứt nguyên liệu',
    questions: [
      {
        question_id: 'sc_q01',
        domain: 'SUPPLY_CHAIN',
        level: 'Intern/Fresher',
        type: 'warmup_star',
        time_limit_sec: 120,
        title: 'Hiệu ứng Roi da (Bullwhip Effect) & Phối hợp dự báo S&OP',
        question_text: 'Trong chuỗi cung ứng hàng tiêu dùng nhanh (FMCG), một chương trình khuyến mãi nhỏ của bộ phận Sales ngoài thị trường thường gây biến động phóng đại gấp nhiều lần lên kế hoạch mua nguyên liệu nhà máy. Bạn giải thích hiện tượng này và cách dùng quy trình S&OP để kiểm soát như thế nào?',
        question_text_en: 'In an FMCG supply chain, a minor retail promotion by Sales often triggers massive demand distortion upstream at factory procurement. How do you explain this phenomenon and control it via S&OP?',
        expected_keywords: ['Bullwhip Effect (Hiệu ứng Roi da)', 'S&OP (Sales & Operations Planning)', 'Sell-out / POS Data', 'Forecast Accuracy (MAPE)', 'MOQ / Batch Ordering'],
        keyword_hints_vi: [
          'Đặt hàng dựa trên dữ liệu tiêu thụ thực tế đầu cuối (Sell-out / POS) thay vì chỉ nhìn đơn đại lý ôm hàng (Sell-in)',
          'Họp S&OP hàng tháng đồng bộ lịch Trade Promotion giữa Sales - Marketing - Supply - Production'
        ],
        followup_probe_vi: 'Chỉ số nào bạn dùng để đo sai số dự báo nhu cầu (Forecast Error) giữa kế hoạch của Sales và sản lượng thực bán?',
        followup_probe_en: 'Which specific KPI metric do you use to measure Forecast Error and Bias between Sales projections and actual demand?',
        ideal_answer: '(S) Đây chính là Hiệu ứng Roi da (Bullwhip Effect): khi Sales tung khuyến mãi chiết khấu mà không báo trước, đại lý găm hàng (Forward Buying) làm đơn Sell-in tăng giả tạo, khiến bộ phận vật tư đặt dư nguyên liệu rồi tồn kho chết ở tháng sau. (T) Giảm sai số dự báo MAPE xuống dưới 18% và cân bằng cung cầu. (A) Tôi chuẩn hóa chu kỳ họp S&OP hàng tháng, bắt buộc Sales khóa lịch khuyến mãi trước 6 tuần, tách riêng nhu cầu nền (Baseline Demand) và sản lượng tăng thêm do khuyến mãi (Uplift), đồng thời kết nối dữ liệu tồn kho đại lý/Sell-out thay vì chỉ nhìn Sell-in và theo dõi chỉ số Forecast Bias + WAPE/MAPE từng nhóm SKU. (R) Giảm MAPE từ 31% xuống 16.5%, cắt giảm 22% hàng tồn chậm luân chuyển (SLOB) sau các kỳ khuyến mãi.'
      },
      {
        question_id: 'sc_case_01',
        domain: 'SUPPLY_CHAIN',
        level: 'Junior',
        type: 'case_study',
        time_limit_sec: 180,
        title: 'Tính Safety Stock, Điểm đặt hàng lại (ROP) & Giải cứu nguy cơ đứt chuyền bao bì',
        question_text: 'Là Chuyên viên Hoạch định Vật tư (Material Planner) tại nhà máy Bình Dương, sáng nay bạn nhận được cảnh báo tắc cửa khẩu biên giới khiến thời gian giao hàng (Lead Time) mã màng nhôm PKG-20 kéo dài lên 11 ngày, trong khi sức tiêu thụ của xưởng đang tăng vọt. Dựa vào bảng bên phải và máy tính mini, hãy tính: (1) Số ngày tồn kho còn đủ dùng (Days of Supply), (2) Mức Safety Stock & ROP chuẩn, và (3) Số lượng cần mua khẩn cấp để không dừng chuyền!',
        question_text_en: 'As Material Planner at a Binh Duong plant, border congestion just stretched Lead Time for foil packaging PKG-20 to 11 days while factory usage surged. Using the table and calculator, compute: (1) Current Days of Supply, (2) Required Safety Stock & ROP, and (3) Emergency bridging quantity to prevent a line shutdown!',
        case_study_board: {
          context: 'Nhà máy FMCG Bình Dương | Mã vật tư: PKG-20 (Màng nhôm ép vỉ) | Tồn kho khả dụng hiện tại: 11,200 cuộn',
          unit_hint: 'Công thức: DOS = Tồn hiện tại ÷ Tiêu thụ ngày mới | SS = (Max Usage × Max LT) - (Avg Usage × Avg LT) | ROP = (Avg Usage × Avg LT) + SS',
          table_headers: ['Thông số Hoạch định', 'Mức Trung bình Lịch sử', 'Biến động Thực tế Tuần này', 'Ghi chú Vận hành'],
          table_rows: [
            ['Mức tiêu thụ ngày (Daily Usage)', '1,200 cuộn / ngày', '1,500 cuộn / ngày (Đỉnh Max: 1,650)', 'Tăng +25% chạy đơn hàng Tết'],
            ['Thời gian giao hàng (Lead Time)', '7 ngày (Đường bộ)', '11 ngày (Tắc biên Bằng Tường)', 'Chi phí dừng chuyền: 180 triệu đ/ngày'],
            ['Tồn kho hiện có & Đang đi đường', 'Tồn tại kho: 11,200 cuộn', 'Hàng đang đi đường (In-transit): 0 cuộn', 'MOQ NCC chính: 10,000 cuộn ($4.0/cuộn)'],
            ['Nhà cung cấp dự phòng nội địa', 'Công ty Bao bì Việt Á (Củ Chi)', 'Lead time giao gấp: 2 ngày', 'Giá cao hơn 15% ($4.6/cuộn), MOQ: 3,000 cuộn']
          ],
          notes: [
            'Áp dụng công thức Safety Stock theo biên độ cực đại: SS = (Max Daily Usage 1,650 × Max Lead Time 11) - (Avg Usage 1,200 × Avg Lead Time 7).',
            'Mục tiêu: Tuyệt đối không để đứt chuyền sản xuất (Zero Line-Stoppage) đồng thời tối ưu chi phí mua bù.'
          ]
        },
        expected_keywords: ['Days of Supply (DOS)', 'Safety Stock', 'Reorder Point (ROP)', 'Stock-out / Line Stoppage', 'Dual Sourcing / Mua bù nội địa', 'Expedite / Tách lô'],
        keyword_hints_vi: [
          '1) Days of Supply hiện tại: 11,200 ÷ 1,500 = 7.47 ngày (Ngắn hơn Lead Time 11 ngày -> Thiếu hụt 11 - 7.47 = 3.53 ngày ~ 5,300 cuộn!)',
          '2) Safety Stock = (1,650 × 11) - (1,200 × 7) = 18,150 - 8,400 = 9,750 cuộn; ROP = 8,400 + 9,750 = 18,150 cuộn',
          '3) Mua khẩn ~5,500–6,000 cuộn từ NCC nội địa Việt Á (giao trong 2 ngày, chênh giá chỉ $0.6 × 6,000 = $3,600 ~ 90 triệu đồng — rẻ hơn rất nhiều so với 3.5 ngày dừng chuyền mất 630 triệu đồng!), đồng thời phát hành PO 10,000+ cuộn cho NCC chính!'
        ],
        ai_followup_rule: 'Nếu sinh viên chỉ đặt PO từ NCC chính (mất 11 ngày hàng mới về trong khi kho chỉ đủ dùng 7.47 ngày) mà quên mua bù từ NCC nội địa 2 ngày hoặc quên tính chi phí chênh giá vs phí dừng chuyền, hãy hỏi xoáy ngay.',
        followup_probe_vi: 'Hãy kiểm tra lại con số trên máy tính nhé: với 11,200 cuộn và tốc độ chạy 1,500 cuộn/ngày thì kho sẽ cạn sạch sau 7.47 ngày, tức là đứt chuyền mất hơn 3.5 ngày trước khi xe từ biên giới kịp về ở ngày thứ 11! Bạn đặt mua bao nhiêu cuộn từ NCC nội địa Việt Á và bài toán đánh đổi chi phí chênh giá 15% so với 180 triệu/ngày dừng chuyền cụ thể ra sao?',
        followup_probe_en: 'Check the math closely: 11,200 rolls at 1,500 rolls/day lasts only 7.47 days—leaving a 3.5-day stock-out gap before the 11-day border shipment arrives! How many rolls will you order from local backup supplier Viet A, and how does the 15% price premium compare against 180M VND/day line stoppage cost?',
        ideal_answer: 'Bước 1 (Tính toán định lượng DOS, Safety Stock & ROP): Với mức tiêu thụ thực tế 1,500 cuộn/ngày, lượng tồn 11,200 cuộn chỉ đủ dùng trong DOS = 11,200 ÷ 1,500 = 7.47 ngày. Trong khi Lead Time biên giới kéo lên 11 ngày, nhà máy sẽ bị hụt 11 - 7.47 = 3.53 ngày sản xuất (tương đương thiếu tối thiểu 3.53 × 1,500 = 5,300 cuộn). Tính lại tham số chuẩn trên ERP: Safety Stock = (1,650 × 11) - (1,200 × 7) = 18,150 - 8,400 = 9,750 cuộn, và điểm đặt hàng lại ROP = 8,400 + 9,750 = 18,150 cuộn (tồn hiện tại đang thủng sâu dưới ROP). Bước 2 (Giải pháp cứu chuyền Dual Sourcing tối ưu chi phí): Lập tức phát hành PO khẩn (Bridging Order) mua 6,000 cuộn từ NCC dự phòng nội địa Việt Á tại Củ Chi (giao sau 2 ngày, vượt ngưỡng MOQ 3,000 cuộn). Khoản chênh giá 15% ($0.6/cuộn × 6,000 cuộn = $3,600 ~ 91 triệu đồng) thấp hơn gấp 7 lần so với thiệt hại dừng chuyền 3.5 ngày (3.5 × 180 triệu = 630 triệu đồng). Bước 3: Song song đặt ngay lô chuẩn >= 15,000 cuộn từ NCC chính để tái thiết lập vùng đệm Safety Stock và cập nhật động tham số ROP mùa Tết trên hệ thống MRP.'
      },
      {
        question_id: 'sc_q03',
        domain: 'SUPPLY_CHAIN',
        level: 'Senior',
        type: 'kpi_optimization',
        time_limit_sec: 150,
        title: 'Cân bằng Vòng quay hàng tồn kho (Inventory Turnover) & Cash-to-Cash Cycle',
        question_text: 'Giám đốc Tài chính (CFO) yêu cầu cắt giảm 20% giá trị tồn kho để giải phóng dòng tiền lưu động, trong khi Giám đốc Kinh doanh lo sợ giảm tồn kho sẽ gây hụt hàng mất doanh số. Bạn giải quyết mâu thuẫn này dựa trên phân tích dữ liệu như thế nào?',
        question_text_en: 'The CFO demands a 20% inventory value reduction to free up working capital, while the Sales Director fears stock-outs and lost revenue. How do you resolve this conflict using data-driven segmentation?',
        expected_keywords: ['ABC-XYZ Matrix', 'Service Level Differentiation', 'SLOB (Slow-Moving & Obsolete)', 'Inventory Turnover / DIO', 'VMI / Consignment'],
        keyword_hints_vi: [
          'Ma trận kép ABC (theo doanh thu/giá trị) × XYZ (theo độ biến động nhu cầu Coefficient of Variation)',
          'Không cắt giảm cào bằng! Giữ Service Level 98-99% cho nhóm AX/AY chủ lực, tập trung thanh lý SLOB và giảm tồn nhóm CZ'
        ],
        followup_probe_vi: 'Với nhóm nguyên liệu/hàng hóa giá trị cao nhưng nhu cầu rất thất thường (nhóm AZ), bạn áp dụng chiến lược đặt hàng nào thay vì ôm tồn kho lớn?',
        followup_probe_en: 'For high-value items with erratic demand (AZ segment), what replenishment or supplier model do you use instead of holding heavy buffer stock?',
        ideal_answer: '(S) Cắt giảm 20% tồn kho kiểu cào bằng mọi mã SKU chắc chắn sẽ làm đứt hàng chủ lực. (T) Giải phóng 20% vốn lưu động mà vẫn giữ Service Level nhóm hàng cốt lõi >= 98.5%. (A) Tôi phân tích danh mục theo ma trận 9 ô ABC-XYZ: 1) Giữ nguyên thậm chí bảo vệ chặt tồn kho nhóm AX/AY (đem lại 80% doanh thu, sức bán đều); 2) Xử lý dứt điểm rổ hàng SLOB (>120 ngày không nhúc nhích) bằng combo xả hàng thu tiền mặt; 3) Với nhóm AZ (giá trị cao, nhu cầu giật cục), chuyển sang mô hình Make-to-Order hoặc đàm phán tồn kho ký gửi (VMI / Consignment Stock) và rút ngắn MOQ với nhà cung cấp. (R) Giảm 21.5% tổng giá trị tồn kho bình quân (DIO giảm từ 62 ngày xuống 48 ngày) trong khi tỷ lệ đáp ứng đơn hàng nhóm A tăng lên 99.1%.'
      }
    ]
  },

  // ============================================================================
  // 6. BUSINESS ANALYST MẢNG LOGISTICS (LOGISTICS BA)
  // ============================================================================
  {
    id: 'logistics_ba',
    code: 'LOGISTICS_BA',
    name: 'Business Analyst mảng Logistics (Logistics BA)',
    nameEn: 'Logistics & Supply Chain Business Analyst',
    shortTitle: 'Logistics BA',
    lucideIcon: 'bar-chart-3',
    pastelBg: '#FFF1F2',
    pastelBorder: '#FECDD3',
    accentColor: '#E11D48',
    badgeText: 'WMS/OMS/TMS Tech',
    description: 'Phân tích nghiệp vụ tích hợp hệ thống WMS – OMS – TMS – Sàn TMĐT, thiết kế luồng API/Webhook tồn kho thời gian thực, viết BRD/User Story và UAT.',
    casePreviewLabel: 'Bảng xử lý Overselling 420 đơn Flash Sale & thiết kế ATP Sync',
    questions: [
      {
        question_id: 'ba_q01',
        domain: 'LOGISTICS_BA',
        level: 'Intern/Fresher',
        type: 'warmup_star',
        time_limit_sec: 120,
        title: 'Khảo sát hiện trường (Gemba Walk) & Thiết kế UAT khi triển khai WMS mới',
        question_text: 'Khi viết tài liệu đặc tả yêu cầu (BRD / User Stories) cho phân hệ nhận hàng bằng súng PDA tại kho, nhân viên vận hành thường làm khác xa quy trình trên giấy. Là Logistics BA, bạn thu thập yêu cầu và thiết kế kịch bản kiểm thử UAT như thế nào để hệ thống Go-live không bị "đứng hình"?',
        question_text_en: 'When writing BRDs/User Stories for mobile PDA receiving in a warehouse, floor workers often deviate from paper SOPs. As a Logistics BA, how do you gather requirements and design UAT scenarios so Go-live doesn’t stall?',
        expected_keywords: ['Gemba Walk / Shadowing', 'As-Is vs To-Be', 'Edge Cases / Exception Flow', 'UAT (User Acceptance Testing)', 'BRD / Acceptance Criteria'],
        keyword_hints_vi: [
          'Xuống trực tiếp sàn kho (Gemba Walk / Job Shadowing) quan sát thao tác quét mã vạch mờ, rớt mạng Wi-Fi góc kho, hàng giao thiếu/thừa (Over/Short Receipt)',
          'Đưa đầy đủ Exception Flows vào Acceptance Criteria và cho chính tổ trưởng kho chạy UAT thực địa'
        ],
        followup_probe_vi: 'Hãy nêu 2 tình huống ngoại lệ (Exception Cases) điển hình lúc nhập kho thực tế mà nếu BA quên thiết kế thì nhân viên kho sẽ không thể bấm hoàn tất phiếu nhập trên PDA?',
        followup_probe_en: 'Name 2 classic physical receiving Exception Cases that, if omitted by the BA, would block warehouse staff from completing GRN on their PDAs?',
        ideal_answer: '(S) Trong dự án nâng cấp WMS cho kho phân phối 12,000m2, bản thiết kế ban đầu chỉ có luồng chuẩn (Happy Path) khiến lần chạy thử đầu tiên bị tắc tại cửa Inbound. (T) Thiết kế luồng PDA bám sát 100% thực địa và Go-live không gián đoạn. (A) Tôi thực hiện Gemba Walk đi theo nhân viên nhận hàng suốt 3 ca để vẽ sơ đồ As-Is vs To-Be, bổ sung các Exception Flows sống còn vào User Story: 1) Hàng thực nhận giao từng phần (Partial GRN) hoặc vượt dung sai PO; 2) Tem mã vạch nhà cung cấp bị rách/mờ cho phép in lại tem nội bộ (Relabeling) ngay trên máy in Bluetooth; 3) Chế độ lưu tạm Offline Queue khi xe nâng đi vào góc khuất sóng Wi-Fi. Khi UAT, tôi dựng 25 kịch bản dữ liệu thật cho chính Key Users dưới kho tự tay bấm duyệt. (R) Hệ thống Go-live mượt ngay ngày đầu, giảm 45% thời gian nhập phiếu GRN và đạt tỷ lệ hài lòng 96% từ đội vận hành.'
      },
      {
        question_id: 'ba_case_01',
        domain: 'LOGISTICS_BA',
        level: 'Junior',
        type: 'case_study',
        time_limit_sec: 180,
        title: 'Giải cứu sự cố Overselling 420 đơn Flash Sale & Thiết kế lại cơ chế đồng bộ tồn kho OMS – WMS',
        question_text: 'Đúng 00:15 đêm Mega Sale, hệ thống OMS báo động đỏ: mã nồi chiên không dầu AIRFRY-09 bị bán lố (Oversell) do lịch đồng bộ tồn kho định kỳ (Cron-job 15 phút/lần) đẩy trùng 100% tồn kho lên cả Shopee và TikTok Shop. Hãy dùng bảng số liệu và máy tính để: (1) Tính số lượng thiếu ròng sau khi huy động kho lẻ và số đơn tối đa được phép hủy để không vượt trần phạt 3% của sàn; (2) Đề xuất giải pháp vận hành cứu đơn trong ngày và thiết kế lại kiến trúc đồng bộ ATP để triệt tiêu lỗi Overselling!',
        question_text_en: 'At 00:15 AM during Mega Sale, OMS triggers a red alert: SKU AIRFRY-09 is oversold because a 15-minute batch cron-job pushed 100% physical stock to both Shopee and TikTok Shop simultaneously. Using the table and calculator: (1) Compute net shortage after store stock transfer and the maximum cancellable orders under the 3% marketplace NFR penalty cap; (2) Propose same-day operational recovery plus a redesigned OMS–WMS ATP sync architecture!',
        case_study_board: {
          context: 'Sự cố 00:15 Mega Sale | SKU: AIRFRY-09 | Cơ chế cũ: Batch Cron-job 15 phút đẩy 100% tồn WMS lên mọi sàn',
          unit_hint: 'Tính: Tổng đơn (820+600) - Tồn WMS (1,000) - Kho lẻ (280) = Thiếu ròng | Trần hủy 3% = Tổng đơn × 3%',
          table_headers: ['Hệ thống / Kênh bán', 'Tồn hiển thị lúc 00:00', 'Đơn đã thanh toán (00:00-00:15)', 'Nguồn hàng Khả dụng Thực tế', 'Quy định Phạt Sàn (SLA)'],
          table_rows: [
            ['WMS Kho Trung tâm', '1,000 máy', '—', '1,000 máy (Sẵn sàng đóng gói)', '—'],
            ['Shopee Mall Official', '1,000 máy (Đẩy 100%)', '820 đơn', 'Dùng chung rổ WMS Trung tâm', 'Giao ĐVVC trước 18:00; Phạt nếu NFR > 3%'],
            ['TikTok Shop Mall', '1,000 máy (Đẩy 100%)', '600 đơn', 'Dùng chung rổ WMS Trung tâm', 'Giao ĐVVC trước 20:00; Khoá Flash Sale nếu hủy > 3%'],
            ['Kho Cửa hàng Bán lẻ', 'Không nối sàn', '—', '280 máy (Điều chuyển về kho mất 6h)', 'Chi phí xe tải điều chuyển gấp: 1,200,000đ']
          ],
          notes: [
            'Mỗi đơn hủy do lỗi nhà bán (Seller-fault Cancellation) bị phạt 15,000đ/đơn; đặc biệt nếu tỷ lệ hủy vượt quá 3.0% tổng số đơn thì gian hàng Mall bị phạt điểm Sao Quả Tạ và khóa quyền tham gia chiến dịch tháng sau.',
            'Kho còn 150 chiếc mẫu nâng cấp AIRFRY-09 PRO (giá vốn cao hơn 65,000đ/máy) có thể thương lượng đổi ngang miễn phí cho khách.'
          ]
        },
        expected_keywords: ['ATP (Available-to-Promise)', 'Buffer Stock / Channel Allocation', 'Event-driven Webhook / Real-time Sync', 'Soft Allocation / Inventory Reservation', 'NFR / Cancellation Rate (< 3%)', 'Stock Transfer / Free Upgrade'],
        keyword_hints_vi: [
          'Tính toán chính xác: Tổng đơn = 820 + 600 = 1,420 đơn -> Oversell ban đầu = 1,420 - 1,000 = 420 máy (-29.58%)',
          'Sau khi điều chuyển 280 máy từ Kho Bán lẻ về (mất 6h, kịp trước 18:00): Thiếu ròng còn 420 - 280 = 140 đơn!',
          'Trần hủy tối đa không bị phạt < 3%: 1,420 × 3% = 42.6 -> Tối đa chỉ được hủy 42 đơn! Vậy ít nhất 140 - 42 = 98 đơn bắt buộc phải cứu bằng cách CSKH gọi tặng nâng cấp miễn phí lên bản AIRFRY-09 PRO (đang sẵn 150 máy)!',
          'Kiến trúc BA chuẩn: Bỏ Cron-job 15 phút đẩy 100%; chuyển sang Event-driven Webhook + Redis Soft-Lock (giữ chỗ ngay khi đặt đơn) + Tỷ lệ phân bổ kênh (Channel Allocation Ratio, VD Shopee 60% / TikTok 35% / Buffer an toàn 5%)'
        ],
        ai_followup_rule: 'Nếu sinh viên chỉ nói nâng cấp hệ thống IT mà quên tính con số thiếu ròng 140 đơn vs trần hủy 42 đơn (3%) để cứu gian hàng ngay trong ngày hôm nay, hãy hỏi xoáy ngay.',
        followup_probe_vi: 'Về mặt vận hành ngay sáng nay: sau khi kéo 280 máy từ kho lẻ về thì bạn vẫn thiếu 140 máy, trong khi trần phạt 3% của 1,420 đơn chỉ cho phép hủy tối đa 42 đơn! Bạn xử lý tối thiểu 98–140 đơn thiếu còn lại thế nào trước 18:00, và cơ chế phân bổ tồn kho an toàn (Buffer Stock / Channel Ratio) trên OMS bạn thiết kế công thức ra sao?',
        followup_probe_en: 'Operationally today: even after transferring 280 units from retail stores, you are still short 140 units, while the 3% NFR cap on 1,420 orders allows at most 42 cancellations! How do you save those remaining 98–140 orders before 18:00, and what exact ATP formula will you design in OMS?',
        ideal_answer: 'Bước 1 (Định lượng bài toán Cứu đơn & Trần phạt 3%): Tổng đơn phát sinh trên 2 sàn là 820 + 600 = 1,420 đơn so với 1,000 máy tại WMS, gây Oversell 420 máy. Tôi lập tức tạo lệnh Stock Transfer kéo gấp 280 máy từ Kho Bán lẻ về trong 6 giờ (chi phí 1.2 triệu đồng, kịp đóng gói trước Cut-off 18:00), giảm số thiếu ròng xuống 420 - 280 = 140 đơn. Vì ngưỡng an toàn NFR < 3% chỉ cho phép hủy tối đa 1,420 × 3% = 42 đơn, nên để không dính Sao Quả Tạ, ít nhất 98 đơn (tốt nhất cả 140 đơn) phải được xử lý: tôi xuất danh sách 140 đơn đặt muộn nhất cho đội CSKH liên hệ đề xuất nâng cấp miễn phí sang mẫu AIRFRY-09 PRO (kho đang sẵn 150 máy, chi phí bù giá vốn 140 × 65,000đ = 9.1 triệu đồng — rẻ hơn rất nhiều so với thiệt hại bị khóa gian hàng Mall tháng sau), giữ tỷ lệ hủy lỗi Shop ở mức ~0%. Bước 2 (Tái thiết kế kiến trúc BA cho OMS – WMS): 1) Thay thế Batch Cron-job 15 phút bằng kiến trúc Event-driven Webhook + Bộ nhớ đệm Redis trừ lùi tồn kho khả dụng ATP (Soft Reservation) dưới 500ms ngay khi phát sinh Order Created; 2) Xây dựng công thức Channel Sync trên OMS: Sync_Qty = (Physical_Stock - Locked_Orders - Safety_Buffer_5%) × Channel_Allocation_Ratio (ví dụ khi tồn < 50 máy tự động rút toàn bộ về 1 sàn chủ lực để triệt tiêu 100% nguy cơ bán chéo lố tồn).'
      },
      {
        question_id: 'ba_q03',
        domain: 'LOGISTICS_BA',
        level: 'Senior',
        type: 'kpi_optimization',
        time_limit_sec: 150,
        title: 'Thiết kế Dashboard BI & Chuẩn hóa Master Data cho Chuỗi cung ứng',
        question_text: 'Khi xây dựng hệ thống báo cáo Data Warehouse / Power BI hợp nhất dữ liệu từ WMS và TMS, lỗi phổ biến nhất là Master Data kích thước và trọng lượng SKU (CBM / Weight) bị nhập sai hoặc bỏ trống, làm thuật toán xếp xe của TMS tính sai hoàn toàn. Bạn thiết kế quy trình quản trị Master Data như thế nào?',
        question_text_en: 'When building unified BI analytics and TMS load planning from WMS data, missing or inaccurate SKU Master Data (dimensions/weight) breaks truck capacity algorithms. How do you design Master Data Governance?',
        expected_keywords: ['Master Data Governance', 'Cubiscan / Đo kích thước lần đầu', 'Validation Rules', 'Single Source of Truth', 'Data Completeness KPI'],
        keyword_hints_vi: [
          'Chặn cứng luồng hệ thống (System Gate): SKU mới chưa đo kích thước Dài × Rộng × Cao × Nặng lúc Inbound lần đầu thì chưa cho phép Put-away/Tạo đơn xuất',
          'Xác định Single Source of Truth (WMS giữ chuẩn kích thước vật lý thực tế, đồng bộ tự động sang ERP/OMS/TMS)'
        ],
        followup_probe_vi: 'Nếu một mã SKU có nhiều cấp quy cách đóng gói (Cái -> Hộp -> Thùng carton -> Pallet), bạn thiết kế cấu trúc bảng quy đổi đơn vị tính (UoM Conversion) thế nào để WMS và TMS không tính nhầm?',
        followup_probe_en: 'When a SKU has multiple packaging hierarchies (Piece -> Inner Box -> Master Carton -> Pallet), how do you model the UoM Conversion schema across WMS and TMS?',
        ideal_answer: '(S) Hơn 28% mã hàng mới trên hệ thống bị điền nhầm kích thước mặc định bằng 0 hoặc sai đơn vị cm/mm làm TMS ghép lố thể tích xe tải. (T) Đạt độ chuẩn xác Master Data kích thước/trọng lượng >= 99.5%. (A) Tôi thiết kế quy trình Master Data Gate ngay trên PDA ở bước First-Inbound: hệ thống tự động nhận diện SKU lần đầu nhập kho và bắt buộc nhân viên đặt qua cân điện tử/máy đo Cubiscan để cập nhật đủ 4 trường (L, W, H, Gross Weight) theo hệ quy chiếu Base UoM và bảng Pack Hierarchy (1 Pallet = X Thùng = Y Hộp = Z Cái) kèm Validation Rule chặn giá trị phi lý (ví dụ tỷ trọng CBM/kg vượt ngưỡng). WMS đóng vai trò Single Source of Truth phát bản tin cập nhật sang OMS và TMS qua API. (R) Chấm dứt tình trạng xếp xe dôi hàng tại Dock và nâng độ chính xác tính phí lưu kho/vận chuyển lên 99.7%.'
      }
    ]
  }
];

export const MOCK_CASE_STUDIES: PracticeQuestion[] = MOCK_LOGISTICS_TRACKS.map(
  (track) => track.questions.find((q) => q.type === 'case_study')!
);
