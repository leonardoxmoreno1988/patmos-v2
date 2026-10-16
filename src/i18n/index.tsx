import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useMatch, useNavigate } from "@tanstack/react-router";
import { es, type Dictionary } from "./es";
import { en } from "./en";

export type Lang = "es" | "en";

export const LANGS: readonly Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";
const KEY = "patmos:lang";
const DICTIONARIES: Record<Lang, Dictionary> = { es, en };

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
}

// Default value lets components rendered outside the provider (root error/404 boundaries) fall back to Spanish.
const I18nContext = createContext<I18nValue>({ lang: DEFAULT_LANG, setLang: () => {}, t: es });

function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

/** The saved language choice; DEFAULT_LANG on the server or when storage is unavailable. */
function getStoredLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem(KEY);
    if (isLang(stored)) return stored;

    // Detecta si el navegador del usuario está en inglés en su primera visita
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("en")) return "en";

    return DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

/** Route whose URL carries the language: Spanish at /leer/..., English at /en/leer/... */
export const READER_ROUTE = "/{-$locale}/leer/$libro/$cap";

/** The `locale` path param for a language (Spanish, the default, has no prefix). */
export const localeParam = (lang: Lang): "en" | undefined => (lang === "en" ? "en" : undefined);

/** The language a `locale` path param stands for. */
export const langFromLocale = (locale: string | undefined): Lang => (locale === "en" ? "en" : DEFAULT_LANG);

/** Language fixed by the current URL (the reader routes), or null on pages without a locale in the path. */
export function useUrlLang(): Lang | null {
  const match = useMatch({ from: READER_ROUTE, shouldThrow: false });
  return match ? langFromLocale(match.params.locale) : null;
}

/**
 * On reader routes the language comes from the URL, so the server renders /en/... in English and
 * switching languages navigates to the other URL. Elsewhere the stored choice applies, after mount
 * so SSR HTML and hydration match.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const readerMatch = useMatch({ from: READER_ROUTE, shouldThrow: false });
  const urlLang = readerMatch ? langFromLocale(readerMatch.params.locale) : null;
  const navigate = useNavigate();
  const [storedLang, setStoredLang] = useState<Lang>(DEFAULT_LANG);
  const lang = urlLang ?? storedLang;

  useEffect(() => {
    setStoredLang(getStoredLang());
  }, []);

  // Reading a chapter in a language makes it the choice for the rest of the site.
  useEffect(() => {
    if (!urlLang) return;
    setStoredLang(urlLang);
    try {
      window.localStorage.setItem(KEY, urlLang);
    } catch {
      /* ignore */
    }
  }, [urlLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const readerParams = readerMatch?.params;
  const setLang = useCallback(
    (next: Lang) => {
      setStoredLang(next);
      try {
        window.localStorage.setItem(KEY, next);
      } catch {
        /* choice still applies for this session */
      }
      if (readerParams && langFromLocale(readerParams.locale) !== next) {
        void navigate({
          to: READER_ROUTE,
          params: { ...readerParams, locale: localeParam(next) },
          hash: true,
        });
      }
    },
    [navigate, readerParams],
  );

  const value = useMemo(() => ({ lang, setLang, t: DICTIONARIES[lang] }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
