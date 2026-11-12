# Launch checklist

Do these once, in order, when the new site goes live.

## 1. Vercel environment variables
| Name | Value |
| --- | --- |
| `VITE_SITE_URL` | The live domain, e.g. `https://www.sriharshaeyehospital.com` (no trailing slash) |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_KEY` | Existing Supabase project values |
| `VITE_GA_ID` | GA4 measurement id (`G-XXXXXXX`); leave empty to disable analytics |

Redeploy after changing them: they are baked into the static HTML at build time.

## 2. Search engines
- [ ] Google Search Console: add the domain property, then submit `https://<domain>/sitemap.xml`.
- [ ] Bing Webmaster Tools: import from Search Console (one click), submit the sitemap.
- [ ] Rich Results Test on `/`, `/eye-care/cataract-surgery`, `/doctors/dr-srilatha-ch`: zero errors.
- [ ] PageSpeed Insights (mobile) on `/` and `/eye-care/cataract-surgery`: Performance 90+, SEO 100.

## 3. Analytics (GA4)
- [ ] Create a GA4 property, put its id in `VITE_GA_ID`.
- [ ] Mark `book_submit`, `call_click` and `whatsapp_click` as key events (conversions).
- [ ] Link GA4 to Search Console.

The site sends no names, phone numbers or medical details to analytics.

## 4. Ads
- Point Instagram / Meta ads at `/lp/a1` (eye check-up), `/lp/a2` (cataract), `/lp/a3` (diabetic eye check-up).
- Always add UTM tags, e.g. `/lp/a2?utm_source=instagram&utm_medium=paid&utm_campaign=cataract-nov26`.
- Click-to-WhatsApp ads keep the lead inside Meta and avoid pixel restrictions on health sites.
- Ad copy must follow the NMC guidelines (Oct 2026): no testimonials, no "best"/"No. 1", no guarantees,
  no before/after images; name the doctor with qualifications and registration number.

## 5. Facts still to fill in (code shows them automatically once set)
| What | Where |
| --- | --- |
| NABH certificate number, founding year | `src/data/site.ts` |
| Doctors' registration numbers, languages | `src/data/doctors.ts` |
| Starting prices | `src/data/costs.ts` |
| Medical reviewer and date for eye-care pages | `SITE.review` in `src/data/site.ts` |
| Instagram / Facebook / Google Business Profile URLs | `SITE.sameAs` in `src/data/site.ts` |
