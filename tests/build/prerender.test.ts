/**
 * Integration tests for the production build (run `npm run build` first, or `npm run test:all`).
 * They check what Google, Bing and AI crawlers actually receive: static HTML, not JavaScript.
 */
import { describe, expect, it } from "vitest"
import fs from "node:fs"
import path from "node:path"

const dist = path.resolve(__dirname, "../../dist")
const read = (f: string) => fs.readFileSync(path.join(dist, f), "utf8")
const fileFor = (route: string) => (route === "/" ? "index.html" : `${route.slice(1)}.html`)
const built = fs.existsSync(path.join(dist, "sitemap.xml"))
/** Every indexable page, taken from the built sitemap. */
const pages: (readonly [string, string])[] = built
  ? [...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
      const route = new URL(m[1]).pathname
      return [route, fileFor(route)] as const
    })
  : []
const landingFiles = built ? fs.readdirSync(path.join(dist, "lp")).map((f) => `lp/${f}`) : []

const between = (html: string, re: RegExp) => [...html.matchAll(re)].map((m) => m[1])
const ldBlocks = (html: string) =>
  between(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g).map((j) => JSON.parse(j))
const text = (html: string) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ")

describe.runIf(built)("prerendered build", () => {
  it.each(pages)("%s is static HTML with real content (no empty root)", (_, file) => {
    const html = read(file)
    expect(html).not.toContain('<div id="root"></div>')
    expect(html).not.toContain("<!--app-html-->")
    expect(html).not.toContain("<!--app-head-->")
    expect(text(html).split(/\s+/).filter(Boolean).length).toBeGreaterThan(150)
  })

  it.each(pages)("%s has one <title>, one H1, a description and a canonical URL", (route, file) => {
    const html = read(file)
    expect(between(html, /<title>([^<]*)<\/title>/g)).toHaveLength(1)
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1)
    expect(html).toMatch(/<meta name="description" content="[^"]{70,}"/)
    const canonical = between(html, /<link rel="canonical" href="([^"]+)"/g)
    expect(canonical).toHaveLength(1)
    expect(new URL(canonical[0]).pathname).toBe(route)
  })

  it("builds every main section of the site", () => {
    const routes = pages.map(([r]) => r)
    for (const r of ["/", "/services", "/eye-care/cataract-surgery", "/doctors/dr-srilatha-ch", "/patients/costs", "/about", "/health-library", "/te", "/te/cataract-surgery", "/contact"]) {
      expect(routes, r).toContain(r)
    }
    expect(pages.length).toBeGreaterThanOrEqual(35)
  })

  it("has no broken internal links anywhere in the built site", () => {
    const exists = (route: string) => route === "/" || fs.existsSync(path.join(dist, fileFor(route)))
    const all = [...pages.map(([, f]) => f), ...landingFiles]
    const broken: string[] = []
    for (const f of all) {
      for (const [, href] of read(f).matchAll(/<a[^>]+href="(\/[^"#?]*)/g)) {
        if (href.startsWith("/assets/")) continue
        if (!exists(href.replace(/\/$/, "") || "/")) broken.push(`${f} -> ${href}`)
      }
    }
    expect(broken).toEqual([])
  })

  it("marks Telugu pages lang=te-IN and pairs them with English via hreflang", () => {
    expect(read("te/cataract-surgery.html")).toContain('<html lang="te-IN">')
    expect(read("te/cataract-surgery.html")).toMatch(/hreflang="en-IN" href="[^"]+\/eye-care\/cataract-surgery"/)
    expect(read("eye-care/cataract-surgery.html")).toMatch(/hreflang="te-IN" href="[^"]+\/te\/cataract-surgery"/)
    expect(read("index.html")).toContain('<html lang="en-IN">')
  })

  it("builds the ad landing pages as noindex and keeps them out of the sitemap", () => {
    expect(landingFiles.length).toBe(3)
    for (const f of landingFiles) {
      const html = read(f)
      expect(html).toContain('content="noindex, follow"')
      expect(html.match(/<h1[\s>]/g)).toHaveLength(1)
    }
    expect(read("sitemap.xml")).not.toContain("/lp/")
  })

  it("gives every page a different title", () => {
    const titles = pages.map(([, f]) => between(read(f), /<title>([^<]*)<\/title>/g)[0])
    expect(new Set(titles).size).toBe(pages.length)
  })

  it.each(pages)("%s ships valid JSON-LD including the Hospital", (_, file) => {
    const blocks = ldBlocks(read(file))
    expect(blocks.some((b) => Array.isArray(b["@type"]) && b["@type"].includes("Hospital"))).toBe(true)
  })

  it("puts FAQPage markup on home and contact, Physician markup on doctors", () => {
    expect(ldBlocks(read("index.html")).some((b) => b["@type"] === "FAQPage")).toBe(true)
    expect(ldBlocks(read("eye-care/glaucoma.html")).some((b) => b["@type"] === "MedicalWebPage")).toBe(true)
    expect(ldBlocks(read("health-library/diabetes-and-your-eyes.html")).some((b) => b["@type"] === "Article")).toBe(true)
    expect(ldBlocks(read("contact.html")).some((b) => b["@type"] === "FAQPage")).toBe(true)
    const graph = ldBlocks(read("doctors.html")).find((b) => b["@graph"])
    expect(graph["@graph"].length).toBeGreaterThanOrEqual(6)
  })

  it.each(pages)("%s has Open Graph tags for WhatsApp / Instagram previews", (_, file) => {
    const html = read(file)
    for (const p of ["og:title", "og:description", "og:image", "og:url"]) expect(html).toContain(`property="${p}"`)
  })

  it("serves a noindex 404 page", () => {
    const html = read("404.html")
    expect(html).toContain('content="noindex, follow"')
    expect(html).not.toContain('rel="canonical"')
    expect(html).toContain("Page not found")
  })

  it("no longer builds a testimonials page or patient quotes", () => {
    expect(fs.existsSync(path.join(dist, "testimonials.html"))).toBe(false)
    for (const [, f] of pages) expect(read(f).toLowerCase()).not.toContain("testimonial")
  })

  it("keeps the hero eye illustration on the home page, loaded first", () => {
    const html = read("index.html")
    const eye = html.match(/<img[^>]*alt="Illustration of a human eye"[^>]*>/)?.[0] ?? ""
    expect(eye).toMatch(/fetchpriority="high"/i)
    expect(eye).toMatch(/width="732"/)
    expect(html).toMatch(/<link rel="preload" as="image" href="\/assets\/eye-[^"]+\.webp"/)
  })

  it("publishes sitemap.xml, robots.txt, llms.txt and the share image", () => {
    expect(read("sitemap.xml")).toContain("<loc>")
    expect(read("robots.txt")).toMatch(/Sitemap: https?:\/\/[^\s]+\/sitemap\.xml/)
    expect(read("robots.txt")).toContain("User-agent: OAI-SearchBot")
    expect(read("llms.txt")).toContain("# Sri Harsha Eye Hospital")
    expect(fs.statSync(path.join(dist, "og-image.png")).size).toBeGreaterThan(10_000)
  })

  it("keeps the main JavaScript bundle under 400 KB", () => {
    const js = fs.readdirSync(path.join(dist, "assets")).filter((f) => f.endsWith(".js"))
    for (const f of js) expect(fs.statSync(path.join(dist, "assets", f)).size, f).toBeLessThan(400_000)
  })
})

describe("vercel.json", () => {
  const cfg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../vercel.json"), "utf8"))
  it("serves the prerendered files instead of rewriting every URL to index.html", () => {
    expect(cfg.rewrites ?? []).toHaveLength(0)
    expect(cfg.cleanUrls).toBe(true)
  })
  it("sends security headers", () => {
    const keys = cfg.headers.flatMap((h: { headers: { key: string }[] }) => h.headers.map((x) => x.key))
    expect(keys).toEqual(expect.arrayContaining(["Strict-Transport-Security", "X-Content-Type-Options"]))
  })
})
