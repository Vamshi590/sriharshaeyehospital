import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"

const insert = vi.fn()
const from = vi.fn(() => ({ insert }))
const getSupabase = vi.fn(async () => ({ from }))
vi.mock("../lib/supabase", () => ({ getSupabase: () => getSupabase() }))

import AppointmentPage from "./appointment"

// Thursday 12 Nov 2026, 7 AM in Karimnagar. 16 Nov = Monday, 15 Nov = Sunday, 22 Nov = 4th Sunday.
const NOW = new Date("2026-11-12T07:00:00+05:30")

function renderPage(url = "/appointment") {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <AppointmentPage />
    </MemoryRouter>,
  )
}

const timeOptions = () => within(screen.getByRole("radiogroup", { name: /preferred time/i })).queryAllByRole("radio")
const submitButton = () => screen.getByRole("button", { name: /request appointment/i })

async function fillRequired(user: ReturnType<typeof userEvent.setup>, { phone = "9885029367", date = "2026-11-16", time = "10:00 AM" } = {}) {
  await user.type(screen.getByLabelText(/full name/i), "Lakshmi")
  await user.type(screen.getByLabelText(/phone number/i), phone)
  await user.selectOptions(screen.getByLabelText(/^service/i), "Cataract Surgery")
  await user.type(screen.getByLabelText(/preferred date/i), date)
  await user.click(screen.getByRole("radio", { name: time }))
}

describe("appointment booking (UI + Supabase integration)", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] })
    vi.setSystemTime(NOW)
    insert.mockReset()
    from.mockClear()
    getSupabase.mockReset()
    getSupabase.mockImplementation(async () => ({ from }))
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it("submits the request to the Appointments table and shows a confirmation summary", async () => {
    insert.mockResolvedValue({ error: null })
    const user = userEvent.setup()
    renderPage()
    await fillRequired(user)
    await user.click(submitButton())

    const heading = await screen.findByRole("heading", { name: "Appointment Request Received!" })
    expect(heading).toHaveFocus() // screen readers announce the result
    expect(screen.getByRole("status")).toHaveTextContent("Monday, 16 November, 10:00 AM")
    expect(screen.getByRole("status")).toHaveTextContent("Any available doctor")
    expect(from).toHaveBeenCalledWith("Appointments")
    expect(insert).toHaveBeenCalledTimes(1)
    expect(insert.mock.calls[0][0][0]).toMatchObject({
      name: "Lakshmi",
      phonenumber: "9885029367",
      service: "Cataract Surgery",
      doctor: "",
      prefferedDate: "2026-11-16",
      prefferedTime: "10:00 AM",
      email: "",
    })
  })

  it("lets the patient start a new booking after submitting", async () => {
    insert.mockResolvedValue({ error: null })
    const user = userEvent.setup()
    renderPage()
    await fillRequired(user)
    await user.click(submitButton())
    await user.click(await screen.findByRole("button", { name: /book another/i }))
    expect(screen.getByLabelText(/full name/i)).toHaveValue("")
  })

  it("pre-selects the doctor and service from the link", async () => {
    renderPage("/appointment?doctor=Dr.%20Srilatha%20CH&service=Glaucoma%20Treatment")
    expect(await screen.findByLabelText(/preferred doctor/i)).toHaveValue("Dr. Srilatha CH")
    expect(screen.getByLabelText(/^service/i)).toHaveValue("Glaucoma Treatment")
  })

  it("ignores unknown doctors and services in the link", () => {
    renderPage("/appointment?doctor=Dr.%20Evil&service=Brain%20Surgery")
    expect(screen.getByLabelText(/preferred doctor/i)).toHaveValue("")
    expect(screen.getByLabelText(/^service/i)).toHaveValue("")
  })

  it("does not allow past dates in the date picker", () => {
    renderPage()
    expect(screen.getByLabelText(/preferred date/i)).toHaveAttribute("min", "2026-11-12")
  })

  it("asks for a date before showing times", () => {
    renderPage()
    expect(screen.getByText(/choose a date to see the available times/i)).toBeInTheDocument()
    expect(timeOptions()).toHaveLength(0)
  })

  it("shows only Sunday-hours times on a Sunday", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.type(screen.getByLabelText(/preferred date/i), "2026-11-15")
    expect(timeOptions().map((r) => (r as HTMLInputElement).value)).toEqual(["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM"])
  })

  it("shows a visiting doctor's schedule and offers their next visit date", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.selectOptions(screen.getByLabelText(/preferred doctor/i), "Dr. Ram Kumar")
    expect(screen.getByText(/4th Sunday/)).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /choose this date/i }))
    expect(screen.getByLabelText(/preferred date/i)).toHaveValue("2026-11-22")
    expect(timeOptions().map((r) => (r as HTMLInputElement).value)).toEqual(["09:00 AM", "09:30 AM"])
  })

  it("explains when a date has no times and jumps to the next available one", async () => {
    const user = userEvent.setup()
    renderPage("/appointment?doctor=Dr.%20Ram%20Kumar")
    await screen.findByDisplayValue(/Dr. Ram Kumar/)
    await user.type(screen.getByLabelText(/preferred date/i), "2026-11-16")
    expect(screen.getByText(/no appointments are available on Monday, 16 November with Dr. Ram Kumar/i)).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /see times on Sunday, 22 November/i }))
    expect(screen.getByLabelText(/preferred date/i)).toHaveValue("2026-11-22")
  })

  it("clears a chosen time that isn't offered on the newly chosen date", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.type(screen.getByLabelText(/preferred date/i), "2026-11-16")
    await user.click(screen.getByRole("radio", { name: "06:00 PM" }))
    expect(screen.getByRole("radio", { name: "06:00 PM" })).toBeChecked()
    await user.clear(screen.getByLabelText(/preferred date/i))
    await user.type(screen.getByLabelText(/preferred date/i), "2026-11-15") // Sunday: closes 2:30 PM
    expect(screen.queryByRole("radio", { name: "06:00 PM" })).not.toBeInTheDocument()
    expect(timeOptions().some((r) => (r as HTMLInputElement).checked)).toBe(false)
  })

  it("asks for a time if none was chosen", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.type(screen.getByLabelText(/full name/i), "Lakshmi")
    await user.type(screen.getByLabelText(/phone number/i), "9885029367")
    await user.selectOptions(screen.getByLabelText(/^service/i), "Cataract Surgery")
    await user.type(screen.getByLabelText(/preferred date/i), "2026-11-16")
    await user.click(submitButton())
    expect(await screen.findByRole("alert")).toHaveTextContent(/choose a time/i)
    expect(insert).not.toHaveBeenCalled()
  })

  it("blocks a short phone number without calling Supabase", async () => {
    const user = userEvent.setup()
    renderPage()
    await fillRequired(user, { phone: "12345" })
    await user.click(submitButton())
    expect(await screen.findByText(/valid phone number/i)).toBeInTheDocument()
    expect(insert).not.toHaveBeenCalled()
  })

  it("shows the call-us fallback when Supabase rejects the insert", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    insert.mockResolvedValue({ error: { message: "permission denied" } })
    const user = userEvent.setup()
    renderPage()
    await fillRequired(user)
    await user.click(submitButton())
    expect(await screen.findByText(/couldn't submit your request/i)).toBeInTheDocument()
    expect(screen.queryByText("Appointment Request Received!")).not.toBeInTheDocument()
    expect(submitButton()).toBeEnabled()
  })

  it("recovers (no endless 'Submitting...') when the booking service fails to load", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    getSupabase.mockRejectedValue(new TypeError("Failed to fetch dynamically imported module"))
    const user = userEvent.setup()
    renderPage()
    await fillRequired(user)
    await user.click(submitButton())
    expect(await screen.findByText(/couldn't submit your request/i)).toBeInTheDocument()
    expect(submitButton()).toHaveTextContent("Request Appointment")
    expect(submitButton()).toBeEnabled()
  })

  it("tells the patient to call when online booking isn't configured", async () => {
    getSupabase.mockResolvedValue(null as never)
    const user = userEvent.setup()
    renderPage()
    await fillRequired(user)
    await user.click(submitButton())
    expect(await screen.findByText(/online booking is temporarily unavailable/i)).toBeInTheDocument()
  })

  it("clears the whole form with the Clear button", async () => {
    const user = userEvent.setup()
    renderPage()
    await fillRequired(user)
    await user.click(screen.getByRole("button", { name: /clear form/i }))
    expect(screen.getByLabelText(/full name/i)).toHaveValue("")
    expect(screen.getByLabelText(/preferred date/i)).toHaveValue("")
  })

  it("uses phone-friendly inputs", () => {
    renderPage()
    const phone = screen.getByLabelText(/phone number/i)
    expect(phone).toHaveAttribute("type", "tel")
    expect(phone).toHaveAttribute("autocomplete", "tel")
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute("autocomplete", "name")
  })
})
