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
]

export const articlePath = (a: Pick<Article, "slug">) => `/health-library/${a.slug}`
export const articleBySlug = (slug: string | undefined) => articles.find((a) => a.slug === slug)
