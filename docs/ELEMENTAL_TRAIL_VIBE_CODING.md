# Elemental Trail — Vibe Coding Runbook v2

## START — Chỉ copy một prompt để giao việc

Không cần tự chạy terminal. Copy đoạn này, thay VERSION, để AI thực hiện toàn bộ
runbook và phần version trong cùng file. Đọc PRD/Architecture là bước đầu vào cụ thể,
không phải yêu cầu đi tìm thêm tài liệu không xác định.

~~~text
VERSION = v0.0
REPO = C:/Users/Lenovo/Documents/3.1.Cuộc Thi/Cuộc Thi Avalance Build Web3/Yield Go Project

Thực hiện trọn VERSION tại REPO. Đọc AGENTS.md và ba file chính:
docs/ELEMENTAL_TRAIL_PRD.md
docs/ELEMENTAL_TRAIL_ARCHITECTURE.md
docs/ELEMENTAL_TRAIL_VIBE_CODING.md

Tự chạy command của runbook R0–R7 và test cụ thể của VERSION bên dưới;
không dừng ở kế hoạch hoặc trả lệnh cho tôi chạy nếu bạn có terminal.
Kiểm tra status/evidence trước khi cho rằng version trước đã hoàn thành.
Không clone/reset repo, không khôi phục file tôi đã xóa, không upgrade dependencies hàng loạt.
Trong phạm vi version, tôi yêu cầu refresh Graphify/Archify cần thiết bằng update/analyze/generate;
được cập nhật artifact trong repo và archify.md đúng packet/guide, sau khi kiểm tra exclude.
Không tự cài global hoặc chọn dịch vụ LLM trả phí/upload corpus sang backend mới chưa được phép.
Không dùng --force để bỏ guard. Nếu thiếu quyết định gameplay/secret/quyền dịch vụ,
hỏi đúng phần thiếu và tiếp tục phần độc lập; không lấy economy cũ làm luật.

Giữ Accepted, không tự điền Open. Đọc source thật trước sửa.
Chạy test, đọc lỗi, sửa nguyên nhân đúng phạm vi rồi kiểm tra lại.
Kiểm tra Graphify cấu trúc + coverage code/semantic và Archify freshness, không chỉ exit 0.
Cập nhật IMPLEMENTATION_STATUS.md: command/exit code, test result, graph status,
UI/live evidence, blocker và việc tiếp theo. Không bịa PASS hoặc receipt.
Chưa commit/push/deploy trong lượt này; đưa tên commit đề xuất sau khi nghiệm thu.
~~~

Nếu muốn commit, bổ sung: “Sau khi gate đạt, commit đúng file của VERSION; không push.”
Để deploy v0.12 phải bổ sung host/network đích cụ thể. Prompt này không tự cấp quyền deploy.

## R0 — Hiện trạng, quyền và đúng repo

Lệnh bên dưới là PowerShell, chạy từ root repo. Native commands phải kiểm tra
`$LASTEXITCODE` ngay sau lệnh. Không dùng exit code của lệnh cuối kết luận cả chuỗi thành công.
Không in nội dung `.env`, secrets hoặc raw GPS. Không reset/stash/checkout file người dùng.

~~~powershell
$ErrorActionPreference = 'Stop'
$etRepo = 'C:\Users\Lenovo\Documents\3.1.Cuộc Thi\Cuộc Thi Avalance Build Web3\Yield Go Project'
Set-Location -LiteralPath $etRepo
$etTop = (git rev-parse --show-toplevel).Trim()
if ($LASTEXITCODE -ne 0) { throw 'Git root unavailable' }
if ([IO.Path]::GetFullPath($etTop) -ne [IO.Path]::GetFullPath($etRepo)) { throw 'Sai repo' }
git status --short
if ($LASTEXITCODE -ne 0) { throw 'Git status failed' }
git rev-parse HEAD
if ($LASTEXITCODE -ne 0) { throw 'Git HEAD failed' }
git branch --show-current
if ($LASTEXITCODE -ne 0) { throw 'Git branch failed' }
Get-Content -LiteralPath 'AGENTS.md' -Raw
Get-Content -LiteralPath 'apps/web/AGENTS.md' -Raw
Get-Content -LiteralPath 'package.json' -Raw
Get-Content -LiteralPath 'pnpm-workspace.yaml' -Raw
~~~

Ghi status ban đầu. Repo có thay đổi/file D từ người dùng không phải lý do để reset.
Giữ package name @defi-trail hiện tại khi setup, vì các imports còn phụ thuộc tên đó.

## R1 — Setup môi trường và dependency

Đã kiểm tra trên máy ngày 09/11/2026: Node v24.12.0, pnpm 11.25.0, Forge 1.9.0;
graphify.exe và Python launcher có mặt. Đây không phải khuyến nghị nâng bản mới nhất.
packageManager trong repo là pnpm@11.25.0. Kiểm tra lại khi thực hiện.

~~~powershell
Get-Command git,node,pnpm,npx,py,graphify,forge -ErrorAction SilentlyContinue |
    Select-Object Name,Source
node --version
if ($LASTEXITCODE -ne 0) { throw 'Node missing' }
pnpm --version
if ($LASTEXITCODE -ne 0) { throw 'pnpm missing' }
py -3 --version
$etPythonExit = $LASTEXITCODE
forge --version
$etForgeExit = $LASTEXITCODE
git submodule status
$etSubmoduleExit = $LASTEXITCODE
Get-Content -LiteralPath 'apps/web/package.json' -Raw
Get-Content -LiteralPath 'packages/shared/package.json' -Raw
Get-Content -LiteralPath 'packages/contracts-l1/package.json' -Raw
Get-Content -LiteralPath 'packages/contracts-cchain/package.json' -Raw
~~~

Thiếu công cụ chỉ chặn phần phụ thuộc; không tự cài global. Nếu pnpm khác packageManager,
chọn đúng phiên bản qua cơ chế đã có hoặc báo cách sửa, không sửa packageManager để che lệch.
Nếu dependencies chưa đồng bộ, thực hiện install được giao trong setup:

~~~powershell
pnpm install --frozen-lockfile
if ($LASTEXITCODE -ne 0) { throw 'Frozen install failed: đọc lỗi, không xóa lockfile' }
pnpm --filter @defi-trail/shared exec vitest --version
if ($LASTEXITCODE -ne 0) { throw 'Shared runner unavailable' }
pnpm --filter @defi-trail/web exec vitest --version
if ($LASTEXITCODE -ne 0) { throw 'Web runner unavailable' }
$etNextPath = pnpm --filter @defi-trail/web exec node -p "require.resolve('next/package.json')"
if ($LASTEXITCODE -ne 0) { throw 'Cannot resolve installed Next' }
$etNextDocs = Join-Path (Split-Path ($etNextPath | Select-Object -Last 1).Trim()) 'dist/docs'
if (-not (Test-Path -LiteralPath $etNextDocs)) { throw 'Installed Next docs missing' }
Get-ChildItem -LiteralPath $etNextDocs -Name
~~~

Đọc đúng routing/client-server/data docs ở đường dẫn trên trước khi sửa app.
Không pnpm install lặp lại ở mọi version. Giữ allowBuilds/overrides của workspace.
Nếu submodule thiếu, đọc .gitmodules và remote; chỉ khi đã xác minh đúng mới dùng
`git submodule update --init --recursive`. Không forge install tự đổi dependency.

### Environment không lộ giá trị

~~~powershell
if (Test-Path -LiteralPath '.env.example') {
    Get-Content -LiteralPath '.env.example' |
        Where-Object { $_ -match '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=' } |
        ForEach-Object { [regex]::Match($_,'^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=').Groups[1].Value }
}
~~~

Đọc schema/env.ts và nơi sử dụng trong source. Lập bảng tên biến / local-testnet / có-chưa / blocker.
Không copy đè .env, không dummy secrets, không tự invent flag NEXT_PUBLIC_LOCAL_DEMO.
Thiếu RPC/paymaster/relayer là blocker phần live; mock chỉ hoạt động nếu có adapter thật tương ứng.

## R2 — Baseline và chạy UI thật

Chạy từng nhóm để phân biệt lỗi sẵn có. Không tuyên bố pass khi một lệnh trước đã lỗi.

~~~powershell
$etChecks = @(
    @{ Name='typecheck'; Args=@('typecheck') },
    @{ Name='lint'; Args=@('lint') },
    @{ Name='shared-tests'; Args=@('--filter','@defi-trail/shared','test') },
    @{ Name='web-tests'; Args=@('--filter','@defi-trail/web','test') },
    @{ Name='build'; Args=@('build') }
)
$etBaseline = foreach ($etCheck in $etChecks) {
    $etArgs = $etCheck.Args
    & pnpm @etArgs
    $etCode = $LASTEXITCODE
    [pscustomobject]@{Check=$etCheck.Name;ExitCode=$etCode}
}
$etBaseline | Format-Table -AutoSize
~~~

Với Forge/dependencies sẵn sàng:

~~~powershell
pnpm test:forge
$etForgeBaseline = $LASTEXITCODE
pnpm test:icm
$etIcmBaseline = $LASTEXITCODE
[pscustomobject]@{Forge=$etForgeBaseline;IcmMockTests=$etIcmBaseline}
~~~

test:icm là Foundry ICMGatewayRoundTripTest; không chứng minh relayer live.
Lỗi baseline: lưu nguyên nhân, gate bị ảnh hưởng, sửa trong scope hoặc ghi blocker.
Không giảm assertions/skip tests/đổi luật để lấy PASS.

Chạy dev ở một terminal/session có handle riêng:

~~~powershell
pnpm dev
~~~

Đọc URL/port thật từ output. Ở session khác, thay URL dưới bằng URL server vừa báo:

~~~powershell
$etDevUrl = 'http://localhost:3000'
Invoke-WebRequest -Uri $etDevUrl -UseBasicParsing | Select-Object StatusCode
~~~

HTTP 200 chỉ là smoke. AI phải mở browser, xem render/console và thử thao tác của version.
Không có browser thì ghi UI NOT_RUN. Chỉ dừng server/session mình tạo; không kill mọi Node process.

## R3 — Truy vấn Graphify và kiểm tra Archify trước sửa source

~~~powershell
graphify --help
if ($LASTEXITCODE -ne 0) { throw 'Graphify CLI unavailable' }
npx --no-install archify-cli status --doc-type archify
if ($LASTEXITCODE -ne 0) { throw 'Archify status failed' }
Test-Path -LiteralPath 'graphify-out/graph.json'
Test-Path -LiteralPath '.archify/docs/archify/packet.json'
Test-Path -LiteralPath '.archify/docs/archify/guide.json'
graphify query "wallet" --seed apps_web_src_components_wallet_walletprovider_walletprovider --budget 1800
$etQueryExit = $LASTEXITCODE
~~~

Seed trên đã tồn tại khi kiểm tra tài liệu. Query tên WalletProvider từng bị ambiguous giữa
source và node memory. Exit 3: chọn đúng full node ID/path::symbol từ candidates rồi retry.
Exit 4: không có match, đổi query theo từ vựng graph, không kết luận code không tồn tại.
Cảnh báo TRUNCATED: thu hẹp hoặc tăng budget đủ phần cần; không nói đã đọc toàn bộ.
Đọc source_location thật để xác nhận. Dùng path/explain/affected với node thật của module version.

Archify cần ghi các trường: installed, analysisReady, generatedPacketReady,
knowledgeStale, designPacketStale, finalDocumentStale và freshness.newestWorkspaceChange.
Lần kiểm tra này graph có **8898 nodes**, Archify knowledge/packet **stale=true**.
Chưa thực hiện refresh hoặc baseline app trong lượt chỉnh tài liệu.

## R4 — Cập nhật Graphify, kiểm tra coverage và xuất sơ đồ

### R4.1 Phân biệt code và semantic

CLI terminal đúng: **graphify update .**. `/graphify . --update` là lời gọi skill trong chat.
CLI update code không chứng minh Markdown/ảnh mới đã được semantic extraction.
Trước extraction đọc .gitignore/.graphifyignore; không gửi secrets/.env/raw GPS,
dependency/build caches hoặc ảnh không cần thiết cho phân tích sang backend.
Không thay ignore để che source vừa sửa. Không force khi shrink guard chặn.

~~~powershell
graphify update .
if ($LASTEXITCODE -ne 0) { throw 'Graphify code update failed; không force' }
graphify check-update .
$etPendingCheckExit = $LASTEXITCODE
graphify diagnose multigraph --json
$etDiagnoseExit = $LASTEXITCODE
~~~

Đọc warning edge collapse, missing source hoặc shrink. Exit 0 không xóa warning.
check-update chỉ kiểm tra flag pending, không chứng minh freshness toàn repo.

Nếu có docs/ảnh cần index: AI thực hiện skill incremental, hoặc chạy CLI dưới **chỉ khi
backend sẵn có đã được cho phép**. Không tự chọn vendor/key hoặc upload repo ngoài phạm vi.

~~~powershell
graphify extract .
if ($LASTEXITCODE -ne 0) { throw 'Semantic extraction failed' }
graphify check-update .
$etSemanticPendingExit = $LASTEXITCODE
~~~

Thiếu backend/skill: báo CODE_ONLY / SEMANTIC_PENDING, không báo PRD đã được index.
Không chạy update và extract máy móc mọi lần; chọn theo file thay đổi và coverage cần thiết.

### R4.2 Kiểm tra graph có hợp lệ

~~~powershell
py -3 -c 'import json; from pathlib import Path; g=json.loads(Path("graphify-out/graph.json").read_text(encoding="utf-8-sig")); ns=g.get("nodes",[]); es=g.get("links",g.get("edges",[])); ids=[n["id"] for n in ns]; pool=set(ids); key=lambda x:x.get("id") if isinstance(x,dict) else x; bad=[e for e in es if key(e.get("source")) not in pool or key(e.get("target")) not in pool]; print({"nodes":len(ns),"edges":len(es),"duplicateIds":len(ids)-len(pool),"danglingEdges":len(bad)}); assert ns and len(ids)==len(pool) and not bad'
if ($LASTEXITCODE -ne 0) { throw 'Graph JSON validation failed' }
~~~

Cấu trúc hợp lệ chưa đủ: query file/symbol vừa sửa, đối chiếu source hiện tại.
Ghi node/edge trước-sau và coverage code/semantic; nodes giảm có thể hợp lệ nhưng phải giải thích.
Không bịa node mới chỉ để chứng minh update thành công.

### R4.3 Xuất sơ đồ và xem

Graph toàn repo >5000 nodes có thể nặng. Ưu tiên callflow rút gọn:

~~~powershell
graphify export callflow-html --graph graphify-out/graph.json --max-sections 8 --output graphify-out/CALLFLOW.html
if ($LASTEXITCODE -ne 0) { throw 'Callflow export failed' }
Get-Item -LiteralPath 'graphify-out/CALLFLOW.html' | Select-Object FullName,Length,LastWriteTime
~~~

Mở HTML mới, kiểm tra sơ đồ có nội dung, không lỗi render và module thuộc phạm vi version
xuất hiện đúng khi được chọn trong sơ đồ. Nếu export dựa vào report cũ, regenerate report bằng
workflow skill rồi export lại; không coi file mới timestamp là nội dung mới.
Không tuyên bố 8 section bao phủ mọi module. Muốn full HTML >5000 nodes, thông báo độ lớn
trước khi tăng node-limit theo help. Không tự gọi LLM re-label chỉ để sửa typo.

## R5 — Archify analyze → generate → read → write → verify

Prompt START đã yêu cầu refresh trong scope. Nếu session chưa có quyền của action/backend,
hỏi đúng phần thiếu một lần; không hỏi lại action đã được giao.
Không tự init global hoặc npx tải package mới; dùng --no-install với CLI đã cài.

~~~powershell
npx --no-install archify-cli status --doc-type archify
if ($LASTEXITCODE -ne 0) { throw 'Archify status failed' }
~~~

Nếu knowledgeStale hoặc analysisReady=false:

~~~powershell
npx --no-install archify-cli analyze .
if ($LASTEXITCODE -ne 0) { throw 'Archify analyze failed' }
~~~

Nếu packet stale/missing hoặc vừa analyze:

~~~powershell
npx --no-install archify-cli generate . --doc-type archify
if ($LASTEXITCODE -ne 0) { throw 'Archify generate failed' }
$etArchRaw = npx --no-install archify-cli status --doc-type archify
if ($LASTEXITCODE -ne 0) { throw 'Archify status after generate failed' }
$etArch = ($etArchRaw -join [Environment]::NewLine) | ConvertFrom-Json
$etArch | Select-Object installed,analysisReady,generatedPacketReady,knowledgeStale,designPacketStale,finalDocumentStale
if (-not $etArch.analysisReady -or -not $etArch.generatedPacketReady -or $etArch.knowledgeStale -or $etArch.designPacketStale) {
    throw 'Knowledge/packet chưa ready; đọc freshness.newestWorkspaceChange'
}
~~~

Nếu output có log trộn JSON, đọc output và tách đúng JSON; không ép false mặc định.
Khi fresh, đọc theo thứ tự:

~~~powershell
Get-Content -LiteralPath '.archify/docs/archify/packet.json' -Raw
Get-Content -LiteralPath '.archify/docs/archify/guide.json' -Raw
$etGuide = Get-Content -LiteralPath '.archify/docs/archify/guide.json' -Raw | ConvertFrom-Json
$etGuide.readOrder
~~~

AI đọc từng artifact trong readOrder và field policy; theo sectionPlan/validationChecks.
Không biến instruction_only thành fact đã xác minh. Đây là danh sách đường dẫn cụ thể,
không phải lời nhắc “tham khảo thêm cái gì đó”.

Nếu workflow yêu cầu AI tổng hợp thủ công, viết root archify.md theo packet/guide.
Nếu dùng CLI write, sau khi đọc yêu cầu output và được phép cập nhật file:

~~~powershell
npx --no-install archify-cli write . --doc-type archify
$etArchWriteExit = $LASTEXITCODE
~~~

Tool từ chối overwrite: đọc lý do, kiểm tra quyền ghi đè và workflow; không --force mù.
Không redirect output tool sang ELEMENTAL_TRAIL_ARCHITECTURE.md.
Sau write/manual synthesis, so nội dung với sectionPlan và source facts rồi kiểm tra:

~~~powershell
npx --no-install archify-cli status --doc-type archify
if ($LASTEXITCODE -ne 0) { throw 'Final Archify status failed' }
Get-Item -LiteralPath 'archify.md' | Select-Object FullName,Length,LastWriteTime
~~~

### Tránh vòng lặp stale

Hoàn tất sửa source/docs trước refresh. Chạy queries Graphify trước analyze cuối;
query cache/last_query_stamp đã từng làm Archify báo workspace mới.
Nếu vẫn stale, ghi newestWorkspaceChange. Kiểm tra exclude theo config được tool hỗ trợ;
không đoán key, sửa manifest, touch timestamp hoặc bỏ source khỏi corpus để fake fresh.
Tối đa một corrective refresh sau khi xác định nguyên nhân; còn lỗi thì ghi blocker.
Không nói knowledge fresh khi stale=true dù finalDocumentStale=false.
Nếu ghi status/log cuối khiến stale trở lại, báo snapshot và file hậu kỳ, không che.

## R6 — Test, diff, cập nhật index và commit

1. Test targeted của version; sửa lỗi trong scope, chạy lại phần liên quan.
2. Typecheck/lint; full regression ở release hoặc thay boundary lớn.
3. UI thật khi đổi màn hình; ghi route, browser, bước thử.
4. Structural changes: R4 rồi R5; docs-only cần semantic khi dùng docs trong graph.
5. Kiểm tra diff và file untracked, cập nhật status.

~~~powershell
git diff --check
if ($LASTEXITCODE -ne 0) { throw 'Diff whitespace/conflict check failed' }
git diff --stat
git status --short
~~~

git diff không hiển thị nội dung untracked: đọc file mới riêng.
Nếu được yêu cầu commit: stage đường dẫn cụ thể, xem git diff --cached,
git diff --cached --check, kiểm tra secrets; commit đúng tên bảng rồi báo hash.
Không git add ., không amend/push/tag nếu chưa giao. Không stage thay đổi người dùng không liên quan.

## R7 — Gate và mẫu kết quả bắt buộc

Tách APP_BASELINE / GAMEPLAY_TESTS / GRAPH_CODE / GRAPH_SEMANTIC /
ARCHIFY_PACKET / UI_VISUAL / LIVE_CHAIN / LIVE_ICM.
Mỗi mục: PASS, FAIL, NOT_RUN, BLOCKED hoặc NOT_APPLICABLE kèm lý do.
Không lấy Foundry mock pass thay live ICM hoặc HTTP 200 thay visual QA.

IMPLEMENTATION_STATUS.md ghi version, HEAD/branch đầu lượt, files có sẵn,
commands và exit codes, test count khi có, graph node/edge/coverage,
Archify fields, UI URL/route, bằng chứng live, blocker, next step, commit đề xuất/hash thật.
Done cần đủ output và gate. Phần độc lập có thể hoàn tất nhưng dependency thiếu vẫn phải hiện.
Không bỏ test hoặc chỉnh luật chỉ để đạt gate.

---

Cập nhật 09/11/2026. Bộ tài liệu hiện hành gồm PRD, Architecture và Vibe Coding.

Đọc [PRD](ELEMENTAL_TRAIL_PRD.md) → [Architecture](ELEMENTAL_TRAIL_ARCHITECTURE.md) → version bên dưới.
Không thực thi backlog GE/ET/PW cũ.

## 1. Workspace và cách bắt đầu

Repo đã chọn:
C:/Users/Lenovo/Documents/3.1.Cuộc Thi/Cuộc Thi Avalance Build Web3/Yield Go Project

Làm ngay trong repo này. Không tạo clone mới, không sửa bản thiếu file trong Elements Pets.
Giữ code Yield Go để tái sử dụng có kiểm chứng. Không reset working tree, xóa deployment hoặc nâng toàn bộ dependency.

**Cách dùng mới:** copy Prompt START ở đầu file và chọn VERSION.
AI đọc và thực thi runbook R0–R7 cùng phiên bản dưới đây; bạn không cần ghép prompt.
Mục 3 là nguyên tắc nội bộ để AI kiểm tra, không phải đoạn người dùng phải copy thêm.
Bắt đầu v0.0. Nếu đã có bằng chứng version hoàn tất, tiếp tục version còn thiếu.
Mỗi version cần output, test, cách tự bấm thử và trạng thái thật.
Tên commit trong tài liệu là **đề xuất**, không phải commit đã tạo.
Không tự commit/push/tag chỉ vì tài liệu có tên commit; chỉ thực hiện khi lượt làm việc có yêu cầu đó.

## 2. Version, test gate và tên commit

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

## 3. Prompt chung — dùng cho mỗi version

~~~text
Làm việc tại C:/Users/Lenovo/Documents/3.1.Cuộc Thi/Cuộc Thi Avalance Build Web3/Yield Go Project.
Đọc AGENTS.md, docs/ELEMENTAL_TRAIL_PRD.md, docs/ELEMENTAL_TRAIL_ARCHITECTURE.md và docs/ELEMENTAL_TRAIL_VIBE_CODING.md và IMPLEMENTATION_STATUS.md nếu có.
Không dùng PRD GE/ET/PW cũ làm yêu cầu hiện hành, không clone thêm repo.

Thực hiện đúng version được giao bên dưới. Kiểm tra code và working tree trước.
Nêu ngắn hiện trạng, mục tiêu, file dự kiến sửa và dependency thật rồi làm việc.
Với source code: kiểm tra Archify status, đọc packet/guide khi fresh,
query Graphify cho module liên quan rồi xác minh source.
Theo quy trình Graphify/Archify ở mục 7; báo stale/blocker trung thực.
Giữ quyết định Accepted. Điểm Open cần hỏi theo nhóm nhỏ; tiếp tục phần độc lập.
Không tự đổi config hoặc thêm tính năng để làm demo/test đẹp hơn.
Đọc nested AGENTS.md và tài liệu framework cài local trước khi sửa app.

Mỗi thay đổi cần kiểm tra phù hợp; báo lệnh đã chạy, exit/result, cách tự thử.
Không bịa pass, deployment, transaction hoặc screenshot đã quan sát.
Mock/local/testnet phải phân biệt. Không log secrets hoặc stage file không liên quan.
Cập nhật IMPLEMENTATION_STATUS.md: version, trạng thái, evidence, blocker, việc tiếp theo.
Quyết định mới cập nhật Decision log của PRD; không sinh PRD cạnh tranh.
Chỉ commit/push/deploy khi lượt này có yêu cầu tương ứng; nếu chưa, đưa tên commit đề xuất.
~~~

## 4. Prompt chi tiết từng version

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

Bắt buộc thực hiện checklist và khối PowerShell ngay dưới prompt này. Áp dụng R0/R3 trước sửa, R6/R7 sau sửa; setup v0.0 làm đủ R0–R5. Không báo xong khi chưa có evidence của gate tương ứng.
~~~

Test/gate: commands có thật; missing env/tooling ghi blocker; không giả baseline xanh.
Báo path/module map trong status hoặc evidence appendix của Architecture.


**Thực thi theo thứ tự:** R0 → R1 → R2 → R3 → R4 → R5 → R7.
Không thêm gameplay ở version setup. Được sửa setup có căn cứ: script path sai,
env example thiếu tên biến, config index phù hợp; không nới validation hoặc nâng stack.
Lập bảng map/wallet/proof/ICM/storage: path, symbol, chức năng đang có, cần đổi gì,
code evidence hay inference. Giữ các file D đã có đầu lượt.

**Đầu ra:** baseline từng nhóm + dev URL thật hoặc blocker; dependency/env inventory;
graph coverage code/semantic + CALLFLOW mở xem được; Archify snapshot/freshness;
IMPLEMENTATION_STATUS và cách chạy local. Chưa gọi game Elemental đã triển khai.

**Tự kiểm tra:** restart dev server do mình tạo, mở app lại; install không làm đổi lock ngoài ý định;
test count >0, không có 0-test PASS; không secrets trong output.
Nếu thiếu backend semantic, báo knowledge blocker nhưng vẫn hoàn tất baseline độc lập.

### v0.1 — Research và UX

~~~text
Thực hiện v0.1. Research web 8–12 tham khảo có URL trực tiếp từ sản phẩm/tác giả.
Bao phủ collection lâu dài, bản đồ/event, người quay lại, nhận pet và progress.
Phân biệt concept với app thật; chỉ mô tả màn hình thực sự quan sát.
Đề xuất ba hướng mỹ thuật, chọn phương án có lý do để người dùng quyết định.
Vẽ flow mobile từ online acquisition tới evolution và utility/campaign B.
Có wireframe/miêu tả từng screen, CTA, empty/loading/error và trạng thái chưa đủ điều kiện.
Ghi kết luận và lựa chọn được chốt vào appendix/Decision log của PRD.
Chưa tạo tất cả ảnh hoặc code mọi màn hình trong ticket này.

Bắt buộc thực hiện checklist và khối PowerShell ngay dưới prompt này. Áp dụng R0/R3 trước sửa, R6/R7 sau sửa; setup v0.0 làm đủ R0–R5. Không báo xong khi chưa có evidence của gate tương ứng.
~~~

Test/gate: link mở được hoặc có nhãn chưa truy cập; flow không dead-end;
ownership/discovery rõ; không bắt GPS cho gameplay online; chưa được gọi user-tested.


**Đầu ra cụ thể:** bảng 8–12 URL đã xem và pattern cần học; ba direction so sánh;
một direction Accepted hoặc vẫn Open; flow người mới và quay lại, CTA/error/empty.
Ghi kết quả ngay appendix/Decision log của PRD, không tạo PRD thứ tư.
Không tự tạo bộ ảnh nếu user chỉ yêu cầu research. Không bịa screenshot hoặc retention.
Docs mới cần semantic index khi dùng cho graph: R4 semantic rồi R5.
**Gate:** link nguồn có thể kiểm chứng, đủ mobile flow; docs-only không cần contract tests.

### v0.2 — Chốt luật đủ code

~~~text
Thực hiện v0.2. Chuẩn bị phương án cụ thể cho D01–D07 trong PRD/Architecture theo trách nhiệm.
Ưu tiên nguồn bản sao online, recipe Ember→Flare, Essence và utility ICM.
Cho thấy một lượt chơi từ nguồn tài nguyên tới evolution/reward bằng bảng số.
Chỉ dùng số tạm để minh họa, ghi Proposed; hỏi người dùng phần cần quyết định.
Sau câu trả lời, cập nhật Accepted/Proposed/Open, ngày và nội dung xác nhận.
Chốt quyền nhận collab nếu giữ trong demo; không tự đặt scarcity hay sponsor.
Kiểm tra asset inventory đủ, identity không reset qua campaign và quyền reward không mint kép.
Không sửa contract/production config trước quyết định tương ứng.

Bắt buộc thực hiện checklist và khối PowerShell ngay dưới prompt này. Áp dụng R0/R3 trước sửa, R6/R7 sau sửa; setup v0.0 làm đủ R0–R5. Không báo xong khi chưa có evidence của gate tương ứng.
~~~

Test/gate: nguồn/sink đủ cho đường demo, không vô hạn ngoài ý định;
scope có happy path và đường thiếu tài nguyên; các blocker vẫn hiện rõ.


**Thực hiện:** nhóm câu hỏi D01 nguồn pet, D02/D03 recipe/Essence, D04 utility;
sau đó D05 collab/D06 navigation/D07 identity khi dependency cần.
Với mỗi phương án: nguồn → chi phí → số dư → ownership → điều kiện B.
Ghi Proposed trước câu trả lời và Accepted sau khi được xác nhận.
Nếu D01–D04 chưa đủ, không cấu hình production bằng số tạm; tiếp tục phần độc lập.
**Gate:** nguồn/sink kiểm tra được, không reward mint kép, không xóa collection;
asset đầu ra được đếm đúng (Flare Fox là asset thứ năm, collab nếu có là thứ sáu).

### v0.3 — Dữ liệu và ranh giới adapter

~~~text
Thực hiện v0.3 theo các quyết định đã accepted.
Tạo schema WorldAsset/Collection/Campaign/Recipe/Essence/RewardRequest/Eligibility.
Tách ID tài sản khỏi phạm vi campaign, dùng assetKey hiện có.
Tạo repository interface và adapter LOCAL DEMO, không gắn UI vào state giả cố định.
Version config rõ, không lấy balance.v1.json cũ làm authority mặc định.
Tạo fixtures và unit tests độc lập cho arithmetic/eligibility/validation.
Chưa mint token hoặc deployment.

Bắt buộc thực hiện checklist và khối PowerShell ngay dưới prompt này. Áp dụng R0/R3 trước sửa, R6/R7 sau sửa; setup v0.0 làm đủ R0–R5. Không báo xong khi chưa có evidence của gate tương ứng.
~~~

Test: ID trùng/references sai bị từ chối; recipe unsupported bị từ chối;
negative quantity/overflow/bounds theo model; copy counts khác discovery;
A/B không chia đôi identity ngoài chủ đích.


**Boundary cụ thể:** đọc packages/shared/src/index.ts và package manifests;
đề xuất packages/shared/src/elemental/ nếu audit xác nhận không trùng module hiện tại.
Tạo schema, catalog, configVersion, pure recipe/eligibility, adapter interfaces,
fixtures valid/invalid. Không import SDK/server secrets vào shared.
Tạo packages/shared/tests/elemental/world-model.test.ts.

~~~powershell
pnpm --filter @defi-trail/shared exec vitest run tests/elemental/world-model.test.ts
if ($LASTEXITCODE -ne 0) { throw 'World model failed hoặc thiếu test file' }
pnpm --filter @defi-trail/shared typecheck
if ($LASTEXITCODE -ne 0) { throw 'Shared typecheck failed' }
~~~

Test duplicate ID, missing reference, invalid amount, unsupported recipe,
World ID qua A/B, Available khác Owned/Discovered. Expected phải độc lập với helper đang test.

### v0.4 — Vòng chơi local

~~~text
Thực hiện v0.4 bằng map/wallet shell phù hợp của Yield Go và local adapter.
Cho chơi starter → nhận bản sao online → chăm/thu → preview → evolve Flare Fox.
Giữ labels LOCAL DEMO, config và state độc lập khỏi testnet.
Tiêu đúng bản sao được chọn, cảnh báo bản cuối, giữ discovery.
Thẻ custody không craft được; có đường rút/thu theo policy.
Dùng placeholder khi cần. Màn hình phải bấm được, không chỉ là screenshot.

Bắt buộc thực hiện checklist và khối PowerShell ngay dưới prompt này. Áp dụng R0/R3 trước sửa, R6/R7 sau sửa; setup v0.0 làm đủ R0–R5. Không báo xong khi chưa có evidence của gate tương ứng.
~~~

Test: đủ/thiếu nguyên liệu; double click; cancel không tiêu; failed action không đổi state;
craft xong inventory/discovery đúng; không mắc kẹt khi pet đang chăm.


**Triển khai:** chọn route/module trong app hiện có sau audit, không dựng app rời.
Tạo local adapter và state action có precondition, atomic transition, result/error.
Nối acquisition/chăm/evolution vào component thật; không success bằng timer.
Tạo apps/web/tests/elemental/local-loop.test.ts.

~~~powershell
pnpm --filter @defi-trail/web exec vitest run tests/elemental/local-loop.test.ts
if ($LASTEXITCODE -ne 0) { throw 'Local loop failed hoặc thiếu test file' }
pnpm --filter @defi-trail/web typecheck
if ($LASTEXITCODE -ne 0) { throw 'Web typecheck failed' }
~~~

Bấm thật: starter→duplicate→care/claim→withdraw→preview→Flare Fox.
Test thiếu cost, double click, cancel, custody, bản cuối và giữ Ember discovery.
Ghi route thật vừa làm; mock luôn có nhãn LOCAL DEMO.

### v0.5 — Persistence và quyền truy cập qua campaign

~~~text
Thực hiện v0.5. Lưu local state có version và cơ chế recovery phù hợp.
Tạo campaign A và sandbox B tối thiểu, không dựng thêm cả mùa.
Kết campaign không reset collection; reload vẫn giữ ownership/history.
Làm utility gate theo D04; mô phỏng ICM có nhãn rõ, chưa gọi là reward thật.
Không để achievement đã từng có thay cho yêu cầu đang sở hữu.
Reset demo là công cụ riêng, không nằm trong hành động chuyển campaign.

Bắt buộc thực hiện checklist và khối PowerShell ngay dưới prompt này. Áp dụng R0/R3 trước sửa, R6/R7 sau sửa; setup v0.0 làm đủ R0–R5. Không báo xong khi chưa có evidence của gate tương ứng.
~~~

Test: A→B→reload; balance 0 nhưng discovered còn; eligible/ineligible;
request pending restore; corrupt/local schema khác version có xử lý rõ.
Local storage không phải authority của bản live.


**Triển khai:** local persistence có schemaVersion và recovery;
tách World state/Campaign progress. A close không reset storage.
Pending request giữ stable ID. Migration local data có test; không silent clear.
Tạo apps/web/tests/elemental/persistence.test.ts.

~~~powershell
pnpm --filter @defi-trail/web exec vitest run tests/elemental/persistence.test.ts
if ($LASTEXITCODE -ne 0) { throw 'Persistence failed hoặc thiếu test file' }
~~~

Test cold load, pending reload, A→B→A, schema cũ/corrupt,
owned=0/discovered=true, utility eligibility theo D04.
Refresh browser thật; unit-test store trong RAM không chứng minh persistence.

### v0.6 — Giao diện và asset

~~~text
Thực hiện v0.6 theo style đã chọn và asset contract trong PRD/Architecture theo trách nhiệm.
Dùng nguồn asset source pet; export derivatives riêng, không ghi đè PNG.
Manifest + fallback, alt đúng hình; data text/nút tách art.
Dựng UI component thật cho mobile/desktop, tái sử dụng token và layout.
Collection history, campaign progress miễn phí, evolution và reward states rõ.
Không thêm logo collab/quota/chức năng chưa chốt.
Tự mở app kiểm tra các màn hình sau khi sửa; báo giới hạn môi trường nếu không xem được.

Bắt buộc thực hiện checklist và khối PowerShell ngay dưới prompt này. Áp dụng R0/R3 trước sửa, R6/R7 sau sửa; setup v0.0 làm đủ R0–R5. Không báo xong khi chưa có evidence của gate tương ứng.
~~~

Test: portrait nhỏ, desktop, tên dài, 404 ảnh, loading/empty/error/pending;
keyboard/focus, reduced motion, tap areas, contrast; ảnh không méo.
Không viết test chỉ để khẳng định class CSS đã thêm.


**Triển khai:** chọn 5 art demo từ asset source pet; export derivatives riêng.
Manifest map source/frame names rõ, URL theo public app thật.
UI theo direction Accepted, không lấy số trong mockup làm config.
Tạo apps/web/tests/elemental/assets.test.ts kiểm tra manifest/path/fallback behavior.

~~~powershell
pnpm --filter @defi-trail/web exec vitest run tests/elemental/assets.test.ts
if ($LASTEXITCODE -ne 0) { throw 'Asset integration failed' }
pnpm --filter @defi-trail/web typecheck
if ($LASTEXITCODE -ne 0) { throw 'UI typecheck failed' }
pnpm lint
if ($LASTEXITCODE -ne 0) { throw 'Lint failed; tách lỗi baseline và lỗi mới' }
~~~

Browser 390px và desktop: tên dài, 404 art, alpha sáng/tối, tab/focus,
reduced-motion, disabled/pending, console/network errors.
Không viết test chỉ để xác nhận class CSS. Không ghi đè PNG nguồn.

### v0.7 — Identity/proof và acquisition thật

~~~text
Thực hiện v0.7. Kiểm tra stack/version thực và docs local trước implement.
Triển khai asset contract/registry/roles theo D07 và acquisition theo D01.
Session gắn đúng ví; server/contract quyết định reward, quota, campaign.
Proof có domain/nonce/expiry/config phù hợp, chống replay.
Kiểm tra ví mục tiêu/reconnect; gasless chỉ công bố sau thử thật.
Chỉ deploy lên môi trường được giao; thiếu đầu vào ghi blocker.
Khi có giao dịch thật, lưu network/address/receipt/events vào evidence.

Bắt buộc thực hiện checklist và khối PowerShell ngay dưới prompt này. Áp dụng R0/R3 trước sửa, R6/R7 sau sửa; setup v0.0 làm đủ R0–R5. Không báo xong khi chưa có evidence của gate tương ứng.
~~~

Test: unauthorized mint/burn; sai ví/chain/contract/config/mode; expired proof;
claim lặp; input reward giả; token supply; callback; identity sau reload.
Mock messenger hoặc fixture không thay evidence testnet.


**Trước code:** D07 Accepted, chain/session/quota/proof policy rõ;
đọc Foundry config và version contracts. Identity qua campaign không dùng lại mặc định cũ.
Tạo asset/registry/roles và proof validation server-contract.
Tạo packages/contracts-l1/test/ElementalAcquisition.t.sol
và apps/web/tests/elemental/acquisition-api.test.ts.

~~~powershell
pnpm --filter @defi-trail/contracts-l1 exec forge test --match-path 'test/ElementalAcquisition.t.sol'
if ($LASTEXITCODE -ne 0) { throw 'Acquisition contract tests failed' }
pnpm --filter @defi-trail/web exec vitest run tests/elemental/acquisition-api.test.ts
if ($LASTEXITCODE -ne 0) { throw 'Acquisition API tests failed' }
~~~

Test wrong wallet/domain/chain/config/mode/nonce/expiry, replay, malicious quantity,
unauthorized mint/burn, callback, supply và reconnect identity.
Đếm test >0. Không có môi trường được chỉ định thì live part BLOCKED, không broadcast.
Có live authorization: báo network/address/receipt/event và read balance sau reload.

### v0.8 — Chăm và evolution on-chain

~~~text
Thực hiện v0.8. Xây custody/ledger/time accounting theo D02/D03.
Dùng số nguyên, settle đúng thứ tự trước thay đổi vị thế.
Recipe consume+mint nguyên tử và có version; không cho client sửa cost/output.
Nối real adapter với UI; không dùng timer trình duyệt làm số dư chính thức.
Giữ withdraw/recovery khi campaign kết thúc theo policy đã accepted.

Bắt buộc thực hiện checklist và khối PowerShell ngay dưới prompt này. Áp dụng R0/R3 trước sửa, R6/R7 sau sửa; setup v0.0 làm đủ R0–R5. Không báo xong khi chưa có evidence của gate tương ứng.
~~~

Test: harvest nhiều lần so một lần; clock tamper; cap/sink theo quyết định;
stake/withdraw/reentrancy; wrong owner; insufficient funds; revert rollback;
last-copy warning UI và balance/discovery sau evolve; parity TS/contract.
Foundry warp mô phỏng thời gian là test, không phải lịch sử giao dịch live.


**Triển khai:** integer ledger, settle-before-mutate, custody receiver checks,
withdraw/recovery khi campaign close, consume+mint nguyên tử, recipe versioned.
Nối real adapter; số dư chính thức reconcile receipt/reads.
Tạo packages/contracts-l1/test/ElementalCareEvolution.t.sol
và packages/shared/tests/elemental/economy-parity.test.ts.

~~~powershell
pnpm --filter @defi-trail/contracts-l1 exec forge test --match-path 'test/ElementalCareEvolution.t.sol'
if ($LASTEXITCODE -ne 0) { throw 'Care/evolution contracts failed' }
pnpm --filter @defi-trail/shared exec vitest run tests/elemental/economy-parity.test.ts
if ($LASTEXITCODE -ne 0) { throw 'Economy parity failed' }
~~~

Test amount/time boundary, nhiều lần harvest so một lần, client clock tamper,
wrong owner, callbacks, forbidden consumption, insufficient cost, revert rollback.
Fuzz invariants phù hợp. Không sửa fixture cho khớp bug contract.

### v0.9 — Verified history và persistence backend

~~~text
Thực hiện v0.9. Xây durable DB/migrations/indexer/cursors và query APIs.
Xác minh receipt/log/chain/emitter/player trước project progress.
Unique event/request/achievement theo phạm vi; replay idempotent.
Lưu history người chơi-loài, không giả phả hệ cá thể ERC-1155.
Tách dữ liệu có thể rebuild từ chain với auth/fulfillment cần backup.
Không nhận CONFIRMED/balance do client gửi làm authority.

Bắt buộc thực hiện checklist và khối PowerShell ngay dưới prompt này. Áp dụng R0/R3 trước sửa, R6/R7 sau sửa; setup v0.0 làm đủ R0–R5. Không báo xong khi chưa có evidence của gate tương ứng.
~~~

Test: fake/reverted/wrong-chain events; duplicate; out-of-order/reorg policy;
restart/replay cho cùng state; cursor recovery; access control;
restore backup thực cho dữ liệu không rebuild được; A/B không mất world history.


**Triển khai:** dùng DB đã chốt, migrations versioned, unique events/requests,
cursor/reorg policy, auth và verified projection.
Không tự chọn SQLite/Postgres mới nếu Architecture đã chọn.
Tạo apps/web/tests/elemental/history.integration.test.ts dùng DB TEST riêng.

~~~powershell
pnpm --filter @defi-trail/web exec vitest run tests/elemental/history.integration.test.ts
if ($LASTEXITCODE -ne 0) { throw 'History integration failed hoặc thiếu DB test' }
~~~

Không fallback sang Map rồi báo integration pass.
Test restart process, duplicate/out-of-order, forged/reverted/wrong-chain events,
access control, cursor recovery, A→B history. Backup/restore trên DB test,
không thử phá production. Dữ liệu auth/fulfillment không giả rebuild từ chain.

### v0.10 — Reward ICM và utility thật

~~~text
Thực hiện v0.10. Xây một flow reward ICM theo D04, tách khỏi recipe evolution.
Quy định source/destination authority, payload version/hash, request ID,
outcome/ACK outbox và finality. Lock/consume chỉ khi scope yêu cầu.
Origin/messenger checks, retry cùng payload, không cấp entitlement hai lần.
UI phân biệt pending, retryable transport error, business reject và final.
Nối utility gate với bằng chứng thật sau finality.
Không tự timeout refund khi remote có thể accepted.

Bắt buộc thực hiện checklist và khối PowerShell ngay dưới prompt này. Áp dụng R0/R3 trước sửa, R6/R7 sau sửa; setup v0.0 làm đủ R0–R5. Không báo xong khi chưa có evidence của gate tương ứng.
~~~

Test: duplicate đúng payload replay; cùng ID khác payload bị chặn;
wrong origin; ACK lỗi/lặp; relayer stop/resume; backend reload;
reject hoàn đúng nếu có escrow; không grant trước final;
live request/ACK trên mạng mục tiêu, lưu receipt cả hai chiều.
Nếu chưa live được, version còn blocker, không đánh dấu release ICM-ready.


**Triển khai:** requestId/payload hash/schema, trusted origin, outcome/ACK outbox,
grant once và utility gate sau final. Tách transport attempts khỏi business status.
Tạo test/ElementalRewardRoundTrip.t.sol theo root foundry.toml đã đọc,
và apps/web/tests/elemental/reward-flow.test.ts.

~~~powershell
forge test --root . --match-path 'test/ElementalRewardRoundTrip.t.sol'
if ($LASTEXITCODE -ne 0) { throw 'Reward roundtrip model failed' }
pnpm --filter @defi-trail/web exec vitest run tests/elemental/reward-flow.test.ts
if ($LASTEXITCODE -ne 0) { throw 'Reward state/UI tests failed' }
~~~

Test duplicate/payload mismatch/wrong origin, accepted+ACK fail, ACK duplicate,
reject/refund khi có escrow, no grant before final và reconnect pending.
Live needs specified L1/C-Chain/relayer và quyền môi trường; không cast send địa chỉ giả.
Lưu commands thật không chứa private key, request/ACK receipts.
Thử pause/resume chỉ service demo được phép; không dừng hạ tầng dùng chung.

### v0.11 — Release review

~~~text
Thực hiện v0.11. Truy vết toàn luồng theo PRD/Architecture và diff, tìm lỗi có bằng chứng.
Chạy regression phù hợp: app/contract/integration và mobile smoke.
Kiểm tra secrets/config separation, replay/authority, recovery và progress.
Lập runbook deploy/config/migration/health/backup/rollback.
Sửa lỗi chặn release trong phạm vi được giao; không nới luật để làm test xanh.
Báo pass/fail/unverified theo từng gate; chưa publish trong version này.

Bắt buộc thực hiện checklist và khối PowerShell ngay dưới prompt này. Áp dụng R0/R3 trước sửa, R6/R7 sau sửa; setup v0.0 làm đủ R0–R5. Không báo xong khi chưa có evidence của gate tương ứng.
~~~

Test: new account, returning account, slow/offline, wallet reject, tx revert,
pending restore, campaign closed, utility used/owned states, image fallback.
Chỉ rõ trình duyệt/thiết bị chưa kiểm tra. Build pass không thay runtime QA.


**Thực thi release:** R2 và commands dưới, kiểm tra Decision log/diff/status.
Không skip test để qua gate. Chuẩn bị migrations/env names/health endpoints thật,
backup/restore/rollback và người xử lý blocker.
~~~powershell
pnpm test:contracts
if ($LASTEXITCODE -ne 0) { throw 'Contract regression failed' }
pnpm --filter @defi-trail/shared test
if ($LASTEXITCODE -ne 0) { throw 'Shared regression failed' }
pnpm --filter @defi-trail/web test
if ($LASTEXITCODE -ne 0) { throw 'Web regression failed' }
pnpm typecheck
if ($LASTEXITCODE -ne 0) { throw 'Typecheck failed' }
pnpm lint
if ($LASTEXITCODE -ne 0) { throw 'Lint failed' }
pnpm build
if ($LASTEXITCODE -ne 0) { throw 'Release build failed' }
~~~

Rerun chỉ phần cần sau fix rồi full gate khi đủ. Browser fresh/returning user,
wallet reject, offline/slow network, pending restore, campaign close, utility.
Chốt source/docs trước R4→R5 cuối; ghi freshness thật.

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

Bắt buộc thực hiện checklist và khối PowerShell ngay dưới prompt này. Áp dụng R0/R3 trước sửa, R6/R7 sau sửa; setup v0.0 làm đủ R0–R5. Không báo xong khi chưa có evidence của gate tương ứng.
~~~

Gate: deploy truy cập được, test flows thật, ICM evidence đúng.
Không gọi demo là pilot quà thật hoặc sản phẩm đã chứng minh retention.
Commit v0.12 chứa release config/runbook liên quan, không secrets.
Tên commit không chứng minh deploy thành công; evidence nằm trong status.


**Đầu vào bắt buộc:** host/runtime, network, config version, DB, deployment identity,
quyền thực hiện và release gates. Thiếu thì hỏi đúng phần đó; không tự chọn account cloud.
Đọc CLI/config của host đã chọn, viết command deploy cụ thể vào Architecture/evidence.
Không tồn tại một lệnh deploy chung đúng cho mọi nền tảng.

~~~powershell
git rev-parse HEAD
if ($LASTEXITCODE -ne 0) { throw 'Cannot identify release commit' }
git status --short
~~~

Dirty tree: ghi nguồn release thực, không gọi HEAD là toàn bộ thay đổi chưa commit.
Migrations đúng DB sau backup rehearsal, deploy đúng scope, URL thật smoke/browser/live flow.
Critical smoke fail: rollback theo runbook, báo lỗi; không giấu dưới video backup.
Không tự push/tag/DNS/send thông báo ngoài phạm vi.

## 5. Lệnh kiểm tra và evidence

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

## 6. Prompt tiếp tục, review, sửa lỗi

~~~text
Tiếp tục repo hiện tại. Đọc AGENTS.md, docs/ELEMENTAL_TRAIL_PRD.md, docs/ELEMENTAL_TRAIL_ARCHITECTURE.md và docs/ELEMENTAL_TRAIL_VIBE_CODING.md
và IMPLEMENTATION_STATUS.md. Kiểm tra working tree.
Xác định version còn thiếu đầu tiên theo dependency và evidence, rồi tiếp tục.
Không đọc backlog cũ để tự thêm scope hoặc làm lại phần đã đạt.
~~~

~~~text
Review version [vX.Y] theo PRD/Architecture và diff.
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

## 7. Cập nhật kiến trúc trong mỗi version

Thực hiện R3 trước khi sửa source, R4 rồi R5 sau structural changes và test.
R3–R5 ở đầu cùng file có lệnh terminal, thứ tự đọc artifact, lỗi/guard và gate cụ thể.
Không dùng lại cú pháp terminal graphify . --update của bản hướng dẫn cũ.
Scope tài liệu không tự yêu cầu rebuild graph cho mọi typo; cần báo coverage thực tế.

## 8. Dọn tài liệu cũ — chưa xóa tự động

Ba file hiện hành:
- ELEMENTAL_TRAIL_PRD.md — sản phẩm, Accepted/Open, scope, UX và Decision log.
- ELEMENTAL_TRAIL_ARCHITECTURE.md — thiết kế kỹ thuật mục tiêu, invariant, asset contract, evidence.
- ELEMENTAL_TRAIL_VIBE_CODING.md — version, prompt, test, commit và hướng dẫn thực thi.

**Có thể xóa bản dư sau khi kiểm tra/backup:**
ELEMENTAL_TRAIL_MASTER.md và bản HTML của nó; các bản hướng dẫn cũ
docs/mvp/00_BAT_DAU_TU_DAY.md, 03_VIBE_CODING_PLAN.md,
07_PERSISTENT_WORLD_VISION.md, SCOPE_V2.md, WORKSPACE_CONTEXT.md,
DOC_REVIEW_PRODUCT_DECISIONS.md và ASSET_AUDIT.md.
docs/mvp/README.md có thể giữ làm shortcut. Sửa các link còn trỏ tới file bị xóa cùng lượt cleanup.
Bản HTML cũ là snapshot, không tự cập nhật từ Markdown.

**Nên archive thay vì xóa mất lịch sử:**
docs/mvp/01_GAME_DESIGN.md, 02_TECHNICAL_DESIGN.md, 03_EVENT_BASELINE_ARCHIVE.md,
04_ASSET_HANDOFF.md và bộ balance.v1.json + economy_check.py + ECONOMY_CHECK.md.
Giữ bộ economy cùng thư mục vì script dùng đường dẫn tương đối.
PRD/ADR DeFi cũ và docs/reference là provenance, không phải scope hiện hành.

**Giữ nguyên:**
asset source pet/, asset-inventory.json, code/tests/config/lockfile,
AGENTS.md, nested AGENTS.md, docs/.cursorrules, IMPLEMENTATION_STATUS.md nếu có,
.archify/, graphify-out/, archify.md, archify.config.json, .archifyignore,
các artifacts kỹ thuật còn dùng và Git history.
05_AI_IMAGE_PROMPT_PACK.md và 06_UI_REFERENCE_PROMPT_PACK.md là thư viện sáng tạo
có thể giữ riêng; không dùng nội dung luật cũ của chúng để ghi đè PRD.
Không xóa secrets/deployment data hay thư mục lớn vì chúng không thuộc ba file PRD.

Chỉ ba file trên là tài liệu kế hoạch chính; điều đó không có nghĩa cả repo chỉ giữ ba file.

## 9. Hợp đồng test và báo cáo

Các test paths elemental/ trong version là **file phải tạo**, chưa có sẵn khi viết kế hoạch.
Nếu audit xác định convention khác, ghi mapping đường dẫn và lệnh thay thế trước khi chạy.
Không dùng “No tests found”, 0 tests hoặc skip để báo PASS.
Không đặt cả expected và actual từ cùng helper đang test.

Mẫu final mỗi version:
1. Version, hành vi trước/sau, files thay đổi.
2. Commands + exit code + test counts/results thực.
3. APP/GRAPH_CODE/GRAPH_SEMANTIC/ARCHIFY/UI/LIVE statuses và evidence.
4. Dev/deploy URL hoặc route thật; 3–6 bước người dùng tự thử.
5. Blockers và quyết định Open, phần độc lập đã xong.
6. Tên commit đề xuất hoặc hash thật nếu được giao commit.
7. Version tiếp theo và dependencies đã đáp ứng.

Trong lần sửa tài liệu: chỉ kiểm tra CLI help/version/status/query và cấu trúc tài liệu.
Chưa install lại dependencies, chưa chạy baseline tests, chưa rebuild Graphify/Archify.
