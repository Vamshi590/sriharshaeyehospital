/**
 * Privacy-light analytics: GA4 loads only when VITE_GA_ID is set.
 * Tracks the conversions campaigns care about (call, WhatsApp, booking) and remembers the
 * visitor's UTM campaign for the session, so a booking can be attributed to an ad.
 * No health details or form contents are ever sent.
 */
type Params = Record<string, string | number | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const
const STORE = "she_utm"

export function captureUtm(search: string, storage: Pick<Storage, "getItem" | "setItem"> | undefined = safeSession()) {
  const q = new URLSearchParams(search)
  const found: Record<string, string> = {}
  for (const k of UTM_KEYS) {
    const v = q.get(k)
    if (v) found[k] = v.slice(0, 100)
  }
  if (Object.keys(found).length && storage) {
    try {
      storage.setItem(STORE, JSON.stringify(found))
    } catch {
      /* storage can be unavailable (private mode) */
    }
  }
  return found
}

export function storedUtm(storage: Pick<Storage, "getItem"> | undefined = safeSession()): Record<string, string> {
  try {
    return JSON.parse(storage?.getItem(STORE) ?? "{}")
  } catch {
    return {}
  }
}

function safeSession(): Storage | undefined {
  try {
    return typeof window !== "undefined" ? window.sessionStorage : undefined
  } catch {
    return undefined
  }
}

export function initAnalytics(id = import.meta.env.VITE_GA_ID as string | undefined) {
  if (!id || typeof document === "undefined" || window.gtag) return false
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag("js", new Date())
  // send_page_view: false — RouteHead sends page_view itself (on load and on every client-side navigation),
  // so letting config send one too would count every landing twice.
  window.gtag("config", id, { anonymize_ip: true, send_page_view: false })
  const s = document.createElement("script")
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(s)
  return true
}

export function track(event: "call_click" | "whatsapp_click" | "book_submit" | "book_click" | "page_view", params: Params = {}) {
  const payload = { ...storedUtm(), ...params }
  window.gtag?.("event", event, payload)
  return payload
}

/** Classifies a clicked link as a conversion, if it is one. */
export function conversionFor(href: string | null): "call_click" | "whatsapp_click" | "book_click" | null {
  if (!href) return null
  if (href.startsWith("tel:")) return "call_click"
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "whatsapp_click"
  if (/^\/appointment(\?|$)/.test(href)) return "book_click"
  return null
}

/** One delegated listener for every call / WhatsApp / booking link on the site. */
export function installConversionTracking(root: Document = document) {
  const handler = (e: Event) => {
    const a = (e.target as Element | null)?.closest?.("a")
    const kind = conversionFor(a?.getAttribute("href") ?? null)
    if (kind) track(kind, { page: window.location.pathname })
  }
  root.addEventListener("click", handler)
  return () => root.removeEventListener("click", handler)
}
