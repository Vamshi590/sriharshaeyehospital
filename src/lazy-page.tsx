import { Component, lazy, Suspense, type ComponentType, type ReactNode } from "react"

type Loader = () => Promise<{ default: ComponentType }>

export type LazyPage = ComponentType & { preload: () => Promise<unknown> }

const loaded = new Map<Loader, ComponentType>()
const all: LazyPage[] = []

const loading = <div className="min-h-[60vh]" aria-busy="true" />

const RELOAD_KEY = "page-chunk-reload"

/**
 * If a page's code can't be loaded (usually a tab left open across a deploy, whose old files are gone),
 * reload once to pick up the new build; if that already happened, show a friendly message instead
 * of a blank screen.
 */
class PageErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: unknown) {
    console.error("Page failed to load:", error)
    try {
      if (!sessionStorage.getItem(RELOAD_KEY)) {
        sessionStorage.setItem(RELOAD_KEY, "1")
        window.location.reload()
      }
    } catch {
      // storage unavailable: just show the message
    }
  }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div role="alert" className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-xl font-semibold text-foreground">This page didn't load properly.</p>
        <button type="button" onClick={() => window.location.reload()} className="px-6 py-3 rounded-full bg-primary text-white font-semibold">
          Reload the page
        </button>
      </div>
    )
  }
}

/**
 * A route component whose code is split into its own chunk.
 * Once preloaded it renders synchronously, so prerendered HTML hydrates without a
 * loading flash: main.tsx preloads the current page before hydrating, and the
 * prerender script preloads everything before rendering.
 */
export function lazyPage(loader: Loader): LazyPage {
  const Lazy = lazy(loader)
  const Page = Object.assign(
    function Page() {
      const Loaded = loaded.get(loader)
      if (Loaded) return <Loaded />
      return (
        <PageErrorBoundary>
          <Suspense fallback={loading}>
            <Lazy />
          </Suspense>
        </PageErrorBoundary>
      )
    },
    {
      preload: () =>
        loader().then((m) => {
          loaded.set(loader, m.default)
          try {
            sessionStorage.removeItem(RELOAD_KEY) // loading works again: allow a future auto-reload
          } catch {
            // ignore
          }
        }),
    },
  )
  all.push(Page)
  return Page
}

export const preloadAllPages = () => Promise.all(all.map((p) => p.preload()))
