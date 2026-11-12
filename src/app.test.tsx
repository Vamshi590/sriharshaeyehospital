import { describe, expect, it } from "vitest"
import { screen, within } from "@testing-library/react"
import { renderApp } from "./test/render"
import { metaFor, routes } from "./seo/routes"
import { SITE_URL } from "./data/site"

const jsonLd = () =>
  [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent ?? ""))

describe("every page", () => {
  it.each(routes.map((r) => r.path))("%s renders exactly one H1 and sets its own title", async (path) => {
    renderApp(path)
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
    expect(document.title).toBe(metaFor(path).title)
    const canonical = document.head.querySelector('link[rel="canonical"]')
    if (metaFor(path).noindex) expect(canonical).toBeNull()
    else expect(canonical).toHaveAttribute("href", path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`)
  })

  it.each(routes.map((r) => r.path))("%s carries the hospital's structured data", (path) => {
    renderApp(path)
    expect(jsonLd().some((d) => Array.isArray(d["@type"]) && d["@type"].includes("Hospital"))).toBe(true)
  })

  it.each(routes.map((r) => r.path))("%s does not skip heading levels", (path) => {
    const { container } = renderApp(path)
    const levels = [...container.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => Number(h.tagName[1]))
    levels.forEach((lvl, i) => {
      if (i > 0) expect(lvl - levels[i - 1], `heading ${i} jumps from h${levels[i - 1]} to h${lvl}`).toBeLessThanOrEqual(1)
    })
  })

  it.each(routes.map((r) => r.path))("%s gives every image alt text and dimensions or lazy loading", (path) => {
    const { container } = renderApp(path)
    for (const img of container.querySelectorAll("img")) {
      expect(img).toHaveAttribute("alt")
      const sized = img.hasAttribute("width") && img.hasAttribute("height")
      const deferred = img.getAttribute("loading") === "lazy" || img.getAttribute("fetchpriority") === "high"
      expect(sized || deferred, img.outerHTML.slice(0, 120)).toBe(true)
    }
  })
})

describe("navigation", () => {
  it("no longer links to the testimonials page", () => {
    renderApp("/")
    expect(screen.queryByRole("link", { name: /testimonials/i })).not.toBeInTheDocument()
  })

  it("shows both phone numbers in the footer", () => {
    renderApp("/")
    const footer = screen.getByRole("contentinfo")
    expect(within(footer).getByRole("link", { name: "+91 98850 29367" })).toHaveAttribute("href", "tel:+919885029367")
    expect(within(footer).getByRole("link", { name: "+91 79950 29367" })).toHaveAttribute("href", "tel:+917995029367")
  })
})

describe("unknown URLs", () => {
  it.each(["/testimonials", "/does-not-exist"])("%s shows the 404 page and is noindex", (path) => {
    renderApp(path)
    expect(screen.getByRole("heading", { level: 1, name: "Page not found" })).toBeInTheDocument()
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow")
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
  })
})

describe("page-specific structured data", () => {
  it("home and contact publish FAQPage markup that matches the visible questions", () => {
    for (const path of ["/", "/contact"]) {
      const { unmount } = renderApp(path)
      const faq = jsonLd().find((d) => d["@type"] === "FAQPage")
      expect(faq, path).toBeDefined()
      for (const q of faq.mainEntity) expect(screen.getByText(q.name)).toBeInTheDocument()
      unmount()
    }
  })

  it("doctors page publishes a Physician entry for each doctor card", () => {
    renderApp("/doctors")
    const graph = jsonLd().find((d) => d["@graph"])["@graph"]
    const cards = screen.getAllByRole("heading", { level: 2 })
    expect(graph.map((p: { name: string }) => p.name)).toEqual(cards.map((h) => h.textContent))
  })

  it("inner pages publish breadcrumbs", () => {
    renderApp("/services")
    expect(jsonLd().some((d) => d["@type"] === "BreadcrumbList")).toBe(true)
  })
})
