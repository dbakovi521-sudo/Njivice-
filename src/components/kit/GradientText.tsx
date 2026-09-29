import * as React from "react"
import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

/**
 * GradientText — a word or phrase filled with a slowly moving gradient.
 * One per hero, on the two or three words that matter; never a paragraph.
 * Defaults to the theme primary; pass `from`/`via`/`to` for a custom sweep.
 *
 *   <h1 className="font-display text-6xl">
 *     Ride <GradientText>further</GradientText>.
 *   </h1>
 */
export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  from?: string
  via?: string
  to?: string
  /** Seconds for one sweep (default 8). 0 disables the motion. */
  speed?: number
}

export function GradientText({
  children,
  className,
  from = "hsl(var(--primary))",
  via = "hsl(var(--primary) / 0.55)",
  to = "hsl(var(--primary))",
  speed = 8,
  ...props
}: GradientTextProps) {
  // Inline `animation` beats any class rule, so reduced motion is decided
  // here: the gradient still renders, it just stops sweeping.
  const reduce = useReducedMotion()
  const animate = speed > 0 && !reduce
  return (
    <span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(90deg, ${from}, ${via}, ${to})`,
        backgroundSize: "200% 100%",
        animation: animate ? `kit-gradient-shift ${speed}s ease-in-out infinite` : undefined,
      }}
      {...props}
    >
      {children}
    </span>
  )
}
