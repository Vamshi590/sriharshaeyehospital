import { Link } from "react-router-dom"
import { Mail, Phone, MapPin } from "lucide-react"
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  EMAIL,
  HOSPITAL_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "../data/contact"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Book Appointment", href: "/appointment" },
  { label: "Contact", href: "/contact" },
]

const footerServices = ["Cataract Surgery", "Pediatric Eye Care", "Retina Care", "Glaucoma Treatment"]

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">{HOSPITAL_NAME}</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Providing compassionate, precise, and excellent eye care services with state-of-the-art technology and
              experienced specialists.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-white/70 hover:text-sky-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerServices.map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-sm text-white/70 hover:text-sky-300 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a href={`tel:${PHONE_TEL}`} className="flex items-start gap-2 group">
                <Phone size={16} className="text-sky-300 mt-1 flex-shrink-0" />
                <span className="text-sm text-white/70 group-hover:text-sky-300 transition-colors">{PHONE_DISPLAY}</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-start gap-2 group">
                <Mail size={16} className="text-sky-300 mt-1 flex-shrink-0" />
                <span className="text-sm text-white/70 group-hover:text-sky-300 transition-colors break-all">{EMAIL}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-sky-300 mt-1 flex-shrink-0" />
                <span className="text-sm text-white/70">
                  {ADDRESS_LINE_1}, {ADDRESS_LINE_2}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 my-8"></div>

        <p className="text-sm text-white/60 text-center md:text-left">
          © {new Date().getFullYear()} {HOSPITAL_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
