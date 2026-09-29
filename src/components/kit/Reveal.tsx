import * as React from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

/**
 * Reveal — fades and lifts its content into view the first time it scrolls
 * on screen. Wrap a section heading, a card, an image. Honors the visitor's
 * reduced-motion setting (renders static).
 *
 *   <Reveal><h2>Our story</h2></Reveal>
 *   <Reveal delay={0.15} y={32}>...</Reveal>
 */
interface KitBoxProps {
  children?: React.ReactNode
  className?: string
  id?: string
  style?: React.CSSProperties
}

export interface RevealProps extends KitBoxProps {
  /** Seconds to wait before the animation starts. */
  delay?: number
  /** Pixels the content travels upward while fading in. */
  y?: number
  /** Animation length in seconds. */
  duration?: number
  /** Re-animate every time it enters the viewport (default: once). */
  repeat?: boolean
}

export function Reveal({
  children,
  className,
  id,
  style,
  delay = 0,
  y = 24,
  duration = 0.6,
  repeat = false,
}: RevealProps) {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div className={className} id={id} style={style}>
        {children}
      </div>
    )
  }
  return (
    <motion.div
      className={className}
      id={id}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: !repeat, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const groupVariants: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * RevealGroup — staggers its direct children into view one after another.
 * Use for card grids, feature lists, pricing tiers. Children must be
 * RevealItem (or carry the item variants themselves).
 *
 *   <RevealGroup className="grid gap-6 md:grid-cols-3">
 *     {items.map((it) => <RevealItem key={it.id}>...</RevealItem>)}
 *   </RevealGroup>
 */
export interface RevealGroupProps extends KitBoxProps {
  /** Seconds between each child. */
  stagger?: number
}

export function RevealGroup({ children, className, id, style, stagger = 0.08 }: RevealGroupProps) {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div className={className} id={id} style={style}>
        {children}
      </div>
    )
  }
  return (
    <motion.div
      className={className}
      id={id}
      style={style}
      variants={groupVariants}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className, id, style }: KitBoxProps) {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div className={className} id={id} style={style}>
        {children}
      </div>
    )
  }
  return (
    <motion.div className={className} id={id} style={style} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
