import { useState } from "react"
import { MapPin } from "lucide-react"
import { GEO, GOOGLE_MAPS_URL, HOSPITAL_NAME } from "../data/contact"

/** Pinned at the exact coordinates of the Google listing (a text-address search can land on the wrong spot). */
const EMBED = `https://maps.google.com/maps?hl=en&q=${GEO.latitude},${GEO.longitude}&z=17&output=embed`

/** Loads Google Maps only when tapped, keeping ~500 KB of map scripts off the page load. */
export function MapEmbed() {
  const [open, setOpen] = useState(false)
  if (open)
    return (
      <iframe
        title={`${HOSPITAL_NAME} location`}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={EMBED}
        className="border-0"
      />
    )
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-blue-50 to-cyan-50">
      <MapPin size={40} className="text-primary" aria-hidden="true" />
      <div className="flex flex-col sm:flex-row gap-3">
        <button type="button" onClick={() => setOpen(true)} className="px-6 py-3 rounded-full bg-primary text-white font-semibold">
          Show map
        </button>
        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold text-center">
          Get directions
        </a>
      </div>
    </div>
  )
}
