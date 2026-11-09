import srilatha from "../assets/dr srilatha final.webp"
import ram from "../assets/dr ram final.webp"
import ekta from "../assets/dr ekta final.webp"
import sampath from "../assets/dr sampath final.webp"
import swetha from "../assets/dr swetha final.webp"
import praneetha from "../assets/dr praneetha final.webp"

export type Doctor = {
  name: string
  specialization: string
  experience: string
  qualifications: string
  bio: string
  image: string
  rating: number
  /** Consultation timings, where published. */
  timings?: string
  /** Shown in the "Meet Our Doctors" section on the home page. */
  featured?: boolean
}

/** Single source of truth for doctor details (home page, doctors page, booking form). */
export const doctors: Doctor[] = [
  {
    name: "Dr. Srilatha CH",
    specialization: "Cataract & Refractive Surgery",
    experience: "20+ years",
    qualifications: "MBBS, MS (Ophthalmology), FICLEP (LVPEI), FICO (UK)",
    bio: "Renowned for premium IOL implantation and advanced cataract surgical techniques with minimal trauma. Has performed more than 20,000 cataract surgeries.",
    image: srilatha,
    rating: 4.9,
    timings: "Mon - Sat: 10:00 AM - 2:30 PM, 6:00 PM - 7:30 PM | Sun: 10:00 AM - 1:30 PM",
    featured: true,
  },
  {
    name: "Dr. Ram Kumar",
    specialization: "Retina & Vitreous",
    experience: "18+ years",
    qualifications: "MBBS, DO (Ophthalmology)",
    bio: "Specialized in diabetic retinopathy and retinal detachment repair with advanced imaging expertise.",
    image: ram,
    rating: 4.8,
    timings: "Monthly, 4th Sunday: 08:00 AM - 10:00 AM (Visiting Consultant)",
    featured: true,
  },
  {
    name: "Dr. Ekta Agarwal",
    specialization: "Oculoplasty Specialist",
    experience: "15+ years",
    qualifications: "MBBS, MS (Ophthalmology), Fellowship in Oculoplasty",
    bio: "Expert in eyelid surgery and cosmetic procedures with a focus on natural, beautiful results.",
    image: ekta,
    rating: 4.8,
    timings: "Monthly, 3rd Friday: 09:30 AM - 12:30 PM (Visiting Consultant)",
    featured: true,
  },
  {
    name: "Dr. Sampath",
    specialization: "Cornea Specialist",
    experience: "12+ years",
    qualifications: "MBBS, MS (Ophthalmology)",
    bio: "Expert in corneal transplantation and advanced corneal surgical techniques.",
    image: sampath,
    rating: 4.8,
  },
  {
    name: "Dr. Swetha T",
    specialization: "Pediatric Ophthalmology & Strabismus",
    experience: "15+ years",
    qualifications: "MBBS, MS (Ophthalmology), FICO",
    bio: "Expert in pediatric ophthalmology and strabismus correction with advanced surgical techniques.",
    image: swetha,
    rating: 4.9,
  },
  {
    name: "Dr. Praneetha Goud A",
    specialization: "Duty Medical Officer",
    experience: "1+ year",
    qualifications: "MBBS",
    bio: "Dedicated to patient care and general ophthalmology support.",
    image: praneetha,
    rating: 4.8,
  },
]

/** Link to the booking page with the doctor pre-selected. */
export function bookingLink(doctorName?: string) {
  return doctorName ? `/appointment?doctor=${encodeURIComponent(doctorName)}` : "/appointment"
}
