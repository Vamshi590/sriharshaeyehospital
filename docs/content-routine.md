# Monthly content routine

- **Two health library articles a month** — add to `src/data/articles.ts`, turning the month's Instagram
  posts into 400–800 word articles. Each article: a question as the title, the answer in the first two
  sentences, a link to the matching `/eye-care/` page, and the publish date.
- **Refresh the top 10 pages** (from Search Console) — check facts, add one new FAQ, set `updated` dates.
- **Telugu** — when an English page changes, update its Telugu version in `src/data/te.ts`.
- **Eye camps** — add photos with date and place to the gallery.
- Before publishing, `npm run test:all` must pass: it blocks wording the NMC guidelines don't allow
  and checks every page's title, description, structured data and links.
