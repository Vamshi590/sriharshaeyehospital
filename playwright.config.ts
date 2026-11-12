import { defineConfig, devices } from "@playwright/test"

/**
 * Real-browser UI tests (tests/e2e). Run with `npm run test:e2e` after `npm run build`.
 *
 * Two servers:
 *  - :4173 serves the production build (prerendered HTML + hydration), exactly what Vercel serves.
 *  - :5174 is the dev server with a fake Supabase URL, so booking can be tested end to end
 *    with the network request intercepted (nothing is ever sent to the real database).
 */
export const PREVIEW_URL = "http://localhost:4173"
export const BOOKING_URL = "http://localhost:5174"
export const FAKE_SUPABASE = "https://e2e.supabase.test"

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: PREVIEW_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "mobile", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 900 } } },
  ],
  webServer: [
    {
      command: "npx vite preview --port 4173 --strictPort",
      url: PREVIEW_URL,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npx vite --port 5174 --strictPort",
      url: BOOKING_URL,
      reuseExistingServer: !process.env.CI,
      env: { VITE_SUPABASE_URL: FAKE_SUPABASE, VITE_SUPABASE_KEY: "e2e-anon-key" },
    },
  ],
})
