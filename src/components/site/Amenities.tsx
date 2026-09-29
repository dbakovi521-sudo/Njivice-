import {
  BedDouble,
  Car,
  type LucideIcon,
  Shirt,
  Snowflake,
  Sun,
  Tv,
  Umbrella,
  Utensils,
  Waves,
  Wifi,
} from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from '@/components/kit';
import { useLanguage } from '@/i18n/LanguageProvider';
import { amenityKeys } from '@/data/site';

const ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  ac: Snowflake,
  kitchen: Utensils,
  balcony: Sun,
  parking: Car,
  tv: Tv,
  laundry: Shirt,
  linen: BedDouble,
  sea: Waves,
  beach: Umbrella,
};

/** What guests can expect, as a tidy icon grid — two across on phones, five on desktop. */
const Amenities = () => {
  const { t } = useLanguage();

  return (
    <section id="amenities" className="scroll-mt-24 bg-[#E6F4F3] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0E8F8C]">
            {t.amenities.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-[#13212C] sm:text-4xl">
            {t.amenities.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5C6B76]">
            {t.amenities.intro}
          </p>
        </Reveal>

        <RevealGroup
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5"
          stagger={0.05}
        >
          {amenityKeys.map((key) => {
            const Icon = ICONS[key] ?? Wifi;
            const label = t.amenities.items[key];
            return (
              <RevealItem key={key} className="h-full">
                <div className="flex h-full flex-col items-start gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_1px_14px_rgba(19,33,44,0.04)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_28px_rgba(19,33,44,0.08)] sm:p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#E6F4F3] text-[#0E8F8C]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-[15px] font-medium leading-snug text-[#13212C]">{label}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
};

export default Amenities;
