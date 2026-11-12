/**
 * Ad landing pages (/lp/<id>). Neutral ids keep health words out of URLs shared with ad
 * platforms. Copy must match the ad and follow NMC rules (no testimonials, no guarantees).
 */
export type Landing = {
  id: string
  campaign: string
  headline: string
  sub: string
  service: string
  points: string[]
  whatsappMessage: string
}

export const landings: Landing[] = [
  {
    id: "a1",
    campaign: "eye-checkup",
    headline: "Book a complete eye check-up in Karimnagar",
    sub: "Vision and power test, eye pressure and a dilated retina examination at a NABH-accredited eye hospital.",
    service: "General Appointment",
    points: ["NABH-accredited eye hospital", "Open Monday to Saturday 9 AM to 8 PM, Sunday 10 AM to 2:30 PM", "Aarogyasri, EHS and cashless insurance accepted"],
    whatsappMessage: "Hello, I would like to book a complete eye check-up.",
  },
  {
    id: "a2",
    campaign: "cataract",
    headline: "Cataract surgery in Karimnagar",
    sub: "Phaco surgery with monofocal, toric, multifocal and trifocal lens options, led by Dr. Srilatha CH (MBBS, MS Ophthalmology, FICLEP LVPEI, FICO UK).",
    service: "Cataract Surgery",
    points: ["Same-day surgery under local anaesthesia", "Lens options explained after measuring your eyes", "Aarogyasri, EHS and cashless insurance accepted"],
    whatsappMessage: "Hello, I would like to consult about cataract surgery.",
  },
  {
    id: "a3",
    campaign: "diabetic-eye",
    headline: "Have diabetes? Get your retina checked",
    sub: "Diabetic retinopathy often has no symptoms at first. A yearly dilated eye check-up finds it early.",
    service: "Retina Care",
    points: ["Dilated retina examination, OCT and angiography", "Retina consultant visits monthly", "Aarogyasri, EHS and cashless insurance accepted"],
    whatsappMessage: "Hello, I would like to book a diabetic eye check-up.",
  },
]

export const landingById = (id: string | undefined) => landings.find((l) => l.id === id)
