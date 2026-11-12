import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { BrowserRouter, HashRouter } from "react-router-dom"
import "./index.css"
import { matchRoutes } from "react-router-dom"
import App from "./App.tsx"
import { PAGE_FOR_PATTERN, ROUTE_PATTERNS } from "./routes-table"
import { preloadAllPages } from "./lazy-page"
import { captureUtm, initAnalytics, installConversionTracking } from "./lib/analytics"

// The prerendered files are /index.html, /services.html, ... If one is opened by its file name,
// switch to the clean URL before React Router reads it (Vercel's cleanUrls normally does this).
const clean = window.location.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "")
if (clean !== window.location.pathname) {
  window.history.replaceState(null, "", clean + window.location.search + window.location.hash)
}

captureUtm(window.location.search)
initAnalytics()
installConversionTracking()

// Preview builds (VITE_HASH_ROUTER=1) run inside hosts that only allow #hash navigation.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter

const container = document.getElementById("root")!
const app = (
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
)

// Pages are prerendered to static HTML at build time. Load the current page's code first,
// then hydrate, so React reuses the HTML instead of flashing a loading state.
async function start() {
  const match = matchRoutes(ROUTE_PATTERNS.map((path) => ({ path })), window.location.pathname)
  const page = match?.[0] && PAGE_FOR_PATTERN[match[0].route.path]
  if (page) await page.preload()
  // Hydrate only markup that was prerendered for this URL (or the 404 page). A host that falls back
  // to index.html for unknown paths would otherwise cause a hydration mismatch; render fresh instead.
  const renderedFor = container.dataset.prerendered
  const path = window.location.pathname.replace(/\/$/, "") || "/"
  const matches = renderedFor === undefined || renderedFor === path || (renderedFor === "/404" && !page)
  if (container.firstElementChild && matches) hydrateRoot(container, app)
  else {
    container.textContent = ""
    createRoot(container).render(app)
  }
  // Fetch the other pages in the background so navigation is instant.
  const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2000))
  idle(() => void preloadAllPages())
}
void start()
