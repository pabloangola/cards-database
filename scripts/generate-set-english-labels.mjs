/**
 * Canonical set English labels + CardTrader expansion map from cards-database sources.
 *
 * Writes:
 *   cards-database/meta/set-english-labels.json   (source of truth)
 *   dittos-army-back/data/asia_set_english_labels.json (legacy consumer)
 *   scripts/card-trader/data/set_locale_map.json (card-trader pipeline)
 *
 * Usage (from cards-database/):
 *   npm run sets:english-labels
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  buildExpansionMaps,
  mergeCardtraderHomologFile,
} from './lib/expansion-map.mjs';
import {
  extractSetMeta,
  loadSetEnglishMaps,
  resolveEnglish,
} from './lib/set-english-resolve.mjs';

const cardsDbRoot = path.resolve(import.meta.dirname, '..');
const repoRoot = path.resolve(cardsDbRoot, '..');

const canonicalPath = path.join(cardsDbRoot, 'meta/set-english-labels.json');
const backLabelsPath = path.join(repoRoot, 'dittos-army-back/data/asia_set_english_labels.json');
const cardTraderLocaleMapPath = path.join(
  repoRoot,
  'scripts/card-trader/data/set_locale_map.json',
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

let expansionMaps = buildExpansionMaps(entries, {
  jpById: maps.jpById,
  cmByName: maps.cmByName,
});

const ctHomologPath = path.join(repoRoot, 'dittos-army-back/data/cardtrader_tcgdex_homolog.json');
if (fs.existsSync(ctHomologPath)) {
  expansionMaps = mergeCardtraderHomologFile(
    expansionMaps,
    JSON.parse(fs.readFileSync(ctHomologPath, 'utf8')),
  );
}

const payload = {
  version: 3,
  generated_at: new Date().toISOString(),
  sources: [
    'cards-database/data-asia',
    'cards-database/scripts/utils-data/jp_set_translations.ts',
    'cards-database/scripts/utils-data/cm_expansions.ts',
    'cards-database/scripts/utils-data/tcgdex_set_english_sources.ts',
    'cards-database/scripts/utils-data/tcgdex_set_english_by_id.ts',
    'dittos-army-back/data/cardtrader_tcgdex_homolog.json',
  ],
  stats: {
    scanned: entries.length,
    resolved: Object.keys(bySetId).length,
    ambiguousSetIds: [...setIdConflicts],
    missing: missing.length,
    expansionAliases: Object.keys(expansionMaps.cardtrader_en_to_locale).length,
  },
  bySetId,
  byJaName: byLocalizedName,
  cardtrader_en_to_locale: expansionMaps.cardtrader_en_to_locale,
  sets: expansionMaps.sets,
  missing,
};

const backPayload = {
  version: 2,
  generated_at: payload.generated_at,
  sources: payload.sources,
  stats: payload.stats,
  bySetId: payload.bySetId,
  byJaName: payload.byJaName,
  missing: payload.missing,
};

const localeMapPayload = {
  version: 2,
  generated: true,
  generated_at: payload.generated_at,
  sources: payload.sources,
  locale_set_to_en: expansionMaps.locale_set_to_en,
  expansion_to_en_set: expansionMaps.expansion_to_en_set,
};

for (const target of [canonicalPath, backLabelsPath, cardTraderLocaleMapPath]) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
}

fs.writeFileSync(canonicalPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(backLabelsPath, `${JSON.stringify(backPayload, null, 2)}\n`, 'utf8');
fs.writeFileSync(
  cardTraderLocaleMapPath,
  `${JSON.stringify(localeMapPayload, null, 2)}\n`,
  'utf8',
);

console.log(`Wrote ${canonicalPath}`);
console.log(`Wrote ${backLabelsPath}`);
console.log(`Wrote ${cardTraderLocaleMapPath}`);
console.log(JSON.stringify(payload.stats, null, 2));
if (missing.length > 0) {
  console.log('\nStill missing English label:');
  for (const row of missing) {
    const label = Object.values(row.names ?? {}).join(' / ') || '?';
    console.log(`  ${row.serie}/${row.id} (${row.file})  ${label}`);
  }
}
