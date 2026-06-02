/**
 * Adds name.en to data-asia set definition files using the same resolution
 * pipeline as generate-set-english-labels.mjs.
 *
 * Usage (from cards-database/):
 *   npm run sets:english-names:apply
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  extractSetMeta,
  loadSetEnglishMaps,
  patchSetEnglishName,
  resolveEnglish,
} from './lib/set-english-resolve.mjs';

const cardsDbRoot = path.resolve(import.meta.dirname, '..');
const maps = loadSetEnglishMaps(cardsDbRoot);
const dataAsiaRoot = path.join(cardsDbRoot, 'data-asia');

let scanned = 0;
let updated = 0;
let unchanged = 0;
const missing = [];

for (const serie of fs.readdirSync(dataAsiaRoot)) {
  const seriePath = path.join(dataAsiaRoot, serie);
  if (!fs.statSync(seriePath).isDirectory()) continue;

  for (const file of fs.readdirSync(seriePath)) {
    if (!file.endsWith('.ts')) continue;

    const filePath = path.join(seriePath, file);
    const source = fs.readFileSync(filePath, 'utf8');
    if (!source.includes('const set: Set')) continue;

    scanned += 1;
    const meta = extractSetMeta(source);
    if (!meta.id) continue;

    const { english } = resolveEnglish(meta, maps);
    if (!english) {
      missing.push({ serie, file, id: meta.id, names: meta.names });
      continue;
    }

    const { source: nextSource, changed } = patchSetEnglishName(source, english);
    if (changed) {
      fs.writeFileSync(filePath, nextSource, 'utf8');
      updated += 1;
    } else {
      unchanged += 1;
    }
  }
}

console.log(JSON.stringify({ scanned, updated, unchanged, missing: missing.length }, null, 2));
if (missing.length > 0) {
  console.log('\nCould not resolve English name:');
  for (const row of missing) {
    const label = Object.values(row.names ?? {}).join(' / ') || '?';
    console.log(`  ${row.serie}/${row.file} (${row.id})  ${label}`);
  }
}
