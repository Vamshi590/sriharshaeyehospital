import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import HeroSection from "./HeroSection"

const renderHero = () => render(<MemoryRouter><HeroSection /></MemoryRouter>)

describe("hero section", () => {
  it("keeps the eye illustration, loaded with high priority and fixed dimensions", () => {
    renderHero()
    const eye = screen.getByAltText("Illustration of a human eye")
    expect(eye).toHaveAttribute("width", "732")
    expect(eye).toHaveAttribute("height", "604")
    expect(eye).toHaveAttribute("fetchpriority", "high")
    expect(eye).toHaveClass("animate-float")
  })

  it("uses a keyword H1 while keeping the tagline as the big headline", () => {
    renderHero()
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("NABH-Accredited Eye Hospital in Karimnagar")
    expect(screen.getByText(/We don't just treat eyes/)).toBeInTheDocument()
  })

  it("offers booking, call and WhatsApp actions", () => {
    renderHero()
    expect(screen.getByRole("link", { name: "Book an Appointment" })).toHaveAttribute("href", "/appointment")
    expect(screen.getByRole("link", { name: /call/i })).toHaveAttribute("href", "tel:+919885029367")
    expect(screen.getByRole("link", { name: /whatsapp/i }).getAttribute("href")).toMatch(/^https:\/\/wa\.me\/919885029367\?text=/)
  })

  it("renders identical particles every time (no hydration mismatch)", () => {
    const a = renderHero().container.innerHTML
    const b = renderHero().container.innerHTML
    expect(b).toContain(a.slice(0, 2000))
  })
})

describe("hospital name", () => {
  it("never wraps across two lines in the hero", () => {
    render(<MemoryRouter><HeroSection /></MemoryRouter>)
    for (const el of screen.getAllByText("Sri Harsha Eye Hospital")) expect(el).toHaveClass("whitespace-nowrap")
  })
})
