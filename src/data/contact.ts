export const HOSPITAL_NAME = "Sri Harsha Eye Hospital"

/** Primary number: shown first everywhere (site, Google Business Profile, ads). */
export const PHONE_DISPLAY = "+91 98850 29367"
export const PHONE_TEL = "+919885029367"
/** Second number, shown alongside the primary one. */
export const PHONE2_DISPLAY = "+91 79950 29367"
export const PHONE2_TEL = "+917995029367"
export const WHATSAPP_URL = "https://wa.me/919885029367"

export const EMAIL = "sriharshaeyehospital.nabh@gmail.com"

export const ADDRESS_LINE_1 = "Near Mancherial Chowrasta Circle, Ambedkar Nagar, Saraswathi Nagar"
export const ADDRESS_LINE_2 = "Karimnagar, Telangana 505001"

/** Structured address (keep in sync with the two display lines above). */
export const ADDRESS = {
  streetAddress: ADDRESS_LINE_1,
  addressLocality: "Karimnagar",
  addressRegion: "Telangana",
  postalCode: "505001",
  addressCountry: "IN",
} as const

/** Opening hours, used by the contact page and the structured data. 24-hour times. */
export const OPENING_HOURS = [
  { label: "Mon - Sat", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:00", display: "9 AM - 8 PM" },
  { label: "Sunday", days: ["Sunday"], opens: "10:00", closes: "14:30", display: "10 AM - 2:30 PM" },
] as const

/**
 * The hospital's Google Business Profile listing ("Sri Harsha eye hospital" on Google Maps), by its permanent
 * customer ID (from https://maps.app.goo.gl/f21o8fbWRNzzJaSj7). Opens the listing: reviews, photos, directions.
 */
export const GOOGLE_MAPS_URL = "https://www.google.com/maps?cid=193308467613233427"

/** Exact pin of the Google listing, used for the map embed and the structured data. */
export const GEO = { latitude: 18.4457047, longitude: 79.1332397 } as const

/** Opens WhatsApp (app or web) with a pre-filled message to the hospital. */
export function whatsappLink(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}
