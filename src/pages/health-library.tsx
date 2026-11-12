import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { PageHeader } from "../components/page-header"
import { articles, articlePath } from "../data/articles"

export default function HealthLibraryPage() {
  const sorted = [...articles].sort((a, b) => b.published.localeCompare(a.published))
  return (
    <div>
      <PageHeader title="Eye Health Library" intro={<p>Plain-language answers to common questions about eyes and eye treatment.</p>} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ul className="space-y-4">
          {sorted.map((a) => (
            <li key={a.slug}>
              <Link to={articlePath(a)} className="group block p-6 rounded-2xl border border-border hover:border-primary/40 bg-white">
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary mb-2">{a.title}</h2>
                <p className="text-foreground/70 mb-3">{a.description}</p>
                <span className="text-sm text-foreground/70">
                  <time dateTime={a.updated ?? a.published}>{a.updated ?? a.published}</time>
                </span>
                <ArrowRight size={18} className="inline ml-2 text-primary" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
