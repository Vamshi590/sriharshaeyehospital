import { PageHeader } from "../components/page-header"
import { CtaBand } from "../components/cta-band"
import { FaqList } from "../components/faq-list"
import { INSURERS, SCHEMES, TPAS } from "../data/insurance"
import { PHONE_DISPLAY } from "../data/contact"

const steps = [
  "Call us or tell the front desk your scheme or insurer when you book.",
  "Bring your Aarogyasri / EHS card or insurance card, Aadhaar and any referral or prescription.",
  "After your examination, our desk sends the pre-authorisation request to the scheme or insurer.",
  "Once it is approved, treatment goes ahead cashless; you pay only for items your policy doesn't cover.",
  "At discharge, sign the claim papers; our desk handles the submission.",
]

const faqs = [
  { question: "Is cataract surgery covered under Aarogyasri?", answer: "Eligible patients can have cataract surgery under Aarogyasri. Bring your card and Aadhaar; our desk confirms eligibility and handles the approval." },
  { question: "Do you accept EHS (Employees Health Scheme)?", answer: "Yes, for eligible Telangana government employees and pensioners. Bring your EHS card." },
  { question: "My insurer isn't listed. Can I still claim?", answer: `You may be able to pay and claim reimbursement from your insurer. Call ${PHONE_DISPLAY} and we'll tell you what documents you need.` },
  { question: "How long does cashless approval take?", answer: "It depends on the insurer, usually a few hours to a day. Booking early helps us finish the approval before your surgery date." },
]

export default function InsurancePage() {
  return (
    <div>
      <PageHeader title="Insurance and Government Schemes" intro={<p>Aarogyasri, EHS and cashless insurance for eligible treatment, checked by our desk before you start.</p>} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Government schemes", list: SCHEMES },
            { title: "Insurers (cashless)", list: INSURERS },
            { title: "TPAs", list: TPAS },
          ].map((g) => (
            <section key={g.title} className="p-6 rounded-2xl border border-border bg-white">
              <h2 className="font-bold text-lg text-foreground mb-3">{g.title}</h2>
              <ul className="space-y-1.5 text-foreground/80">{g.list.map((x) => <li key={x}>{x}</li>)}</ul>
            </section>
          ))}
        </div>
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">How cashless treatment works</h2>
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">{i + 1}</span>
                <span className="text-foreground/80 pt-1">{s}</span>
              </li>
            ))}
          </ol>
        </section>
        <FaqList faqs={faqs} />
        <CtaBand />
      </div>
    </div>
  )
}
