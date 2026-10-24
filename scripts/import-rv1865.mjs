// Downloads the Reina-Valera 1865 USFM books into public/bible/es/<CODE>.usfm, the same layout as
// public/bible/en/ (see import-kjv.mjs), so the reader loads Spanish from the same origin.
//
//   node scripts/import-rv1865.mjs
//
// The 66 filenames come from RAW_BOOKS in src/lib/bible.ts, so that list stays the single source.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SOURCE = "https://raw.githubusercontent.com/MC1171611/valera1865/master/USFM/";
const OUT = "public/bible/es";

const bibleSource = readFileSync("src/lib/bible.ts", "utf8");
const files = [...bibleSource.matchAll(/f: "(\d+_\w+_RV1865\.usfm)"/g)].map((m) => m[1]);
if (files.length !== 66) throw new Error(`Expected 66 book files in src/lib/bible.ts, found ${files.length}`);

mkdirSync(OUT, { recursive: true });
for (const file of files) {
  const res = await fetch(SOURCE + file);
  if (!res.ok) throw new Error(`Download failed for ${file}: HTTP ${res.status}`);
  const raw = await res.text();
  const code = /^\\id\s+(\w{3})/m.exec(raw)?.[1];
  if (!code) throw new Error(`No \\id line in ${file}`);
  if (!raw.trim()) throw new Error(`Empty download for ${file}`);
  writeFileSync(`${OUT}/${code}.usfm`, raw);
}
console.log(`Wrote ${files.length} books to ${OUT}`);
