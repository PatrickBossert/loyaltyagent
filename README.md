# LoyaltyAgent.ai — Demonstrator Site

Companion website for *Australia's Points Economy* — an AI-powered loyalty points optimisation platform.

## Tech Stack

- **React 18** + **Vite** — fast builds, hot module replacement in dev
- **Cloudflare Pages** — hosting and CDN
- **GitHub Actions** — CI/CD pipeline (auto-deploy on push to `main`)

---

## Local Development

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Production Build (test locally)

```bash
npm run build
npm run preview
# → http://localhost:4173
```

---

## Getting Started (First Push)

Clone the existing repo:

```bash
git clone https://github.com/PatrickBossert/loyaltyagent.ai.git
cd loyaltyagent.ai
npm install
npm run dev
```

Or if pushing this project into the repo for the first time:

```bash
cd loyaltyagent
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/PatrickBossert/loyaltyagent.ai.git
git branch -M main
git push -u origin main
```

The GitHub Actions workflow triggers automatically and deploys to Cloudflare Pages.

---

## Deployment Setup (one-time)

### 1. Create Cloudflare Pages Project

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Select **PatrickBossert/loyaltyagent.ai** from the repository list
4. Set build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**
6. Note your **Account ID** from the dashboard URL or Overview page

### 2. Create a Cloudflare API Token

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token** → Use the **Edit Cloudflare Workers** template
3. Add permission: **Cloudflare Pages — Edit**
4. Scope to your account
5. Copy the token

### 3. Add GitHub Secrets

In your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret Name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | The API token from step 2 |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID |

### 4. Connect Custom Domain

1. In Cloudflare Pages → your project → **Custom domains**
2. Add `loyaltyagent.ai`
3. Since your domain is already on Cloudflare, the DNS CNAME will be added automatically

---

## Deployment Workflow

| Trigger | Result |
|---|---|
| Push to `main` | Auto-deploys to `loyaltyagent.ai` |
| Open a Pull Request | Deploys a preview URL, posts it as a PR comment |
| Merge PR to `main` | Deploys preview to production |

---

## Project Structure

```
loyaltyagent/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions CI/CD
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx             # React entry point
│   └── App.jsx              # Full site component
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Feedback Notes for Author Review

This is a demonstrator site — all data is illustrative. Key areas for author feedback:

- **Scheme names and point values** — are the example programmes correct for the Australian market?
- **Opportunity cards** — does the switching framing reflect the regulatory thesis in the book?
- **Tone** — does the *editorial meets fintech* voice match the book's positioning?
- **Membership tiers** — are the price points and feature splits appropriate?
- **Book chapter titles** — placeholders used; replace with actual chapter names when confirmed
