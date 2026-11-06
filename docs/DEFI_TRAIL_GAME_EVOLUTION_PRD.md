# DeFi Trail — Game Evolution PRD

**Phiên bản:** 1.0  
**Ngày:** 06/11/2026  
**Trạng thái:** Draft for implementation after Task 13 stabilization  
**Quan hệ với tài liệu gốc:** Bổ sung cho `DeFi-Trail-PRD.md`; không thay thế các invariant về testnet, quyền sở hữu tài sản, privacy hoặc ICM  
**Mục tiêu:** Chuyển DeFi Trail từ một vertical slice kỹ thuật thành một campus adventure có mục tiêu, khả năng quay lại và giá trị triển khai thực tế mà không viết lại lõi đã xây

> Tuyên bố sản phẩm: **DeFi Trail là một cuộc phiêu lưu theo tuyến trên campus. Người chơi khám phá địa điểm, hoàn thành nhiệm vụ DeFi có hướng dẫn, thu thập Passport Stamp, đóng góp cho đội và mở khóa quyền lợi sự kiện. Blockchain là lớp chứng minh ở phía sau, không phải bài kiểm tra kiến thức ở phía trước.**

---

## 0. Executive summary

### 0.1 Vấn đề của phiên bản hiện tại

Lõi hiện tại đã chứng minh được trải nghiệm `Map → Location Proof → Chest → ICM → Vault Position → Progression`, nhưng vòng lặp còn rời rạc. Một chest tạo được khoảnh khắc demo tốt, chưa tự tạo ra lý do để người chơi:

- biết hôm nay mình cần làm gì;
- hoàn thành nhiều chest trong một phiên;
- quay lại vào ngày tiếp theo;
- mời bạn bè hoặc chơi theo nhóm;
- cảm nhận một thành tựu ngoài số dư Mock USDC;
- thấy giá trị đời thực của Sponsor Chest.

### 0.2 Giải pháp

Thêm một **Engagement Layer** bên trên lõi hiện có:

1. **Trail:** tuyến nhiệm vụ gồm 3–5 chest đã có.
2. **Passport:** bộ sưu tập stamp từ địa điểm, trail và mùa.
3. **Badge:** thành tựu có điều kiện xác định, không RNG.
4. **Team:** điểm cộng đồng được tổng hợp từ các hành động đã xác nhận.
5. **Season/Event:** thay theme, nội dung và mục tiêu mà không thay contract.
6. **Sponsor Perk:** quyền lợi ngoài chuỗi, chỉ phát sau bằng chứng hợp lệ.
7. **Relay Moment:** biến thời gian chờ ICM thành một phần kể chuyện và học tập.

### 0.3 Thay đổi chiến lược

Sản phẩm không nhắm tới việc trở thành một game thế giới mở chơi quanh năm ngay lập tức. Beachhead market là chiến dịch có điểm bắt đầu và kết thúc:

- orientation week của trường;
- workshop Web3;
- hackathon/conference;
- activation của câu lạc bộ;
- sponsor booth trail.

Release ứng dụng đầu tiên của PRD này là **7-Day Campus Quest**.

---

## 1. Grounded baseline

### 1.1 Đã được xác nhận trong codebase

Graphify hiện ghi nhận các bề mặt triển khai sau:

- Map và chest UI: `InteractiveMap`, `ChestBottomSheet`, `VirtualCompass`, `DemoLocationBanner`.
- Progression dùng chung: balance tier, streak tier, power, energy, radius, compass và rarity trong `packages/shared`.
- Cross-chain UX: `ICMProgressModal`, `useICMProgress`, local persistence và request status mapping.
- Quest, Sponsor và Position UI: `QuestTutorialModal`, `SponsorScannerModal`, `PositionView`.
- Game L1: `ChestManager`, `PlayerState`, `GameICMGateway`.
- Fuji C-Chain: `CChainICMGateway`, `SponsorPool`, `QuestRouter`, `YieldVault`, `MockUSDC`.
- Wallet, testnet banner, network switching và faucet.
- Task 13 đang được triển khai ở `packages/relayer` và admin health page/API.

### 1.2 Giới hạn bằng chứng

- Snapshot Archify hiện cũ hơn code Task 13 và chỉ phản ánh một phần repository.
- Trước khi bắt đầu implementation theo PRD này phải refresh Archify sau khi Task 13 ổn định.
- Mọi đường dẫn module trong target architecture dưới đây là quyết định thiết kế của PRD mới, không phải tuyên bố rằng file đó đã tồn tại.

### 1.3 Lõi bất biến

Các phần sau không được thay đổi trong Phase 1–3 nếu không có ADR và change record:

- Game state tiếp tục ở Game L1; asset state tiếp tục ở Fuji C-Chain.
- ICM chỉ truyền instruction/snapshot; không tạo token bridge.
- Mock USDC và simulated yield không được mô tả là tiền hoặc lợi nhuận thật.
- Không lưu raw GPS trong database, log hoặc analytics.
- Không báo chest/trail thành công trước authenticated ack hoặc bằng chứng terminal hợp lệ.
- Retry tiếp tục dùng cùng `requestId` và không tạo economic effect lần hai.
- Sponsor perk không được làm thay đổi quyền sở hữu hoặc accounting của vault.
- Engagement database, nếu có, không được trở thành source of truth cho tài sản, chest claim hoặc quest completion kinh tế.

---

## 2. Product vision và positioning

### 2.1 Vision

Biến một buổi onboarding DeFi thành chuyến khám phá có thể hoàn thành cùng bạn bè, nơi mỗi địa điểm dạy một hành động nhỏ và mọi thành tựu quan trọng đều có bằng chứng.

### 2.2 Tagline

**Walk. Open. Learn. Belong.**  
Đi khám phá — mở rương — học bằng hành động — đóng góp cho cộng đồng.

### 2.3 Product promise

Trong 15 phút đầu tiên, một người chưa biết DeFi có thể:

1. vào game bằng email hoặc Core;
2. chọn một trail rõ ràng;
3. hoàn thành chest đầu tiên;
4. hiểu rằng reward là testnet/mô phỏng;
5. nhận stamp đầu tiên;
6. thấy bước tiếp theo và tiến độ của đội.

### 2.4 Không định vị là

- ứng dụng kiếm tiền;
- sản phẩm đầu tư;
- APR comparison tool;
- game đầu cơ token;
- NFT marketplace;
- anti-cheat location platform tuyệt đối.

---

## 3. Personas và jobs to be done

### 3.1 Student Explorer

**Job:** “Khi tham gia một sự kiện hoặc khám phá campus, tôi muốn có một hành trình ngắn, dễ hiểu và có thể chơi cùng bạn bè để trải nghiệm Web3 mà không cần học lý thuyết trước.”

Nhu cầu:

- onboarding dưới 60 giây, không bắt hiểu chain trước;
- mục tiêu tiếp theo luôn rõ;
- tiến độ và phần thưởng dễ hiểu;
- có thành tựu để chia sẻ;
- không sợ mất tiền thật.

### 3.2 Social Captain

**Job:** “Tôi muốn rủ bạn bè vào đội và thấy đóng góp của cả nhóm tạo ra kết quả chung.”

Nhu cầu:

- link/invite code;
- team progress;
- mục tiêu cộng đồng;
- leaderboard công bằng, không pay-to-win.

### 3.3 Event Organizer

**Job:** “Tôi muốn cấu hình một trail, theo dõi completion và vận hành sự kiện mà không deploy lại contract.”

Nhu cầu:

- template chiến dịch;
- lịch bắt đầu/kết thúc;
- health/readiness;
- analytics không chứa GPS thô;
- seed/reset và incident playbook.

### 3.4 Sponsor Operator

**Job:** “Tôi muốn tạo một điểm đến có thể đo lượt ghé thăm và phát quyền lợi một lần mà không can thiệp vào tài sản của người chơi.”

Nhu cầu:

- QR campaign;
- perk inventory;
- redemption audit;
- fraud controls cơ bản;
- báo cáo conversion tổng hợp.

---

## 4. North-star journey: 7-Day Campus Quest

### 4.1 Một phiên chơi tiêu chuẩn

1. Người chơi mở app và thấy **Today’s Trail**.
2. Trail hiển thị 3 checkpoint, thời gian ước tính và quyền lợi hoàn thành.
3. Người chơi chọn Start Trail; app ưu tiên chỉ đường đến checkpoint gần nhất.
4. Mỗi checkpoint tái sử dụng Yield, Quest hoặc Sponsor Chest hiện có.
5. Trong lúc ICM relaying, app hiển thị Relay Moment thay vì spinner vô hạn.
6. Sau authenticated confirmation, checkpoint được đánh dấu hoàn thành.
7. Hoàn thành đủ checkpoint tạo một Passport Stamp và team points.
8. Nếu trail có perk, người chơi nhận claim ticket ngoài chuỗi có expiry và trạng thái redemption.
9. Home hiển thị trail ngày mai, collection còn thiếu và tiến độ 7 ngày.

### 4.2 Cấu trúc 7 ngày gợi ý

| Ngày | Chủ đề | Hành vi chính |
|---:|---|---|
| 1 | First Steps | Yield Chest và giải thích position |
| 2 | Learn to Sign | Quest tutorial + deposit |
| 3 | Local Discovery | Hai chest ở hai H3 khác nhau |
| 4 | Sponsor Day | QR + sponsor perk |
| 5 | Team Push | Đóng góp vào community goal |
| 6 | Power Day | Giải thích power/radius/energy |
| 7 | Final Trail | Chuỗi 3 chest + season badge |

### 4.3 Completion không thay thế economic truth

- Checkpoint economic chỉ hoàn tất sau trạng thái on-chain hợp lệ.
- Trail completion được dẫn xuất từ các checkpoint đã xác nhận.
- Passport/badge/team point có thể là engagement state ngoài chuỗi nhưng phải lưu `evidenceRef` tới `requestId`, transaction hash hoặc claim event tương ứng.

---

## 5. Core gameplay systems

### 5.1 Trail

Trail là một tập checkpoint có thứ tự hoặc không thứ tự.

```ts
interface TrailDefinition {
  id: string;
  seasonId: string;
  title: string;
  description: string;
  checkpointMode: "ORDERED" | "ANY_ORDER";
  checkpointChestIds: string[];
  startsAt: string;
  endsAt: string;
  estimatedMinutes: number;
  completionBadgeId?: string;
  perkCampaignId?: string;
  enabled: boolean;
}
```

Quy tắc:

- Một trail có 2–5 checkpoint trong pilot.
- Không tự tạo chest economic mới; chỉ tham chiếu chest/campaign đã seed.
- Trail config phải versioned và có validation.
- Trail hết hạn không làm mất stamp đã nhận.
- Duplicate event không tăng completion hoặc team point hai lần.

### 5.2 Passport và Stamp

Passport là màn hình bộ sưu tập, không phải ví tài sản.

Stamp có thể đại diện cho:

- địa điểm;
- trail;
- mùa;
- loại hành động học tập;
- sponsor campaign.

```ts
interface PassportStamp {
  stampId: string;
  player: string;
  category: "LOCATION" | "TRAIL" | "SEASON" | "LEARNING" | "SPONSOR";
  earnedAt: string;
  evidenceRef: string;
  artworkKey: string;
}
```

Quy tắc:

- Một `stampId + player` chỉ được cấp một lần, trừ khi định nghĩa ghi rõ theo season.
- Stamp không chuyển nhượng và không có giá trị tiền tệ.
- UI phải cho thấy stamp locked, in progress và earned.

### 5.3 Badge

Badge là achievement deterministic. Ví dụ:

- First Chest;
- Three Chest Types;
- Five Unique H3;
- Seven-Day Trail;
- Sponsor Explorer;
- Team Contributor;
- Relay Resilience: một request retry và cuối cùng confirmed.

Điều kiện phải khai báo bằng rule có version, không dùng code tùy ý do admin nhập.

```ts
interface BadgeRule {
  badgeId: string;
  ruleVersion: number;
  eventType: string;
  threshold: number;
  window: "LIFETIME" | "SEASON" | "EPOCH";
}
```

### 5.4 Team và community goal

Pilot có 3–4 team. Người chơi chọn một lần trong season hoặc nhận team từ invite code.

Điểm hợp lệ:

- checkpoint confirmed;
- unique trail completed;
- quest tutorial completed và deposit confirmed;
- sponsor redemption confirmed, nếu campaign cho phép.

Điểm không hợp lệ:

- HTTP success trước on-chain confirmation;
- duplicate request;
- retry cùng request;
- demo/admin seed;
- perk redemption lặp.

Leaderboard là read model, không ảnh hưởng reward accounting hoặc power level on-chain.

### 5.5 Season

Season gói theme, thời gian, teams, trails, badges và sponsor campaigns.

```ts
interface SeasonDefinition {
  id: string;
  name: string;
  startsAt: string;
  endsAt: string;
  themeKey: string;
  teamIds: string[];
  trailIds: string[];
  status: "DRAFT" | "SCHEDULED" | "ACTIVE" | "ENDED";
}
```

Không thay đổi công thức financial progression ở Phase 1. Season progression là lớp hiển thị và engagement riêng.

### 5.6 Sponsor Perk

Perk là quyền lợi ngoài chuỗi, tách khỏi Mock USDC.

Ví dụ:

- mã giảm giá;
- topping miễn phí;
- merchandise;
- vé workshop;
- quyền vào hoạt động tại booth.

```ts
interface PerkClaim {
  claimId: string;
  campaignId: string;
  player: string;
  evidenceRef: string;
  issuedAt: string;
  expiresAt: string;
  status: "ISSUED" | "REDEEMED" | "EXPIRED" | "REVOKED";
}
```

Controls:

- một claim trên mỗi wallet/campaign/rule;
- claim token có entropy đủ mạnh và không chứa private data;
- redemption idempotent;
- operator không thể sửa vault position;
- UI ghi rõ perk do sponsor cung cấp và điều kiện sử dụng.

### 5.7 Relay Moment

Trong lúc ICM pending:

- hiển thị hành trình Game L1 → Relayer → C-Chain → Snapshot;
- cho phép xem Passport, câu hỏi học tập hoặc checkpoint tiếp theo;
- sau 30 giây giữ hành vi “Still relaying” hiện tại;
- sau 60 giây giữ retry cùng requestId;
- không dùng animation để giả lập confirmed.

---

## 6. Information architecture

Bottom navigation đề xuất:

- **Home:** Today’s Trail, season progress, next action.
- **Map:** chest và checkpoint.
- **Passport:** stamps, badges, collections.
- **Team:** leaderboard và community goal.
- **Position:** vault, simulated yield, withdrawal.

Quest tutorial và Sponsor scanner tiếp tục là modal/flow từ checkpoint tương ứng.

### 6.1 Core screens mới

1. Season onboarding và team selection.
2. Today’s Trail card.
3. Trail detail/checkpoint progress.
4. Trail completion celebration.
5. Passport collection grid.
6. Badge detail với điều kiện rõ ràng.
7. Team leaderboard và community goal.
8. Sponsor perk wallet/redemption screen.
9. Share card không chứa số dư nhạy cảm mặc định.
10. Organizer campaign health/read-only dashboard.

### 6.2 UX principles

- Màn hình đầu tiên nói “đi đâu/làm gì”, không nói “switch chain” trước.
- Thuật ngữ kỹ thuật nằm trong Evidence drawer hoặc Learn More.
- Mọi reward phải phân biệt: `Mock USDC`, `Badge`, `Team Point`, `Sponsor Perk`.
- Celebration chỉ xảy ra sau evidence hợp lệ.
- Có list alternative cho mọi map action.
- Không dùng streak loss mang tính trừng phạt trong pilot; hiển thị recovery path.

---

## 7. Functional requirements

| ID | Requirement | Priority | Acceptance summary |
|---|---|---:|---|
| GE-FR-001 | Home hiển thị active season và Today’s Trail | P0 | Có empty/loading/error/ended states |
| GE-FR-002 | User start và resume trail | P0 | Reload không mất progress đã xác nhận |
| GE-FR-003 | Checkpoint liên kết chest hiện có | P0 | Không duplicate economic action |
| GE-FR-004 | Trail completion dẫn xuất từ checkpoint | P0 | Không tin client-only completion |
| GE-FR-005 | Passport hiển thị locked/in-progress/earned | P0 | EvidenceRef truy vết được |
| GE-FR-006 | First Chest và Trail Complete badge | P0 | Idempotent và deterministic |
| GE-FR-007 | Relay Moment tích hợp ICM state | P0 | Không báo success sớm |
| GE-FR-008 | Team selection trong season | P1 | Không đổi team ngoài policy |
| GE-FR-009 | Team leaderboard từ event hợp lệ | P1 | Retry/duplicate không tăng điểm |
| GE-FR-010 | Sponsor perk issued sau proof/evidence | P1 | Một claim hợp lệ, có expiry |
| GE-FR-011 | Redemption idempotent | P1 | Audit được operator/time/status |
| GE-FR-012 | Share card | P1 | Không lộ raw GPS/email/default balance |
| GE-FR-013 | Organizer cấu hình season/trail | P1 | Validate và preview trước publish |
| GE-FR-014 | Analytics funnel mới | P0 | Không có raw GPS/QR secret |
| GE-FR-015 | Admin xem readiness | P0 | Kế thừa Task 13 health + campaign checks |

---

## 8. Architecture boundaries

### 8.1 Target modules

```text
apps/web/src/features/gameplay/
  home/
  trails/
  passport/
  badges/
  teams/
  seasons/
  perks/
  relay-moment/

apps/web/src/app/api/gameplay/
  seasons/
  trails/
  progress/
  passport/
  teams/
  perks/

packages/shared/src/gameplay/
  types.ts
  schemas.ts
  rules.ts
  scoring.ts

packages/gameplay-indexer/        # chỉ tạo khi Phase 4 được duyệt
  src/
    readers/
    reducers/
    repositories/
```

### 8.2 Allowed dependencies

- Gameplay UI có thể dùng map/cross-chain/shared types qua public exports.
- Shared gameplay phải là pure types/schema/rules, không phụ thuộc React hoặc private keys.
- API có thể đọc chain evidence và engagement store.
- Engagement store chỉ lưu season/trail/team/stamp/badge/perk/read-model data.
- Indexer, nếu được thêm, chỉ đọc events và tạo read model có thể rebuild.

### 8.3 Forbidden dependencies

- Gameplay UI không import contract implementation hoặc server secret.
- Trail completion không ghi trực tiếp vào `PlayerState` ở Phase 1–3.
- Team point không được dùng để tính vault reward.
- Perk service không được gọi hàm admin thay đổi balance.
- Không lưu latitude/longitude trong progress, passport hoặc leaderboard.
- Không sửa smart contract chỉ để phục vụ UI celebration.

### 8.4 Contract-change gate

Chỉ xem xét contract thay đổi nếu cả ba điều đúng:

1. Hai vòng pilot chứng minh off-chain/derived approach không đủ.
2. Requirement cần trustless ownership hoặc composability thực sự.
3. Có threat model, migration plan, invariant tests và audit impact.

---

## 9. Data và API contracts

### 9.1 Canonical event envelope

```ts
interface GameplayEvidenceEvent {
  eventId: string;
  eventType:
    | "CHEST_CONFIRMED"
    | "QUEST_COMPLETED"
    | "TRAIL_COMPLETED"
    | "PERK_REDEEMED";
  player: string;
  seasonId: string;
  trailId?: string;
  checkpointId?: string;
  requestId?: string;
  chainId?: number;
  txHash?: string;
  occurredAt: string;
  mode: "GPS" | "DEMO";
}
```

### 9.2 Proposed APIs

- `GET /api/gameplay/seasons/active`
- `GET /api/gameplay/trails/today?wallet=...`
- `GET /api/gameplay/trails/:trailId/progress?wallet=...`
- `POST /api/gameplay/trails/:trailId/reconcile`
- `GET /api/gameplay/passport?wallet=...`
- `POST /api/gameplay/teams/join`
- `GET /api/gameplay/teams/leaderboard?seasonId=...`
- `POST /api/gameplay/perks/:campaignId/claim`
- `POST /api/gameplay/perks/:claimId/redeem`

Mọi mutation cần authentication/signature policy trước pilot public. `wallet` query không tự chứng minh ownership.

### 9.3 Storage decision

PRD không khóa nhà cung cấp database. Trước Phase 4 phải tạo ADR lựa chọn giữa:

- Postgres managed;
- SQLite cho single-host pilot;
- event/indexer store khác.

Tiêu chí: idempotency, unique constraints, backup, audit, PII minimization và khả năng rebuild từ evidence.

---

## 10. Metrics và analytics

### 10.1 North-star metric

**Weekly Verified Trail Finishers:** số wallet duy nhất hoàn thành ít nhất một trail với toàn bộ checkpoint có evidence hợp lệ trong tuần.

### 10.2 Funnel

1. `season_viewed`
2. `trail_started`
3. `first_checkpoint_confirmed`
4. `trail_completed`
5. `passport_viewed`
6. `team_joined`
7. `perk_issued`
8. `perk_redeemed`
9. `next_day_returned`

### 10.3 Pilot targets

| Metric | Target đầu tiên |
|---|---:|
| Onboarding → trail started | ≥ 70% |
| Trail started → first checkpoint | ≥ 65% |
| First checkpoint → trail complete | ≥ 55% |
| Median first confirmed checkpoint | ≤ 3 phút |
| D1 return trong 7-Day Quest | ≥ 30% |
| 5/7-day completion | ≥ 20% |
| Sponsor perk redemption | ≥ 25% người được cấp |
| Hiểu đúng mock/testnet | ≥ 80% người test |
| Duplicate points/perks | 0 |

Các target là hypothesis cho pilot, không phải số liệu thị trường đã được chứng minh.

---

## 11. Security, privacy và abuse controls

- Không lưu raw GPS hoặc QR secret.
- Hash/pseudonymize wallet trong analytics khi không cần reconciliation.
- Mọi team score reducer phải idempotent theo `eventId`/`requestId`.
- Perk claim có unique constraint theo campaign policy.
- Redemption cần operator identity, timestamp và audit event.
- Demo mode được giữ trong evidence và có thể tách khỏi leaderboard public.
- Rate limit trail reconcile, team join, perk claim và redemption.
- Không dùng frontend localStorage làm authoritative trail completion.
- Organizer không được có endpoint chỉnh arbitrary passport/team score.
- Có reconcile job từ on-chain events để sửa read model sai lệch.

---

## 12. Rollout roadmap

### Phase 0 — Stabilize baseline

- Hoàn tất Task 13 và commit riêng.
- Chạy test/lint/typecheck hiện có.
- Refresh Archify và Graphify.
- Chốt architecture boundary và ADR engagement state.

**Exit:** clean baseline, health page và relayer không regression.

### Phase 1 — Trail vertical slice

- shared gameplay schemas;
- một season hard-coded/versioned;
- Today’s Trail;
- progress từ chest evidence;
- completion celebration.

**Exit:** người dùng hoàn thành một trail 3 checkpoint, reload vẫn khôi phục đúng.

### Phase 2 — Passport và Badge

- passport grid;
- First Chest, Three Types, Trail Complete badges;
- evidence drawer;
- share card privacy-safe.

**Exit:** stamp/badge idempotent và truy vết tới evidence.

### Phase 3 — Relay Moment và UX polish

- animation/narrative trong ICM pending;
- learning card;
- next checkpoint CTA;
- accessibility và no-infinite-spinner verification.

**Exit:** không thay semantics của `useICMProgress`; pending/retry/reload tests pass.

### Phase 4 — Team và leaderboard

- ADR storage/indexing;
- team join policy;
- event reducer;
- leaderboard/community goal;
- reconciliation.

**Exit:** duplicate/retry không tăng điểm; read model rebuild được.

### Phase 5 — Sponsor Perk

- campaign inventory;
- claim ticket;
- operator redemption;
- expiry/audit;
- sponsor conversion metrics.

**Exit:** một campaign chạy end-to-end, không ảnh hưởng vault accounting.

### Phase 6 — 7-Day Pilot

- content 7 ngày;
- organizer runbook;
- 30–50 người pilot;
- usability interviews;
- metrics report và backlog quyết định.

**Exit:** có dữ liệu thật để quyết định tiếp tục, sửa hay dừng từng feature.

---

## 13. Prioritized backlog

| Order | ID | Task | Contract change |
|---:|---|---|---|
| 1 | GE-00 | Baseline audit + refresh Archify/Graphify | No |
| 2 | GE-01 | Shared gameplay types, schemas và validation | No |
| 3 | GE-02 | Season/Trail config và read API | No |
| 4 | GE-03 | Trail home/detail/checkpoint integration | No |
| 5 | GE-04 | Evidence reconciliation và progress persistence | No |
| 6 | GE-05 | Passport + deterministic badge engine | No |
| 7 | GE-06 | Relay Moment integration | No |
| 8 | GE-07 | Analytics + pilot dashboard | No |
| 9 | GE-08 | Engagement storage ADR và repository boundary | No |
| 10 | GE-09 | Team join + leaderboard reducer | No |
| 11 | GE-10 | Sponsor perk claim/redemption | No |
| 12 | GE-11 | Organizer campaign workflow | No |
| 13 | GE-12 | 7-Day content, QA và pilot evidence | No |

---

## 14. Test strategy

### 14.1 Unit

- trail completion ordered/any-order;
- time window boundaries;
- badge thresholds;
- team scoring idempotency;
- perk claim uniqueness/expiry;
- demo mode filtering;
- deterministic serialization/schema validation.

### 14.2 Integration

- chest confirmed → checkpoint completed;
- duplicate event → no duplicate progress;
- retry same request → no duplicate point;
- trail complete → one stamp/badge;
- perk claim requires eligible evidence;
- redemption concurrency produces exactly one success.

### 14.3 E2E

- start/resume/complete trail;
- reload during ICM pending;
- Quest and Sponsor checkpoint variants;
- passport after completion;
- team leaderboard update;
- perk claim/redemption;
- denied GPS/camera và manual fallback;
- demo banner xuyên suốt flow.

### 14.4 Regression

Mỗi phase phải giữ pass:

- wallet onboarding;
- map/proof;
- ba chest;
- withdrawal;
- ICM retry/idempotency;
- relayer/admin health;
- privacy invariants;
- contract invariant suite.

---

## 15. Go/no-go gates

| Gate | Pass condition |
|---|---|
| Architecture | Archify fresh; boundaries/ADR reviewed |
| Trail slice | 5 lần chạy liên tiếp không duplicate completion |
| Passport | Stamp/badge truy vết evidence và không cấp lặp |
| Team | Reducer idempotent; rebuild/reconcile pass |
| Perk | Claim/redeem/audit/expiry pass, không đụng vault |
| Pilot | 30–50 người hoặc cohort nhỏ hơn có ghi rõ; metrics và interview report hoàn tất |

Không mở Phase tiếp theo khi gate P0 của Phase hiện tại chưa pass.

---

## 16. Open decisions

Các quyết định phải được chốt bằng ADR hoặc change record trước Phase tương ứng:

1. Engagement storage cho pilot.
2. Cách xác thực wallet với API gameplay.
3. Nguồn đọc/reconcile event trên hai chain.
4. Team join policy và chống chuyển đội.
5. Demo mode có tính leaderboard hay tách bảng riêng.
6. Sponsor perk liability, terms và operator workflow.
7. Notification channel có cần thiết cho pilot hay không.
8. Quyền truy cập organizer và retention của analytics.

---

## 17. Definition of product success

PRD này thành công khi DeFi Trail không còn được người thử mô tả chủ yếu là “demo gửi message giữa hai chain”, mà được mô tả là:

> “Một cuộc săn nhiệm vụ trên campus mà tôi biết phải làm gì tiếp theo, có thứ để sưu tập, có đội để đóng góp và có lý do quay lại ngày mai.”

