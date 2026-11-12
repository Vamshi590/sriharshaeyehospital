import type { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { metaFor, trail } from "../seo/routes"

/** Page title band with visible breadcrumbs (they mirror the BreadcrumbList schema). */
export function PageHeader({ title, intro, children }: { title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  const { pathname } = useLocation()
  const meta = metaFor(pathname)
  const crumbs = trail(meta)
  const isTe = meta.lang === "te"
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {crumbs.length > 1 || !isTe ? (
          <nav aria-label="Breadcrumb" className="mb-3 md:mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-foreground/75">
              {!isTe && (
                <li>
                  <Link to="/" className="inline-block py-1 hover:text-primary">Home</Link>
                </li>
              )}
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-1">
                  {(i > 0 || !isTe) && <ChevronRight size={14} aria-hidden="true" />}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-foreground/80">{c.label}</span>
                  ) : (
                    <Link to={c.path} className="inline-block py-1 hover:text-primary">{c.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 text-balance">{title}</h1>
        {intro && <div className="text-base md:text-lg text-foreground/75 max-w-3xl">{intro}</div>}
        {children}
      </div>
    </section>
  )
}
