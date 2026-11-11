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

### Decision register — chưa được tự điền thành Accepted

| ID | Cần chốt | Phần phụ thuộc | Phương án để thảo luận, chưa phê duyệt |
|---|---|---|---|
| D01 | Nguồn pet online/cadence/quota | acquisition, source/sink | Bản đồ khám phá ảo hoặc expedition |
| D02 | Số bản sao và chi phí tiến hóa | recipe, tests, contract | Baseline 2 Ember + 8 Essence chỉ để tham khảo |
| D03 | Essence dài hạn/theo mùa, issuance/cap/sink, offline, kết mùa | chăm, ledger, economy | Không kéo nguyên trần event 160 thành farm vĩnh viễn |
| D04 | Utility mở gì, ownership/achievement, tiêu hao hay giữ | access, reward | Mở tuyến khám phá B là đề xuất |
| D05 | Collab acquisition, thời gian/supply, tên/art | collab | Không tự hứa sponsor hoặc scarcity |
| D06 | Navigation, art direction | UI | Khám phá/Bộ sưu tập/Chăm thú/Sự kiện là đề xuất |
| D07 | Stable asset identity, transfer policy, migration nếu có | contracts, DB | ERC-1155, tách asset khỏi campaign |

Hỏi quyết định cần thiết theo nhóm nhỏ, đưa lựa chọn và tác động. Không hỏi lại Accepted.
Có thể tiếp tục audit/research/baseline và interface độc lập khi quyết định khác còn mở.
Không implement luật production bằng giá trị tạm; fixture local phải có nhãn và phạm vi.

### Ngoài scope demo

Combat, marketplace/P2P, cash-out, paid pass, toàn bộ hệ daily/weekly/season,
mười cấp rarity, phát hành token tài chính và pilot quà vật lý đông người.
Voucher/operator vật lý chỉ thêm khi scope được mở rõ; utility số không bắt buộc có chúng.

## 3. Trải nghiệm và dữ liệu cốt lõi

### Màn hình

- Landing: thế giới, bộ thú, vòng chơi, CTA; không hứa quà chắc chắn.
- Onboarding: identity/starter theo policy, chọn mục tiêu khám phá.
- Khám phá online: hoạt động nhận bản sao; event location là chế độ riêng.
- Collection: loài đã khám phá và số đang có; lịch sử acquisition.
- Chăm thú: slot, rate, tài nguyên tích lũy, thu/rút theo policy.
- Tiến hóa: đầu vào, số khả dụng/custody, chi phí, đầu ra và confirm.
- Campaign hub: mục tiêu, progress miễn phí, collab, reward và điều kiện.
- Reward: ký/gửi/pending/accepted/rejected/finalized, retry đúng request.
- Nội dung B: kiểm tra utility thật; Coming next season ghi rõ dự kiến.

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

Open: D01–D07 theo mục 3, trừ các phần Accepted đã ghi.
Chưa chốt giới hạn collab; chưa tự đặt cadence/rate/recipe cost.
Lịch sử docs trước đây ghi HEAD 73cfc3e; v0.0 phải kiểm tra lại hiện trạng.

Trong đợt tổng hợp: chỉ cập nhật tài liệu/rules, chưa code gameplay,
chưa chạy baseline app/contract, chưa tạo commit, chưa deploy.
Kết quả asset đã có: 32 PNG/16 art, đối chiếu tên và decode được.
Các entry mới trong Decision log của PRD cần nêu ngày, quyết định, Proposed/Accepted và nguồn xác nhận.
