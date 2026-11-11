# Elemental Trail — Architecture

Cập nhật 09/11/2026. Bộ tài liệu hiện hành gồm PRD, Architecture và Vibe Coding.

Đây là **thiết kế mục tiêu và bằng chứng khảo sát có giới hạn**, không phải báo cáo Archify mới.
Scope theo [PRD](ELEMENTAL_TRAIL_PRD.md); trình tự theo [Vibe Coding](ELEMENTAL_TRAIL_VIBE_CODING.md).

## 1. Model và trách nhiệm



WorldAsset: danh tính asset ổn định, metadata version.
PlayerCollection: balances và trạng thái custody; Discovered từ event hợp lệ.
AcquisitionHistory: người chơi + loài + nguồn/campaign + event đã xác minh.
CampaignConfig/Progress: nội dung, nhiệm vụ, quota, bounds và config version.
Recipe: ID/version, đầu vào/chi phí/đầu ra; frozen với giao dịch đã tạo.
EssenceLedger: spendable/unclaimed/lifetime theo policy được chốt.
RewardRequest: ID, payload hash, outcome, dispatch/ACK, trạng thái final.
UtilityEligibility: điều kiện truy cập và bằng chứng theo D04.

ERC-1155 các bản sao tương đương không tự có phả hệ/EXP riêng từng cá thể.
Lịch sử discovery có thể tồn tại khi balance về 0; quyền đòi đang sở hữu phải đọc balance,
không thay bằng “đã từng khám phá”.

## 2. Tái sử dụng Yield Go và nguồn dữ liệu

Các điểm định vị từ khảo sát cũ, **phải kiểm tra lại code hiện tại**:
- Map/geo: apps/web/src/components/map/InteractiveMap.tsx, lib/campus.ts, lib/geo.ts.
- Wallet: lib/thirdweb.ts, wallet/WalletProvider.tsx và ConnectWalletButton.
- Proof: app/api/proofs/location/route.ts, lib/proof-signer.ts.
- Gateway: packages/contracts-l1/src/GameICMGateway.sol;
  packages/contracts-cchain/src/CChainICMGateway.sol.
- State/projection: features/gameplay/passport, packages/shared/src/gameplay.
- Sponsor/operator: lib/sponsor-perk-service.ts, components/sponsor.
- Storage cũ có thể dùng Map in-memory; phải xác minh và chuyển dữ liệu cần bền vững.

Tái dùng layout shell, wallet, map/geo, pattern proof/retry/accounting nếu phù hợp.
Không đổi tên YieldVault USDC thành chuồng ERC-1155. Không coi MockUSDC là Essence.
Không nhận client mode/radius/reward/CONFIRMED làm authority.
Không dùng deployment cũ mặc định.

Authority dự kiến:
- Game assets/Essence/custody: game chain sau khi thiết kế hợp đồng được chốt.
- Cross-chain outcome: gateway/hub xác thực messenger và origin.
- Collection read model: verified events/read + DB có thể rebuild phần tương ứng.
- Auth/fulfillment: DB bền vững; không mặc định rebuild được từ chain.
- Art/text: manifest; không quyết định recipe/rate/quota.

Asset ID và campaign ID phải có ranh giới rõ. Kết thúc campaign không xóa ownership.
TokenId có namespace season không tự làm mất tài sản, nhưng phải định nghĩa tương thích
và cách pet cũ tham gia nội dung mới. Không sửa ID đã phát hành mà thiếu migration plan.

## 3. Invariants phải giữ

- Replay/duplicate/retry không mint, consume, award hoặc cộng progress lần hai.
- Mint/burn/custody đúng quyền, đúng owner; callback không phá accounting.
- Recipe tiêu đầu vào và tạo đầu ra nguyên tử; revert không mất tài nguyên.
- Không tiêu pet đang bị custody/lock ngoài flow cho phép.
- Time client không quyết định số dư; arithmetic dùng đơn vị nguyên.
- Discovered không reset khi consume; campaign switch không reset world assets.
- Campaign closure có policy rõ cho harvest/withdraw/pending requests.
- Utility được cấp một lần và chỉ dùng khi đạt finality/eligibility đã quy định.
- Outcome được lưu độc lập với việc gửi ACK; retry replay cùng payload.
- ICM chậm không tự coi rejected và không tự refund khi bên kia có thể accepted.
- Wrong chain/emitter/player/receipt hoặc client giả không cấp progress.
- Demo/testnet/event tách state/config; mock được ghi nhãn.
- Secrets/raw GPS/QR secrets/OTP không đi vào client bundle hoặc log.
- Restart/reload không làm mất request hoặc tạo thêm reward.

## 4. Asset hiện có — không cần đọc lại prompt cũ

Nguồn: **asset source pet/** ở root repo; không đổi hoặc nén đè bản gốc.
Đã kiểm tra 32 PNG; 16 art vuông 1254×1254 RGBA có alpha thật.
Chưa duyệt toàn bộ viền/mỹ thuật; cần kiểm tra trên nền sáng/tối và thumbnail.

| speciesCode | assetKey | Tên |
|---:|---|---|
| 101 | fire_s1_normal | Ember Sprite |
| 102 | fire_s2_normal | Flare Fox |
| 103 | fire_s3_normal | Pyromane Lion |
| 201 | water_s1_normal | Aqua Drop |
| 202 | water_s2_normal | Crested Shark |
| 203 | water_s3_normal | Tidal Serpent |
| 301 | earth_s1_normal | Mossy Pebble |
| 302 | earth_s2_normal | Boulder Boar |
| 303 | earth_s3_normal | Quartz Gorilla |
| 401 | wind_s1_normal | Zephyr Cloud |
| 402 | wind_s2_normal | Gale Hawk |
| 403 | wind_s3_normal | Storm Griffin |
| 501 | ice_s1_normal | Avalanche Pet (Sự kiện Avalanche Build Web3) |
| 601 | magma_s1_normal | Emberstone (Dự trữ mở rộng Mùa 2) |
| 701 | lightning_s1_normal | KHTN Pet (Đối tác ĐH Khoa học Tự nhiên) |
| 801 | nature_s1_normal | Greenwich Pet (Đối tác ĐH Greenwich Việt Nam) |

Nguồn artwork: art/{assetKey}.png. 3 Linh thú sự kiện độc quyền (Avalanche Pet #501, KHTN Pet #701, Greenwich Pet #801) phục vụ săn thú GPS tại sự kiện và gian hàng đối tác.
- frame/common frames.png, frame/rare frames.png: 1024×1536, tâm trong suốt;
  map rõ sang runtime frames/common.webp và frames/rare.webp.
- fallback/card-back.png: 1024×1536 RGB.
- icons-raster-reference/: tám icon hệ PNG, chưa là SVG.
- ui/: essence/cage/craft/voucher PNG.
- landing/hero.png: 1672×941 RGB, gần 16:9.

Runtime derivative: WebP 512×512 và thumbnail 256×256, giữ alpha.
Mục tiêu khoảng ≤200 KB/art, ≤50 KB/thumb, kiểm tra chất lượng trước khi ép dung lượng.
Xác minh public directory của app; /assets/... là URL, không mặc định public ở monorepo root.
Manifest giữ assetKey, speciesCode, name, alt, paths, focal point;
không nhét balance/recipe authority vào manifest ảnh. Missing image có fallback.
Tên dài wrap; không kéo méo art vuông thành thẻ 2:3.
Giữ nguồn ngoài public bundle. Asset collab/utility mới chỉ tạo sau khi chốt thiết kế.

## 5. Quy trình Graphify và Archify

**Runbook thực thi hiện hành:** R3–R5 trong ELEMENTAL_TRAIL_VIBE_CODING.md.
Đã kiểm tra CLI trên máy: graphify update . là update code; không đảm bảo semantic docs.
Có lệnh validate graph, query coverage, callflow export, analyze/generate/read/write/status,
và xử lý cache timestamp gây stale. Dùng runbook đó khi chạy, không tự đoán lệnh.

Repo hiện có cả .archify/ và graphify-out/graph.json.
Kiểm tra Archify ngày 09/11/2026: installed=true, analysisReady=true,
knowledgeStale=true, designPacketStale=true. Chưa refresh trong lần tách tài liệu.
Graphify có graph.json; chưa kiểm chứng freshness trong lần này.
Không coi tài liệu thiết kế này là bản phân tích Archify đã được tái sinh.

### Trước audit/sửa source code
1. Đọc PRD, Architecture và version đang làm; kiểm tra git status.
2. Chạy từ repo root: npx --no-install archify-cli status --doc-type archify.
   Nếu CLI chưa có, báo thiếu; không tự cài toàn cục chỉ để mở tài liệu.
3. Dùng skill Archify hiện hành cho refresh: analyze → generate theo doc-type
   → status. Theo điều kiện quyền của phiên làm việc và skill;
   không chạy init/analyze/rebuild nặng chỉ vì một thay đổi docs nhỏ.
4. Khi knowledge/packet ready và không stale: đọc
   .archify/docs/archify/packet.json trước, guide.json thứ hai,
   rồi theo readOrder/factPolicy của guide.
5. Dùng Graphify query cho câu hỏi module cụ thể, ví dụ:
   graphify query "wallet location proof ICM gateway" --budget 1500
   Sau đó path/explain theo tên node thực có trong kết quả.
   Không đoán node hoặc coi INFERRED edge là confirmed.
6. Đọc source tại vị trí được dẫn, kiểm chứng file/symbol và dependency thật.
   Nếu artifact stale hoặc CLI lỗi, nêu giới hạn; docs-only vẫn tiếp tục được.
   Không báo audit kiến trúc hoàn tất bằng graph cũ hoặc bằng tên file.
7. Ghi kết quả thành Confirmed from current code / Inferred / Open questions.
   Chỉ thay đổi API/identity khi đã giải quyết decision liên quan.

### Sau thay đổi source có ảnh hưởng cấu trúc
Chạy test đúng phạm vi. Cập nhật Graphify incremental theo skill
(CLI graphify update . cho code; skill /graphify . --update cho semantic) khi graph bị ảnh hưởng; kiểm tra kết quả và không ép shrink guard.
Kiểm tra Archify status, refresh phần cần theo workflow skill và phạm vi được giao.
Không rebuild cả corpus sau mỗi đổi màu/typo; ghi stale nếu chưa refresh.
Các index là bằng chứng hỗ trợ, không tự cập nhật PRD/luật gameplay.

### Phân biệt đầu ra
archify.md là tài liệu tool-managed ở root, do workflow Archify tạo đúng doc-type.
ELEMENTAL_TRAIL_ARCHITECTURE.md là thiết kế mục tiêu do dự án quản lý;
không đổi đường output của skill Archify sang file này.
Thông tin từ archify.md chỉ đưa vào Architecture khi xác minh và ghi provenance.
Đợt này không ghi đè archify.md, không rebuild knowledge graph, không sửa code.
