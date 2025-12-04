"use client"

export function TestimonialMarquee() {


  const testimonials = [
    {
      name: "Rajesh M.",
      text: "Excellent service and professional staff. My vision has improved significantly after Cataracy surgery.",
      rating: 5,
    },
    {
      name: "Priya S.",
      text: "The doctors are very caring and explain everything clearly. Highly recommended!",
      rating: 5,
    },
    {
      name: "Amit K.",
      text: "Best eye hospital in the city. State-of-the-art equipment and compassionate care.",
      rating: 5,
    },
  ]
  // Duplicate the array for seamless looping
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="py-8 pb-16 bg-gradient-to-br from-slate-50 via-white to-slate-50  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#080c0f] mb-4">Patient Testimonials</h2>
            <p className="text-lg text-[#080c0f]/60 max-w-2xl mx-auto">Hear from our satisfied patients</p>
          </div>


        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <style>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .marquee-content {
              animation: marquee 40s linear infinite;
              display: flex;
              gap: 2rem;
            }
            
            .marquee-content:hover {
              animation-play-state: paused;
            }
            
            .marquee-item {
              flex-shrink: 0;
              min-width: 200px;
              padding: 0.75rem 1.5rem;
              background: white;
              border: 1.5px solid #e5e7eb;
              border-radius: 0.5rem;
              font-weight: 600;
              color: #1f2937;
              transition: all 0.3s ease;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            }
            
            .marquee-item:hover {
              border-color: #9db4c0;
              box-shadow: 0 4px 12px rgba(157, 180, 192, 0.15);
              transform: translateY(-2px);
            }
          `}</style>

          <div className="marquee-content">
            {duplicatedTestimonials.map((testimonial, index) => (
               <div
                key={index}
                className="marquee-item p-6 bg-white w-[400px] rounded-2xl border border-[#e2e9ee] hover:border-[#0079bf]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[#080c0f]/70 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-[#080c0f]">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  )
}
