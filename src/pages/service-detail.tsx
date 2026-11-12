import { Link, useParams } from "react-router-dom"
import { CheckCircle2, AlertTriangle, Clock, ShieldCheck, ArrowRight } from "lucide-react"
import { PageHeader } from "../components/page-header"
import { FaqList } from "../components/faq-list"
import { CtaBand } from "../components/cta-band"
import { JsonLd } from "../components/json-ld"
import { ServiceIcon } from "../components/service-icon"
import { serviceBySlug, services, servicePath } from "../data/services"
import { doctorByName, doctorPath } from "../data/doctors"
import { BOOKING_SERVICE } from "../data/booking"
import { SITE } from "../data/site"
import { servicePageSchema } from "../seo/schema"
import NotFound from "./not-found"

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = serviceBySlug(slug)
  if (!s) return <NotFound />
  const docs = s.doctors.map(doctorByName).filter((d) => d !== undefined)
  const related = services.filter((x) => x.slug !== s.slug).slice(0, 4)

  return (
    <div>
      <PageHeader title={s.name} intro={<p>{s.summary}</p>}>
        {SITE.review && (
          <p className="mt-4 text-sm text-foreground/75">
            Medically reviewed by {SITE.review.by} on {SITE.review.date}
          </p>
        )}
      </PageHeader>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <section aria-labelledby="symptoms">
            <h2 id="symptoms" className="text-2xl font-bold text-foreground mb-4">Symptoms</h2>
            <ul className="space-y-2">
              {s.symptoms.map((x) => (
                <li key={x} className="flex gap-2 text-foreground/80">
                  <CheckCircle2 size={18} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="when" className="p-6 rounded-2xl bg-amber-50 border border-amber-200 h-fit">
            <h2 id="when" className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle size={22} className="text-amber-600" aria-hidden="true" /> When to see a doctor
            </h2>
            <p className="text-foreground/80">{s.whenToSee}</p>
          </section>
        </div>

        <section className="mt-12" aria-labelledby="diagnosis">
          <h2 id="diagnosis" className="text-2xl font-bold text-foreground mb-4">How we diagnose it</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {s.diagnosis.map((x) => (
              <li key={x} className="p-4 rounded-lg bg-slate-50 border border-border text-foreground/80">{x}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="treatment">
          <h2 id="treatment" className="text-2xl font-bold text-foreground mb-4">Treatment options</h2>
          <div className="overflow-x-auto rounded-xl border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60" tabIndex={0} role="region" aria-labelledby="treatment">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-foreground">
                <tr>
                  <th scope="col" className="p-4 font-semibold">Option</th>
                  <th scope="col" className="p-4 font-semibold">What it is</th>
                  <th scope="col" className="p-4 font-semibold">Usually suits</th>
                </tr>
              </thead>
              <tbody>
                {s.treatments.map((t) => (
                  <tr key={t.name} className="border-t border-border align-top">
                    <th scope="row" className="p-4 font-semibold text-foreground">{t.name}</th>
                    <td className="p-4 text-foreground/75">{t.what}</td>
                    <td className="p-4 text-foreground/75">{t.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-foreground/75">Your doctor recommends treatment after examining your eyes.</p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <section aria-labelledby="dayof">
            <h2 id="dayof" className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock size={22} className="text-primary" aria-hidden="true" /> What to expect
            </h2>
            <ul className="space-y-2 list-disc pl-5 text-foreground/80">
              {s.dayOf.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </section>
          <section aria-labelledby="recovery">
            <h2 id="recovery" className="text-2xl font-bold text-foreground mb-4">Recovery and follow-up</h2>
            <ul className="space-y-2 list-disc pl-5 text-foreground/80">
              {s.recovery.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </section>
        </div>

        <section className="mt-12 p-6 rounded-2xl border border-border bg-white" aria-labelledby="cover">
          <h2 id="cover" className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
            <ShieldCheck size={22} className="text-accent" aria-hidden="true" /> Cost and cover
          </h2>
          <p className="text-foreground/80">
            Aarogyasri, EHS and cashless insurance can cover eligible treatment.{" "}
            <Link to="/patients/costs" className="text-primary font-semibold hover:underline">See what's included and prices</Link>{" "}
            or{" "}
            <Link to="/patients/insurance" className="text-primary font-semibold hover:underline">how cashless cover works</Link>.
          </p>
        </section>

        {docs.length > 0 && (
          <section className="mt-12" aria-labelledby="doctors">
            <h2 id="doctors" className="text-2xl font-bold text-foreground mb-4">Who treats it</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {docs.map((d) => (
                <Link key={d.name} to={doctorPath(d)} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/40 bg-white">
                  <img src={d.image} alt={`${d.name}, ${d.specialization}`} width={64} height={64} loading="lazy" decoding="async" className="w-16 h-16 rounded-full object-cover bg-slate-100" />
                  <span>
                    <span className="block font-semibold text-foreground">{d.name}</span>
                    <span className="block text-sm text-primary">{d.specialization}</span>
                    {d.timings && <span className="block text-xs text-foreground/75 mt-1">{d.timings}</span>}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <FaqList faqs={s.faqs} />

        <CtaBand service={BOOKING_SERVICE[s.slug]} doctor={docs.find((d) => d.availability !== "visiting")?.name} message={`Hello, I would like to consult about ${s.name.toLowerCase()}.`} />

        <section aria-labelledby="related">
          <h2 id="related" className="text-xl font-bold text-foreground mb-4">Other eye care</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {related.map((r) => (
              <Link key={r.slug} to={servicePath(r)} className="flex items-center gap-2 p-4 rounded-lg border border-border hover:border-primary/40 text-foreground">
                <ServiceIcon name={r.icon} size={18} className="text-primary" />
                <span className="flex-1">{r.short}</span>
                <ArrowRight size={16} className="text-foreground/40" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </div>
      <JsonLd data={servicePageSchema(s)} />
    </div>
  )
}
