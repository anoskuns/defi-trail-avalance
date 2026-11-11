> SUPERSEDED: Thay bằng ELEMENTAL_TRAIL_PRD.md, ELEMENTAL_TRAIL_ARCHITECTURE.md và ELEMENTAL_TRAIL_VIBE_CODING.md. Không dùng bản gộp này làm đặc tả hiện hành.

# ELEMENTAL TRAIL — MASTER VIBE CODING
Version tài liệu: 1.0 · 09/11/2026 · Trạng thái: kế hoạch, chưa triển khai các phiên bản bên dưới.

Đây là **file đầu vào duy nhất về sản phẩm và kế hoạch** khi giao AI xây Elemental Trail.
AGENTS.md là rules vận hành; code, config, ảnh và kết quả test là bằng chứng.
Không cần đọc lại 13 PRD cũ để bắt đầu. Chúng không còn là nguồn yêu cầu hiện hành.

## 1. Workspace và cách bắt đầu

Repo đã chọn:
C:/Users/Lenovo/Documents/3.1.Cuộc Thi/Cuộc Thi Avalance Build Web3/Yield Go Project

Làm ngay trong repo này. Không tạo clone mới, không sửa bản thiếu file trong Elements Pets.
Giữ code Yield Go để tái sử dụng có kiểm chứng. Không reset working tree, xóa deployment hoặc nâng toàn bộ dependency.

**Cách dùng:** copy “Prompt chung” ở mục 10, rồi nối prompt của đúng một version ở mục 11.
Bắt đầu v0.0. Nếu đã có bằng chứng version hoàn tất, tiếp tục version còn thiếu.
Mỗi version cần output, test, cách tự bấm thử và trạng thái thật.
Tên commit trong tài liệu là **đề xuất**, không phải commit đã tạo.
Không tự commit/push/tag chỉ vì tài liệu có tên commit; chỉ thực hiện khi lượt làm việc có yêu cầu đó.

## 2. Sản phẩm đã chốt

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

## 3. Scope bản demo và phần chưa chốt

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

## 4. Trải nghiệm và dữ liệu cốt lõi

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

### Model trách nhiệm

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

## 5. Tái sử dụng Yield Go và nguồn dữ liệu

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

## 6. Invariants phải giữ

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

## 7. Asset hiện có — không cần đọc lại prompt cũ

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
| 501 | ice_s1_normal | Frost Crystal |
| 601 | magma_s1_normal | Emberstone |
| 701 | lightning_s1_normal | Static Orb |
| 801 | nature_s1_normal | Sproutling |

Nguồn artwork: art/{assetKey}.png. Bốn Rare baseline không tự thành pet collaboration.
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

## 8. Research và thiết kế

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

## 9. Version, test gate và tên commit

Các version dưới là **mốc công việc**, không tự sửa package version hoặc tạo Git tag.
Commit chỉ khi được yêu cầu; stage rõ file liên quan, không git add toàn bộ vô điều kiện.
Nếu một version cần nhiều commit, dùng suffix mô tả phần việc; không amend lịch sử người dùng.
Chỉ nói “commit đã tạo” khi có hash thật. Không coi tests pass là mọi task hoàn thành.

| Version | Nội dung | Gate chính | Tên commit đề xuất |
|---|---|---|---|
| v0.0 | Audit + baseline workspace | Hiện trạng, commands, baseline có evidence | chore(elemental-trail): establish workspace baseline |
| v0.1 | Research + UX direction | Nguồn thật, wireflow và style chọn | docs(elemental-trail): define research and ux direction |
| v0.2 | Chốt scope/economy/identity | D01–D07 đủ cho phần phụ thuộc | docs(elemental-trail): lock demo decisions |
| v0.3 | Schema, catalog, adapters | Validation + invariants dữ liệu | feat(elemental-trail): add world model and adapters |
| v0.4 | Vòng chơi local | Chơi từ starter tới evolution | feat(elemental-trail): implement local gameplay loop |
| v0.5 | Persistence + utility sandbox | A→B/reload không mất collection | feat(elemental-trail): preserve collection across campaigns |
| v0.6 | Assets + UI | Responsive, states, fallback | feat(elemental-trail): integrate pet assets and interface |
| v0.7 | Chain/proof/catch | Receipt thật và chống replay | feat(elemental-trail): add verified pet acquisition |
| v0.8 | Chăm + evolution on-chain | Arithmetic, custody, atomicity | feat(elemental-trail): implement pet care and evolution |
| v0.9 | DB + verified progress | Restart/replay/projection đúng | feat(elemental-trail): persist verified collection history |
| v0.10 | Reward ICM + utility | ACK/retry/reject/live round trip | feat(elemental-trail): deliver utility rewards through icm |
| v0.11 | Release QA + recovery | Regression, backup/restore, UX | test(elemental-trail): verify release and recovery flows |
| v0.12 | Deploy + demo | URL thật, smoke test, receipt | chore(elemental-trail): prepare verified demo release |

Research v0.1 có thể làm trước/sau audit. Spike wallet/ICM nên thử sớm sau v0.0
khi môi trường đã được chỉ định, không đợi cuối mới phát hiện blocker.
Không tự deploy spike nếu chưa có phạm vi/mạng được giao.
v0.6 có thể tiến hành từng phần sau v0.3; không chặn gameplay bởi thiếu art.
Nếu v0.2 còn điểm mở, chỉ tiếp tục phần không phụ thuộc.

## 10. Prompt chung — dùng cho mỗi version

~~~text
Làm việc tại C:/Users/Lenovo/Documents/3.1.Cuộc Thi/Cuộc Thi Avalance Build Web3/Yield Go Project.
Đọc AGENTS.md, docs/ELEMENTAL_TRAIL_MASTER.md và IMPLEMENTATION_STATUS.md nếu có.
Không dùng PRD GE/ET/PW cũ làm yêu cầu hiện hành, không clone thêm repo.

Thực hiện đúng version được giao bên dưới. Kiểm tra code và working tree trước.
Nêu ngắn hiện trạng, mục tiêu, file dự kiến sửa và dependency thật rồi làm việc.
Giữ quyết định Accepted. Điểm Open cần hỏi theo nhóm nhỏ; tiếp tục phần độc lập.
Không tự đổi config hoặc thêm tính năng để làm demo/test đẹp hơn.
Đọc nested AGENTS.md và tài liệu framework cài local trước khi sửa app.

Mỗi thay đổi cần kiểm tra phù hợp; báo lệnh đã chạy, exit/result, cách tự thử.
Không bịa pass, deployment, transaction hoặc screenshot đã quan sát.
Mock/local/testnet phải phân biệt. Không log secrets hoặc stage file không liên quan.
Cập nhật IMPLEMENTATION_STATUS.md: version, trạng thái, evidence, blocker, việc tiếp theo.
Quyết định mới cập nhật Decision log của MASTER; không sinh PRD cạnh tranh.
Chỉ commit/push/deploy khi lượt này có yêu cầu tương ứng; nếu chưa, đưa tên commit đề xuất.
~~~

## 11. Prompt chi tiết từng version

### v0.0 — Kiểm tra nền dự án

~~~text
Thực hiện v0.0. Repo đã tồn tại và được chọn, không clone.
Kiểm tra HEAD/branch/working tree, AGENTS, package scripts và module tái sử dụng.
Đối chiếu map/wallet/proof/ICM/storage với code, ghi đường dẫn/symbol làm bằng chứng.
Kiểm tra artifact kiến trúc có còn đúng không; không coi tài liệu là code.
Xác định runtime/env cần có mà không in secrets.
Chạy baseline typecheck/lint/test/build phù hợp scripts hiện tại.
Tách lỗi có sẵn khỏi lỗi phát sinh; không nâng toàn bộ dependency hoặc sửa lan man.
Chỉ sửa setup nếu nằm trong phạm vi và cần thiết, ghi lý do.
Tạo status và báo cách chạy dev; chỉ rõ phần chưa thể kiểm tra.
~~~

Test/gate: commands có thật; missing env/tooling ghi blocker; không giả baseline xanh.
Báo path/module map trong status hoặc evidence appendix của MASTER.

### v0.1 — Research và UX

~~~text
Thực hiện v0.1. Research web 8–12 tham khảo có URL trực tiếp từ sản phẩm/tác giả.
Bao phủ collection lâu dài, bản đồ/event, người quay lại, nhận pet và progress.
Phân biệt concept với app thật; chỉ mô tả màn hình thực sự quan sát.
Đề xuất ba hướng mỹ thuật, chọn phương án có lý do để người dùng quyết định.
Vẽ flow mobile từ online acquisition tới evolution và utility/campaign B.
Có wireframe/miêu tả từng screen, CTA, empty/loading/error và trạng thái chưa đủ điều kiện.
Ghi kết luận và lựa chọn được chốt vào appendix/Decision log của MASTER.
Chưa tạo tất cả ảnh hoặc code mọi màn hình trong ticket này.
~~~

Test/gate: link mở được hoặc có nhãn chưa truy cập; flow không dead-end;
ownership/discovery rõ; không bắt GPS cho gameplay online; chưa được gọi user-tested.

### v0.2 — Chốt luật đủ code

~~~text
Thực hiện v0.2. Chuẩn bị phương án cụ thể cho D01–D07 trong MASTER.
Ưu tiên nguồn bản sao online, recipe Ember→Flare, Essence và utility ICM.
Cho thấy một lượt chơi từ nguồn tài nguyên tới evolution/reward bằng bảng số.
Chỉ dùng số tạm để minh họa, ghi Proposed; hỏi người dùng phần cần quyết định.
Sau câu trả lời, cập nhật Accepted/Proposed/Open, ngày và nội dung xác nhận.
Chốt quyền nhận collab nếu giữ trong demo; không tự đặt scarcity hay sponsor.
Kiểm tra asset inventory đủ, identity không reset qua campaign và quyền reward không mint kép.
Không sửa contract/production config trước quyết định tương ứng.
~~~

Test/gate: nguồn/sink đủ cho đường demo, không vô hạn ngoài ý định;
scope có happy path và đường thiếu tài nguyên; các blocker vẫn hiện rõ.

### v0.3 — Dữ liệu và ranh giới adapter

~~~text
Thực hiện v0.3 theo các quyết định đã accepted.
Tạo schema WorldAsset/Collection/Campaign/Recipe/Essence/RewardRequest/Eligibility.
Tách ID tài sản khỏi phạm vi campaign, dùng assetKey hiện có.
Tạo repository interface và adapter LOCAL DEMO, không gắn UI vào state giả cố định.
Version config rõ, không lấy balance.v1.json cũ làm authority mặc định.
Tạo fixtures và unit tests độc lập cho arithmetic/eligibility/validation.
Chưa mint token hoặc deployment.
~~~

Test: ID trùng/references sai bị từ chối; recipe unsupported bị từ chối;
negative quantity/overflow/bounds theo model; copy counts khác discovery;
A/B không chia đôi identity ngoài chủ đích.

### v0.4 — Vòng chơi local

~~~text
Thực hiện v0.4 bằng map/wallet shell phù hợp của Yield Go và local adapter.
Cho chơi starter → nhận bản sao online → chăm/thu → preview → evolve Flare Fox.
Giữ labels LOCAL DEMO, config và state độc lập khỏi testnet.
Tiêu đúng bản sao được chọn, cảnh báo bản cuối, giữ discovery.
Thẻ custody không craft được; có đường rút/thu theo policy.
Dùng placeholder khi cần. Màn hình phải bấm được, không chỉ là screenshot.
~~~

Test: đủ/thiếu nguyên liệu; double click; cancel không tiêu; failed action không đổi state;
craft xong inventory/discovery đúng; không mắc kẹt khi pet đang chăm.

### v0.5 — Persistence và quyền truy cập qua campaign

~~~text
Thực hiện v0.5. Lưu local state có version và cơ chế recovery phù hợp.
Tạo campaign A và sandbox B tối thiểu, không dựng thêm cả mùa.
Kết campaign không reset collection; reload vẫn giữ ownership/history.
Làm utility gate theo D04; mô phỏng ICM có nhãn rõ, chưa gọi là reward thật.
Không để achievement đã từng có thay cho yêu cầu đang sở hữu.
Reset demo là công cụ riêng, không nằm trong hành động chuyển campaign.
~~~

Test: A→B→reload; balance 0 nhưng discovered còn; eligible/ineligible;
request pending restore; corrupt/local schema khác version có xử lý rõ.
Local storage không phải authority của bản live.

### v0.6 — Giao diện và asset

~~~text
Thực hiện v0.6 theo style đã chọn và asset contract trong MASTER.
Dùng nguồn asset source pet; export derivatives riêng, không ghi đè PNG.
Manifest + fallback, alt đúng hình; data text/nút tách art.
Dựng UI component thật cho mobile/desktop, tái sử dụng token và layout.
Collection history, campaign progress miễn phí, evolution và reward states rõ.
Không thêm logo collab/quota/chức năng chưa chốt.
Tự mở app kiểm tra các màn hình sau khi sửa; báo giới hạn môi trường nếu không xem được.
~~~

Test: portrait nhỏ, desktop, tên dài, 404 ảnh, loading/empty/error/pending;
keyboard/focus, reduced motion, tap areas, contrast; ảnh không méo.
Không viết test chỉ để khẳng định class CSS đã thêm.

### v0.7 — Identity/proof và acquisition thật

~~~text
Thực hiện v0.7. Kiểm tra stack/version thực và docs local trước implement.
Triển khai asset contract/registry/roles theo D07 và acquisition theo D01.
Session gắn đúng ví; server/contract quyết định reward, quota, campaign.
Proof có domain/nonce/expiry/config phù hợp, chống replay.
Kiểm tra ví mục tiêu/reconnect; gasless chỉ công bố sau thử thật.
Chỉ deploy lên môi trường được giao; thiếu đầu vào ghi blocker.
Khi có giao dịch thật, lưu network/address/receipt/events vào evidence.
~~~

Test: unauthorized mint/burn; sai ví/chain/contract/config/mode; expired proof;
claim lặp; input reward giả; token supply; callback; identity sau reload.
Mock messenger hoặc fixture không thay evidence testnet.

### v0.8 — Chăm và evolution on-chain

~~~text
Thực hiện v0.8. Xây custody/ledger/time accounting theo D02/D03.
Dùng số nguyên, settle đúng thứ tự trước thay đổi vị thế.
Recipe consume+mint nguyên tử và có version; không cho client sửa cost/output.
Nối real adapter với UI; không dùng timer trình duyệt làm số dư chính thức.
Giữ withdraw/recovery khi campaign kết thúc theo policy đã accepted.
~~~

Test: harvest nhiều lần so một lần; clock tamper; cap/sink theo quyết định;
stake/withdraw/reentrancy; wrong owner; insufficient funds; revert rollback;
last-copy warning UI và balance/discovery sau evolve; parity TS/contract.
Foundry warp mô phỏng thời gian là test, không phải lịch sử giao dịch live.

### v0.9 — Verified history và persistence backend

~~~text
Thực hiện v0.9. Xây durable DB/migrations/indexer/cursors và query APIs.
Xác minh receipt/log/chain/emitter/player trước project progress.
Unique event/request/achievement theo phạm vi; replay idempotent.
Lưu history người chơi-loài, không giả phả hệ cá thể ERC-1155.
Tách dữ liệu có thể rebuild từ chain với auth/fulfillment cần backup.
Không nhận CONFIRMED/balance do client gửi làm authority.
~~~

Test: fake/reverted/wrong-chain events; duplicate; out-of-order/reorg policy;
restart/replay cho cùng state; cursor recovery; access control;
restore backup thực cho dữ liệu không rebuild được; A/B không mất world history.

### v0.10 — Reward ICM và utility thật

~~~text
Thực hiện v0.10. Xây một flow reward ICM theo D04, tách khỏi recipe evolution.
Quy định source/destination authority, payload version/hash, request ID,
outcome/ACK outbox và finality. Lock/consume chỉ khi scope yêu cầu.
Origin/messenger checks, retry cùng payload, không cấp entitlement hai lần.
UI phân biệt pending, retryable transport error, business reject và final.
Nối utility gate với bằng chứng thật sau finality.
Không tự timeout refund khi remote có thể accepted.
~~~

Test: duplicate đúng payload replay; cùng ID khác payload bị chặn;
wrong origin; ACK lỗi/lặp; relayer stop/resume; backend reload;
reject hoàn đúng nếu có escrow; không grant trước final;
live request/ACK trên mạng mục tiêu, lưu receipt cả hai chiều.
Nếu chưa live được, version còn blocker, không đánh dấu release ICM-ready.

### v0.11 — Release review

~~~text
Thực hiện v0.11. Truy vết toàn luồng theo MASTER và diff, tìm lỗi có bằng chứng.
Chạy regression phù hợp: app/contract/integration và mobile smoke.
Kiểm tra secrets/config separation, replay/authority, recovery và progress.
Lập runbook deploy/config/migration/health/backup/rollback.
Sửa lỗi chặn release trong phạm vi được giao; không nới luật để làm test xanh.
Báo pass/fail/unverified theo từng gate; chưa publish trong version này.
~~~

Test: new account, returning account, slow/offline, wallet reject, tx revert,
pending restore, campaign closed, utility used/owned states, image fallback.
Chỉ rõ trình duyệt/thiết bị chưa kiểm tra. Build pass không thay runtime QA.

### v0.12 — Deploy và diễn tập

~~~text
Thực hiện v0.12 đến [HOST/MẠNG/MÔI TRƯỜNG ĐƯỢC CHỈ ĐỊNH].
Kiểm tra release gates, dùng runbook và config đã chốt.
Thiếu secrets/cấu hình bắt buộc thì hỏi đúng phần thiếu, không đoán deployment cũ.
Sau deploy mở URL thật, smoke test, health và state reload.
Diễn tập A: nhận pet → chăm → evolve → reward ICM → dùng utility;
sang sandbox B: collection còn, điều kiện truy cập còn tác dụng.
Coming next season chỉ là roadmap. Fixture/video mô phỏng phải gắn nhãn.
Báo URL, code/config version, receipts, kết quả, giới hạn và rollback.
~~~

Gate: deploy truy cập được, test flows thật, ICM evidence đúng.
Không gọi demo là pilot quà thật hoặc sản phẩm đã chứng minh retention.
Commit v0.12 chứa release config/runbook liên quan, không secrets.
Tên commit không chứng minh deploy thành công; evidence nằm trong status.

## 12. Lệnh kiểm tra và evidence

Root package.json hiện có các scripts sau (đã đọc, **chưa chạy trong đợt tổng hợp docs**):
- pnpm dev
- pnpm typecheck
- pnpm lint
- pnpm test
- pnpm build
- pnpm test:forge
- pnpm test:icm
- pnpm test:contracts

Kiểm tra lại scripts khi thực thi. Chọn targeted test trước, full regression ở release gate.
test:icm trong repo hiện gọi Foundry test; không mặc định đó là mạng ICM live.
Không tự giả định test runner/E2E đã cài. Nếu thêm runner, giải thích mục đích và phạm vi.
Tests mới bảo vệ hành vi/authority/recovery, không chỉ mirror implementation.

Mẫu IMPLEMENTATION_STATUS.md (đây là nhật ký thực thi, không phải PRD thứ hai):

| Version | Status | Files/commit | Checks/result | Evidence | Blocker/next |
|---|---|---|---|---|---|
| v0.0 | Not started | — | Not run | — | Audit baseline |

Status: Not started / In progress / Blocked / Done.
Done cần output + gate đạt; nếu chưa được yêu cầu commit, ghi “uncommitted” thay vì bịa hash.
Khi user yêu cầu commit: xem diff/staged, chỉ stage file liên quan, kiểm tra không secrets,
commit với tên trong bảng và báo hash. Không tự push/tag.
Không amend/squash hoặc loại thay đổi khác của người dùng.

## 13. Prompt tiếp tục, review, sửa lỗi

~~~text
Tiếp tục repo hiện tại. Đọc AGENTS.md, docs/ELEMENTAL_TRAIL_MASTER.md
và IMPLEMENTATION_STATUS.md. Kiểm tra working tree.
Xác định version còn thiếu đầu tiên theo dependency và evidence, rồi tiếp tục.
Không đọc backlog cũ để tự thêm scope hoặc làm lại phần đã đạt.
~~~

~~~text
Review version [vX.Y] theo MASTER và diff.
Truy vết thao tác → authority → state → UI.
Chỉ báo findings có file/dòng hoặc bước tái hiện và tác động.
Phân biệt reproduced/inferred/unverified, không tự đổi kiến trúc trong lượt review.
~~~

~~~text
Lỗi: [thao tác, kỳ vọng, thực tế, log đã che secrets].
Tái hiện, khoanh nguyên nhân ở UI/adapter/server/DB/chain tương ứng.
Sửa nhỏ nhất giữ invariant; chạy regression liên quan.
Không delay giả, bỏ validation, reset collection hoặc set success để che lỗi.
Cập nhật status và cách tôi xác nhận lại.
~~~

## 14. Tài liệu cũ: giữ gì, có thể xóa gì?

**Chỉ là đề xuất dọn dẹp. Chưa xóa file nào.** Các đường dẫn dưới tương đối docs/mvp.
Master đã tổng hợp nội dung cần cho coding; dữ liệu asset và code vẫn phải giữ.

### Có thể xóa sau khi bạn duyệt Master
- 00_BAT_DAU_TU_DAY.md, README.md: có thể giữ làm shortcut cực ngắn hoặc bỏ.
- 03_VIBE_CODING_PLAN.md: prompt PW đã được thay bằng version plan.
- 07_PERSISTENT_WORLD_VISION.md, SCOPE_V2.md: Accepted/Open đã vào Master.
- WORKSPACE_CONTEXT.md, DOC_REVIEW_PRODUCT_DECISIONS.md: thông tin đã tổng hợp.
- ASSET_AUDIT.md: kết quả chính đã tổng hợp; vẫn nên giữ inventory máy đọc.

Xóa có thể làm link trong các file lịch sử bị hỏng; nếu giữ lịch sử, sửa link/ghi chú cùng lượt cleanup.
Không xóa tự động trong task tổng hợp này.

### Nên lưu trữ một bản, không dùng làm yêu cầu hiện hành
- 01_GAME_DESIGN.md, 02_TECHNICAL_DESIGN.md: game/event và khảo sát kỹ thuật cũ.
- 03_EVENT_BASELINE_ARCHIVE.md: checklist ET lịch sử.
- balance.v1.json + economy_check.py + ECONOMY_CHECK.md: giữ cùng thư mục nếu archive;
  script đọc/ghi file cạnh nó. Các PASS là baseline cũ, không là test sản phẩm mới.
- docs/reference/elemental-trail và PRD DeFi cũ: provenance/reuse; không ưu tiên hơn Master.

### Nên giữ như tài nguyên, không phải PRD
- 04_ASSET_HANDOFF.md: có thể archive vì contract asset đã nằm trong Master.
- 05_AI_IMAGE_PROMPT_PACK.md: thư viện prompt sáng tạo, giữ để làm biến thể/asset mới.
- 06_UI_REFERENCE_PROMPT_PACK.md: thư viện style cũ; cập nhật prompt theo Master trước khi dùng.
- asset-inventory.json: inventory kỹ thuật hữu ích.
- Toàn bộ asset source pet/: giữ bản nguồn.
- .archify/ và graphify-out/: artifact hỗ trợ code, không xóa chỉ vì không thuộc PRD.
- HTML cũ ngoài repo: snapshot tùy chọn, có thể bỏ nếu không cần xem;
  không dùng làm đặc tả mới hơn Master.

## 15. Decision log và bằng chứng hiện tại

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
Các entry mới trong log cần nêu ngày, quyết định, Proposed/Accepted và nguồn xác nhận.
