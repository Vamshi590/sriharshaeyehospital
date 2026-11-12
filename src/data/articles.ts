/** Health library articles (/health-library/<slug>). Turn Instagram posts into articles here. */
export type Article = {
  slug: string
  title: string
  description: string
  published: string
  updated?: string
  /** Related service slug. */
  service: string
  sections: { heading: string; body: string[] }[]
}

export const articles: Article[] = [
  {
    slug: "diabetes-and-your-eyes",
    title: "Diabetes and Your Eyes: How Often to Get Checked",
    description:
      "Why people with diabetes need a yearly dilated eye check-up, what diabetic retinopathy is, and the warning signs that need care the same day.",
    published: "2026-11-10",
    service: "diabetic-retinopathy",
    sections: [
      {
        heading: "Why diabetes affects the eyes",
        body: [
          "High blood sugar over time damages the small blood vessels of the retina, the light-sensitive layer at the back of the eye. This is called diabetic retinopathy.",
          "In the early stages there are usually no symptoms. By the time vision blurs, the damage may already be advanced.",
        ],
      },
      {
        heading: "How often should you get your eyes checked?",
        body: [
          "Have a dilated retina examination at least once a year, starting when diabetes is diagnosed, or as often as your eye doctor advises.",
          "Pregnant women with diabetes and people who already have retinopathy usually need more frequent checks.",
        ],
      },
      {
        heading: "Warning signs that need care the same day",
        body: ["A sudden shower of floaters, a curtain over your vision, or sudden loss of vision. Call the hospital and come in straight away."],
      },
      {
        heading: "What you can do",
        body: [
          "Keep blood sugar, blood pressure and cholesterol in the range your physician sets.",
          "Don't skip your yearly eye check-up even if you see well.",
        ],
      },
    ],
  },
  {
    slug: "when-to-consider-cataract-surgery",
    title: "Cataract: When Is the Right Time for Surgery?",
    description:
      "How to tell when a cataract is affecting daily life, what the lens (IOL) choices are, and what to ask your surgeon before cataract surgery.",
    published: "2026-11-10",
    service: "cataract-surgery",
    sections: [
      {
        heading: "There is no need to wait for a cataract to 'ripen'",
        body: [
          "Modern phaco surgery does not require the cataract to become mature. Surgery is usually advised when blurred or glary vision starts to affect reading, driving, work or safety.",
        ],
      },
      {
        heading: "Signs the cataract is affecting your life",
        body: [
          "Difficulty reading or recognising faces, glare from headlights at night, frequent changes of glasses, or falls and missteps in dim light.",
        ],
      },
      {
        heading: "Choosing a lens",
        body: [
          "A monofocal lens gives clear vision at one distance; toric lenses also correct astigmatism; multifocal and trifocal lenses focus at several distances. Your surgeon recommends options after measuring your eyes.",
        ],
      },
      {
        heading: "Questions to ask your surgeon",
        body: [
          "Which lens suits my eyes and lifestyle? Will I need glasses afterwards? How many follow-up visits are included? Is the surgery covered by my scheme or insurance?",
        ],
      },
    ],
  },
  {
    slug: "glaucoma-the-silent-thief-of-sight",
    title: "Glaucoma: Why Eye Pressure Checks Matter After 40",
    description:
      "Glaucoma slowly damages the optic nerve without pain or early symptoms. Who is at risk, how it is detected, and why lifelong follow-up protects your sight.",
    published: "2026-11-12",
    service: "glaucoma",
    sections: [
      {
        heading: "Why glaucoma is called the 'silent thief of sight'",
        body: [
          "Glaucoma is a group of diseases that damage the optic nerve, the cable that carries images from the eye to the brain. It is often linked to raised pressure inside the eye.",
          "The most common type causes no pain and no early symptoms. Side vision is lost first, so many people notice nothing until the damage is advanced. Vision lost to glaucoma cannot be brought back, but further loss can usually be slowed or stopped with treatment.",
        ],
      },
      {
        heading: "Who should get checked",
        body: [
          "Everyone over 40 should have an eye check-up that includes eye pressure and an optic nerve examination.",
          "Get checked earlier and more often if a parent, brother or sister has glaucoma, or if you have diabetes, high minus spectacle power (myopia), or have used steroid tablets, drops or creams for a long time.",
        ],
      },
      {
        heading: "How glaucoma is detected",
        body: [
          "A complete check includes measuring eye pressure, examining the optic nerve, and, when needed, a visual field test (to map side vision) and an OCT scan (to measure the nerve fibre layer).",
        ],
      },
      {
        heading: "Treatment is lifelong: keep every follow-up",
        body: [
          "Most people are treated with daily eye drops; some need laser or surgery. Use the drops exactly as prescribed, even when your eyes feel fine, and don't stop them without asking your doctor.",
        ],
      },
      {
        heading: "When it is an emergency",
        body: [
          "A sudden painful red eye with blurred vision, haloes around lights, headache or vomiting can be acute angle-closure glaucoma. Get eye care the same day.",
        ],
      },
    ],
  },
  {
    slug: "when-should-children-get-eye-check-ups",
    title: "Your Child's Eyes: When to Get Them Checked",
    description:
      "When children should have eye check-ups, the warning signs parents can spot at home, and why lazy eye and squint should be treated early.",
    published: "2026-11-12",
    service: "childrens-eye-care",
    sections: [
      {
        heading: "Why early checks matter",
        body: [
          "A child's vision is still developing. Problems such as high spectacle power, lazy eye (amblyopia) and squint are easiest to treat when found early; some become much harder to correct as the child grows.",
          "Children rarely complain about poor vision because they don't know what clear vision should look like.",
        ],
      },
      {
        heading: "When to get your child's eyes checked",
        body: [
          "Have a complete eye examination before your child starts school, and then as often as the eye doctor advises.",
          "Babies born early (premature) need a retina check soon after birth, as advised by the paediatrician.",
        ],
      },
      {
        heading: "Signs parents can spot at home",
        body: [
          "Eyes that don't look in the same direction, holding books or phones very close, sitting very near the TV, frequent eye rubbing or blinking, tilting the head to look, or headaches after school work.",
          "A white reflection in the pupil in photographs needs an eye examination without delay.",
        ],
      },
      {
        heading: "Screens and outdoor play",
        body: [
          "Long hours of close-up work and little time outdoors are linked with short sight (myopia) in children. Encourage regular breaks from screens and books, and at least some outdoor play every day.",
        ],
      },
    ],
  },
  {
    slug: "screen-time-dry-eyes-and-eye-strain",
    title: "Screen Time, Dry Eyes and Eye Strain: Simple Relief",
    description:
      "Why long hours on phones and computers cause tired, dry, burning eyes, simple habits like the 20-20-20 rule that help, and when to see an eye doctor.",
    published: "2026-11-12",
    service: "dry-eye",
    sections: [
      {
        heading: "Why screens tire the eyes",
        body: [
          "We blink much less while looking at a screen, so the tear film dries out. Focusing up close for a long time also tires the eye muscles. The result is burning, gritty or watery eyes, blurred vision and headaches.",
        ],
      },
      {
        heading: "Habits that help",
        body: [
          "Follow the 20-20-20 rule: every 20 minutes, look at something about 20 feet (6 metres) away for 20 seconds.",
          "Blink fully and often, keep the screen slightly below eye level and an arm's length away, reduce glare, and avoid fans or AC blowing directly at your face.",
          "Wear your correct glasses for screen work if you have spectacle power.",
        ],
      },
      {
        heading: "About eye drops",
        body: [
          "Lubricating drops can ease dryness. Don't use drops containing steroids or 'redness relief' drops regularly without a doctor's advice.",
        ],
      },
      {
        heading: "When to see an eye doctor",
        body: [
          "If symptoms last for weeks despite these habits, if vision stays blurred, or if your eyes are painful or red, have an eye check-up. Ongoing dry eye can be tested for and treated.",
        ],
      },
    ],
  },
  {
    slug: "eye-injury-first-aid",
    title: "Eye Injuries and Chemical Splashes: First Aid Before You Reach Hospital",
    description:
      "What to do (and what not to do) right after a chemical splash, a blow to the eye or something stuck in the eye, and which injuries need care immediately.",
    published: "2026-11-12",
    service: "eye-emergencies",
    sections: [
      {
        heading: "Chemical splash: rinse first, then come in",
        body: [
          "Rinse the eye immediately with plenty of clean running water for at least 15 minutes, holding the eyelids open. Remove contact lenses if they come out easily.",
          "Then get to an eye doctor or emergency department straight away. Bring the chemical's name or container if you can. Lime (chuna), cement and cleaning products can cause serious damage.",
        ],
      },
      {
        heading: "Something stuck in the eye",
        body: [
          "Do not rub the eye. Try blinking or gently rinsing with clean water to wash out dust or sand.",
          "If something is stuck on or in the eye, do not try to remove it yourself. Cover the eye loosely with a clean paper cup or shield (without pressing on it) and get care immediately.",
        ],
      },
      {
        heading: "A blow to the eye",
        body: [
          "A cold compress held gently against the cheek and brow (not pressed on the eye) can reduce swelling. Get the eye checked the same day if vision is blurred, there is pain, blood in the eye, or you see flashes or new floaters.",
        ],
      },
      {
        heading: "What not to do",
        body: [
          "Don't rub or press on an injured eye, don't put home remedies, oils or leftover eye drops in it, and don't wait to see if it gets better on its own.",
        ],
      },
      {
        heading: "Get care immediately for",
        body: [
          "Any chemical in the eye, a cut or puncture, sudden loss of vision, severe pain, or an object stuck in the eye. Call the hospital on the way, or go to the nearest emergency department.",
        ],
      },
    ],
  },
]

export const articlePath = (a: Pick<Article, "slug">) => `/health-library/${a.slug}`
export const articleBySlug = (slug: string | undefined) => articles.find((a) => a.slug === slug)
