import type { SupabaseClient } from "@supabase/supabase-js"
import { availableSlots, istNow } from "./schedule"

/*
 * Field names match the columns of the Supabase "Appointments" table
 * (including the existing spellings `phonenumber`, `prefferedDate`, `prefferedTime`).
 * Do not rename them without migrating the table.
 */
export type AppointmentForm = {
  name: string
  phonenumber: string
  service: string
  doctor: string
  prefferedDate: string
  prefferedTime: string
}

export const emptyAppointment: AppointmentForm = {
  name: "",
  phonenumber: "",
  service: "",
  doctor: "",
  prefferedDate: "",
  prefferedTime: "",
}

export const APPOINTMENTS_TABLE = "Appointments"

/**
 * Returns an error message for the visitor, or null when the form can be submitted.
 * Date and time are optional here (the ad landing form only asks for a day), but when given
 * they must be a future date and a slot the hospital / chosen doctor actually offers.
 */
export function validateAppointment(form: AppointmentForm, now: Date = new Date()): string | null {
  const name = form.name.trim()
  const phone = form.phonenumber.trim()
  if (!name || !phone) return "Please enter your name and phone number."
  const digits = phone.replace(/\D/g, "")
  if (digits.length < 10 || digits.length > 13) return "Please enter a valid phone number (at least 10 digits)."
  if (form.prefferedDate && form.prefferedDate < istNow(now).date) return "Please choose today or a later date."
  if (form.prefferedTime && !availableSlots(form.prefferedDate, form.doctor, now).includes(form.prefferedTime))
    return "That time isn't available on the chosen date. Please pick another time."
  return null
}

/** The row inserted into Supabase. */
export function toAppointmentRow(form: AppointmentForm, now: Date = new Date()) {
  return {
    ...form,
    name: form.name.trim(),
    phonenumber: form.phonenumber.trim(),
    email: "",
    date: now,
  }
}

export type SubmitResult = { ok: true } | { ok: false; reason: "invalid" | "unavailable" | "failed"; message: string }

type Client = Pick<SupabaseClient, "from"> | null

/**
 * Validates and inserts an appointment request. Never throws.
 * `client` is null when Supabase isn't configured; it may also be a loader (e.g. `getSupabase`),
 * so that a failure to load the SDK on a flaky connection is reported instead of hanging the form.
 */
export async function submitAppointment(
  client: Client | (() => Promise<Client>),
  form: AppointmentForm,
  phoneDisplay: string,
  now: Date = new Date(),
): Promise<SubmitResult> {
  const invalid = validateAppointment(form, now)
  if (invalid) return { ok: false, reason: "invalid", message: invalid }
  const failed: SubmitResult = {
    ok: false,
    reason: "failed",
    message: `We couldn't submit your request. Please try again, or call us at ${phoneDisplay}.`,
  }
  let db: Client
  try {
    db = typeof client === "function" ? await client() : client
  } catch (err) {
    console.error("Could not load the booking service:", err)
    return failed
  }
  if (!db)
    return { ok: false, reason: "unavailable", message: `Online booking is temporarily unavailable. Please call us at ${phoneDisplay}.` }
  try {
    const { error } = await db.from(APPOINTMENTS_TABLE).insert([toAppointmentRow(form, now)])
    if (error) throw error
    return { ok: true }
  } catch (err) {
    console.error("Error submitting appointment:", err)
    return failed
  }
}
