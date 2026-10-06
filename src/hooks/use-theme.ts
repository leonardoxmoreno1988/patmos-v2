import { useCallback, useEffect, useState } from "react";

const KEY = "cb-theme";

/**
 * Light/dark theme, persisted in localStorage ("cb-theme") and falling back to the OS preference.
 * The mounting component applies the saved theme on load, so keep it in an always-rendered spot
 * (the header's account menu).
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
