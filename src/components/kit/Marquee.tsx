import * as React from "react"
import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

/**
 * Marquee — an endless horizontal scroll of its children (client logos,
 * press quotes, product tiles). Pure CSS animation; pauses on hover; stands
 * still for visitors who ask for reduced motion. Duplicates the children
 * once so the loop is seamless: give it enough items to fill the row (6+),
 * or the gap shows.
 *
 *   <Marquee speed={40} className="py-6">
 *     {logos.map((l) => <img key={l.src} src={l.src} alt={l.alt} className="h-8 opacity-70" />)}
 *   </Marquee>
 */
export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Seconds for one full loop. Lower is faster. */
  speed?: number
  /** Scroll right-to-left (default) or left-to-right. */
  reverse?: boolean
  /** Stop the motion while the pointer is over it (default true). */
  pauseOnHover?: boolean
  /** Fade the edges into the page background (default true). */
  fadeEdges?: boolean
  /** Gap between items, any CSS length. */
  gap?: string
}

export function Marquee({
  children,
  className,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  fadeEdges = true,
  gap = "3rem",
  onMouseEnter,
  onMouseLeave,
  ...props
}: MarqueeProps) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = React.useState(false)

  // The animation is an inline style, so its on/off and paused states are
  // decided here too: an inline `animation` shorthand beats any class rule
  // (including motion-reduce utilities) and resets play-state to running.
  const trackStyle: React.CSSProperties = reduce
    ? {}
    : {
        animation: `kit-marquee ${speed}s linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
        animationPlayState: pauseOnHover && hovered ? "paused" : "running",
      }

  const items = (ariaHidden: boolean) => (
    <div
      className="flex shrink-0 items-center"
      style={{ gap, paddingRight: gap }}
      aria-hidden={ariaHidden || undefined}
    >
      {children}
    </div>
  )

  return (
    <div
      className={cn("relative flex w-full overflow-hidden", className)}
      style={
        fadeEdges
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }
          : undefined
      }
      onMouseEnter={(e) => {
        setHovered(true)
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        setHovered(false)
        onMouseLeave?.(e)
      }}
      {...props}
    >
      <div className="kit-marquee-track flex w-max" style={trackStyle}>
        {items(false)}
        {items(true)}
      </div>
    </div>
  )
}
