import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

/**
 * StickyScrollStory — "how it works" told as a scroll: the steps scroll on
 * one side while the matching image stays pinned on the other and swaps as
 * each step reaches the middle of the screen. Three to five steps, each
 * with its own real image. On phones it becomes a plain stacked list.
 *
 *   <StickyScrollStory
 *     steps={[
 *       { title: "Pick your bike", body: "...", image: img1, alt: "..." },
 *       { title: "We build it", body: "...", image: img2, alt: "..." },
 *       { title: "Ride out", body: "...", image: img3, alt: "..." },
 *     ]}
 *   />
 */
export interface StoryStep {
  title: React.ReactNode
  body?: React.ReactNode
  image: string
  alt?: string
  eyebrow?: string
}

export interface StickyScrollStoryProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StoryStep[]
  /** Put the pinned image on the left (default) or the right. */
  imageSide?: "left" | "right"
}

export function StickyScrollStory({
  steps,
  imageSide = "left",
  className,
  ...props
}: StickyScrollStoryProps) {
  const [active, setActive] = React.useState(0)
  const refs = React.useRef<Array<HTMLLIElement | null>>([])
  const reduce = useReducedMotion()

  React.useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLLIElement[]
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.step)
            if (!Number.isNaN(idx)) setActive(idx)
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [steps.length])

  const current = steps[Math.min(active, steps.length - 1)]

  return (
    <div
      className={cn(
        "grid gap-10 lg:grid-cols-2 lg:gap-16",
        imageSide === "right" && "lg:[&>*:first-child]:order-2",
        className
      )}
      {...props}
    >
      <div className="relative hidden lg:block">
        <div className="sticky top-24 aspect-[4/5] overflow-hidden rounded-3xl border border-border/60 bg-muted">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={current?.image}
              src={current?.image}
              alt={current?.alt ?? ""}
              className="absolute inset-0 h-full w-full object-cover"
              initial={reduce ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </AnimatePresence>
        </div>
      </div>

      <ol className="flex flex-col gap-16 lg:gap-[40vh] lg:py-[20vh]">
        {steps.map((s, i) => (
          <li
            key={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            data-step={i}
            className={cn(
              "transition-opacity duration-300",
              i === active ? "opacity-100" : "lg:opacity-40"
            )}
          >
            <img
              src={s.image}
              alt={s.alt ?? ""}
              className="mb-6 aspect-[4/3] w-full rounded-2xl object-cover lg:hidden"
              loading="lazy"
            />
            {s.eyebrow && (
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">{s.eyebrow}</p>
            )}
            <h3 className="text-2xl font-semibold leading-tight md:text-3xl">{s.title}</h3>
            {s.body && <p className="mt-3 max-w-prose text-muted-foreground">{s.body}</p>}
          </li>
        ))}
      </ol>
    </div>
  )
}
