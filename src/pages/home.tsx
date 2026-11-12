import { Link } from "react-router-dom"
import aboutDoctor from "../assets/doctor 2.webp"
import infra1 from "../assets/infra1.webp"
import infra2 from "../assets/infra2.webp"
import infra3 from "../assets/infra3.webp"
import infra4 from "../assets/infra4.webp"
import infra5 from "../assets/infra5.webp"
import infra6 from "../assets/infra6.webp"
import {
  Zap,
  Heart,
  Users,
  Award,
  ArrowRight,
  Microscope,
  Shield,
  Stethoscope,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import HeroSection from "./HeroSection"
import { InsuranceMarquee } from "../components/insurance-marquee"
import { JsonLd } from "../components/json-ld"
import { homeFaqs } from "../data/faqs"
import { GOOGLE_MAPS_URL } from "../data/contact"
import { faqSchema } from "../seo/schema"
import { PhotoCarousel } from "../components/photo-carousel"
import { bookingLink, doctorPath, doctors as allDoctors } from "../data/doctors"
import { services as allServices, servicePath } from "../data/services"
import { ServiceIcon } from "../components/service-icon"
import { SITE } from "../data/site"

export default function Home() {
  const featuredSlugs = ["cataract-surgery", "diabetic-retinopathy", "glaucoma", "childrens-eye-care", "retina-vitreous", "cornea", "oculoplasty", "eye-check-up"]
  const featuredServices = featuredSlugs.map((slug) => allServices.find((s) => s.slug === slug)!).filter(Boolean)
  const doctors = allDoctors.filter((doctor) => doctor.featured)

  const technologies = [
    { title: "OFI", description: "Precision laser vision correction" },
    { title: "OCT Imaging", description: "Advanced retinal diagnostics" },
    { title: "Phacoemulsification", description: "Minimally invasive cataract surgery" },
    { title: "Vitrectomy Equipment", description: "Advanced retinal surgery tools" },
    { title: "A-Scan Biometry", description: "Accurate lens power calculation before cataract surgery" },
    { title : "Pediatric Retina Checkup", description : "Gentle, compassionate care for children"},
    { title: "Visual Fields", description: "Side-vision testing for glaucoma and optic nerve disease" },
    {title : "Fundus Fluorescein Angiography", description : "Advanced Retinal Diseases Care"}
  ]


  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      <InsuranceMarquee />

      {/* Services Preview */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">Our Services</h2>
            <p className="text-lg text-foreground/75 max-w-2xl mx-auto">
              Comprehensive eye care solutions tailored to your needs
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {featuredServices.map((service) => (
              <li key={service.slug}>
                <Link
                  to={servicePath(service)}
                  className="group h-full flex md:flex-col items-center md:items-start gap-4 p-4 md:p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl md:rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg motion-safe:md:hover:-translate-y-1"
                >
                  <span className="w-11 h-11 md:w-12 md:h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ServiceIcon name={service.icon} className="text-primary" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-foreground md:mb-2">{service.name}</span>
                    <span className="text-sm text-foreground/75 line-clamp-2 md:line-clamp-3">{service.summary.split(". ")[0]}.</span>
                  </span>
                  <ChevronRight size={18} className="md:hidden flex-shrink-0 text-foreground/50" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="text-center mt-8 md:mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 py-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All Services <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">About <span className="whitespace-nowrap">Sri Harsha Eye Hospital</span></h2>
              <p className="mb-4 text-foreground/75 leading-relaxed">
                <span className="whitespace-nowrap">Sri Harsha Eye Hospital</span> is a NABH-accredited eye hospital near Mancherial Chowrasta,
                Karimnagar, Telangana. {SITE.shortDescription.replace(/^NABH-accredited eye hospital in Karimnagar, Telangana, offering /, "It offers ")} Aarogyasri, EHS and cashless
                insurance are accepted.{" "}
                <Link to="/about" className="text-primary font-semibold hover:underline">More about us</Link>
              </p>
              <div className="space-y-2 -mx-4">
                {[
                  {
                    icon: Heart,
                    title: "Patient-Centered Care",
                    desc: "Every patient is treated with compassion, dignity, and respect, with comfortable waiting lounges, minimal waiting time, and hassle-free appointment systems.",
                  },
                  {
                    icon: Microscope,
                    title: "Advanced Diagnostics",
                    desc: "Equipped with the latest ophthalmic diagnostic technologies for accurate and early detection.",
                  },
                  { icon: Shield, title: "Accreditations & Quality Standards", desc: "NABH Fully accredited eye care hospital adhering to strict quality and safety norms. Continuous participation in healthcare improvement and accreditation programs" },
                  {
                    icon: Stethoscope,
                    title: "About the Doctor",
                    desc: "Led by Dr. Srilatha Chintala, an experienced ophthalmologist with over 20+ years of clinical and surgical expertise.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="flex gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors">
                      <div className="flex-shrink-0">
                        <Icon className="text-primary" size={24} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-foreground/75">{item.desc}</p>
                        {item.title === "About the Doctor" && (
                          <p className="text-sm font-semibold">MBBS, MS (Ophth), FICLEP (LVPEI), FICO (UK)</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right: Doctor Image */}
            <div className="relative h-80 sm:h-96 lg:h-[600px] lg:-top-8 flex items-end lg:items-center justify-center">

              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={aboutDoctor}
                  alt="Dr. Srilatha CH, cataract and refractive surgeon"
                  width={800}
                  height={966}
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 max-h-full w-auto object-contain"
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-gradient-to-br from-primary/5 to-[#009790]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">Advanced Technology</h2>
            <p className="text-lg text-foreground/75 max-w-2xl mx-auto">
              Equipped with modern diagnostic and surgical equipment
            </p>
          </div>

          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {technologies.map((tech) => (
              <li
                key={tech.title}
                className="p-4 md:p-6 bg-white rounded-xl md:rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <span className="w-9 h-9 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <Microscope className="text-primary w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                </span>
                <h3 className="font-semibold text-foreground text-sm md:text-base mb-1 md:mb-2 leading-snug">{tech.title}</h3>
                <p className="text-xs md:text-sm text-foreground/75">{tech.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>




      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">Meet Our Doctors</h2>
            <p className="text-lg text-foreground/75 max-w-2xl mx-auto">
              Experienced ophthalmologists dedicated to your eye health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.name}
                className={`group rounded-2xl bg-slate-50 overflow-hidden border border-gray-100 flex flex-col shadow-lg transition-all duration-300`}
              >
                <div className="relative h-56 md:h-64 overflow-hidden bg-slate-50">
                  <img src={doctor.image} alt={`${doctor.name}, ${doctor.specialization}`} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    <Link to={doctorPath(doctor)} className="inline-block py-0.5 hover:text-primary hover:underline underline-offset-4">{doctor.name}</Link>
                  </h3>
                  <p className="text-primary font-medium mb-2">{doctor.specialization}</p>
                  <p className="text-sm font-semibold mb-2">Qualification: <span className="text-sm text-foreground/75 mb-2">{doctor.qualifications}</span> </p>
                  <p className="text-sm font-semibold mb-2">Experience: <span className="text-sm text-foreground/75 mb-2">{doctor.experience}</span> </p>
                  {doctor.registrationNumber && (
                    <p className="text-sm font-semibold mb-2">Reg. No.: <span className="text-sm text-foreground/75">{doctor.registrationNumber}</span></p>
                  )}
                  {doctor.timings && (
                    <p className="text-sm font-semibold">Timings: <span className="text-sm text-foreground/75 mb-2">{doctor.timings}</span> </p>
                  )}
                  <p className="text-sm mt-4 mb-6 text-foreground/80">{doctor.bio}</p>
                  <Link
                    to={bookingLink(doctor.name)}
                    className="block text-center w-full mt-auto px-4 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 py-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All Doctors <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews: link to genuine Google reviews instead of curated testimonials (NMC, Oct 2026) */}
      <section className="py-14 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Patient Reviews</h2>
          <p className="text-foreground/75 mb-6">Read what patients say about us, in their own words, on Google.</p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Read reviews on Google <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      

      {/* Why Choose Us */}
      <section className="pt-14 pb-20 md:py-20 bg-gradient-to-br from-primary/5 to-[#009790]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Why Choose Sri Harsha?</h2>
              <div className="space-y-4">
                {[
                  { icon: Award, title: "Accredited Excellence", desc: "Fully NABH accredited, meeting national quality standards" },
                  { icon: Users, title: "Expert Team", desc: "Experienced ophthalmologists and visiting specialists" },
                  { icon: Zap, title: "Advanced Technology", desc: "Latest diagnostic and surgical equipment" },
                  { icon: Heart, title: "Patient Care", desc: "Compassionate, personalized treatment" },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Icon className="text-primary" size={24} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-foreground/75">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-3xl">
              <PhotoCarousel
                label="Hospital facilities"
                slides={[
                  { src: infra1, alt: "Operation theatre at Sri Harsha Eye Hospital", width: 842, height: 472 },
                  { src: infra2, alt: "Hospital corridor and patient area", width: 695, height: 400 },
                  { src: infra3, alt: "Patient waiting area", width: 677, height: 399 },
                  { src: infra4, alt: "Diagnostic equipment in the eye examination room", width: 921, height: 635 },
                  { src: infra5, alt: "Hospital building in Karimnagar", width: 579, height: 768, fit: "contain" },
                  { src: infra6, alt: "Doctor consultation room", width: 910, height: 628 },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-foreground/75">Find answers to common questions about our services</p>
          </div>

          <div className="space-y-3">
            {homeFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors"
              >
                <summary className="w-full p-4 md:p-6 flex items-center justify-between gap-3 bg-white hover:bg-blue-50 transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-semibold text-foreground text-left">{faq.question}</h3>
                  <ChevronDown size={20} className="text-primary flex-shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="px-4 md:px-6 py-4 bg-blue-50 border-t border-border">
                  <p className="text-foreground/80">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
          <JsonLd data={faqSchema(homeFaqs)} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 md:py-20 bg-gradient-to-r from-gray-100 via-white to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">Ready to See Better?</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Schedule your appointment today and get NABH-accredited eye care close to home.
          </p>
          <Link
            to="/appointment"
            className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-700 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200 motion-safe:hover:scale-105"
          >
            Book Your Appointment Now
          </Link>
        </div>
      </section>
    </div>
  )
}
