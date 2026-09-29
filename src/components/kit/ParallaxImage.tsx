import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

/**
 * ParallaxImage — a full-bleed image that drifts slower than the page as
 * you scroll, giving a hero or section band depth. The image is rendered
 * slightly taller than its frame so the motion never exposes an edge.
 * Put text in `children`; it sits on top and does not move.
 *
 *   <ParallaxImage src={hero} alt="..." className="h-[80vh]">
 *     <div className="container ...">...</div>
 *   </ParallaxImage>
 */
export interface ParallaxImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt?: string
  /** How far the image travels relative to the scroll, 0-1 (default 0.25). */
  strength?: number
  /** Darken the image for legible text on top, 0-1 (default 0.35). */
  overlay?: number
}

export function ParallaxImage({
  src,
  alt = "",
  strength = 0.25,
  overlay = 0.35,
  className,
  children,
  ...props
}: ParallaxImageProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  // The image is 130% tall, so -15% centers it in the frame. That baseline
  // is folded into the motion value: framer writes an inline `transform`
  // for `y`, which would override a Tailwind translate class and anchor the
  // image at the top, exposing a strip of background above it. The travel
  // (±half the range) is capped so the image never leaves the frame.
  const travel = Math.min(15, 30 * strength) // percent, each direction
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${(15 + travel).toFixed(2)}%`, `-${(15 - travel).toFixed(2)}%`]
  )

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 h-[130%] w-full object-cover"
        style={reduce ? { y: "-15%" } : { y }}
      />

      {overlay > 0 && (
        <div aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${overlay})` }} />
      )}
      <div className="relative h-full">{children}</div>
    </div>
  )
}
