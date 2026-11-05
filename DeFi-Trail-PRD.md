# DeFi Trail — Product Requirements Document

**Phiên bản:** 1.0  
**Ngày:** 05/11/2026  
**Trạng thái:** Approved for MVP build  
**Release:** UniHack 2026 MVP  
**Hạn nộp:** 23:59 ngày 21/11/2026 (UTC+7)  
**Đối tượng sử dụng tài liệu:** người điều phối dự án, AI coding agent, frontend engineer, smart-contract/L1 engineer và người chuẩn bị demo

> DeFi Trail là bản demo testnet. Mọi USDC, lợi suất và phần thưởng trong MVP đều là tài sản mô phỏng, không có giá trị tiền thật. Giao diện phải luôn hiển thị nhãn **Mock USDC** và **Simulated testnet yield**.

---

## 0. One-page PRD

### Problem

Sinh viên mới tiếp cận DeFi thường phải học nhiều khái niệm, cài ví, tìm test token và hiểu giao dịch trước khi được trải nghiệm một kết quả có ý nghĩa. Hành trình này tạo ma sát cao và tách việc học khỏi hành động. Các trải nghiệm walk-to-earn tạo động lực khám phá nhưng phần thưởng ngẫu nhiên không mặc nhiên hình thành thói quen tài chính tốt.

### Solution

DeFi Trail là PWA “walk-to-DeFi” trên một Demo Campus hư cấu. Người chơi khám phá bản đồ, đến gần chest, nhận proof vị trí có thời hạn và mở chest trên Game L1. Yield Chest tạo vị thế Mock USDC do sponsor tài trợ; Quest Chest hướng dẫn người chơi tự ký một giao dịch deposit nhỏ; Sponsor Chest yêu cầu thêm QR tại địa điểm. Tài sản và simulated yield nằm trên Fuji C-Chain, trong khi trạng thái game nằm trên Avalanche Game L1 và được đồng bộ hai chiều bằng ICM.

### Why now / Why Avalanche

- Cuộc thi yêu cầu một phần Avalanche thực sự và chấm riêng Technical Implementation cùng Avalanche Integration.
- Bản đồ, chest, energy, XP và streak tạo nhiều cập nhật game phù hợp với một L1 chuyên dụng có gas token testnet được phân phối tự do.
- Mock USDC và vị thế vault nằm trên C-Chain; ICM thể hiện rõ ranh giới giữa game state và asset state.
- Trải nghiệm có thể demo trực quan trong 2–3 phút: đi trên bản đồ → mở chest → theo dõi ICM → thấy vị thế → stats thay đổi.

### Hypothesis

Chúng tôi tin rằng một hành trình bản đồ có phần thưởng DeFi xác định và tutorial gắn với giao dịch thật trên testnet sẽ giúp sinh viên hoàn thành hành động DeFi đầu tiên nhanh hơn một luồng onboarding chỉ gồm tài liệu. Giả thuyết được xem là có tín hiệu tích cực khi ít nhất 4/5 người thử hoàn thành chest đầu tiên mà không cần hướng dẫn miệng và hiểu rằng tài sản/lợi suất trong demo không phải tiền thật.

### Personas

1. **Student Explorer:** chưa hoặc ít dùng DeFi; muốn trải nghiệm nhanh, không muốn quản lý seed phrase ngay từ đầu.
2. **Sponsor Operator:** nạp ngân sách Mock USDC, tạo campaign QR và muốn thấy ngân sách được phân bổ minh bạch.
3. **Demo Admin:** seed campus/chest, vận hành relayer/faucet và chuẩn bị dữ liệu demo; không được sửa tùy ý vị thế người chơi.

### MVP scope

**In:** Map PWA, embedded wallet + Core fallback, Demo Campus, location proof, Yield/Quest/Sponsor Chest, Game L1, Fuji C-Chain vault, two-way ICM, QR proof, mock gas faucet, deterministic stats/rarity, withdrawal, analytics không chứa raw GPS, dev location toggle có nhãn.

**Out:** tiền thật, mainnet, external yield protocol, randomness, tokenomics, NFT, marketplace, Territory, leaderboard, Contract Deployer Allow List, nhiều campus, chống GPS spoof tuyệt đối, production audit và native mobile app.

### Success metrics

| Metric | Target MVP | Cách đo |
|---|---:|---|
| Full demo completion | 5/5 lần liên tiếp | Checklist và transaction/message IDs |
| First chest completion | ≥ 4/5 người thử | Moderated usability test |
| Time to first confirmed chest | Median ≤ 2 phút | Client analytics, không tính thời gian email OTP |
| ICM completion | ≥ 90% trong 60 giây ở 20 lần thử | Request lifecycle logs |
| Duplicate economic effect | 0 | Contract tests + reconciliation |
| Sponsor solvency violations | 0 | Invariant tests |
| Hiểu đúng testnet | ≥ 4/5 người thử | Câu hỏi sau test |

### Release decision

MVP chỉ được coi là hoàn thành khi cả ba chest chạy end-to-end trên public test deployment. Bonus không được bắt đầu trước khi acceptance matrix P0 đạt 100%.

---

## 1. Objective, vision và product principles

### 1.1 Objective

Xây dựng một vertical slice có thể demo, trong đó sinh viên:

1. đăng nhập và có một địa chỉ ví;
2. tìm chest trên bản đồ;
3. chứng minh đang ở trong bán kính cho phép;
4. mở chest trên Game L1;
5. nhìn thấy yêu cầu ICM đi sang C-Chain;
6. nhận hoặc tự deposit Mock USDC vào vault;
7. thấy vị thế và stats quay về Game L1;
8. có thể rút tài sản mô phỏng và thấy sức mạnh giảm.

### 1.2 Vision

DeFi Trail biến onboarding tài chính thành một hành trình khám phá có thể kiểm chứng: phần thưởng không phụ thuộc may rủi, hành vi tốt làm nhân vật mạnh hơn, và người chơi luôn hiểu tài sản của mình đang ở chain nào.

### 1.3 Product principles

- **Learn by doing:** tutorial kết thúc bằng hành động testnet có thể kiểm chứng.
- **Deterministic, not speculative:** không dùng loot ngẫu nhiên, dự đoán giá hoặc lời hứa lợi nhuận.
- **Transparent chain boundary:** UI luôn cho biết trạng thái đang ở Game L1, C-Chain hay ICM pending.
- **Self-custody after onboarding:** người chơi kiểm soát ví/vị thế và có thể rút.
- **Graceful waiting:** ICM là bất đồng bộ; pending không được trình bày như lỗi hoặc thành công giả.
- **Demo honesty:** dev location, mock token, simulated yield và giới hạn anti-cheat luôn được công khai.

---

## 2. Problem definition và opportunity

### 2.1 Customer problem

| Câu hỏi | Trả lời MVP |
|---|---|
| Who | Sinh viên tò mò về Web3 nhưng chưa quen ví và DeFi |
| What | Không có đường dẫn ngắn từ “tìm hiểu” đến “tự thực hiện giao dịch” |
| When | Lần đầu tham gia workshop, hackathon hoặc activation tại campus |
| Where | Mobile web tại campus/sponsor venue hoặc chế độ demo từ xa |
| Why | Ma sát ví/gas/network, khái niệm trừu tượng, thiếu phản hồi trực quan |
| Impact | Bỏ cuộc trước giao dịch đầu tiên hoặc thao tác mà không hiểu asset state |

### 2.2 Opportunity và giới hạn bằng chứng

MVP chưa có dữ liệu đủ để ước lượng TAM/SAM/SOM, doanh thu hoặc retention. PRD không dựng số liệu thị trường. Cơ hội cần kiểm chứng là liệu một activation bản đồ có làm người mới hoàn thành và hiểu một hành động vault tốt hơn tutorial tĩnh hay không.

### 2.3 Alternatives

| Cách tiếp cận | Ưu điểm | Khoảng trống DeFi Trail muốn kiểm chứng |
|---|---|---|
| Tutorial/article | Rẻ, dễ phát hành | Không tạo hành động hoặc phản hồi không gian |
| Testnet faucet + dApp | Có giao dịch thật | Người mới vẫn phải tự ghép nhiều bước |
| Walk-to-earn | Khuyến khích khám phá | Phần thưởng có thể không dạy quản lý vị thế |
| DeFi Trail | Bản đồ + tutorial + vault testnet | Phức tạp hơn và cần chứng minh UX/ICM đáng giá |

---

## 3. Scope và release

### 3.1 Release contents

| Epic | Nội dung | Priority |
|---|---|---|
| E1 Foundation | Monorepo, environment config, wallets, Game L1 và Fuji C-Chain | P0 |
| E2 Map & Proof | Demo Campus, MapLibre, H3, GPS/dev location, signed proof | P0 |
| E3 Game State | Chest spawn, claim-per-wallet-per-epoch, energy, XP, exploration | P0 |
| E4 Yield Position | MockUSDC, SponsorPool, YieldVault, withdrawal, reward reserve | P0 |
| E5 ICM | Hai gateway, message lifecycle, relayer, retry/idempotency | P0 |
| E6 Three Chests | Yield, Quest và Sponsor flows | P0 |
| E7 Progression | Balance/streak/power/rarity/Compass | P0 |
| E8 Demo Readiness | Analytics, explorer links, seed/reset script, runbook | P0 |
| E9 Bonus | Territory, leaderboard, allow-list precompile | P2 / post-MVP |

### 3.2 Dependencies

- L1 phải có RPC ổn định, native gas token và ICM contracts trước khi tích hợp frontend.
- Hai chain phải dùng Teleporter/ICM version tương thích.
- Relayer phải có gas trên cả hai chain và health check công khai cho đội vận hành.
- SponsorPool phải được nạp principal budget và reward reserve trước khi chest có thể CONFIRMED.
- Embedded wallet phải chứng minh ký được trên custom Game L1; Core là fallback bắt buộc.

### 3.3 Release gates

| Gate | Hạn | Pass condition | Fallback có kiểm soát |
|---|---|---|---|
| G1 ICM spike | 08/11 | Một message L1→C và ack C→L1 trên target deployment | Dừng feature mới, ưu tiên ICM; local proof chỉ dùng chẩn đoán, không tính hoàn thành |
| G2 Wallet spike | 12/11 | Embedded wallet ký được trên Game L1 và C-Chain | Core trở thành demo path chính, embedded gắn Beta |
| G3 QR flow | 15/11 | QR proof động chạy end-to-end | QR ký tĩnh có expiry + geofence, ghi rõ giới hạn |
| G4 Core complete | 18/11 | Ba chest + withdrawal vượt P0 acceptance | Không làm bonus; chỉ sửa P0 |
| G5 Submission | 20/11 | Repo/slides/video/live links mở trong incognito | 21/11 chỉ dành cho lỗi nghiêm trọng |

---

## 4. User journeys

### 4.1 First-time onboarding

1. Người dùng mở PWA và thấy nhãn “Fuji testnet demo — no real funds”.
2. Chọn email embedded wallet hoặc Connect Core.
3. Chấp thuận quyền vị trí; nếu từ chối, app giải thích và cho phép bật Demo location.
4. App bảo đảm ví có lượng gas test giới hạn trên chain cần dùng.
5. Map tải Demo Campus, vị trí hiện tại, chest đang hoạt động và Compass.
6. Người dùng chọn chest; UI hiển thị khoảng cách, bán kính hiện tại, energy và phần thưởng xác định.

### 4.2 Yield Chest

1. User vào bán kính, app xin `LocationProof`.
2. User ký `openChest` trên Game L1; energy giảm sau khi proof và chest state hợp lệ.
3. `ChestManager` tạo `DepositRequest` 1 Mock USDC và `GameICMGateway` gửi ICM.
4. UI theo dõi CREATED → SENT → REMOTE_EXECUTED → ACK_PENDING.
5. C-Chain gateway kiểm tra source, gọi `SponsorPool.allocatePrincipal`, rồi `YieldVault.depositSponsored`.
6. C-Chain gửi `PositionSnapshot` về L1; `PlayerState` cập nhật assets/streak/stats.
7. UI chuyển CONFIRMED, hiển thị explorer links của cả hai chain.

### 4.3 Quest Chest

1. Sau location proof và `openChest`, L1 xác định Quest Tier từ rarity hiện tại.
2. `QuestRegistration` được gửi tới `QuestRouter` trên C-Chain.
3. User xem tutorial: Mock USDC, approval, vault position, simulated APR và withdrawal.
4. User claim đúng lượng quest budget một lần, sau đó tự ký giao dịch approve/permit và `depositForQuest`.
5. QuestRouter xác nhận đúng wallet, quest, amount và expiry; deposit vào YieldVault cho chính user.
6. Gateway gửi completion + `PositionSnapshot` về L1; XP và exploration chỉ cộng một lần.

### 4.4 Sponsor Chest

1. User ở trong bán kính và quét QR sponsor.
2. Backend xác minh QR payload, expiry, campaign, geofence và wallet; trả `SponsorProof` ngắn hạn.
3. User ký mở Sponsor Chest trên Game L1.
4. Luồng ICM tái sử dụng `DepositRequest`, sourceType `SPONSOR`, amount 2 Mock USDC.
5. Position được top-up và stats cập nhật sau ack.

### 4.5 Withdrawal

1. User mở Position, chọn amount và thấy preview assets/stats sau rút.
2. User ký giao dịch C-Chain; chỉ owner của position được rút về chính địa chỉ đó.
3. YieldVault accrue reward trong giới hạn reserve, giảm assets và chuyển Mock USDC.
4. C-Chain gửi `PositionSnapshot`; L1 cập nhật tier, power, energy cap, radius và Compass.
5. Nếu `energyCurrent > energyMax` mới, clamp về `energyMax`; không tạo energy âm.

---

## 5. Gameplay rules

### 5.1 Epoch và chest identity

- Public demo dùng epoch 24 giờ, neo tại 00:00 UTC.
- Local/test có thể dùng epoch ngắn hơn qua deployment config; public contract không có admin function đổi epoch sau deploy.
- `chestId = keccak256(campusId, epoch, slot)`.
- Mỗi slot tham chiếu một entry trong campus allowlist: `h3Cell`, latitude, longitude và `chestType`.
- Chest cùng hiển thị cho mọi user nhưng claim key là `keccak256(chestId, player)`.
- Một user không thể mở lại cùng chest trong epoch, kể cả dùng proof mới.

### 5.2 Location

- Bán kính cơ sở là 30 m; powerLevel tăng tối đa đến 45 m.
- Backend lấy raw latitude, longitude và accuracy chỉ trong request memory; không ghi raw GPS vào DB/log/analytics.
- Request bị từ chối nếu `accuracyMeters > 50`, timestamp lệch quá 30 giây hoặc khoảng cách lớn hơn `openRadius + accuracyMeters`.
- Proof sống tối đa 90 giây, gắn với wallet/chest/epoch/nonce/radius và chỉ dùng một lần.
- Dev toggle đặt vị trí client tại một seed point, luôn hiện banner “Demo location active”. Proof trả về có `mode = DEMO`; event on-chain cũng lưu mode để demo minh bạch.

### 5.3 Energy và failure behavior

- `energyMax = 3 + powerLevel`; `energyCurrent` refill lên max khi user thực hiện hành động đầu tiên ở epoch mới.
- Chest open thành công về mặt Game L1 tiêu tốn 1 energy và khóa claim trong trạng thái PENDING.
- ICM delivery có thể retry bằng cùng `requestId`; retry không tiêu tốn energy hoặc tạo deposit mới.
- Nếu C-Chain trả lỗi cuối cùng `INSUFFICIENT_PRINCIPAL`, `QUEST_BUDGET_EMPTY` hoặc `EXPIRED`, L1 đánh dấu FAILED_FINAL, hoàn 1 energy và cho phép claim mới chỉ sau khi admin mở lại campaign/epoch. Không hoàn energy khi message chỉ đang pending.

### 5.4 Progression

Mock USDC có 6 decimals. Stats dùng `positionAssets = principal + accruedReward` từ snapshot gần nhất.

| Rule | Definition |
|---|---|
| balanceTier 0 | assets < 1.000000 |
| balanceTier 1 | 1.000000 ≤ assets < 5.000000 |
| balanceTier 2 | 5.000000 ≤ assets < 10.000000 |
| balanceTier 3 | assets ≥ 10.000000 |
| positionStreak | Số khoảng 24 giờ hoàn tất liên tục kể từ `qualifyingSince` trong khi assets ≥ 1 |
| streakTier 0 | streak = 0 |
| streakTier 1 | streak 1–2 |
| streakTier 2 | streak 3–6 |
| streakTier 3 | streak ≥ 7 |
| powerLevel | `min(3, floor((balanceTier + streakTier) / 2))` |
| energyMax | `3 + powerLevel` |
| openRadius | `30 + 5 × powerLevel` mét |
| compassLevel | `1 + powerLevel` |
| explorationScore | `uniqueOpenedH3Count + min(positionStreak, 7)` |

Khi assets giảm dưới 1 Mock USDC, `qualifyingSince` bị xóa và positionStreak trở về 0. Streak được tính lười tại deposit, withdrawal, accrue hoặc `refreshPosition`; UI không được tự tăng authoritative streak nếu chưa có snapshot mới.

### 5.5 Rarity và quest tier

| Rarity | explorationScore | Simulated APR | Quest tier | Quest deposit required |
|---|---:|---:|---:|---:|
| Common | 0–2 | 5.00% | 1 | 0.5 Mock USDC |
| Rare | 3–5 | 6.25% | 2 | 1 Mock USDC |
| Epic | 6–9 | 7.50% | 3 | 2 Mock USDC |
| Legendary | ≥ 10 | 10.00% | 4 | 3 Mock USDC |

- Rarity không dùng RNG và không thay đổi principal grant của Yield/Sponsor Chest.
- Mỗi deposit lot ghi nhận APR của rarity tại thời điểm tạo. YieldVault có thể aggregate bằng weighted APR sau khi accrue position cũ.
- Quest budget transfer đúng amount của tier; không cấp thêm nếu quest thất bại hoặc hết hạn.

---

## 6. Functional requirements

| ID | Requirement | Priority | Acceptance summary |
|---|---|---|---|
| FR-001 | User đăng nhập bằng email embedded wallet | P0 | Reload giữ đúng address; không lộ key |
| FR-002 | User kết nối Core wallet fallback | P0 | Chain switch và address hiển thị đúng |
| FR-003 | Faucet cấp gas test có rate limit | P0 | Không cấp lặp vượt quota wallet/IP |
| FR-004 | Map hiển thị Demo Campus và active chest | P0 | Mobile viewport, marker và distance đúng |
| FR-005 | Demo location có banner thường trực | P0 | Không thể bật mà không có nhãn |
| FR-006 | Backend cấp signed LocationProof | P0 | Không lưu raw GPS; proof bound và expiring |
| FR-007 | Chest claim một lần mỗi wallet/epoch | P0 | Duplicate/replay revert |
| FR-008 | Game L1 quản lý energy, XP, exploration | P0 | Deterministic và test được |
| FR-009 | Yield Chest tạo sponsor-funded position | P0 | 1 Mock USDC, idempotent qua ICM |
| FR-010 | Quest Chest đăng ký tutorial task | P0 | Tier/amount/expiry đúng rarity |
| FR-011 | User tự ký Quest deposit | P0 | Completion chỉ sau C-Chain receipt |
| FR-012 | Sponsor Chest yêu cầu QR + geofence | P0 | Proof sai/expired/replayed bị từ chối |
| FR-013 | Sponsor Chest top-up 2 Mock USDC | P0 | Trừ đúng principal budget |
| FR-014 | Vault accrue simulated yield | P0 | Không chi vượt reward reserve |
| FR-015 | User rút một phần/toàn bộ position | P0 | Chỉ owner; stats giảm theo snapshot |
| FR-016 | UI hiển thị ICM lifecycle | P0 | Không báo success trước ack |
| FR-017 | Retry dùng cùng requestId | P0 | Không tạo economic effect lần hai |
| FR-018 | Position page hiển thị source và explorer | P0 | Có chain, tx/message IDs, mock labels |
| FR-019 | Admin seed campus/campaign bằng script | P0 | Idempotent và không chứa private key trong repo |
| FR-020 | Analytics ghi funnel không có raw GPS | P1 | Schema privacy review pass |

---

## 7. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Map interactive trong ≤ 3 giây trên kết nối 4G thử nghiệm; UI phản hồi thao tác ≤ 100 ms trước khi chờ network |
| Reliability | 5 full-demo runs liên tiếp; ICM request có retry/reconciliation; relayer có health check |
| Security | EIP-712 proofs, nonce, expiry, source contract/chain validation, access control, checks-effects-interactions và reentrancy guard |
| Privacy | Không lưu raw GPS; email auth do wallet provider quản lý; analytics dùng wallet pseudonym/hash khi có thể |
| Accessibility | Touch target ≥ 44 px; không chỉ dùng màu; text zoom 200%; map action có list alternative; QR có manual code fallback |
| Compatibility | Mobile Chrome/Android và Safari/iOS gần nhất; desktop Chrome cho demo; PWA vẫn giải thích được khi install bị chặn |
| Observability | Correlation bằng requestId xuyên frontend, gateway và events; không log secret, private key, OTP hoặc raw GPS |
| Maintainability | Contract/API types sinh từ một schema hoặc ABI; constants gameplay có test snapshot; dependency versions được pin bằng lockfile |

---

## 8. UX và information architecture

### 8.1 Navigation

`Onboarding → Map → Chest Detail → Cross-chain Progress → Success → Position`

Bottom navigation sau onboarding:

- **Map:** chest, Compass, energy, current radius.
- **Quests:** active/completed quest và tutorial.
- **Position:** principal, simulated reward, APR, streak, withdraw.
- **Profile:** wallet, network, XP, exploration, demo disclosures.

### 8.2 Required UI states

Mỗi transaction/action phải hỗ trợ: `idle`, `needs_permission`, `needs_network`, `awaiting_signature`, `submitted`, `icm_pending`, `confirmed`, `retryable_error`, `final_error`.

UI không dùng một spinner không thời hạn. Sau 30 giây ICM pending, hiển thị “Still relaying” cùng requestId và nút refresh; sau 60 giây hiển thị hướng dẫn retry/reconciliation nhưng không tạo request mới tự động.

### 8.3 Core screens

1. Testnet disclosure + wallet choice.
2. Permission setup + gas readiness.
3. Map với chest filters và list alternative.
4. Chest sheet với type, deterministic reward, rarity, distance và energy cost.
5. ICM progress timeline hai chain.
6. Quest tutorial từng bước.
7. QR scanner/manual code.
8. Position + withdrawal preview.
9. Transaction evidence drawer.
10. Admin health page read-only: RPC, relayer, pool budgets và faucet status.

---

## 9. Technical architecture

### 9.1 Components

| Component | Runtime | Responsibility |
|---|---|---|
| PWA | Next.js, MapLibre, H3, thirdweb | UI, map, wallet, transaction tracking |
| Proof API | Next.js server routes | GPS/QR validation, EIP-712 signatures, rate limit |
| Game contracts | Avalanche Game L1 | chest, player state, progression, outbound/inbound ICM |
| Asset contracts | Fuji C-Chain | MockUSDC, budgets, positions, quest deposits, withdrawals |
| ICM relayer | Self-hosted public demo | Deliver bidirectional Teleporter messages |
| Analytics store | Minimal hosted DB | Non-sensitive funnel and operational events |

Public L1 setup dùng Builder Console/Platform CLI. Avalanche-CLI chỉ có thể dùng cho local fixture nếu cần và không được coi là production path vì tài liệu hiện hành đánh dấu deprecated: <https://build.avax.network/docs/tooling/avalanche-cli>.

ICM/Teleporter là asynchronous contract invocation với relayer, replay protection và retry semantics; implementation phải pin cùng major TeleporterMessenger trên hai chain: <https://build.avax.network/docs/cross-chain/icm-contracts/overview>.

### 9.2 Contract responsibilities

#### Game L1

**ChestManager**

- lưu campus root/allowlist version, epoch config và chest slots;
- verify `LocationProof` hoặc `SponsorProof` qua trusted proof signer;
- kiểm tra energy và claim key;
- tạo requestId duy nhất và chest request state;
- gọi GameICMGateway; không trực tiếp ghi nhận C-Chain deposit thành công.

**PlayerState**

- lưu XP, energy, lastEnergyEpoch, unique opened H3 set/count;
- lưu snapshot assets/streak mới nhất từ C-Chain;
- tính tiers, power, radius, Compass, exploration và rarity;
- chỉ GameICMGateway được áp dụng `PositionSnapshot`.

**GameICMGateway**

- encode/send `DepositRequest` và `QuestRegistration`;
- chỉ nhận message từ CChainICMGateway đúng blockchain ID/address;
- idempotent theo requestId + message kind;
- cập nhật request lifecycle, PlayerState và chest settlement.

#### Fuji C-Chain

**MockUSDC**

- ERC-20 6 decimals;
- mint role chỉ dùng trong deployment/seed; revoke hoặc chuyển sang timelock/admin rõ ràng sau seed;
- UI không được gọi token này là USDC thật.

**SponsorPool**

- tách accounting `principalBudget`, `questBudget`, `rewardReserve`;
- chỉ CChainICMGateway/QuestRouter được allocate theo vai trò;
- không bao giờ trả nhiều hơn từng budget;
- emit event cho fund, allocate và reward payout.

**YieldVault**

- position theo user: principal, accruedReward, weightedAprBps, lastAccruedAt, qualifyingSince;
- sponsored deposit chỉ từ gateway; quest deposit từ QuestRouter; optional direct deposit ngoài MVP bị tắt;
- accrue theo elapsed time và weighted APR, payout bị cap bởi rewardReserve khả dụng;
- partial/full withdrawal chỉ tới position owner;
- gọi gateway publish snapshot sau economic state change.

**QuestRouter**

- đăng ký quest chỉ từ CChainICMGateway;
- cho đúng player claim quest budget một lần;
- nhận approval/permit và deposit đúng requiredAmount vào YieldVault;
- không complete khi chỉ claim token mà chưa deposit;
- trigger completion snapshot/ack.

**CChainICMGateway**

- chỉ nhận message từ GameICMGateway đúng blockchain ID/address;
- deduplicate requestId trước external effects;
- route Yield/Sponsor allocation hoặc QuestRegistration;
- gửi failure code hoặc PositionSnapshot/completion về L1;
- expose reconciliation view cho frontend/admin.

### 9.3 ICM lifecycle

```text
CREATED
  → SENT
  → REMOTE_EXECUTED
  → ACK_PENDING
  → CONFIRMED

Any delivery step → RETRYABLE_FAILED → retry same requestId
Validated business rejection → FAILED_FINAL → optional energy refund
```

- `CONFIRMED` chỉ được set sau authenticated ack từ destination gateway.
- Duplicate delivery trả kết quả đã lưu, không lặp transfer/deposit.
- Out-of-order ack không được ghi đè terminal state.
- Relayer mất kết nối không biến request thành FAILED_FINAL.
- Self-hosted relayer phải có gas trên cả hai chain, health/metrics và restart policy. Hosted relayer ngắn hạn chỉ dùng spike, không dùng làm phụ thuộc Final Demo.

---

## 10. Public interfaces và schemas

Các schema dưới đây là canonical intent; implementation có thể dùng Solidity structs và TypeScript types sinh từ ABI nhưng không được đổi semantics.

### 10.1 Solidity-style types

```solidity
enum ChestType { YIELD, QUEST, SPONSOR }
enum Rarity { COMMON, RARE, EPIC, LEGENDARY }
enum RequestStatus {
    NONE, CREATED, SENT, REMOTE_EXECUTED,
    ACK_PENDING, CONFIRMED, RETRYABLE_FAILED, FAILED_FINAL
}

struct LocationProof {
    address player;
    bytes32 chestId;
    uint64 epoch;
    uint32 radiusMeters;
    bytes32 nonce;
    uint64 expiresAt;
    uint8 mode; // 0 = GPS, 1 = DEMO
    bytes signature;
}

struct SponsorProof {
    address player;
    bytes32 chestId;
    bytes32 campaignId;
    uint64 epoch;
    bytes32 nonce;
    uint64 expiresAt;
    bytes signature;
}

struct DepositRequest {
    bytes32 requestId;
    address player;
    ChestType sourceType;
    bytes32 sourceId;
    uint256 amount;
    Rarity rarity;
    uint64 epoch;
}

struct QuestRegistration {
    bytes32 requestId;
    bytes32 questId;
    address player;
    uint8 tier;
    uint256 requiredAmount;
    uint64 expiresAt;
}

struct PositionSnapshot {
    bytes32 requestId;
    address player;
    uint256 principal;
    uint256 accruedReward;
    uint32 weightedAprBps;
    uint32 positionStreak;
    uint64 updatedAt;
    bool questCompleted;
}
```

### 10.2 Required contract actions/events

| Contract | Public action | Critical event |
|---|---|---|
| ChestManager | `openChest(chestId, proof)` | `ChestOpenRequested` |
| GameICMGateway | `retryRequest(requestId)` | `CrossChainRequestSent`, `RequestSettled` |
| PlayerState | views only for users | `PlayerStatsUpdated` |
| SponsorPool | `fundPrincipal`, `fundQuest`, `fundRewards` | `BudgetFunded`, `BudgetAllocated` |
| YieldVault | `withdraw(amount)`, `refreshPosition()` | `PositionDeposited`, `PositionWithdrawn`, `RewardAccrued` |
| QuestRouter | `claimQuestFunds`, `depositForQuest` | `QuestFundsClaimed`, `QuestCompleted` |
| CChainICMGateway | reconciliation views | `RequestProcessed`, `SnapshotSent` |

### 10.3 Backend APIs

#### `GET /api/map-config`

Returns non-secret deployment/campus config. Active claim state và player stats vẫn đọc từ chain.

```json
{
  "campusId": "demo-campus-v1",
  "epochSeconds": 86400,
  "h3Resolution": 10,
  "center": { "lat": 10.8012, "lng": 106.6531 },
  "slots": [
    { "slot": 0, "type": "YIELD", "lat": 10.8012, "lng": 106.6531, "h3Cell": "<computed>" }
  ],
  "chains": { "gameL1": {}, "fujiC": {} },
  "demoLocationEnabled": true
}
```

#### `POST /api/proofs/location`

Request contains `wallet`, `chestId`, `latitude`, `longitude`, `accuracyMeters`, `capturedAt`, `mode`. Server checks current radius from PlayerState. Raw coordinates are discarded after response.

Success returns canonical `LocationProof`; errors use `OUTSIDE_RADIUS`, `LOW_ACCURACY`, `STALE_LOCATION`, `CHEST_INACTIVE`, `RATE_LIMITED`.

#### `POST /api/proofs/sponsor`

Request contains location fields plus `wallet`, `chestId`, `qrPayload`. Server verifies signed QR campaign, expiry and geofence. Success returns `SponsorProof`; QR secret/signing key never reaches client.

#### `POST /api/faucet/gas`

Request contains `wallet` and target `chainKey`. Maximum one successful top-up per wallet/chain/epoch and an IP/device abuse limit. Response returns `txHash`, amount and next eligible time. Faucet failure never changes game state.

### 10.4 Error envelope

```json
{
  "error": {
    "code": "OUTSIDE_RADIUS",
    "message": "Move closer to this chest.",
    "retryable": true,
    "requestId": "optional-correlation-id"
  }
}
```

---

## 11. Data, configuration và seed

### 11.1 On-chain source of truth

- Game L1: claim state, energy, XP, unique H3 count, request lifecycle và latest position snapshot.
- C-Chain: budgets, quest state, principal, reward accounting và withdrawals.
- Backend DB không được trở thành nguồn quyết định user đã nhận tiền hay hoàn thành quest.

### 11.2 Demo Campus seed

Tọa độ sau là dữ liệu hư cấu phục vụ demo kỹ thuật, không đại diện một trường/cửa hàng thật.

| Slot | Type | Latitude | Longitude | Sponsor campaign |
|---:|---|---:|---:|---|
| 0 | YIELD | 10.801200 | 106.653100 | — |
| 1 | QUEST | 10.801520 | 106.653420 | — |
| 2 | SPONSOR | 10.800920 | 106.653620 | `demo-coffee-v1` |
| 3 | YIELD | 10.800700 | 106.652980 | — |
| 4 | QUEST | 10.801780 | 106.652820 | — |

Implementation phải dùng thư viện H3 để tính cell từ tọa độ ở resolution 10 trong seed script; không hard-code giá trị H3 chưa được kiểm chứng trong PRD.

### 11.3 Environment separation

- `local`: epoch ngắn, local chains, deterministic test keys chỉ nằm trong fixture.
- `fuji-demo`: epoch 24 giờ, public RPC, secret manager, self-hosted relayer.
- Không dùng production/mainnet environment trong MVP.
- Contract addresses, blockchain IDs, chain IDs, RPC URLs và Teleporter version nằm trong một deployment manifest versioned; private keys không được commit.

---

## 12. Security, privacy và compliance

### 12.1 Threats và controls

| Threat | Control | Residual limitation |
|---|---|---|
| Gọi contract bỏ qua map | EIP-712 proof signer + expiry/nonce | Backend vẫn là trusted location oracle |
| GPS spoof | Accuracy/time checks, geofence, demo flag | Browser GPS không chống spoof tuyệt đối |
| QR sharing | Signed expiry, wallet-bound proof, geofence | Người ở cùng khu vực vẫn có thể chia sẻ payload |
| ICM replay/duplicate | Teleporter protection + app requestId dedupe | Cần test retry/out-of-order |
| Fake source gateway | Verify blockchain ID + contract address | Cấu hình sai có thể khóa message |
| Pool drain | Per-budget accounting, roles, caps, pause | Chưa phải audited production contract |
| Faucet abuse | Wallet/IP/epoch quota, low top-up | Sybil vẫn có thể dùng nhiều ví/IP |
| Admin abuse | Minimal roles, events, no arbitrary balance edit | Demo admin vẫn vận hành seed/faucet |
| Key leak | Secret manager, separate relayer/proof/faucet keys | Compromise cần rotate và pause |

### 12.2 Contract invariants

- Tổng principal allocations không vượt principalBudget đã fund.
- Tổng quest transfers không vượt questBudget đã fund.
- Tổng reward paid không vượt rewardReserve đã fund.
- Một requestId không tạo nhiều hơn một economic effect.
- Một claim key không chuyển từ terminal success về trạng thái khác.
- Chỉ owner rút và recipient luôn bằng owner.
- PlayerState chỉ nhận snapshot từ authenticated gateway.

### 12.3 Disclosure

Mọi màn hình có số dư/APR phải có testnet badge. Không dùng các câu “kiếm tiền”, “lợi nhuận đảm bảo” hoặc “USDC thật”. Nếu dự án chuyển sang mainnet, phải tạo PRD mới bao gồm legal review, audit, sanctions/eligibility, custody, sponsor terms và incident response; điều đó ngoài phạm vi release này.

---

## 13. Analytics

### 13.1 Events

`onboarding_started`, `wallet_connected`, `location_permission_result`, `map_loaded`, `chest_selected`, `proof_issued`, `chest_open_submitted`, `icm_state_changed`, `quest_tutorial_completed`, `quest_deposit_confirmed`, `position_viewed`, `withdraw_submitted`, `withdraw_confirmed`, `faucet_result`, `error_shown`.

Mỗi event chỉ chứa các field cần thiết: pseudonymous session/user ID, wallet hash hoặc address khi cần reconciliation, chestType, requestId, chainKey, status, latency và errorCode. Không chứa email, raw GPS, QR secret hoặc wallet private material.

### 13.2 Experiment questions

1. Người mới có hiểu chest tạo một vault position thay vì “tiền ngẫu nhiên” không?
2. Timeline hai chain có giúp họ hiểu ICM hay làm tăng nhầm lẫn?
3. Quest tutorial có đủ để user tự ký deposit không?
4. Việc withdrawal làm stats giảm có được dự đoán trước khi ký không?

---

## 14. Test plan và acceptance matrix

### 14.1 Contract tests

- Unit tests cho tier boundaries, epoch transition, energy refill/clamp, rarity và quest amount.
- Fuzz proof expiry/nonce/player/chest/epoch và withdrawal amounts.
- Invariant tests cho ba SponsorPool budgets và request idempotency.
- Duplicate ICM delivery không lặp deposit; duplicate ack không lặp XP.
- Out-of-order/unknown ack bị bỏ qua hoặc emit diagnostic event.
- Relayer pause rồi retry cùng requestId kết thúc đúng một lần.
- Partial withdraw qua các ngưỡng 10, 5 và 1 cập nhật stats đúng.
- Full withdraw reset qualifyingSince/streak sau snapshot.
- Reward accrual không vượt reserve và không underflow khi reserve cạn.
- Quest claim không đồng nghĩa completion; deposit sai amount/wallet/expired quest phải revert.

### 14.2 API tests

- Khoảng cách ở boundary radius pass; ngoài boundary fail.
- Accuracy > 50 m, timestamp stale, inactive chest, mismatched wallet đều fail.
- Server/log fixture chứng minh raw latitude/longitude không được persist.
- QR wrong signature/campaign/expiry/replay fail.
- Faucet quota theo wallet/chain/epoch và rate limit trả error envelope chuẩn.

### 14.3 Frontend/E2E tests

- Embedded wallet và Core hoàn tất onboarding độc lập.
- GPS denied, camera denied và manual QR fallback.
- Wrong network, insufficient gas, rejected signature, RPC timeout và offline recovery.
- Yield, Quest và Sponsor flows hiển thị đúng lifecycle, explorer evidence và mock labels.
- Reload giữa ICM pending khôi phục request từ chain, không tạo request khác.
- Withdrawal preview và actual post-withdraw stats khớp.
- Mobile viewport, keyboard navigation, screen-reader labels và map list alternative.

### 14.4 P0 acceptance matrix

| Scenario | Expected evidence |
|---|---|
| Yield Chest | L1 open tx, outbound message, C deposit event, inbound snapshot, stats update |
| Quest Chest | Registration message, tutorial, user-signed deposit receipt, completion ack |
| Sponsor Chest | QR/location proof, L1 open, 2 Mock USDC top-up, snapshot |
| Duplicate/replay | Revert/no-op và budgets không đổi lần hai |
| Withdrawal | C receipt, assets giảm, L1 stats giảm sau ack |
| Relayer interruption | Pending được giữ, retry xác nhận đúng một effect |
| Pool exhausted | FAILED_FINAL rõ ràng, không số âm, energy được hoàn theo rule |
| Demo disclosure | Mock/testnet/dev-location labels hiện ở mọi điểm liên quan |

Release pass khi tất cả P0 pass, full journey chạy 5 lần liên tiếp và không còn bug Severity 1/2.

---

## 15. AI build backlog

AI coding agent phải thực hiện theo thứ tự; mỗi task chỉ bắt đầu khi dependency pass tests. Không tạo bonus hoặc đổi stack khi chưa có change record.

| Order | Task | Output | Done when |
|---:|---|---|---|
| 1 | Repository foundation | Monorepo, env validation, lint/test commands, ADRs | Clean install + CI smoke pass |
| 2 | Shared domain package | Types, constants, tier functions, message encoders | Boundary unit tests pass |
| 3 | C-Chain accounting | MockUSDC, SponsorPool, YieldVault | Budget/yield/withdraw invariants pass |
| 4 | Game state | PlayerState, ChestManager, proof verification | Epoch/energy/claim tests pass |
| 5 | ICM spike | Gateways + one Yield round-trip | Public request and ack evidence saved |
| 6 | Quest flow | QuestRegistration, budget claim, user deposit | Quest E2E contract test pass |
| 7 | Sponsor flow | SponsorProof and sourceType routing | QR/top-up E2E test pass |
| 8 | Proof/faucet APIs | Signed proofs, gas quota, privacy-safe logs | API negative tests pass |
| 9 | Wallet shell | thirdweb email + Core, chain/gas readiness | Both wallet paths pass smoke test |
| 10 | Map PWA | Demo Campus, chest sheet, GPS/dev location | Mobile map/proof flow pass |
| 11 | ICM progress UI | Persisted request timeline, retry/reconcile | Reload/pending tests pass |
| 12 | Quest/QR/Position UI | Tutorial, scanner/manual, withdraw preview | Three flows pass E2E |
| 13 | Operations | Self-hosted relayer, health page, seed/reset runbook | Restart recovery demonstrated |
| 14 | QA and evidence | Test report, explorer links, five-run log | P0 matrix complete |
| 15 | Submission assets | README, slides, 2–3 minute video | Links pass incognito review |

### 15.1 Coding constraints for AI

- Không thay on-chain source of truth bằng database cache.
- Không dùng floating point cho token/reward accounting; dùng integer units và basis points.
- Không commit secrets hoặc test private keys ngoài local fixture rõ ràng.
- Không báo success từ HTTP 200 hoặc source transaction; chờ destination effect + authenticated ack.
- Không tạo token bridge: ICM gửi instruction; MockUSDC budget đã nằm trên C-Chain.
- Không gọi simulated APR là APY thật hoặc production yield.
- Mỗi feature PR phải kèm tests, error states và cập nhật ABI/type tương ứng.

---

## 16. Delivery timeline

| Date | Deliverable | Exit criteria |
|---|---|---|
| 05–06/11 | PRD, seed, repo và wallet/L1 spike | PRD approved; commands và owners rõ |
| 07–08/11 | Public ICM round-trip | L1→C→L1 evidence và retry notes |
| 09–11/11 | Contracts, vault và reserves | Unit/invariant suite pass |
| 12–14/11 | Map, wallet, proofs, QR và faucet | Mobile shell chạy với real contracts |
| 15–16/11 | Three chest flows + withdrawal | P0 happy paths pass |
| 17–18/11 | Relayer, telemetry, failure handling | Restart/retry drill pass |
| 19/11 | 3–5 user tests + mentor review | Findings triaged; Severity 1/2 fixed |
| 20/11 | Code freeze, README, slides, video | Incognito link audit pass |
| 21/11 | Buffer và submission | Submit trước 23:59 UTC+7 |

---

## 17. Risks và mitigations

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| ICM/L1 không ổn định kịp hạn | High | Critical | Spike đầu tiên, pin versions, self-host relayer, request reconciliation |
| Embedded wallet không hỗ trợ path mong muốn | Medium | High | Core fallback là P0; gate 12/11 |
| Scope ba chest quá lớn | High | High | Tái sử dụng gateway/deposit path; cấm bonus; strict backlog |
| GPS/QR bị giả | High | Medium | Proof signer, expiry, nonce, geofence và disclosure |
| Pool/reward hết trong demo | Medium | High | Health page, preflight budget check, seed/reset runbook |
| ICM chậm trong video | Medium | High | Record trên stable deployment, hiển thị progress, có evidence drawer |
| Người dùng tưởng là tiền thật | Medium | High | Persistent testnet/mock labels và comprehension check |
| Relayer hosted hết hạn | High | High | Self-host trước 17/11; restart monitoring |
| Third-party outage | Medium | Medium | Core/manual RPC fallback, cache non-authoritative config |

---

## 18. Demo script 2–3 phút

1. **0:00–0:20 — Problem:** onboarding DeFi đang bắt người mới học trước rồi mới được làm; DeFi Trail đảo thứ tự bằng trải nghiệm bản đồ.
2. **0:20–0:40 — Onboarding:** email/Core, testnet disclosure, Demo location banner và map.
3. **0:40–1:20 — Yield Chest:** vào radius, ký trên Game L1, theo dõi ICM, thấy 1 Mock USDC position trên C-Chain và stats tăng.
4. **1:20–1:55 — Quest/Sponsor:** mở Quest để thấy user-signed deposit; quét QR Sponsor để top-up. Nếu thời lượng ngắn, dùng dữ liệu đã chuẩn bị và explorer evidence.
5. **1:55–2:20 — Withdrawal:** rút một phần, snapshot quay về và radius/Compass giảm.
6. **2:20–2:45 — Why Avalanche:** game state trên L1, asset state trên C-Chain, ICM nối hai phần; chỉ mock/testnet trong MVP.
7. **2:45–3:00 — Evidence:** repo/tests, explorer links, giới hạn GPS và roadmap.

Preflight: kiểm tra RPC, relayer health, gas cả hai chain, pool budgets, wallet session, QR expiry, active epoch, screen recording và tất cả public links.

---

## 19. Future work

Chỉ xem xét sau MVP:

- nhiều campus và sponsor campaign dashboard;
- Territory/H3 ownership dựa trên thời gian giữ vị thế;
- leaderboard theo hex với privacy review;
- Contract Deployer Allow List precompile;
- stronger proof-of-presence như rotating beacon/device attestation;
- audited production vault hoặc tích hợp yield protocol thật;
- mainnet/legal/security workstream riêng.

---

## 20. Open operational items

Các mục này không thay đổi product behavior nhưng phải được điền trước deployment:

- Game L1 blockchain ID, chain ID, RPC và explorer URL.
- Fuji C-Chain contract addresses.
- TeleporterMessenger/Registry version và addresses.
- GameICMGateway/CChainICMGateway trusted remote identifiers.
- Proof signer, relayer và faucet public addresses; secrets nằm trong secret manager.
- Self-hosted relayer host, owner, restart command và alert channel.
- Thirdweb project/client ID và allowed domains.
- Analytics retention period và người có quyền truy cập.

---

## 21. Glossary

| Term | Meaning |
|---|---|
| Game L1 | Avalanche L1 dành cho game state của DeFi Trail |
| Fuji C-Chain | Avalanche C-Chain testnet chứa MockUSDC và vault |
| ICM | Avalanche Interchain Messaging |
| Teleporter | EVM contract layer hỗ trợ gửi/nhận ICM message |
| Relayer | Dịch vụ chuyển signed message từ source sang destination chain |
| Mock USDC | ERC-20 test token 6 decimals, không phải USDC thật |
| Simulated APR | Tỷ lệ reward testnet trả từ reserve nạp trước |
| Epoch | Chu kỳ claim/energy; public demo là 24 giờ |
| H3 | Chỉ mục ô lục giác dùng cho campus/exploration |
| LocationProof | EIP-712 proof ngắn hạn do backend ký sau khi kiểm tra vị trí |
| PositionSnapshot | Bản trạng thái vault được C-Chain gửi về Game L1 |
| Terminal state | CONFIRMED hoặc FAILED_FINAL; không được ghi đè bởi message đến muộn |

---

## 22. Approval checklist

- [x] Tên working product: DeFi Trail.
- [x] Release chỉ dùng Fuji/testnet và Mock USDC.
- [x] Full core gồm ba chest; bonus ngoài MVP.
- [x] Mỗi wallet claim một chest một lần mỗi epoch.
- [x] Sponsor-funded assets thuộc position của user và có thể rút.
- [x] Deterministic tiers/rarity; không RNG.
- [x] Backend-signed location proof; công khai giới hạn spoofing.
- [x] Embedded wallet + Core fallback.
- [x] Self-hosted relayer là target cho public demo.
- [x] Acceptance matrix và backlog đủ để bắt đầu implementation.

Thay đổi bất kỳ mục đã khóa nào phải ghi một change record gồm lý do, tác động tới contracts/API/tests, owner và ngày quyết định.
