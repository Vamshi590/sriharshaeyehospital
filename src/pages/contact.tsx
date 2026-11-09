import type React from "react"
import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  whatsappLink,
} from "../data/contact"

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
}

export default function ContactPage() {
  const [formData, setFormData] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const composedMessage = () =>
    [
      `Subject: ${formData.subject}`,
      "",
      formData.message,
      "",
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.phone ? `Phone: ${formData.phone}` : "",
    ]
      .filter((line, i, lines) => line !== "" || lines[i - 1] !== "")
      .join("\n")
      .trim()

  const emailHref = () =>
    `mailto:${EMAIL}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(composedMessage())}`

  // There is no backend for this form: it hands the message to WhatsApp, pre-filled.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.open(whatsappLink(composedMessage()), "_blank", "noopener,noreferrer")
    setSubmitted(true)
  }

  const startOver = () => {
    setFormData(emptyForm)
    setSubmitted(false)
  }

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Get in touch with us for any inquiries or to schedule an appointment
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">Get In Touch</h2>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <Phone className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                  <a href={`tel:${PHONE_TEL}`} className="text-foreground/60 hover:text-primary">{PHONE_DISPLAY}</a>
                  <p className="text-sm text-foreground/50">Mon - Sat: 9 AM - 8 PM, Sun: 10 AM - 2:30 PM</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <Mail className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a href={`mailto:${EMAIL}`} className="text-foreground/60 hover:text-primary break-all">{EMAIL}</a>
                  <p className="text-sm text-foreground/50">We'll respond within 24 hours</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <MapPin className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Address</h3>
                  <p className="text-foreground/60">{ADDRESS_LINE_1},</p>
                  <p className="text-sm text-foreground/50">{ADDRESS_LINE_2}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <Clock className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                  <p className="text-foreground/60">Mon - Sat: 9 AM - 8 PM</p>
                  <p className="text-foreground/60">Sunday: 10 AM - 2:30 PM</p>
                  <p className="text-sm text-foreground/50">Emergency: 24/7</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-3">Almost done!</h2>
                  <p className="text-lg text-foreground/70 mb-6">
                    We've opened WhatsApp with your message. Tap <strong>Send</strong> in WhatsApp to reach us.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={whatsappLink(composedMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
                    >
                      Open WhatsApp again
                    </a>
                    <a
                      href={emailHref()}
                      className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5"
                    >
                      Send by email instead
                    </a>
                    <button onClick={startOver} className="px-6 py-3 text-foreground/60 hover:text-foreground">
                      Write another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white resize-none"
                      placeholder="Your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send via WhatsApp
                  </button>
                  <p className="text-sm text-center text-foreground/50">
                    Prefer email?{" "}
                    <a href={emailHref()} className="text-primary font-semibold hover:underline">
                      Send this message by email
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Find Us</h2>
          <div className="w-full h-96 rounded-2xl border border-border overflow-hidden">
            <iframe
              title="Sri Harsha Eye Hospital location"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?hl=en&q=Near%20Mancherial%20Chowrasta%20Cir,%20Ambedkar%20Nagar,%20Saraswathi%20Nagar,%20Karimnagar,%20Telangana%20505001+(Sri%20Harsha%20Eye%20Hospital)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              className="border-0"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "How do I book an appointment?",
                a: "You can book an appointment through our online form, call us, or send us a WhatsApp message. We'll confirm your appointment within 24 hours.",
              },
              {
                q: "What should I bring for my first visit?",
                a: "Please bring a valid ID, insurance card (if applicable), and any previous eye exam reports or prescriptions.",
              },
              {
                q: "Do you accept insurance?",
                a: "Yes, we accept most major insurance plans. Please contact us to verify your coverage.",
              },
              {
                q: "What is the recovery time after Cataract Surgery?",
                a: "Most patients experience improved vision within 24 hours.",
              },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-border">
                <h3 className="font-semibold text-lg text-foreground mb-3">{item.q}</h3>
                <p className="text-foreground/70">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
