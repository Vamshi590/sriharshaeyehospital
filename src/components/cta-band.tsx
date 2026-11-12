import { Link } from "react-router-dom"
import { Phone, MessageCircle } from "lucide-react"
import { PHONE_DISPLAY, PHONE_TEL, whatsappLink } from "../data/contact"

export function CtaBand({ service, doctor, message = "Hello, I would like to book an eye appointment." }: { service?: string; doctor?: string; message?: string }) {
  const params = new URLSearchParams()
  if (service) params.set("service", service)
  if (doctor) params.set("doctor", doctor)
  const q = params.toString()
  return (
    <section className="my-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-700 text-white p-8 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Book a consultation</h2>
      <p className="text-white/90 mb-6">Book online, call {PHONE_DISPLAY} or message us on WhatsApp. We confirm within 24 hours.</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to={`/appointment${q ? `?${q}` : ""}`} className="text-center px-6 py-3 rounded-full bg-white text-blue-700 font-semibold">Book an Appointment</Link>
        <a href={`tel:${PHONE_TEL}`} className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-white/70 font-semibold">
          <Phone size={18} aria-hidden="true" /> Call {PHONE_DISPLAY}
        </a>
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-white/70 font-semibold">
          <MessageCircle size={18} aria-hidden="true" /> WhatsApp
        </a>
      </div>
    </section>
  )
}
