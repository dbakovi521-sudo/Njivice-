import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { dictionary, type Lang, type Strings } from '@/i18n/dictionary';

const STORAGE_KEY = 'nivice:lang';

/** Montenegrin (Latin script) is the default and is never auto-detected from
 *  the browser — the site always loads in Montenegrin unless the visitor has
 *  explicitly chosen English before. */
const DEFAULT_LANG: Lang = 'sr';

const HTML_LANG: Record<Lang, string> = { sr: 'sr-Latn', en: 'en' };

interface LanguageValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Strings;
}

const LanguageContext = createContext<LanguageValue | null>(null);

function readStoredLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'sr' ? stored : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  // Keep the document in step with the chosen language: <html lang>, the
  // <title>, and the visitor's preference for their next visit.
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    document.title = dictionary[lang].title;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable (private mode) — the choice simply is not remembered */
    }
  }, [lang]);

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, t: dictionary[lang] }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside a LanguageProvider');
  }
  return context;
}
