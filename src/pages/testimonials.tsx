"use client"

import { useState } from "react"
import { Star, Quote } from "lucide-react"

export default function TestimonialsPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: "Mohanreddy Thipireddy",
      age: 55,
      service: "Cataract Surgery",
      rating: 5,
      text: "Treatment is very good all facility available and staff fendly🥰😍😍 cataract surgery done",
      
    },
    {
      name: "Busarapu Shivaramakrishna",
      age: 50,
      service: "Cataract Surgery",
      rating: 5,
      text: "The entire experience was wonderful. From the initial consultation to the surgery and follow-up, everything was handled with utmost care. My vision has improved dramatically!",
    },
    {
      name: "Vijaya Laxmi",
      age: 46,
      service: "Glaucoma Treatment",
      rating: 5,
      text: "Visited for eye check-up – very satisfied. Doctor is experienced and polite. Staff is friendly and helpful. Clean hospital with good facilities. Advanced equipment and quick service. Highly recommend for eye care needs.",
    },
    {
      name: "Nallala poornachandar",
      age: 28,
      service: "Pediatric Eye Care",
      rating: 5,
      text: "Good Hospital. Nice Treatment. I Feel eye tests are accurate in this Hospital. Staff are friendly with patients. opticals have more models to choose. I genuinely recommending this Hospital...",
    },
    {
      name: "Manemma Thupakula",
      age: 60,
      service: "Retina Care",
      rating: 5,
      text: "After being diagnosed with diabetic retinopathy, I was worried. But the staff at Sri Harsha Eye hospital has  provided comprehensive care and my condition is now well-managed.",
    },
    {
      name: "Arakandla srinivas",
      age: 25,
      service: "Dry Eye Syndrome",
      rating: 5,
      text: "I suffered from severe dry eyes for years. The personalized treatment plan and follow-up care at Sri Harsha has been life-changing. Finally, relief!",
    },
    {
      name: "Vinay Kamishetti",
      age: 35,
      service: "Dry Eye Syndrome",
      rating: 5,
      text: "We have visited this hospital today the doctor was soo cool and the treatment was good. We have visited many hospitals before but it was not diagnosed but this doctor has diagnosed and treated well.",
    },
    {
      name: "Ruchira medha Keshipeddi",
      age: 20,
      service: "Dry Eye Syndrome",
      rating: 5,
      text: "Very accurate and good treatment",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-foreground mb-4">Patient Testimonials</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Hear from our satisfied patients about their transformative experiences
          </p>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Testimonial Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-border p-12 shadow-lg">
              <Quote className="text-primary/20 mb-4" size={48} />

              <p className="text-2xl text-foreground mb-8 leading-relaxed italic">"{testimonials[activeIndex].text}"</p>

              {/* Patient Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 flex rounded-full bg-[#F2F2F2] overflow-hidden text-center items-center justify-center text-[#000000] font-bold text-3xl ">{`${testimonials[activeIndex].name[0]}`}</div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">{testimonials[activeIndex].name}</h3>
                  <p className="text-sm text-foreground/60">
                    {testimonials[activeIndex].age} years old • {testimonials[activeIndex].service}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevTestimonial}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                ← Previous
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeIndex ? "bg-primary w-8" : "bg-border"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">More Patient Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-border p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-foreground/70 mb-6 line-clamp-3">"{testimonial.text}"</p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 flex rounded-full bg-[#F2F2F2] overflow-hidden text-center items-center justify-center text-[#000000] font-bold text-2xl ">{`${testimonial.name[0]}`}</div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-foreground/60">{testimonial.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "100K+", label: "Happy Patients" },
              { number: "4.9/5", label: "Average Rating" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "30K+", label: "Successful Surgeries" },
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
