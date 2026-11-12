import { Navigation } from "lucide-react"
import { GEO, GOOGLE_MAPS_URL, HOSPITAL_NAME } from "../data/contact"

/**
 * Searches the listing's name centred on its exact coordinates, so Google shows the labelled
 * "Sri Harsha eye hospital" pin (a bare coordinate pin has no name; a bare address search can land elsewhere).
 */
const EMBED = `https://maps.google.com/maps?hl=en&q=${encodeURIComponent("Sri Harsha eye hospital, Karimnagar")}&ll=${GEO.latitude},${GEO.longitude}&z=17&output=embed`

/**
 * Google Map of the hospital, shown directly. `loading="lazy"` lets the browser fetch the map
 * (~500 KB of Google scripts) only when the visitor scrolls near it, so the page still loads fast.
 */
export function MapEmbed() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50">
      <iframe
        title={`${HOSPITAL_NAME} location`}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={EMBED}
        className="absolute inset-0 w-full h-full border-0"
      />
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-primary font-semibold shadow-lg border border-border hover:bg-blue-50"
      >
        <Navigation size={16} aria-hidden="true" /> Get directions
      </a>
    </div>
  )
}
