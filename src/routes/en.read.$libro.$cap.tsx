import { createFileRoute, redirect } from "@tanstack/react-router";

import { ReaderPage } from "@/components/reader/reader-page";
import { bookSlug } from "@/lib/bible-slugs";
import { isCanonicalSlug, loadReaderPage, readerHead, readerHeaders, resolveReaderParams } from "@/lib/reader-route";

// English reader (KJV): /en/read/exodus/1. Spanish or legacy spellings of the book redirect here.
export const Route = createFileRoute("/en/read/$libro/$cap")({
 staticData: { sitemap: false },
 beforeLoad: ({ params }) => {
  const { bookid, chapter } = resolveReaderParams(params);
  if (!isCanonicalSlug(params.libro, bookid, "en")) {
   throw redirect({ to: "/en/read/$libro/$cap", params: { libro: bookSlug(bookid, "en"), cap: String(chapter) }, statusCode: 301 });
  }
 },
 loader: ({ context, params }) => {
  const { bookid, chapter } = resolveReaderParams(params);
  return loadReaderPage(context.queryClient, bookid, chapter, "en");
 },
 headers: ({ params }) => readerHeaders(params),
 head: ({ params, loaderData }) => {
  const { bookid, chapter } = resolveReaderParams(params);
  return readerHead("en", bookid, chapter, loaderData?.notes);
 },
 component: EnglishReader,
});

function EnglishReader() {
 const page = Route.useLoaderData();
 return <ReaderPage page={page} />;
}
