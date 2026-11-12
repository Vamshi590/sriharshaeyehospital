import { Link } from "react-router-dom"
import { PageHeader } from "../components/page-header"
import { CtaBand } from "../components/cta-band"
import { FaqList } from "../components/faq-list"
import { ADDRESS_LINE_1, ADDRESS_LINE_2, GOOGLE_MAPS_URL, OPENING_HOURS } from "../data/contact"

const bring = ["Your current spectacles or contact lenses (with their case)", "Previous eye reports, prescriptions and discharge summaries", "A list of the medicines you take, including eye drops", "Aarogyasri / EHS or insurance card, and Aadhaar", "Someone to accompany you, as dilating drops blur vision for a few hours"]
const steps = ["Registration at the front desk", "Vision and spectacle power test", "Eye pressure and preliminary tests", "Dilating drops if needed (about 20 to 45 minutes to work)", "Examination by the doctor and explanation of findings", "Tests or treatment plan, cost estimate and next appointment"]
const faqs = [
  { question: "How long will my first visit take?", answer: "Plan for 1 to 2 hours, especially if your eyes are dilated or tests such as OCT are needed." },
  { question: "Can I drive after my visit?", answer: "Not if your eyes are dilated; vision stays blurred and light-sensitive for a few hours." },
  { question: "Do I need to be fasting?", answer: "No, not for an eye check-up. For surgery, you'll get specific instructions in advance." },
]

export default function FirstVisitPage() {
  return (
    <div>
      <PageHeader title="Your First Visit" intro={<p>What to bring, what happens and how long it takes.</p>} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-10">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What to bring</h2>
          <ul className="list-disc pl-5 space-y-2 text-foreground/80">{bring.map((x) => <li key={x}>{x}</li>)}</ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What happens</h2>
          <ol className="list-decimal pl-5 space-y-2 text-foreground/80">{steps.map((x) => <li key={x}>{x}</li>)}</ol>
        </section>
        <section className="md:col-span-2 p-6 rounded-2xl bg-slate-50 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-3">Timings and location</h2>
          {OPENING_HOURS.map((h) => <p key={h.label} className="text-foreground/80">{h.label}: {h.display}</p>)}
          <p className="text-foreground/80 mt-2">{ADDRESS_LINE_1}, {ADDRESS_LINE_2}</p>
          <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-block py-1 text-primary font-semibold hover:underline">Get directions</a>
            <Link to="/contact" className="inline-block py-1 text-primary font-semibold hover:underline">Contact details</Link>
          </p>
        </section>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqList faqs={faqs} />
        <CtaBand />
      </div>
    </div>
  )
}
