import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import logo from "../assets/eye_image.webp"
import { HOSPITAL_NAME } from "../data/contact"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Eye Care", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Patients", href: "/patients" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "తెలుగు", href: "/te", lang: "te" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const { pathname } = useLocation()

  // Close the mobile menu on navigation (incl. back/forward) and with the Escape key.
  useEffect(() => setIsOpen(false), [pathname])
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  return (
    <nav aria-label="Main" className="fixed top-0 w-full z-50">
      <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-r from-blue-50/95 via-white/95 to-cyan-50/95 border-b border-slate-200/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={close} className="flex items-center gap-2 min-w-0" aria-label={`${HOSPITAL_NAME}, home`}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src={logo} alt="" width={32} height={32} />
            </div>
            <span className="font-bold text-base sm:text-lg text-gray-900 whitespace-nowrap">{HOSPITAL_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === "/" || link.href === "/te"}
                lang={link.lang}
                className={({ isActive }) =>
                  `px-2 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:text-blue-700 hover:bg-white/60 ${
                    isActive ? "text-blue-700" : "text-gray-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/appointment"
              className="inline-block whitespace-nowrap px-5 lg:px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-700 text-white font-medium text-sm hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="md:hidden -mr-2 p-2.5 rounded-lg text-gray-900 hover:bg-white/40 transition-colors"
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden pb-4 pt-1 space-y-1 max-h-[calc(100dvh-4rem)] overflow-y-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === "/" || link.href === "/te"}
                lang={link.lang}
                onClick={close}
                className={({ isActive }) =>
                  `block px-4 py-3 text-base font-medium rounded-lg transition-colors hover:text-blue-700 hover:bg-white/60 ${
                    isActive ? "text-blue-700 bg-white/70" : "text-gray-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/appointment"
              onClick={close}
              className="block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-700 text-white font-semibold text-base hover:shadow-lg transition-all mt-3"
            >
              Book Appointment
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
