/** Per-route SEO metadata. Every route in App.tsx must resolve to an entry here (tests enforce it). */
import { services, servicePath } from "../data/services"
import { doctors, doctorPath } from "../data/doctors"
import { articles, articlePath } from "../data/articles"
import { teServices, tePath } from "../data/te"
import { landings } from "../data/landing"

export type RouteMeta = {
  path: string
  title: string
  description: string
  /** Breadcrumb label. */
  label: string
  /** Path of the parent page, for breadcrumbs. */
  parent?: string
  changefreq: "weekly" | "monthly" | "yearly"
  priority: number
  noindex?: boolean
  lang?: "en" | "te"
  /** Same page in the other language (hreflang). */
  alternate?: string
}

const H = "Sri Harsha Eye Hospital"

const base: RouteMeta[] = [
  {
    path: "/",
    label: "Home",
    title: `${H}, Karimnagar | NABH Eye Hospital`,
    description:
      "NABH-accredited eye hospital in Karimnagar for cataract surgery, retina, glaucoma, cornea, oculoplasty and children's eye care. Aarogyasri and EHS accepted.",
    changefreq: "weekly",
    priority: 1,
    alternate: "/te",
  },
  {
    path: "/services",
    label: "Eye Care",
    title: `Eye Treatments in Karimnagar | ${H}`,
    description:
      "Cataract surgery with IOL options, diabetic retinopathy, retina, glaucoma, children's eye care, cornea and dry eye treatment at Sri Harsha Eye Hospital, Karimnagar.",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/doctors",
    label: "Doctors",
    title: `Eye Specialists in Karimnagar | ${H}`,
    description:
      "Meet the ophthalmologists at Sri Harsha Eye Hospital, Karimnagar: cataract, retina, oculoplasty, cornea and paediatric eye specialists, with OPD timings.",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/appointment",
    label: "Book an Appointment",
    title: `Book an Eye Appointment | ${H}`,
    description:
      "Book an eye check-up or consultation at Sri Harsha Eye Hospital, Karimnagar online, by phone or on WhatsApp. We confirm your slot within 24 hours.",
    changefreq: "yearly",
    priority: 0.8,
  },
  {
    path: "/patients",
    label: "Patients",
    title: `Patient Information | ${H}, Karimnagar`,
    description:
      "Costs, insurance and government schemes, your first visit and cataract surgery guidance for patients of Sri Harsha Eye Hospital, Karimnagar.",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/patients/costs",
    parent: "/patients",
    label: "Costs",
    title: `Eye Treatment Costs in Karimnagar | ${H}`,
    description:
      "What consultation, eye check-up, cataract surgery and eye tests include at Sri Harsha Eye Hospital, Karimnagar, and how Aarogyasri, EHS and insurance help.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/patients/insurance",
    parent: "/patients",
    label: "Insurance and Schemes",
    title: `Aarogyasri, EHS and Insurance | ${H}`,
    description:
      "Aarogyasri, EHS and cashless insurance at Sri Harsha Eye Hospital, Karimnagar: insurers accepted, documents to bring and the cashless process step by step.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/patients/first-visit",
    parent: "/patients",
    label: "Your First Visit",
    title: `Your First Visit | ${H}, Karimnagar`,
    description:
      "What to bring, how long an eye check-up takes, dilation drops and how to reach Sri Harsha Eye Hospital, Karimnagar for your first visit.",
    changefreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/patients/cataract-surgery-guide",
    parent: "/patients",
    label: "Cataract Surgery Guide",
    title: `Before and After Cataract Surgery | ${H}`,
    description:
      "Step-by-step guide to cataract surgery at Sri Harsha Eye Hospital, Karimnagar: tests before surgery, the day of surgery, eye drops and recovery.",
    changefreq: "yearly",
    priority: 0.7,
  },
  {
    path: "/about",
    label: "About",
    title: "About Us | NABH Eye Hospital in Karimnagar | Sri Harsha",
    description:
      "About Sri Harsha Eye Hospital, a NABH-accredited eye hospital in Karimnagar, Telangana: our team, facilities, equipment and community eye camps.",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/gallery",
    parent: "/about",
    label: "Gallery",
    title: `Hospital Facilities and Eye Camps | ${H}`,
    description:
      "See the operation theatre, diagnostic equipment, wards and community eye camps of Sri Harsha Eye Hospital in Karimnagar, Telangana.",
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    path: "/health-library",
    label: "Health Library",
    title: `Eye Health Library | ${H}`,
    description:
      "Plain-language articles on cataract, diabetes and the eyes, glaucoma, children's vision and eye care from Sri Harsha Eye Hospital, Karimnagar.",
    changefreq: "weekly",
    priority: 0.6,
  },
  {
    path: "/contact",
    label: "Contact",
    title: `Contact and Directions | ${H}, Karimnagar`,
    description:
      "Address, phone, WhatsApp, timings and map for Sri Harsha Eye Hospital near Mancherial Chowrasta, Karimnagar, Telangana 505001.",
    changefreq: "yearly",
    priority: 0.8,
    alternate: "/te/contact",
  },
]

const teAlt = (enPath: string) => teServices.find((t) => t.en === enPath)

const servicesMeta: RouteMeta[] = services.map((s) => ({
  path: servicePath(s),
  parent: "/services",
  label: s.name,
  title: s.title,
  description: s.description,
  changefreq: "monthly",
  priority: 0.9,
  alternate: teAlt(servicePath(s)) ? tePath(teAlt(servicePath(s))!) : undefined,
}))

const doctorsMeta: RouteMeta[] = doctors.map((d) => ({
  path: doctorPath(d),
  parent: "/doctors",
  label: d.name,
  title: `${d.name}, ${d.specialization} | Karimnagar`.slice(0, 60).trim(),
  description: `${d.name} (${d.qualifications}), ${d.specialization} at Sri Harsha Eye Hospital, Karimnagar. ${d.experience} experience. OPD timings and booking.`.slice(0, 165),
  changefreq: "monthly",
  priority: 0.7,
}))

const articlesMeta: RouteMeta[] = articles.map((a) => ({
  path: articlePath(a),
  parent: "/health-library",
  label: a.title,
  title: a.title.slice(0, 60).trim(),
  description: a.description,
  changefreq: "yearly",
  priority: 0.5,
}))

const teMeta: RouteMeta[] = [
  {
    path: "/te",
    lang: "te",
    label: "తెలుగు",
    title: `శ్రీ హర్ష కంటి ఆసుపత్రి, కరీంనగర్ | ${H}`,
    description:
      "కరీంనగర్‌లో NABH గుర్తింపు పొందిన కంటి ఆసుపత్రి: క్యాటరాక్ట్, రెటీనా, గ్లకోమా, పిల్లల కంటి చికిత్స. ఆరోగ్యశ్రీ, EHS అంగీకరిస్తాము.",
    changefreq: "monthly",
    priority: 0.8,
    alternate: "/",
  },
  ...teServices.map(
    (t): RouteMeta => ({
      path: tePath(t),
      parent: "/te",
      lang: "te",
      label: t.name,
      title: t.title,
      description: t.description,
      changefreq: "monthly",
      priority: 0.7,
      alternate: t.en,
    }),
  ),
  {
    path: "/te/contact",
    parent: "/te",
    lang: "te",
    label: "సంప్రదించండి",
    title: `సంప్రదించండి | శ్రీ హర్ష కంటి ఆసుపత్రి, కరీంనగర్`,
    description:
      "శ్రీ హర్ష కంటి ఆసుపత్రి అడ్రస్, ఫోన్, వాట్సాప్ మరియు సమయాలు: మంచిర్యాల చౌరస్తా దగ్గర, కరీంనగర్, తెలంగాణ 505001.",
    changefreq: "yearly",
    priority: 0.6,
    alternate: "/contact",
  },
]

const landingMeta: RouteMeta[] = landings.map((l) => ({
  path: `/lp/${l.id}`,
  label: l.headline,
  title: l.headline.slice(0, 60).trim(),
  description: l.sub.slice(0, 165),
  changefreq: "yearly",
  priority: 0,
  noindex: true,
}))

export const routes: RouteMeta[] = [...base, ...servicesMeta, ...doctorsMeta, ...articlesMeta, ...teMeta, ...landingMeta]

export const notFoundMeta: RouteMeta = {
  path: "/404",
  label: "Page not found",
  title: `Page Not Found | ${H}`,
  description: "This page doesn't exist. Find eye care services, doctors and contact details for Sri Harsha Eye Hospital, Karimnagar.",
  changefreq: "yearly",
  priority: 0,
  noindex: true,
}

export function metaFor(pathname: string): RouteMeta {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname
  return routes.find((r) => r.path === clean) ?? notFoundMeta
}

export const indexableRoutes = routes.filter((r) => !r.noindex)

/** Breadcrumb trail from Home to this page. */
export function trail(meta: RouteMeta): RouteMeta[] {
  const out: RouteMeta[] = [meta]
  let cur = meta
  while (cur.parent) {
    const p = routes.find((r) => r.path === cur.parent)
    if (!p) break
    out.unshift(p)
    cur = p
  }
  return out
}
