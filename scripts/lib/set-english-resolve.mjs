import fs from 'node:fs';
import path from 'node:path';

export function parseStringMapFile(filePath, pairRe) {
  const source = fs.readFileSync(filePath, 'utf8');
  const map = new Map();
  for (const m of source.matchAll(pairRe)) {
    map.set(m[1], m[2].replace(/\\'/g, "'"));
  }
  return map;
}

export function parseMapSection(filePath, sectionName) {
  const source = fs.readFileSync(filePath, 'utf8');
  const start = source.indexOf(sectionName);
  if (start < 0) return new Map();
  const slice = source.slice(start);
  const end = slice.indexOf(']);');
  const block = end >= 0 ? slice.slice(0, end) : slice;
  const map = new Map();
  for (const m of block.matchAll(/\['((?:\\'|[^'])*)',\s*'((?:\\'|[^'])*)'\]/g)) {
    map.set(m[1], m[2].replace(/\\'/g, "'"));
  }
  return map;
}

export function loadSetEnglishMaps(cardsDbRoot) {
  const homologPath = path.resolve(
    cardsDbRoot,
    '../dittos-army-back/data/cardtrader_tcgdex_homolog.json',
  );

  const jpById = parseStringMapFile(
    path.join(cardsDbRoot, 'scripts/utils-data/jp_set_translations.ts'),
    /\['([^']+)',\s*'((?:\\'|[^'])*)'\]/g,
  );

  const cmByName = parseStringMapFile(
    path.join(cardsDbRoot, 'scripts/utils-data/cm_expansions.ts'),
    /\['((?:\\'|[^'])*)',\s*(\d+)\]/g,
  );
  const cmById = new Map([...cmByName.entries()].map(([name, id]) => [Number(id), name]));

  const sourcesPath = path.join(
    cardsDbRoot,
    'scripts/utils-data/tcgdex_set_english_sources.ts',
  );
  const byIdPath = path.join(
    cardsDbRoot,
    'scripts/utils-data/tcgdex_set_english_by_id.ts',
  );

  const idAliases = parseMapSection(sourcesPath, 'tcgdexSetIdAliases');
  const jaByName = parseMapSection(sourcesPath, 'asiaSetEnglishByJaName');
  const localizedByName = parseMapSection(sourcesPath, 'asiaSetEnglishByLocalizedName');
  const englishById = parseMapSection(byIdPath, 'tcgdexSetEnglishById');

  const homologEnById = new Map();
  const homologCmById = new Map();
  if (fs.existsSync(homologPath)) {
    const homolog = JSON.parse(fs.readFileSync(homologPath, 'utf8'));
    for (const entry of Object.values(homolog.sets ?? {})) {
      const id = entry.tcgdex_set_id;
      if (!id) continue;
      const en =
        entry.names?.en_cardtrader ??
        entry.names?.englishName ??
        entry.names?.database?.en;
      if (typeof en === 'string' && en.trim() && !homologEnById.has(id)) {
        homologEnById.set(id, en.trim());
      }
      if (entry.cardmarket_expansion_id && !homologCmById.has(id)) {
        homologCmById.set(id, entry.cardmarket_expansion_id);
      }
    }
    for (const item of homolog.cardtrader_only ?? []) {
      const code = item?.code;
      const name = item?.name;
      if (!code || !name || homologEnById.has(code)) continue;
      homologEnById.set(
        code[0].toUpperCase() + code.slice(1),
        String(name).split('|')[0].trim(),
      );
    }
  }

  return {
    jpById,
    cmById,
    idAliases,
    jaByName,
    localizedByName,
    englishById,
    homologEnById,
    homologCmById,
  };
}

function readQuotedValue(raw) {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    return trimmed.slice(1, -1).replace(/\\'/g, "'");
  }
  return trimmed;
}

export function extractSetMeta(source) {
  const id = readQuotedValue(source.match(/\bid:\s*(['"][^'"]+['"])/)?.[1]);
  const cardmarket = source.match(/cardmarket:\s*(\d+)/)?.[1];
  const names = {};
  for (const m of source.matchAll(/(?:ja|ko|id|th):\s*(['"][^'"]+['"])/g)) {
    const key = m[0].split(':')[0].trim();
    names[key] = readQuotedValue(m[1]);
  }
  for (const m of source.matchAll(/['"]zh-(?:tw|cn)['"]:\s*(['"][^'"]+['"])/g)) {
    const key = m[0].includes('zh-tw') ? 'zh-tw' : 'zh-cn';
    names[key] = readQuotedValue(m[1]);
  }
  const enMatch = source.match(/\ben:\s*(['"])((?:\\.|(?!\1).)*)\1/);
  if (enMatch) {
    names.en = enMatch[2].replace(/\\'/g, "'");
  }
  return {
    id,
    cardmarket: cardmarket ? Number(cardmarket) : undefined,
    names,
    jaName: names.ja,
  };
}

function lookupById(maps, id) {
  if (!id) return undefined;
  return (
    maps.englishById.get(id) ??
    maps.englishById.get(id.toUpperCase())
  );
}

function lookupHomologById(maps, id) {
  if (!id) return undefined;
  return (
    maps.homologEnById.get(id) ??
    maps.homologEnById.get(id.toUpperCase())
  );
}

function lookupByLocalizedNames(maps, names) {
  for (const name of Object.values(names)) {
    if (!name) continue;
    const hit =
      maps.localizedByName.get(name) ??
      maps.jaByName.get(name);
    if (hit) return hit;
  }
  return undefined;
}

export function resolveEnglish(meta, maps) {
  const { id, cardmarket, jaName, names } = meta;
  if (!id) return { english: undefined, source: null };

  const direct = lookupById(maps, id);
  if (direct) {
    return { english: direct, source: 'tcgdex_set_english_by_id' };
  }

  const cmId =
    cardmarket ??
    maps.homologCmById.get(id) ??
    maps.homologCmById.get(id.toUpperCase());
  if (cmId && maps.cmById.has(cmId)) {
    return { english: maps.cmById.get(cmId), source: 'cardmarket' };
  }

  const alias =
    maps.idAliases.get(id) ?? maps.idAliases.get(id.toUpperCase());
  if (alias && maps.jpById.has(alias)) {
    return { english: maps.jpById.get(alias), source: 'jp_set_translations_alias' };
  }

  if (maps.jpById.has(id) || maps.jpById.has(id.toUpperCase())) {
    return {
      english: maps.jpById.get(id) ?? maps.jpById.get(id.toUpperCase()),
      source: 'jp_set_translations',
    };
  }

  const fromNames = lookupByLocalizedNames(maps, names);
  if (fromNames) {
    return { english: fromNames, source: 'localized_name_map' };
  }

  if (jaName && maps.jaByName.has(jaName)) {
    return { english: maps.jaByName.get(jaName), source: 'ja_name_map' };
  }

  const fromHomolog = lookupHomologById(maps, id);
  if (fromHomolog) {
    return { english: fromHomolog, source: 'set_name_homologs' };
  }

  return { english: undefined, source: null };
}

export function escapeTsSingleQuote(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

export function patchSetEnglishName(source, englishName) {
  if (!englishName) {
    return { source, changed: false };
  }

  const nameBlockRe = /\bname:\s*\{([^}]*)\}/s;
  const match = source.match(nameBlockRe);
  if (!match) {
    return { source, changed: false, reason: 'no-name-block' };
  }

  const fullBlock = match[0];
  const inner = match[1];
  const escaped = escapeTsSingleQuote(englishName);

  const enPropRe = /\ben:\s*'((?:\\'|[^'])*)'/;
  if (enPropRe.test(inner)) {
    const current = inner.match(enPropRe)[1].replace(/\\'/g, "'");
    if (current === englishName) {
      return { source, changed: false };
    }
    const newBlock = fullBlock.replace(enPropRe, `en: '${escaped}'`);
    return { source: source.replace(fullBlock, newBlock), changed: true };
  }

  const keyLine = inner.match(/\n(\s+)(?:ja|ko|id|th|'zh-)/);
  const indent = keyLine ? keyLine[1] : '\t\t';
  const enLine = `${indent}en: '${escaped}',\n`;
  const newBlock = fullBlock.replace(/\{\s*\n/, `{\n${enLine}`);

  return { source: source.replace(fullBlock, newBlock), changed: true };
}
