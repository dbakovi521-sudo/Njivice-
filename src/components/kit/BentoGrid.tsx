import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * BentoGrid — a dense, magazine-style grid of mixed-size tiles. Each
 * BentoCard picks how many columns/rows it spans; make one or two tiles
 * large (the hero of the grid) and keep the rest small. Six to eight
 * tiles read best. Put a real image or a real number in every tile.
 *
 *   <BentoGrid>
 *     <BentoCard span="lg" image={img} title="Built for the long ride" body="..." />
 *     <BentoCard title="Free assembly" body="On every bike." />
 *     <BentoCard span="tall" image={img2} />
 *   </BentoGrid>
 */
export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Columns at the desktop breakpoint (default 4). */
  columns?: 3 | 4 | 6
}

export function BentoGrid({ children, className, columns = 4, ...props }: BentoGridProps) {
  const cols =
    columns === 3 ? "lg:grid-cols-3" : columns === 6 ? "lg:grid-cols-6" : "lg:grid-cols-4"
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2",
        cols,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export type BentoSpan = "sm" | "wide" | "tall" | "lg"

const spanClass: Record<BentoSpan, string> = {
  sm: "",
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
  lg: "sm:col-span-2 sm:row-span-2",
}

export interface BentoCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  span?: BentoSpan
  /** Optional background image (fills the tile behind the text). */
  image?: string
  imageAlt?: string
  eyebrow?: string
  title?: React.ReactNode
  body?: React.ReactNode
  /** Small icon or stat placed top-left. */
  icon?: React.ReactNode
}

export function BentoCard({
  span = "sm",
  image,
  imageAlt = "",
  eyebrow,
  title,
  body,
  icon,
  className,
  children,
  ...props
}: BentoCardProps) {
  const hasImage = Boolean(image)
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg",
        spanClass[span],
        hasImage && "min-h-[260px] text-white",
        className
      )}
      {...props}
    >
      {hasImage && (
        <>
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        </>
      )}
      {icon && <div className={cn("relative mb-auto", hasImage ? "text-white" : "text-primary")}>{icon}</div>}
      <div className="relative">
        {eyebrow && (
          <p className={cn("mb-2 text-xs font-medium uppercase tracking-[0.18em]", hasImage ? "text-white/70" : "text-muted-foreground")}>
            {eyebrow}
          </p>
        )}
        {title && <h3 className="text-xl font-semibold leading-tight">{title}</h3>}
        {body && (
          <p className={cn("mt-2 text-sm leading-relaxed", hasImage ? "text-white/80" : "text-muted-foreground")}>
            {body}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}
