import { Link, useParams } from "react-router-dom"
import { PageHeader } from "../components/page-header"
import { CtaBand } from "../components/cta-band"
import { JsonLd } from "../components/json-ld"
import { articleBySlug } from "../data/articles"
import { serviceBySlug, servicePath } from "../data/services"
import { BOOKING_SERVICE } from "../data/booking"
import { articleSchema } from "../seo/schema"
import NotFound from "./not-found"

export default function ArticlePage() {
  const { slug } = useParams()
  const a = articleBySlug(slug)
  if (!a) return <NotFound />
  const s = serviceBySlug(a.service)
  return (
    <div>
      <PageHeader title={a.title} intro={<p>{a.description}</p>}>
        <p className="mt-4 text-sm text-foreground/75">
          Published <time dateTime={a.published}>{a.published}</time>
          {a.updated && <> · Updated <time dateTime={a.updated}>{a.updated}</time></>}
        </p>
      </PageHeader>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {a.sections.map((sec) => (
          <section key={sec.heading} className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">{sec.heading}</h2>
            {sec.body.map((p) => <p key={p} className="text-foreground/80 leading-relaxed mb-3">{p}</p>)}
          </section>
        ))}
        {s && (
          <p className="text-foreground/80">
            Learn more about <Link to={servicePath(s)} className="text-primary font-semibold hover:underline">{s.name.toLowerCase()} at Sri Harsha Eye Hospital</Link>.
          </p>
        )}
        <p className="mt-6 text-sm text-foreground/70">This article is general information and not a substitute for an eye examination.</p>
        <CtaBand service={s ? BOOKING_SERVICE[s.slug] : undefined} />
      </article>
      <JsonLd data={articleSchema(a)} />
    </div>
  )
}
