export const HOSPITAL_NAME = "Sri Harsha Eye Hospital"

export const PHONE_DISPLAY = "+91 98850 29367"
export const PHONE_TEL = "+919885029367"
export const WHATSAPP_URL = "https://wa.me/919885029367"

export const EMAIL = "sriharshaeyehospital.nabh@gmail.com"

export const ADDRESS_LINE_1 = "Near Mancherial Chowrasta Circle, Ambedkar Nagar, Saraswathi Nagar"
export const ADDRESS_LINE_2 = "Karimnagar, Telangana 505001"

/** Opens WhatsApp (app or web) with a pre-filled message to the hospital. */
export function whatsappLink(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}
