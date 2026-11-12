import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import ContactPage from "./contact"

describe("contact page", () => {
  it("hands the message to WhatsApp, pre-filled", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null)
    const user = userEvent.setup()
    render(<MemoryRouter><ContactPage /></MemoryRouter>)
    await user.type(screen.getByLabelText(/full name/i), "Suresh")
    await user.type(screen.getByLabelText(/email/i), "suresh@example.com")
    await user.type(screen.getByLabelText(/phone number/i), "9000000000")
    await user.type(screen.getByLabelText(/subject/i), "Eye check-up")
    await user.type(screen.getByLabelText(/message/i), "Need an appointment on Monday")
    await user.click(screen.getByRole("button", { name: /send/i }))

    expect(open).toHaveBeenCalledTimes(1)
    const url = new URL(open.mock.calls[0][0] as string)
    expect(url.origin + url.pathname).toBe("https://wa.me/919885029367")
    const text = url.searchParams.get("text")!
    expect(text).toContain("Subject: Eye check-up")
    expect(text).toContain("Name: Suresh")
  })

  it("lists both phone numbers and the opening hours", () => {
    render(<MemoryRouter><ContactPage /></MemoryRouter>)
    expect(screen.getAllByRole("link", { name: "+91 98850 29367" }).length).toBeGreaterThan(0)
    expect(screen.getByRole("link", { name: "+91 79950 29367" })).toHaveAttribute("href", "tel:+917995029367")
    expect(screen.getByText("Mon - Sat: 9 AM - 8 PM")).toBeInTheDocument()
    expect(screen.getByText("Sunday: 10 AM - 2:30 PM")).toBeInTheDocument()
  })
})
