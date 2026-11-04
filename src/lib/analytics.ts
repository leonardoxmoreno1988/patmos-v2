import { SITE_URL } from "@/lib/seo";

const UMAMI_SRC = "https://cloud.umami.is/script.js";
const UMAMI_WEBSITE_ID = "bdfd0465-45a8-47d8-8cc0-076ed1c98361";
// Umami reads this same key, so setting it also stops its built-in click tracking.
const DISABLED_KEY = "umami.disabled";
const PRODUCTION_HOST = new URL(SITE_URL).hostname;

type UmamiTracker = { track: (event: string, data?: Record<string, unknown>) => void };

const readDisabled = (): boolean => {
  try {
    return localStorage.getItem(DISABLED_KEY) === "1";
  } catch {
    return false;
  }
};

const writeDisabled = (disabled: boolean) => {
  try {
    if (disabled) localStorage.setItem(DISABLED_KEY, "1");
    else localStorage.removeItem(DISABLED_KEY);
  } catch {
    // Storage can be blocked (private mode, strict settings); tracking then stays on for this visit.
  }
};

/**
 * `?umami=off` opts this browser out of analytics, `?umami=on` opts back in. Runs on any page;
 * the flag is stored in localStorage so it persists across visits.
 */
export function applyUmamiQueryOverride(): void {
  const value = new URLSearchParams(window.location.search).get("umami");
  if (value === "off") {
    writeDisabled(true);
    console.info("[analytics] Umami desactivado en este navegador (?umami=on para reactivar).");
  } else if (value === "on") {
    writeDisabled(false);
    console.info("[analytics] Umami reactivado en este navegador.");
  }
}

/** True only on the production build served from the production host, and when not opted out. */
export function umamiAllowed(): boolean {
  return import.meta.env.PROD && window.location.hostname === PRODUCTION_HOST && !readDisabled();
}

export const umamiScriptAttributes = {
  src: UMAMI_SRC,
  "data-website-id": UMAMI_WEBSITE_ID,
  "data-domains": PRODUCTION_HOST,
  "data-do-not-track": "true",
} as const;

/** Sends a custom event if Umami is loaded and this browser hasn't opted out. */
export function trackUmamiEvent(event: string, data?: Record<string, unknown>): void {
  if (!umamiAllowed()) return;
  const umami = (window as typeof window & { umami?: UmamiTracker }).umami;
  umami?.track(event, data);
}
