import fs from "node:fs"
import path from "node:path"
import type { Page } from "@playwright/test"

/** Every public page, read from the built sitemap (so new pages are tested automatically). */
export function sitemapPaths(): string[] {
  const file = path.resolve(import.meta.dirname, "../../dist/sitemap.xml")
  if (!fs.existsSync(file)) throw new Error("dist/sitemap.xml not found: run `npm run build` before the e2e tests")
  return [...fs.readFileSync(file, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
}

/** Collects console errors, uncaught exceptions and failed requests (ignoring third-party Google embeds). */
export function watchErrors(page: Page) {
  const errors: string[] = []
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`)
  })
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`))
  page.on("requestfailed", (r) => {
    if (!/google|gstatic|googletagmanager/.test(r.url())) errors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`)
  })
  return errors
}

/** Scrolls through the page so lazy images load, then back to the top. */
export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 30))
    }
    window.scrollTo(0, 0)
  })
}

/**
 * Interactive elements smaller than 24x24 CSS px (WCAG 2.2 SC 2.5.8, target size minimum).
 * Inline links inside running text are exempt, as the guideline allows.
 */
export async function smallTargets(page: Page) {
  return page.evaluate(() => {
    const out: string[] = []
    for (const el of document.querySelectorAll<HTMLElement>("a[href], button, input:not([type=hidden]), select, textarea, summary")) {
      const r = el.getBoundingClientRect()
      const st = getComputedStyle(el)
      if (r.width === 0 || r.height === 0 || st.visibility === "hidden") continue
      if (el.closest("[aria-hidden='true']")) continue
      if (el.classList.contains("sr-only") || (el.tagName === "INPUT" && el.closest("label"))) continue
      if (el.tagName === "A" && st.display === "inline" && el.closest("p, li, dd, span")) continue
      if (r.width < 24 || r.height < 24) {
        const name = (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 40)
        out.push(`${el.tagName.toLowerCase()} "${name}" ${Math.round(r.width)}x${Math.round(r.height)}`)
      }
    }
    return out
  })
}
