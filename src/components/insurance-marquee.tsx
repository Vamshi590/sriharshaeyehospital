"use client"
import hdfcergo from "../assets/HDFC ergo insurance.png"
import icicilombard from "../assets/ICICI_Lombard.webp"
import aarogyashri from "../assets/aarogyasri.webp"
import ehs from "../assets/EHS-Telangana logo.webp"
import mediassist from "../assets/mediassist.webp"
import starhealth from "../assets/Star_Health.webp"
import sbigeneral from "../assets/sbi general insurance logo.png"
import reliancegeneral from "../assets/reliance general logo.png"
import nia from "../assets/nialogo-org.jpg"
import ifcotokio from "../assets/iffco tokio insurance logo.jpg"
import erricson from "../assets/Ericsson_logo.webp"


export function InsuranceMarquee() {


  const insurances = [

    {name : "HDFC ERGO", logo : hdfcergo},
    {name : "ICICI Lombard", logo : icicilombard},
    {name : "Aarogya shri", logo : aarogyashri},
    {name : "EHS Telangana", logo : ehs},
    {name : "New India Assurance", logo : nia},
    {name : "Mediassist", logo : mediassist},
    {name : "Reliance General", logo : reliancegeneral},
    {name : "IFFCO TOKIO Insurance", logo : ifcotokio},
    {name : "SBI General", logo : sbigeneral},
    {name : "Star Health", logo : starhealth},
    {name : "Erricsson Insurance", logo : erricson},
  ]

  // Duplicate the array for seamless looping
  const duplicatedInsurances = [...insurances, ...insurances]

  return (
    <section className="py-8 bg-gradient-to-br from-slate-50 via-white to-slate-50  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold text-primary uppercase tracking-wider">Insurance Partners</h3>
          <p className="text-foreground/60 text-sm mt-1">We accept all major insurance providers</p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <style>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .marquee-content {
              animation: marquee 50s linear infinite;
              display: flex;
              gap: 2rem;
            }
            
            .marquee-content:hover {
              animation-play-state: paused;
            }
            
            .marquee-item {
              flex-shrink: 0;
              padding: 0.75rem 1.5rem;
              background: white;
              display: flex;
              flex-direction : column;
              align-items: center;
              gap : 0.5rem;
              justify-content: center;
              border: 1.5px solid #e5e7eb;
              border-radius: 0.5rem;
              font-weight: 600;
              color: #1f2937;
              transition: all 0.3s ease;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            }
            
            .marquee-item:hover {
              border-color: #9db4c0;
              box-shadow: 0 4px 12px rgba(157, 180, 192, 0.15);
              transform: translateY(-2px);
            }
          `}</style>

          <div className="marquee-content">
            {duplicatedInsurances.map((insurance, index) => (
              <div key={index} className="marquee-item items-center justify-center text-center">
                {insurance.name}
                <img src={`${insurance.logo}`} className="h-8 md:h-12 justify-center text-center items-center" alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* Info text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-foreground/50">
            For specific coverage details, please contact our billing department at{" "}
            <span className="font-semibold text-primary">+91 9885029367</span>
          </p>
        </div>
      </div>
    </section>
  )
}
