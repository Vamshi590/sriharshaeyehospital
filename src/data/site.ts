/**
 * Site-wide facts used for SEO metadata and structured data.
 * Optional fields stay `undefined` until the hospital confirms them; nothing
 * unconfirmed is ever rendered or put into structured data.
 */
const envUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim()

/** Public origin of the live site, without a trailing slash. Set VITE_SITE_URL in Vercel. */
export const SITE_URL = (envUrl || "https://sriharshaeyehospital.vercel.app").replace(/\/+$/, "")

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
  schemes: ["Aarogyasri", "EHS (Employees Health Scheme, Telangana)"],
}

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path
  return SITE_URL + (path.startsWith("/") ? path : `/${path}`)
}
