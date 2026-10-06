// Converts eBible.org's public-domain KJV USFM (eng-kjv2006) into the lean USFM served from public/bible/en/.
//
//   curl -LO https://ebible.org/Scriptures/eng-kjv2006_usfm.zip && unzip eng-kjv2006_usfm.zip -d /tmp/kjv
//   node scripts/import-kjv.mjs /tmp/kjv
//
// Strips Strong's numbers (\w word|strong="..."\w* -> word) and footnotes/cross references, which the
// reader does not render, and flattens nested \+add/\+nd; keeps verses, paragraphs, poetry, headings
// and \add italics.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/import-kjv.mjs <dir with eng-kjv2006 *.usfm>");
  process.exit(1);
}
const out = "public/bible/en";
mkdirSync(out, { recursive: true });

const files = readdirSync(src).filter((f) => f.endsWith(".usfm"));
for (const file of files) {
  const raw = readFileSync(join(src, file), "utf8");
  const code = /^\\id\s+(\w{3})/m.exec(raw)?.[1];
  if (!code) throw new Error(`No \\id line in ${file}`);
  const lean = raw
    .replace(/\\(f|x)\s[\s\S]*?\\\1\*/g, "")
    .replace(/\\\+?w\s+([^|\\]*?)(?:\|[^\\]*)?\\\+?w\*/g, "$1")
    // Nested character markers inside \wj (e.g. \+add) become plain ones the reader understands.
    .replace(/\\\+(add|nd)\b/g, "\\$1")
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .join("\n");
  if (/\\\+|\\w\b|\|strong=|\\f\b/.test(lean)) throw new Error(`Unconverted markup left in ${file}`);
  writeFileSync(join(out, `${code}.usfm`), lean);
}
console.log(`Wrote ${files.length} books to ${out}`);
