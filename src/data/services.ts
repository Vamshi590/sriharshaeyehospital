/**
 * Service / condition pages (/eye-care/<slug>). General patient information only:
 * every page shows who reviewed it once `reviewedBy` is filled in (see src/data/site.ts REVIEW).
 * Keep copy factual: no superiority claims, no guaranteed results (NMC guidelines, Oct 2026).
 */
import type { Faq } from "./faqs"

export type Treatment = { name: string; what: string; bestFor: string }

export type Service = {
  slug: string
  name: string
  /** Used in navigation and cards. */
  short: string
  icon: "eye" | "scan" | "droplets" | "baby" | "gauge" | "sparkles" | "glasses" | "shield" | "stethoscope" | "siren" | "activity"
  /** <title>, max 60 characters. */
  title: string
  description: string
  /** What it is — the first two sentences of the page; written to be quoted by search and AI answers. */
  summary: string
  /** schema.org type of the main topic. */
  kind: "MedicalProcedure" | "MedicalCondition" | "MedicalTherapy"
  symptoms: string[]
  whenToSee: string
  diagnosis: string[]
  treatments: Treatment[]
  dayOf: string[]
  recovery: string[]
  /** Doctor names (must match src/data/doctors.ts). */
  doctors: string[]
  faqs: Faq[]
}

const coverLine =
  "Covered for eligible patients under Aarogyasri and EHS, and cashless with the insurers we work with. Bring your card and ID; our desk checks your cover before treatment."

export const services: Service[] = [
  {
    slug: "cataract-surgery",
    name: "Cataract Surgery",
    short: "Cataract",
    icon: "eye",
    kind: "MedicalProcedure",
    title: "Cataract Surgery in Karimnagar | Sri Harsha Eye Hospital",
    description:
      "Phaco cataract surgery in Karimnagar with monofocal, multifocal, trifocal and toric lens options. Aarogyasri, EHS and cashless insurance accepted.",
    summary:
      "A cataract is a clouding of the eye's natural lens that makes vision blurred, dim or glary. Cataract surgery removes the cloudy lens through a small incision and replaces it with a clear artificial lens (IOL).",
    symptoms: [
      "Blurred, cloudy or dim vision",
      "Glare or halos around lights, especially while driving at night",
      "Colours looking faded or yellowish",
      "Frequent changes in spectacle power",
      "Double vision in one eye",
    ],
    whenToSee:
      "See an eye doctor when blurred or glary vision starts to affect reading, driving, work or moving about safely. Surgery is usually advised when the cataract interferes with daily life; your doctor will tell you when the time is right.",
    diagnosis: [
      "Vision test and slit-lamp examination of the lens",
      "Dilated examination of the retina, to check the back of the eye",
      "A-scan biometry and keratometry, to calculate the power of the new lens",
      "OCT scan of the retina when needed (for example in diabetes)",
    ],
    treatments: [
      { name: "Monofocal IOL", what: "Gives clear vision at one distance, usually far.", bestFor: "Most patients; reading glasses are still needed for near work." },
      { name: "Toric IOL", what: "Also corrects astigmatism (cylindrical power).", bestFor: "Patients with significant astigmatism who want sharper distance vision without glasses." },
      { name: "Multifocal / trifocal IOL", what: "Focuses at more than one distance.", bestFor: "Patients who want less dependence on glasses for near, intermediate and far vision, after a suitability check." },
    ],
    dayOf: [
      "Surgery is done under local anaesthesia (eye drops or a small injection); you stay awake but the eye is numb.",
      "The operation itself usually takes about 15 to 30 minutes, by phacoemulsification through a small incision.",
      "Most patients go home the same day with a protective shield and eye drops.",
    ],
    recovery: [
      "Use the prescribed eye drops exactly as instructed.",
      "Avoid rubbing the eye, swimming and dusty places for the first weeks.",
      "Many patients notice clearer vision within a few days; it keeps settling over the following weeks.",
      "Follow-up visits are usually the next day, at one week and at about one month; new glasses, if needed, are prescribed after healing.",
    ],
    doctors: ["Dr. Srilatha CH"],
    faqs: [
      { question: "Which lens is right for me?", answer: "It depends on your eyes, your astigmatism and how you use your vision. After the measurements, your surgeon explains the monofocal, toric and multifocal options that suit you and their costs." },
      { question: "Is cataract surgery painful?", answer: "The eye is numbed with drops or a small injection, so most patients feel only mild pressure during surgery. Some mild irritation afterwards is common and settles with the prescribed drops." },
      { question: "Can both eyes be operated on the same day?", answer: "Usually the eyes are operated on separately, a few days or weeks apart, so the first eye can heal. Your surgeon will plan the timing with you." },
      { question: "Is cataract surgery covered by Aarogyasri or insurance?", answer: coverLine },
      { question: "Can a cataract come back after surgery?", answer: "The cataract itself does not return. Some patients later develop clouding of the membrane behind the lens (posterior capsule opacification), which is treated with a quick YAG laser procedure in the clinic." },
      { question: "How soon can I return to work?", answer: "Many people return to desk work within a few days. Heavy lifting and dusty or outdoor work may need more time; your doctor will advise you at the follow-up visit." },
    ],
  },
  {
    slug: "diabetic-retinopathy",
    name: "Diabetic Retinopathy",
    short: "Diabetic eye care",
    icon: "droplets",
    kind: "MedicalCondition",
    title: "Diabetic Retinopathy Care in Karimnagar | Sri Harsha",
    description:
      "Diabetic eye screening and treatment in Karimnagar: dilated retina check, OCT, fundus angiography, laser and injections. Aarogyasri and EHS accepted.",
    summary:
      "Diabetic retinopathy is damage to the blood vessels of the retina caused by diabetes. It often has no symptoms in its early stages, so people with diabetes need regular dilated eye check-ups even when their vision seems fine.",
    symptoms: [
      "Often no symptoms in the early stages",
      "Blurred or fluctuating vision",
      "Dark spots or floaters",
      "Difficulty seeing at night",
      "Sudden loss of vision (an emergency)",
    ],
    whenToSee:
      "Everyone with diabetes should have a dilated retina examination at least once a year, or as often as the doctor advises. Come in the same day for sudden floaters, a curtain over the vision or sudden vision loss.",
    diagnosis: [
      "Dilated fundus examination of the retina",
      "OCT scan to look for swelling of the central retina (macular oedema)",
      "Fundus fluorescein angiography (FFA) to see leaking or blocked vessels",
      "Blood sugar and blood pressure history, shared with your physician",
    ],
    treatments: [
      { name: "Monitoring and diabetes control", what: "Regular check-ups with good sugar, blood pressure and cholesterol control.", bestFor: "Early (mild) retinopathy." },
      { name: "Laser photocoagulation", what: "Laser seals leaking vessels or treats areas without blood supply.", bestFor: "Proliferative retinopathy and some types of macular oedema." },
      { name: "Anti-VEGF injections", what: "Medicine injected into the eye to reduce swelling and abnormal vessels.", bestFor: "Diabetic macular oedema and some advanced cases." },
      { name: "Vitrectomy surgery", what: "Removes blood or scar tissue from inside the eye.", bestFor: "Bleeding that does not clear, or retinal detachment from scar tissue." },
    ],
    dayOf: [
      "Drops are put in to widen (dilate) the pupils; this takes 20 to 30 minutes.",
      "Vision may stay blurred and light-sensitive for a few hours, so bring someone to drive you home.",
      "Laser and injections are done in the hospital as day procedures.",
    ],
    recovery: [
      "Keep your sugar, blood pressure and cholesterol under control with your physician.",
      "Do not miss follow-up visits; retinopathy can progress without symptoms.",
      "After injections, report pain, redness or worsening vision immediately.",
    ],
    doctors: ["Dr. Ram Kumar", "Dr. Srilatha CH"],
    faqs: [
      { question: "How often should a diabetic get an eye check-up?", answer: "At least once a year with dilated drops, or more often if retinopathy is found or you are pregnant. Your doctor will set the interval for you." },
      { question: "Can diabetic retinopathy be cured?", answer: "Damage that has already happened cannot always be reversed, but treatment can slow or stop it and protect the vision you have. Early detection gives a better chance." },
      { question: "My vision is fine. Do I still need a check-up?", answer: "Yes. Early diabetic retinopathy usually causes no symptoms, and it can only be found by examining the retina." },
      { question: "Are the injections painful?", answer: "The eye is numbed with drops before the injection. Most patients feel pressure for a moment rather than pain." },
      { question: "Is treatment covered by Aarogyasri or EHS?", answer: coverLine },
    ],
  },
  {
    slug: "retina-vitreous",
    name: "Retina and Vitreous Care",
    short: "Retina",
    icon: "scan",
    kind: "MedicalCondition",
    title: "Retina Specialist in Karimnagar | Sri Harsha Eye Hospital",
    description:
      "Retina and vitreous care in Karimnagar: retinal detachment, macular degeneration, vein occlusion and floaters, with OCT and fundus angiography.",
    summary:
      "The retina is the light-sensitive layer at the back of the eye, and the vitreous is the clear gel that fills the eye. Retina problems such as detachment, macular degeneration and bleeding can threaten sight and need prompt specialist care.",
    symptoms: [
      "Sudden shower of floaters or flashes of light",
      "A shadow or curtain coming over part of the vision",
      "Straight lines looking wavy or bent",
      "A dark or blank spot in the centre of vision",
      "Sudden painless loss of vision",
    ],
    whenToSee:
      "Sudden flashes, a shower of floaters or a curtain over the vision can mean a retinal tear or detachment: come in the same day. Wavy lines or a central blur should be checked within days.",
    diagnosis: [
      "Dilated retina examination",
      "OCT scan of the macula",
      "Fundus fluorescein angiography (FFA)",
      "B-scan ultrasound when the retina can't be seen clearly",
    ],
    treatments: [
      { name: "Laser treatment", what: "Seals retinal tears and treats leaking or abnormal vessels.", bestFor: "Retinal tears, vein occlusions, diabetic retinopathy." },
      { name: "Anti-VEGF injections", what: "Medicine injected into the eye to dry swelling and abnormal vessels.", bestFor: "Wet macular degeneration, macular oedema." },
      { name: "Vitreoretinal surgery", what: "Surgery inside the eye to repair the retina or clear blood.", bestFor: "Retinal detachment, non-clearing bleeding, macular hole." },
    ],
    dayOf: [
      "Pupils are dilated for the examination, which can blur vision for a few hours.",
      "Scans such as OCT take a few minutes and do not touch the eye.",
    ],
    recovery: [
      "Follow positioning and eye-drop instructions closely after surgery.",
      "Avoid air travel and heavy lifting if a gas bubble was used, until your surgeon allows it.",
      "Report increasing pain, redness or vision loss immediately.",
    ],
    doctors: ["Dr. Ram Kumar"],
    faqs: [
      { question: "When is the retina specialist available?", answer: "Our visiting retina consultant sees patients on the 4th Sunday of each month. Call us to book; urgent cases are assessed by our ophthalmologists any day." },
      { question: "Are floaters dangerous?", answer: "Most floaters are harmless, but a sudden increase, especially with flashes or a shadow, needs an examination the same day to rule out a retinal tear." },
      { question: "Is an OCT scan painful?", answer: "No. OCT is a quick light-based scan; you look into the machine and nothing touches the eye." },
      { question: "Can retinal detachment be treated?", answer: "Yes, with laser or surgery depending on the type, and earlier treatment generally gives a better chance of keeping vision." },
      { question: "Is retina treatment covered?", answer: coverLine },
    ],
  },
  {
    slug: "glaucoma",
    name: "Glaucoma Treatment",
    short: "Glaucoma",
    icon: "gauge",
    kind: "MedicalCondition",
    title: "Glaucoma Treatment in Karimnagar | Sri Harsha Eye Hospital",
    description:
      "Glaucoma check-up and treatment in Karimnagar: eye pressure test, visual fields, OCT of the optic nerve, eye drops, laser and surgery.",
    summary:
      "Glaucoma is a group of eye diseases that damage the optic nerve, often linked to raised pressure inside the eye. It usually causes no pain or symptoms until vision is lost, so regular check-ups are the only way to catch it early.",
    symptoms: [
      "Usually no symptoms in the early stages",
      "Slow loss of side (peripheral) vision",
      "In angle-closure glaucoma: sudden eye pain, redness, headache, nausea and blurred vision with halos (an emergency)",
    ],
    whenToSee:
      "Have your eye pressure and optic nerve checked regularly after 40, or earlier if a parent or sibling has glaucoma, you have diabetes, high myopia or use steroid medicines. Sudden painful red eye with blurred vision needs care immediately.",
    diagnosis: [
      "Eye pressure measurement (tonometry)",
      "Examination of the optic nerve",
      "Visual field test to map side vision",
      "OCT scan of the optic nerve fibre layer",
      "Gonioscopy to check the drainage angle",
    ],
    treatments: [
      { name: "Eye drops", what: "Daily drops that lower eye pressure.", bestFor: "Most patients; first-line treatment." },
      { name: "Laser", what: "Laser to open the drainage angle (iridotomy) or improve fluid outflow.", bestFor: "Angle-closure risk, or as an addition to drops." },
      { name: "Glaucoma surgery", what: "Creates a new drainage path for fluid.", bestFor: "Pressure not controlled with drops and laser." },
    ],
    dayOf: [
      "Pressure checks and field tests are quick and do not hurt; the field test takes about 10 to 20 minutes per eye.",
      "Bring all the eye drops you use to every visit.",
    ],
    recovery: [
      "Use your drops every day, even when your eyes feel normal.",
      "Keep every follow-up: glaucoma is lifelong and needs regular monitoring.",
      "Tell any doctor you see that you have glaucoma before starting new medicines.",
    ],
    doctors: ["Dr. Srilatha CH"],
    faqs: [
      { question: "Can lost vision from glaucoma come back?", answer: "No. Vision lost to glaucoma cannot be restored, which is why early detection and regular treatment matter. Treatment protects the vision you still have." },
      { question: "Will I need eye drops for life?", answer: "Most patients need long-term treatment. Some may reduce drops after laser or surgery; your doctor will review this at follow-ups." },
      { question: "Who should be tested for glaucoma?", answer: "Everyone over 40, and earlier if glaucoma runs in the family, or you have diabetes, high myopia or take steroid medicines." },
      { question: "Is glaucoma hereditary?", answer: "Having a parent or sibling with glaucoma increases your risk, so family members should be checked regularly." },
      { question: "Is glaucoma treatment covered?", answer: coverLine },
    ],
  },
  {
    slug: "childrens-eye-care",
    name: "Children's Eye Care and Squint",
    short: "Children's eyes",
    icon: "baby",
    kind: "MedicalTherapy",
    title: "Child Eye Specialist & Squint Care, Karimnagar | Sri Harsha",
    description:
      "Children's eye check-ups, spectacles, lazy eye and squint (strabismus) treatment in Karimnagar by a paediatric ophthalmologist.",
    summary:
      "Children's eyes are still developing, and problems such as high spectacle power, lazy eye (amblyopia) and squint are easiest to treat when found early. A paediatric eye check-up tests vision in a way suited to the child's age.",
    symptoms: [
      "Eyes that look misaligned, turn in or out (squint)",
      "Holding books or phones very close, or sitting close to the TV",
      "Squinting, frequent blinking or rubbing the eyes",
      "Tilting the head to look at things",
      "Poor performance at school or headaches after reading",
      "A white reflex in the pupil in photographs (needs an urgent check)",
    ],
    whenToSee:
      "Have your child's eyes checked before starting school and whenever you notice a squint, head tilt or difficulty seeing. A white reflex in the pupil or a sudden squint needs prompt attention.",
    diagnosis: [
      "Age-appropriate vision testing with picture or letter charts",
      "Cycloplegic refraction (with drops) to measure the true spectacle power",
      "Squint and eye-movement assessment",
      "Dilated examination of the retina",
    ],
    treatments: [
      { name: "Spectacles", what: "Correct the spectacle power so the eye can see clearly.", bestFor: "Short sight, long sight and astigmatism; often the first step for lazy eye." },
      { name: "Patching (occlusion) therapy", what: "Covering the stronger eye for set hours to make the weaker eye work.", bestFor: "Lazy eye (amblyopia)." },
      { name: "Squint surgery", what: "Adjusts the eye muscles to straighten the eyes.", bestFor: "Squint that does not correct with glasses." },
    ],
    dayOf: [
      "Bring your child's previous glasses and reports, and a favourite toy or snack.",
      "Dilating drops take about 30 to 45 minutes to work and blur near vision for a few hours.",
    ],
    recovery: [
      "Make sure glasses are worn all day if prescribed.",
      "Follow the patching schedule; progress is checked at each visit.",
      "Children's spectacle power changes, so check-ups are usually every 6 to 12 months.",
    ],
    doctors: ["Dr. Swetha T"],
    faqs: [
      { question: "At what age should my child have their first eye check-up?", answer: "Babies are checked at birth, and a full eye examination is recommended before the child starts school, or earlier if you notice a problem." },
      { question: "Will my child outgrow a squint?", answer: "A true squint does not go away on its own. Early treatment with glasses, patching or surgery helps the eyes work together and protects vision." },
      { question: "Can lazy eye be treated at any age?", answer: "Lazy eye responds most strongly when treated early in childhood. Older children can still improve, so a check-up is worthwhile at any age." },
      { question: "Does using a mobile phone increase spectacle power?", answer: "Long hours of close work and little outdoor time are linked with short sight in children. Regular breaks and outdoor play are recommended." },
      { question: "Is children's eye treatment covered?", answer: coverLine },
    ],
  },
  {
    slug: "oculoplasty",
    name: "Oculoplasty: Eyelid, Tear Duct and Orbit",
    short: "Oculoplasty",
    icon: "sparkles",
    kind: "MedicalProcedure",
    title: "Oculoplasty Surgeon in Karimnagar | Sri Harsha Eye Hospital",
    description:
      "Oculoplasty in Karimnagar: drooping eyelid (ptosis), eyelid lumps, watering eye and tear duct blockage (DCR), and eyelid reconstruction.",
    summary:
      "Oculoplasty is surgery of the eyelids, tear drainage system and the bony socket (orbit) around the eye. It treats problems such as drooping eyelids, watering eyes from blocked tear ducts, eyelid lumps and injuries.",
    symptoms: [
      "Drooping upper eyelid that blocks vision (ptosis)",
      "Constant watering or sticky discharge from one eye",
      "Eyelid turning in or out, with lashes rubbing the eye",
      "A lump or growth on the eyelid",
      "Swelling around the eye or a bulging eye",
    ],
    whenToSee:
      "See an eye doctor for a drooping lid that affects vision, persistent watering, or an eyelid lump that is growing, bleeding or changing.",
    diagnosis: [
      "Eyelid measurements and photographs",
      "Syringing of the tear duct to check for blockage",
      "Imaging (CT or MRI) for orbit problems when needed",
    ],
    treatments: [
      { name: "Ptosis correction", what: "Surgery to lift a drooping upper eyelid.", bestFor: "Ptosis affecting vision or appearance." },
      { name: "DCR (dacryocystorhinostomy)", what: "Creates a new tear drainage passage.", bestFor: "Watering eye from a blocked tear duct." },
      { name: "Eyelid lump removal and reconstruction", what: "Removes the lump, sends it for testing if needed and repairs the lid.", bestFor: "Chalazion, cysts and other eyelid growths." },
    ],
    dayOf: [
      "Most eyelid procedures are done under local anaesthesia as day surgery.",
      "Expect some swelling and bruising for one to two weeks.",
    ],
    recovery: [
      "Apply cold compresses and medicines as advised.",
      "Keep the area clean and avoid rubbing.",
      "Stitches, if any, are usually removed at the follow-up visit.",
    ],
    doctors: ["Dr. Ekta Agarwal"],
    faqs: [
      { question: "When is the oculoplasty specialist available?", answer: "Our visiting oculoplasty consultant sees patients on the 3rd Friday of each month. Call us to book an appointment." },
      { question: "Why does only one of my eyes water all the time?", answer: "A common cause is a blocked tear duct. A simple syringing test in the clinic can confirm it, and a DCR procedure can treat it." },
      { question: "Is ptosis surgery only cosmetic?", answer: "No. A drooping lid can block vision, and lifting it can improve the visual field as well as appearance." },
      { question: "Will there be a scar?", answer: "Incisions are usually placed in natural eyelid creases so that scars are hard to see once healed." },
      { question: "Is eyelid surgery covered?", answer: "Surgery done for a medical reason is often covered by insurance or schemes; purely cosmetic surgery usually isn't. Our desk will check your cover." },
    ],
  },
  {
    slug: "cornea",
    name: "Cornea and Keratoconus",
    short: "Cornea",
    icon: "shield",
    kind: "MedicalCondition",
    title: "Cornea Specialist in Karimnagar | Sri Harsha Eye Hospital",
    description:
      "Cornea care in Karimnagar: corneal ulcers and infections, keratoconus, corneal cross-linking and corneal transplantation.",
    summary:
      "The cornea is the clear front window of the eye. Infections, injuries and conditions such as keratoconus (a thinning, cone-shaped cornea) can blur vision and need specialist cornea care.",
    symptoms: [
      "Painful red eye with blurred vision or discharge (possible ulcer)",
      "A white spot on the black part of the eye",
      "Increasing spectacle power or astigmatism in teens and young adults (possible keratoconus)",
      "Sensitivity to light",
    ],
    whenToSee:
      "A painful red eye with blurred vision, especially after an injury with plant matter or in contact lens wearers, needs treatment the same day. Rapidly changing glasses power in young people should be checked for keratoconus.",
    diagnosis: [
      "Slit-lamp examination",
      "Corneal scraping and culture for infections",
      "Corneal topography and thickness measurement for keratoconus",
    ],
    treatments: [
      { name: "Medical treatment of infections", what: "Intensive antibiotic, antifungal or antiviral drops.", bestFor: "Corneal ulcers and keratitis." },
      { name: "Corneal cross-linking", what: "Riboflavin drops and UV light to strengthen the cornea.", bestFor: "Progressive keratoconus." },
      { name: "Corneal transplant (keratoplasty)", what: "Replaces the damaged cornea with donor tissue.", bestFor: "Corneal scarring or advanced disease." },
    ],
    dayOf: [
      "Tell us if you wear contact lenses and bring them with their case.",
      "Infections may need frequent drops and daily review at first.",
    ],
    recovery: [
      "Use drops exactly on schedule; missed doses can let an infection worsen.",
      "Protect the eye from dust and avoid rubbing, especially with keratoconus.",
    ],
    doctors: ["Dr. Sampath"],
    faqs: [
      { question: "What is keratoconus?", answer: "A condition where the cornea becomes thin and cone-shaped, causing blurred and distorted vision that keeps changing. It often starts in the teens or twenties." },
      { question: "Can keratoconus be stopped?", answer: "Corneal cross-linking can slow or stop progression in many patients, which is why early diagnosis helps." },
      { question: "Why is a corneal ulcer an emergency?", answer: "Corneal infections can worsen within days and leave scars that reduce vision. Early, intensive treatment gives a better outcome." },
      { question: "Is corneal treatment covered?", answer: coverLine },
      { question: "Can I keep wearing contact lenses?", answer: "Stop wearing them if your eye is red or painful and see us. Your doctor will advise when, and whether, it is safe to restart." },
    ],
  },
  {
    slug: "dry-eye",
    name: "Dry Eye Treatment",
    short: "Dry eye",
    icon: "activity",
    kind: "MedicalCondition",
    title: "Dry Eye Treatment in Karimnagar | Sri Harsha Eye Hospital",
    description:
      "Dry eye diagnosis and treatment in Karimnagar for burning, gritty, watery or tired eyes from screens, age, contact lenses or medical conditions.",
    summary:
      "Dry eye happens when the eyes don't make enough tears or the tears evaporate too fast. It causes burning, grittiness, redness and tired eyes, and it is common with long screen use, ageing, contact lenses and some medical conditions.",
    symptoms: [
      "Burning, stinging or a gritty, sandy feeling",
      "Red or tired eyes, especially after screen use",
      "Watery eyes (a reflex to dryness)",
      "Blurred vision that clears on blinking",
      "Discomfort with contact lenses",
    ],
    whenToSee:
      "See an eye doctor if dryness or irritation lasts more than a few days, affects work or sleep, or comes with pain, redness or reduced vision.",
    diagnosis: [
      "Slit-lamp examination of the tear film and eyelids",
      "Tear break-up time and Schirmer's test",
      "Examination of the oil glands in the eyelids",
    ],
    treatments: [
      { name: "Lubricating eye drops", what: "Artificial tears to supplement the natural tear film.", bestFor: "Most patients with mild to moderate dry eye." },
      { name: "Lid hygiene and warm compresses", what: "Daily routine to improve oil gland function.", bestFor: "Dry eye from blocked oil glands (meibomian gland dysfunction)." },
      { name: "Anti-inflammatory drops", what: "Prescription drops that reduce surface inflammation.", bestFor: "Moderate to severe or long-standing dry eye." },
    ],
    dayOf: ["The examination takes about 20 to 30 minutes and does not hurt."],
    recovery: [
      "Follow the 20-20-20 rule at screens: every 20 minutes, look 20 feet away for 20 seconds.",
      "Blink fully, drink enough water and avoid direct fans or AC on the face.",
      "Use drops regularly; improvement is gradual over weeks.",
    ],
    doctors: ["Dr. Srilatha CH"],
    faqs: [
      { question: "Why are my eyes watering if they are dry?", answer: "Dryness irritates the eye surface, which triggers reflex tearing. These reflex tears don't lubricate well, so the dryness continues." },
      { question: "Can screen use cause dry eye?", answer: "Yes. People blink less when looking at screens, which dries the eye surface. Regular breaks and lubricating drops help." },
      { question: "Can I use any eye drops from the pharmacy?", answer: "Some drops, especially those for redness or with steroids, are not suitable for long-term use. Ask your eye doctor which drops are right for you." },
      { question: "Is dry eye permanent?", answer: "Dry eye is often long-term but can usually be well controlled with the right treatment and habits." },
      { question: "Do I need an appointment for dry eye?", answer: "Yes, book a consultation so the cause can be found; treatment depends on the type of dry eye." },
    ],
  },
  {
    slug: "spectacle-power",
    name: "Spectacle Power and Refractive Errors",
    short: "Spectacle power",
    icon: "glasses",
    kind: "MedicalCondition",
    title: "Eye Power Check-up in Karimnagar | Sri Harsha Eye Hospital",
    description:
      "Computerised and manual eye power check-up in Karimnagar for short sight, long sight, astigmatism and reading glasses, with full eye health check.",
    summary:
      "Refractive errors are focusing problems of the eye: short sight (myopia), long sight (hypermetropia), astigmatism and age-related reading difficulty (presbyopia). They are measured in an eye power check-up and corrected with spectacles or contact lenses.",
    symptoms: [
      "Blurred vision for distance or near",
      "Headaches or eye strain after reading or screen work",
      "Squinting to see clearly",
      "Difficulty reading small print after 40",
    ],
    whenToSee:
      "Get your power checked if you notice blurred vision or headaches, once every one to two years for adults, and yearly for children who wear glasses.",
    diagnosis: [
      "Computerised refraction (auto-refractometer)",
      "Subjective refraction to fine-tune the prescription",
      "Eye pressure and retina check as part of a complete examination",
    ],
    treatments: [
      { name: "Spectacles", what: "Single-vision, bifocal or progressive lenses.", bestFor: "Most people; the simplest and safest correction." },
      { name: "Contact lenses", what: "Soft or specialised lenses after a fitting assessment.", bestFor: "Active lifestyles or high power, with good lens hygiene." },
      { name: "Refractive surgery assessment", what: "Tests to check if your eyes suit laser vision correction.", bestFor: "Adults with stable power who want to reduce dependence on glasses." },
    ],
    dayOf: ["Bring your current glasses. The check-up takes about 30 to 45 minutes; dilation may be needed."],
    recovery: ["Wear new glasses for a few days to adjust; come back if you still feel strain after a week."],
    doctors: ["Dr. Srilatha CH"],
    faqs: [
      { question: "How often should I check my spectacle power?", answer: "Every one to two years for adults, yearly for children with glasses, or sooner if your vision changes." },
      { question: "Can spectacle power be reduced without glasses?", answer: "Eye exercises do not cure refractive errors. Glasses, contact lenses or, for suitable adults, refractive surgery correct them." },
      { question: "Why do I need reading glasses after 40?", answer: "The eye's lens gradually loses its focusing ability with age (presbyopia). Reading glasses or progressive lenses correct it." },
      { question: "Is a computerised eye test enough?", answer: "A computerised reading is a starting point; the final prescription is fine-tuned by testing your vision, and the eye's health is checked too." },
      { question: "Do you have an optical shop?", answer: "Please call us to ask about spectacle dispensing at the hospital." },
    ],
  },
  {
    slug: "eye-check-up",
    name: "Complete Eye Check-up",
    short: "Eye check-up",
    icon: "stethoscope",
    kind: "MedicalTherapy",
    title: "Full Eye Check-up in Karimnagar | Sri Harsha Eye Hospital",
    description:
      "Complete eye check-up in Karimnagar: vision and power test, eye pressure, slit-lamp and dilated retina examination for adults, diabetics and children.",
    summary:
      "A complete eye check-up tests your vision and spectacle power and examines the health of every part of the eye, including the pressure and the retina. It finds silent problems such as glaucoma and diabetic retinopathy before they affect sight.",
    symptoms: [
      "Routine check-up with no symptoms",
      "Blurred vision, headaches or eye strain",
      "Diabetes, high blood pressure or a family history of glaucoma",
      "Age over 40",
    ],
    whenToSee:
      "Adults should have a complete eye check-up every one to two years, and every year after 40 or with diabetes. Children should be checked before starting school.",
    diagnosis: [
      "Vision and spectacle power test",
      "Eye pressure measurement",
      "Slit-lamp examination of the front of the eye",
      "Dilated retina and optic nerve examination",
      "Further tests such as OCT or visual fields when needed",
    ],
    treatments: [
      { name: "Glasses prescription", what: "Updated spectacle power.", bestFor: "Refractive errors." },
      { name: "Referral within the hospital", what: "Same-day or planned review with the right specialist.", bestFor: "Cataract, glaucoma, retina, cornea or children's eye problems found at the check-up." },
    ],
    dayOf: [
      "Allow 45 to 90 minutes, including dilation.",
      "Dilating drops blur vision for a few hours; don't drive yourself home.",
      "Bring your glasses, previous reports and list of medicines.",
    ],
    recovery: ["Wear sunglasses after dilation if light feels bright; vision returns to normal within a few hours."],
    doctors: ["Dr. Srilatha CH", "Dr. Praneetha Goud A"],
    faqs: [
      { question: "How long does a full eye check-up take?", answer: "Usually 45 to 90 minutes, depending on whether dilation and extra tests are needed." },
      { question: "Why are dilating drops used?", answer: "They widen the pupil so the doctor can examine the retina and optic nerve properly, which is where diabetes and glaucoma damage shows." },
      { question: "Do I need an appointment?", answer: "Booking an appointment reduces waiting time. You can book online, by phone or on WhatsApp." },
      { question: "Can I drive after the check-up?", answer: "Not if your eyes were dilated. Vision is blurred for a few hours, so bring someone with you." },
      { question: "What should I bring?", answer: "Your glasses, any previous eye reports, a list of your medicines, and your insurance or scheme card if you have one." },
    ],
  },
  {
    slug: "eye-emergencies",
    name: "Eye Emergencies",
    short: "Emergencies",
    icon: "siren",
    kind: "MedicalTherapy",
    title: "Eye Emergency Care in Karimnagar | Sri Harsha Eye Hospital",
    description:
      "Eye injury, chemical splash, sudden vision loss or painful red eye in Karimnagar? Call Sri Harsha Eye Hospital immediately. First-aid steps inside.",
    summary:
      "An eye emergency is any injury or sudden change that can threaten sight, such as a chemical splash, a cut or blow to the eye, sudden loss of vision, or a severely painful red eye. Fast treatment can save vision.",
    symptoms: [
      "Chemical splash in the eye",
      "Injury, cut or object in the eye",
      "Sudden loss of vision or a curtain over the vision",
      "Severe eye pain with redness, headache or vomiting",
      "Sudden flashes and a shower of floaters",
    ],
    whenToSee:
      "Call us immediately and come straight to the hospital. For a chemical splash, rinse the eye with clean running water for at least 15 minutes first.",
    diagnosis: ["Urgent vision and eye examination", "Imaging when an object or fracture is suspected"],
    treatments: [
      { name: "Chemical injury care", what: "Thorough washing, pH check and medicines.", bestFor: "Acid, alkali, lime or cleaning-liquid splashes." },
      { name: "Injury repair", what: "Removal of foreign bodies, wound repair or surgery.", bestFor: "Cuts, blows and objects in the eye." },
      { name: "Urgent pressure control", what: "Medicines and laser to bring eye pressure down.", bestFor: "Acute angle-closure glaucoma." },
    ],
    dayOf: [
      "Do not rub the eye or try to remove an object stuck in it.",
      "Do not put any drops, kajal, ghee or home remedies in an injured eye.",
      "Cover the eye lightly with a clean cup or shield and come to the hospital.",
    ],
    recovery: ["Follow the treatment plan closely and attend all follow-ups; some injuries need repeated checks."],
    doctors: ["Dr. Srilatha CH", "Dr. Praneetha Goud A"],
    faqs: [
      { question: "What should I do first after a chemical splash?", answer: "Rinse the eye with clean running water for at least 15 minutes, holding the eyelids open, then come to the hospital immediately." },
      { question: "Should I remove something stuck in my eye?", answer: "No. Don't rub or try to pull it out. Cover the eye lightly and come to the hospital." },
      { question: "Is sudden painless loss of vision an emergency?", answer: "Yes. It can be caused by a retinal problem or a blocked blood vessel and needs to be examined straight away." },
      { question: "Can I use home remedies for an eye injury?", answer: "No. Home remedies can cause infection and delay treatment. Come to the hospital." },
      { question: "How do I reach the hospital?", answer: "We are near Mancherial Chowrasta Circle, Karimnagar. Call ahead on the hospital number so the team can be ready." },
    ],
  },
]

export function serviceBySlug(slug: string | undefined) {
  return services.find((s) => s.slug === slug)
}

export const servicePath = (s: Pick<Service, "slug">) => `/eye-care/${s.slug}`
