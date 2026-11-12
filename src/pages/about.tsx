import { Link } from "react-router-dom"
import { ShieldCheck, Microscope, Users, HeartHandshake } from "lucide-react"
import { PageHeader } from "../components/page-header"
import { CtaBand } from "../components/cta-band"
import { SITE } from "../data/site"
import { EQUIPMENT } from "../data/equipment"
import { doctors, doctorPath } from "../data/doctors"
import { services, servicePath } from "../data/services"
import { ADDRESS_LINE_1, ADDRESS_LINE_2, HOSPITAL_NAME } from "../data/contact"
import hospital from "../assets/infra5.webp"

export default function AboutPage() {
  const facts = [
    `${HOSPITAL_NAME} is an eye hospital in Karimnagar, Telangana, accredited by ${SITE.accreditation}.`,
    SITE.foundingYear ? `Serving patients since ${SITE.foundingYear}.` : null,
    SITE.nabhCertificate ? `NABH certificate no. ${SITE.nabhCertificate}.` : null,
    `Address: ${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}.`,
    `Treatments: ${services.map((s) => s.short.toLowerCase()).join(", ")}.`,
    `Accepts ${SITE.schemes.join(" and ")}, and cashless insurance.`,
    `Languages spoken: ${SITE.languages.join(", ")}.`,
  ].filter(Boolean) as string[]

  return (
    <div>
      <PageHeader title={<>About <span className="whitespace-nowrap">Sri Harsha Eye Hospital</span></>} intro={<p>{SITE.shortDescription}</p>} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <section aria-labelledby="facts">
            <h2 id="facts" className="text-2xl font-bold text-foreground mb-4">At a glance</h2>
            <ul className="space-y-3">
              {facts.map((f) => (
                <li key={f} className="flex gap-3 text-foreground/80">
                  <ShieldCheck size={20} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </section>
          <img src={hospital} alt="Sri Harsha Eye Hospital building in Karimnagar" width={579} height={768} loading="lazy" decoding="async" className="w-full max-h-[480px] object-cover rounded-2xl" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {[
            { icon: ShieldCheck, title: "Quality and safety", text: "NABH accreditation means the hospital follows national standards for patient safety, infection control and quality of care." },
            { icon: Users, title: "Our team", text: "Resident ophthalmologists and visiting specialists for retina, cornea and oculoplasty, supported by optometrists and nursing staff." },
            { icon: HeartHandshake, title: "Community eye camps", text: "Regular eye screening camps and awareness sessions in and around Karimnagar." },
          ].map(({ icon: Icon, title, text }) => (
            <section key={title} className="p-6 rounded-2xl border border-border bg-white">
              <Icon size={26} className="text-primary mb-3" aria-hidden="true" />
              <h2 className="text-lg font-bold text-foreground mb-2">{title}</h2>
              <p className="text-foreground/70 text-sm">{text}</p>
            </section>
          ))}
        </div>

        <section className="mt-14" aria-labelledby="equipment">
          <h2 id="equipment" className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Microscope size={22} className="text-primary" aria-hidden="true" /> Equipment
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EQUIPMENT.map((e) => (
              <li key={e.name} className="p-4 rounded-lg bg-slate-50 border border-border">
                <span className="block font-semibold text-foreground">{e.name}</span>
                <span className="text-sm text-foreground/65">{e.use}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="team">
          <h2 id="team" className="text-2xl font-bold text-foreground mb-4">Doctors</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {doctors.map((d) => (
              <li key={d.name}>
                <Link to={doctorPath(d)} className="block p-4 rounded-lg border border-border hover:border-primary/40">
                  <span className="block font-semibold text-foreground">{d.name}</span>
                  <span className="text-sm text-primary">{d.specialization}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-foreground/80">
          See photos of our facilities and eye camps in the <Link to="/gallery" className="text-primary font-semibold hover:underline">gallery</Link>, or browse{" "}
          <Link to={servicePath(services[0])} className="text-primary font-semibold hover:underline">our eye care services</Link>.
        </p>
        <CtaBand />
      </div>
    </div>
  )
}
