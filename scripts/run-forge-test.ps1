$targetDir = "C:\YieldGo\contracts-cchain"
if (-not (Test-Path "C:\YieldGo")) {
    New-Item -ItemType Directory -Force -Path "C:\YieldGo" | Out-Null
}

$sourceDir = Join-Path $PSScriptRoot "..\packages\contracts-cchain"
New-Item -ItemType Directory -Force -Path (Join-Path $targetDir "src") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $targetDir "test") | Out-Null

Copy-Item -Recurse -Force (Join-Path $sourceDir "src\*") (Join-Path $targetDir "src")
Copy-Item -Recurse -Force (Join-Path $sourceDir "test\*") (Join-Path $targetDir "test")
Copy-Item -Force (Join-Path $sourceDir "foundry.toml") (Join-Path $targetDir "foundry.toml")
Copy-Item -Force (Join-Path $sourceDir "remappings.txt") (Join-Path $targetDir "remappings.txt")

$env:Path = "C:\Users\Lenovo\.foundry\bin;" + $env:Path

Push-Location $targetDir
try {
    Write-Host "Running: forge test -vvv in $targetDir" -ForegroundColor Cyan
    forge test -vvv
} finally {
    Pop-Location
}
