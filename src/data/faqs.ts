import { INSURERS, SCHEMES } from "./insurance"
import { PHONE_DISPLAY } from "./contact"

export type Faq = { question: string; answer: string }

const insuranceAnswer = `Yes. We accept ${SCHEMES.join(" and ")}, and cashless cover from ${INSURERS.join(", ")} (also through the Medi Assist TPA). Call ${PHONE_DISPLAY} with your policy details to confirm your cover before your visit.`

export const homeFaqs: Faq[] = [
  {
    question: "Is cataract surgery safe?",
    answer:
      "Cataract surgery is one of the most commonly performed eye operations. At Sri Harsha Eye Hospital it is done by phacoemulsification through a small incision, after a full eye check-up and lens (IOL) power measurement. Your surgeon will explain the risks and benefits for your eyes before you decide.",
  },
  {
    question: "What is the recovery time after eye surgery?",
    answer:
      "It depends on the procedure. After cataract surgery many patients return to light daily activities within a few days, with follow-up visits over the next weeks. Your doctor will give you instructions specific to your treatment.",
  },
  {
    question: "Do you offer emergency eye care?",
    answer: `Yes. For an eye injury, sudden loss of vision or severe eye pain, call ${PHONE_DISPLAY} immediately.`,
  },
  { question: "Which insurance and health schemes do you accept?", answer: insuranceAnswer },
]

export const contactFaqs: Faq[] = [
  {
    question: "How do I book an appointment?",
    answer:
      "Book through the online form, call us, or send us a WhatsApp message. We'll confirm your appointment within 24 hours.",
  },
  {
    question: "What should I bring for my first visit?",
    answer:
      "Please bring a valid ID, your insurance or scheme card (if any), your current spectacles, and any previous eye reports or prescriptions.",
  },
  { question: "Do you accept insurance?", answer: insuranceAnswer },
  {
    question: "How soon can I see clearly after cataract surgery?",
    answer:
      "Many patients notice clearer vision within a few days, and it keeps settling over the following weeks. Your surgeon will tell you what to expect for your eyes at the follow-up visit.",
  },
]
