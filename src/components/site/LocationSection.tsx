import { MapPin } from 'lucide-react';
import { Reveal } from '@/components/kit';
import { useLanguage } from '@/i18n/LanguageProvider';
import { images, site } from '@/data/site';

/**
 * Location. The panel on the left is a STYLISED ILLUSTRATION, not an embedded
 * map: an abstract coastal schematic with a pin marker, so a real map can be
 * dropped into the same slot later. No address, coordinates or distances are
 * published anywhere in this section.
 */
const LocationSection = () => {
  const { t } = useLanguage();

  return (
    <section id="location" className="scroll-mt-24 bg-[#FBFAF7] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0E8F8C]">
            {t.location.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-[#13212C] sm:text-4xl lg:text-[2.75rem]">
            {t.location.heading}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5C6B76] sm:text-lg">
            {t.location.body}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {t.location.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-border bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#5C6B76]"
              >
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <figure className="overflow-hidden rounded-[20px] border border-border bg-white shadow-[0_2px_18px_rgba(19,33,44,0.05)]">
              <div className="relative aspect-[16/11] w-full">
                <svg
                  viewBox="0 0 640 440"
                  className="h-full w-full"
                  role="img"
                  aria-label={t.location.mapAria}
                  preserveAspectRatio="xMidYMid slice"
                >
                  <rect width="640" height="440" fill="#EFF5F3" />

                  {/* land shading */}
                  <path d="M0 0 H640 V64 C520 96 420 74 300 40 C200 12 90 26 0 58 Z" fill="#E4EEE6" />
                  <path d="M0 96 C120 128 190 108 268 84 C356 58 470 76 640 40 V0 H0 Z" fill="#EDF3EA" opacity="0.75" />

                  {/* water */}
                  <path
                    d="M0 286 C110 262 196 300 268 344 C342 390 452 414 640 400 V440 H0 Z"
                    fill="#CDE7E7"
                  />
                  <path
                    d="M0 318 C116 300 206 336 282 372 C360 408 470 428 640 416 V440 H0 Z"
                    fill="#BCDFDF"
                    opacity="0.65"
                  />

                  {/* headland jutting into the water */}
                  <path
                    d="M120 296 C146 336 196 356 246 348 C286 341 306 316 314 288 C286 306 244 316 200 314 C166 312 140 306 120 296 Z"
                    fill="#F4F1E9"
                    stroke="#E1DACB"
                    strokeWidth="2"
                  />

                  {/* island */}
                  <ellipse cx="472" cy="342" rx="40" ry="22" fill="#F4F1E9" stroke="#E1DACB" strokeWidth="2" />
                  <ellipse cx="472" cy="342" rx="24" ry="11" fill="#E8EFE3" />

                  {/* town cluster */}
                  <g fill="#E7E2D6" stroke="#DCD4C2" strokeWidth="1.5">
                    <rect x="352" y="196" width="20" height="16" rx="3" />
                    <rect x="378" y="184" width="24" height="18" rx="3" />
                    <rect x="408" y="200" width="18" height="14" rx="3" />
                    <rect x="368" y="222" width="22" height="16" rx="3" />
                    <rect x="398" y="228" width="26" height="16" rx="3" />
                    <rect x="432" y="212" width="18" height="16" rx="3" />
                  </g>

                  {/* streets */}
                  <g fill="none" stroke="#FFFFFF" strokeLinecap="round">
                    <path d="M40 168 C160 148 268 176 372 196 C452 212 528 206 620 186" strokeWidth="9" />
                    <path d="M96 60 C140 118 176 156 232 190 C296 228 336 274 356 322" strokeWidth="7" />
                    <path d="M300 44 C324 96 336 140 344 186" strokeWidth="6" />
                    <path d="M470 104 C486 152 496 210 500 262" strokeWidth="6" />
                    <path d="M556 70 C572 132 570 200 552 254" strokeWidth="5" />
                  </g>

                  {/* dashed route to the pin */}
                  <path
                    d="M96 168 C170 176 232 208 302 246"
                    fill="none"
                    stroke="#0E8F8C"
                    strokeWidth="2.5"
                    strokeDasharray="7 8"
                    opacity="0.65"
                  />

                  {/* pin marker */}
                  <g transform="translate(302 246)">
                    <circle cx="0" cy="0" r="30" fill="#0E8F8C" opacity="0.14" />
                    <circle cx="0" cy="0" r="14" fill="#0E8F8C" />
                    <circle cx="0" cy="0" r="5.5" fill="#FFFFFF" />
                  </g>
                </svg>

                <div className="pointer-events-none absolute left-[47%] top-[56%] -translate-y-[calc(100%+14px)] -translate-x-1/2">
                  <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#13212C] px-3 py-1.5 text-[12px] font-semibold text-white shadow-md">
                    <MapPin className="h-3.5 w-3.5 text-[#7FD6D4]" />
                    {site.name}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/70 to-transparent" />
              </div>

              <figcaption className="border-t border-border px-5 py-4 text-[13px] leading-relaxed text-[#5C6B76]">
                {t.location.caption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-2">
            <figure className="h-full overflow-hidden rounded-[20px] border border-border bg-white shadow-[0_2px_18px_rgba(19,33,44,0.05)]">
              <img
                src={images.locationPanel}
                alt={t.location.panelAlt}
                loading="lazy"
                className="h-full min-h-[280px] w-full object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
