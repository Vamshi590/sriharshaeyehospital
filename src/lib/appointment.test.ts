import { describe, expect, it, vi } from "vitest"
import { APPOINTMENTS_TABLE, emptyAppointment, submitAppointment, toAppointmentRow, validateAppointment } from "./appointment"

const valid = { ...emptyAppointment, name: "  Ravi Kumar ", phonenumber: " 98850 29367 ", service: "Cataract Surgery", doctor: "Dr. Srilatha CH", prefferedDate: "2030-01-15", prefferedTime: "10:00 AM" }

/** A fake Supabase client that records inserts. */
function fakeClient(result: { error: unknown } = { error: null }) {
  const insert = vi.fn().mockResolvedValue(result)
  const from = vi.fn().mockReturnValue({ insert })
  return { client: { from } as never, from, insert }
}

describe("validateAppointment", () => {
  it.each([
    [{ ...valid, name: " " }, "Please enter your name and phone number."],
    [{ ...valid, phonenumber: "" }, "Please enter your name and phone number."],
    [{ ...valid, phonenumber: "12345" }, "Please enter a valid phone number (at least 10 digits)."],
    [{ ...valid, phonenumber: "12345678901234" }, "Please enter a valid phone number (at least 10 digits)."],
  ])("rejects %o", (form, message) => {
    expect(validateAppointment(form)).toBe(message)
  })
  it.each(["9885029367", "+91 98850 29367", "098850-29367"])("accepts %s", (phonenumber) => {
    expect(validateAppointment({ ...valid, phonenumber })).toBeNull()
  })

  const NOW = new Date("2026-11-12T07:00:00+05:30")
  it("rejects a date in the past", () => {
    expect(validateAppointment({ ...valid, prefferedDate: "2026-11-11", prefferedTime: "" }, NOW)).toBe("Please choose today or a later date.")
  })
  it("rejects a time the hospital doesn't offer that day (Sunday evening)", () => {
    expect(validateAppointment({ ...valid, doctor: "", prefferedDate: "2026-11-15", prefferedTime: "06:00 PM" }, NOW)).toMatch(/isn't available/)
  })
  it("rejects a day the chosen visiting doctor isn't in", () => {
    expect(validateAppointment({ ...valid, doctor: "Dr. Ram Kumar", prefferedDate: "2026-11-16", prefferedTime: "09:00 AM" }, NOW)).toMatch(/isn't available/)
  })
  it("rejects a time slot that has already passed today", () => {
    const evening = new Date("2026-11-12T18:15:00+05:30")
    expect(validateAppointment({ ...valid, doctor: "", prefferedDate: "2026-11-12", prefferedTime: "05:00 PM" }, evening)).toMatch(/isn't available/)
  })
  it("accepts a valid slot for the visiting doctor's day", () => {
    expect(validateAppointment({ ...valid, doctor: "Dr. Ram Kumar", prefferedDate: "2026-11-22", prefferedTime: "09:00 AM" }, NOW)).toBeNull()
  })
  it("allows a request with only a day (the ad landing form)", () => {
    expect(validateAppointment({ ...valid, prefferedDate: "2026-11-20", prefferedTime: "" }, NOW)).toBeNull()
    expect(validateAppointment({ ...valid, prefferedDate: "", prefferedTime: "" }, NOW)).toBeNull()
  })
})

describe("toAppointmentRow", () => {
  it("keeps the existing Supabase column names and trims input", () => {
    const now = new Date("2026-11-10T10:00:00Z")
    expect(toAppointmentRow(valid, now)).toEqual({
      name: "Ravi Kumar",
      phonenumber: "98850 29367",
      service: "Cataract Surgery",
      doctor: "Dr. Srilatha CH",
      prefferedDate: "2030-01-15",
      prefferedTime: "10:00 AM",
      email: "",
      date: now,
    })
  })
})

describe("submitAppointment", () => {
  it("inserts one row into the Appointments table", async () => {
    const { client, from, insert } = fakeClient()
    const now = new Date("2026-11-10T10:00:00Z")
    await expect(submitAppointment(client, valid, "+91 98850 29367", now)).resolves.toEqual({ ok: true })
    expect(from).toHaveBeenCalledWith(APPOINTMENTS_TABLE)
    expect(insert).toHaveBeenCalledWith([toAppointmentRow(valid, now)])
  })
  it("does not call Supabase when the form is invalid", async () => {
    const { client, from } = fakeClient()
    const r = await submitAppointment(client, { ...valid, name: "" }, "x")
    expect(r).toMatchObject({ ok: false, reason: "invalid" })
    expect(from).not.toHaveBeenCalled()
  })
  it("tells the visitor to call when Supabase isn't configured", async () => {
    const r = await submitAppointment(null, valid, "+91 98850 29367")
    expect(r).toEqual({ ok: false, reason: "unavailable", message: "Online booking is temporarily unavailable. Please call us at +91 98850 29367." })
  })
  it("reports a database error without throwing", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    const { client } = fakeClient({ error: { message: "RLS denied" } })
    const r = await submitAppointment(client, valid, "+91 98850 29367")
    expect(r).toMatchObject({ ok: false, reason: "failed" })
  })
  it("accepts a client loader and inserts through it", async () => {
    const { client, insert } = fakeClient()
    await expect(submitAppointment(async () => client, valid, "p")).resolves.toEqual({ ok: true })
    expect(insert).toHaveBeenCalledTimes(1)
  })
  it("reports a failure (instead of hanging) when the booking service can't be loaded", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    const r = await submitAppointment(() => Promise.reject(new TypeError("Failed to fetch dynamically imported module")), valid, "+91 98850 29367")
    expect(r).toEqual({ ok: false, reason: "failed", message: "We couldn't submit your request. Please try again, or call us at +91 98850 29367." })
  })
  it("tells the visitor to call when the loader finds no configuration", async () => {
    const r = await submitAppointment(async () => null, valid, "p")
    expect(r).toMatchObject({ ok: false, reason: "unavailable" })
  })
  it("reports a network failure without throwing", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    const insert = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"))
    const r = await submitAppointment({ from: () => ({ insert }) } as never, valid, "p")
    expect(r).toMatchObject({ ok: false, reason: "failed" })
  })
})
