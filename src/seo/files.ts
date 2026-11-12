import { SITE_URL, absoluteUrl } from "../data/site"
import { HOSPITAL_NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, PHONE_DISPLAY, PHONE2_DISPLAY, EMAIL, OPENING_HOURS } from "../data/contact"
import { SITE } from "../data/site"
import { indexableRoutes } from "./routes"

export function sitemapXml(lastmod: string): string {
  const urls = indexableRoutes
    .map(
      (r) =>
        `  <url>\n    <loc>${absoluteUrl(r.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`,
    )
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/** Search and AI-assistant crawlers we explicitly welcome. */
export const ALLOWED_BOTS = ["Googlebot", "Bingbot", "OAI-SearchBot", "GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Applebot"]

export function robotsTxt(): string {
  const groups = ALLOWED_BOTS.map((b) => `User-agent: ${b}\nAllow: /\nDisallow: /lp/`).join("\n\n")
  return `${groups}\n\nUser-agent: *\nAllow: /\nDisallow: /lp/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
}

/** Plain-language summary for AI assistants (llms.txt). Optional: Google ignores it, others may read it. */
export function llmsTxt(): string {
  const pages = indexableRoutes.map((r) => `- [${r.label}](${absoluteUrl(r.path)}): ${r.description}`).join("\n")
  const hours = OPENING_HOURS.map((h) => `${h.label} ${h.display}`).join("; ")
  return `# ${HOSPITAL_NAME}\n\n> ${SITE.shortDescription}\n\n- Address: ${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}\n- Phone: ${PHONE_DISPLAY}, ${PHONE2_DISPLAY}\n- Email: ${EMAIL}\n- Hours: ${hours}\n- Accreditation: ${SITE.accreditation}\n- Schemes accepted: ${SITE.schemes.join(", ")}\n- Languages: ${SITE.languages.join(", ")}\n\n## Pages\n\n${pages}\n`
}
