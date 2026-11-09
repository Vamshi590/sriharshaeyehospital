import { useEffect, useState } from "react"
import { X } from "lucide-react"
import operationtheatre from "../assets/infra1.webp"
import infrastructure2 from "../assets/infra4.webp"
import consultationroom from "../assets/infra6.webp"
import waitingarea from "../assets/infra7.webp"
import groupphoto from "../assets/group photo.jpeg"
import camp from "../assets/camp.jpeg"
import camp2 from "../assets/camp2.webp"
import reception from "../assets/reception.webp"
import speech from "../assets/speech.jpg"
import camp3 from "../assets/camp3.jpeg"
import camp4 from "../assets/camp4.jpeg"
import camp5 from "../assets/camp5.jpg"
import ward from "../assets/ward area.webp"
import group from "../assets/group2.webp"

export default function GalleryPage() {
  const [selected, setSelected] = useState<{ image: string; title: string } | null>(null)

  const galleryImages = [
    {
      category: "Infrastructure",
      title: "Modern Operation Theatre",
      image: operationtheatre,
    },
    {
      category: "Infrastructure",
      title: "Advanced Diagnostic Equipment",
      image: infrastructure2,
    },
    {
      category: "Infrastructure",
      title: "Patient Consultation Room",
      image: consultationroom,
    },
    {
      category: "Infrastructure",
      title: "Waiting Area",
      image: waitingarea,
    },
    {
      category: "Team",
      title: "Our Medical Team",
      image: groupphoto,
    },
    {
      category: "Infrastructure",
      title: "Reception Area",
      image: reception,
    },
    {
      category: "Infrastructure",
      title: "Ward Area",
      image: ward,
    },
    {
      category: "Team",
      title: "Our Medical Team",
      image: group,
    },
    {
      category: "Events",
      title: "Eye Health Awareness Camp",
      image: camp,
    },
    {
      category: "Events",
      title: "Community Outreach Program",
      image: camp2,
    },
     {
      category: "Events",
      title: "Community Outreach Program",
      image: camp3,
    },
     {
      category: "Events",
      title: "Community Outreach Program",
      image: camp4,
    },
     {
      category: "Events",
      title: "Community Outreach Program",
      image: camp5,
    },
    {
      category: "Events",
      title: "Patient Education Session",
      image: speech,
    },
  ]

  // Close the lightbox with the Escape key.
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected])

  const categories = ["All", ...new Set(galleryImages.map((img) => img.category))]
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredImages =
    activeCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory)

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-foreground mb-4">Gallery</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Explore our state-of-the-art facilities, dedicated team, and community initiatives
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 md:px-6 md:py-2 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((item) => (
              <div
                key={item.image}
                onClick={() => setSelected(item)}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-primary/30 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-xs text-white font-medium">{item.category}</p>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              autoFocus
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <img src={selected.image} alt={selected.title} className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
          </div>
        </div>
      )}

      {/* Info Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "World-Class Infrastructure",
                description: "State-of-the-art facilities equipped with the latest diagnostic and surgical technology",
              },
              {
                title: "Expert Team",
                description: "Highly qualified ophthalmologists and support staff dedicated to patient care",
              },
              {
                title: "Community Care",
                description: "Regular awareness programs and community outreach initiatives for eye health",
              },
            ].map((item, index) => (
              <div key={index} className="p-8 bg-white rounded-2xl border border-border text-center">
                <h3 className="font-semibold text-lg text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
