import { Link } from "react-router-dom"
import { Phone, MessageCircle, CalendarCheck } from "lucide-react"
import { PHONE_TEL, whatsappLink } from "../data/contact"

/** Sticky Call / WhatsApp / Book bar on phones (most ad traffic is mobile). */
export function ActionBar({ message = "Hello, I would like to book an eye appointment.", bookTo = "/appointment" }: { message?: string; bookTo?: string }) {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
      <nav aria-label="Quick contact" className="grid grid-cols-3 text-sm font-semibold">
        <a href={`tel:${PHONE_TEL}`} className="flex flex-col items-center gap-1 py-2.5 text-blue-700">
          <Phone size={20} aria-hidden="true" /> Call
        </a>
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-2.5 text-emerald-700">
          <MessageCircle size={20} aria-hidden="true" /> WhatsApp
        </a>
        {bookTo.startsWith("#") ? (
          <a href={bookTo} className="flex flex-col items-center gap-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-700 text-white">
            <CalendarCheck size={20} aria-hidden="true" /> Book
          </a>
        ) : (
          <Link to={bookTo} className="flex flex-col items-center gap-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-700 text-white">
            <CalendarCheck size={20} aria-hidden="true" /> Book
          </Link>
        )}
      </nav>
    </div>
  )
}
