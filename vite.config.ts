/// <reference types="vitest/config" />
import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["src/**/*.test.{ts,tsx}"],
          setupFiles: ["src/test/setup.ts"],
          css: false,
        },
      },
      {
        extends: true,
        test: {
          name: "build",
          environment: "node",
          include: ["tests/build/**/*.test.ts"],
        },
      },
    ],
  },
})
