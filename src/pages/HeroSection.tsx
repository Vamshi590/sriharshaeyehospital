"use client"

import { useState, useEffect, useRef } from "react"
import eye from "../assets/eye.webp"
import { useNavigate } from "react-router-dom"
export default function HeroSection() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const quotes = [
    "We don't just treat eyes — we restore sight, we bring back light.",
    "See beyond limits. Live beyond blur.",
    "Every eye tells a story. We help you see it clearly.",
  ]


  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(quoteInterval)
  }, [])

  const navigate = useNavigate()

  return (
    <section
      ref={containerRef}
      className="relative w-full lg:h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6 animate-fade-in">
          <div className="hidden md:inline-block px-4 py-2 rounded-full bg-blue-100/60 border border-blue-200/60 backdrop-blur-sm">
            <span className="text-sm font-medium text-blue-700">Welcome to Sri Harsha Eye Hospital</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            We don't just treat eyes—
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              we restore sight
            </span>
          </h1>

          <div className="min-h-24 relative">
            <div className="absolute inset-0 flex items-center">
              <p
                key={currentQuoteIndex}
                className="text-md italic text-gray-700 leading-relaxed animate-fade-in-out max-w-lg border-l-4 border-blue-500 pl-4"
              >
                {quotes[currentQuoteIndex]}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button onClick={() => {navigate("/appointment")}} className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 duration-300">
              Book an Appointment
            </button>
            <button onClick={() => {navigate("/services")}} className="px-8 py-3 rounded-full border-2 border-blue-200 text-blue-600 font-medium hover:bg-blue-50 transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-300/30">
              Explore Treatments
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Content - 3D Eye Model Area */}
        <div className="relative h-96 md:h-full flex items-center justify-center">
          <div
            className="relative w-96 h-96"
            style={{
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>

            {/* Eye Image */}
            <img
              src={eye}
              alt="3D Eye Model"
              className="w-full h-full object-contain drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-blue-400 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-out {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-out {
          animation: fade-in-out 5s ease-in-out;
        }
      `}</style>
    </section>
  )
}
