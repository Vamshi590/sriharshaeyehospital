/**
 * Interaction tests for the shared UI: navigation, gallery lightbox, photo carousel,
 * contact and landing forms, the page-load error boundary and site-wide accessibility basics.
 */
import { afterEach, describe, expect, it, onTestFinished, vi } from "vitest"
import { act, fireEvent, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { renderApp } from "./test/render"
import { PhotoCarousel } from "./components/photo-carousel"
import ContactPage from "./pages/contact"
import { lazyPage } from "./lazy-page"

afterEach(() => {
  vi.useRealTimers()
})

describe("navigation", () => {
  it("has a skip link that targets the main content", () => {
    renderApp("/doctors")
    const skip = screen.getByRole("link", { name: /skip to main content/i })
    expect(skip).toHaveAttribute("href", "#main")
    expect(document.getElementById("main")).toBeInTheDocument()
  })

  it("opens and closes the mobile menu, with Escape too", async () => {
    const user = userEvent.setup()
    renderApp("/")
    const toggle = screen.getByRole("button", { name: /open menu/i })
    expect(toggle).toHaveAttribute("aria-expanded", "false")
    await user.click(toggle)
    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute("aria-expanded", "true")
    expect(document.getElementById("mobile-menu")).toBeInTheDocument()
    await user.keyboard("{Escape}")
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument()
  })

  it("closes the mobile menu after following a link", async () => {
    const user = userEvent.setup()
    renderApp("/")
    await user.click(screen.getByRole("button", { name: /open menu/i }))
    await user.click(within(document.getElementById("mobile-menu")!).getByRole("link", { name: "Doctors" }))
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/doctors/i)
  })

  it("marks the current page in the menu", () => {
    renderApp("/doctors")
    const nav = screen.getByRole("navigation", { name: "Main" })
    expect(within(nav).getAllByRole("link", { name: "Doctors" })[0]).toHaveAttribute("aria-current", "page")
  })
})

describe("gallery", () => {
  it("opens a photo from the keyboard, steps with arrow keys and returns focus on Escape", async () => {
    const user = userEvent.setup()
    renderApp("/gallery")
    const tiles = screen.getAllByRole("button", { name: /^open photo:/i })
    expect(tiles.length).toBeGreaterThan(3)
    tiles[0].focus()
    await user.keyboard("{Enter}")

    const dialog = screen.getByRole("dialog")
    expect(dialog).toHaveAccessibleName(/photo 1 of/i)
    expect(screen.getByRole("button", { name: /close photo/i })).toHaveFocus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("dialog")).toHaveAccessibleName(/photo 2 of/i)
    await user.keyboard("{ArrowLeft}{ArrowLeft}")
    expect(screen.getByRole("dialog")).toHaveAccessibleName(new RegExp(`photo ${tiles.length} of ${tiles.length}`))

    await user.keyboard("{Escape}")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(tiles[0]).toHaveFocus()
  })

  it("keeps keyboard focus inside the open photo", async () => {
    const user = userEvent.setup()
    renderApp("/gallery")
    await user.click(screen.getAllByRole("button", { name: /^open photo:/i })[0])
    const dialog = screen.getByRole("dialog")
    for (let i = 0; i < 5; i++) {
      await user.tab()
      expect(dialog).toContainElement(document.activeElement as HTMLElement)
    }
  })

  it("locks page scrolling while a photo is open", async () => {
    const user = userEvent.setup()
    renderApp("/gallery")
    await user.click(screen.getAllByRole("button", { name: /^open photo:/i })[0])
    expect(document.body.style.overflow).toBe("hidden")
    await user.click(screen.getByRole("button", { name: /close photo/i }))
    expect(document.body.style.overflow).toBe("")
  })

  it("filters by category and shows which filter is active", async () => {
    const user = userEvent.setup()
    renderApp("/gallery")
    const all = screen.getAllByRole("button", { name: /^open photo:/i }).length
    const events = screen.getByRole("button", { name: "Events" })
    await user.click(events)
    expect(events).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false")
    const filtered = screen.getAllByRole("button", { name: /^open photo:/i }).length
    expect(filtered).toBeGreaterThan(0)
    expect(filtered).toBeLessThan(all)
  })

  it("always shows photo captions (phones have no hover)", () => {
    renderApp("/gallery")
    const tile = screen.getAllByRole("button", { name: /^open photo:/i })[0]
    expect(tile.querySelector(".opacity-0")).toBeNull()
  })
})

describe("photo carousel", () => {
  const slides = [
    { src: "/a.webp", alt: "Operation theatre", width: 800, height: 450 },
    { src: "/b.webp", alt: "Reception", width: 800, height: 450 },
    { src: "/c.webp", alt: "Ward", width: 800, height: 450 },
  ]
  const active = () => screen.getAllByRole("button", { name: /show photo/i }).findIndex((b) => b.getAttribute("aria-current") === "true")

  it("autoplays, and the pause button stops it (WCAG 2.2.2)", () => {
    vi.useFakeTimers()
    render(<PhotoCarousel slides={slides} label="Facilities" interval={1000} />)
    expect(active()).toBe(0)
    act(() => void vi.advanceTimersByTime(1000))
    expect(active()).toBe(1)
    fireEvent.click(screen.getByRole("button", { name: /pause slideshow/i }))
    act(() => void vi.advanceTimersByTime(5000))
    expect(active()).toBe(1)
    fireEvent.click(screen.getByRole("button", { name: /play slideshow/i }))
    act(() => void vi.advanceTimersByTime(1000))
    expect(active()).toBe(2)
  })

  it("stops autoplay once a phone user touches it", () => {
    vi.useFakeTimers()
    render(<PhotoCarousel slides={slides} label="Facilities" interval={1000} />)
    fireEvent.pointerDown(screen.getByRole("region", { name: "Facilities" }), { pointerType: "touch" })
    act(() => void vi.advanceTimersByTime(5000))
    expect(active()).toBe(0)
    expect(screen.getByRole("button", { name: /play slideshow/i })).toBeInTheDocument()
  })

  it("does not autoplay for visitors who prefer reduced motion", () => {
    vi.useFakeTimers()
    const original = window.matchMedia
    window.matchMedia = ((q: string) => ({ matches: q.includes("reduce"), media: q, addEventListener() {}, removeEventListener() {} })) as never
    try {
      render(<PhotoCarousel slides={slides} label="Facilities" interval={1000} />)
      act(() => void vi.advanceTimersByTime(5000))
      expect(active()).toBe(0)
    } finally {
      window.matchMedia = original
    }
  })

  it("dots have a comfortable tap area", () => {
    render(<PhotoCarousel slides={slides} label="Facilities" />)
    for (const dot of screen.getAllByRole("button", { name: /show photo/i })) expect(dot.className).toMatch(/\bh-8\b/)
  })
})

describe("contact form", () => {
  it("doesn't require an email (the message goes to WhatsApp) and leaves it out when empty", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null)
    onTestFinished(() => open.mockRestore())
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    )
    expect(screen.getByLabelText(/email/i)).not.toBeRequired()
    await user.type(screen.getByLabelText(/full name/i), "Suresh")
    await user.type(screen.getByLabelText(/subject/i), "Timings")
    await user.type(screen.getByLabelText(/message/i), "Are you open on Sunday?")
    await user.click(screen.getByRole("button", { name: /send via whatsapp/i }))
    const text = new URL(open.mock.calls[0][0] as string).searchParams.get("text")!
    expect(text).not.toContain("Email:")
    expect(screen.getByRole("heading", { name: /almost done/i })).toHaveFocus()
  })
})

describe("ad landing form", () => {
  it("doesn't offer past dates and uses a phone keypad", () => {
    vi.useFakeTimers({ toFake: ["Date"] })
    vi.setSystemTime(new Date("2026-11-12T07:00:00+05:30"))
    renderApp("/lp/a1")
    expect(screen.getByLabelText(/preferred day/i)).toHaveAttribute("min", "2026-11-12")
    expect(screen.getByLabelText(/mobile number/i)).toHaveAttribute("type", "tel")
  })
})

describe("page load failures", () => {
  it("show a reload message instead of a blank screen", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {})
    onTestFinished(() => err.mockRestore())
    sessionStorage.setItem("page-chunk-reload", "1") // already reloaded once, so no further automatic reload
    const Broken = lazyPage(() => Promise.reject(new TypeError("Failed to fetch dynamically imported module")))
    render(<Broken />)
    expect(await screen.findByRole("alert")).toHaveTextContent(/didn't load properly/i)
    expect(screen.getByRole("button", { name: /reload the page/i })).toBeInTheDocument()
    sessionStorage.clear()
  })
})

describe("footer", () => {
  it("leaves room for the phone action bar so it never covers the footer", () => {
    renderApp("/")
    const inner = screen.getByRole("contentinfo").firstElementChild as HTMLElement
    expect(inner.className).toMatch(/pb-\[calc\(6rem\+env\(safe-area-inset-bottom\)\)\]/)
  })
})
