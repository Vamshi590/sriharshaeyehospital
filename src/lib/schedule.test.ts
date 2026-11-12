import { describe, expect, it } from "vitest"
import { BASE_SLOTS, addDays, availableSlots, formatDate, istNow, nextAvailableDate, slotMinutes } from "./schedule"
import { doctors } from "../data/doctors"

// November 2026: the 1st is a Sunday. 16th = Monday, 15th/22nd = Sundays, 20th = 3rd Friday, 22nd = 4th Sunday.
/** A moment in India Standard Time. */
const ist = (isoLocal: string) => new Date(`${isoLocal}+05:30`)
const BEFORE_OPENING = ist("2026-11-12T07:00:00")

describe("slotMinutes", () => {
  it.each([
    ["09:00 AM", 540],
    ["12:30 PM", 750],
    ["02:30 PM", 870],
    ["07:30 PM", 1170],
    ["12:00 AM", 0],
  ])("%s -> %i", (slot, minutes) => expect(slotMinutes(slot)).toBe(minutes))
  it("returns NaN for garbage", () => expect(slotMinutes("noon")).toBeNaN())
})

describe("istNow", () => {
  it("uses India time, not UTC: 20:00 UTC is already the next day in Karimnagar", () => {
    expect(istNow(new Date("2026-11-12T20:00:00Z"))).toEqual({ date: "2026-11-13", minutes: 90 })
  })
  it("converts minutes", () => {
    expect(istNow(ist("2026-11-12T14:45:00")).minutes).toBe(14 * 60 + 45)
  })
})

describe("dates", () => {
  it("adds days across month ends", () => expect(addDays("2026-11-30", 1)).toBe("2026-12-01"))
  it("formats a date for people", () => expect(formatDate("2026-11-22")).toBe("Sunday, 22 November"))
})

describe("availableSlots: hospital hours (any doctor)", () => {
  it("offers every slot on a weekday", () => {
    expect(availableSlots("2026-11-16", "", BEFORE_OPENING)).toEqual([...BASE_SLOTS])
  })
  it("offers only Sunday-hours slots (10 AM - 2:30 PM) on a Sunday", () => {
    expect(availableSlots("2026-11-15", "", BEFORE_OPENING)).toEqual(["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM"])
  })
  it("offers nothing for a past date", () => {
    expect(availableSlots("2026-11-11", "", BEFORE_OPENING)).toEqual([])
  })
  it("drops slots that have already started today", () => {
    expect(availableSlots("2026-11-12", "", ist("2026-11-12T17:10:00"))).toEqual(["05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"])
  })
  it("offers nothing late in the evening for today", () => {
    expect(availableSlots("2026-11-12", "", ist("2026-11-12T19:45:00"))).toEqual([])
  })
  it.each(["", "2026-13-01", "2026-02-31", "15/11/2026"])("rejects the invalid date %j", (d) => {
    expect(availableSlots(d, "", BEFORE_OPENING)).toEqual([])
  })
  it("ignores an unknown doctor name and falls back to hospital hours", () => {
    expect(availableSlots("2026-11-16", "Dr. Nobody", BEFORE_OPENING)).toEqual([...BASE_SLOTS])
  })
})

describe("availableSlots: doctors' published timings", () => {
  it("Dr. Srilatha CH: Mon-Sat 10-2:30 and 6-7:30", () => {
    expect(availableSlots("2026-11-16", "Dr. Srilatha CH", BEFORE_OPENING)).toEqual([
      "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM", "06:00 PM", "06:30 PM", "07:00 PM",
    ])
  })
  it("Dr. Srilatha CH: Sunday 10-1:30", () => {
    expect(availableSlots("2026-11-15", "Dr. Srilatha CH", BEFORE_OPENING)).toEqual(["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"])
  })
  it("Dr. Ram Kumar: only on the 4th Sunday, 8-10 AM", () => {
    expect(availableSlots("2026-11-22", "Dr. Ram Kumar", BEFORE_OPENING)).toEqual(["09:00 AM", "09:30 AM"])
    expect(availableSlots("2026-11-15", "Dr. Ram Kumar", BEFORE_OPENING)).toEqual([])
    expect(availableSlots("2026-11-16", "Dr. Ram Kumar", BEFORE_OPENING)).toEqual([])
    expect(availableSlots("2026-11-29", "Dr. Ram Kumar", BEFORE_OPENING)).toEqual([]) // 5th Sunday
  })
  it("Dr. Ekta Agarwal: only on the 3rd Friday, 9:30-12:30", () => {
    expect(availableSlots("2026-11-20", "Dr. Ekta Agarwal", BEFORE_OPENING)).toEqual(["09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"])
    expect(availableSlots("2026-11-13", "Dr. Ekta Agarwal", BEFORE_OPENING)).toEqual([])
  })
  it("doctors without published timings follow hospital hours", () => {
    expect(availableSlots("2026-11-15", "Dr. Sampath", BEFORE_OPENING)).toEqual(availableSlots("2026-11-15", "", BEFORE_OPENING))
  })
  it("every doctor with published timings has a bookable schedule", () => {
    for (const d of doctors.filter((d) => d.timings)) expect(d.schedule, d.name).toBeTruthy()
  })
  it("every visiting consultant can be booked within the next two months", () => {
    for (const d of doctors.filter((d) => d.availability === "visiting")) {
      expect(nextAvailableDate(d.name, undefined, BEFORE_OPENING), d.name).not.toBeNull()
    }
  })
})

describe("nextAvailableDate", () => {
  it("finds the next 4th Sunday for Dr. Ram Kumar", () => {
    expect(nextAvailableDate("Dr. Ram Kumar", undefined, BEFORE_OPENING)).toBe("2026-11-22")
    expect(nextAvailableDate("Dr. Ram Kumar", "2026-11-23", BEFORE_OPENING)).toBe("2026-12-27")
  })
  it("is today when slots remain today", () => {
    expect(nextAvailableDate("", undefined, BEFORE_OPENING)).toBe("2026-11-12")
  })
  it("moves to tomorrow after closing time", () => {
    expect(nextAvailableDate("", undefined, ist("2026-11-12T20:30:00"))).toBe("2026-11-13")
  })
  it("never starts in the past", () => {
    expect(nextAvailableDate("", "2020-01-01", BEFORE_OPENING)).toBe("2026-11-12")
  })
})
