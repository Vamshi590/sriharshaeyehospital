import { serializeJsonLd } from "../seo/schema"

/** Inline JSON-LD block. Rendered in the page body so it is part of the prerendered HTML. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
}
