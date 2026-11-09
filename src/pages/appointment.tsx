import type React from "react"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Calendar, User, Phone, Mail, MessageSquare, CheckCircle, AlertCircle } from "lucide-react"
import { supabase } from "../lib/supabase"
import { doctors as doctorList } from "../data/doctors"
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "../data/contact"

/*
 * Field names match the columns of the Supabase "Appointments" table
 * (including the existing spellings `phonenumber`, `prefferedDate`, `prefferedTime`).
 * Do not rename them without migrating the table.
 */
type AppointmentForm = {
  name: string
  phonenumber: string
  service: string
  doctor: string
  prefferedDate: string
  prefferedTime: string
}

const emptyForm: AppointmentForm = {
  name: "",
  phonenumber: "",
  service: "",
  doctor: "",
  prefferedDate: "",
  prefferedTime: "",
}

/** Today's date as YYYY-MM-DD in the visitor's local time zone (for the date picker minimum). */
function todayLocal() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export default function AppointmentPage() {
  const [searchParams] = useSearchParams()
  const doctorNames = doctorList.map((d) => d.name)
  const requestedDoctor = searchParams.get("doctor") ?? ""

  const [formData, setFormData] = useState<AppointmentForm>({
    ...emptyForm,
    doctor: doctorNames.includes(requestedDoctor) ? requestedDoctor : "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const services = [
    "General Appointment",
    "Cataract Surgery",
    "Retina Care",
    "Pediatric Eye Care",
    "Glaucoma Treatment",
    "Refractive Errors",
    "Corneal Diseases",
    "Dry Eye Syndrome",
  ]

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM"
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const name = formData.name.trim()
    const phone = formData.phonenumber.trim()
    if (!name || !phone) {
      setError("Please enter your name and phone number.")
      return
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number (at least 10 digits).")
      return
    }
    if (!supabase) {
      setError(`Online booking is temporarily unavailable. Please call us at ${PHONE_DISPLAY}.`)
      return
    }

    setSubmitting(true)
    try {
      const { error: insertError } = await supabase.from("Appointments").insert([
        {
          ...formData,
          name,
          phonenumber: phone,
          email: "",
          date: new Date(),
        },
      ])
      if (insertError) throw insertError
      setSubmitted(true)
    } catch (err) {
      console.error("Error submitting appointment:", err)
      setError(`We couldn't submit your request. Please try again, or call us at ${PHONE_DISPLAY}.`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData(emptyForm)
    setError(null)
  }

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-foreground mb-4">Book an Appointment</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Schedule your consultation with our expert ophthalmologists
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">Appointment Request Received!</h2>
              <p className="text-lg text-foreground/70 mb-6">
                Thank you for booking with us. Our team will call you shortly to confirm your appointment.
              </p>
              <p className="text-foreground/60">
                If you have any questions, please call us at{" "}
                <a href={`tel:${PHONE_TEL}`} className="text-primary font-semibold hover:underline">
                  {PHONE_DISPLAY}
                </a>{" "}
                or email{" "}
                <a href={`mailto:${EMAIL}`} className="text-primary font-semibold hover:underline">
                  {EMAIL}
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <User size={24} className="text-primary" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phonenumber"
                      value={formData.phonenumber}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <MessageSquare size={24} className="text-primary" />
                  Service & Doctor
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Service *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Preferred Doctor</label>
                    <select
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                    >
                      <option value="">Any available doctor</option>
                      {doctorNames.map((doctor) => (
                        <option key={doctor} value={doctor}>
                          {doctor}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Calendar size={24} className="text-primary" />
                  Appointment Date & Time
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      name="prefferedDate"
                      min={todayLocal()}
                      value={formData.prefferedDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Preferred Time *</label>
                    <select
                      name="prefferedTime"
                      value={formData.prefferedTime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                    >
                      <option value="">Select a time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {error && (
                <div role="alert" className="flex items-start gap-2 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 md:px-8 md:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white cursor-pointer rounded-lg font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Request Appointment"}
                </button>
                <button
                  type="reset"
                  className="px-4 py-2 md:px-8 md:py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all duration-200"
                >
                  Clear
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Fill the Form",
                description: "Provide your details and select your preferred service",
              },
              {
                step: "2",
                title: "Choose Doctor",
                description: "Select your preferred ophthalmologist or let us assign one",
              },
              {
                step: "3",
                title: "Pick Time Slot",
                description: "Choose a convenient date and time for your appointment",
              },
              {
                step: "4",
                title: "Confirmation",
                description: "Our team will call you to confirm your appointment",
              },
            ].map((item, index) => (
              <div key={index} className="text-center border-2 border-gray-200 p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary  text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Other Ways to Book</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: "Call Us",
                description: "Speak directly with our appointment team",
                contact: PHONE_DISPLAY,
                href: `tel:${PHONE_TEL}`,
              },
              {
                icon: Mail,
                title: "Email Us",
                description: "Send us your appointment request",
                contact: EMAIL,
                href: `mailto:${EMAIL}`,
              },
              {
                icon: MessageSquare,
                title: "WhatsApp",
                description: "Quick booking via WhatsApp",
                contact: PHONE_DISPLAY,
                href: WHATSAPP_URL,
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-border text-center hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <Icon className="text-primary mx-auto mb-4" size={32} />
                  <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/60 mb-4">{item.description}</p>
                  <p className="font-semibold text-primary break-all">{item.contact}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
