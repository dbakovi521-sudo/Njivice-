import { ArrowRight, Maximize2 } from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from '@/components/kit';
import { useLightbox, type LightboxImage } from '@/components/site/Lightbox';
import { useLanguage } from '@/i18n/LanguageProvider';
import { announceApartmentSelection, apartments } from '@/data/site';

/**
 * The core section: four apartment cards, each with a photo, capacity, a short
 * description and the starting rate. Every card's button scrolls to the inquiry
 * form and tells it which apartment the visitor was looking at, and every photo
 * opens full screen in the lightbox.
 */
const Apartments = () => {
  const { t } = useLanguage();
  const { openAt, lightbox } = useLightbox();

  /** Every apartment photo, so the lightbox can step from one to the next. */
  const apartmentPhotos: LightboxImage[] = apartments.map((apartment) => ({
    src: apartment.image,
    alt: t.apartments[apartment.id].alt,
    caption: t.apartments[apartment.id].name,
  }));

  return (
    <section id="apartments" className="scroll-mt-24 bg-[#FBFAF7] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0E8F8C]">
            {t.apartmentsSection.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-[#13212C] sm:text-4xl lg:text-[2.75rem]">
            {t.apartmentsSection.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5C6B76] sm:text-lg">
            {t.apartmentsSection.intro}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#E6F4F3] px-4 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0E8F8C]" aria-hidden="true" />
            <p className="text-[15px] font-medium text-[#13212C]">{t.apartmentsSection.rateLine}</p>
          </div>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-6 sm:gap-7 md:grid-cols-2" stagger={0.09}>
          {apartments.map((apartment, index) => {
            const copy = t.apartments[apartment.id];
            return (
              <RevealItem key={apartment.id} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-white shadow-[0_2px_18px_rgba(19,33,44,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(19,33,44,0.10)]">
                  <button
                    type="button"
                    onClick={() => openAt(apartmentPhotos, index, 'apartments')}
                    aria-label={t.apartmentsSection.openPhoto(copy.name)}
                    className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0E8F8C]"
                  >
                    <img
                      src={apartment.image}
                      alt={copy.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3.5 top-3.5 rounded-full bg-white/95 px-3 py-1 text-[12px] font-semibold text-[#13212C] shadow-sm backdrop-blur-sm">
                      {copy.capacity}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#13212C] shadow-sm transition duration-300 group-hover:scale-105 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-[#13212C]">
                      {copy.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[#5C6B76]">
                      {copy.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                      <p className="font-display text-base font-semibold text-[#13212C]">
                        <span className="font-body text-[13px] font-medium uppercase tracking-wide text-[#5C6B76]">
                          {t.apartmentsSection.pricePrefix}{' '}
                        </span>
                        70 EUR{' '}
                        <span className="text-[#5C6B76]">{t.apartmentsSection.priceNight}</span>
                      </p>
                      <a
                        href="#contact"
                        onClick={() => announceApartmentSelection(apartment.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#0E8F8C]/35 bg-[#E6F4F3] px-4 py-2 text-sm font-semibold text-[#0E8F8C] transition hover:bg-[#0E8F8C] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8F8C] focus-visible:ring-offset-2"
                      >
                        {t.apartmentsSection.cardCta}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.05}>
          <p className="mt-6 text-[13px] text-[#5C6B76]">{t.apartmentsSection.tapHint}</p>
        </Reveal>
      </div>

      {lightbox}
    </section>
  );
};

export default Apartments;
