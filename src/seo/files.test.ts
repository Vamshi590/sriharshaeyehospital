import { describe, expect, it } from "vitest"
import { SITE_URL } from "../data/site"
import { ALLOWED_BOTS, llmsTxt, robotsTxt, sitemapXml } from "./files"
import { indexableRoutes } from "./routes"

describe("sitemap.xml", () => {
  const xml = sitemapXml("2026-11-10")
  it("lists every indexable route with an absolute URL and lastmod", () => {
    for (const r of indexableRoutes) expect(xml).toContain(`<loc>${SITE_URL}${r.path}</loc>`)
    expect(xml.match(/<url>/g)).toHaveLength(indexableRoutes.length)
    expect(xml).toContain("<lastmod>2026-11-10</lastmod>")
  })
  it("leaves out the 404 page and the removed testimonials page", () => {
    expect(xml).not.toContain("/404")
    expect(xml).not.toContain("/testimonials")
  })
  it("is well-formed XML", () => {
    const doc = new DOMParser().parseFromString(xml, "application/xml")
    expect(doc.getElementsByTagName("parsererror")).toHaveLength(0)
  })
})

describe("robots.txt", () => {
  const txt = robotsTxt()
  it("allows search engines and AI assistants, and points at the sitemap", () => {
    for (const bot of ALLOWED_BOTS) expect(txt).toContain(`User-agent: ${bot}\nAllow: /`)
    expect(txt).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`)
    expect(txt).not.toMatch(/Disallow: \/\s*$/m)
  })
  it("keeps ad landing pages out of search", () => {
    expect(txt).toContain("Disallow: /lp/")
  })
})

describe("llms.txt", () => {
  it("states the hospital's key facts in plain text", () => {
    const txt = llmsTxt()
    expect(txt).toMatch(/^# Sri Harsha Eye Hospital/)
    expect(txt).toContain("Karimnagar, Telangana 505001")
    expect(txt).toContain("NABH")
  })
})
