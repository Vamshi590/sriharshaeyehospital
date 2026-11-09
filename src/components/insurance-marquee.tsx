import type { CSSProperties } from "react"
import hdfcergo from "../assets/HDFC ergo insurance.png"
import icicilombard from "../assets/ICICI_Lombard.webp"
import aarogyasri from "../assets/aarogyasri.webp"
import ehs from "../assets/EHS-Telangana logo.webp"
import mediassist from "../assets/mediassist.webp"
import starhealth from "../assets/Star_Health.webp"
import sbigeneral from "../assets/sbi general insurance logo.png"
import reliancegeneral from "../assets/reliance general logo.png"
import nia from "../assets/nialogo-org.jpg"
import iffcotokio from "../assets/iffco tokio insurance logo.webp"
import ericsson from "../assets/Ericsson_logo.webp"
import { PHONE_DISPLAY, PHONE_TEL } from "../data/contact"

const insurances = [
  { name: "HDFC ERGO", logo: hdfcergo },
  { name: "ICICI Lombard", logo: icicilombard },
  { name: "Aarogyasri", logo: aarogyasri },
  { name: "EHS Telangana", logo: ehs },
  { name: "New India Assurance", logo: nia },
  { name: "Medi Assist", logo: mediassist },
  { name: "Reliance General", logo: reliancegeneral },
  { name: "IFFCO TOKIO Insurance", logo: iffcotokio },
  { name: "SBI General", logo: sbigeneral },
  { name: "Star Health", logo: starhealth },
  { name: "Ericsson Insurance", logo: ericsson },
]

// Rendered twice so the -50% translate loops seamlessly.
const loopedInsurances = [...insurances, ...insurances]

export function InsuranceMarquee() {
  return (
    <section className="py-8 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold text-primary uppercase tracking-wider">Insurance Partners</h3>
          <p className="text-foreground/60 text-sm mt-1">We accept all major insurance providers</p>
        </div>

        <div className="relative overflow-hidden">
          <div className="marquee-track" style={{ "--marquee-duration": "50s" } as CSSProperties}>
            {loopedInsurances.map((insurance, index) => (
              <div
                key={index}
                aria-hidden={index >= insurances.length}
                className="flex-shrink-0 flex flex-col items-center justify-center gap-2 px-6 py-3 bg-white border-[1.5px] border-gray-200 rounded-lg font-semibold text-gray-800 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9db4c0] hover:shadow-md"
              >
                {insurance.name}
                <img src={insurance.logo} className="h-8 md:h-12 w-auto" alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-foreground/50">
            For specific coverage details, please contact our billing department at{" "}
            <a href={`tel:${PHONE_TEL}`} className="font-semibold text-primary hover:underline">
              {PHONE_DISPLAY}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
