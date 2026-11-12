import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PhotoCarousel } from "./photo-carousel"

const slides = [
  { src: "/a.webp", alt: "Operation theatre", width: 800, height: 450 },
  { src: "/b.webp", alt: "Reception", width: 800, height: 450 },
]

describe("PhotoCarousel", () => {
  it("renders every slide lazily with alt text and dimensions", () => {
    render(<PhotoCarousel slides={slides} label="Facilities" />)
    for (const s of slides) {
      const img = screen.getByAltText(s.alt)
      expect(img).toHaveAttribute("loading", "lazy")
      expect(img).toHaveAttribute("width", "800")
    }
  })

  it("moves to a slide when its dot is clicked", async () => {
    const user = userEvent.setup()
    render(<PhotoCarousel slides={slides} label="Facilities" />)
    const second = screen.getByRole("button", { name: /photo 2/i })
    await user.click(second)
    expect(second).toHaveAttribute("aria-current", "true")
  })
})
