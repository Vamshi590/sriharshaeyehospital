import { Link } from "react-router-dom"
import { ArrowRight, IndianRupee, ShieldCheck, ClipboardList, Eye, BookOpen } from "lucide-react"
import { PageHeader } from "../components/page-header"

const items = [
  { to: "/patients/costs", icon: IndianRupee, title: "Costs", text: "What consultations, check-ups, cataract surgery and tests include." },
  { to: "/patients/insurance", icon: ShieldCheck, title: "Insurance and schemes", text: "Aarogyasri, EHS and cashless insurance, step by step." },
  { to: "/patients/first-visit", icon: ClipboardList, title: "Your first visit", text: "What to bring, how long it takes and how to reach us." },
  { to: "/patients/cataract-surgery-guide", icon: Eye, title: "Cataract surgery guide", text: "Before, on the day and after your cataract surgery." },
  { to: "/health-library", icon: BookOpen, title: "Health library", text: "Plain-language articles on common eye problems." },
]

export default function PatientsPage() {
  return (
    <div>
      <PageHeader title="Patient Information" intro={<p>Everything you need to plan your visit, your treatment and its cost.</p>} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ul className="grid sm:grid-cols-2 gap-5">
          {items.map(({ to, icon: Icon, title, text }) => (
            <li key={to}>
              <Link to={to} className="group flex gap-4 p-6 h-full rounded-2xl border border-border hover:border-primary/40 hover:shadow-md bg-white">
                <Icon size={28} className="text-primary flex-shrink-0" aria-hidden="true" />
                <span>
                  <h2 className="font-semibold text-lg text-foreground mb-1">{title}</h2>
                  <span className="text-foreground/65 text-sm">{text}</span>
                </span>
                <ArrowRight size={18} className="ml-auto text-foreground/40 group-hover:text-primary" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
