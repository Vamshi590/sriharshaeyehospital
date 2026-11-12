import { lazyPage, type LazyPage } from "./lazy-page"

export const Services = lazyPage(() => import("./pages/services"))
export const ServiceDetail = lazyPage(() => import("./pages/service-detail"))
export const Doctors = lazyPage(() => import("./pages/doctors"))
export const DoctorProfile = lazyPage(() => import("./pages/doctor-profile"))
export const Appointment = lazyPage(() => import("./pages/appointment"))
export const Patients = lazyPage(() => import("./pages/patients"))
export const Costs = lazyPage(() => import("./pages/costs"))
export const Insurance = lazyPage(() => import("./pages/insurance"))
export const FirstVisit = lazyPage(() => import("./pages/first-visit"))
export const CataractGuide = lazyPage(() => import("./pages/cataract-guide"))
export const About = lazyPage(() => import("./pages/about"))
export const Gallery = lazyPage(() => import("./pages/gallery"))
export const HealthLibrary = lazyPage(() => import("./pages/health-library"))
export const Article = lazyPage(() => import("./pages/article"))
export const Contact = lazyPage(() => import("./pages/contact"))
export const TeHome = lazyPage(() => import("./pages/te/te-home"))
export const TeService = lazyPage(() => import("./pages/te/te-service"))
export const TeContact = lazyPage(() => import("./pages/te/te-contact"))
export const Landing = lazyPage(() => import("./pages/landing"))

/** Route pattern -> split page component, used to preload the current page before hydration. */
export const PAGE_FOR_PATTERN: Record<string, LazyPage | undefined> = {
  "/services": Services,
  "/eye-care/:slug": ServiceDetail,
  "/doctors": Doctors,
  "/doctors/:slug": DoctorProfile,
  "/appointment": Appointment,
  "/patients": Patients,
  "/patients/costs": Costs,
  "/patients/insurance": Insurance,
  "/patients/first-visit": FirstVisit,
  "/patients/cataract-surgery-guide": CataractGuide,
  "/about": About,
  "/gallery": Gallery,
  "/health-library": HealthLibrary,
  "/health-library/:slug": Article,
  "/contact": Contact,
  "/te": TeHome,
  "/te/contact": TeContact,
  "/te/:slug": TeService,
  "/lp/:id": Landing,
}

/** All route patterns, exported so tests can check every page in routes.ts resolves to one. */
export const ROUTE_PATTERNS = [
  "/",
  "/services",
  "/eye-care/:slug",
  "/doctors",
  "/doctors/:slug",
  "/appointment",
  "/patients",
  "/patients/costs",
  "/patients/insurance",
  "/patients/first-visit",
  "/patients/cataract-surgery-guide",
  "/about",
  "/gallery",
  "/health-library",
  "/health-library/:slug",
  "/contact",
  "/te",
  "/te/contact",
  "/te/:slug",
  "/lp/:id",
]
