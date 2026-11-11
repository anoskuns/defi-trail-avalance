# Elemental Trail — Asset Guide & Catalog Manual

Tài liệu hướng dẫn tra cứu và trích xuất dữ liệu tài nguyên đồ họa cho cả **Lập trình viên** và **AI Assistants**.

---

## 1. Tệp Danh mục Chuẩn hóa Máy đọc (Machine-Readable Catalog)

Toàn bộ **240 tệp tài nguyên** trong thư mục này đã được lập chỉ mục và phân loại đầy đủ tại:
👉 [`asset/asset_catalog.json`](asset_catalog.json) (được đồng bộ tại [`packages/shared/src/constants/assetCatalog.json`](../packages/shared/src/constants/assetCatalog.json)).

### Cấu trúc truy vấn nhanh cho AI:
- `meta`: Tổng quan dự án, quy ước đường dẫn runtime (`/assets/...`).
- `groups`: Danh sách chi tiết theo từng nhóm tài nguyên (pets, frames, ui_gameplay, elemental_emblems_3d, svg_types, backgrounds, materials, etc.).
- `indexes`:
  - `indexes.bySpeciesCode["101"]`: Truy xuất thẳng linh thú theo mã số (101 -> Ember Sprite, 102 -> Flare Fox, etc.).
  - `indexes.byElement["fire"]`: Lấy toàn bộ linh thú và biểu tượng thuộc hệ Lửa.
  - `indexes.byScreen["/hunt"]`: Lấy toàn bộ assets được chỉ định cho màn hình Săn Thú.
  - `indexes.integrationStatus`: Phân loại mức độ sẵn sàng đưa vào ứng dụng.

---

## 2. Phân loại Tài nguyên Đưa vào Dự án (Asset Classification)

### Nhóm A: Tài nguyên Cốt lõi Sẵn sàng Production (`core_production_ready`) — 39 tệp
1. **16 Linh thú Nguyên tố (`asset/art/`):**
   - **4 Linh thú Khởi đầu (Starters):**
     - `#101`: `fire_s1_normal.png` (Ember Sprite - Hệ Lửa)
     - `#201`: `water_s1_normal.png` (Aqua Drop - Hệ Nước)
     - `#301`: `earth_s1_normal.png` (Mossy Pebble - Hệ Đất)
     - `#401`: `wind_s1_normal.png` (Zephyr Cloud - Hệ Khí)
   - **8 Linh thú Tiến hóa:**
     - `#102` (`fire_s2_normal.png` - Flare Fox) & `#103` (`fire_s3_normal.png` - Pyromane Lion)
     - `#202` (`water_s2_normal.png` - Crested Shark) & `#203` (`water_s3_normal.png` - Tidal Serpent)
     - `#302` (`earth_s2_normal.png` - Boulder Boar) & `#303` (`earth_s3_normal.png` - Quartz Gorilla)
     - `#402` (`wind_s2_normal.png` - Gale Hawk) & `#403` (`wind_s3_normal.png` - Storm Griffin)
   - **3 Linh thú Độc quyền Sự kiện GPS (Event GPS Hunt & Collab):**
     - `#501`: `ice_s1_normal.png` (Avalanche Pet - Hệ Băng / Đại diện sự kiện Avalanche Build Web3)
     - `#701`: `lightning_s1_normal.png` (KHTN Pet - Hệ Sét / Đối tác ĐH Khoa học Tự nhiên HCMUS)
     - `#801`: `nature_s1_normal.png` (Greenwich Pet - Hệ Thảo Mộc / Đối tác ĐH Greenwich Việt Nam)
     - *(Dự trữ Mùa 2)*: `#601` `magma_s1_normal.png` (Emberstone - Hệ Dung Nham)
2. **Khung thẻ bài & Thẻ úp (`asset/frame/` & `asset/fallback/`):**
   - `common frames.png`: Khung viền cho thú thường (Stage 1).
   - `rare frames.png`: Khung viền vàng lấp lánh cho thú tiến hóa và thú sự kiện.
   - `card-back.png`: Mặt sau thẻ bài cho trạng thái thú chưa mở khóa trong bách khoa.
3. **Biểu tượng Gameplay Cốt lõi (`asset/ui/`):**
   - `essence.png`: Bình Tinh chất (dùng cho Ốc đảo Chăm Nuôi và Bàn thờ Tiến hóa).
   - `craft.png`: Bàn thờ chế tạo / Bệ tiến hóa.
   - `cage.png`: Biểu tượng gửi nuôi / custody trong ốc đảo.
   - `voucher.png`: Chứng chỉ quyền lợi sự kiện / phiếu thưởng liên chuỗi Avalanche ICM.
4. **Huy hiệu 3D 8 Hệ Nguyên tố (`asset/icons-raster-reference/`):**
   - `fire.png`, `water.png`, `earth.png`, `wind.png`, `ice.png`, `lightning.png`, `magma.png`, `nature.png`.
5. **Banner Trang Chủ (`asset/landing/hero.png`):**
   - Dùng cho màn hình giới thiệu (Landing page).

---

### Nhóm B: Tài nguyên Vector SVG Siêu Nhẹ cho Giao diện (`ui_vector_lightweight`) — 40 tệp
- `asset/svg/types/*.svg` (18 tệp): Icon vector phẳng cho tất cả các hệ nguyên tố. Dung lượng cực nhẹ (~300 - 800 bytes/file), thích hợp làm tab lọc, huy hiệu nhỏ cạnh tên thú.
- `asset/svg/types/badge/*.svg` (18 tệp): Biểu tượng dạng huy hiệu tròn viền sắc nét.
- `asset/svg/search-button.svg`, `sync-button.svg`: Nút tìm kiếm và đồng bộ dữ liệu giao diện.

---

### Nhóm C: Phông nền & Tinh thạch Sự kiện (`ambient_backgrounds` & `event_materials`) — 10 tệp
1. **Phông nền Không gian (`Background_Liyue.jpg`, `Background_Liyue_2.jpg`):**
   - Dùng làm ảnh nền cuộn cho bản đồ **Săn Thú (`/hunt`)** và không gian **Ốc đảo Nuôi Dưỡng (`/nest`)**.
2. **Vật phẩm & Tinh thạch Sự kiện (`Item_*.png`):**
   - `Item_Crystalline_Bloom.png`, `Item_Lightning_Prism.png`, `Item_Dew_of_Repudiation.png`, `Item_Lightless_Mass.png`,...
   - Rất phù hợp làm **Vật phẩm Rơi Ngẫu Nhiên (Loot Drops)** khi người chơi check-in thành công tại các trạm Sự kiện GPS hoặc nguyên liệu đặc thù cho các công thức chế tạo cao cấp.

---

### Nhóm D: Biểu tượng Tham khảo & Chỉ Dùng Trong Bản Demo (`reference_and_dev_only`)
- `pokeball.svg`, `pokedollar.svg`, `Weapon_*.png`: Dùng làm dữ liệu mẫu (mock items/placeholders) trong giai đoạn phát triển và demo hackathon; cần đổi tên và thay thế đồ họa trước khi phát hành thương mại.

---

## 3. Cách AI Trích Xuất Dữ liệu từ Catalog

Khi cần lấy asset cho code TypeScript hoặc Next.js:

```typescript
import assetCatalog from '@defi-trail/shared/src/constants/assetCatalog.json';

// 1. Tìm thông tin linh thú theo mã số:
const flareFox = assetCatalog.indexes.bySpeciesCode["102"];
console.log(flareFox.runtimePath); // Output: "/assets/art/fire_s2_normal.png"

// 2. Lấy toàn bộ asset phục vụ màn hình Săn Thú:
const huntAssets = assetCatalog.indexes.byScreen["/hunt"];

// 3. Lấy huy hiệu vector SVG của hệ Lửa:
const fireBadgeSvg = assetCatalog.groups.svg_types_badge.find(item => item.element === "fire");
```
