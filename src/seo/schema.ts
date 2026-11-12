import {
  ADDRESS,
  EMAIL,
  GEO,
  GOOGLE_MAPS_URL,
  HOSPITAL_NAME,
  OPENING_HOURS,
  PHONE2_TEL,
  PHONE_TEL,
} from "../data/contact"
import type { Doctor } from "../data/doctors"
import type { Faq } from "../data/faqs"
import type { Service } from "../data/services"
import type { Article } from "../data/articles"
import { INSURERS, SCHEMES } from "../data/insurance"
import { SITE, SITE_URL, absoluteUrl } from "../data/site"
import { trail, type RouteMeta } from "./routes"

type Json = Record<string, unknown>

export const HOSPITAL_ID = `${SITE_URL}/#hospital`

export function hospitalSchema(): Json {
  const schema: Json = {
    "@context": "https://schema.org",
    "@type": ["Hospital", "MedicalClinic"],
    "@id": HOSPITAL_ID,
    name: HOSPITAL_NAME,
    url: SITE_URL + "/",
    description: SITE.shortDescription,
    image: absoluteUrl(SITE.ogImage),
    logo: absoluteUrl("/favicon.png"),
    telephone: PHONE_TEL,
    email: EMAIL,
    address: { "@type": "PostalAddress", ...ADDRESS },
    geo: { "@type": "GeoCoordinates", latitude: GEO.latitude, longitude: GEO.longitude },
    hasMap: GOOGLE_MAPS_URL,
    areaServed: { "@type": "City", name: "Karimnagar" },
    contactPoint: [PHONE_TEL, PHONE2_TEL].map((telephone) => ({
      "@type": "ContactPoint",
      telephone,
      contactType: "appointments",
      areaServed: "IN",
      availableLanguage: SITE.languages,
    })),
    openingHoursSpecification: OPENING_HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    availableService: [
      "Cataract surgery",
      "Diabetic retinopathy treatment",
      "Retina and vitreous care",
      "Glaucoma treatment",
      "Paediatric ophthalmology and squint",
      "Oculoplasty",
      "Cornea treatment",
      "Dry eye treatment",
    ].map((name) => ({ "@type": "MedicalProcedure", name })),
    paymentAccepted: ["Cash", "UPI", "Cards", ...SCHEMES, ...INSURERS].join(", "),
    knowsLanguage: SITE.languages,
    award: `Accredited by ${SITE.accreditation}`,
  }
  if (SITE.foundingYear) schema.foundingDate = SITE.foundingYear
  // The Google Business Profile listing first, then any social profiles: ties this site to the Maps listing.
  schema.sameAs = [GOOGLE_MAPS_URL, ...SITE.sameAs]
  return schema
}

export function physiciansSchema(doctors: Doctor[]): Json {
  return {
    "@context": "https://schema.org",
    "@graph": doctors.map((d) => {
      const p: Json = {
        "@type": "Physician",
        name: d.name,
        jobTitle: d.specialization,
        knowsAbout: d.specialization,
        description: d.bio,
        hasCredential: d.qualifications,
        worksFor: { "@id": HOSPITAL_ID },
        address: { "@type": "PostalAddress", ...ADDRESS },
        telephone: PHONE_TEL,
      }
      if (d.registrationNumber) p.identifier = d.registrationNumber
      return p
    }),
  }
}

export function faqSchema(faqs: Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

export function breadcrumbSchema(meta: RouteMeta): Json | null {
  if (meta.path === "/" || meta.path === "/te" || meta.noindex) return null
  const items = trail(meta)
  const home = meta.lang === "te" ? [] : [{ name: "Home", path: "/" }]
  const list = [...home, ...items.map((m) => ({ name: m.label, path: m.path }))]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((x, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: x.name,
      item: x.path === "/" ? SITE_URL + "/" : absoluteUrl(x.path),
    })),
  }
}

/** Serialise for an inline <script type="application/ld+json">; escapes "<" so it can't close the tag. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export function servicePageSchema(s: Service): Json {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: s.name,
    description: s.description,
    url: absoluteUrl(`/eye-care/${s.slug}`),
    inLanguage: "en-IN",
    audience: { "@type": "PeopleAudience", audienceType: "Patient" },
    about: {
      "@type": s.kind,
      name: s.name,
      description: s.summary,
      ...(s.kind === "MedicalCondition" ? { signOrSymptom: s.symptoms.map((name) => ({ "@type": "MedicalSignOrSymptom", name })) } : {}),
    },
    provider: { "@id": HOSPITAL_ID },
    ...(SITE.review ? { lastReviewed: SITE.review.date, reviewedBy: { "@type": "Physician", name: SITE.review.by } } : {}),
  }
}

export function physicianSchema(d: Doctor): Json {
  const graph = physiciansSchema([d])["@graph"] as Json[]
  return { "@context": "https://schema.org", ...graph[0] }
}

export function articleSchema(a: Article): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.published,
    dateModified: a.updated ?? a.published,
    inLanguage: "en-IN",
    mainEntityOfPage: absoluteUrl(`/health-library/${a.slug}`),
    image: absoluteUrl(SITE.ogImage),
    author: { "@id": HOSPITAL_ID },
    publisher: { "@id": HOSPITAL_ID },
  }
}
