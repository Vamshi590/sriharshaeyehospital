import { Link } from "react-router-dom"
import { PageHeader } from "../components/page-header"
import { CtaBand } from "../components/cta-band"
import { serviceBySlug } from "../data/services"

const phases = [
  { title: "Before surgery", items: ["Complete eye examination and A-scan biometry to calculate the lens power", "Choose your lens (IOL) with your surgeon and get a written estimate", "Routine blood tests and a check with your physician if you have diabetes or blood pressure", "Start any antibiotic drops as instructed; tell us about blood thinners you take", "Arrange for someone to accompany you on the day"] },
  { title: "On the day", items: ["Eat a light meal unless told otherwise; take your usual medicines unless advised", "Drops are put in to dilate the pupil and numb the eye", "The operation usually takes about 15 to 30 minutes", "You rest for a short time, receive your drops and go home with an eye shield"] },
  { title: "After surgery", items: ["Use the drops exactly as prescribed and wash your hands before putting them in", "Wear the eye shield while sleeping for the period your doctor advises", "Avoid rubbing the eye, head bath, swimming, cooking smoke and dust for the first weeks", "Attend follow-ups, usually the next day, after one week and after about one month", "New glasses, if needed, are prescribed once the eye has healed"] },
]

export default function CataractGuidePage() {
  const s = serviceBySlug("cataract-surgery")!
  return (
    <div>
      <PageHeader title="Before and After Cataract Surgery" intro={<p>A step-by-step guide for patients and families.</p>} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {phases.map((p) => (
            <section key={p.title} className="p-6 rounded-2xl border border-border bg-white">
              <h2 className="text-xl font-bold text-foreground mb-3">{p.title}</h2>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80 text-sm">{p.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </section>
          ))}
        </div>
        <section className="mt-10 p-6 rounded-2xl bg-red-50 border border-red-200">
          <h2 className="text-xl font-bold text-foreground mb-2">Call us immediately if you notice</h2>
          <p className="text-foreground/80">Increasing pain, worsening redness, a sudden drop in vision, or a curtain over your vision after surgery.</p>
        </section>
        <p className="mt-6 text-foreground/80">
          Read more about <Link to="/eye-care/cataract-surgery" className="text-primary font-semibold hover:underline">{s.name.toLowerCase()} and lens options</Link>.
        </p>
        <CtaBand service="Cataract Surgery" />
      </div>
    </div>
  )
}
