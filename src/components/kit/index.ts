// Design kit: high-polish building blocks a site composes rather than
// hand-writes. Each component documents its own use in its file header.
//
//   import { Reveal, RevealGroup, RevealItem, Marquee, BentoGrid, BentoCard,
//            SpotlightCard, NumberTicker, GradientText, StickyScrollStory,
//            ParallaxImage } from "@/components/kit"
export { Reveal, RevealGroup, RevealItem } from "./Reveal"
export type { RevealProps, RevealGroupProps } from "./Reveal"
export { Marquee } from "./Marquee"
export type { MarqueeProps } from "./Marquee"
export { BentoGrid, BentoCard } from "./BentoGrid"
export type { BentoGridProps, BentoCardProps, BentoSpan } from "./BentoGrid"
export { SpotlightCard } from "./SpotlightCard"
export type { SpotlightCardProps } from "./SpotlightCard"
export { NumberTicker } from "./NumberTicker"
export type { NumberTickerProps } from "./NumberTicker"
export { GradientText } from "./GradientText"
export type { GradientTextProps } from "./GradientText"
export { StickyScrollStory } from "./StickyScrollStory"
export type { StickyScrollStoryProps, StoryStep } from "./StickyScrollStory"
export { ParallaxImage } from "./ParallaxImage"
export type { ParallaxImageProps } from "./ParallaxImage"
