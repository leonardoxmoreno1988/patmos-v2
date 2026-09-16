export const SITE_URL = "https://rvnotas.app";
export const SITE_NAME = "RV + Notas";

export interface SeoInput {
 title: string;
 description: string;
 /** Absolute or site-relative canonical path, e.g. "/leer/job/3" */
 canonical?: string;
 /** Absolute https URL; omitted unless a share-sized image exists */
 ogImage?: string;
 ogType?: "website" | "article";
 /** Set true for utility pages that shouldn't be indexed */
 noindex?: boolean;
}

type MetaTag =
 | { title: string }
 | { name: string; content: string }
 | { property: string; content: string };

/**
 * Reusable head() builder: title, description, canonical, Open Graph and
 * Twitter Card tags. Returns the exact shape TanStack Start's head() expects,
 * so routes just do: `head: () => seoHead({ ... })`.
 */
export function seoHead({
 title,
 description,
 canonical,
 ogImage,
 ogType = "website",
 noindex = false,
}: SeoInput): { meta: MetaTag[]; links: { rel: string; href: string }[] } {
 const url = canonical
  ? canonical.startsWith("http")
   ? canonical
   : `${SITE_URL}${canonical}`
  : undefined;

 const meta: MetaTag[] = [
  { title },
  { name: "description", content: description },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:type", content: ogType },
  { property: "og:site_name", content: SITE_NAME },
  { name: "twitter:card", content: "summary_large_image" },
 ];

 if (url) {
  meta.push({ property: "og:url", content: url });
 }
 if (ogImage) {
  meta.push({ property: "og:image", content: ogImage });
  meta.push({ name: "twitter:image", content: ogImage });
 }
 if (noindex) {
  meta.push({ name: "robots", content: "noindex" });
 }

 return {
  meta,
  links: url ? [{ rel: "canonical", href: url }] : [],
 };
}

/** Strips HTML tags and collapses whitespace, for meta descriptions. */
export function plainText(html: string): string {
 return html
  .replace(/<[^>]*>/g, " ")
  .replace(/\s+/g, " ")
  .trim();
}

/** First `max` characters of plain text, cut on a word boundary. */
export function excerpt(text: string, max = 150): string {
 if (text.length <= max) return text;
 const cut = text.slice(0, max);
 return cut.slice(0, Math.max(cut.lastIndexOf(" "), 0)).trimEnd() + "…";
}
