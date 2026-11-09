import { useState } from "react"
import { Link } from "react-router-dom"
import aboutDoctor from "../assets/doctor 2.webp"
import infra1 from "../assets/infra1.webp"
import infra2 from "../assets/infra2.webp"
import infra3 from "../assets/infra3.webp"
import infra4 from "../assets/infra4.webp"
import infra5 from "../assets/infra5.webp"
import infra6 from "../assets/infra6.webp"
import {
  Eye,
  Zap,
  Heart,
  Users,
  Award,
  ArrowRight,
  Microscope,
  Shield,
  Stethoscope,
  ChevronDown,
  Star,
} from "lucide-react"
import HeroSection from "./HeroSection"
import { InsuranceMarquee } from "../components/insurance-marquee"
import { TestimonialMarquee } from "../components/testimonial-marquee"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { bookingLink, doctors as allDoctors } from "../data/doctors"

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const services = [
    {
      icon: Eye,
      title: "Glaucoma & Squint Management",
      description: "Advanced treatment for glaucoma and squint conditions",
      color: "primary",
    },
    {
      icon: Zap,
      title: "Cataract Surgery",
      description: "Painless, precise cataract removal procedures",
      color: "accent",
    },
    {
      icon: Heart,
      title: "Retina Care",
      description: "Specialized treatment for retinal conditions",
      color: "primary",
    },
    {
      icon: Users,
      title: "Pediatric Eye Care",
      description: "Gentle, compassionate care for children",
      color: "accent",
    },
  ]
  const doctors = allDoctors.filter((doctor) => doctor.featured)

  const technologies = [
    { title: "OFI", description: "Precision laser vision correction" },
    { title: "OCT Imaging", description: "Advanced retinal diagnostics" },
    { title: "Phacoemulsification", description: "Minimally invasive cataract surgery" },
    { title: "Vitrectomy Equipment", description: "Advanced retinal surgery tools" },
    { title: "A-Scan Biometry", description: "Accurate lens power calculation before cataract surgery" },
    { title : "Pediatric Retina Checkup", description : "Gentle, compassionate care for children"},
    {title : "Visual Fields", description : "Advanced Glaucoma and Stroke care"},
    {title : "Fundus Fluorescein Angiography", description : "Advanced Retinal Diseases Care"}
  ]

  const faqs = [
    {
      question: "Is cataract surgery safe?",
      answer:
        "Yes, cataract surgery is one of the safest and most effective surgical procedures. Our hospital uses advanced techniques and equipment to ensure optimal outcomes.",
    },
    {
      question: "What is the recovery time?",
      answer:
        "Recovery varies by procedure. Most patients experience improved vision within days. Our doctors will provide specific guidance based on your procedure.",
    },
    {
      question: "Do you offer emergency services?",
      answer:
        "Yes, we have 24/7 emergency eye care services available. Contact us immediately if you experience any eye emergency.",
    },
    {
      question: "What insurance do you accept?",
      answer:
        "We accept most major insurance plans. Please contact our billing department for specific information about your coverage.",
    },
  ]

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      <InsuranceMarquee />

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#080c0f] mb-4">Our Services</h2>
            <p className="text-lg text-[#080c0f]/60 max-w-2xl mx-auto">
              Comprehensive eye care solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className={`group p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-[#e2e9ee] hover:border-[#0079bf]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                >
                  <div className="w-12 h-12 bg-[#0079bf]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0079bf]/20 transition-colors">
                    <Icon className="text-[#0079bf]" size={24} />
                  </div>
                  <h3 className="font-semibold text-[#080c0f] mb-2">{service.title}</h3>
                  <p className="text-sm text-[#080c0f]/60">{service.description}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#0079bf] font-semibold hover:gap-3 transition-all"
            >
              View All Services <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#080c0f] mb-6 px-4">About Sri Harsha Eye Hospital</h2>
              <div className="space-y-4">
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
                        <Icon className="text-[#0079bf]" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#080c0f]">{item.title}</h3>
                        <p className="text-sm text-[#080c0f]/60">{item.desc}</p>
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
            <div className="relative -top-16 h-96 lg:h-[600px] flex items-center justify-center">

              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={aboutDoctor}
                  alt="Dr. Srilatha Chintala"
                  className="relative z-10 h-auto object-contain "
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#0079bf]/5 to-[#009790]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#080c0f] mb-4">Advanced Technology</h2>
            <p className="text-lg text-[#080c0f]/60 max-w-2xl mx-auto">
              Equipped with state-of-the-art diagnostic and surgical equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl border border-[#e2e9ee] hover:border-[#0079bf]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#0079bf]/10 rounded-lg flex items-center justify-center mb-4">
                  <Microscope className="text-[#0079bf]" size={24} />
                </div>
                <h3 className="font-semibold text-[#080c0f] mb-2">{tech.title}</h3>
                <p className="text-sm text-[#080c0f]/60">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>




      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#080c0f] mb-4">Meet Our Doctors</h2>
            <p className="text-lg text-[#080c0f]/60 max-w-2xl mx-auto">
              Experienced ophthalmologists dedicated to your eye health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div
                key={doctor.name}
                className={`group rounded-2xl bg-slate-50 overflow-hidden border border-gray-100 ${index === 1 ? "scale-105" : ""} shadow-lg transition-all duration-300 transform`}
              >
                <div className="relative h-64 overflow-hidden bg-slate-50">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-contain" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#080c0f] mb-1">{doctor.name}</h3>
                  <p className="text-primary font-medium mb-2">{doctor.specialization}</p>
                       <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(doctor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#080c0f]/60">{doctor.rating}</span>
                  </div>
                  <p className="text-sm font-semibold mb-2">Qualification : <span className="text-sm text-[#080c0f]/60 mb-2">{doctor.qualifications}</span> </p>
                  <p className="text-sm font-semibold mb-2">Experience : <span className="text-sm text-[#080c0f]/60 mb-2">{doctor.experience}</span> </p>
                  {doctor.timings && (
                    <p className="text-sm font-semibold">Timings : <span className="text-sm text-[#080c0f]/60 mb-2">{doctor.timings}</span> </p>
                  )}
                  <p className="text-sm mt-4">{doctor.bio}</p>
                  <Link
                    to={bookingLink(doctor.name)}
                    className="block text-center w-full mt-6 px-4 py-2 border border-[#0079bf] text-[#080c0f] rounded-full font-medium hover:bg-[#0079bf] hover:text-white transition-colors"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All Doctors <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <TestimonialMarquee/>

      

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-[#0079bf]/5 to-[#009790]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#080c0f] mb-6">Why Choose Sri Harsha?</h2>
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
                        <Icon className="text-[#0079bf]" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#080c0f]">{item.title}</h3>
                        <p className="text-sm text-[#080c0f]/60">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="relative h-96 rounded-3xl">
              <Slider {...carouselSettings}>
                <div className="relative h-96 rounded-3xl">
                  <img src={infra1} alt="Operation theatre" className="object-cover w-full h-full rounded-3xl" />
                </div>
                <div className="relative h-96 rounded-3xl">
                  <img src={infra2} alt="Hospital infrastructure" className="object-cover w-full h-full rounded-3xl" />
                </div>
                <div className="relative h-96 rounded-3xl">
                  <img src={infra3} alt="Hospital infrastructure" className="object-cover w-full h-full rounded-3xl" />
                </div>
                  <div className="relative h-96 rounded-3xl">
                  <img src={infra4} alt="Diagnostic equipment" className="object-cover w-full h-full rounded-3xl" />
                </div>
                  <div className="relative h-96 rounded-3xl">
                  <img src={infra5} alt="Hospital infrastructure" className="object-contain w-full h-full rounded-3xl" />
                </div>
                  <div className="relative h-96 rounded-3xl">
                  <img src={infra6} alt="Consultation room" className="object-cover w-full h-full rounded-3xl" />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#080c0f] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-[#080c0f]/60">Find answers to common questions about our services</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-[#e2e9ee] rounded-lg overflow-hidden hover:border-[#0079bf]/30 transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  aria-expanded={expandedFaq === index}
                  className="w-full p-6 flex items-center justify-between bg-white hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-semibold text-[#080c0f] text-left">{faq.question}</h3>
                  <ChevronDown
                    size={20}
                    className={`text-primary flex-shrink-0 transition-transform ${expandedFaq === index ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-blue-50 border-t border-border">
                    <p className="text-[#080c0f]/70">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-100 via-white to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to See Better?</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Schedule your appointment today and experience the difference of world-class eye care.
          </p>
          <Link
            to="/appointment"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            Book Your Appointment Now
          </Link>
        </div>
      </section>
    </main>
  )
}
