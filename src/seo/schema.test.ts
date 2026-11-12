import { describe, expect, it } from "vitest"
import { ADDRESS, OPENING_HOURS, PHONE_TEL } from "../data/contact"
import { doctors } from "../data/doctors"
import { contactFaqs, homeFaqs } from "../data/faqs"
import { SITE_URL } from "../data/site"
import { breadcrumbSchema, faqSchema, hospitalSchema, physiciansSchema, serializeJsonLd, HOSPITAL_ID } from "./schema"
import { metaFor, notFoundMeta } from "./routes"

describe("hospital schema", () => {
  const s = hospitalSchema()
  it("is a Hospital + MedicalClinic with a stable @id", () => {
    expect(s["@type"]).toEqual(["Hospital", "MedicalClinic"])
    expect(s["@id"]).toBe(`${SITE_URL}/#hospital`)
  })
  it("uses exactly the address, phone and hours shown on the site (NAP consistency)", () => {
    expect(s.address).toMatchObject({ "@type": "PostalAddress", ...ADDRESS })
    expect(s.telephone).toBe(PHONE_TEL)
    const hours = s.openingHoursSpecification as { opens: string; closes: string; dayOfWeek: string[] }[]
    expect(hours).toHaveLength(OPENING_HOURS.length)
    expect(hours.flatMap((h) => h.dayOfWeek)).toHaveLength(7)
  })
  it("leaves out facts that are not confirmed yet", () => {
    expect(s).not.toHaveProperty("foundingDate")
    expect(s).not.toHaveProperty("geo")
  })
})

describe("physician schema", () => {
  it("has one Physician per doctor, linked to the hospital", () => {
    const graph = physiciansSchema(doctors)["@graph"] as Record<string, unknown>[]
    expect(graph).toHaveLength(doctors.length)
    for (const p of graph) {
      expect(p["@type"]).toBe("Physician")
      expect(p.worksFor).toEqual({ "@id": HOSPITAL_ID })
    }
  })
  it("adds the registration number only when known", () => {
    const [p] = physiciansSchema([{ ...doctors[0], registrationNumber: "TSMC/12345" }])["@graph"] as Record<string, unknown>[]
    expect(p.identifier).toBe("TSMC/12345")
    const [q] = physiciansSchema([{ ...doctors[0], registrationNumber: undefined }])["@graph"] as Record<string, unknown>[]
    expect(q).not.toHaveProperty("identifier")
  })
})

describe("FAQ schema", () => {
  it.each([["home", homeFaqs], ["contact", contactFaqs]])("mirrors the visible %s FAQs word for word", (_, faqs) => {
    const s = faqSchema(faqs)
    const entities = s.mainEntity as { name: string; acceptedAnswer: { text: string } }[]
    expect(entities.map((e) => e.name)).toEqual(faqs.map((f) => f.question))
    expect(entities.map((e) => e.acceptedAnswer.text)).toEqual(faqs.map((f) => f.answer))
  })
})

describe("breadcrumbs", () => {
  it("are omitted on the home page and the 404 page", () => {
    expect(breadcrumbSchema(metaFor("/"))).toBeNull()
    expect(breadcrumbSchema(notFoundMeta)).toBeNull()
  })
  it("list Home > page with absolute URLs", () => {
    const b = breadcrumbSchema(metaFor("/doctors"))!
    const items = b.itemListElement as { position: number; item: string }[]
    expect(items.map((i) => i.item)).toEqual([`${SITE_URL}/`, `${SITE_URL}/doctors`])
  })
})

describe("serializeJsonLd", () => {
  it("cannot break out of the <script> tag", () => {
    const out = serializeJsonLd({ x: "</script><script>alert(1)</script>" })
    expect(out).not.toContain("</script>")
    expect(JSON.parse(out).x).toBe("</script><script>alert(1)</script>")
  })
})
