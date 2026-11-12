import { describe, expect, it, vi } from "vitest"
import { act } from "@testing-library/react"
import { renderToString } from "react-dom/server"
import { hydrateRoot } from "react-dom/client"
import { MemoryRouter, StaticRouter } from "react-router-dom"
import App from "./App"
import { routes } from "./seo/routes"

/**
 * The browser hydrates the prerendered HTML. Any difference between server and client
 * output makes React throw the HTML away and re-render (slow, and flickers the hero).
 */
describe("hydration", () => {
  it.each([...routes.map((r) => r.path), "/missing-page"])("%s hydrates without mismatches", async (path) => {
    const html = renderToString(
      <StaticRouter location={path}>
        <App />
      </StaticRouter>,
    )
    const container = document.createElement("div")
    container.innerHTML = html
    document.body.appendChild(container)

    const recoverable = vi.fn()
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
    let root: ReturnType<typeof hydrateRoot> | undefined
    await act(async () => {
      root = hydrateRoot(
        container,
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>,
        { onRecoverableError: recoverable },
      )
    })
    const hydrationErrors = consoleError.mock.calls.filter((c) => /hydrat/i.test(String(c[0])))
    consoleError.mockRestore()
    expect(recoverable).not.toHaveBeenCalled()
    expect(hydrationErrors).toEqual([])
    act(() => root!.unmount())
    container.remove()
  })
})
