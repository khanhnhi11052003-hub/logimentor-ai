# 🎓 LogiMentor AI — Nền Tảng Luyện Phỏng Vấn Thực Chiến Ngành Logistics Cho Sinh Viên

Ứng dụng Web EdTech hiện đại (phong cách Notion / Linear kết hợp Gamification nhẹ), **100% tập trung vào trải nghiệm tự luyện tập thực chiến của Sinh viên ngành Logistics & Quản lý Chuỗi cung ứng**.

---

## ✨ 4 Trụ Cột Tính Năng Chính

### 1. Trang Chủ Sinh Viên (`/`) & Gamification Nhẹ
- **Không gian học tập không áp lực**: Loại bỏ hoàn toàn giao diện quản trị B2B và tắt toàn bộ cơ chế giám sát chống gian lận (không ép Fullscreen, không bắt lỗi chuyển Tab hay Copy/Paste).
- **Top Navbar tối giản**: Logo bên trái; bên phải hiển thị **Chuỗi ngày luyện (`Streak 🔥`)**, **Số buổi đã tập**, nút **Lịch sử luyện tập** và kết nối **Google Gemini API**.
- **Lưới 6 Nhóm Ngành Logistics (`rounded-2xl` trên nền `bg-slate-50/60`)**:
  1. **Vận tải & Điều phối (TMS)** — Pastel Indigo (`#4F46E5`)
  2. **Kho bãi & Tồn kho (WMS)** — Pastel Emerald (`#059669`)
  3. **Giao hàng chặng cuối (Last-mile)** — Pastel Amber (`#D97706`)
  4. **Xuất nhập khẩu & Hải quan (Customs)** — Pastel Sky (`#0284C7`)
  5. **Chuỗi cung ứng (Supply Chain)** — Pastel Violet (`#7C3AED`)
  6. **Business Analyst mảng Logistics (Logistics BA)** — Pastel Rose (`#E11D48`)
- **Quick-Start Modal**: Bấm vào thẻ ngành bất kỳ để chọn **Cấp độ** (*Intern/Fresher*, *Junior*, *Senior*), **Ngôn ngữ** (*Tiếng Việt* / *Tiếng Anh*) và vào thẳng phòng luyện tập.

### 2. Phòng Phỏng Vấn `InterviewRoom` (Phong Cách AI Mentor)
- **3 Trạng thái Vòng sáng & Sóng âm (Audio Waveform)**:
  - **AI đang hỏi**: Vòng sáng & sóng âm **Indigo (`#4F46E5`)**.
  - **Bạn đang trả lời**: Vòng sáng & sóng âm **Emerald (`#10B981`)** nhạy theo tần số Micro thực tế.
  - **AI đang phân tích**: Hiệu ứng chuyển sắc **Shimmer** mượt mà.
- **Hỗ trợ học tập & Sửa lỗi Vietlish**:
  - Nút **`💡 Gợi ý từ khóa`** mở ngăn từ khóa chuyên ngành và gợi ý tư duy khi bí ý.
  - **Inline Editable Transcript**: Không tự động ngắt câu khi sinh viên im lặng suy nghĩ hoặc bấm máy tính; cho phép tự sửa các thuật ngữ tiếng Anh bị nghe nhầm (*FEFO*, *WMS*, *Bill of Lading*...) kèm thanh chip chèn nhanh trước khi bấm **`Hoàn thành & Gửi câu trả lời`**.
- **Bảng Tình Huống (`65/35` Desktop • `Bottom Sheet` Mobile) & Máy Tính Mini**:
  - Tự động bung cột phải khi câu hỏi có `case_study_board`, hiển thị bảng số liệu căn thẳng hàng (`tabular-nums`).
  - Tích hợp 2 tab tiện ích bên dưới bảng: **🧮 Máy tính mini (`+`, `-`, `×`, `÷`, `%`, `C`, `000`, `=`)** có nút chèn thẳng kết quả vào câu trả lời và **📝 Ghi chú nháp (Scratchpad)**.

### 3. Trang Báo Cáo & Sửa Bài (`/report/[sessionId]`)
- **Điểm tổng (`0–100`) dạng Vòng tròn tiến độ (Circular Progress)** kết hợp **Biểu đồ Radar 4 trục** (*Kiến thức nghiệp vụ*, *Xử lý tình huống*, *Tư duy KPI/Số liệu*, *Giao tiếp STAR*).
- Phân loại trực quan **Từ khóa đã dùng** (màu xanh ngọc) và **Từ khóa bỏ sót** (màu đỏ san hô nhạt).
- Đặt **Câu trả lời của bạn** (kèm trình phát ghi âm giọng nói) song song với **Gợi ý trả lời chuẩn chuyên gia**, cùng nút **`🎙️ Thử trả lời lại câu này`** cho phép ghi âm/nhập lại riêng từng câu để **AI chấm điểm lại ngay lập tức**.

### 4. Bộ Dữ Liệu Case Study Định Lượng Cho Cả 6 Ngành
- Lưu trữ đầy đủ tại [`src/data/mockCaseStudies.ts`](file:///d:/Antigravity/Interview%20AI%20Platform%20Project/src/data/mockCaseStudies.ts) và đồng bộ trực tiếp vào [`data.js`](file:///d:/Antigravity/Interview%20AI%20Platform%20Project/data.js):
  - `tms_case_01`: Bảng ghép xe nội đô TP.HCM tránh khung giờ cấm tải & tính Fill Rate.
  - `wms_case_01`: Bảng lệch tồn kho lạnh 5% (`MILK-01`, `BEEF-05`) & hàng cận date 5 ngày vs yêu cầu 7 ngày.
  - `lm_case_01`: Bảng tính `Cost per Drop` & xử lý tỷ lệ giao thất bại `NDR` 24% dịp Mega Sale 11/11.
  - `cus_case_01`: Bảng soi sai lệch `C/O Form E`, `HS Code`, `Gross Weight` tại Cát Lái & bài toán Thuế vs `DEM`.
  - `sc_case_01`: Bảng tính `Days of Supply`, `Safety Stock`, `ROP` & mua bù nội địa tránh đứt chuyền bao bì.
  - `ba_case_01`: Bảng cứu 420 đơn `Overselling` Flash Sale dưới trần phạt `3% NFR` & thiết kế luồng đồng bộ `ATP`.

---

## 🚀 Cách Khởi Chạy
Mở trực tiếp [`index.html`](file:///d:/Antigravity/Interview%20AI%20Platform%20Project/index.html) (hoặc chạy [`start_app.bat`](file:///d:/Antigravity/Interview%20AI%20Platform%20Project/start_app.bat)) trên **Google Chrome** hoặc **Microsoft Edge**.
