# DeFi Trail — Game Evolution Vibe Coding Playbook

**Phiên bản:** 1.0  
**Ngày:** 06/11/2026  
**Áp dụng cho:** `docs/DEFI_TRAIL_GAME_EVOLUTION_PRD.md`  
**Điểm bắt đầu:** Repository đã triển khai tới Task 13; Task 13 phải được ổn định trước khi bắt đầu GE-00  
**Mục tiêu:** Hướng dẫn từng prompt để AI coding agent mở rộng DeFi Trail thành campus adventure mà không phá lõi Map, Chest, Vault, ICM và Relayer

---

## 0. Cách sử dụng tài liệu

Playbook này không phải một prompt khổng lồ. Mỗi task là một vertical slice nhỏ và chỉ được bắt đầu khi task trước đã qua exit gate.

Nguyên tắc:

1. PRD quyết định **cần xây gì**.
2. Archify quyết định **ranh giới nào phải tôn trọng**.
3. Graphify quyết định **code hiện nằm ở đâu và phụ thuộc vào gì**.
4. Test/evidence quyết định **task có thật sự hoàn thành hay chưa**.
5. AI không được suy đoán tên file/hàm khi Graphify có thể trả lời.

> Quy tắc quan trọng: vibe coding nhanh không có nghĩa là bỏ qua kiến trúc. Tốc độ đến từ việc giảm phạm vi context, khóa file được phép sửa và kiểm tra sau mỗi vertical slice.

---

## 1. Trạng thái repository khi bắt đầu

### 1.1 Baseline được xác nhận

Graphify hiện đã nhận diện:

- `InteractiveMap`, `ChestBottomSheet`, `VirtualCompass`, `DemoLocationBanner`;
- `ICMProgressModal`, `useICMProgress`, request persistence;
- `QuestTutorialModal`, `SponsorScannerModal`, `PositionView`;
- progression math/types trong `packages/shared`;
- contracts Game L1 và C-Chain;
- `packages/relayer` và bề mặt admin health của Task 13.

### 1.2 Working tree hiện có thay đổi Task 13

Trước khi dùng playbook, hoàn tất hoặc chủ động cất Task 13 theo workflow của bạn. AI không được:

- reset hoặc checkout đè các thay đổi đó;
- trộn gameplay evolution vào cùng commit Task 13;
- sửa relayer/admin health chỉ để làm một feature gameplay đi qua.

### 1.3 Archify hiện stale

Archify packet hiện có nhưng cũ hơn repository. Sau khi Task 13 ổn định, refresh theo mục 3. Không dùng snapshot cũ để khẳng định target architecture mới.

---

## 2. Luật bất biến dành cho AI agent

Dán block dưới đây vào `AGENTS.md` hoặc prompt đầu mỗi session nếu repository chưa có luật tương đương:

```markdown
# DEFI TRAIL GAME EVOLUTION RULES

Bạn đang mở rộng DeFi Trail theo:
- DeFi-Trail-PRD.md
- docs/DEFI_TRAIL_GAME_EVOLUTION_PRD.md
- docs/ARCHITECTURE_AI.md

## SOURCE OF TRUTH
- Economic/game claim truth: contracts và authenticated ICM state.
- Target gameplay scope: Game Evolution PRD.
- Module boundaries: fresh Archify artifacts + ARCHITECTURE_AI.md.
- Code navigation: Graphify trước khi đọc/sửa.

## FORBIDDEN
- Không thay đổi smart contract trong GE-01 đến GE-07.
- Không lưu raw GPS, QR secret, email, private key hoặc OTP.
- Không biến engagement DB thành source of truth cho balance/chest/quest economic completion.
- Không báo success trước authenticated terminal evidence.
- Không tăng điểm/stamp/perk hai lần cho duplicate event hoặc retry cùng requestId.
- Không import server secret vào client component.
- Không sửa file ngoài Allowed Files của task nếu chưa nêu lý do và cập nhật plan.
- Không trộn refactor lớn với feature.

## REQUIRED LOOP
1. Đọc đúng section PRD của task.
2. Kiểm tra Archify status và boundary liên quan.
3. Chạy Graphify query/path/explain để định vị code.
4. Nêu plan, Allowed Files, Forbidden Files và tests trước khi sửa.
5. Xây vertical slice nhỏ nhất.
6. Chạy unit/integration/typecheck/lint phù hợp.
7. Chạy `graphify . --update` sau khi test pass.
8. Kiểm tra git diff và báo evidence, uncertainty, remaining work.
```

---

## 3. Flow Archify chuẩn

### 3.1 Kiểm tra trước mọi phase

```powershell
npx archify-cli status --doc-type archify
```

Nếu `knowledgeStale` hoặc `designPacketStale` là `true`, sau khi baseline sạch:

```powershell
npx archify-cli analyze .
npx archify-cli generate . --doc-type archify
npx archify-cli status --doc-type archify
```

Chỉ tiếp tục khi packet `ready` và không stale.

### 3.2 Thứ tự đọc bắt buộc cho AI

Trước khi phân tích kiến trúc hoặc sửa code:
1. Chạy `npx archify-cli status --doc-type archify`.
2. Chỉ tiếp tục khi knowledge và design packet không stale.
3. Đọc `.archify/docs/archify/packet.json` trước.
4. Đọc `.archify/docs/archify/guide.json` thứ hai.
5. Đọc các artifact tiếp theo theo trường `readOrder` trong `guide.json`.
6. Xem `.archify/` là nguồn chính cho các fact đã xác nhận.
7. Tách biệt rõ:
  - Confirmed From Codebase;
  - Inferred Architecture;
  - Open Questions / Uncertainty.
8. README và tài liệu phụ chỉ dùng để bổ sung ngữ cảnh, không được ghi đè bằng chứng từ `.archify/`.

### 3.3 Quy tắc ADR (Architecture Decision Record)

Chỉ tạo ADR khi task chạm vào một trong các trigger kiến trúc lớn (sửa contract, thêm DB, đổi API auth, đổi canonical schema...). Quy trình:
1. Phát hiện task chạm trigger ADR -> Dừng triển khai code.
2. Tạo file ADR mới ở trạng thái `Proposed` (bắt đầu từ `docs/adr/ADR-001-...`).
3. Ghi rõ: Context, Decision, Alternatives, Consequences, Security/Data Impact, Migration Plan, Rollback Plan.
4. Chỉ triển khai code sau khi ADR được chấp thuận.
5. Triển khai xong, chuyển trạng thái sang `Accepted`.

---

## 4. Flow Graphify chuẩn

Repository có graph lớn, vì vậy query phải hẹp. Không dùng một câu hỏi chứa toàn bộ hệ thống khi đang sửa một task nhỏ.

### 4.1 Trước khi code

```powershell
graphify query "InteractiveMap chest selection and completion dependencies" --budget 1800
graphify query "ICMProgressModal useICMProgress confirmed retry reload" --budget 1800
graphify explain "PositionView"
graphify path "InteractiveMap" "ICMProgressModal"
```

Quy tắc query:

- dùng tên symbol/file có thật;
- query một flow mỗi lần;
- ưu tiên `path` khi cần biết dependency boundary;
- ưu tiên `explain` khi sửa một module;
- ghi lại source file và line quan trọng trong plan.

### 4.2 Sau khi code

```powershell
graphify . --update
```

Sau update, chạy lại query kiểm chứng:

```powershell
graphify query "Trail completion evidence idempotency" --budget 1800
```

Nếu Graphify không tìm thấy symbol mới:

1. xác nhận file đã được save;
2. xác nhận update thành công;
3. kiểm tra file có bị exclude không;
4. không tự kết luận graph đã phản ánh code.

---

## 5. Vòng lặp vibe coding 7 bước

### Bước 1 — Scope lock

Agent phải trả lời trước khi sửa:

- Outcome của task là gì?
- User journey nào thay đổi?
- File nào được phép sửa/tạo?
- File nào cấm sửa?
- Contract/API/schema nào phải giữ tương thích?
- Test nào chứng minh done?

### Bước 2 — Architecture check

- đọc section liên quan trong PRD;
- kiểm tra Archify status;
- đối chiếu module boundary;
- nếu cần boundary mới, dừng code và viết ADR.

### Bước 3 — Graph navigation

- query symbol chính;
- path tới dependency;
- chỉ đọc file liên quan trực tiếp;
- không scan toàn repo bằng mắt.

### Bước 4 — Contract-first design

Trước UI, viết hoặc xác nhận:

- TypeScript types;
- Zod schema;
- state machine;
- idempotency key;
- error envelope;
- empty/loading/error states.

### Bước 5 — Smallest vertical slice

Ví dụ GE-03 không build toàn bộ season system. Nó chỉ cần:

```text
active trail config
  → trail card
  → checkpoint mapping
  → confirmed progress
  → completion state
```

### Bước 6 — Verification

Tối thiểu:

```powershell
pnpm test
pnpm typecheck
pnpm lint
```

Với contract-sensitive change:

```powershell
pnpm test:contracts
```

Không chạy suite contract tốn thời gian nếu task chỉ sửa copy tĩnh; nhưng luôn chạy suite module liên quan và typecheck.

### Bước 7 — Graph/update/handoff

- `graphify . --update`;
- `git diff --check`;
- `git status --short`;
- báo files changed, tests, Graphify evidence, open risks;
- không tự commit nếu người dùng chưa yêu cầu.

---

## 6. Prompt template dùng cho mọi task

```text
Bạn là senior product engineer đang triển khai [TASK_ID] cho DeFi Trail.

READ FIRST:
1. DeFi-Trail-PRD.md: [sections]
2. docs/DEFI_TRAIL_GAME_EVOLUTION_PRD.md: [sections]
3. docs/ARCHITECTURE_AI.md
4. Fresh Archify packet/guide theo đúng read order

BEFORE EDITING:
- Chạy các Graphify query: [queries]
- Nêu findings có source paths.
- Nêu implementation plan tối đa 7 bước.
- Liệt kê Allowed Files và Forbidden Files.
- Xác nhận invariant/idempotency/privacy cần giữ.

OUTCOME:
[Một kết quả người dùng cụ thể, không phải danh sách code]

REQUIREMENTS:
[requirements]

ALLOWED FILES:
[paths]

FORBIDDEN:
[paths/behaviors]

TESTS:
[tests and acceptance]

DONE WHEN:
[observable exit gate]

Sau khi test pass, chạy `graphify . --update`, query lại symbol mới và báo evidence. Không sửa ngoài scope; nếu cần, dừng và giải thích dependency.
```

---

## 7. GE-00 — Baseline audit và architecture refresh

### Outcome

Task 13 ổn định, repository có baseline có thể rollback/đối chiếu, Archify và Graphify phản ánh đúng code hiện tại.

### Không code feature mới

GE-00 chỉ làm:

- hoàn tất/kiểm tra Task 13;
- test baseline;
- refresh architecture knowledge;
- tạo ADR skeleton cho engagement layer nếu cần;
- ghi baseline evidence.

### Commands

```powershell
git status --short
pnpm test
pnpm typecheck
pnpm lint
pnpm test:contracts
npx archify-cli status --doc-type archify
npx archify-cli analyze .
npx archify-cli generate . --doc-type archify
npx archify-cli status --doc-type archify
graphify . --update
```

### Graphify checks

```powershell
graphify query "relayer admin health readiness flow" --budget 1800
graphify query "InteractiveMap QuestTutorialModal SponsorScannerModal PositionView ICMProgressModal" --budget 2500
```

### Done when

- Task 13 tests pass;
- Archify ready/not stale;
- Graphify chứa Task 13 symbols;
- không có gameplay evolution code trong Task 13 diff;
- baseline failures được ghi rõ, không che giấu.

---

## 8. GE-01 — Shared gameplay domain

### Outcome

Có canonical types, schemas và pure rules cho Season, Trail, Checkpoint, Passport, Badge, Team và Perk; chưa có UI hoặc database.

### Graphify trước khi prompt

```powershell
graphify query "packages shared domain types progression exports" --budget 1800
graphify path "domain.ts" "progression.test.ts"
graphify explain "packages/shared/src/index.ts"
```

### Allowed files

```text
packages/shared/src/gameplay/types.ts
packages/shared/src/gameplay/schemas.ts
packages/shared/src/gameplay/rules.ts
packages/shared/src/gameplay/scoring.ts
packages/shared/src/gameplay/index.ts
packages/shared/src/index.ts
packages/shared/tests/gameplay-*.test.ts
```

### Forbidden

- toàn bộ Solidity contracts;
- React components;
- server secrets;
- network/database access trong shared package;
- floating point cho token amounts.

### Prompt

```text
Triển khai GE-01 Shared Gameplay Domain theo mục 5, 7 và 9 của Game Evolution PRD.

Tạo canonical TypeScript types và Zod schemas cho:
- SeasonDefinition
- TrailDefinition
- TrailCheckpoint
- TrailProgress
- PassportStamp
- BadgeRule và EarnedBadge
- TeamDefinition và TeamScoreEvent
- PerkCampaign và PerkClaim
- GameplayEvidenceEvent

Tạo pure rules:
- validate active window;
- ordered/any-order checkpoint completion;
- deterministic badge eligibility;
- idempotent score event identity;
- perk eligibility và expiry;
- demo mode policy hook.

Không tạo database, API hoặc UI. Export qua package public index. Viết boundary tests cho time, duplicate evidence, ordered trail và expiry.
```

### Tests

```powershell
pnpm --filter @defi-trail/shared test
pnpm --filter @defi-trail/shared typecheck
pnpm lint
graphify . --update
```

### Done when

- schemas reject invalid/ambiguous configuration;
- pure rules deterministic;
- duplicate evidence không tạo hai completion/score;
- package consumer import được từ public export.

---

## 9. GE-02 — Season và Trail config API

### Outcome

Frontend có thể đọc một active season và Today’s Trail qua API versioned; chưa có authoring UI.

### Graphify trước khi prompt

```powershell
graphify query "map-config route campus slots validation API response" --budget 1800
graphify query "server-env api-response rate-limiter" --budget 1800
graphify path "map-config/route.ts" "InteractiveMap"
```

### Allowed files

```text
apps/web/src/app/api/gameplay/seasons/active/route.ts
apps/web/src/app/api/gameplay/trails/today/route.ts
apps/web/src/lib/gameplay/config.ts
apps/web/src/lib/gameplay/repository.ts
apps/web/src/lib/gameplay/errors.ts
apps/web/tests/gameplay-config-api.test.ts
packages/shared/src/gameplay/* (chỉ khi schema bug được chứng minh)
```

### Design decision

Phase đầu có thể dùng config versioned trong code hoặc JSON được validate khi load. Không chọn production database trong task này.

### Prompt

```text
Triển khai GE-02 read-only Season/Trail Config API.

Yêu cầu:
- một season demo và một trail 3 checkpoint tham chiếu chest/campus config hiện có;
- validate bằng shared schemas;
- active window dùng UTC;
- response không chứa server secret hoặc raw GPS ngoài public campus config đã được duyệt;
- error envelope nhất quán;
- cache policy rõ ràng;
- repository interface tách nguồn config khỏi route;
- empty state khi không có active season/trail.

Không thêm database, mutation endpoint hoặc organizer UI.
```

### Done when

- API trả đúng active/empty/error states;
- config sai fail fast trong test;
- không duplicate public coordinate data ngoài contract đã định nghĩa;
- existing `/api/map-config` không regression.

---

## 10. GE-03 — Today’s Trail vertical slice

### Outcome

Người chơi mở app, thấy một trail, start/resume và nhìn tiến độ 3 checkpoint gắn với chest hiện có.

### Graphify trước khi prompt

```powershell
graphify query "page InteractiveMap SelectedChest ChestBottomSheet dependencies" --budget 2200
graphify query "ICM confirmed requestId storage status" --budget 1800
graphify path "page.tsx" "InteractiveMap"
graphify path "ChestBottomSheet" "useICMProgress"
```

### Allowed files

```text
apps/web/src/features/gameplay/home/*
apps/web/src/features/gameplay/trails/*
apps/web/src/app/page.tsx
apps/web/src/components/map/* (chỉ integration props nhỏ)
apps/web/tests/trail-ui.test.tsx
```

### Forbidden

- rewrite `InteractiveMap`;
- copy progression math sang UI;
- thay ICM terminal semantics;
- contract changes;
- authoritative completion chỉ bằng localStorage.

### Prompt

```text
Triển khai GE-03 Today’s Trail vertical slice.

UI cần:
- Today’s Trail card với title, ước tính thời gian, 3 checkpoint;
- start/resume state;
- checkpoint status: locked/available/pending/confirmed;
- Map focus action đến chest tương ứng;
- CTA luôn chỉ ra bước tiếp theo;
- completion celebration chỉ khi toàn bộ evidence confirmed;
- mobile-first, touch target >=44px, list alternative;
- loading/empty/error/ended states.

Giữ map, chest modal và ICM flow hiện tại. Chỉ thêm adapter/integration cần thiết.
```

### Done when

- một người mới hiểu bước tiếp theo mà không đọc explorer;
- reload không mất confirmed progress;
- pending không bị hiển thị là complete;
- map tests và new trail UI tests pass.

---

## 11. GE-04 — Evidence reconciliation và progress persistence

### Outcome

Trail progress có thể khôi phục từ evidence, chịu được reload, duplicate delivery và retry.

### Graphify trước khi prompt

```powershell
graphify query "icm-storage requestId confirmed localStorage reconciliation" --budget 2000
graphify query "GameICMGateway RequestSettled PlayerState snapshot" --budget 2000
graphify path "useICMProgress" "GameICMGateway"
```

### Required design

- client cache chỉ để UX;
- server/read model hoặc chain read là authoritative cho confirmed progress;
- idempotency key ưu tiên `requestId + checkpointId`;
- cùng request retry không tạo event mới;
- reconcile endpoint rate-limited.

### Prompt

```text
Triển khai GE-04 progress evidence adapter và reconcile flow.

Tạo abstraction đọc trạng thái checkpoint từ request/chain evidence hiện có. Không thay contract. Trail progress phải:
- khôi phục sau reload;
- xử lý CREATED/SENT/REMOTE_EXECUTED/ACK_PENDING/CONFIRMED/FAILED;
- không đánh dấu hai lần khi duplicate event;
- không tự retry tạo request mới;
- có correlation logs không chứa GPS/secret;
- có API/error states rõ ràng.

Viết integration tests cho duplicate, out-of-order, reload pending và final failure.
```

### Done when

- 5 lần replay cùng evidence vẫn chỉ có một checkpoint completion;
- reload ở pending rồi confirmed cho kết quả đúng;
- final failure không tạo stamp/point.

---

## 12. GE-05 — Passport và badge engine

### Outcome

Người chơi nhận stamp/badge deterministic và thấy collection có mục tiêu tiếp theo.

### Graphify trước khi prompt

```powershell
graphify query "progression exploration score unique H3 rarity" --budget 1800
graphify query "PositionView player stats display" --budget 1500
graphify path "PlayerState" "PositionView"
```

### Initial badges

- `FIRST_CHEST`
- `THREE_CHEST_TYPES`
- `TRAIL_COMPLETE`
- `FIVE_UNIQUE_H3`
- `QUEST_LEARNER`

### Prompt

```text
Triển khai GE-05 Passport + deterministic Badge Engine.

Yêu cầu:
- badge rules dùng shared pure functions;
- stamp/badge có evidenceRef;
- locked/in-progress/earned UI;
- không NFT, không transfer, không monetary copy;
- duplicate evidence không cấp lại;
- artwork dùng key/theme token, không hard-code asset URL rải rác;
- share card mặc định không hiển thị wallet đầy đủ hoặc balance.

Tạo Passport page/components, rule tests và integration test từ confirmed trail tới stamp.
```

### Done when

- trail confirmed cấp đúng một stamp/badge;
- UI giải thích cách mở khóa;
- privacy snapshot test pass;
- không sửa PlayerState hoặc YieldVault.

---

## 13. GE-06 — Relay Moment

### Outcome

Thời gian chờ ICM trở thành khoảnh khắc kể chuyện/học tập nhưng giữ nguyên tính trung thực trạng thái.

### Graphify trước khi prompt

```powershell
graphify query "ICMProgressModal timeline StepStatus pending 30 60 retry" --budget 2200
graphify query "useICMProgress timers retry same requestId" --budget 1800
graphify path "ICMProgressModal" "icm-storage.ts"
```

### Prompt

```text
Triển khai GE-06 Relay Moment bên trong/bao quanh ICM progress hiện có.

Yêu cầu:
- animation Game L1 → Relayer → C-Chain → Snapshot phản ánh state thật;
- learning card ngắn theo chest type;
- CTA xem Passport hoặc next checkpoint khi phù hợp;
- giữ Still relaying sau 30 giây và retry/reconcile sau 60 giây;
- không restart timer sai khi reload;
- reduced-motion support;
- screen-reader state announcements;
- confirmed celebration chỉ từ existing terminal state.

Không rewrite hook hoặc thay request lifecycle.
```

### Done when

- state mapping tests giữ nguyên;
- reload timer test pass;
- reduced motion và accessibility checks pass;
- không có spinner vô hạn.

---

## 14. GE-07 — Analytics và pilot funnel

### Outcome

Đội biết người dùng rơi ở đâu trong trail mà không thu raw GPS hoặc secret.

### Events

```text
season_viewed
trail_started
checkpoint_viewed
checkpoint_submitted
checkpoint_confirmed
trail_completed
passport_viewed
badge_earned
team_joined
perk_issued
perk_redeemed
```

### Prompt

```text
Triển khai GE-07 analytics schema và instrumentation cho gameplay funnel.

Yêu cầu:
- schema allowlist fields;
- tuyệt đối không raw lat/lng, accuracy payload, email, QR payload/secret, private material;
- requestId chỉ khi cần reconciliation;
- wallet pseudonym/hash theo policy;
- duplicate trail completion không emit economic-like success hai lần;
- dev/test sink để kiểm thử;
- dashboard/admin chỉ đọc số liệu tổng hợp.

Viết privacy tests quét payload và negative tests cho forbidden fields.
```

### Done when

- funnel tính được start → first checkpoint → trail complete;
- forbidden field tests pass;
- analytics failure không chặn gameplay.

---

## 15. GE-08 — Engagement storage ADR

### Outcome

Chọn storage và boundary trước khi xây team/perk production state.

### Không code database trước ADR

ADR phải so sánh ít nhất:

- managed Postgres;
- SQLite single-host pilot;
- event-indexed/rebuildable read model.

### ADR questions

- data nào authoritative, data nào derived?
- idempotency/unique constraints nào bắt buộc?
- wallet authentication ra sao?
- backup/restore/rebuild thế nào?
- retention và deletion?
- deployment ownership?
- offline/relayer outage behavior?

### Graphify

```powershell
graphify query "API routes rate limiter server env admin health" --budget 2200
graphify query "requestId events contracts gateway" --budget 2200
```

### Done when

- ADR accepted;
- migration/rollback plan có test strategy;
- economic source-of-truth boundary được ghi rõ;
- Archify được refresh/generate lại sau khi implementation boundary xuất hiện.

---

## 16. GE-09 — Team và leaderboard

### Outcome

Người chơi chọn đội và đóng góp điểm từ evidence hợp lệ; leaderboard không pay-to-win.

### Prompt

```text
Triển khai GE-09 Team + Leaderboard theo ADR engagement storage.

Yêu cầu:
- season-scoped team selection;
- join bằng explicit choice hoặc invite code;
- policy đổi đội rõ ràng;
- reducer chỉ nhận allowlisted evidence events;
- unique constraint chống duplicate request/event;
- demo mode filter hoặc bảng riêng theo decision;
- leaderboard pagination/cache;
- reconciliation/rebuild command;
- admin không có arbitrary score edit.

UI phải có community goal và giải thích cách tính điểm.
```

### Tests

- duplicate/retry/out-of-order;
- concurrent reducer;
- team policy;
- rebuild parity;
- unauthorized mutation;
- demo mode filtering.

### Done when

- replay toàn bộ events cho cùng kết quả;
- retry không tăng điểm;
- leaderboard không ảnh hưởng vault/power.

---

## 17. GE-10 — Sponsor perk claim và redemption

### Outcome

Sponsor Chest có thể cấp một quyền lợi đời thực có expiry và audit mà không biến Mock USDC thành tiền thật.

### Graphify trước khi prompt

```powershell
graphify query "SponsorScannerModal sponsor proof campaign QR" --budget 2000
graphify query "SponsorPool SPONSOR DepositRequest confirmed" --budget 2000
graphify path "SponsorScannerModal" "CChainICMGateway"
```

### Prompt

```text
Triển khai GE-10 Sponsor Perk.

Eligibility:
- sponsor checkpoint/campaign confirmed;
- wallet/campaign/rule match;
- chưa claim trước đó;
- campaign active và inventory còn.

Security:
- claim token opaque, đủ entropy, không chứa raw wallet/QR secret;
- operator authentication;
- redemption transaction idempotent;
- expiry và audit trail;
- rate limit;
- không có endpoint sửa vault position/balance;
- UI phân biệt rõ Mock USDC và sponsor perk.

Tạo player claim view, operator redemption view/API và concurrency tests.
```

### Done when

- hai redemption đồng thời chỉ một thành công;
- claim sai/expired/duplicate bị từ chối;
- SponsorPool/YieldVault regression tests pass;
- copy không hứa hẹn lợi nhuận hay cash value.

---

## 18. GE-11 — Organizer workflow

### Outcome

Organizer tạo/preview/publish một season/trail/campaign mà không sửa code hoặc deploy contract cho engagement content.

### Scope

- draft/preview/publish/archive;
- validation;
- readiness check;
- immutable published version hoặc version bump;
- audit log;
- không expose secrets;
- không arbitrary economic edits.

### Prompt

```text
Triển khai GE-11 Organizer Workflow trên boundary đã được ADR duyệt.

Tạo:
- season/trail editor;
- checkpoint selector chỉ từ chest/campaign đã seed hợp lệ;
- preview mobile;
- validation thời gian, duplicate checkpoint, missing badge/perk;
- publish confirmation và versioning;
- read-only readiness tích hợp admin health Task 13;
- audit events cho publish/archive.

Không tạo contract deploy/admin balance controls trong UI này.
```

### Done when

- organizer không thể publish config invalid;
- published version có thể audit/rollback bằng version mới;
- player API chỉ thấy active published content;
- role/auth tests pass.

---

## 19. GE-12 — 7-Day pilot package

### Outcome

Có một pilot thật, đo được và vận hành được cho 30–50 người hoặc cohort nhỏ hơn có ghi rõ giới hạn.

### Deliverables

```text
docs/pilot/7-day-content-plan.md
docs/pilot/organizer-runbook.md
docs/pilot/incident-playbook.md
docs/pilot/privacy-checklist.md
docs/pilot/test-report.md
docs/pilot/metrics-report-template.md
```

### Required drills

- relayer restart trong pending;
- sponsor budget/perk inventory cạn;
- GPS denied;
- camera denied/manual QR;
- RPC timeout;
- duplicate redemption;
- organizer publishes wrong schedule;
- analytics unavailable;
- user hiểu đúng mock/testnet.

### Done when

- 5 full trail runs liên tiếp;
- P0 regression pass;
- public links/incognito audit;
- pilot metrics thu được;
- 5–8 user interviews hoặc số lượng thực tế được ghi rõ;
- backlog sau pilot dựa trên evidence, không dựa trên cảm giác.

---

## 20. Prompt review checklist

Trước khi gửi prompt cho agent:

- [ ] Prompt chỉ có một user outcome.
- [ ] Có PRD sections cụ thể.
- [ ] Có Graphify query cụ thể.
- [ ] Có Allowed Files.
- [ ] Có Forbidden Files/behavior.
- [ ] Có state/error/idempotency/privacy requirements.
- [ ] Có tests và Done when.
- [ ] Không yêu cầu “build everything”.
- [ ] Không yêu cầu agent đoán architecture.
- [ ] Không trộn UI, database, indexer và contract trong một task.

Sau khi agent hoàn thành:

- [ ] Tests module liên quan pass.
- [ ] Typecheck/lint pass hoặc lỗi baseline được phân biệt.
- [ ] `graphify . --update` thành công.
- [ ] Query lại symbol/flow mới.
- [ ] `git diff --check` pass.
- [ ] Không ghi đè thay đổi Task 13/người dùng.
- [ ] Không có secret/raw GPS.
- [ ] Không success sớm.
- [ ] Handoff ghi rõ open risks.

---

## 21. Mẫu handoff cuối mỗi task

```markdown
## [TASK_ID] Handoff

### User outcome
- ...

### Changed
- `path`: lý do

### Preserved invariants
- ...

### Verification
- `command`: pass/fail

### Graphify evidence
- query:
- relevant nodes/paths:

### Archify impact
- none / ADR / refresh required

### Known limitations
- ...

### Next safe task
- ...
```

---

## 22. Thứ tự triển khai khuyến nghị

```text
Finish Task 13
  ↓
GE-00 Baseline + Archify/Graphify refresh
  ↓
GE-01 Shared gameplay domain
  ↓
GE-02 Season/Trail read API
  ↓
GE-03 Trail vertical slice
  ↓
GE-04 Evidence reconciliation
  ↓
GE-05 Passport/Badges
  ↓
GE-06 Relay Moment
  ↓
GE-07 Analytics
  ↓
Pilot nội bộ nhỏ
  ↓
GE-08 Storage ADR
  ↓
GE-09 Teams
  ↓
GE-10 Sponsor Perks
  ↓
GE-11 Organizer Workflow
  ↓
GE-12 7-Day Public Pilot
```

Nếu trail vertical slice không tăng completion hoặc mức hiểu sản phẩm trong test nhỏ, dừng trước GE-08. Không xây database/team/perk chỉ vì chúng đã có trong roadmap.

