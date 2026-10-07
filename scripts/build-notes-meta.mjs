// Writes src/data/meta_es.json and meta_en.json: which chapters have study notes, per book (~2 KB),
// so the home progress grid renders from the first paint without downloading the notes.
// Re-run after the notes change (the Spanish sheet is live; the grid also refreshes from it at runtime):
//
//   node scripts/build-notes-meta.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createServer } from "vite";

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
try {
  const { fetchStudyNotes, notesFromCsv, notesCoverage } = await vite.ssrLoadModule("/src/lib/notes.ts");
  const sources = {
    // fetchStudyNotes("es") reads the published Google Sheet; English is read from disk because its
    // runtime URL is relative to the site.
    es: { notes: await fetchStudyNotes("es"), source: "Google Sheet (published CSV)" },
    en: { notes: notesFromCsv(readFileSync("public/notes/notes_en.csv", "utf8"), true), source: "public/notes/notes_en.csv" },
  };
  mkdirSync("src/data", { recursive: true });
  for (const [lang, { notes, source }] of Object.entries(sources)) {
    const chapters = notesCoverage(notes);
    const total = Object.values(chapters).reduce((n, c) => n + c.length, 0);
    if (total === 0) throw new Error(`No ${lang} notes found; refusing to write an empty meta file.`);
    const meta = { generatedAt: new Date().toISOString(), source, chapters };
    writeFileSync(`src/data/meta_${lang}.json`, JSON.stringify(meta) + "\n");
    console.log(`meta_${lang}.json: ${total} chapters with notes in ${Object.keys(chapters).length} books`);
  }
} finally {
  await vite.close();
}
