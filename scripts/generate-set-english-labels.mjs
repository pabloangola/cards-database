/**
 * Generates dittos-army-back/data/asia_set_english_labels.json from cards-database
 * sources (data-asia, jp_set_translations, cm_expansions, homologs, manual maps).
 *
 * Usage (from cards-database/):
 *   npm run sets:english-labels
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  extractSetMeta,
  loadSetEnglishMaps,
  resolveEnglish,
} from './lib/set-english-resolve.mjs';

const cardsDbRoot = path.resolve(import.meta.dirname, '..');
const outputPath = path.resolve(
  cardsDbRoot,
  '../dittos-army-back/data/asia_set_english_labels.json',
);

const maps = loadSetEnglishMaps(cardsDbRoot);
const curatedLocalizedNames = new Set([
  ...maps.jaByName.keys(),
  ...maps.localizedByName.keys(),
]);

const bySetId = {};
const byLocalizedName = {
  ...Object.fromEntries(maps.jaByName.entries()),
  ...Object.fromEntries(maps.localizedByName.entries()),
};
const setIdConflicts = new Set();
const entries = [];
const missing = [];

const dataAsiaRoot = path.join(cardsDbRoot, 'data-asia');
for (const serie of fs.readdirSync(dataAsiaRoot)) {
  const seriePath = path.join(dataAsiaRoot, serie);
  if (!fs.statSync(seriePath).isDirectory()) continue;

  for (const file of fs.readdirSync(seriePath)) {
    if (!file.endsWith('.ts')) continue;

    const filePath = path.join(seriePath, file);
    const source = fs.readFileSync(filePath, 'utf8');
    if (!source.includes('const set: Set')) continue;

    const meta = extractSetMeta(source);
    if (!meta.id) continue;

    const { english, source: englishSource } = resolveEnglish(meta, maps);
    entries.push({ serie, file, ...meta, english, source: englishSource });

    if (english) {
      for (const name of Object.values(meta.names)) {
        if (name && !curatedLocalizedNames.has(name)) {
          byLocalizedName[name] = english;
        }
      }
      if (bySetId[meta.id] && bySetId[meta.id] !== english) {
        setIdConflicts.add(meta.id);
      } else {
        bySetId[meta.id] = english;
      }
    } else {
      missing.push({
        serie,
        id: meta.id,
        names: meta.names,
        file,
      });
    }
  }
}

for (const id of setIdConflicts) {
  delete bySetId[id];
}

const payload = {
  version: 2,
  generated_at: new Date().toISOString(),
  sources: [
    'cards-database/data-asia',
    'cards-database/scripts/utils-data/jp_set_translations.ts',
    'cards-database/scripts/utils-data/cm_expansions.ts',
    'cards-database/scripts/utils-data/tcgdex_set_english_sources.ts',
    'cards-database/scripts/utils-data/tcgdex_set_english_by_id.ts',
    'dittos-army-back/data/set_name_homologs.json',
  ],
  stats: {
    scanned: entries.length,
    resolved: Object.keys(bySetId).length,
    ambiguousSetIds: [...setIdConflicts],
    missing: missing.length,
  },
  bySetId,
  byJaName: byLocalizedName,
  missing,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

console.log(`Wrote ${outputPath}`);
console.log(JSON.stringify(payload.stats, null, 2));
if (missing.length > 0) {
  console.log('\nStill missing English label:');
  for (const row of missing) {
    const label = Object.values(row.names ?? {}).join(' / ') || '?';
    console.log(`  ${row.serie}/${row.id} (${row.file})  ${label}`);
  }
}
