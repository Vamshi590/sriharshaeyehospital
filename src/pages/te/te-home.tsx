import { Link } from "react-router-dom"
import { Phone, MessageCircle, ArrowRight } from "lucide-react"
import { TE, teServices, tePath } from "../../data/te"
import { PHONE_DISPLAY, PHONE_TEL, whatsappLink } from "../../data/contact"
import eye from "../../assets/eye.webp"

export default function TeHome() {
  return (
    <div lang="te">
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <p className="text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">{TE.hospital}</p>
            <h1 className="text-xl md:text-2xl font-semibold text-blue-700">{TE.tagline}</h1>
            <p className="text-gray-700 leading-relaxed border-l-4 border-blue-500 pl-4 max-w-lg">{TE.intro}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/appointment" className="text-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-700 text-white font-medium">{TE.book}</Link>
              <a href={`tel:${PHONE_TEL}`} className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-blue-200 text-blue-700 font-medium">
                <Phone size={18} aria-hidden="true" /> {TE.call} {PHONE_DISPLAY}
              </a>
              <a href={whatsappLink("నమస్కారం, కంటి పరీక్ష కోసం అపాయింట్‌మెంట్ కావాలి.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-emerald-200 text-emerald-700 font-medium">
                <MessageCircle size={18} aria-hidden="true" /> {TE.whatsapp}
              </a>
            </div>
          </div>
          <img src={eye} alt="మానవ కంటి చిత్రం" width={732} height={604} className="w-full max-w-sm mx-auto drop-shadow-2xl" />
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{TE.services}</h2>
        <ul className="grid sm:grid-cols-3 gap-4">
          {teServices.map((s) => (
            <li key={s.slug}>
              <Link to={tePath(s)} className="flex items-center justify-between gap-2 p-5 h-full rounded-xl border border-border hover:border-primary/40 bg-white">
                <span className="font-semibold text-foreground">{s.name}</span>
                <ArrowRight size={18} className="text-primary flex-shrink-0" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <section className="p-6 rounded-2xl bg-slate-50 border border-border">
            <h2 className="text-xl font-bold mb-2">{TE.hours}</h2>
            {TE.hoursLines.map((l) => <p key={l} className="text-foreground/80">{l}</p>)}
          </section>
          <section className="p-6 rounded-2xl bg-slate-50 border border-border">
            <h2 className="text-xl font-bold mb-2">{TE.address}</h2>
            <p className="text-foreground/80">{TE.addressLine}</p>
            <Link to="/te/contact" className="inline-block mt-2 text-primary font-semibold">{TE.contactTitle}</Link>
          </section>
        </div>
        <p className="mt-8 text-sm" lang="en"><Link to="/" className="text-primary hover:underline">{TE.english}</Link></p>
      </section>
    </div>
  )
}
