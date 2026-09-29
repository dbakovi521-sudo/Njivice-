import { LanguageProvider, useLanguage } from '@/i18n/LanguageProvider';
import { Reveal } from '@/components/kit';
import Header from '@/components/site/Header';
import Hero from '@/components/site/Hero';
import Apartments from '@/components/site/Apartments';
import Amenities from '@/components/site/Amenities';
import LocationSection from '@/components/site/LocationSection';
import GalleryStrip from '@/components/site/GalleryStrip';
import InquiryForm from '@/components/site/InquiryForm';
import Footer from '@/components/site/Footer';

/**
 * Nivice Apartmani — one continuous page, anchor-navigated.
 * Sections: hero → intro → apartments → amenities → location → gallery → inquiry → footer.
 * The LanguageProvider wraps everything so the header's switcher can translate
 * the whole page at once.
 */
const Intro = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#FBFAF7] pt-20 sm:pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-6 border-b border-border pb-14 lg:grid-cols-12 lg:gap-12 lg:pb-16">
            <div className="lg:col-span-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0E8F8C]">
                {t.intro.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-[#13212C] sm:text-4xl">
                {t.intro.heading}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base leading-relaxed text-[#5C6B76] sm:text-lg">{t.intro.body}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Page = () => (
  <div className="min-h-screen bg-[#FBFAF7] font-body text-[#13212C]">
    <Header />
    <main>
      <Hero />
      <Intro />
      <Apartments />
      <Amenities />
      <LocationSection />
      <GalleryStrip />
      <InquiryForm />
    </main>
    <Footer />
  </div>
);

const AppLayout = () => (
  <LanguageProvider>
    <Page />
  </LanguageProvider>
);

export default AppLayout;
