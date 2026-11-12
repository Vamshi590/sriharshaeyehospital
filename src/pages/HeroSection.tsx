import { Link } from "react-router-dom"
import { Phone, MessageCircle, ShieldCheck, Award, CalendarDays } from "lucide-react"
import eye from "../assets/eye.webp"
import { PHONE_TEL, whatsappLink } from "../data/contact"

/**
 * Deterministic pseudo-random numbers so the prerendered HTML and the browser
 * produce identical particles (Math.random would cause hydration mismatches).
 */
function seeded(seed: number) {
  let t = seed
  return () => {
    t = (t * 9301 + 49297) % 233280
    return t / 233280
  }
}
const rand = seeded(42)
const particles = Array.from({ length: 20 }, () => ({
  left: `${(rand() * 100).toFixed(2)}%`,
  top: `${(rand() * 100).toFixed(2)}%`,
  duration: `${(4 + rand() * 4).toFixed(2)}s`,
  delay: `${(rand() * 2).toFixed(2)}s`,
}))

const trustChips = [
  { icon: ShieldCheck, label: "NABH accredited" },
  { icon: Award, label: "20,000+ cataract surgeries by Dr. Srilatha CH" },
  { icon: CalendarDays, label: "Open 7 days" },
]

export default function HeroSection() {
  return (
    <section
      className="relative w-full lg:h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="absolute inset-0">
          {particles.map((p, i) => (
            <div
              key={i}
              className="hero-particle absolute w-1 h-1 bg-blue-300 rounded-full opacity-30"
              style={{
                left: p.left,
                top: p.top,
                animation: `float ${p.duration} ease-in-out infinite`,
                animationDelay: p.delay,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-100/60 border border-blue-200/60 backdrop-blur-sm">
            <h1 className="text-sm font-medium text-blue-700">NABH-Accredited Eye Hospital in Karimnagar</h1>
          </div>

          <p className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            We don't just treat eyes—
            <span className="bg-gradient-to-r from-blue-600 to-cyan-700 bg-clip-text text-transparent">
              {" "}
              we restore sight
            </span>
          </p>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-lg border-l-4 border-blue-500 pl-4">
            Cataract, retina, glaucoma, cornea and children's eye care at{" "}
            <span className="whitespace-nowrap">Sri Harsha Eye Hospital</span>, Karimnagar.
            Aarogyasri, EHS and cashless insurance accepted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/appointment" className="text-center px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all motion-safe:hover:scale-105 duration-300">
              Book an Appointment
            </Link>
            <Link to="/services" className="px-8 py-3.5 rounded-full border-2 border-blue-200 text-blue-700 font-medium hover:bg-blue-50 transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-300/30">
              Explore Treatments
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>

          {/* Quick contact for phone visitors (most ad traffic is mobile) */}
          <div className="flex gap-3 md:hidden">
            <a href={`tel:${PHONE_TEL}`} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border-2 border-blue-200 text-blue-700 font-medium bg-white/70">
              <Phone size={16} aria-hidden="true" /> Call
            </a>
            <a
              href={whatsappLink("Hello, I would like to book an eye appointment.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border-2 border-emerald-200 text-emerald-700 font-medium bg-white/70"
            >
              <MessageCircle size={16} aria-hidden="true" /> WhatsApp
            </a>
          </div>

          <ul className="flex flex-wrap gap-2 pt-2" aria-label="Why patients choose us">
            {trustChips.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-blue-100 text-xs font-medium text-gray-700">
                <Icon size={14} className="text-blue-500" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content - 3D Eye Model Area */}
        <div className="relative h-72 sm:h-96 md:h-full flex items-center justify-center">
          <div
            className="relative w-full max-w-72 sm:max-w-96 aspect-square"
            style={{
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl motion-safe:animate-pulse"></div>

            {/* Eye Image */}
            <img
              src={eye}
              alt="Illustration of a human eye"
              width={732}
              height={604}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-contain drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 rounded-full border-2 border-blue-400 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-blue-400 rounded-full motion-safe:animate-bounce"></div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-blob, .animate-float, .animate-fade-in, .hero-particle { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
