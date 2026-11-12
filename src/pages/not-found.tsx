import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="text-center max-w-lg">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Error 404</p>
        <h1 className="text-4xl font-bold text-foreground mb-4">Page not found</h1>
        <p className="text-foreground/70 mb-8">The page you're looking for doesn't exist or has moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-700 text-white font-medium">
            Go to home page
          </Link>
          <Link to="/services" className="px-6 py-3 rounded-full border-2 border-blue-200 text-blue-600 font-medium">
            See our services
          </Link>
        </div>
      </div>
    </section>
  )
}
