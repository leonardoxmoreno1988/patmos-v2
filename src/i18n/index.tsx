import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useMatch, useNavigate } from "@tanstack/react-router";
import { es, type Dictionary } from "./es";
import { en } from "./en";
import { readerPathForSlug } from "@/lib/bible-slugs";

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

/** The reader routes: the language is part of the path (/leer/... Spanish, /en/read/... English). */
export const READER_ROUTES = { es: "/leer/$libro/$cap", en: "/en/read/$libro/$cap" } as const;

/** The reader page the URL is on (its language, book slug, and chapter), or null on other pages. */
export function useReaderMatch(): { lang: Lang; libro: string; cap: string } | null {
  const es = useMatch({ from: READER_ROUTES.es, shouldThrow: false });
  const en = useMatch({ from: READER_ROUTES.en, shouldThrow: false });
  const lang: Lang | null = en ? "en" : es ? "es" : null;
  const params = en?.params ?? es?.params;
  const libro = params?.libro;
  const cap = params?.cap;
  return useMemo(
    () => (lang && libro !== undefined && cap !== undefined ? { lang, libro, cap } : null),
    [lang, libro, cap],
  );
}

/** Language fixed by the current URL (the reader routes), or null on pages without one. */
export function useUrlLang(): Lang | null {
  return useReaderMatch()?.lang ?? null;
}

/**
 * Language resolution, highest priority first:
 * 1. The URL on reader routes (/leer/... is Spanish, /en/read/... English). It is never overridden
 *    and never redirected, so shared links open in their own language and the server renders them
 *    in it.
 * 2. Elsewhere, the language of the reader page this tab came from, so leaving /en/read/... for the
 *    dashboard stays in English.
 * 3. The choice saved by a language switcher.
 * 4. The browser/OS language (first visit).
 * 2-4 need `window`, so they apply after mount: the server and the hydration render both use
 * DEFAULT_LANG on pages without a URL language, keeping hydration identical to the cached HTML.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const reader = useReaderMatch();
  const urlLang = reader?.lang ?? null;
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

  const setLang = useCallback(
    (next: Lang) => {
      setSessionLang(next);
      try {
        window.localStorage.setItem(KEY, next);
      } catch {
        /* choice still applies for this session */
      }
      // Same book and chapter in the other language; the current verse anchor carries over.
      if (reader && reader.lang !== next) {
        void navigate({ href: readerPathForSlug(next, reader.libro, Number(reader.cap)) + window.location.hash });
      }
    },
    [navigate, reader],
  );

  const value = useMemo(() => ({ lang, setLang, t: DICTIONARIES[lang] }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
