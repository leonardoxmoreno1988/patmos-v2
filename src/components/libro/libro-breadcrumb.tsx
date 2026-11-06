import { Link } from "@tanstack/react-router";

/** Routes a breadcrumb can link to. The last item is the current page and has no `to`. */
export type LibroBreadcrumbTarget = "/dashboard" | "/libros" | "/libros/muchas-pero-solo-una";

export interface LibroBreadcrumbItem {
  label: string;
  to?: LibroBreadcrumbTarget;
}

const LINK_CLASS = "hover:text-foreground hover:underline underline-offset-2 transition-colors";

/** Shared breadcrumb for the /libros hierarchy: Inicio › Libros › … (last item is the current page). */
export function LibroBreadcrumb({ items }: { items: LibroBreadcrumbItem[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-8 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={item.label} className="inline-flex items-center gap-x-2">
            {index > 0 ? <span aria-hidden="true" className="opacity-60">›</span> : null}
            {item.to ? (
              <Link to={item.to} className={LINK_CLASS}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
