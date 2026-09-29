import { useLanguage } from '@/i18n/LanguageProvider';
import { navLinks, site } from '@/data/site';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#13212C] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0E8F8C] font-display text-lg font-semibold leading-none text-white">
                N
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">{site.name}</span>
            </div>
            <p className="mt-4 text-[15px] text-white/70">{t.footer.location}</p>
            <p className="mt-1.5 text-[15px] text-white/70">{t.footer.rateLine}</p>
          </div>

          <nav aria-label={t.navAria}>
            <h2 className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-white/60">
              {t.footer.sectionsHeading}
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[15px] text-white/80 transition-colors hover:text-[#7FD6D4]"
                  >
                    {t.nav[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-white/60">
              {t.footer.contactHeading}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/80">{t.footer.contactSoon}</p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center rounded-full bg-[#0E8F8C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B7B78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7FD6D4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#13212C]"
            >
              {t.footer.cta}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-[13px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.name} · {t.footer.location}
          </p>
          <p>{t.footer.note}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
