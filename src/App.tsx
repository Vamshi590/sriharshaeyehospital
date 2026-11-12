import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/navigation"
import { Footer } from "./components/footer"
import { RouteHead } from "./components/route-head"
import { JsonLd } from "./components/json-ld"
import { ActionBar } from "./components/action-bar"
import Home from "./pages/home"
import NotFound from "./pages/not-found"
import {
  Services,
  ServiceDetail,
  Doctors,
  DoctorProfile,
  Appointment,
  Patients,
  Costs,
  Insurance,
  FirstVisit,
  CataractGuide,
  About,
  Gallery,
  HealthLibrary,
  Article,
  Contact,
  TeHome,
  TeService,
  TeContact,
  Landing,
} from "./routes-table"
import { breadcrumbSchema, hospitalSchema } from "./seo/schema"
import { metaFor } from "./seo/routes"


/** Client-side navigation keeps the scroll position, so reset it on every route change. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function SiteSchema() {
  const { pathname } = useLocation()
  const crumbs = breadcrumbSchema(metaFor(pathname))
  return (
    <>
      <JsonLd data={hospitalSchema()} />
      {crumbs && <JsonLd data={crumbs} />}
    </>
  )
}

/** Routes and layout. The router itself is provided by main.tsx (browser) or entry-server.tsx (prerender). */
export default function App() {
  const { pathname } = useLocation()

  // Ad landing pages: no site navigation, one action.
  if (pathname.startsWith("/lp/")) {
    return (
      <>
        <RouteHead />
        <Routes>
          <Route path="/lp/:id" element={<Landing />} />
        </Routes>
        <SiteSchema />
      </>
    )
  }

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-blue-700 focus:font-semibold focus:shadow-lg">
        Skip to main content
      </a>
      <ScrollToTop />
      <RouteHead />
      <Navbar />
      <main id="main" tabIndex={-1} className="pt-16 focus:outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/eye-care/:slug" element={<ServiceDetail />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:slug" element={<DoctorProfile />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/costs" element={<Costs />} />
          <Route path="/patients/insurance" element={<Insurance />} />
          <Route path="/patients/first-visit" element={<FirstVisit />} />
          <Route path="/patients/cataract-surgery-guide" element={<CataractGuide />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/health-library" element={<HealthLibrary />} />
          <Route path="/health-library/:slug" element={<Article />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/te" element={<TeHome />} />
          <Route path="/te/contact" element={<TeContact />} />
          <Route path="/te/:slug" element={<TeService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ActionBar />
      <SiteSchema />
    </>
  )
}
