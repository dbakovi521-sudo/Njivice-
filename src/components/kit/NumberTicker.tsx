import * as React from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

/**
 * NumberTicker — counts a number up from zero the first time it scrolls
 * into view. For stats bands ("12,000+ riders", "98%", "$4.2M").
 * Pass the number; pass prefix/suffix for units. Keep the number REAL.
 *
 *   <NumberTicker value={12000} suffix="+" className="text-5xl font-display" />
 *   <NumberTicker value={98} suffix="%" />
 *   <NumberTicker value={4.2} prefix="$" suffix="M" decimals={1} />
 */
export interface NumberTickerProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number
  prefix?: string
  suffix?: string
  /** Decimal places to show (default 0). */
  decimals?: number
  /** Seconds the count-up takes. */
  duration?: number
  /** Locale for thousands separators (default the visitor's). */
  locale?: string
}

export function NumberTicker({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
  locale,
  className,
  ...props
}: NumberTickerProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduce = useReducedMotion()
  const [shown, setShown] = React.useState(reduce ? value : 0)

  React.useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(v),
    })
    return () => controls.stop()
  }, [inView, value, duration, reduce])

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(shown)

  return (
    <span ref={ref} className={cn("tabular-nums", className)} {...props}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
