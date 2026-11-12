import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"

export type Slide = { src: string; alt: string; width: number; height: number; fit?: "cover" | "contain" }

/**
 * Lightweight photo carousel built on CSS scroll-snap (replaces react-slick).
 * Autoplays every `interval` ms unless the visitor prefers reduced motion, is interacting
 * (hover, focus, touch) or has pressed the pause button (WCAG 2.2.2).
 */
export function PhotoCarousel({ slides, interval = 3000, label }: { slides: Slide[]; interval?: number; label: string }) {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false) // temporary: hover / focus
  const [stopped, setStopped] = useState(false) // sticky: pause button or touch

  const goTo = (i: number) => {
    const el = track.current
    if (!el) return
    const next = (i + slides.length) % slides.length
    el.scrollTo?.({ left: next * el.clientWidth, behavior: "smooth" })
    setActive(next)
  }

  useEffect(() => {
    const reduce = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (paused || stopped || reduce || slides.length < 2) return
    const id = window.setInterval(() => goTo(active + 1), interval)
    return () => window.clearInterval(id)
  })

  const onScroll = () => {
    const el = track.current
    if (el && el.clientWidth) setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <div
      className="relative h-full"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={(e) => e.pointerType !== "mouse" && setStopped(true)}
    >
      <div
        ref={track}
        onScroll={onScroll}
        tabIndex={0}
        aria-label={`${label}: use the arrow keys to scroll`}
        className="flex h-full overflow-x-auto snap-x snap-mandatory rounded-3xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
      >
        {slides.map((s, i) => (
          <div key={s.src} className="relative h-full w-full flex-shrink-0 snap-center" aria-label={`${i + 1} of ${slides.length}`} role="group">
            <img
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
              loading="lazy"
              decoding="async"
              className={`w-full h-full rounded-3xl ${s.fit === "contain" ? "object-contain" : "object-cover"}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute -bottom-10 left-0 right-0 flex justify-center items-center">
        {slides.length > 1 && (
          <button
            type="button"
            onClick={() => setStopped((v) => !v)}
            aria-label={stopped ? "Play slideshow" : "Pause slideshow"}
            className="mr-1 w-8 h-8 flex items-center justify-center rounded-full text-foreground/70 hover:text-primary hover:bg-white"
          >
            {stopped ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          </button>
        )}
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => {
              setStopped(true)
              goTo(i)
            }}
            aria-label={`Show photo ${i + 1}: ${s.alt}`}
            aria-current={i === active}
            className="group h-8 min-w-6 px-1 flex items-center justify-center"
          >
            <span className={`block h-2.5 rounded-full transition-all ${i === active ? "w-6 bg-primary" : "w-2.5 bg-gray-400 group-hover:bg-gray-500"}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
