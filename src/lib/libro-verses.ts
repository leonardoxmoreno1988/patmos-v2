import { createServerFn } from "@tanstack/react-start";

import type { VerseRange } from "@/lib/libro-footnotes";

/** RV1865 text for the verse ranges a book chapter quotes. Runs on the server only. */
export const getLibroVerseTexts = createServerFn({ method: "GET" })
  .inputValidator((input: VerseRange[]) => input)
  .handler(async ({ data }) => {
    const { loadVerseRanges } = await import("./reader-chapter.server");
    return loadVerseRanges(data);
  });
