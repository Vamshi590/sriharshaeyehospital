import { describe, expect, it } from "vitest"
import { matchPath } from "react-router-dom"
import { ROUTE_PATTERNS } from "../routes-table"
import { indexableRoutes, metaFor, notFoundMeta, routes } from "./routes"

describe("route metadata", () => {
  it("has a unique title and description for every route", () => {
    expect(new Set(routes.map((r) => r.title)).size).toBe(routes.length)
    expect(new Set(routes.map((r) => r.description)).size).toBe(routes.length)
  })

  it.each(routes)("$path has a title of at most 60 characters", (r) => {
    expect(r.title.length).toBeLessThanOrEqual(60)
  })

  it.each(indexableRoutes.filter((r) => !r.path.startsWith("/doctors/") && !r.path.startsWith("/health-library/")))(
    "$path names the hospital in its title",
    (r) => {
      expect(r.title).toMatch(/Sri Harsha|శ్రీ హర్ష/)
    },
  )

  it.each(routes)("$path has a description between 70 and 165 characters", (r) => {
    expect(r.description.length).toBeGreaterThanOrEqual(70)
    expect(r.description.length).toBeLessThanOrEqual(165)
  })

  it("mentions Karimnagar on every indexable page (local SEO)", () => {
    for (const r of indexableRoutes.filter((x) => !x.path.startsWith("/health-library/"))) expect(`${r.title} ${r.description}`, r.path).toMatch(/Karimnagar|కరీంనగర్/)
  })

  it("maps every page to a route in App.tsx", () => {
    for (const r of routes) {
      expect(ROUTE_PATTERNS.some((p) => matchPath(p, r.path)), r.path).toBe(true)
    }
  })

  it("has metadata for every fixed route in App.tsx", () => {
    for (const p of ROUTE_PATTERNS.filter((x) => !x.includes(":"))) {
      expect(routes.some((r) => r.path === p), p).toBe(true)
    }
  })

  it("links every Telugu page to an English page and back (hreflang pairs)", () => {
    for (const r of routes.filter((x) => x.lang === "te")) {
      expect(r.alternate, r.path).toBeDefined()
      const en = routes.find((x) => x.path === r.alternate)!
      expect(en.alternate, en.path).toBe(r.path)
    }
  })

  it("keeps ad landing pages out of search", () => {
    for (const r of routes.filter((x) => x.path.startsWith("/lp/"))) expect(r.noindex).toBe(true)
    expect(indexableRoutes.some((r) => r.path.startsWith("/lp/"))).toBe(false)
  })

  it("resolves trailing slashes and falls back to the 404 meta", () => {
    expect(metaFor("/doctors/").path).toBe("/doctors")
    expect(metaFor("/testimonials")).toBe(notFoundMeta)
    expect(notFoundMeta.noindex).toBe(true)
  })
})
