import { beforeEach, describe, expect, it, vi } from "vitest"
import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const insert = vi.fn()
const from = vi.fn(() => ({ insert }))
vi.mock("../lib/supabase", () => ({ getSupabase: async () => ({ from }) }))

import { renderApp } from "../test/render"
import { services } from "../data/services"
import { SITE_URL } from "../data/site"

const ld = () => [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent ?? ""))

beforeEach(() => insert.mockReset())

describe("service detail pages", () => {
  it.each(services.map((s) => s.slug))("/eye-care/%s shows every section and MedicalWebPage schema", (slug) => {
    renderApp(`/eye-care/${slug}`)
    for (const h of ["Symptoms", "When to see a doctor", "How we diagnose it", "Treatment options", "Cost and cover", "Frequently Asked Questions"]) {
      expect(screen.getByRole("heading", { name: new RegExp(h, "i") })).toBeInTheDocument()
    }
    expect(screen.getByRole("table")).toBeInTheDocument()
    const page = ld().find((d) => d["@type"] === "MedicalWebPage")
    expect(page.url).toBe(`${SITE_URL}/eye-care/${slug}`)
    expect(ld().some((d) => d["@type"] === "FAQPage")).toBe(true)
  })

  it("has three-level breadcrumbs, visible and in schema", () => {
    renderApp("/eye-care/glaucoma")
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" })
    expect(within(nav).getAllByRole("link").map((a) => a.textContent)).toEqual(["Home", "Eye Care"])
    const crumbs = ld().find((d) => d["@type"] === "BreadcrumbList")
    expect(crumbs.itemListElement.map((i: { name: string }) => i.name)).toEqual(["Home", "Eye Care", "Glaucoma Treatment"])
  })

  it("books with the service and doctor pre-selected (page-to-form integration)", async () => {
    const user = userEvent.setup()
    renderApp("/eye-care/cataract-surgery")
    const cta = screen.getAllByRole("link", { name: "Book an Appointment" }).find((a) => a.getAttribute("href")?.includes("service="))!
    await user.click(cta)
    expect(screen.getByRole("heading", { level: 1, name: /book an appointment/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/service/i)).toHaveValue("Cataract Surgery")
    expect(screen.getByLabelText(/preferred doctor/i)).toHaveValue("Dr. Srilatha CH")
  })

  it("unknown service slugs show the 404 page", () => {
    renderApp("/eye-care/not-a-service")
    expect(screen.getByRole("heading", { level: 1, name: "Page not found" })).toBeInTheDocument()
  })
})

describe("doctor profiles", () => {
  it("show qualifications, timings and the conditions the doctor treats", () => {
    renderApp("/doctors/dr-swetha-t")
    expect(screen.getByRole("heading", { level: 1, name: "Dr. Swetha T" })).toBeInTheDocument()
    expect(screen.getByText(/MBBS, MS \(Ophthalmology\), FICO/)).toBeInTheDocument()
    expect(within(screen.getByRole("main")).getByRole("link", { name: "Children's Eye Care and Squint" })).toHaveAttribute("href", "/eye-care/childrens-eye-care")
    expect(ld().some((d) => d["@type"] === "Physician" && d.name === "Dr. Swetha T")).toBe(true)
  })
  it("are linked from the doctors list", () => {
    renderApp("/doctors")
    expect(screen.getByRole("link", { name: "Dr. Ram Kumar" })).toHaveAttribute("href", "/doctors/dr-ram-kumar")
  })
})

describe("patient pages", () => {
  it("costs page never shows an unconfirmed price", () => {
    renderApp("/patients/costs")
    expect(screen.getAllByText("Call for current price").length).toBeGreaterThan(3)
    expect(screen.queryByText(/₹/)).not.toBeInTheDocument()
  })
  it("insurance page lists schemes, insurers and the cashless steps", () => {
    renderApp("/patients/insurance")
    expect(screen.getByText("Aarogyasri")).toBeInTheDocument()
    expect(screen.getByText("Star Health")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "How cashless treatment works" })).toBeInTheDocument()
  })
  it("health library article publishes Article schema with dates", () => {
    renderApp("/health-library/diabetes-and-your-eyes")
    const a = ld().find((d) => d["@type"] === "Article")
    expect(a.datePublished).toBe("2026-11-10")
  })
})

describe("Telugu pages", () => {
  it("are marked lang=te and link back to English with hreflang", () => {
    renderApp("/te/cataract-surgery")
    expect(document.documentElement.lang).toBe("te-IN")
    expect(document.head.querySelector('link[hreflang="en-IN"]')).toHaveAttribute("href", `${SITE_URL}/eye-care/cataract-surgery`)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("క్యాటరాక్ట్")
    expect(screen.getByRole("link", { name: "Read in English" })).toHaveAttribute("href", "/eye-care/cataract-surgery")
  })
  it("English page points to its Telugu version", () => {
    renderApp("/eye-care/cataract-surgery")
    expect(document.documentElement.lang).toBe("en-IN")
    expect(document.head.querySelector('link[hreflang="te-IN"]')).toHaveAttribute("href", `${SITE_URL}/te/cataract-surgery`)
  })
  it("navigation offers Telugu", () => {
    renderApp("/")
    expect(screen.getAllByRole("link", { name: "తెలుగు" })[0]).toHaveAttribute("href", "/te")
  })
})

describe("ad landing pages", () => {
  it("have no site navigation, are noindex and submit a call-back request", async () => {
    insert.mockResolvedValue({ error: null })
    const user = userEvent.setup()
    renderApp("/lp/a2")
    expect(screen.queryByRole("link", { name: "Doctors" })).not.toBeInTheDocument()
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow")
    await user.type(screen.getByLabelText("Your name"), "Ramesh")
    await user.type(screen.getByLabelText("Mobile number"), "9876543210")
    await user.click(screen.getByRole("button", { name: "Request a call back" }))
    expect(await screen.findByRole("heading", { name: "Request received" })).toBeInTheDocument()
    expect(insert.mock.calls[0][0][0]).toMatchObject({ name: "Ramesh", phonenumber: "9876543210", service: "Cataract Surgery" })
  })
  it("show the error and keep the form when booking fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    insert.mockResolvedValue({ error: { message: "down" } })
    const user = userEvent.setup()
    renderApp("/lp/a1")
    await user.type(screen.getByLabelText("Your name"), "Ramesh")
    await user.type(screen.getByLabelText("Mobile number"), "9876543210")
    await user.click(screen.getByRole("button", { name: "Request a call back" }))
    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't submit/i)
  })
  it("unknown landing ids show 404", () => {
    renderApp("/lp/zz")
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument()
  })
})

describe("site-wide conversion and performance features", () => {
  it("phones get a sticky Call / WhatsApp / Book bar", () => {
    renderApp("/services")
    const bar = screen.getByRole("navigation", { name: "Quick contact" })
    expect(within(bar).getByRole("link", { name: /call/i })).toHaveAttribute("href", "tel:+919885029367")
    expect(within(bar).getByRole("link", { name: /book/i })).toHaveAttribute("href", "/appointment")
  })
  it("Google Maps loads only after the visitor asks for it", async () => {
    const user = userEvent.setup()
    const { container } = renderApp("/contact")
    expect(container.querySelector("iframe")).toBeNull()
    await user.click(screen.getByRole("button", { name: "Show map" }))
    expect(container.querySelector("iframe")).toHaveAttribute("title", "Sri Harsha Eye Hospital location")
  })
})
