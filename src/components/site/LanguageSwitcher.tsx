import type { ComponentType } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { languageNames, type Lang } from '@/i18n/dictionary';

/**
 * National flags drawn inline as SVG so they stay crisp at any size and need no
 * external files. Both are 30×20 viewBoxes rendered at 22×15 with a rounded
 * corner and a hairline border applied by the wrapper in the switcher.
 */

/** Crnogorska zastava: red field, gold border, gold double-headed eagle. */
const MontenegroFlag = () => (
  <svg viewBox="0 0 30 20" width="22" height="15" className="block" aria-hidden="true" focusable="false">
    <rect width="30" height="20" fill="#C6363C" />
    <rect x="1" y="1" width="28" height="18" fill="none" stroke="#D4AF37" strokeWidth="1.6" />
    <g fill="#D4AF37">
      {/* left wing */}
      <path d="M13.7 8.7 L6.5 7.3 L8.0 9.0 L6.3 9.5 L8.2 10.7 L11.6 11.3 Z" />
      {/* right wing */}
      <path d="M16.3 8.7 L23.5 7.3 L22.0 9.0 L23.7 9.5 L21.8 10.7 L18.4 11.3 Z" />
      {/* body and tail */}
      <path d="M13.5 8.3 C13.5 11.6 13.9 13.4 14.5 14.4 L15 13.1 L15.5 14.4 C16.1 13.4 16.5 11.6 16.5 8.3 Z" />
      {/* left head, beak and crown */}
      <path d="M14.1 8.8 L13.1 6.9 L12.3 6.1 L11.4 6.0 L10.6 5.3 L10.9 6.3 L10.2 6.4 L11.4 7.3 C12.1 7.5 12.8 8.1 13.2 8.9 Z" />
      <path d="M12.2 6.2 L12.7 5.0 L13.1 5.9 L13.7 5.1 L13.8 6.2 L14.4 5.5 L14.3 6.8 L13.4 6.8 L12.4 7.0 Z" />
      {/* right head, beak and crown (mirrored) */}
      <path d="M15.9 8.8 L16.9 6.9 L17.7 6.1 L18.6 6.0 L19.4 5.3 L19.1 6.3 L19.8 6.4 L18.6 7.3 C17.9 7.5 17.2 8.1 16.8 8.9 Z" />
      <path d="M17.8 6.2 L17.3 5.0 L16.9 5.9 L16.3 5.1 L16.2 6.2 L15.6 5.5 L15.7 6.8 L16.6 6.8 L17.6 7.0 Z" />
    </g>
  </svg>
);

/** Stars and stripes: 13 stripes, a navy canton and 50 stars. */
const STRIPES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const CANTON_WIDTH = 12;
const CANTON_HEIGHT = (20 * 7) / 13;
const STARS = (() => {
  const stars: { x: number; y: number }[] = [];
  for (let row = 0; row < 9; row += 1) {
    const count = row % 2 === 0 ? 6 : 5;
    for (let col = 0; col < count; col += 1) {
      const offset = row % 2 === 0 ? 0.5 : 1;
      stars.push({
        x: (col + offset) * (CANTON_WIDTH / 6),
        y: (row + 1) * (CANTON_HEIGHT / 10),
      });
    }
  }
  return stars;
})();

const UsFlag = () => (
  <svg viewBox="0 0 30 20" width="22" height="15" className="block" aria-hidden="true" focusable="false">
    <rect width="30" height="20" fill="#FFFFFF" />
    {STRIPES.filter((index) => index % 2 === 0).map((index) => (
      <rect key={index} y={index * (20 / 13)} width="30" height={20 / 13} fill="#B22234" />
    ))}
    <rect width={CANTON_WIDTH} height={CANTON_HEIGHT} fill="#3C3B6E" />
    {STARS.map((star, index) => (
      <circle key={index} cx={star.x} cy={star.y} r="0.45" fill="#FFFFFF" />
    ))}
  </svg>
);

const OPTIONS: { lang: Lang; Flag: ComponentType }[] = [
  { lang: 'sr', Flag: MontenegroFlag },
  { lang: 'en', Flag: UsFlag },
];

/**
 * Two flags side by side on the right of the header. Clicking one translates the
 * whole page instantly — no reload — and the choice is remembered for next time.
 * `solid` mirrors the header's own state so the chips stay legible over the hero.
 */
const LanguageSwitcher = ({ solid = true }: { solid?: boolean }) => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className="flex items-center gap-1.5"
      role="group"
      aria-label={t.languageLabel}
      data-i18n-group="language"
    >
      {OPTIONS.map(({ lang: value, Flag }) => {
        const active = lang === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setLang(value)}
            aria-label={languageNames[value]}
            aria-pressed={active}
            title={languageNames[value]}
            className={[
              'grid h-10 w-[38px] place-items-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8F8C] focus-visible:ring-offset-2',
              solid
                ? 'border-border bg-white hover:border-[#0E8F8C]'
                : 'border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20',
              active
                ? 'ring-2 ring-[#0E8F8C] ring-offset-0'
                : 'opacity-60 hover:opacity-100',
            ].join(' ')}
          >
            <span
              className={[
                'overflow-hidden rounded-[3px] border',
                solid ? 'border-[#D8DEE3]' : 'border-white/60',
              ].join(' ')}
            >
              <Flag />
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
