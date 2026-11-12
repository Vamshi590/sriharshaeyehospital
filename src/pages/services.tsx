import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { PageHeader } from "../components/page-header"
import { ServiceIcon } from "../components/service-icon"
import { CtaBand } from "../components/cta-band"
import { services, servicePath } from "../data/services"

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        title="Eye Care Services"
        intro={
          <p>
            Eye care for every age at <span className="whitespace-nowrap">Sri Harsha Eye Hospital</span>, Karimnagar: from routine eye check-ups to cataract, retina and glaucoma treatment.
          </p>
        }
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={servicePath(s)}
                  className="group flex flex-col h-full p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
                >
                  <span className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <ServiceIcon name={s.icon} className="text-primary" />
                  </span>
                  <h2 className="font-semibold text-foreground mb-2 text-lg">{s.name}</h2>
                  <p className="text-sm text-foreground/65 mb-4 flex-1">{s.summary.split(". ")[0]}.</p>
                  <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm">
                    Symptoms, treatment and FAQs <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Why Patients Choose Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Modern Technology", description: "Diagnostic and surgical equipment including OCT imaging, visual fields, A-scan biometry and phacoemulsification." },
              { title: "Specialist Doctors", description: "Resident ophthalmologists plus visiting specialists for retina, cornea and oculoplasty." },
              { title: "Cover That Helps", description: "Aarogyasri, EHS and cashless insurance for eligible treatment, checked by our desk before you start." },
            ].map((item) => (
              <div key={item.title} className="p-8 bg-white rounded-2xl border border-border text-center">
                <h3 className="font-semibold text-lg text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/75">{item.description}</p>
              </div>
            ))}
          </div>
          <CtaBand />
        </div>
      </section>
    </div>
  )
}
