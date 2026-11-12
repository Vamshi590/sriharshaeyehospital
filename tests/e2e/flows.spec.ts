import { expect, test, type Page } from "@playwright/test"
import { BOOKING_URL, FAKE_SUPABASE } from "../../playwright.config"
import { watchErrors } from "./helpers"

/** Thursday 12 Nov 2026, 7 AM in Karimnagar. 16 Nov = Monday, 22 Nov = 4th Sunday (Dr. Ram Kumar). */
const NOW = new Date("2026-11-12T07:00:00+05:30")

/** Intercepts the Supabase insert (nothing reaches a real database) and records the rows sent. */
async function fakeSupabase(page: Page, status = 201) {
  const rows: Record<string, unknown>[] = []
  await page.route(`${FAKE_SUPABASE}/rest/v1/Appointments*`, async (route) => {
    rows.push(...(route.request().postDataJSON() as Record<string, unknown>[]))
    await route.fulfill({ status, contentType: "application/json", body: status < 300 ? "" : JSON.stringify({ message: "denied" }) })
  })
  return rows
}

async function fillBooking(page: Page, { doctor = "", date = "2026-11-16", time = "10:00 AM" } = {}) {
  await page.getByLabel("Full Name").fill("Lakshmi Devi")
  await page.getByLabel("Phone Number").fill("98850 29367")
  await page.getByLabel("Service").selectOption("Cataract Surgery")
  if (doctor) await page.getByLabel("Preferred Doctor").selectOption(doctor)
  await page.getByLabel("Preferred Date").fill(date)
  await page.getByRole("radio", { name: time }).check({ force: true }) // radios are visually styled labels
}

test.describe("booking an appointment (real browser, Supabase intercepted)", () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(NOW)
  })

  test("a patient books and sees a confirmation", async ({ page }) => {
    const rows = await fakeSupabase(page)
    const errors = watchErrors(page)
    await page.goto(`${BOOKING_URL}/appointment`)
    await fillBooking(page)
    await page.getByRole("button", { name: "Request Appointment" }).click()

    await expect(page.getByRole("heading", { name: "Appointment Request Received!" })).toBeFocused()
    await expect(page.getByRole("status")).toContainText("Monday, 16 November, 10:00 AM")
    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({
      name: "Lakshmi Devi",
      phonenumber: "98850 29367",
      service: "Cataract Surgery",
      doctor: "",
      prefferedDate: "2026-11-16",
      prefferedTime: "10:00 AM",
      email: "",
    })
    expect(errors).toEqual([])
  })

  test("a failed save keeps the form and offers the phone number", async ({ page }) => {
    await fakeSupabase(page, 500)
    await page.goto(`${BOOKING_URL}/appointment`)
    await fillBooking(page)
    await page.getByRole("button", { name: "Request Appointment" }).click()
    await expect(page.getByRole("alert")).toContainText("couldn't submit your request")
    await expect(page.getByRole("button", { name: "Request Appointment" })).toBeEnabled()
    await expect(page.getByLabel("Full Name")).toHaveValue("Lakshmi Devi")
  })

  test("a lost connection doesn't leave the form stuck on 'Submitting...'", async ({ page }) => {
    await page.route(`${FAKE_SUPABASE}/**`, (route) => route.abort("internetdisconnected"))
    await page.goto(`${BOOKING_URL}/appointment`)
    await fillBooking(page)
    await page.getByRole("button", { name: "Request Appointment" }).click()
    await expect(page.getByRole("alert")).toContainText("couldn't submit your request")
    await expect(page.getByRole("button", { name: "Request Appointment" })).toBeEnabled()
  })

  test("only real times are offered: a visiting doctor's day and hours", async ({ page }) => {
    await page.goto(`${BOOKING_URL}/appointment`)
    await page.getByLabel("Preferred Doctor").selectOption("Dr. Ram Kumar")
    await expect(page.getByText(/4th Sunday/)).toBeVisible()
    await page.getByRole("button", { name: "Choose this date" }).click()
    await expect(page.getByLabel("Preferred Date")).toHaveValue("2026-11-22")
    await expect(page.getByRole("radio")).toHaveCount(2)
  })

  test("Sunday shows only Sunday-hours times", async ({ page }) => {
    await page.goto(`${BOOKING_URL}/appointment`)
    await page.getByLabel("Preferred Date").fill("2026-11-15")
    const times = await page.getByRole("radio").evaluateAll((els) => els.map((e) => (e as HTMLInputElement).value))
    expect(times).toEqual(["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM"])
  })
})

test.describe("prerendered booking page (production build)", () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(NOW)
  })

  test("doctor and service from a link are pre-selected after hydration", async ({ page }) => {
    const errors = watchErrors(page)
    await page.goto("/appointment?doctor=Dr.%20Srilatha%20CH&service=Glaucoma%20Treatment", { waitUntil: "networkidle" })
    await expect(page.getByLabel("Preferred Doctor")).toHaveValue("Dr. Srilatha CH")
    await expect(page.getByLabel("Service")).toHaveValue("Glaucoma Treatment")
    expect(errors).toEqual([])
  })

  test("the date picker starts at today, not the build date", async ({ page }) => {
    await page.goto("/appointment", { waitUntil: "networkidle" })
    await expect(page.getByLabel("Preferred Date")).toHaveAttribute("min", "2026-11-12")
  })

  test("without Supabase configured, patients are told to call", async ({ page }) => {
    await page.goto("/appointment", { waitUntil: "networkidle" })
    await fillBooking(page)
    await page.getByRole("button", { name: "Request Appointment" }).click()
    await expect(page.getByRole("alert")).toContainText("Please call us at +91 98850 29367")
  })

  test("a doctor's Book Consultation button pre-selects that doctor", async ({ page }) => {
    await page.goto("/doctors/dr-srilatha-ch", { waitUntil: "networkidle" })
    await page.locator("main").getByRole("link", { name: /book/i }).first().click()
    await expect(page).toHaveURL(/\/appointment\?.*doctor=Dr\.(%20|\+)Srilatha/)
    await expect(page.getByLabel("Preferred Doctor")).toHaveValue("Dr. Srilatha CH")
  })
})

test.describe("navigation", () => {
  test("client-side navigation updates the title and starts at the top", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
    await page.mouse.wheel(0, 3000)
    await page.getByRole("contentinfo").getByRole("link", { name: "About" }).click()
    await expect(page).toHaveURL(/\/about$/)
    await expect(page).toHaveTitle(/About/)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  })

  test("the skip link jumps past the menu", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard navigation")
    await page.goto("/doctors", { waitUntil: "networkidle" })
    await page.keyboard.press("Tab")
    const skip = page.getByRole("link", { name: "Skip to main content" })
    await expect(skip).toBeFocused()
    await expect(skip).toBeVisible()
    await page.keyboard.press("Enter")
    await expect(page.locator("#main")).toBeFocused()
  })
})

test.describe("phone layout", () => {
  test.skip(({ isMobile }) => !isMobile, "phone only")

  test("menu opens, navigates and closes", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
    await page.getByRole("button", { name: "Open menu" }).click()
    const menu = page.locator("#mobile-menu")
    await expect(menu).toBeVisible()
    await menu.getByRole("link", { name: "Doctors" }).click()
    await expect(page).toHaveURL(/\/doctors$/)
    await expect(menu).toBeHidden()
  })

  test("the Call / WhatsApp / Book bar never hides the footer", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    const copyright = page.getByText(/All rights reserved/)
    await expect(copyright).toBeVisible()
    const bar = await page.getByRole("navigation", { name: "Quick contact" }).boundingBox()
    const text = await copyright.boundingBox()
    expect(text!.y + text!.height).toBeLessThanOrEqual(bar!.y)
  })

  test("the quick-contact bar links to phone, WhatsApp and booking", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
    const bar = page.getByRole("navigation", { name: "Quick contact" })
    await expect(bar.getByRole("link", { name: "Call" })).toHaveAttribute("href", "tel:+919885029367")
    await expect(bar.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", /^https:\/\/wa\.me\/919885029367/)
    await bar.getByRole("link", { name: "Book" }).click()
    await expect(page).toHaveURL(/\/appointment$/)
  })

  test("the home page stays a reasonable length on phones", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
    const height = await page.evaluate(() => document.body.scrollHeight)
    expect(height).toBeLessThan(10500) // was ~12,800px with one big card per row; ~9,900px after the compact layout
  })
})

test.describe("gallery", () => {
  test("open a photo, browse, and close it", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "networkidle" })
    const first = page.getByRole("button", { name: /^Open photo:/ }).first()
    await first.click()
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAccessibleName(/photo 1 of/)
    await page.getByRole("button", { name: "Next photo" }).click()
    await expect(dialog).toHaveAccessibleName(/photo 2 of/)
    await page.keyboard.press("Escape")
    await expect(dialog).toBeHidden()
    await expect(first).toBeFocused()
  })

  test("captions are visible without hovering", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "networkidle" })
    const caption = page.getByRole("button", { name: /^Open photo:/ }).first().locator("span").last()
    await expect(caption).toBeVisible()
    expect(await caption.evaluate((el) => getComputedStyle(el.parentElement!).opacity)).toBe("1")
  })
})

test.describe("motion", () => {
  test("respects 'reduce motion': no autoplaying photos or floating animations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto("/", { waitUntil: "networkidle" })
    const animated = await page.evaluate(
      () =>
        [...document.querySelectorAll("section *")].filter((el) => {
          const s = getComputedStyle(el)
          return s.animationName !== "none" && s.animationPlayState === "running" && !el.closest(".marquee-track")
        }).length,
    )
    expect(animated).toBe(0)
    const dots = page.getByRole("button", { name: /^Show photo/ })
    await page.waitForTimeout(3500)
    await expect(dots.first()).toHaveAttribute("aria-current", "true")
  })

  test("the slideshow can be paused", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
    const carousel = page.getByRole("region", { name: "Hospital facilities" })
    await carousel.scrollIntoViewIfNeeded()
    await page.getByRole("button", { name: "Pause slideshow" }).click()
    const before = await page.getByRole("button", { name: /^Show photo/ }).evaluateAll((b) => b.findIndex((x) => x.getAttribute("aria-current") === "true"))
    await page.mouse.move(0, 0) // leave the carousel so hover-pause doesn't hide the result
    await page.waitForTimeout(3500)
    const after = await page.getByRole("button", { name: /^Show photo/ }).evaluateAll((b) => b.findIndex((x) => x.getAttribute("aria-current") === "true"))
    expect(after).toBe(before)
  })
})
