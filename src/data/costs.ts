/**
 * Starting prices. Leave `from` undefined until the hospital confirms a figure;
 * the page then shows "Call for current price" instead of a number.
 */
export type CostItem = { name: string; from?: string; includes: string; service?: string }

export const costs: CostItem[] = [
  { name: "Consultation (eye doctor)", includes: "Doctor's consultation; tests are charged separately when needed." },
  { name: "Complete eye check-up", includes: "Vision and power test, eye pressure, slit-lamp and dilated retina examination.", service: "eye-check-up" },
  { name: "Cataract surgery with monofocal IOL", includes: "Pre-operative tests, phaco surgery, lens, and post-operative visits as per package.", service: "cataract-surgery" },
  { name: "Cataract surgery with toric IOL", includes: "As above, with a lens that also corrects astigmatism.", service: "cataract-surgery" },
  { name: "Cataract surgery with multifocal / trifocal IOL", includes: "As above, with a lens that focuses at more than one distance.", service: "cataract-surgery" },
  { name: "OCT scan", includes: "Retina or optic nerve scan.", service: "retina-vitreous" },
  { name: "Fundus fluorescein angiography (FFA)", includes: "Retina blood-vessel imaging with dye.", service: "diabetic-retinopathy" },
  { name: "Visual field test", includes: "Side-vision mapping for glaucoma and nerve conditions.", service: "glaucoma" },
]

export const COST_NOTE =
  "Final costs depend on your eyes, the tests needed and the lens chosen. Aarogyasri, EHS and cashless insurance can cover eligible treatment. Call us for a written estimate."
