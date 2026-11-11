# Elemental Trail — PRD

Cập nhật 09/11/2026. Bộ tài liệu hiện hành gồm PRD, Architecture và Vibe Coding.

Sản phẩm và quyết định Accepted/Open ở đây có thẩm quyền về scope; không phải bằng chứng đã implement.
Xem [Architecture](ELEMENTAL_TRAIL_ARCHITECTURE.md) và [Vibe Coding](ELEMENTAL_TRAIL_VIBE_CODING.md).

## 1. Sản phẩm đã chốt

Elemental Trail là **thế giới sưu tầm thú nguyên tố tồn tại lâu dài**, chơi online thường xuyên.
Event GPS/QR và collaboration là nội dung bổ sung, không phải điều kiện cho mọi hoạt động.

Vòng chơi: khám phá → sưu tầm → chăm → tiến hóa → mở nội dung → phát triển collection.

Accepted:
- Collection và lịch sử khám phá tồn tại qua campaign.
- Collection progress miễn phí; không season pass trả phí trong demo.
- Ghép tiêu đúng bản sao được chọn; giữ lịch sử đã khám phá.
- Preview số lượng mất/còn lại, cảnh báo khi dùng bản cuối.
- Thẻ đang custody không tự bị dùng để ghép.
- Demo tiến hóa Ember Sprite → Flare Fox.
- Utility nhận qua reward ICM riêng; không mint lại cùng item từ recipe tiến hóa.
- Dùng Yield Go hiện tại làm nền.
- Chưa chốt cách giới hạn pet collaboration.

Không dùng lời hứa giá pet tăng, lợi nhuận đảm bảo hoặc farm token để bán làm giá trị chính.
Không mặc định đã có retention nhiều tuần chỉ vì thêm nhiệm vụ hoặc trang Coming next season.

## 2. Scope bản demo và phần chưa chốt

### Phần cần chứng minh

1. Bốn starter: Ember Sprite, Aqua Drop, Mossy Pebble, Zephyr Cloud.
2. Một nguồn nhận bản sao online theo cơ chế sẽ chốt.
3. Một đường chăm/thu và một recipe tiến hóa tạo Flare Fox.
4. World Collection: Owned/Available/Custody và Discovered không bị trộn.
5. Một campaign chính có progress miễn phí.
6. Một reward qua ICM cấp item/entitlement có utility thật.
7. Một nội dung sandbox B để kiểm tra tài sản cũ còn dùng được sau A.
8. Coming next season có nhãn roadmap.
9. Pet collaboration là đề xuất thêm vào demo; tên, quyền nhận và giới hạn còn mở.

Tối thiểu có năm artwork pet đã tồn tại; thêm collaboration là pet thứ sáu.
Bộ 16 artwork có sẵn là thư viện, không ép build đủ 16 loài/12 recipe ngay.

### Decision register

| ID | Cần chốt | Trạng thái | Phương án đã thống nhất / thảo luận |
|---|---|---|---|
| D01 | Nguồn pet online & sự kiện | **Accepted** (11/11/2026) | Nguồn kép: Online Trail (tại nhà) + Event GPS Hunt (săn pet mới tại sự kiện; có GPS vật lý + Mock test) |
| D02 | Số bản sao và chi phí tiến hóa | Open | Baseline 2 Ember + 8 Essence chỉ để tham khảo |
| D03 | Essence dài hạn/theo mùa, issuance/cap/sink, offline, kết mùa | Open | Không kéo nguyên trần event 160 thành farm vĩnh viễn |
| D04 | Utility mở gì, ownership/achievement, tiêu hao hay giữ | Open | Mở tuyến khám phá B là đề xuất |
| D05 | Linh thú Sự kiện & Collab | **Accepted** (11/11/2026) | Chốt 3 Linh thú sự kiện độc quyền: Avalanche Pet (#501, Ice), KHTN Pet (#701, Lightning), Greenwich Pet (#801, Nature). Săn qua trạm Event GPS hoặc QR check-in tại gian hàng |
| D06 | Navigation & UI Flow | **Accepted** (11/11/2026) | 5 Tab tinh gọn: Săn Thú (`/hunt`), Kho Thú (`/vault`), Chăm Nuôi (`/nest`), Tiến Hóa (`/evolve`), Phần Thưởng (`/reward`) |
| D07 | Stable asset identity, transfer policy, migration nếu có | Open | ERC-1155, tách asset khỏi campaign |

Hỏi quyết định cần thiết theo nhóm nhỏ, đưa lựa chọn và tác động. Không hỏi lại Accepted.
Có thể tiếp tục audit/research/baseline và interface độc lập khi quyết định khác còn mở.
Không implement luật production bằng giá trị tạm; fixture local phải có nhãn và phạm vi.

### Ngoài scope demo

Combat, marketplace/P2P, cash-out, paid pass, toàn bộ hệ daily/weekly/season,
mười cấp rarity, phát hành token tài chính và pilot quà vật lý đông người.
Voucher/operator vật lý chỉ thêm khi scope được mở rõ; utility số không bắt buộc có chúng.

## 3. Trải nghiệm và dữ liệu cốt lõi

### Màn hình (5 Tab Tinh gọn)

- **Landing & Onboarding**: Giới thiệu thế giới thú nguyên tố, chọn Starter Pet miễn phí ban đầu.
- **1. Săn Thú (`/hunt`)**: Chế độ kép — Khám phá Online Trail (tại nhà) và Săn Thú Sự Kiện GPS (săn các loài Pet mới độc quyền tại booth/sự kiện; hỗ trợ GPS vật lý và công tắc Mock test).
- **2. Kho Thú (`/vault`)**: Quản lý Túi đồ bản sao sở hữu (ERC-1155) và Bách khoa linh thú mở khóa vĩnh viễn (Bestiary Dex).
- **3. Chăm Nuôi (`/nest`)**: Gửi thú vào ốc đảo sinh thái, tích lũy Tinh chất (Essence) tự động, 1 nút thu hoạch nhanh.
- **4. Tiến Hóa (`/evolve`)**: Chọn bản sao ghép thú, xem trước linh thú mới, cảnh báo khi tiêu thụ bản sao cuối cùng.
- **5. Phần Thưởng (`/reward`)**: Quản lý tiến trình chiến dịch, nhận chứng chỉ qua Avalanche ICM, mở cổng vào Vùng đất mới (Sandbox B).
- **Coming Next Season**: Lộ trình mùa giải tiếp theo (nhãn rõ ràng, không hứa hẹn lợi nhuận tài chính).

Mọi màn hình cần đường đi khi thiếu nguyên liệu, chưa login, lỗi mạng hoặc đang chờ.
Tên card/số lượng/rate/nút là UI text, không bake vào artwork.

## 4. Research và thiết kế

Hướng “Sổ tay thám hiểm nguyên tố” là phương án đề xuất:
kem ấm #FFF8EC, xanh rừng #173D35, mint #DCEEE1, coral #FF795F;
thú 3D cách điệu, đường mòn, dấu khám phá, card sưu tầm.
Chưa bắt buộc chọn style này.

Research 8–12 tham khảo có nguồn: collection lâu dài, map/event hub, onboarding,
người quay lại và utility. Phân biệt concept với sản phẩm đang chạy.
Ghi URL và điều đã quan sát, không bịa screenshot/retention/player counts.
Chọn 1 hướng trước khi làm nhiều mockup.
Mobile trước; spacing rõ, tap ≥44 CSS px, typography dễ đọc;
normal text cần tương phản phù hợp, có focus và reduced motion.
Không dùng màu làm tín hiệu duy nhất, không để animation quyết định thành công.

Các quyết định thiết kế được ghi vào mục Decision log cuối file này.
Ảnh tham khảo là artifact, không phải đặc tả gameplay bổ sung.

## 5. Decision log và bằng chứng hiện tại

Accepted ngày 09/11/2026:
- Chơi online thường xuyên, event bổ sung.
- Collection progress miễn phí.
- Ghép tiêu bản sao đã chọn, giữ lịch sử khám phá.
- Demo tiến hóa Ember Sprite → Flare Fox.
- Utility nhận riêng qua ICM.
- Repo Yield Go trong thư mục cuộc thi là workspace hiện hành.

Accepted theo chỉ đạo người dùng ngày 11/11/2026 (v0.1 — Lối chơi Kép & Điều hướng Tinh gọn):
- **D01 — Lối chơi Kép (Dual Hunt: Online Trail + Event GPS):**
  - *Chế độ 1: Thám hiểm Ảo (Online Trail):* Dành cho chơi lâu dài hàng ngày tại nhà, không cần GPS, săn linh thú cơ bản bằng Năng lượng hồi phục.
  - *Chế độ 2: Săn Thú Sự Kiện (Event GPS Hunt):* Dành cho các sự kiện thực tế (hackathon booth, trạm đối tác) để săn các **Linh Thú Nguyên Tố Mới** và Pet Collab độc quyền.
  - *Hỗ trợ GPS Vật Lý:* Cả bản Demo lẫn bản Thực tế đều tích hợp GPS vật lý (Bản demo có thêm công tắc bật/tắt Mock GPS để ban giám khảo và lập trình viên dễ dàng test thử trực tiếp). Bảo mật tuyệt đối: chỉ so sánh cự ly trên máy (client-side verification), không lưu log tọa độ thô (raw GPS) vào cơ sở dữ liệu.
- **D05 — Linh thú Sự kiện & Đối tác Collab:**
  - Chốt chính thức danh tính và tệp đồ họa cho 3 linh thú sự kiện:
    1. **Avalanche Pet** (`#501`, `asset/art/ice_s1_normal.png`, Hệ Băng): Đại diện sự kiện Avalanche Build Web3 / Avalanche Summit.
    2. **KHTN Pet** (`#701`, `asset/art/lightning_s1_normal.png`, Hệ Sét): Đại diện đối tác Trường Đại học Khoa học Tự nhiên (HCMUS).
    3. **Greenwich Pet** (`#801`, `asset/art/nature_s1_normal.png`, Hệ Thảo Mộc): Đại diện đối tác Trường Đại học Greenwich Việt Nam.
    - *(Dự trữ Mùa 2)*: `#601` `magma_s1_normal.png` (Emberstone - Hệ Dung Nham).
- **D06 — Điều hướng Tinh gọn (5 Tab Ngắn gọn, Dễ hiểu):**
  - Rút ngắn toàn bộ tên gọi màn hình thành 5 phân hệ súc tích:
    1. **Săn Thú (`/hunt`)**: Chuyển đổi linh hoạt giữa Online Trail và Event GPS Hunt.
    2. **Kho Thú (`/vault`)**: Quản lý Túi đồ bản sao sở hữu và Bách khoa mở khóa vĩnh viễn.
    3. **Chăm Nuôi (`/nest`)**: Đặt thú nghỉ ngơi, tự động sinh Tinh chất (Essence) theo thời gian.
    4. **Tiến Hóa (`/evolve`)**: Ghép thú và xem trước hình thái mới (Ember Sprite $\to$ Flare Fox).
    5. **Phần Thưởng (`/reward`)**: Xác nhận tiện ích qua Avalanche ICM và mở khóa Vùng đất B.
  - Phong cách mỹ thuật: Hướng 1 (Field Guide - Sổ tay thám hiểm) kết hợp trạm dạ quang từ Hướng 2.

Open: D02–D04, D07 theo mục 3 (công thức chi tiết, identity và policy).
Lịch sử docs trước đây ghi HEAD 73cfc3e; v0.0 đã xác nhận baseline tại HEAD a0f4239 trên branch Element_trail.

Trong đợt tổng hợp: chỉ cập nhật tài liệu/rules, chưa code gameplay,
chưa chạy baseline app/contract, chưa tạo commit, chưa deploy.
Kết quả asset đã có: 32 PNG/16 art, đối chiếu tên và decode được.
Các entry mới trong Decision log của PRD cần nêu ngày, quyết định, Proposed/Accepted và nguồn xác nhận.

---

## 6. Phụ lục: Báo cáo Nghiên cứu UX, So sánh Hướng Mỹ thuật và Đặc tả Wireflow Mobile (v0.1)

### 6.1 Bảng nghiên cứu 10 sản phẩm tham khảo (Web Research & Observed Patterns)

Nghiên cứu đối sánh bao phủ 5 trọng tâm trải nghiệm: Bộ sưu tập lâu dài (Long-term Collection), Bản đồ/Sự kiện trực tuyến (Map & Virtual Waypoints), Vòng lặp người chơi quay lại (Returning Loop), Nhận thú ban đầu (Onboarding & Acquisition), Tiến trình tiến hóa & Tiện ích (Progression & Utility). Các liên kết được ghi nhận trực tiếp từ sản phẩm thực tế hoặc tài liệu thiết kế nguyên bản của tác giả.

| STT | Tên sản phẩm / Tác giả | URL trực tiếp | Thể loại | Trọng tâm quan sát thực tế | Pattern nên học | Anti-pattern cần tránh |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Pokémon HOME**<br>*(The Pokémon Company)* | [home.pokemon.com](https://home.pokemon.com/en-us/) | Live App<br>*(iOS / Switch)* | Sưu tập lâu dài & Quản lý kho | **Tách bạch National Pokédex vs Boxes:** Mục bách khoa ghi nhận vĩnh viễn ngay cả khi quái thú đã bị chuyển đi hoặc tiêu thụ; bộ lọc đa tầng theo hệ/thuộc tính. | Thu phí dung lượng lưu trữ quá gắt; quy trình chuyển đổi chậm chạp tạo ma sát UX. |
| **2** | **Pikmin Bloom**<br>*(Niantic)* | [pikminbloom.com](https://pikminbloom.com/en/) | Live App<br>*(iOS / Android)* | Khám phá kép & Decor collection | **Cơ chế Viễn chinh ảo (Expedition):** Cho phép người chơi cử thú đi nhận hạt mầm/bưu thiếp từ xa mà không cần di chuyển GPS vật lý; vòng lặp tặng quà ấm áp. | Ép buộc bật định vị chạy ngầm liên tục gây hao pin nghiêm trọng cho thiết bị di động. |
| **3** | **Genshin Impact — Travel Guide**<br>*(HoYoverse / dstory.co)* | [genshin.hoyoverse.com](https://genshin.hoyoverse.com/)<br>[dstory.co](https://dstory.co) | Live Game UI / Design Template | Sổ tay du khảo & Lưu trữ thế giới | **Thẩm mỹ Sổ tay thám hiểm (Field Guide):** Nền giấy kem cổ điển, sticker dán nhãn mascot chibi ngộ nghĩnh, phân chương rõ ràng theo Địa lý / Đặc sản / Điểm mốc. | Menu lồng quá nhiều cấp trên giao diện di động hẹp (dưới 400px), gây khó thao tác một tay. |
| **4** | **Ali Hamza Portfolio**<br>*(Ali Hamza)* | [alihamza.dev](https://alihamza.dev) | Live Portfolio Showcase | Bản đồ phiêu lưu & Waypoint | **Đường mòn hang động đêm & Trạm dạ quang:** Các trạm dừng chân phát sáng theo từng hệ nguyên tố; thanh điều hướng gập mở "The Adventure Map" đặt ở đáy màn hình. | Lạm dụng WebGL và hiệu ứng nặng khiến hiệu năng giật lag trên các dòng điện thoại tầm trung. |
| **5** | **Running Ghost: Nightly Journey**<br>*(Tree Studio)* | [behance.net/tree-studio](https://www.behance.net/gallery/146197369/Running-Ghost-Nightly-Journey) | Game Art Concept | Đảo sinh thái bay & Tinh linh | **Ốc đảo bay lơ lửng (Floating Islands):** Tông màu xanh rêu đêm huyền ảo, thiết kế thú dạng kẹo dẻo marshmallow đáng yêu; không gian nuôi dưỡng thanh bình, không tạo áp lực. | Tranh minh họa tĩnh thiếu phản hồi trạng thái tương tác rõ rệt (cần bổ sung active/pressed state). |
| **6** | **Neko Atsume: Kitty Collector**<br>*(Hit-Point Co., Ltd.)* | [hit-point.co.jp/nekoatsume](https://www.hit-point.co.jp/games/nekoatsume/) | Live App<br>*(iOS / Android)* | Chăm sóc nhàn rỗi & Lưu niệm | **Vòng lặp thu hoạch không trừng phạt (Zero FOMO):** Đặt vật phẩm/thức ăn, thú ghé thăm và để lại quà/tinh chất; thú không bao giờ chết hay đói phạt khi người chơi bận rộn. | Tốc độ tiến độ giai đoạn đầu quá chậm nếu người chơi muốn chủ động cày cuốc. |
| **7** | **Duolingo Path & Streak**<br>*(Duolingo, Inc.)* | [duolingo.com](https://www.duolingo.com) | Live App<br>*(Web / Mobile)* | Lộ trình uốn lượn & Giữ chân | **Đường tiến trình Waypoint uốn cong trực quan:** Nút CTA tiếp theo luôn nổi bật ở đáy; hiệu ứng ăn mừng tức thì khi hoàn tất chặng; hiển thị chuỗi ngày liên tục. | Cơ chế đe dọa mất chuỗi (guilt-tripping notifications) và ép mua tính năng bảo vệ chuỗi gây căng thẳng. |
| **8** | **Monster Hunter Now**<br>*(Niantic / Capcom)* | [monsterhunternow.com](https://monsterhunternow.com/en) | Live App<br>*(iOS / Android)* | Săn quái & Công thức chế tạo | **Đánh dấu mục tiêu săn từ xa (Paintball) & Cây công thức:** Cho phép gắn thẻ quái để giải quyết lúc rảnh rỗi tại nhà; giao diện nâng cấp hiển thị trực tiếp nguyên liệu còn thiếu. | Bộ đếm thời gian gấp gáp ép người dùng phải thao tác khi đang di chuyển ngoài đường nguy hiểm. |
| **9** | **Parallel TCG — Sanctuary**<br>*(Parallel Studios)* | [parallel.life](https://parallel.life) | Live Web3 App | Quản lý thẻ bài & Tiến hóa | **Minh bạch số dư bản sao và cảnh báo tiêu thụ:** Thẻ bài hiển thị rõ số lượng sở hữu; hộp thoại xác nhận tiến hóa cảnh báo rõ rệt khi người dùng sắp đốt bản sao cuối cùng. | Biệt ngữ Web3 (gas, token standard, allowance) xuất hiện tràn lan làm người chơi đại chúng hoang mang. |
| **10** | **Tabikaeru (Travel Frog)**<br>*(Hit-Point Co., Ltd.)* | [hit-point.co.jp/tabikaeru](https://www.hit-point.co.jp/games/tabikaeru/) | Live App<br>*(iOS / Android)* | Viễn chinh & Bưu thiếp thu thập | **Thu hoạch Tinh chất tự nhiên & Album kỷ niệm:** Cỏ ba lá sinh ra theo chu kỳ thời gian để thu hoạch; ếch đi du ngoạn mang về bưu thiếp và tem đánh dấu vùng đất mới. | Người chơi hoàn toàn mất kiểm soát trong thời gian thú đi vắng quá lâu mà không có nội dung phụ. |

---

### 6.2 So sánh Chi tiết 3 Hướng Mỹ thuật (Art Directions Comparison)

Dựa trên 3 tài liệu cảm hứng người dùng cung cấp kết hợp tài nguyên 32 ảnh PNG thú cưng và 2 khung bài hiện có trong thư mục `asset source pet/`:

```
+--------------------------------------------------------------------------------------------------+
|                                     MA TRẬN SO SÁNH 3 HƯỚNG MỸ THUẬT                             |
+----------------------+-----------------------------+-----------------------------+---------------+
| Tiêu chí             | Hướng 1: Sổ tay Du khảo     | Hướng 2: Hang động Dạ quang | Hướng 3: Đảo Bay Lơ lửng      |
|                      | (Explorer's Field Guide)    | (Glowing Waypoints)         | (Whimsical Haven)            |
+----------------------+-----------------------------+-----------------------------+---------------+
| Cảm hứng đầu vào     | Image 3 (Genshin Guide)     | Image 1 (Ali Hamza Map)     | Image 2 (Running Ghost)       |
| Tông màu chủ đạo     | Kem ấm (#FFF8EC), Xanh rừng | Đêm sâu (#0B132B), Lam chàm | Rêu đêm (#0C2B2F), Pastel     |
|                      | (#173D35), San hô (#FF795F) | (#1C2541), Neon 4 hệ       | Hồng, Kem, Vàng dẻo           |
| Khung thẻ bài & Art  | Khớp 100% common/rare frame | Cần thêm viền dạ quang      | Cần bóng đổ mềm (soft shadow) |
| Cảm giác trải nghiệm | Học giả, thám hiểm, trang nhã| Gaming RPG, huyền bí, cuốn  | Ấm áp, thư thái, không áp lực|
| Khả năng tiếp cận    | WCAG AA Đạt xuất sắc (nền   | Cần kiểm soát chặt độ chói  | Tương phản dịu, cần nhấn     |
| (WCAG Contrast & UI) | sáng tương phản chữ đậm)    | của màu neon trên nền tối   | viền cho các nút bấm chính    |
| Tối ưu Mobile (375px)| Rất dễ bố cục dạng thẻ/cuộn | Thanh bản đồ drawer cần gọn | Đảo bay cần co giãn responsive|
+----------------------+-----------------------------+-----------------------------+---------------+
```

#### Hướng 1: "Sổ tay Du khảo Nguyên tố" (Elemental Explorer's Field Guide) — *ĐỀ XUẤT (Recommended)*
- **Cảm hứng:** Bắt nguồn từ tài liệu `Genshin Impact Mondstadt Travel Guide (dstory.co)` (Image 3) và định hướng thương hiệu Elemental Trail trong PRD.
- **Bảng màu & Token:** Nền kem ấm `#FFF8EC`, văn bản xanh rừng thẫm `#173D35`, viền điểm xuyết bạc hà `#DCEEE1`, điểm nhấn cảnh báo/CTA màu san hô `#FF795F`, viền huy hiệu vàng đồng `#D4AF37`.
- **Ngôn ngữ thiết kế:** Giao diện mô phỏng một cuốn bách khoa thám hiểm bỏ túi với các trang bìa gấp, tem dán passport du hành, huy hiệu nguyên tố viền mỏng và các ghi chú mascot chibi dạng nhãn dán thủ công.
- **Tương thích Asset hiện có:** Hoàn hảo với 32 tệp PNG 1254×1254 và 2 khung thẻ bài `common frames.png` / `rare frames.png` (1024×1536) sẵn có trong repo.
- **Đánh giá Khả năng tiếp cận:** Độ tương phản chữ đạt chuẩn WCAG AA ($\ge 4.5:1$ cho văn bản thường và $\ge 3:1$ cho nút bấm lớn). Không gian thẻ bài thoáng đãng, thân thiện với đại chúng, xóa bỏ hoàn toàn cảm giác "cờ bạc/degen" thường thấy trong Web3.

#### Hướng 2: "Đường mòn Huyền bí & Hang động Tinh thể Dạ quang" (Mystical Waypoints & Glowing Caverns)
- **Cảm hứng:** Bắt nguồn từ tài liệu `Ali Hamza Portfolio` (Image 1).
- **Bảng màu & Token:** Nền không gian đêm sâu `#0B132B`, bề mặt hang đá `#1C2541`, kết hợp 4 dải màu neon đại diện 4 nguyên tố: Lửa đỏ cam `#FF5722`, Nước lam ngọc `#00E5FF`, Đất lục bảo `#00E676`, Khí tím thạch anh `#D500F9`.
- **Ngôn ngữ thiết kế:** Đường mòn isometric uốn lượn xuyên qua các hốc hang đá pha lê; các trạm dừng chân phát sáng rực rỡ; thanh điều hướng dưới đáy dạng "The Adventure Map Drawer" có thể trượt lên xuống linh hoạt.
- **Tương thích Asset hiện có:** Các hình ảnh thú cưng 3D có độ nổi khối tốt, nhưng cần bổ sung bộ lọc đổ bóng dạ quang (`drop-shadow(0 0 12px ...)`) để hòa nhập tự nhiên vào bối cảnh màn đêm.
- **Đánh giá Khả năng tiếp cận:** Rất kích thích thị giác game thủ; tuy nhiên cần đặc biệt thận trọng với hiện tượng mỏi mắt khi chơi lâu và phải duy trì độ tương phản văn bản phụ trên nền tối sâu.

#### Hướng 3: "Ốc đảo Bay Lơ lửng & Tinh linh Kẹo dẻo" (Whimsical Floating Haven)
- **Cảm hứng:** Bắt nguồn từ tài liệu `Running Ghost: Nightly Journey` (Image 2).
- **Bảng màu & Token:** Nền bầu trời đêm xanh rêu mờ ảo `#0C2B2F`, các mảng màu pastel dịu nhẹ: hồng phấn `#FFD1DC`, vàng kem `#FFF3B0`, xanh bạc hà mát mẻ `#C1E1C1` và trắng kẹo dẻo `#F8F9FA`.
- **Ngôn ngữ thiết kế:** Không gian nuôi dưỡng thú cưng gồm các hòn đảo bay (Floating Islands) lơ lửng giữa tầng mây; thú cưng được nhân cách hóa ngộ nghĩnh, tương tác nhàn rỗi vỗ về; viền giao diện bo tròn cực lớn (`rounded-3xl`).
- **Tương thích Asset hiện có:** Đòi hỏi các bệ đỡ đảo bay được thiết kế đồng bộ theo phong cách phẳng (flat/vector) mềm mại, cần bổ sung hiệu ứng đổ bóng mềm để dung hòa giữa chất liệu 3D render của thú và bối cảnh vector.
- **Đánh giá Khả năng tiếp cận:** Mang lại cảm xúc thư giãn tột độ, cực kỳ thích hợp cho tệp người chơi yêu thích dòng game cozy/chữa lành; tuy nhiên tính định hướng tiến độ phiêu lưu có phần giảm sút so với dạng đường mòn.

#### Kết luận & Phương án Khuyên dùng:
> **Khuyến nghị phối hợp:** Sử dụng **Hướng 1 (Field Guide)** làm ngôn ngữ mỹ thuật nền tảng cho toàn bộ hệ thống Bách khoa Thú cưng (Bestiary), Quản lý Thẻ bài và Bàn thờ Tiến hóa; đồng thời tích hợp **thanh điều hướng "The Adventure Map" và các trạm Waypoint dạ quang uốn lượn từ Hướng 2** vào phân hệ Bản đồ khám phá trực tuyến. Sự kết hợp này mang lại trải nghiệm phiêu lưu kỳ thú nhưng vẫn đảm bảo tính khoa học, chuẩn mực và tiện dụng của một hệ thống quản lý tài sản dài hạn.

---

### 6.3 Chu trình Trải nghiệm 5 Bước Tinh gọn (Core 5-Step Loop)

Quy trình chơi được tinh gọn tối đa thành 5 bước trực quan, loại bỏ các sơ đồ rườm rà:

```
[1. SĂN THÚ (/hunt)] ──> Bắt Pet qua Online Trail (Ở nhà) HOẶC Event GPS (Tại sự kiện)
          │
          ▼
[2. KHO THÚ (/vault)] ──> Quản lý Túi đồ bản sao (ERC-1155) & Bách khoa (Mở khóa vĩnh viễn)
          │
          ▼
[3. CHĂM NUÔI (/nest)] ──> Gửi thú vào Ốc đảo ──> Tự sinh Tinh chất (Essence) theo thời gian
          │
          ▼
[4. TIẾN HÓA (/evolve)] ──> Ghép 2 Pet + Tinh chất ──> Lên cấp Pet mới (Ember Sprite → Flare Fox)
          │
          ▼
[5. PHẦN THƯỞNG (/reward)] ──> Nhận chứng nhận Avalanche ICM ──> Mở khóa Vùng đất mới (Sandbox B)
```

#### 4 Nguyên tắc Cốt lõi:
1. **Lối chơi Kép: Chơi Lâu Dài & Sự Kiện Thực Tế:**
   - *Online Trail:* Chơi mỗi ngày tại nhà bằng Năng lượng hồi phục.
   - *Event GPS Hunt:* Mở radar GPS khi tham gia các sự kiện (Hackathon Avalanche, Booth hội thảo) để săn các loài **Linh thú Nguyên tố Mới** và Pet Collab độc quyền.
   - *Hỗ trợ GPS Vật lý:* Cung cấp GPS thực tế trên thiết bị; bản demo có thêm nút gạt **"Mock GPS / Test Coordinates"** để kiểm thử ngay mà không cần ra đường.
2. **Sở hữu tách biệt với Khám phá (Ownership vs Discovery):** Bản sao thú (ERC-1155) có thể bị tiêu thụ khi tiến hóa, nhưng mục Bách khoa (Bestiary) một khi đã mở khóa sẽ lưu giữ vĩnh viễn.
3. **Cảnh báo Bản sao Cuối cùng (Last-Copy Safeguard):** Hộp thoại nhắc nhở an toàn nếu người chơi chuẩn bị ghép bản sao duy nhất còn lại của một loài thú.
4. **Không bao giờ có đường cụt (Zero Dead-Ends):** Mọi trạng thái lỗi, hết năng lượng hay rỗng đều có nút hành động đưa người chơi trở lại màn hình chính.

---

### 6.4 Đặc tả 5 Màn hình Mobile Tinh gọn & Trực quan

```
+--------------------------------------------------------------------------------------------------+
| MÀN 1: SĂN THÚ (/hunt)                                                                           |
+--------------------------------------------------------------------------------------------------+
| [Header] Săn Thú ========================================= [Năng Lượng: 3/3] [Tinh Chất: 14]     |
|                                                                                                  |
| [CHẾ ĐỘ SĂN]   (•) Online Trail (Tại nhà)          ( ) Sự Kiện GPS (Tại chỗ)                     |
| ──────────────────────────────────────────────────────────────────────────────────────────────── |
|                                                                                                  |
| [Tab Online]: Đường mòn Waypoint dạ quang                                                        |
|   (Trạm 1: Đã xong) ───> [Trạm 2: Suối Bạc (Sẵn sàng)] ───> (Trạm 3: Đang khóa)                  |
|                                                                                                  |
| [Tab Sự Kiện GPS]: Radar Quét Tọa Độ Thực Tế                                                    |
|   - Tọa độ hiện tại: 10.7769° N, 106.7009° E (Đã bật GPS thiết bị)                              |
|   - Trạm sự kiện gần nhất: [ Booth Avalanche Build Web3 ] (Cách 18m - ĐỦ ĐIỀU KIỆN CHECK-IN)      |
|   - Linh thú độc quyền phát hiện: [ Ảnh: Avalanche Pet #501 ] (Hệ Băng) HOẶC [ KHTN Pet #701 ] / [ Greenwich Pet #801 ] |
|   - [Nút Demo Tool]: (✓) Bật Tọa Độ Mẫu Để Test Nhanh (Mock GPS)                                 |
|                                                                                                  |
| ──────────────────────────────────────────────────────────────────────────────────────────────── |
| [Thanh Đáy]                                                                                      |
|   [ CTA CHÍNH: BẮT LINH THÚ NÀY (Hao 1 Năng Lượng / Check-in GPS) ]                              |
|   [ CTA PHỤ: Bỏ qua / Xem chi tiết loài ]                                                        |
+--------------------------------------------------------------------------------------------------+
```
- **CTA Chính:** "Bắt Linh Thú Này" (Online: tốn 1 Năng lượng; Sự kiện: kích hoạt Check-in GPS).
- **Trạng thái:**
  - *Default:* Sẵn sàng bắt thú.
  - *Loading:* Radar đang quét sóng / Đang lấy tín hiệu GPS.
  - *Empty:* Đã săn hết trạm hôm nay (hiển thị bộ đếm giờ hồi phục).
  - *GPS Out of Range (Sự kiện):* Ở cách trạm sự kiện quá xa ($>50$m); hiển thị thông báo "Hãy tiến lại gần gian hàng sự kiện để bắt thú" kèm nút "Bật Mock GPS để test".
  - *Error:* Mất kết nối mạng hoặc người dùng chặn quyền vị trí (hiển thị nút "Bật định vị").

```
+--------------------------------------------------------------------------------------------------+
| MÀN 2: KHO THÚ (/vault)                                                                          |
+--------------------------------------------------------------------------------------------------+
| [Header] Kho Thú ────────────────────────────────────────── [Bách Khoa: 5/16] [Bản Sao: 4 Thú]   |
|                                                                                                  |
| [TABS]   [ Túi Đồ Bản Sao (Owned: 4) ]          |          [ Bách Khoa Vĩnh Viễn (Dex: 5) ]      |
| ──────────────────────────────────────────────────────────────────────────────────────────────── |
| [Lưới 2 Cột Thẻ Bài]                                                                            |
|  +---------------------------+  +---------------------------+                                    |
|  | [Thẻ Ember Sprite]        |  | [Thẻ Flare Fox (Rare)]    |                                    |
|  | Hệ: Lửa | Bản sao: x2     |  | Hệ: Lửa | Bản sao: x1     |                                    |
|  | [Badge: Đang Chăm Sóc]    |  | [Badge: Đã Tiến Hóa]      |                                    |
|  +---------------------------+  +---------------------------+                                    |
|  +---------------------------+  +---------------------------+                                    |
|  | [Thẻ Aqua Drop]           |  | [Ô Khóa: ???]             |                                    |
|  | Hệ: Nước | Bản sao: x0    |  | "Săn tại Sự Kiện Mùa Đông"|                                    |
|  | [Badge: Đã Mở Khóa Dex]   |  | (Chưa mở khóa)            |                                    |
|  +---------------------------+  +---------------------------+                                    |
|                                                                                                  |
| [Nút Đáy: Đến Bàn Thờ Tiến Hóa (1 Công Thức Sẵn Sàng)]                                           |
+--------------------------------------------------------------------------------------------------+
```
- **CTA Chính:** Chạm thẻ để xem chỉ số & câu chuyện linh thú.
- **Trạng thái:** *Default* (đầy đủ); *Loading* (khung xương thẻ); *Empty* (chưa có thú nào $\to$ nút "Đi Săn Ngay").

```
+--------------------------------------------------------------------------------------------------+
| MÀN 3: CHĂM NUÔI (/nest)                                                                         |
+--------------------------------------------------------------------------------------------------+
| [Header] Chăm Nuôi ──────────────────────────────────── [Bình Chứa: 14/50 Tinh Chất] (+2/giờ)     |
|                                                                                                  |
|    (~) Cảnh Quan Ốc Đảo Sinh Thái (Whimsical Sanctuary)                                          |
|                                                                                                  |
|            [ Ốc Đảo Núi Lửa ]                 [ Vườn Gió Nhẹ ]                                   |
|           +----------------------+           +----------------------+                            |
|           | [Ảnh: Ember Sprite]  |           | (Ô Trống)            |                            |
|           | Đang tích lũy: +6    |           | Chạm để đặt thú vào  |                            |
|           +----------------------+           +----------------------+                            |
|                                                                                                  |
| ──────────────────────────────────────────────────────────────────────────────────────────────── |
|   Tổng Tinh chất sẵn sàng thu hoạch: +6 Tinh chất Lửa                                            |
|   [ CTA CHÍNH: THU HOẠCH TẤT CẢ (+6) ]                                                           |
|   [ CTA PHỤ: Đổi Thú Khác ]                                                                      |
+--------------------------------------------------------------------------------------------------+
```
- **CTA Chính:** "Thu Hoạch Tất Cả" (gom nhanh toàn bộ tinh chất tích lũy).
- **Trạng thái:** *Default* (đang sinh tinh chất); *Empty* (chưa đặt thú nào $\to$ nút "Đặt thú vào"); *Full* (bình đầy $50/50 \to$ nhấp nháy nhắc thu hoạch).

```
+--------------------------------------------------------------------------------------------------+
| MÀN 4: TIẾN HÓA (/evolve)                                                                        |
+--------------------------------------------------------------------------------------------------+
| [Header] Tiến Hóa ────────────────────────────────────────────────── [Mục Tiêu: Flare Fox #102]   |
|                                                                                                  |
|       [ Ảnh Flare Fox (Hào quang viền vàng) ] - "Hồ Ly Lửa Thần Tốc"                             |
|                                                                                                  |
| ──────────────────────────────────────────────────────────────────────────────────────────────── |
| [Nguyên Liệu Yêu Cầu]                                                                            |
|   - 2 Bản sao Ember Sprite:    [x] [x] (Đủ 2/2)                                                  |
|   - 8 Tinh chất Lửa:           [ 8 / 8 ] (Đủ điều kiện)                                          |
|                                                                                                  |
| (!) Lưu ý an toàn: 2 bản sao Ember Sprite sẽ được ghép thành 1 Flare Fox.                        |
|     Mục Bách Khoa (Dex) của Ember Sprite vẫn được bảo lưu vĩnh viễn!                             |
|                                                                                                  |
|   [ CTA CHÍNH: TIẾN HÀNH TIẾN HÓA (GHÉP THÚ) ]                                                   |
|   [ CTA PHỤ: Đổi công thức khác ]                                                                |
+--------------------------------------------------------------------------------------------------+
```
- **CTA Chính:** "Tiến Hành Tiến Hóa" (Ghép 2 bản sao thành loài mới).
- **Trạng thái:** *Ready* (đủ nguyên liệu); *Insufficient* (thiếu thú hoặc tinh chất $\to$ nút xám kèm hướng dẫn "Đi săn thêm" hoặc "Đi chăm nuôi"); *Last-Copy Modal* (hộp thoại cảnh báo xác nhận nếu tiêu thụ bản sao cuối cùng).

```
+--------------------------------------------------------------------------------------------------+
| MÀN 5: PHẦN THƯỞNG (/reward)                                                                     |
+--------------------------------------------------------------------------------------------------+
| [Header] Phần Thưởng & Quyền Lợi ──────────────────────── [Game L1 <──ICM──> Avalanche C-Chain]  |
|                                                                                                  |
| [Thành Tựu Hoàn Thành]                                                                           |
|   Đã tiến hóa thành công: Flare Fox #102                                                         |
|   Chứng chỉ liên chuỗi (ICM Entitlement): [ ĐÃ XÁC NHẬN TRÊN C-CHAIN ]                            |
|                                                                                                  |
| ──────────────────────────────────────────────────────────────────────────────────────────────── |
| [Cổng Vào Vùng Đất Mới (Sandbox B)]                                                              |
|   Trạng thái: [ ĐÃ MỞ KHÓA - SẴN SÀNG ]                                                          |
|                                                                                                  |
|   [ CTA CHÍNH: BƯỚC VÀO VÙNG ĐẤT MỚI (SANDBOX B) ]                                               |
|   [ CTA PHỤ: Xem biên lai giao dịch ICM ]                                                        |
+--------------------------------------------------------------------------------------------------+
```
- **CTA Chính:** "Bước Vào Vùng Đất Mới (Sandbox B)" (Sử dụng quyền lợi đã mở khóa).
- **Trạng thái:** *Unlocked* (sẵn sàng truy cập); *Claiming* (thanh tiến trình truyền tin ICM Game L1 $\to$ C-Chain); *Locked* (chưa tiến hóa Flare Fox $\to$ nút "Đến bàn thờ tiến hóa").
