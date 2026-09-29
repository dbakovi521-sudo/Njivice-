import { Maximize2 } from 'lucide-react';
import { Reveal } from '@/components/kit';
import { useLightbox, type LightboxImage } from '@/components/site/Lightbox';
import { useLanguage } from '@/i18n/LanguageProvider';
import { images } from '@/data/site';

/** A short strip of photos. Caption is explicit that these are temporary. */
const GalleryStrip = () => {
  const { t } = useLanguage();
  const { openAt, lightbox } = useLightbox();

  const galleryPhotos: LightboxImage[] = images.gallery.map((src, index) => ({
    src,
    alt: t.gallery.photoAlt(index + 1),
    caption: t.gallery.caption,
  }));

  return (
    <section id="gallery" className="scroll-mt-24 bg-[#E6F4F3] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0E8F8C]">
            {t.gallery.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#13212C] sm:text-3xl">
            {t.gallery.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {galleryPhotos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => openAt(galleryPhotos, index, 'gallery')}
                aria-label={t.gallery.openPhoto(index + 1)}
                className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_1px_14px_rgba(19,33,44,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8F8C] focus-visible:ring-offset-2"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#13212C] shadow-sm transition duration-300 group-hover:scale-105 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-4 text-[13px] leading-relaxed text-[#5C6B76]">
            {t.gallery.note} {t.gallery.tapHint}
          </p>
        </Reveal>
      </div>

      {lightbox}
    </section>
  );
};

export default GalleryStrip;
