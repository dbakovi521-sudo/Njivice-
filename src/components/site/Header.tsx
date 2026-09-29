import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/site/LanguageSwitcher';
import { useLanguage } from '@/i18n/LanguageProvider';
import { navLinks, site } from '@/data/site';

/**
 * Sticky site header. Transparent over the hero photograph so the image stays
 * full-bleed, then settles onto a solid warm-white bar as soon as the visitor
 * scrolls. The inquiry button is present the whole way down, on desktop and
 * inside the mobile menu, and the language switcher sits beside it on the right.
 */
const Header = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid
          ? 'border-b border-border bg-[#FBFAF7]/95 shadow-[0_1px_24px_rgba(19,33,44,0.06)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 md:h-20 lg:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} — ${t.backToTop}`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0E8F8C] font-display text-lg font-semibold leading-none text-white shadow-sm">
            N
          </span>
          <span
            className={[
              'hidden font-display text-[17px] font-semibold tracking-tight transition-colors sm:inline sm:text-lg',
              solid ? 'text-[#13212C]' : 'text-white drop-shadow-sm',
            ].join(' ')}
          >
            {site.name}
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={t.navAria}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={[
                'text-[15px] font-medium transition-colors',
                solid
                  ? 'text-[#5C6B76] hover:text-[#0E8F8C]'
                  : 'text-white/85 hover:text-white',
              ].join(' ')}
            >
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center rounded-full bg-[#0E8F8C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B7B78] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8F8C] focus-visible:ring-offset-2 sm:inline-flex"
          >
            {t.headerCta}
          </a>
          <LanguageSwitcher solid={solid} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.menuClose : t.menuOpen}
            aria-expanded={open}
            className={[
              'grid h-10 w-10 place-items-center rounded-full border transition lg:hidden',
              solid
                ? 'border-border bg-white text-[#13212C] hover:border-[#0E8F8C]'
                : 'border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20',
            ].join(' ')}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-[#FBFAF7] px-4 pb-6 pt-3 sm:px-6 lg:hidden">
          <nav className="flex flex-col" aria-label={t.navAria}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-[#13212C] transition-colors hover:bg-[#E6F4F3] hover:text-[#0E8F8C]"
              >
                {t.nav[link.key]}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 flex w-full items-center justify-center rounded-full bg-[#0E8F8C] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#0B7B78]"
          >
            {t.headerCta}
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
