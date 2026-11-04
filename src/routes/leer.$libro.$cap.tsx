import { createFileRoute, redirect } from "@tanstack/react-router";

import { ReaderPage } from "@/components/reader/reader-page";
import { bookSlug } from "@/lib/bible-slugs";
import { isCanonicalSlug, loadReaderPage, readerHead, readerHeaders, resolveReaderParams } from "@/lib/reader-route";

// Spanish reader: /leer/exodo/1. Other spellings of the book (English slug, legacy names like
// "hechos") redirect here, so each chapter has one Spanish address.
export const Route = createFileRoute("/leer/$libro/$cap")({
 staticData: { sitemap: true },
 beforeLoad: ({ params }) => {
  const { bookid, chapter } = resolveReaderParams(params);
  if (!isCanonicalSlug(params.libro, bookid, "es")) {
   throw redirect({ to: "/leer/$libro/$cap", params: { libro: bookSlug(bookid, "es"), cap: String(chapter) }, statusCode: 301 });
  }
 },
 loader: ({ context, params }) => {
  const { bookid, chapter } = resolveReaderParams(params);
  return loadReaderPage(context.queryClient, bookid, chapter, "es");
 },
 headers: ({ params }) => readerHeaders(params),
 head: ({ params, loaderData }) => {
  const { bookid, chapter } = resolveReaderParams(params);
  return readerHead("es", bookid, chapter, loaderData?.notes);
 },
 component: SpanishReader,
});

function SpanishReader() {
 const page = Route.useLoaderData();
 return <ReaderPage page={page} />;
}
