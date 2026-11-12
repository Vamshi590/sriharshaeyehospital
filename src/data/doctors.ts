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
  /** State / National Medical Register number. NMC requires it next to the doctor's name in public communication. */
  registrationNumber?: string
  /** Shown in the "Meet Our Doctors" section on the home page. */
  featured?: boolean
  /** Languages the doctor consults in — fill in once confirmed. */
  languages?: string[]
  /** "resident" doctors are at the hospital daily; "visiting" consultants come on set days. */
  availability?: "resident" | "visiting"
  /**
   * Bookable hours, mirroring `timings` (keep the two in sync). Days: 0 = Sunday ... 6 = Saturday.
   * `nth` limits a block to the nth such weekday of the month (e.g. 4 = 4th Sunday).
   * Doctors without a schedule can be booked during the hospital's opening hours.
   */
  schedule?: DoctorSession[]
}

export type DoctorSession = { days: number[]; nth?: number; ranges: [from: string, to: string][] }

/** Single source of truth for doctor details (home page, doctors page, booking form). */
export const doctors: Doctor[] = [
  {
    name: "Dr. Srilatha CH",
    specialization: "Cataract & Refractive Surgery",
    experience: "20+ years",
    qualifications: "MBBS, MS (Ophthalmology), FICLEP (LVPEI), FICO (UK)",
    bio: "Specialises in cataract surgery with premium IOL (lens) implantation and small-incision techniques. Has performed more than 20,000 cataract surgeries.",
    image: srilatha,
    rating: 4.9,
    timings: "Mon - Sat: 10:00 AM - 2:30 PM, 6:00 PM - 7:30 PM | Sun: 10:00 AM - 1:30 PM",
    schedule: [
      { days: [1, 2, 3, 4, 5, 6], ranges: [["10:00", "14:30"], ["18:00", "19:30"]] },
      { days: [0], ranges: [["10:00", "13:30"]] },
    ],
    featured: true,
  },
  {
    name: "Dr. Ram Kumar",
    specialization: "Retina & Vitreous",
    experience: "18+ years",
    qualifications: "MBBS, DO (Ophthalmology)",
    bio: "Specialises in diabetic retinopathy and retinal detachment, using OCT and angiography imaging.",
    image: ram,
    rating: 4.8,
    timings: "Monthly, 4th Sunday: 08:00 AM - 10:00 AM (Visiting Consultant)",
    schedule: [{ days: [0], nth: 4, ranges: [["08:00", "10:00"]] }],
    availability: "visiting",
    featured: true,
  },
  {
    name: "Dr. Ekta Agarwal",
    specialization: "Oculoplasty Specialist",
    experience: "15+ years",
    qualifications: "MBBS, MS (Ophthalmology), Fellowship in Oculoplasty",
    bio: "Specialises in eyelid, tear duct and orbit surgery, including cosmetic eyelid procedures.",
    image: ekta,
    rating: 4.8,
    timings: "Monthly, 3rd Friday: 09:30 AM - 12:30 PM (Visiting Consultant)",
    schedule: [{ days: [5], nth: 3, ranges: [["09:30", "12:30"]] }],
    availability: "visiting",
    featured: true,
  },
  {
    name: "Dr. Sampath",
    specialization: "Cornea Specialist",
    experience: "12+ years",
    qualifications: "MBBS, MS (Ophthalmology)",
    bio: "Specialises in corneal diseases and corneal transplantation.",
    image: sampath,
    rating: 4.8,
  },
  {
    name: "Dr. Swetha T",
    specialization: "Pediatric Ophthalmology & Strabismus",
    experience: "15+ years",
    qualifications: "MBBS, MS (Ophthalmology), FICO",
    bio: "Specialises in children's eye care and squint (strabismus) correction.",
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

/** URL slug, e.g. "Dr. Srilatha CH" -> "dr-srilatha-ch". */
export function doctorSlug(d: Pick<Doctor, "name">) {
  return d.name.toLowerCase().replace(/\./g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export const doctorPath = (d: Pick<Doctor, "name">) => `/doctors/${doctorSlug(d)}`

export function doctorBySlug(slug: string | undefined) {
  return doctors.find((d) => doctorSlug(d) === slug)
}

export function doctorByName(name: string) {
  return doctors.find((d) => d.name === name)
}

/** Link to the booking page with the doctor pre-selected. */
export function bookingLink(doctorName?: string) {
  return doctorName ? `/appointment?doctor=${encodeURIComponent(doctorName)}` : "/appointment"
}
