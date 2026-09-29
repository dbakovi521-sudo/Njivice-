import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * SpotlightCard — a card whose border and surface light up under the
 * pointer, like a torch moving across it. Use for feature cards, pricing
 * tiers, team members. Works as a plain card without a pointer (touch).
 *
 *   <SpotlightCard className="p-8">
 *     <Wrench className="h-6 w-6 text-primary" />
 *     <h3 className="mt-4 text-lg font-semibold">Tuned in-store</h3>
 *     <p className="mt-2 text-sm text-muted-foreground">...</p>
 *   </SpotlightCard>
 */
export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Radius of the highlight in pixels. */
  radius?: number
  /** CSS color of the highlight; defaults to the theme primary. */
  color?: string
}

export function SpotlightCard({
  children,
  className,
  radius = 320,
  color = "hsl(var(--primary) / 0.22)",
  ...props
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [pos, setPos] = React.useState({ x: -9999, y: -9999, on: false })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, on: true })
  }
  const onLeave = () => setPos((p) => ({ ...p, on: false }))

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-colors duration-300 hover:border-primary/40",
        className
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: pos.on ? 1 : 0,
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 60%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
