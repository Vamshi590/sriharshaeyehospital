import { Eye, Zap, Heart, Users, Microscope, Shield, Glasses, Stethoscope } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Zap,
      title: "Diabetic Retinopathy",
      description: "Advanced treatment for diabetic retinopathy",
      details: [
        "Intravitreal injections (Anti-VEGF / steroids) to reduce swelling and prevent abnormal vessel growth",
        "Vitrectomy surgery for advanced bleeding or retinal detachment.",
        "Regular monitoring and follow-up appointments",
        "99% patient satisfaction rate",
      ],
    },
    {
      icon: Eye,
      title: "Cataract Surgery",
      description: "Painless, precise cataract removal with premium IOL implants",
      details: [
        "Phacoemulsification technique",
        "Premium intraocular lens options",
        "Same-day discharge",
        "99% patient satisfaction rate",
        "Minimal incision (2.2mm)",
      ],
    },
    {
      icon: Heart,
      title: "Retina Care",
      description: "Specialized treatment for retinal conditions and diseases",
      details: [
        "Diabetic retinopathy management",
        "Retinal detachment repair",
        "Macular degeneration treatment",
        "Advanced OCT imaging",
      ],
    },
    {
      icon: Users,
      title: "Pediatric Eye Care",
      description: "Gentle, compassionate eye care for children",
      details: [
        "Comprehensive eye exams for kids",
        "Amblyopia (lazy eye) treatment",
        "Strabismus correction",
        "Child-friendly environment",
      ],
    },
    {
      icon: Microscope,
      title: "Glaucoma Treatment",
      description: "Advanced diagnosis and management of glaucoma",
      details: [
        "Early detection with advanced imaging",
        "Medical and surgical management",
        "Laser trabeculoplasty",
        "Regular monitoring programs",
      ],
    },
    {
      icon: Glasses,
      title: "Refractive Errors",
      description: "Comprehensive correction for all refractive errors",
      details: [
        "Precise power determination",
        "Custom lens prescriptions",
        "Contact lens fitting",
        "Orthokeratology services",
      ],
    },
    {
      icon: Shield,
      title: "Corneal Diseases",
      description: "Treatment for corneal conditions and infections",
      details: ["Keratoconus management", "Corneal transplantation", "Infection treatment", "Corneal cross-linking"],
    },
    {
      icon: Stethoscope,
      title: "Dry Eye Syndrome",
      description: "Comprehensive management of dry eye conditions",
      details: [
        "Advanced diagnostic testing",
        "Personalized treatment plans",
        "Punctal plug insertion",
        "Lifestyle recommendations",
      ],
    },
  ]

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-foreground mb-4">Our Services</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Comprehensive eye care solutions using cutting-edge technology and expert medical knowledge
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="group h-full p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{service.title}</h3>
                  <p className="text-sm text-foreground/60 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.details.map((detail, i) => (
                      <li key={i} className="text-xs text-foreground/50 flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Our Services */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Why Choose Our Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Latest Technology",
                description: "State-of-the-art diagnostic and surgical equipment for accurate results",
              },
              {
                title: "Expert Doctors",
                description: "Highly qualified ophthalmologists with international training and experience",
              },
              {
                title: "Patient Comfort",
                description: "Compassionate care in a modern, comfortable, and welcoming environment",
              },
            ].map((item, index) => (
              <div key={index} className="p-8 bg-white rounded-2xl border border-border text-center">
                <h3 className="font-semibold text-lg text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
