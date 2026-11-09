import { Star } from "lucide-react"
import { Link } from "react-router-dom"
import { bookingLink, doctors } from "../data/doctors"

export default function DoctorsPage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
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
                <div className="relative h-64 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{doctor.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-3">{doctor.specialization}</p>

                  {/* Rating */}
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
                    <span className="text-sm text-foreground/60">{doctor.rating}</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4 text-sm">
                    <p className="text-foreground/70">
                      <span className="font-semibold">Experience:</span> {doctor.experience}
                    </p>
                    <p className="text-foreground/70">
                      <span className="font-semibold">Qualifications:</span> {doctor.qualifications}
                    </p>
                    {doctor.timings && (
                      <p className="text-foreground/70">
                        <span className="font-semibold">Timings:</span> {doctor.timings}
                      </p>
                    )}
                  </div>

                  <p className="text-foreground/60 text-sm leading-relaxed">{doctor.bio}</p>

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
                <p className="text-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
