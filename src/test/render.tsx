import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import App from "../App"

/** Render the whole app (layout + routes) at a given URL. */
export function renderApp(url = "/") {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>,
  )
}
