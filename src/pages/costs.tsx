import { Link } from "react-router-dom"
import { PageHeader } from "../components/page-header"
import { CtaBand } from "../components/cta-band"
import { FaqList } from "../components/faq-list"
import { COST_NOTE, costs } from "../data/costs"
import { PHONE_DISPLAY } from "../data/contact"

const faqs = [
  { question: "How much does cataract surgery cost in Karimnagar?", answer: `It depends on the lens chosen (monofocal, toric or multifocal) and the tests your eyes need. Aarogyasri, EHS and insurance can cover eligible patients. Call ${PHONE_DISPLAY} for a written estimate after your check-up.` },
  { question: "Are the tests included in the surgery price?", answer: "Pre-operative tests and follow-up visits included in each package are explained in your written estimate before surgery." },
  { question: "Which payment methods do you accept?", answer: "Cash, UPI and cards, plus Aarogyasri, EHS and cashless insurance for eligible treatment." },
]

export default function CostsPage() {
  return (
    <div>
      <PageHeader title="Eye Treatment Costs" intro={<p>{COST_NOTE}</p>} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="overflow-x-auto rounded-xl border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60" tabIndex={0} role="region" aria-label="Treatment costs">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="p-4 font-semibold">Service</th>
                <th scope="col" className="p-4 font-semibold">What's included</th>
                <th scope="col" className="p-4 font-semibold whitespace-nowrap">Starting from</th>
              </tr>
            </thead>
            <tbody>
              {costs.map((c) => (
                <tr key={c.name} className="border-t border-border align-top">
                  <th scope="row" className="p-4 font-semibold text-foreground">
                    {c.service ? <Link to={`/eye-care/${c.service}`} className="inline-block py-1 text-primary underline-offset-2 hover:underline">{c.name}</Link> : c.name}
                  </th>
                  <td className="p-4 text-foreground/75">{c.includes}</td>
                  <td className="p-4 font-medium whitespace-nowrap">{c.from ?? "Call for current price"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-foreground/75">
          See <Link to="/patients/insurance" className="text-primary font-semibold hover:underline">insurance and government schemes</Link> for cashless options.
        </p>
        <FaqList faqs={faqs} />
        <CtaBand />
      </div>
    </div>
  )
}
