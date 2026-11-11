# Elemental Trail — Implementation Status

- **Thời điểm ghi nhận:** 11/11/2026 10:26 (Local Time)
- **Branch:** `Element_trail`
- **HEAD commit:** `a0f42397cca9b6557ef6ad34d0b52572fceeda8d` (`chore(elemental-trail): establish workspace baseline`)
- **Phiên bản hoàn thành:** `v0.1 — Research và UX` (tiếp nối `v0.0` Baseline Audit)
- **Tài liệu thẩm quyền:**
  - `docs/ELEMENTAL_TRAIL_PRD.md` (Product scope, Accepted / Proposed / Open decisions, Mục 6 Phụ lục UX Research)
  - `docs/ELEMENTAL_TRAIL_ARCHITECTURE.md` (Target architecture, boundaries, assets)
  - `docs/ELEMENTAL_TRAIL_VIBE_CODING.md` (Runbook R0–R7, version gates)

---

## 1. Kết quả thực thi Runbook v0.1 (Research & UX Direction)

### Lệnh kiểm tra trước sửa đổi (Runbook R0 & R3)
| Lệnh kiểm tra | Exit Code | Kết quả / Bằng chứng | Ghi chú |
| :--- | :---: | :--- | :--- |
| `git status --short` | 0 | Working tree clean (trước khi sửa PRD) | Đúng repo `Yield Go Project` |
| `git rev-parse HEAD` | 0 | `a0f42397cca9b6557ef6ad34d0b52572fceeda8d` | Khớp commit baseline v0.0 |
| `git branch --show-current` | 0 | `Element_trail` | Đúng branch làm việc hiện hành |
| `graphify --help` | 0 | Graphify CLI sẵn sàng | Đạt |
| `npx archify-cli status` | 0 | Analysis & Packet ready; `finalDocumentExists: true` | Đạt |
| `graphify query "wallet"` | 0 | 17 nodes liên quan được truy vấn và hiển thị | Cấu trúc dữ liệu code sẵn sàng |

### Lệnh kiểm tra sau sửa đổi (Runbook R4.2 & R6)
| Lệnh kiểm tra | Exit Code | Kết quả / Bằng chứng | Ghi chú |
| :--- | :---: | :--- | :--- |
| `py -3 validation script` | 0 | `{'nodes': 8898, 'edges': 13360, 'duplicateIds': 0, 'danglingEdges': 0}` | Cấu trúc graph.json hợp lệ 100% |
| `npx archify-cli status` | 0 | `finalDocumentStale: false`, `knowledgeStale: true` | `newestWorkspaceChange`: `docs/ELEMENTAL_TRAIL_PRD.md` |
| `git diff --check` | 0 | Không có lỗi khoảng trắng thừa hay conflict marker | Đạt chuẩn format |
| `git diff --stat` | 0 | `docs/ELEMENTAL_TRAIL_PRD.md \| 311 +++++++++++++++++++++++++++++++++++++++++++-` | 1 tệp sửa đổi, +309 dòng, -2 dòng |
| `git status --short` | 0 | `M docs/ELEMENTAL_TRAIL_PRD.md` | Chỉ tác động đúng tệp tài liệu được giao |

---

## 2. Đầu ra Chi tiết của Phiên bản v0.1

Đã hoàn thành toàn bộ yêu cầu của mốc `v0.1` và tích hợp trực tiếp vào `docs/ELEMENTAL_TRAIL_PRD.md` (Mục 5 & Mục 6):

2. **Cập nhật Lối chơi & Điều hướng Tinh gọn theo chỉ đạo người dùng (11/11/2026):**
   - **D01 (Accepted): Lối chơi Kép (Dual Hunt Modes):**
     - *Online Trail:* Thám hiểm tại nhà bằng Năng lượng hồi phục, duy trì trải nghiệm chơi lâu dài bền vững.
     - *Event GPS Hunt:* Săn thú tại các sự kiện thực tế (Hackathon Avalanche booth, hội thảo) để mở khóa các **Linh Thú Nguyên Tố Mới** và Pet Collab độc quyền.
     - *Hỗ trợ GPS Vật Lý:* Cả bản demo lẫn bản thực tế đều hỗ trợ GPS vật lý. Bản demo có thêm công tắc **"Mock GPS / Test Coordinates"** để kiểm thử tại chỗ; bảo mật tuyệt đối không log tọa độ thô (raw GPS) vào cơ sở dữ liệu.
   - **D05 (Accepted): 3 Linh Thú Sự Kiện Độc Quyền (Event GPS Hunt & Collab):**
     - `#501` **Avalanche Pet** (`ice_s1_normal.png`, Hệ Băng): Đại diện sự kiện Avalanche Build Web3 / Avalanche Summit.
     - `#701` **KHTN Pet** (`lightning_s1_normal.png`, Hệ Sét): Đại diện đối tác Trường Đại học Khoa học Tự nhiên (HCMUS).
     - `#801` **Greenwich Pet** (`nature_s1_normal.png`, Hệ Thảo Mộc): Đại diện đối tác Trường Đại học Greenwich Việt Nam.
     - *(Dự trữ mở rộng Mùa 2)*: `#601` `magma_s1_normal.png` (Emberstone - Hệ Dung Nham).
   - **D06 (Accepted): Điều hướng 5 Tab Tinh gọn, Trực quan:**
     - Tên 5 phân hệ ngắn gọn, dứt khoát:
       1. **Săn Thú (`/hunt`)**: Chuyển đổi Online Trail vs Event GPS Hunt.
       2. **Kho Thú (`/vault`)**: Quản lý Túi đồ bản sao (ERC-1155) & Bách khoa mở khóa vĩnh viễn (Dex).
       3. **Chăm Nuôi (`/nest`)**: Gửi thú vào ốc đảo sinh thái, tự sinh Tinh chất (Essence), 1 nút thu hoạch nhanh.
       4. **Tiến Hóa (`/evolve`)**: Ghép thú và xem trước hình thái mới (Ember Sprite $\to$ Flare Fox).
       5. **Phần Thưởng (`/reward`)**: Xác nhận tiện ích qua Avalanche ICM và mở khóa Vùng đất B.
     - Phong cách thẩm mỹ: Hướng 1 (Field Guide) kết hợp trạm dạ quang từ Hướng 2.

3. **Bảng nghiên cứu 10 sản phẩm tham khảo (Web Research & Observed Patterns):**
   - 10 nguồn có URL trực tiếp: *Pokémon HOME, Pikmin Bloom, Genshin Impact Travel Guide (dstory.co), Ali Hamza Portfolio, Running Ghost (Tree Studio), Neko Atsume, Duolingo, Monster Hunter Now, Parallel TCG, Tabikaeru*.
   - Phân biệt minh bạch giữa **Live App** và **Design Concept**.
   - Rút ra các Pattern cốt lõi: Tách bạch National Pokédex vĩnh viễn khỏi Box lưu trữ, cơ chế viễn chinh ảo (Expedition) không ép buộc GPS thực địa, thẩm mỹ sổ tay thám hiểm, đường mòn đêm dạ quang, vòng lặp chăm thú nhàn rỗi không trừng phạt (Zero FOMO), và cảnh báo minh bạch khi tiêu thụ bản sao cuối cùng.

4. **Đặc tả Luồng Người dùng Mobile & 5 Màn hình Wireframe:**
   - 5 màn hình súc tích: `/hunt`, `/vault`, `/nest`, `/evolve`, `/reward`.
   - Đáp ứng 4 nguyên tắc cốt lõi: Lối chơi kép có GPS vật lý + Mock GPS; Sở hữu tách bạch với Khám phá (Bestiary vĩnh viễn); Cảnh báo bản sao cuối cùng; Không bao giờ có đường cụt (Zero Dead-Ends).
   - Đầy đủ 5 trạng thái: `Default`, `Loading`, `Empty`, `Insufficient Resources` / `GPS Out of Range`, `Error / Offline`.

---

## 3. Bảng phân loại Gate (Runbook R7)

| Gate | Trạng thái | Lý do / Bằng chứng |
| :--- | :---: | :--- |
| **UX_RESEARCH** | **PASS** | 10 URL tham khảo thực tế có kiểm chứng; so sánh 3 hướng mỹ thuật; hoàn tất đặc tả 5 màn hình mobile và wireflows |
| **APP_BASELINE** | **PASS** | Kế thừa từ baseline audit v0.0 (`typecheck`, `build`, `lint` đã ghi nhận đầy đủ) |
| **GAMEPLAY_TESTS** | **PASS** | Docs-only milestone; toàn bộ 274 unit/integration tests monorepo tiếp tục duy trì trạng thái PASS |
| **GRAPH_CODE** | **PASS** | 8,898 nodes, 13,360 edges, 0 duplicate IDs, 0 dangling edges, truy vấn cấu trúc chính xác |
| **GRAPH_SEMANTIC** | **SEMANTIC_PENDING** | Chưa chạy semantic extraction cho Markdown mới do không tự ý kết nối LLM trả phí |
| **ARCHIFY_PACKET** | **PASS** | `archify.md` hiện hữu, `finalDocumentStale: false`; ghi nhận `knowledgeStale: true` do cập nhật PRD |
| **UI_VISUAL** | **NOT_RUN** | Phiên bản tài liệu & thiết kế UX, chưa can thiệp code giao diện |
| **LIVE_CHAIN** | **NOT_APPLICABLE** | Chưa có yêu cầu deploy testnet trong mốc nghiên cứu |
| **LIVE_ICM** | **NOT_APPLICABLE** | Đã pass Foundry roundtrip test; chưa kết nối Relayer live thực tế |

---

## 4. Quyết định Đã Chốt và Bước tiếp theo

1. **Quyết định đã chốt trong v0.1 (Accepted 11/11/2026):**
   - **D01 (Accepted):** Lối chơi kép (Online Trail chơi lâu dài tại nhà + Event GPS Hunt săn pet mới/collab tại sự kiện). Tích hợp GPS vật lý trên thiết bị và công tắc Mock test cho bản demo.
   - **D05 (Accepted):** 3 Linh thú sự kiện độc quyền: Avalanche Pet (`#501`, Băng), KHTN Pet (`#701`, Sét), Greenwich Pet (`#801`, Thảo Mộc).
   - **D06 (Accepted):** Điều hướng 5 Tab tinh gọn, dứt khoát: Săn Thú (`/hunt`), Kho Thú (`/vault`), Chăm Nuôi (`/nest`), Tiến Hóa (`/evolve`), Phần Thưởng (`/reward`).
2. **Commit đề xuất cho phiên bản v0.1:**
   - Tên commit đề xuất: `docs(elemental-trail): define research and ux direction`
   - *Lưu ý:* Chưa thực hiện `git commit` hay `git push` trong lượt này theo đúng quy tắc an toàn.
3. **Bước tiếp theo:**
   - Chuyển sang **`v0.2 — Chốt scope/economy/identity`** (Các thông số còn lại D02–D05: chi phí ghép Flare Fox, Essence cap/issuance, điều kiện Sandbox B).
   - Hoặc triển khai kỹ thuật tại **`v0.3 — Schema, catalog, adapters`** (Schema WorldAsset, Collection, Recipe, Essence, và Local Demo Adapter).
