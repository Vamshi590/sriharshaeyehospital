import { OPENING_HOURS } from "../data/contact"
import { doctorByName, type Doctor } from "../data/doctors"

/*
 * Which appointment times can be offered for a given date and doctor.
 * All "today" / "now" logic uses India Standard Time, because the hospital is in Karimnagar
 * and the page is prerendered (so we can't rely on the visitor's or the build machine's clock).
 */

/** The time slots the booking form has always offered (label shown and stored as-is). */
export const BASE_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
] as const

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const IST_OFFSET_MIN = 5 * 60 + 30

/** "02:30 PM" -> 870 (minutes after midnight). */
export function slotMinutes(slot: string) {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(slot.trim())
  if (!m) return NaN
  let h = Number(m[1]) % 12
  if (m[3].toUpperCase() === "PM") h += 12
  return h * 60 + Number(m[2])
}

/** "14:30" -> 870 */
const hhmm = (t: string) => {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

/** Today's date (YYYY-MM-DD) and the minutes since midnight, in India Standard Time. */
export function istNow(now: Date = new Date()) {
  const ist = new Date(now.getTime() + IST_OFFSET_MIN * 60_000)
  const pad = (n: number) => String(n).padStart(2, "0")
  return {
    date: `${ist.getUTCFullYear()}-${pad(ist.getUTCMonth() + 1)}-${pad(ist.getUTCDate())}`,
    minutes: ist.getUTCHours() * 60 + ist.getUTCMinutes(),
  }
}

/** Parses YYYY-MM-DD as a calendar date (no time zone shifts). Returns null when invalid. */
function parseDate(date: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  if (!m) return null
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])))
  if (d.getUTCMonth() !== Number(m[2]) - 1) return null // e.g. 2026-02-31
  return d
}

export function addDays(date: string, days: number) {
  const d = parseDate(date)
  if (!d) return date
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

/** "2026-11-22" -> "Sunday, 22 November" */
export function formatDate(date: string) {
  const d = parseDate(date)
  if (!d) return date
  return `${DAY_NAMES[d.getUTCDay()]}, ${d.getUTCDate()} ${d.toLocaleString("en-IN", { month: "long", timeZone: "UTC" })}`
}

/** Whether the hospital (or, when given, the doctor) works at this minute on this date. */
function isOpen(d: Date, minutes: number, doctor?: Doctor) {
  const weekday = d.getUTCDay()
  if (doctor?.schedule) {
    const nth = Math.ceil(d.getUTCDate() / 7)
    return doctor.schedule.some(
      (s) => s.days.includes(weekday) && (s.nth === undefined || s.nth === nth) && s.ranges.some(([from, to]) => minutes >= hhmm(from) && minutes < hhmm(to)),
    )
  }
  const hours = OPENING_HOURS.find((h) => (h.days as readonly string[]).includes(DAY_NAMES[weekday]))
  return !!hours && minutes >= hhmm(hours.opens) && minutes < hhmm(hours.closes)
}

/**
 * The slots a patient can choose on `date` (YYYY-MM-DD), optionally with a specific doctor.
 * Past dates return nothing; for today, slots that have already started are removed.
 */
export function availableSlots(date: string, doctorName = "", now: Date = new Date()): string[] {
  const d = parseDate(date)
  if (!d) return []
  const today = istNow(now)
  if (date < today.date) return []
  const doctor = doctorName ? doctorByName(doctorName) : undefined
  return BASE_SLOTS.filter((slot) => {
    const minutes = slotMinutes(slot)
    if (date === today.date && minutes <= today.minutes) return false
    return isOpen(d, minutes, doctor)
  })
}

/** The first date from `from` (inclusive) with at least one free slot, looking up to ~2 months ahead. */
export function nextAvailableDate(doctorName = "", from?: string, now: Date = new Date()): string | null {
  let date = from && from > istNow(now).date ? from : istNow(now).date
  for (let i = 0; i < 70; i++, date = addDays(date, 1)) {
    if (availableSlots(date, doctorName, now).length) return date
  }
  return null
}
