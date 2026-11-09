import type { CSSProperties } from "react"
import { Link } from "react-router-dom"
import { testimonials } from "../data/testimonials"

// Rendered twice so the -50% translate loops seamlessly.
const loopedTestimonials = [...testimonials, ...testimonials]

export function TestimonialMarquee() {
  return (
    <section className="py-8 pb-16 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Patient Testimonials</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">Hear from our satisfied patients</p>
        </div>

        <div className="relative overflow-hidden">
          <div className="marquee-track" style={{ "--marquee-duration": "60s" } as CSSProperties}>
            {loopedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                aria-hidden={index >= testimonials.length}
                className="flex-shrink-0 w-[300px] md:w-[400px] p-6 bg-white rounded-2xl border border-border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-foreground/70 mb-4 italic line-clamp-4">"{testimonial.text}"</p>
                <p className="font-semibold text-foreground">- {testimonial.name}</p>
                <p className="text-xs text-foreground/50">{testimonial.service}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/testimonials" className="text-primary font-semibold hover:underline">
            Read more patient stories →
          </Link>
        </div>
      </div>
    </section>
  )
}
