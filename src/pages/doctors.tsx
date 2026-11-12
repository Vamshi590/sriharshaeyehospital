import { Link } from "react-router-dom"
import { JsonLd } from "../components/json-ld"
import { physiciansSchema } from "../seo/schema"
import { bookingLink, doctorPath, doctors } from "../data/doctors"

export default function DoctorsPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-foreground mb-4">Our Doctors</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Meet our team of highly qualified ophthalmologists dedicated to your eye health
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.name}
                className="group bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={`${doctor.name}, ${doctor.specialization}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-1">
                    <Link to={doctorPath(doctor)} className="inline-block py-0.5 hover:text-primary hover:underline underline-offset-4">{doctor.name}</Link>
                  </h2>
                  <p className="text-primary font-semibold text-sm mb-3">{doctor.specialization}</p>

                  {/* Details */}
                  <div className="space-y-2 mb-4 text-sm">
                    <p className="text-foreground/70">
                      <span className="font-semibold">Experience:</span> {doctor.experience}
                    </p>
                    <p className="text-foreground/70">
                      <span className="font-semibold">Qualifications:</span> {doctor.qualifications}
                    </p>
                    {doctor.registrationNumber && (
                      <p className="text-foreground/70">
                        <span className="font-semibold">Reg. No.:</span> {doctor.registrationNumber}
                      </p>
                    )}
                    {doctor.timings && (
                      <p className="text-foreground/70">
                        <span className="font-semibold">Timings:</span> {doctor.timings}
                      </p>
                    )}
                  </div>

                  <p className="text-foreground/75 text-sm leading-relaxed">{doctor.bio}</p>

                  {/* CTA */}
                  <Link
                    to={bookingLink(doctor.name)}
                    className="block text-center w-full mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Book Consultation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: `${doctors.length}`, label: "Expert Doctors" },
              { number: "75+", label: "Years Combined Experience" },
              { number: "30K+", label: "Successful Surgeries" },
              { number: "98%", label: "Patient Satisfaction" },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-foreground/75">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <JsonLd data={physiciansSchema(doctors)} />
    </div>
  )
}
