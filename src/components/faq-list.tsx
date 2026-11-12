import { ChevronDown } from "lucide-react"
import type { Faq } from "../data/faqs"
import { JsonLd } from "./json-ld"
import { faqSchema } from "../seo/schema"

/** Accessible FAQ accordion (native <details>) plus matching FAQPage structured data. */
export function FaqList({ faqs, heading = "Frequently Asked Questions" }: { faqs: Faq[]; heading?: string }) {
  return (
    <section className="py-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-6">{heading}</h2>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.question} className="group border border-border rounded-lg bg-white">
            <summary className="p-5 flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3 className="font-semibold text-foreground text-left">{f.question}</h3>
              <ChevronDown size={20} className="text-primary flex-shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-foreground/70">{f.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  )
}
