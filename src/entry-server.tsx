import { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import App from "./App"
export { preloadAllPages } from "./lazy-page"

export { routes, notFoundMeta, indexableRoutes } from "./seo/routes"
export { renderHead, htmlLang } from "./seo/head"
export { sitemapXml, robotsTxt, llmsTxt } from "./seo/files"

/** Render one route to an HTML string (used by scripts/prerender.mjs). */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
