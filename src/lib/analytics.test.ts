import { afterEach, describe, expect, it, vi } from "vitest"
import { captureUtm, conversionFor, initAnalytics, installConversionTracking, storedUtm, track } from "./analytics"

const memory = () => {
  const m = new Map<string, string>()
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) }
}

afterEach(() => {
  delete window.gtag
  delete window.dataLayer
  sessionStorage.clear()
  document.head.querySelectorAll('script[src*="googletagmanager"]').forEach((s) => s.remove())
})

describe("UTM capture", () => {
  it("stores campaign parameters for the session and ignores others", () => {
    const store = memory()
    expect(captureUtm("?utm_source=instagram&utm_campaign=cataract&fbclid=x", store)).toEqual({ utm_source: "instagram", utm_campaign: "cataract" })
    expect(storedUtm(store)).toEqual({ utm_source: "instagram", utm_campaign: "cataract" })
  })
  it("keeps the earlier campaign when a later page has no UTM", () => {
    const store = memory()
    captureUtm("?utm_source=instagram", store)
    captureUtm("", store)
    expect(storedUtm(store)).toEqual({ utm_source: "instagram" })
  })
  it("survives broken storage", () => {
    expect(storedUtm({ getItem: () => "{not json" })).toEqual({})
    expect(() => captureUtm("?utm_source=x", { getItem: () => null, setItem: () => { throw new Error("quota") } })).not.toThrow()
  })
})

describe("conversions", () => {
  it.each([
    ["tel:+919885029367", "call_click"],
    ["https://wa.me/919885029367?text=hi", "whatsapp_click"],
    ["/appointment?service=Cataract%20Surgery", "book_click"],
    ["/appointment", "book_click"],
    ["/services", null],
    [null, null],
  ])("%s -> %s", (href, kind) => {
    expect(conversionFor(href)).toBe(kind)
  })

  it("sends a GA4 event with the campaign attached, never form contents", () => {
    window.gtag = vi.fn()
    sessionStorage.setItem("she_utm", JSON.stringify({ utm_campaign: "eye-checkup" }))
    track("book_submit", { form: "landing" })
    expect(window.gtag).toHaveBeenCalledWith("event", "book_submit", { utm_campaign: "eye-checkup", form: "landing" })
  })

  it("tracks clicks on call links through one delegated listener", () => {
    window.gtag = vi.fn()
    document.body.innerHTML = '<a href="tel:+919885029367"><span>Call</span></a>'
    const stop = installConversionTracking()
    document.querySelector("span")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    expect(window.gtag).toHaveBeenCalledWith("event", "call_click", expect.objectContaining({ page: "/" }))
    stop()
  })
})

describe("initAnalytics", () => {
  it("does nothing without a GA id", () => {
    expect(initAnalytics(undefined)).toBe(false)
    expect(window.gtag).toBeUndefined()
  })
  it("loads gtag once with IP anonymisation", () => {
    expect(initAnalytics("G-TEST123")).toBe(true)
    expect(initAnalytics("G-TEST123")).toBe(false)
    expect(document.head.querySelectorAll('script[src*="googletagmanager"]')).toHaveLength(1)
    expect(window.dataLayer!.some((a) => Array.from(a as ArrayLike<unknown>)[0] === "config")).toBe(true)
  })
})
