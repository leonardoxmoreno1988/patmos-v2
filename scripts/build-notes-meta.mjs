// Writes src/data/meta_es.json and meta_en.json: which chapters have study notes, per book (~2 KB),
// so the home progress grid renders from the first paint without querying Supabase.
// Re-run after importing notes (the grid also refreshes from bible_notes at runtime):
//
//   node scripts/build-notes-meta.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { createServer } from "vite";

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
try {
  // Loaded through Vite so the Supabase client gets VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY from .env.
  const { fetchNotesCoverage } = await vite.ssrLoadModule("/src/lib/bible-notes.ts");
  mkdirSync("src/data", { recursive: true });
  for (const lang of ["es", "en"]) {
    const chapters = await fetchNotesCoverage(lang);
    const total = Object.values(chapters).reduce((n, c) => n + c.length, 0);
    if (total === 0) throw new Error(`No ${lang} notes found; refusing to write an empty meta file.`);
    const meta = { generatedAt: new Date().toISOString(), source: "Supabase bible_notes", chapters };
    writeFileSync(`src/data/meta_${lang}.json`, JSON.stringify(meta) + "\n");
    console.log(`meta_${lang}.json: ${total} chapters with notes in ${Object.keys(chapters).length} books`);
  }
} finally {
  await vite.close();
}
