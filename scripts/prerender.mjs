// Turns the client build into one static HTML file per route, plus sitemap.xml, robots.txt and llms.txt.
// Run after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr` (see package.json).
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const dist = path.resolve(root, process.env.PRERENDER_OUT ?? "dist")
const ssrEntry = path.resolve(root, process.env.PRERENDER_SSR ?? "dist-ssr/entry-server.js")

const server = await import(pathToFileURL(ssrEntry).href)
await server.preloadAllPages()
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8")
if (!template.includes("<!--app-html-->") || !template.includes("<!--app-head-->")) {
  throw new Error("dist/index.html is missing the <!--app-head--> / <!--app-html--> placeholders")
}

function page(url, meta) {
  const html = server.render(url)
  return template
    .replace('<html lang="en-IN">', `<html lang="${server.htmlLang(meta)}">`)
    .replace("<!--app-head-->", server.renderHead(meta))
    // Record which URL this HTML was rendered for, so the browser only hydrates matching markup.
    .replace('<div id="root">', `<div id="root" data-prerendered="${url}">`)
    .replace("<!--app-html-->", html)
}

function write(rel, contents) {
  const file = path.join(dist, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, contents)
  console.log(`  prerendered ${rel}`)
}

for (const meta of server.routes) {
  write(meta.path === "/" ? "index.html" : `${meta.path.slice(1)}.html`, page(meta.path, meta))
}
write("404.html", page("/404", server.notFoundMeta))

const lastmod = new Date().toISOString().slice(0, 10)
write("sitemap.xml", server.sitemapXml(lastmod))
write("robots.txt", server.robotsTxt())
write("llms.txt", server.llmsTxt())
