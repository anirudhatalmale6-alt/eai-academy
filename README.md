# Empathetic AI Academy

Training platform for the AI in Finance capability of Empathetic AI (an OpenAI
Select Partner). Practical, credible AI courses for tax, accounting and finance
professionals — free intro course as the lead magnet, paid courses and a
certification path, funnelling into Empathetic AI's products.

Design: "Direction C" — mirrors the OpenAI Academy look (light canvas, sidebar
nav, gradient hero, cyan accent) adapted to the Empathetic AI brand.

## Stack

- React + Vite + TypeScript + Tailwind CSS
- Supabase (database + auth) — the site runs in **preview mode** with seed data
  until Supabase env vars are set
- Stripe (payments) and Resend (transactional email) — wired in Phase 2/3

## Build phases

- **Phase 1 (this repo):** OpenAI-Academy-style site, course catalog, course
  pages, free-course email capture, admin skeleton, database schema.
- **Phase 2:** Stripe checkout, student accounts + "My Courses" + lesson playback.
- **Phase 3:** Automatic emails, certificates, Luna list import, and migrating
  the main site's inquiry form from HubSpot to Supabase.

## Local development

```bash
npm install
cp .env.example .env   # fill in when Supabase is ready
npm run dev
```

## Database

Apply `supabase/schema.sql` in the Academy's Supabase project. It creates the
courses, lessons, enrollments and orders tables with row-level security
(public read for published courses; admin-only for the enrollment list).

## Deployment

- Preview: GitHub Pages (see `.github/workflows/deploy-pages.yml`), served under
  a sub-path using `HashRouter`.
- Production: intended for `academy.empathetic-ai.com` (e.g. Vercel), where it
  switches to clean URLs.
