import type { QueryClient } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";

import { BOOKS, CHAPTER_COUNTS, bookName, slugifyBook } from "@/lib/bible";
import { notesCacheTag } from "@/lib/bible-notes";
import { bookSlug, readerPath, resolveBookSlug, type SlugLang } from "@/lib/bible-slugs";
import { readerChapterQuery, type ReaderChapter } from "@/lib/reader-chapter";
import { ORGANIZATION, PUBLIC_PAGE_HEADERS, SITE_URL, brandTitle, excerpt, plainText, seoHead } from "@/lib/seo";

export interface ReaderParams {
  libro: string;
  cap: string;
}

/** Resolves the URL's book and chapter; anything unknown is a 404. */
export function resolveReaderParams({ libro, cap }: ReaderParams) {
  const bookid = resolveBookSlug(libro);
  if (bookid === null) throw notFound();
  const chapter = Number(cap);
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > (CHAPTER_COUNTS[bookid] ?? 0)) throw notFound();
  return { bookid, chapter };
}

/** Whether the URL's book segment is the canonical slug for this language (else redirect to it). */
export function isCanonicalSlug(libro: string, bookid: number, lang: SlugLang): boolean {
  let decoded = libro;
  try {
    decoded = decodeURIComponent(libro);
  } catch {
    /* malformed escape: compare the raw value */
  }
  return slugifyBook(decoded) === bookSlug(bookid, lang);
}

/** Loader for a chapter: its verses and processed notes, cached for the session. */
export async function loadReaderPage(queryClient: QueryClient, bookid: number, chapter: number, lang: SlugLang) {
  const page: ReaderChapter = await queryClient.ensureQueryData(readerChapterQuery(bookid, chapter, lang));
  return { lang, bookId: bookid, chapter, ...page };
}

/** Public, CDN-cacheable chapter page; tagged so /admin/notas can purge just this chapter. */
export const readerHeaders = ({ libro, cap }: ReaderParams) => {
  const bookid = resolveBookSlug(libro) ?? BOOKS[0]!.bookid;
  const chapter = Math.max(1, Math.floor(Number(cap)) || 1);
  return { ...PUBLIC_PAGE_HEADERS, "Vercel-Cache-Tag": notesCacheTag(BOOKS[bookid - 1]!.code, chapter) };
};

/**
 * Title, description, canonical, and hreflang for a chapter. Spanish and English each point to
 * their own URL, and to the other language's URL; x-default is the Spanish page.
 */
export function readerHead(lang: SlugLang, bookid: number, chapter: number, notes: { body_html: string }[] | null | undefined) {
  const info = BOOKS[bookid - 1]!;
  const book = bookName(info, lang);
  const en = lang === "en";
  const description = notes?.length
    ? excerpt(plainText(notes.map((n) => n.body_html).join(" ")), 150)
    : en
      ? `Read ${book} ${chapter} in the King James Version with study notes and doctrinal analysis.`
      : `Lee ${book} ${chapter} en la Reina-Valera 1865 con notas de estudio y análisis doctrinal.`;
  const title = en
    ? `${book} ${chapter} - Reading and Study (KJV)`
    : `${book} ${chapter} - Lectura y Estudio (RV1865)`;
  const alternates = {
    es: `${SITE_URL}${readerPath("es", bookid, chapter)}`,
    en: `${SITE_URL}${readerPath("en", bookid, chapter)}`,
  };
  const url = alternates[lang];
  return seoHead({
    title,
    description,
    canonical: url,
    lang,
    alternates,
    ogType: "article",
    // Chapters without commentary (e.g. public-domain English text) stay out of the index. A failed
    // notes fetch (null) keeps the page indexable, so a transient error isn't cached as noindex.
    noindex: notes?.length === 0,
    jsonLd: [
      {
        "@type": "Article",
        headline: brandTitle(title),
        description,
        url,
        mainEntityOfPage: url,
        inLanguage: lang,
        image: `${SITE_URL}/og-image.png`,
        author: { "@type": "Person", name: "Leonardo Moreno" },
        publisher: ORGANIZATION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: {
          "@type": "Chapter",
          name: `${book} ${chapter}`,
          position: chapter,
          isPartOf: {
            "@type": "Book",
            name: en ? `${book} — King James Bible` : `${book} — Biblia Reina-Valera 1865`,
            inLanguage: lang,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: en ? "Home" : "Inicio", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: `${book} ${chapter}`, item: url },
        ],
      },
    ],
  });
}
