import { SITE, absoluteUrl } from "../data/site"
import { HOSPITAL_NAME } from "../data/contact"
import type { RouteMeta } from "./routes"

export type HeadTag =
  | { tag: "meta"; attr: "name" | "property"; key: string; content: string }
  | { tag: "link"; rel: string; href: string; hreflang?: string }

/** The head tags for a route, shared by the prerender script (static HTML) and the client (SPA navigation). */
export function headTags(meta: RouteMeta): HeadTag[] {
  const url = absoluteUrl(meta.path === "/404" ? "/" : meta.path)
  const image = absoluteUrl(SITE.ogImage)
  const tags: HeadTag[] = [
    { tag: "meta", attr: "name", key: "description", content: meta.description },
    { tag: "meta", attr: "name", key: "robots", content: meta.noindex ? "noindex, follow" : "index, follow, max-image-preview:large" },
    { tag: "meta", attr: "property", key: "og:type", content: "website" },
    { tag: "meta", attr: "property", key: "og:site_name", content: HOSPITAL_NAME },
    { tag: "meta", attr: "property", key: "og:locale", content: meta.lang === "te" ? "te_IN" : "en_IN" },
    { tag: "meta", attr: "property", key: "og:title", content: meta.title },
    { tag: "meta", attr: "property", key: "og:description", content: meta.description },
    { tag: "meta", attr: "property", key: "og:url", content: url },
    { tag: "meta", attr: "property", key: "og:image", content: image },
    { tag: "meta", attr: "property", key: "og:image:width", content: "1200" },
    { tag: "meta", attr: "property", key: "og:image:height", content: "630" },
    { tag: "meta", attr: "name", key: "twitter:card", content: "summary_large_image" },
    { tag: "meta", attr: "name", key: "twitter:title", content: meta.title },
    { tag: "meta", attr: "name", key: "twitter:description", content: meta.description },
    { tag: "meta", attr: "name", key: "twitter:image", content: image },
  ]
  if (!meta.noindex) tags.push({ tag: "link", rel: "canonical", href: url })
  if (meta.alternate && !meta.noindex) {
    const lang = meta.lang ?? "en"
    const other = lang === "te" ? "en" : "te"
    tags.push({ tag: "link", rel: "alternate", hreflang: `${lang}-IN`, href: url })
    tags.push({ tag: "link", rel: "alternate", hreflang: `${other}-IN`, href: absoluteUrl(meta.alternate) })
    tags.push({ tag: "link", rel: "alternate", hreflang: "x-default", href: absoluteUrl(lang === "en" ? meta.path : meta.alternate) })
  }
  return tags
}

export const htmlLang = (meta: RouteMeta) => (meta.lang === "te" ? "te-IN" : "en-IN")

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

/** Static HTML for the <head>, used at build time. */
export function renderHead(meta: RouteMeta): string {
  const lines = [`<title>${esc(meta.title)}</title>`]
  for (const t of headTags(meta)) {
    if (t.tag === "meta") lines.push(`<meta ${t.attr}="${t.key}" content="${esc(t.content)}" data-seo />`)
    else lines.push(`<link rel="${t.rel}"${t.hreflang ? ` hreflang="${t.hreflang}"` : ""} href="${esc(t.href)}" data-seo />`)
  }
  return lines.join("\n    ")
}

/** Apply the same tags to a live document (client-side navigation). */
export function applyHead(doc: Document, meta: RouteMeta) {
  doc.title = meta.title
  doc.documentElement.lang = htmlLang(meta)
  doc.head.querySelectorAll("[data-seo]").forEach((el) => el.remove())
  for (const t of headTags(meta)) {
    const el = doc.createElement(t.tag)
    if (t.tag === "meta") {
      el.setAttribute(t.attr, t.key)
      el.setAttribute("content", t.content)
    } else {
      el.setAttribute("rel", t.rel)
      if (t.hreflang) el.setAttribute("hreflang", t.hreflang)
      el.setAttribute("href", t.href)
    }
    el.setAttribute("data-seo", "")
    doc.head.appendChild(el)
  }
}
