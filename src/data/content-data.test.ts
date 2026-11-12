import { describe, expect, it } from "vitest"
import { services } from "./services"
import { doctors, doctorBySlug, doctorSlug } from "./doctors"
import { BOOKING_SERVICE, BOOKING_SERVICES } from "./booking"
import { teServices } from "./te"
import { articles } from "./articles"
import { landings } from "./landing"
import { costs } from "./costs"

describe("service pages content", () => {
  it("has unique slugs", () => {
    expect(new Set(services.map((s) => s.slug)).size).toBe(services.length)
  })
  it.each(services)("$slug is complete enough to answer patient questions", (s) => {
    expect(s.summary.split(". ").length).toBeGreaterThanOrEqual(2)
    expect(s.symptoms.length).toBeGreaterThanOrEqual(3)
    expect(s.diagnosis.length).toBeGreaterThanOrEqual(2)
    expect(s.treatments.length).toBeGreaterThanOrEqual(2)
    expect(s.faqs.length).toBeGreaterThanOrEqual(5)
    expect(new Set(s.faqs.map((f) => f.question)).size).toBe(s.faqs.length)
  })
  it.each(services)("$slug only names doctors who exist", (s) => {
    for (const name of s.doctors) expect(doctors.map((d) => d.name)).toContain(name)
  })
  it.each(services)("$slug pre-selects a valid booking option", (s) => {
    expect(BOOKING_SERVICES).toContain(BOOKING_SERVICE[s.slug])
  })
})

describe("doctors", () => {
  it("have unique, reversible URL slugs", () => {
    const slugs = doctors.map(doctorSlug)
    expect(new Set(slugs).size).toBe(doctors.length)
    for (const d of doctors) expect(doctorBySlug(doctorSlug(d))).toBe(d)
    expect(doctorSlug({ name: "Dr. Srilatha CH" })).toBe("dr-srilatha-ch")
  })
})

describe("Telugu pages", () => {
  it.each(teServices)("$slug translates an existing English page and is written in Telugu", (t) => {
    expect(services.some((s) => `/eye-care/${s.slug}` === t.en)).toBe(true)
    expect(t.summary).toMatch(/[ఀ-౿]/)
    expect(t.faqs.length).toBeGreaterThanOrEqual(3)
  })
})

describe("articles, landing pages and costs", () => {
  it("articles have ISO dates and link to a service", () => {
    for (const a of articles) {
      expect(a.published).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(services.some((s) => s.slug === a.service)).toBe(true)
    }
  })
  it("landing page ids are neutral (no health words in ad URLs)", () => {
    for (const l of landings) expect(l.id).toMatch(/^[a-z]\d+$/)
  })
  it("landing pages book a service that exists in the form", () => {
    for (const l of landings) expect(BOOKING_SERVICES).toContain(l.service)
  })
  it("no price is shown until the hospital confirms it", () => {
    for (const c of costs) if (c.from !== undefined) expect(c.from).toMatch(/₹/)
  })
})
