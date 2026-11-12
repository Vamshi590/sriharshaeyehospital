/**
 * Site-wide facts used for SEO metadata and structured data.
 * Optional fields stay `undefined` until the hospital confirms them; nothing
 * unconfirmed is ever rendered or put into structured data.
 */
/** The hospital's own domain. sriharshaeyehospital.com redirects here, and so does the old *.vercel.app address (vercel.json). */
export const PRODUCTION_URL = "https://www.sriharshaeyehospital.com"

const envUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim()

/**
 * Public origin used for canonical URLs, the sitemap, hreflang, Open Graph and structured data
 * (no trailing slash). VITE_SITE_URL can override it, but a *.vercel.app value is ignored:
 * that address only redirects, so it must never be advertised to search engines as canonical.
 */
export const SITE_URL = (envUrl && !/\.vercel\.app\/?$/i.test(envUrl) ? envUrl : PRODUCTION_URL).replace(/\/+$/, "")

export const SITE = {
  shortDescription:
    "NABH-accredited eye hospital in Karimnagar, Telangana, offering cataract surgery, retina, glaucoma, cornea, oculoplasty and children's eye care.",
  accreditation: "NABH (National Accreditation Board for Hospitals & Healthcare Providers)",
  /** e.g. "2009" — fill in once confirmed. */
  foundingYear: undefined as string | undefined,
  /** NABH certificate number — fill in once confirmed. */
  nabhCertificate: undefined as string | undefined,
  /** Official profiles, used as schema.org `sameAs`. Add Instagram / Facebook / Google Business Profile URLs. */
  sameAs: [] as string[],
  ogImage: "/og-image.png",
  /**
   * Medical review of the eye-care pages. Fill in once a doctor has reviewed them, e.g.
   * { by: "Dr. Srilatha CH", date: "2026-11-15" }. Shown on every service page and in its schema.
   */
  review: undefined as { by: string; date: string } | undefined,
  languages: ["English", "Telugu", "Hindi"],
  /**
   * Search-engine ownership tokens (the `content` value of the verification meta tag), set in Vercel as
   * VITE_GOOGLE_SITE_VERIFICATION / VITE_BING_SITE_VERIFICATION. Not needed if the domain is verified by DNS.
   */
  verification: {
    google: (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined)?.trim() || undefined,
    bing: (import.meta.env.VITE_BING_SITE_VERIFICATION as string | undefined)?.trim() || undefined,
  },
  schemes: ["Aarogyasri", "EHS (Employees Health Scheme, Telangana)"],
}

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path
  return SITE_URL + (path.startsWith("/") ? path : `/${path}`)
}
