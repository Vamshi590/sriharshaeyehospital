import { Link } from "react-router-dom"
import { Mail, Phone, MapPin } from "lucide-react"
import { services, servicePath } from "../data/services"
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  EMAIL,
  HOSPITAL_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
  PHONE2_DISPLAY,
  PHONE2_TEL,
} from "../data/contact"

const quickLinks = [
  { label: "Eye Care", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Costs", href: "/patients/costs" },
  { label: "Insurance & Schemes", href: "/patients/insurance" },
  { label: "Your First Visit", href: "/patients/first-visit" },
  { label: "Health Library", href: "/health-library" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Book Appointment", href: "/appointment" },
  { label: "Contact", href: "/contact" },
  { label: "తెలుగు", href: "/te" },
]

const footerServices = services.filter((s) => s.slug !== "eye-emergencies").slice(0, 8)

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Extra bottom padding on phones so the fixed ActionBar never covers the footer. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 mb-8">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold text-lg mb-4 whitespace-nowrap">{HOSPITAL_NAME}</p>
            <p className="text-sm text-white/70 leading-relaxed">
              NABH-accredited eye hospital in Karimnagar, Telangana, for cataract, retina, glaucoma, cornea and children's eye care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-semibold mb-4">Quick Links</p>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="inline-block py-1 text-sm text-white/75 hover:text-sky-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-semibold mb-4">Services</p>
            <ul className="space-y-1">
              {footerServices.map((service) => (
                <li key={service.slug}>
                  <Link to={servicePath(service)} className="inline-block py-1 text-sm text-white/75 hover:text-sky-300 transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold mb-4">Contact</p>
            <div className="space-y-3">
              <a href={`tel:${PHONE_TEL}`} className="flex items-start gap-2 py-1 group">
                <Phone size={16} className="text-sky-300 mt-1 flex-shrink-0" />
                <span className="text-sm text-white/70 group-hover:text-sky-300 transition-colors">{PHONE_DISPLAY}</span>
              </a>
              <a href={`tel:${PHONE2_TEL}`} className="flex items-start gap-2 py-1 group">
                <Phone size={16} className="text-sky-300 mt-1 flex-shrink-0" />
                <span className="text-sm text-white/70 group-hover:text-sky-300 transition-colors">{PHONE2_DISPLAY}</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-start gap-2 py-1 group">
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

        <p className="text-sm text-white/70 text-center md:text-left">
          © {new Date().getFullYear()} {HOSPITAL_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
