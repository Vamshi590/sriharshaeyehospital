import { afterEach, describe, expect, it, vi } from "vitest"
import fs from "node:fs"
import path from "node:path"

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe("canonical domain", () => {
  it("advertises the hospital's own domain, not the vercel.app address", async () => {
    const { SITE_URL } = await import("../data/site")
    expect(SITE_URL).toBe("https://www.sriharshaeyehospital.com")
  })

  it("ignores a VITE_SITE_URL that points at vercel.app", async () => {
    vi.stubEnv("VITE_SITE_URL", "https://sriharshaeyehospital.vercel.app")
    const { SITE_URL } = await import("../data/site")
    expect(SITE_URL).toBe("https://www.sriharshaeyehospital.com")
  })

  it("honours a VITE_SITE_URL override for another real domain, without a trailing slash", async () => {
    vi.stubEnv("VITE_SITE_URL", "https://example.org/")
    const { SITE_URL } = await import("../data/site")
    expect(SITE_URL).toBe("https://example.org")
  })

  it("permanently redirects every path on the old vercel.app address to the same path on the domain", () => {
    const config = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, "../../vercel.json"), "utf8"))
    // "/(.*)" (not "/:path*") so the home page "/" is redirected too.
    expect(config.redirects).toContainEqual({
      source: "/(.*)",
      has: [{ type: "host", value: "sriharshaeyehospital.vercel.app" }],
      destination: "https://www.sriharshaeyehospital.com/$1",
      permanent: true,
    })
  })
})

describe("search-engine verification tags", () => {
  it("are absent unless configured", async () => {
    const { headTags } = await import("./head")
    const keys = headTags({ path: "/", title: "t", description: "d" } as never).map((t) => ("key" in t ? t.key : ""))
    expect(keys).not.toContain("google-site-verification")
    expect(keys).not.toContain("msvalidate.01")
  })

  it("are rendered when the tokens are set", async () => {
    vi.stubEnv("VITE_GOOGLE_SITE_VERIFICATION", "abc123")
    vi.stubEnv("VITE_BING_SITE_VERIFICATION", "XYZ789")
    const { renderHead } = await import("./head")
    const html = renderHead({ path: "/", title: "t", description: "d" } as never)
    expect(html).toContain('<meta name="google-site-verification" content="abc123" data-seo />')
    expect(html).toContain('<meta name="msvalidate.01" content="XYZ789" data-seo />')
  })
})
