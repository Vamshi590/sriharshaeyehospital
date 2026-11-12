import { expect, test } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import { scrollThrough, sitemapPaths, smallTargets, watchErrors } from "./helpers"

/**
 * Every page in the sitemap, on a phone and on a desktop, served from the production build.
 * Catches: runtime / hydration errors, broken images, sideways scrolling, heading structure,
 * accessibility violations (axe-core, WCAG 2.2 AA) and tap targets that are too small.
 */
const pages = [...sitemapPaths(), "/lp/a1", "/lp/a2", "/lp/a3"]

for (const path of pages) {
  test.describe(`page ${path}`, () => {
    test("loads without errors, broken images or sideways scrolling", async ({ page }) => {
      const errors = watchErrors(page)
      const response = await page.goto(path, { waitUntil: "networkidle" })
      expect(response?.status(), "HTTP status").toBe(200)
      await scrollThrough(page)
      await page.waitForLoadState("networkidle")

      expect(errors, "console / hydration / network errors").toEqual([])

      const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src))
      expect(broken, "broken images").toEqual([])

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow, "page wider than the screen").toBeLessThanOrEqual(0)

      await expect(page.locator("h1"), "exactly one main heading").toHaveCount(1)
      await expect(page.locator("h1")).toBeVisible()
      expect(await page.title()).not.toBe("")
    })

    test("has no serious accessibility violations (WCAG 2.2 AA)", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" }) // stable screenshots of animated parts
      await page.goto(path, { waitUntil: "networkidle" })
      await scrollThrough(page)
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .exclude("iframe") // Google Maps embed is third-party
        .analyze()
      const serious = results.violations
        .filter((v) => v.impact === "serious" || v.impact === "critical")
        .map((v) => `${v.id} (${v.impact}): ${v.help} -> ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`)
      expect(serious).toEqual([])
    })

    test("buttons and links are big enough to tap (WCAG 2.5.8)", async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" })
      expect(await smallTargets(page)).toEqual([])
    })
  })
}

test("unknown addresses show the 404 page without errors", async ({ page }) => {
  const errors = watchErrors(page)
  await page.goto("/this-page-does-not-exist", { waitUntil: "networkidle" })
  await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible()
  expect(errors.filter((e) => !e.includes("404"))).toEqual([])
})

test("unknown doctor and eye-care addresses show the 404 page", async ({ page }) => {
  for (const path of ["/doctors/dr-nobody", "/eye-care/not-a-service"]) {
    await page.goto(path, { waitUntil: "networkidle" })
    await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible()
  }
})

test("every internal link points to a page that exists", async ({ page, request }) => {
  const seen = new Set<string>()
  for (const path of sitemapPaths()) {
    await page.goto(path)
    const hrefs = await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")!.split("#")[0].split("?")[0]))
    hrefs.forEach((h) => seen.add(h || "/"))
  }
  const broken: string[] = []
  for (const href of seen) {
    const res = await request.get(href)
    const html = await res.text()
    // Each prerendered page records the URL it was built for; a missing page falls back to another file.
    if (res.status() !== 200 || !html.includes(`data-prerendered="${href}"`)) broken.push(href)
  }
  expect(broken).toEqual([])
})
