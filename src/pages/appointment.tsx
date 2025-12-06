"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, User, Phone, Mail, MessageSquare, CheckCircle } from "lucide-react"
import { supabase } from "../../SupabaseClient"

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    service: "",
    doctor: "",
    prefferedDate: "",
    prefferedTime: "",
    date : new Date(),
  })

  const [submitted, setSubmitted] = useState(false)

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

  const doctors = [
    "Dr. Srilatha CH",
    "Dr. Ram Kumar",
    "Dr. Ekta Agarwal",
    "Dr. Sampath",
    "Dr. Swetha T",
    "Dr. Praneetha Goud A",
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
    console.log("Form submitted:", formData)
    try {
      if(!formData.name && !formData.phonenumber){
        throw new Error("Name and Phone are required")
      }

      const response = await supabase.from("Appointments").insert([formData])
      if(response.error){
        throw new Error("Error submitting form")
      }
      setSubmitted(true)

    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 pt-16">
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
              <h2 className="text-3xl font-bold text-foreground mb-3">Appointment Confirmed!</h2>
              <p className="text-lg text-foreground/70 mb-6">
                Thank you for booking with us. We'll send you a confirmation email shortly.
              </p>
              <p className="text-foreground/60">
                If you have any questions, please call us at +91 9885029367 or email sriharshaeyehospital.nabh@gmail.com
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
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
                      placeholder="Vamshidhar"
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
                      {doctors.map((doctor) => (
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

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 md:px-8 md:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white cursor-pointer rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 hover:shadow-lg"
                >
                  Confirm Appointment
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
                description: "Receive confirmation via email and SMS",
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
                contact: "91 9885029367",
              },
              {
                icon: Mail,
                title: "Email Us",
                description: "Send us your appointment request",
                contact: "sriharshaeyehospital.nabh@gmail.com",
              },
              {
                icon: MessageSquare,
                title: "WhatsApp",
                description: "Quick booking via WhatsApp",
                contact: "91 9885029367",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-border text-center"
                >
                  <Icon className="text-primary mx-auto mb-4" size={32} />
                  <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/60 mb-4">{item.description}</p>
                  <p className="font-semibold text-primary">{item.contact}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
