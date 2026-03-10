# deploy.ps1 - Push latest changes to GitHub
# Usage: Right-click → "Run with PowerShell", or run from terminal: .\deploy.ps1
# Optionally pass a commit message: .\deploy.ps1 "Updated logo styling"

param(
    [string]$Message = ""
)

# Auto-generate commit message with timestamp if none provided
if ($Message -eq "") {
    $Message = "Site update " + (Get-Date -Format "yyyy-MM-dd HH:mm")
}

Write-Host ""
Write-Host ">> LoyaltyAgent.ai - Deploying to GitHub" -ForegroundColor Cyan
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
Write-Host ">> Done! Cloudflare will deploy in ~1 minute." -ForegroundColor Green
Write-Host "   Live at: https://loyaltyagent.ai" -ForegroundColor Cyan
Write-Host ""
