# deploy.ps1 - Commit and push changes to the dev branch
# Usage: .\deploy.ps1 "what you changed"
# To publish to production, use .\publish.ps1 instead

param(
    [string]$Message = ""
)

# Auto-generate commit message with timestamp if none provided
if ($Message -eq "") {
    $Message = "Site update " + (Get-Date -Format "yyyy-MM-dd HH:mm")
}

# Guard: warn if accidentally run on main
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -eq "main") {
    Write-Host ""
    Write-Host ">> You are on the main branch." -ForegroundColor Yellow
    Write-Host "   Use .\publish.ps1 to deploy to production." -ForegroundColor Yellow
    Write-Host "   Run 'git checkout dev' to switch to dev first." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host ">> POINTSMaster - Saving to dev" -ForegroundColor Cyan
Write-Host "   Branch: $currentBranch" -ForegroundColor Gray
Write-Host "   Commit: $Message" -ForegroundColor Gray
Write-Host ""

# Stage all changes
git add .

# Check if there's anything to commit
$status = git status --porcelain
if ($status -eq "") {
    Write-Host ">> Nothing to deploy - no changes detected." -ForegroundColor Yellow
    Write-Host ""
    exit 0
}

# Commit and push
git commit -m $Message
git push origin main

Write-Host ""
Write-Host ">> Done! Cloudflare will update the dev preview in ~1 minute." -ForegroundColor Green
Write-Host "   Run .\publish.ps1 when ready to go live." -ForegroundColor Gray
Write-Host ""
