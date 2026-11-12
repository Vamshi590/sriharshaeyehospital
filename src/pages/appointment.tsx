import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Calendar, User, Phone, Mail, MessageSquare, CheckCircle, AlertCircle, Info } from "lucide-react"
import { getSupabase } from "../lib/supabase"
import { track } from "../lib/analytics"
import { emptyAppointment as emptyForm, submitAppointment, type AppointmentForm } from "../lib/appointment"
import { availableSlots, formatDate, istNow, nextAvailableDate } from "../lib/schedule"
import { doctors as doctorList, doctorByName } from "../data/doctors"
import { BOOKING_SERVICES } from "../data/booking"
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "../data/contact"
import { PageHeader } from "../components/page-header"

const fieldClass =
  "w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white text-foreground"
const labelClass = "block text-sm font-medium text-foreground mb-2"

const steps = [
  { title: "Fill the form", description: "Your name, phone number and the care you need" },
  { title: "Choose a doctor", description: "Pick a doctor, or let us assign one" },
  { title: "Pick a time", description: "Only times we can actually offer are shown" },
  { title: "We call to confirm", description: "Our team calls you to confirm the appointment" },
]

export default function AppointmentPage() {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState<AppointmentForm>(emptyForm)
  const [minDate, setMinDate] = useState<string | undefined>(undefined)
  const [now, setNow] = useState<Date | null>(null)
  const [submitted, setSubmitted] = useState<AppointmentForm | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  // Client-only values: the page is prerendered, so "today" and the URL query can't be baked in.
  useEffect(() => {
    const t = new Date()
    setNow(t)
    setMinDate(istNow(t).date)
    const doctor = searchParams.get("doctor") ?? ""
    const service = searchParams.get("service") ?? ""
    setFormData((prev) => ({
      ...prev,
      doctor: doctorByName(doctor) ? doctor : prev.doctor,
      service: BOOKING_SERVICES.includes(service) ? service : prev.service,
    }))
  }, [searchParams])

  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])

  const slots = formData.prefferedDate && now ? availableSlots(formData.prefferedDate, formData.doctor, now) : []
  const doctor = formData.doctor ? doctorByName(formData.doctor) : undefined
  const nextDate = now && formData.prefferedDate && slots.length === 0 ? nextAvailableDate(formData.doctor, formData.prefferedDate, now) : null
  const nextVisit = now && doctor?.availability === "visiting" ? nextAvailableDate(doctor.name, undefined, now) : null

  /** Updates a field, clearing the chosen time if it's no longer offered for the new date/doctor. */
  const update = (patch: Partial<AppointmentForm>) => {
    setFormData((prev) => {
      const next = { ...prev, ...patch }
      if (next.prefferedTime && !availableSlots(next.prefferedDate, next.doctor, now ?? new Date()).includes(next.prefferedTime)) {
        next.prefferedTime = ""
      }
      return next
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    update({ [e.target.name]: e.target.value } as Partial<AppointmentForm>)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!formData.prefferedTime) {
      setError("Please choose a time for your appointment.")
      return
    }
    setSubmitting(true)
    try {
      const result = await submitAppointment(getSupabase, formData, PHONE_DISPLAY)
      if (result.ok) {
        track("book_submit", { form: "appointment" })
        setSubmitted(formData)
      } else setError(result.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData(emptyForm)
    setError(null)
  }

  return (
    <div>
      <PageHeader title="Book an Appointment" intro={<p>Request a consultation with our ophthalmologists. We call you to confirm.</p>} />

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div role="status" className="text-center py-8 md:py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <CheckCircle className="text-green-700" size={32} aria-hidden="true" />
              </div>
              <h2 ref={successRef} tabIndex={-1} className="text-2xl md:text-3xl font-bold text-foreground mb-3 focus:outline-none">
                Appointment Request Received!
              </h2>
              <p className="text-lg text-foreground/75 mb-6">
                Thank you, {submitted.name.trim()}. Our team will call you on {submitted.phonenumber.trim()} to confirm your appointment.
              </p>
              <dl className="inline-grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-left bg-slate-50 border border-border rounded-xl p-5 mb-6">
                <dt className="text-foreground/70">Service</dt>
                <dd className="font-medium text-foreground">{submitted.service}</dd>
                <dt className="text-foreground/70">Doctor</dt>
                <dd className="font-medium text-foreground">{submitted.doctor || "Any available doctor"}</dd>
                <dt className="text-foreground/70">Requested</dt>
                <dd className="font-medium text-foreground">
                  {formatDate(submitted.prefferedDate)}, {submitted.prefferedTime}
                </dd>
              </dl>
              <p className="text-foreground/75">
                Questions? Call{" "}
                <a href={`tel:${PHONE_TEL}`} className="text-primary font-semibold hover:underline">
                  {PHONE_DISPLAY}
                </a>{" "}
                or email{" "}
                <a href={`mailto:${EMAIL}`} className="text-primary font-semibold hover:underline break-all">
                  {EMAIL}
                </a>
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(null)
                  setFormData(emptyForm)
                }}
                className="mt-8 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/5"
              >
                Book another appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-10" aria-describedby="required-note">
              <p id="required-note" className="text-sm text-foreground/70">
                Fields marked <span aria-hidden="true">*</span>
                <span className="sr-only">with an asterisk</span> are required.
              </p>

              {/* Personal information */}
              <fieldset>
                <legend className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <User size={22} className="text-primary" aria-hidden="true" />
                  Your details
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="appt-name" className={labelClass}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="appt-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      maxLength={80}
                      className={fieldClass}
                      placeholder="Patient's full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="appt-phonenumber" className={labelClass}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="appt-phonenumber"
                      name="phonenumber"
                      value={formData.phonenumber}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={16}
                      aria-describedby="appt-phone-hint"
                      className={fieldClass}
                      placeholder="98XXXXXXXX"
                    />
                    <p id="appt-phone-hint" className="mt-1.5 text-sm text-foreground/70">
                      We'll call this number to confirm.
                    </p>
                  </div>
                </div>
              </fieldset>

              {/* Service and doctor */}
              <fieldset>
                <legend className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <MessageSquare size={22} className="text-primary" aria-hidden="true" />
                  Service &amp; doctor
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="appt-service" className={labelClass}>
                      Service *
                    </label>
                    <select id="appt-service" name="service" value={formData.service} onChange={handleChange} required className={fieldClass}>
                      <option value="">Select a service</option>
                      {BOOKING_SERVICES.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="appt-doctor" className={labelClass}>
                      Preferred Doctor
                    </label>
                    <select
                      id="appt-doctor"
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      aria-describedby={doctor?.timings ? "appt-doctor-hint" : undefined}
                      className={fieldClass}
                    >
                      <option value="">Any available doctor</option>
                      {doctorList.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} – {d.specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {doctor?.timings && (
                  <div id="appt-doctor-hint" className="mt-4 flex items-start gap-2 p-4 rounded-lg bg-blue-50 border border-blue-100 text-sm text-foreground/85">
                    <Info size={18} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p>
                        <span className="font-semibold">{doctor.name}</span>: {doctor.timings}
                      </p>
                      {nextVisit && nextVisit !== formData.prefferedDate && (
                        <p className="mt-1">
                          Next visit: <span className="font-semibold">{formatDate(nextVisit)}</span>.{" "}
                          <button type="button" onClick={() => update({ prefferedDate: nextVisit })} className="text-primary font-semibold underline underline-offset-2">
                            Choose this date
                          </button>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </fieldset>

              {/* Date and time */}
              <fieldset>
                <legend className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <Calendar size={22} className="text-primary" aria-hidden="true" />
                  Date &amp; time
                </legend>
                <div className="space-y-5">
                  <div className="md:max-w-xs">
                    <label htmlFor="appt-prefferedDate" className={labelClass}>
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="appt-prefferedDate"
                      name="prefferedDate"
                      min={minDate}
                      value={formData.prefferedDate}
                      onChange={handleChange}
                      required
                      className={fieldClass}
                    />
                  </div>

                  <div role="radiogroup" aria-labelledby="appt-time-label" aria-required="true">
                    <p id="appt-time-label" className={labelClass}>
                      Preferred Time *
                    </p>
                    {!formData.prefferedDate ? (
                      <p className="text-sm text-foreground/70">Choose a date to see the available times.</p>
                    ) : slots.length === 0 ? (
                      <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900">
                        <p>
                          No appointments are available on {formatDate(formData.prefferedDate)}
                          {doctor ? ` with ${doctor.name}` : ""}.
                        </p>
                        {nextDate && (
                          <button type="button" onClick={() => update({ prefferedDate: nextDate })} className="mt-1 font-semibold underline underline-offset-2">
                            See times on {formatDate(nextDate)}
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {slots.map((slot) => {
                          const checked = formData.prefferedTime === slot
                          return (
                            <label
                              key={slot}
                              className={`relative flex items-center justify-center min-h-11 px-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/60 ${
                                checked ? "bg-primary border-primary text-white" : "bg-white border-border text-foreground hover:border-primary/50"
                              }`}
                            >
                              <input
                                type="radio"
                                name="prefferedTime"
                                value={slot}
                                checked={checked}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              {slot}
                            </label>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </fieldset>

              {error && (
                <div role="alert" className="flex items-start gap-2 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p>{error}</p>
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button type="reset" className="px-6 py-3 rounded-lg font-semibold text-foreground/75 hover:text-foreground hover:bg-slate-100 transition-colors">
                  Clear form
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3.5 md:py-4 bg-gradient-to-r from-blue-600 to-cyan-700 text-white rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Request Appointment"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 md:mb-12 text-center">How It Works</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {steps.map((item, index) => (
              <li key={item.title} className="flex md:flex-col md:text-center items-start md:items-center gap-4 bg-white border border-border p-5 md:p-6 rounded-xl">
                <span className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg" aria-hidden="true">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-semibold text-foreground mb-1">{item.title}</span>
                  <span className="block text-sm text-foreground/75">{item.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Other ways to book */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 md:mb-12 text-center">Other Ways to Book</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: Phone, title: "Call Us", description: "Speak directly with our appointment team", contact: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
              { icon: Mail, title: "Email Us", description: "Send us your appointment request", contact: EMAIL, href: `mailto:${EMAIL}` },
              { icon: MessageSquare, title: "WhatsApp", description: "Quick booking via WhatsApp", contact: PHONE_DISPLAY, href: WHATSAPP_URL },
            ].map((item) => {
              const Icon = item.icon
              const external = item.href.startsWith("http")
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex md:block items-center gap-4 p-5 md:p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-border md:text-center hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <Icon className="text-primary md:mx-auto md:mb-4 flex-shrink-0" size={28} aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block font-semibold text-lg text-foreground md:mb-2">{item.title}</span>
                    <span className="hidden md:block text-sm text-foreground/75 mb-4">{item.description}</span>
                    <span className="block font-semibold text-primary break-all">{item.contact}</span>
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
