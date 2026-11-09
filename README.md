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

## Environment variables

| Name                 | Description                     |
| -------------------- | ------------------------------- |
| `VITE_SUPABASE_URL`  | Supabase project URL            |
| `VITE_SUPABASE_KEY`  | Supabase anon (public) key      |

If these are missing the site still loads, but the appointment form shows a
"call us" message instead of submitting.

## Project structure

```
src/
  App.tsx              Routes + layout (navbar, footer, scroll-to-top)
  index.css            Tailwind import, brand colour tokens, marquee animation
  components/          Navbar, footer, insurance & testimonial marquees
  pages/               One file per route (home, services, doctors, appointment, …)
  data/                Editable content: doctors, testimonials, contact details
  lib/supabase.ts      Supabase client
  assets/              Images (WebP where possible – keep new photos ≤ 1600px wide)
public/                Static files served as-is (favicon)
```

### Editing content

- **Doctors** – `src/data/doctors.ts` (used by the home page, doctors page and booking form).
  Set `featured: true` to show a doctor on the home page.
- **Testimonials** – `src/data/testimonials.ts` (home page marquee and testimonials page).
- **Phone / email / address** – `src/data/contact.ts`.

## Forms

- **Appointment form** inserts a row into the Supabase `Appointments` table with the columns
  `name, phonenumber, service, doctor, prefferedDate, prefferedTime, email, date`
  (column spellings are kept as they exist in the database).
- **Contact form** has no backend – it opens WhatsApp (or email) with the message pre-filled.

## Deployment

Deployed on Vercel. `vercel.json` rewrites all paths to `index.html` so client-side routes work on refresh.
Add the two environment variables above in the Vercel project settings.
