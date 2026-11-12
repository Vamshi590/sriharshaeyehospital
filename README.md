# Sri Harsha Eye Hospital – Website

Marketing and appointment-booking website for Sri Harsha Eye Hospital, Karimnagar.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · Supabase · deployed on Vercel.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the Supabase values
npm run dev
```

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server                 |
| `npm run build`   | Type-check and build to `dist/`      |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run ESLint                           |
| `npm test`        | Unit + UI integration tests (Vitest, Testing Library) |
| `npm run test:build` | Checks the prerendered `dist/` output (run after `npm run build`) |
| `npm run test:all` | Tests, build, then build checks      |

## Environment variables

| Name                 | Description                     |
| -------------------- | ------------------------------- |
| `VITE_SUPABASE_URL`  | Supabase project URL            |
| `VITE_SUPABASE_KEY`  | Supabase anon (public) key      |
| `VITE_GA_ID`         | Optional GA4 measurement id; analytics are off when empty |
| `VITE_SITE_URL`      | Live site origin, e.g. `https://www.example.com` (used for canonical URLs, sitemap and schema) |

If these are missing the site still loads, but the appointment form shows a
"call us" message instead of submitting.

## Project structure

```
src/
  App.tsx              Routes + layout (navbar, footer, scroll-to-top)
  index.css            Tailwind import, brand colour tokens, marquee animation
  components/          Navbar, footer, insurance marquee, photo carousel, SEO helpers
  pages/               One file per route (home, services, doctors, appointment, …)
  data/                Editable content: doctors, FAQs, insurers, contact details, site facts
  seo/                 Route metadata, structured data, sitemap / robots / llms.txt
  lib/supabase.ts      Supabase client
  assets/              Images (WebP where possible – keep new photos ≤ 1600px wide)
public/                Static files served as-is (favicon)
```

### Editing content

- **Doctors** – `src/data/doctors.ts` (used by the home page, doctors page and booking form).
  Set `featured: true` to show a doctor on the home page.
- **Phone / email / address** – `src/data/contact.ts`.

## Forms

- **Appointment form** inserts a row into the Supabase `Appointments` table with the columns
  `name, phonenumber, service, doctor, prefferedDate, prefferedTime, email, date`
  (column spellings are kept as they exist in the database).
- **Contact form** has no backend – it opens WhatsApp (or email) with the message pre-filled.

## SEO and prerendering

`npm run build` builds the client, then an SSR bundle (`src/entry-server.tsx`), then
`scripts/prerender.mjs` writes one static HTML file per route plus `404.html`, `sitemap.xml`,
`robots.txt` and `llms.txt`. Crawlers and AI assistants get full HTML; the browser hydrates it.

- Page titles and descriptions: `src/seo/routes.ts` (every route in `App.tsx` must have an entry; tests enforce it).
- Structured data (Hospital, Physician, FAQPage, BreadcrumbList): `src/seo/schema.ts`.
- Unconfirmed facts (founding year, NABH certificate, doctor registration numbers) stay empty in
  `src/data/site.ts` and `src/data/doctors.ts` and are only shown once filled in.
- Copy must follow the NMC advertising guidelines (Oct 2026): no "best"/superiority claims, no
  guarantees, no patient testimonials. `src/content.test.ts` fails the build if such wording appears.

## Pages

| Section | Routes | Content lives in |
| --- | --- | --- |
| Eye care | `/services`, `/eye-care/<slug>` (11 pages) | `src/data/services.ts` |
| Doctors | `/doctors`, `/doctors/<slug>` | `src/data/doctors.ts` |
| Patients | `/patients`, `/patients/costs`, `/patients/insurance`, `/patients/first-visit`, `/patients/cataract-surgery-guide` | `src/data/costs.ts`, `src/data/insurance.ts` |
| Health library | `/health-library`, `/health-library/<slug>` | `src/data/articles.ts` |
| Telugu | `/te`, `/te/<slug>`, `/te/contact` | `src/data/te.ts` |
| Ad landing pages (noindex) | `/lp/a1`, `/lp/a2`, `/lp/a3` | `src/data/landing.ts` |

Route pages are code-split (`src/routes-table.ts`); the current page is preloaded before hydration.

See `docs/` for the launch checklist, Google Business Profile checklist, monthly AI-visibility test
and content routine.

## Deployment

Deployed on Vercel. Each route is a static file (`cleanUrls`), unknown URLs get the real `404.html`, and `vercel.json` adds security headers.
Add the environment variables above in the Vercel project settings.
