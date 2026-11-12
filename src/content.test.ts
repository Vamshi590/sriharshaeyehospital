import { describe, expect, it } from "vitest"
import fs from "node:fs"
import path from "node:path"

/**
 * Guards the NMC Guidelines on Ethical Advertising (6 Oct 2026): no superiority or
 * guaranteed-outcome claims, no promotional patient testimonials, no self-made ratings.
 */
const srcDir = path.resolve(__dirname)
const files = fs
  .readdirSync(srcDir, { recursive: true, encoding: "utf8" })
  .filter((f) => /\.(tsx?)$/.test(f) && !/\.test\.tsx?$/.test(f) && !f.startsWith("test"))
const banned = [/\bbest\b/i, /\bno\.?\s?1\b/i, /\bpainless (surgery|procedure|treatment|cataract|removal|operation)/i, /\bguarantee/i, /100% (success|safe|cure)/i, /world[- ]class/i, /state[- ]of[- ]the[- ]art/i, /\brenowned\b/i, /\btestimonial/i]

describe("site copy (NMC advertising rules)", () => {
  it.each(files)("%s has no superiority, guarantee or testimonial wording", (file) => {
    const text = fs.readFileSync(path.join(srcDir, file), "utf8")
      // comments may mention the rules themselves
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "")
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    for (const re of banned) expect(text, `${file} matches ${re}`).not.toMatch(re)
  })

  it("does not show self-assigned star ratings for doctors", () => {
    for (const f of ["pages/home.tsx", "pages/doctors.tsx"]) {
      expect(fs.readFileSync(path.join(srcDir, f), "utf8")).not.toMatch(/doctor\.rating/)
    }
  })
})
