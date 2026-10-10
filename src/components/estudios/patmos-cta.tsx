import { Link } from "@tanstack/react-router";
import { BookOpen, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PatmosCtaProps {
  title: string;
  description: string;
  /** Also offer the AI assistant (Consulta Patmos), which opens on the home page. */
  showAssistant?: boolean;
}

/** Quiet banner pointing readers of the studies to the Bible reader (and optionally the assistant). */
export function PatmosCta({ title, description, showAssistant = false }: PatmosCtaProps) {
  return (
    <aside className="rounded-xl border border-border bg-muted/40 px-5 py-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-7">
      <div className="min-w-0">
        <p className="text-base font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4 flex shrink-0 flex-wrap gap-2 sm:mt-0">
        <Button
          asChild
          size="sm"
          className="rounded-full px-4 dark:bg-white dark:text-slate-900 hover:dark:bg-slate-100"
        >
          <Link to="/leer/$libro/$cap" params={{ libro: "genesis", cap: "1" }}>
            <BookOpen /> Lector Bíblico
          </Link>
        </Button>
        {showAssistant ? (
          <Button asChild size="sm" variant="outline" className="rounded-full px-4">
            <Link to="/" search={{ consulta: "chat" }}>
              <MessageSquare /> Consultar Patmos
            </Link>
          </Button>
        ) : null}
      </div>
    </aside>
  );
}
