import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
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
    return isLang(stored) ? stored : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

// Language this tab is showing, for non-React code such as route loaders. Only the provider's
// effect writes it, so it stays DEFAULT_LANG on the server; unlike localStorage it is per tab.
let activeLang: Lang = DEFAULT_LANG;

/** The language currently shown in this tab (DEFAULT_LANG on the server). */
export const getActiveLang = (): Lang => activeLang;

/**
 * Server and first client render always use DEFAULT_LANG; the stored choice is applied after mount
 * so SSR HTML and hydration match.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    setLangState(getStoredLang());
  }, []);

  useEffect(() => {
    activeLang = lang;
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* choice still applies for this session */
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: DICTIONARIES[lang] }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
