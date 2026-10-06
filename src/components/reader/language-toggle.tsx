import { LANGS, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.language.toggleLabel}
      className="flex h-10 shrink-0 items-center gap-0.5 px-1 text-xs font-semibold text-[#000f37] dark:text-white"
    >
      {LANGS.map((code, i) => (
        <span key={code} className="flex items-center gap-0.5">
          {i > 0 ? <span aria-hidden className="opacity-30">|</span> : null}
          <button
            type="button"
            lang={code}
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
            className={cn(
              "rounded px-1.5 py-1 uppercase transition-opacity hover:opacity-100",
              lang === code ? "opacity-100" : "opacity-45",
            )}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
