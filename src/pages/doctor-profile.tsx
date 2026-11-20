import { Link, useParams } from "react-router-dom"
import { Clock, GraduationCap, Languages, Briefcase, BadgeCheck } from "lucide-react"
import { PageHeader } from "../components/page-header"
import { CtaBand } from "../components/cta-band"
import { FaqList } from "../components/faq-list"
import { JsonLd } from "../components/json-ld"
import { doctorBySlug, type Doctor } from "../data/doctors"
import type { Service } from "../data/services"
import { ADDRESS_LINE_1, ADDRESS_LINE_2, HOSPITAL_NAME, PHONE_DISPLAY } from "../data/contact"
import { INSURERS, SCHEMES } from "../data/insurance"
import { services, servicePath } from "../data/services"
import { physicianSchema } from "../seo/schema"
import NotFound from "./not-found"

/**
 * Questions patients search for ("Dr X timings", "how to book Dr X"), answered only from the
 * doctor's own data and the hospital's contact details: no new claims.
 */
function doctorFaqs(d: Doctor, treats: Service[]) {
  const faqs = [
    {
      question: `Where does ${d.name} consult?`,
      answer: `${d.name} consults at ${HOSPITAL_NAME}, ${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}${d.availability === "visiting" ? ", as a visiting consultant" : ""}.`,
    },
    {
      question: `What are ${d.name}'s OPD timings?`,
      answer: d.timings ? `${d.timings}. Please book ahead or call ${PHONE_DISPLAY} to confirm.` : `Call ${PHONE_DISPLAY} for ${d.name}'s current OPD timings.`,
    },
    {
      question: `How do I book an appointment with ${d.name}?`,
      answer: `Book online and choose ${d.name} on the booking form, call ${PHONE_DISPLAY}, or message us on WhatsApp. Our team calls you to confirm the time.`,
    },
  ]
  if (treats.length)
    faqs.push({
      question: `What does ${d.name} treat at ${HOSPITAL_NAME}?`,
      answer: `${d.name} (${d.specialization}) sees patients for ${treats.map((s) => s.name.toLowerCase()).join(", ")}.`,
    })
  faqs.push({
    question: "Are Aarogyasri, EHS and health insurance accepted?",
    answer: `Yes, for eligible treatment: ${SCHEMES.join(" and ")}, and cashless insurance with ${INSURERS.join(", ")}. Bring your card when you visit.`,
  })
  return faqs
}

export default function DoctorProfile() {
  const { slug } = useParams()
  const d = doctorBySlug(slug)
  if (!d) return <NotFound />
  const treats = services.filter((s) => s.doctors.includes(d.name))
  const facts = [
    { icon: GraduationCap, label: "Qualifications", value: d.qualifications },
    { icon: Briefcase, label: "Experience", value: d.experience },
    { icon: BadgeCheck, label: "Medical registration no.", value: d.registrationNumber },
    { icon: Clock, label: "OPD timings", value: d.timings },
    { icon: Languages, label: "Languages", value: d.languages?.join(", ") },
  ].filter((f) => f.value)

  return (
    <div>
      <PageHeader title={d.name} intro={<p className="text-primary font-semibold">{d.specialization}</p>} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start">
          <img src={d.image} alt={`${d.name}, ${d.specialization}`} width={280} height={320} className="w-full max-w-[280px] rounded-2xl bg-gradient-to-br from-blue-50 via-white to-cyan-50 object-contain" />
          <div>
            <p className="text-lg text-foreground/80 mb-6">{d.bio}</p>
            <dl className="space-y-4">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <dt className="flex items-center gap-3 text-sm text-foreground/75">
                    <Icon size={20} className="text-primary flex-shrink-0" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="pl-8 font-medium text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
            {treats.length > 0 && (
              <>
                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">Treats</h2>
                <ul className="flex flex-wrap gap-2">
                  {treats.map((s) => (
                    <li key={s.slug}>
                      <Link to={servicePath(s)} className="inline-block px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700 hover:bg-blue-100">{s.name}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        <FaqList faqs={doctorFaqs(d, treats)} heading={`Consulting ${d.name}`} />
        <CtaBand doctor={d.name} message={`Hello, I would like to book a consultation with ${d.name}.`} />
        <p className="text-sm"><Link to="/doctors" className="text-primary font-semibold hover:underline">See all doctors</Link></p>
      </div>
      <JsonLd data={physicianSchema(d)} />
    </div>
  )
}
