import { useCallback, useEffect, useState } from "react";

const KEY = "cb-theme";

/**
 * Inline <head> script that applies the saved/OS theme before first paint, so dark-mode users don't
 * get a white flash before hydration. Mirrors the effect in useTheme.
 */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem(${JSON.stringify(KEY)});if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

/**
 * Light/dark theme, persisted in localStorage ("cb-theme") and falling back to the OS preference.
 * THEME_INIT_SCRIPT applies it before paint; state starts "light" on the server and the first client
 * render (so hydration matches) and syncs after mount. Instances don't share state, so mount one per
 * page (the header's account menu, or ThemeToggle on the landing page).
 */
export function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    const prefers =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(prefers);
    document.documentElement.classList.toggle("dark", prefers);
  }, []);

  const setTheme = useCallback((next: "light" | "dark") => {
    const isDark = next === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem(KEY, next);
  }, []);

  return { theme: dark ? ("dark" as const) : ("light" as const), setTheme };
}
