import { describe, expect, it } from "vitest"
import { SITE_URL } from "../data/site"
import { applyHead, headTags, renderHead } from "./head"
import { metaFor, notFoundMeta } from "./routes"

describe("head tags", () => {
  it("include a canonical URL, Open Graph and Twitter tags for indexable pages", () => {
    const tags = headTags(metaFor("/services"))
    expect(tags).toContainEqual({ tag: "link", rel: "canonical", href: `${SITE_URL}/services` })
    const keys = tags.flatMap((t) => (t.tag === "meta" ? [t.key] : []))
    expect(keys).toEqual(expect.arrayContaining(["description", "robots", "og:title", "og:image", "twitter:card"]))
  })

  it("mark the 404 page noindex and give it no canonical", () => {
    const tags = headTags(notFoundMeta)
    expect(tags.some((t) => t.tag === "link" && t.rel === "canonical")).toBe(false)
    expect(tags).toContainEqual(expect.objectContaining({ key: "robots", content: "noindex, follow" }))
  })

  it("escape HTML in the static head", () => {
    const html = renderHead({ ...metaFor("/"), title: 'A "quoted" <b>title</b> & co' })
    expect(html).toContain("<title>A &quot;quoted&quot; &lt;b&gt;title&lt;/b&gt; &amp; co</title>")
  })

  it("replaces (not duplicates) the tags on client-side navigation", () => {
    applyHead(document, metaFor("/"))
    applyHead(document, metaFor("/contact"))
    expect(document.title).toBe(metaFor("/contact").title)
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1)
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_URL}/contact`)
  })
})
