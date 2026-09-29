import { ArrowRight, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { images } from '@/data/site';

/**
 * Full-bleed hero: the bay photograph carries the emotion, the type stays
 * short and left-aligned over a soft dark scrim, with one teal call to action.
 */
const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
      <img
        src={images.hero}
        alt={t.hero.alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1A24]/85 via-[#0B1A24]/55 to-[#0B1A24]/25" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B1A24]/70 to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-32 sm:px-6 md:pb-28 md:pt-40 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white backdrop-blur-sm">
          <MapPin className="h-3.5 w-3.5 text-[#7FD6D4]" />
          {t.hero.region}
        </span>

        <h1 className="mt-6 max-w-3xl font-display text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
          {t.hero.headline}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          {t.hero.subtitle}
        </p>

        <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="#contact"
            onClick={() => {
              (window as any).supercool?.track?.('cta_click', { cta: 'hero_send_inquiry' });
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[#0E8F8C] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0B1A24]/25 transition hover:-translate-y-0.5 hover:bg-[#0B7B78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1A24]"
          >
            {t.hero.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#apartments"
            className="group inline-flex items-center gap-1.5 text-base font-medium text-white/90 underline decoration-white/40 decoration-1 underline-offset-[6px] transition hover:text-white hover:decoration-white"
          >
            {t.hero.secondary}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <dl className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-white/85 sm:mt-16">
          <div className="flex items-baseline gap-2">
            <dt className="text-sm text-white/65">{t.hero.statApartments}</dt>
            <dd className="font-display text-lg font-semibold text-white">4</dd>
          </div>
          <div className="flex items-baseline gap-2">
            <dt className="text-sm text-white/65">{t.hero.statPrice}</dt>
            <dd className="font-display text-lg font-semibold text-white">{t.hero.priceLabel}</dd>
          </div>
          <div className="flex items-baseline gap-2">
            <dt className="text-sm text-white/65">{t.hero.statSurroundings}</dt>
            <dd className="font-display text-lg font-semibold text-white">
              {t.hero.statSurroundingsValue}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Hero;
