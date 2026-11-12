import { Link, useParams } from "react-router-dom"
import { CheckCircle2 } from "lucide-react"
import { PageHeader } from "../../components/page-header"
import { FaqList } from "../../components/faq-list"
import { TE, teServiceBySlug } from "../../data/te"
import { PHONE_DISPLAY, PHONE_TEL } from "../../data/contact"
import NotFound from "../not-found"

export default function TeService() {
  const { slug } = useParams()
  const s = teServiceBySlug(slug)
  if (!s) return <NotFound />
  return (
    <div lang="te">
      <PageHeader title={s.name} intro={<p>{s.summary}</p>} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">{TE.symptoms}</h2>
          <ul className="space-y-2">
            {s.symptoms.map((x) => (
              <li key={x} className="flex gap-2 text-foreground/80">
                <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" aria-hidden="true" /> {x}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-10 p-6 rounded-2xl bg-amber-50 border border-amber-200">
          <h2 className="text-2xl font-bold text-foreground mb-3">{TE.whenToSee}</h2>
          <p className="text-foreground/80">{s.whenToSee}</p>
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">{TE.treatments}</h2>
          <ul className="list-disc pl-5 space-y-2 text-foreground/80">{s.treatments.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="mt-4 text-foreground/70">{TE.schemes}</p>
        </section>
        <FaqList faqs={s.faqs} heading={TE.faq} />
        <div className="flex flex-col sm:flex-row gap-3 my-8">
          <Link to="/appointment" className="text-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-700 text-white font-medium">{TE.book}</Link>
          <a href={`tel:${PHONE_TEL}`} className="text-center px-6 py-3 rounded-full border-2 border-blue-200 text-blue-700 font-medium">{TE.call} {PHONE_DISPLAY}</a>
        </div>
        <p className="text-sm" lang="en"><Link to={s.en} className="text-primary hover:underline">{TE.english}</Link></p>
      </div>
    </div>
  )
}
