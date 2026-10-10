export const SITE_URL = "https://www.patmosresearch.com";
export const SITE_NAME = "Patmos Research";
/** 1200×630 share card (public/og-image.png); used when a route doesn't pass its own image. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const SITE_LOGO = `${SITE_URL}/logo-patmos.svg`;
/** Search engines only ever see the Spanish render: the language lives in localStorage, not the URL. */
const OG_LOCALE = "es_ES";

/** Plain JSON-LD object (schema.org); serialized into a <script type="application/ld+json">. */
export type JsonLd = Record<string, unknown>;

export interface SeoInput {
 title: string;
 description: string;
 /** Absolute or site-relative canonical path, e.g. "/leer/job/3" */
 canonical?: string;
 /** Absolute https URL of a share-sized image; defaults to DEFAULT_OG_IMAGE */
 ogImage?: string;
 ogType?: "website" | "article";
 /** Set true for utility pages that shouldn't be indexed */
 noindex?: boolean;
 /** Structured data for this page */
 jsonLd?: JsonLd | JsonLd[];
}

type MetaTag =
 | { title: string }
 | { name: string; content: string }
 | { property: string; content: string };

type LinkTag = { rel: string; href: string; hrefLang?: string };
type ScriptTag = { type: string; children: string };

/** "Buscar" -> "Buscar | Patmos Research"; titles that already name the brand are left alone. */
export function brandTitle(title: string): string {
 return /patmos/i.test(title) ? title : `${title} | ${SITE_NAME}`;
}

/** JSON for an inline <script>: escapes "<" so note text can't close the tag early. */
function jsonLdScript(data: JsonLd): ScriptTag {
 return {
  type: "application/ld+json",
  children: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c"),
 };
}

/** Site-wide publisher, shared by the homepage and article schemas. */
export const ORGANIZATION: JsonLd = {
 "@type": "Organization",
 "@id": `${SITE_URL}/#organization`,
 name: SITE_NAME,
 url: SITE_URL,
 logo: SITE_LOGO,
};

/**
 * Reusable head() builder: title, description, canonical + hreflang, Open Graph,
 * Twitter Card tags and JSON-LD. Returns the exact shape TanStack Start's head()
 * expects, so routes just do: `head: () => seoHead({ ... })`.
 */
export function seoHead({
 title,
 description,
 canonical,
 ogImage = DEFAULT_OG_IMAGE,
 ogType = "website",
 noindex = false,
 jsonLd,
}: SeoInput): { meta: MetaTag[]; links: LinkTag[]; scripts: ScriptTag[] } {
 title = brandTitle(title);
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
  { property: "og:locale", content: OG_LOCALE },
  { property: "og:image", content: ogImage },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: title },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: title },
  { name: "twitter:description", content: description },
  { name: "twitter:image", content: ogImage },
 ];

 if (url) {
  meta.push({ property: "og:url", content: url });
 }
 if (noindex) {
  // "follow" keeps link equity flowing from noindexed pages (e.g. search results) to the pages they link.
  meta.push({ name: "robots", content: "noindex, follow" });
 }

 // Each page has one URL serving Spanish to crawlers, so hreflang is self-referencing (es + x-default).
 // An "en" alternate needs its own URL (e.g. /en/... or ?lang=en rendered in English on the server).
 const links: LinkTag[] = url
  ? [
     { rel: "canonical", href: url },
     { rel: "alternate", hrefLang: "es", href: url },
     { rel: "alternate", hrefLang: "x-default", href: url },
    ]
  : [];

 return {
  meta,
  links,
  scripts: (Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []).map(jsonLdScript),
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

/**
 * Lets Vercel's CDN serve rendered public pages for a day (and stale for a week while it
 * revalidates), so crawlers don't run the server function on every hit. Browsers still
 * revalidate (max-age=0). SSR is anonymous (auth/lang live client-side), so it's safe to share.
 */
export const PUBLIC_PAGE_HEADERS = {
 "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
};
