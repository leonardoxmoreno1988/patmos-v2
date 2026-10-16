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

/** The language the user picked in a switcher, if they ever did. */
function getSavedLang(): Lang | null {
  try {
    const saved = window.localStorage.getItem(KEY);
    return isLang(saved) ? saved : null;
  } catch {
    return null;
  }
}

/** English when the browser/OS's preferred language is English (en-US, en-GB...), else Spanish. */
function getBrowserLang(): Lang {
  const preferred = navigator.languages?.[0] ?? navigator.language ?? "";
  return preferred.toLowerCase().startsWith("en") ? "en" : DEFAULT_LANG;
}

/** Explicit choice first, then the browser language on a first visit. Client-only. */
const getPreferredLang = (): Lang => getSavedLang() ?? getBrowserLang();

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
 * Language resolution, highest priority first:
 * 1. The URL on reader routes (/leer/... is Spanish, /en/leer/... English). It is never overridden
 *    and never redirected, so shared links open in their own language and the server renders them
 *    in it.
 * 2. Elsewhere, the language of the reader page this tab came from, so leaving /en/leer/... for the
 *    dashboard stays in English.
 * 3. The choice saved by a language switcher.
 * 4. The browser/OS language (first visit).
 * 2-4 need `window`, so they apply after mount: the server and the hydration render both use
 * DEFAULT_LANG on pages without a URL language, keeping hydration identical to the cached HTML.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const readerMatch = useMatch({ from: READER_ROUTE, shouldThrow: false });
  const urlLang = readerMatch ? langFromLocale(readerMatch.params.locale) : null;
  const navigate = useNavigate();
  // null until mounted. Visiting a reader URL updates it for this tab but doesn't save it: only an
  // explicit switch does, so opening a shared Spanish link doesn't replace an English OS default.
  const [sessionLang, setSessionLang] = useState<Lang | null>(null);
  const lang = urlLang ?? sessionLang ?? DEFAULT_LANG;

  useEffect(() => {
    setSessionLang((current) => urlLang ?? current ?? getPreferredLang());
  }, [urlLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const readerParams = readerMatch?.params;
  const setLang = useCallback(
    (next: Lang) => {
      setSessionLang(next);
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
