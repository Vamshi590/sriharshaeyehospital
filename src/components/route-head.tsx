import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { applyHead } from "../seo/head"
import { metaFor } from "../seo/routes"
import { track } from "../lib/analytics"

/** Keeps <title>, description, canonical and Open Graph tags in sync on client-side navigation. */
export function RouteHead() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = metaFor(pathname)
    applyHead(document, meta)
    track("page_view", { page_path: pathname, page_title: meta.title })
  }, [pathname])
  return null
}
