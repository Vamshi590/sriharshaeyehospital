import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { PageHeader } from "../components/page-header"
import operationtheatre from "../assets/infra1.webp"
import infrastructure2 from "../assets/infra4.webp"
import consultationroom from "../assets/infra6.webp"
import waitingarea from "../assets/infra7.webp"
import groupphoto from "../assets/group photo.webp"
import camp from "../assets/camp.webp"
import camp2 from "../assets/camp2.webp"
import reception from "../assets/reception.webp"
import speech from "../assets/speech.webp"
import camp3 from "../assets/camp3.webp"
import camp4 from "../assets/camp4.webp"
import camp5 from "../assets/camp5.webp"
import ward from "../assets/ward area.webp"
import group from "../assets/group2.webp"

export default function GalleryPage() {
  /** Index into `filteredImages` of the photo open in the lightbox. */
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

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

  const categories = ["All", ...new Set(galleryImages.map((img) => img.category))]
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredImages =
    activeCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory)
  const selected = openIndex === null ? null : filteredImages[openIndex]

  const open = (index: number, opener: HTMLElement) => {
    openerRef.current = opener
    setOpenIndex(index)
  }
  const close = () => setOpenIndex(null)
  const step = (delta: number) =>
    setOpenIndex((i) => (i === null ? i : (i + delta + filteredImages.length) % filteredImages.length))

  // While the lightbox is open: keyboard controls, focus kept inside, page scroll locked.
  // When it closes, focus returns to the photo that opened it.
  useEffect(() => {
    if (openIndex === null) return
    const dialog = dialogRef.current
    dialog?.querySelector<HTMLElement>("[data-autofocus]")?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowRight") step(1)
      else if (e.key === "ArrowLeft") step(-1)
      else if (e.key === "Tab" && dialog) {
        const focusable = [...dialog.querySelectorAll<HTMLElement>("button")]
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = overflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex === null])

  useEffect(() => {
    if (openIndex === null) openerRef.current?.focus()
  }, [openIndex])

  return (
    <div>
      <PageHeader title="Gallery" intro={<p>See our facilities, our team and our community eye camps.</p>} />

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12 justify-center" role="group" aria-label="Filter photos">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`min-h-11 px-5 md:px-6 rounded-full font-medium transition-colors ${
                  activeCategory === category ? "bg-slate-900 text-white" : "bg-muted text-foreground hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Photo grid */}
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {filteredImages.map((item, index) => (
              <li key={item.image}>
                <button
                  type="button"
                  onClick={(e) => open(index, e.currentTarget)}
                  aria-label={`Open photo: ${item.title}`}
                  className="group relative block w-full h-40 sm:h-56 md:h-64 rounded-xl md:rounded-2xl overflow-hidden border border-border hover:border-primary/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover motion-safe:group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent p-3 md:p-5 pt-8 text-left">
                    <span className="block text-[11px] md:text-xs uppercase tracking-wide text-white/90 font-medium">{item.category}</span>
                    <span className="block text-sm md:text-lg font-semibold text-white leading-snug">{item.title}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lightbox */}
      {selected && openIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} (photo ${openIndex + 1} of ${filteredImages.length})`}
          className="fixed inset-0 bg-black/90 z-[60] flex flex-col items-center justify-center p-4"
          onClick={close}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selected.image} alt={selected.title} className="w-full h-auto max-h-[75vh] object-contain rounded-lg" />
            <p className="mt-3 text-center text-white">
              {selected.title} <span className="text-white/70">· {openIndex + 1} / {filteredImages.length}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close photo"
            data-autofocus
            className="absolute top-3 right-3 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25"
          >
            <X size={28} aria-hidden="true" />
          </button>
          {filteredImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                aria-label="Previous photo"
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25"
              >
                <ChevronLeft size={28} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                aria-label="Next photo"
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25"
              >
                <ChevronRight size={28} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Info Section */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                title: "Modern Infrastructure",
                description: "Facilities equipped with modern diagnostic and surgical technology",
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
              <div key={index} className="p-6 md:p-8 bg-white rounded-2xl border border-border text-center">
                <h3 className="font-semibold text-lg text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/75">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
