import { Search } from "lucide-react";

import { useI18n } from "@/i18n";

export function SearchTrigger({ onClick, onIntent }: { onClick: () => void; onIntent?: () => void }) {
	const { t } = useI18n();
	return (
		<>
			<button
				type="button"
				onClick={onClick}
				onPointerEnter={onIntent}
				onFocus={onIntent}
				aria-label={t.search.label}
				className="hidden sm:flex h-9 items-center gap-2 rounded-full border border-foreground/15 px-4 text-sm text-muted-foreground transition-colors hover:border-foreground/30 min-w-[180px]"
			>
				<Search className="h-4 w-4 shrink-0" />
				<span>{t.search.placeholder}</span>
			</button>
			<button
				type="button"
				onClick={onClick}
				onPointerEnter={onIntent}
				onFocus={onIntent}
				aria-label={t.search.label}
				className="grid sm:hidden h-10 w-10 shrink-0 place-items-center rounded-lg bg-transparent p-2 text-[#000f37] transition-colors hover:bg-accent/50 hover:text-foreground dark:text-white dark:hover:text-white/80"
			>
				<Search className="h-[18px] w-[18px]" />
			</button>
		</>
	);
}
