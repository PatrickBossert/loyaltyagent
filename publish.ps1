# publish.ps1 - Merge dev into main and deploy to production
# Usage: .\publish.ps1
# Run this when you're happy with the dev preview and want to go live

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host ">> POINTSMaster - Publishing to production" -ForegroundColor Cyan
Write-Host ""

# Must be on dev to publish
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -ne "dev") {
    Write-Host ">> Switch to dev branch before publishing." -ForegroundColor Yellow
    Write-Host "   Run: git checkout dev" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# Check for uncommitted changes
$status = git status --porcelain
if ($status -ne "") {
    Write-Host ">> Uncommitted changes detected. Save them first:" -ForegroundColor Yellow
    Write-Host "   .\deploy.ps1 `"your message`"" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# Merge dev into main
Write-Host "   Merging dev into main..." -ForegroundColor Gray
git checkout main
git merge dev --no-edit
git push origin main

# Return to dev
git checkout dev

Write-Host ""
Write-Host ">> Published! Cloudflare will go live in ~1 minute." -ForegroundColor Green
Write-Host "   Live at: https://pointsmaster.app" -ForegroundColor Cyan
Write-Host ""
