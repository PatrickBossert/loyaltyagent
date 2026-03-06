# update.ps1 — Extract latest zip from Downloads and deploy to GitHub
# Usage: .\update.ps1
# Run this from C:\Users\Patri\Documents\loyaltyagent

param(
    [string]$Message = ""
)

$RepoDir   = $PSScriptRoot
$ZipName   = "loyaltyagent.zip"
$Downloads = "$env:USERPROFILE\Downloads\$ZipName"
$Desktop   = "$env:USERPROFILE\Desktop\$ZipName"

Write-Host ""
Write-Host ">> LoyaltyAgent.ai — Update & Deploy" -ForegroundColor Cyan
Write-Host ""

# Find the zip (check Downloads then Desktop)
$ZipPath = ""
if (Test-Path $Downloads) {
    $ZipPath = $Downloads
    Write-Host "   Found zip in Downloads" -ForegroundColor Gray
} elseif (Test-Path $Desktop) {
    $ZipPath = $Desktop
    Write-Host "   Found zip on Desktop" -ForegroundColor Gray
} else {
    Write-Host ">> ERROR: Could not find $ZipName in Downloads or Desktop." -ForegroundColor Red
    Write-Host "   Please download the zip from Claude and try again." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# Extract zip, overwriting existing files (skip the top-level folder)
Write-Host "   Extracting files..." -ForegroundColor Gray
$TempDir = "$env:TEMP\loyaltyagent_update"
if (Test-Path $TempDir) { Remove-Item $TempDir -Recurse -Force }
Expand-Archive -Path $ZipPath -DestinationPath $TempDir -Force

# Copy contents of loyaltyagent\ subfolder into repo root
$ExtractedFolder = Join-Path $TempDir "loyaltyagent"
if (Test-Path $ExtractedFolder) {
    Copy-Item "$ExtractedFolder\*" -Destination $RepoDir -Recurse -Force
} else {
    Copy-Item "$TempDir\*" -Destination $RepoDir -Recurse -Force
}

Write-Host "   Files updated." -ForegroundColor Gray

# Clean up temp
Remove-Item $TempDir -Recurse -Force

# Auto commit message
if ($Message -eq "") {
    $Message = "Site update " + (Get-Date -Format "yyyy-MM-dd HH:mm")
}

# Git commit and push
Set-Location $RepoDir
git add .

$status = git status --porcelain
if ($status -eq "") {
    Write-Host ""
    Write-Host ">> Nothing to deploy — extracted files are identical to current version." -ForegroundColor Yellow
    Write-Host ""
    exit 0
}

git commit -m $Message
git push origin main

Write-Host ""
Write-Host ">> Done! Cloudflare will deploy in ~1 minute." -ForegroundColor Green
Write-Host "   Live at: https://loyaltyagent.ai" -ForegroundColor Cyan
Write-Host ""
