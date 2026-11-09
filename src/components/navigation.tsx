import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import logo from "../assets/eye_image.webp"
import { HOSPITAL_NAME } from "../data/contact"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact Us", href: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-r from-blue-50 via-white to-cyan-50 border-b border-white/30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={close} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src={logo} alt="" />
            </div>
            <span className="font-bold text-lg text-gray-900">{HOSPITAL_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 hover:text-blue-500 ${
                    isActive ? "text-blue-600" : "text-gray-700"
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
              className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === "/"}
                onClick={close}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:text-blue-500 hover:bg-white/30 ${
                    isActive ? "text-blue-600" : "text-gray-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/appointment"
              onClick={close}
              className="block w-full text-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm hover:shadow-lg transition-all mt-4"
            >
              Book Appointment
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
