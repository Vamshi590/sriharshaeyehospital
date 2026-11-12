import "@testing-library/jest-dom/vitest"
import { afterEach, beforeAll, vi } from "vitest"
import { preloadAllPages } from "../lazy-page"
import { cleanup } from "@testing-library/react"

afterEach(() => {
  cleanup()
  document.head.querySelectorAll("[data-seo]").forEach((el) => el.remove())
})

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
Element.prototype.scrollTo = vi.fn() as unknown as typeof Element.prototype.scrollTo

// Route pages are code-split; load them all once so tests render synchronously, as in the prerender.
beforeAll(async () => {
  await import("../App")
  await preloadAllPages()
})
