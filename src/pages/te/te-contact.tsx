import { Link } from "react-router-dom"
import { PageHeader } from "../../components/page-header"
import { TE } from "../../data/te"
import { EMAIL, GOOGLE_MAPS_URL, PHONE2_DISPLAY, PHONE2_TEL, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from "../../data/contact"

export default function TeContact() {
  return (
    <div lang="te">
      <PageHeader title={TE.contactTitle} intro={<p className="whitespace-nowrap">{TE.hospital}</p>} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-6">
        <section className="p-6 rounded-2xl border border-border">
          <h2 className="text-xl font-bold mb-3">ఫోన్ / వాట్సాప్</h2>
          <p><a href={`tel:${PHONE_TEL}`} className="text-primary font-semibold">{PHONE_DISPLAY}</a></p>
          <p><a href={`tel:${PHONE2_TEL}`} className="text-primary font-semibold">{PHONE2_DISPLAY}</a></p>
          <p className="mt-2"><a href={whatsappLink("నమస్కారం, అపాయింట్‌మెంట్ కావాలి.")} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold">{TE.whatsapp}</a></p>
          <p className="mt-2 text-foreground/70 break-all" lang="en">{EMAIL}</p>
        </section>
        <section className="p-6 rounded-2xl border border-border">
          <h2 className="text-xl font-bold mb-3">{TE.address}</h2>
          <p className="text-foreground/80">{TE.addressLine}</p>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-primary font-semibold">Google Maps</a>
        </section>
        <section className="p-6 rounded-2xl border border-border md:col-span-2">
          <h2 className="text-xl font-bold mb-3">{TE.hours}</h2>
          {TE.hoursLines.map((l) => <p key={l} className="text-foreground/80">{l}</p>)}
        </section>
        <p className="text-sm md:col-span-2" lang="en"><Link to="/contact" className="text-primary hover:underline">{TE.english}</Link></p>
      </div>
    </div>
  )
}
