import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { CheckCircle2, ShieldCheck } from "lucide-react"
import { landingById } from "../data/landing"
import { ADDRESS_LINE_1, ADDRESS_LINE_2, HOSPITAL_NAME, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from "../data/contact"
import { emptyAppointment, submitAppointment } from "../lib/appointment"
import { getSupabase } from "../lib/supabase"
import { istNow } from "../lib/schedule"
import { track } from "../lib/analytics"
import { ActionBar } from "../components/action-bar"
import NotFound from "./not-found"
import logo from "../assets/eye_image.webp"
import eye from "../assets/eye.webp"

/** Campaign landing page: one action, no site navigation, noindex. */
export default function LandingPage() {
  const { id } = useParams()
  const l = landingById(id)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [day, setDay] = useState("")
  const [state, setState] = useState<"idle" | "sending" | "done">("idle")
  const [error, setError] = useState<string | null>(null)
  // "Today" is set after hydration: the page is prerendered, so a build-time date would go stale.
  const [minDay, setMinDay] = useState<string | undefined>(undefined)
  const doneRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => setMinDay(istNow().date), [])
  useEffect(() => {
    if (state === "done") doneRef.current?.focus()
  }, [state])
  if (!l) return <NotFound />

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setState("sending")
    const result = await submitAppointment(getSupabase, { ...emptyAppointment, name, phonenumber: phone, prefferedDate: day, service: l.service }, PHONE_DISPLAY)
    if (result.ok) {
      track("book_submit", { form: "landing", landing: l.id })
      setState("done")
    } else {
      setError(result.message)
      setState("idle")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pb-20 md:pb-0">
      <header className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <img src={logo} alt="" width={32} height={32} />
          <span className="font-bold text-gray-900 whitespace-nowrap">{HOSPITAL_NAME}</span>
        </span>
        <a href={`tel:${PHONE_TEL}`} className="hidden sm:inline font-semibold text-blue-700">{PHONE_DISPLAY}</a>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-5">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">{l.headline}</h1>
          <p className="text-lg text-gray-700">{l.sub}</p>
          <ul className="space-y-2">
            {l.points.map((p) => (
              <li key={p} className="flex gap-2 text-gray-800">
                <CheckCircle2 size={20} className="text-blue-500 flex-shrink-0 mt-0.5" aria-hidden="true" /> {p}
              </li>
            ))}
          </ul>
          <img src={eye} alt="Illustration of a human eye" width={732} height={604} className="hidden md:block w-72 drop-shadow-2xl" />
        </div>
        <section id="book" className="bg-white rounded-2xl shadow-xl border border-border p-6 md:p-8" aria-labelledby="form-title">
          {state === "done" ? (
            <div role="status" className="text-center py-6">
              <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-3" aria-hidden="true" />
              <h2 id="form-title" ref={doneRef} tabIndex={-1} className="text-2xl font-bold mb-2 focus:outline-none">Request received</h2>
              <p className="text-gray-700">We'll call you within 24 hours to confirm your appointment. For urgent help, call {PHONE_DISPLAY}.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h2 id="form-title" className="text-2xl font-bold mb-1">Request a call back</h2>
              <p className="text-sm text-gray-600 mb-5">Takes 20 seconds. We call you to confirm a time.</p>
              <label htmlFor="lp-name" className="block text-sm font-medium mb-1">Your name</label>
              <input id="lp-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="w-full mb-4 px-4 py-3 border border-border rounded-lg" required />
              <label htmlFor="lp-phone" className="block text-sm font-medium mb-1">Mobile number</label>
              <input id="lp-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" className="w-full mb-4 px-4 py-3 border border-border rounded-lg" required />
              <label htmlFor="lp-day" className="block text-sm font-medium mb-1">Preferred day (optional)</label>
              <input id="lp-day" type="date" min={minDay} value={day} onChange={(e) => setDay(e.target.value)} className="w-full mb-5 px-4 py-3 border border-border rounded-lg" />
              {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}
              <button type="submit" disabled={state === "sending"} className="w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-700 text-white font-semibold disabled:opacity-60">
                {state === "sending" ? "Sending..." : "Request a call back"}
              </button>
              <p className="mt-4 text-center text-sm text-gray-600">
                or <a href={whatsappLink(l.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold">message us on WhatsApp</a>
              </p>
            </form>
          )}
        </section>
      </main>
      <footer className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex items-start gap-2">
        <ShieldCheck size={18} className="text-blue-500 flex-shrink-0" aria-hidden="true" />
        <span><span className="whitespace-nowrap">{HOSPITAL_NAME}</span>, NABH-accredited. {ADDRESS_LINE_1}, {ADDRESS_LINE_2}.</span>
      </footer>
      <ActionBar message={l.whatsappMessage} bookTo="#book" />
    </div>
  )
}
