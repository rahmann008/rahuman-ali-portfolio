# Rahuman Ali — Portfolio

React + Vite + Tailwind portfolio with a printable resume page and an AI assistant widget.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Build for production
```bash
npm run build
```
Outputs static files to `dist/` — deployable to any static host.

## Free hosting options
- **Cloudflare Pages** (recommended): connect your GitHub repo, build command `npm run build`,
  output directory `dist`. Unlimited bandwidth, no credit card required.
- **GitHub Pages**: also free; requires a small Vite `base` config tweak for the repo subpath.
- **Vercel / Netlify**: also free tiers, auto-detect Vite projects.

## Structure
- `src/data/` — your profile, experience, skills, and projects content (edit these to update the site)
- `src/components/` — page sections
- `src/pages/ResumePage.jsx` — the `/resume` route (Print / Save as PDF + Download PDF)
- `public/resume/Rahuman_Ali_Resume.pdf` — the downloadable resume (swap this file to update it)
- `public/images/profile.jpg` — your photo, shown in the About section
- `ai-widget-backend/` — optional serverless backend to power the AI assistant with real Claude
  responses (see its README). Until set up, the widget uses a built-in offline FAQ engine.

## Updating content
Everything text-based lives in `src/data/*.js` as plain JS objects/arrays — no need to touch
component code to update your experience, skills, or projects.
