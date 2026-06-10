/** Helpers to build CardTrader expansion label -> TCGdex set id maps. */

export function normKey(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export function aliasKeys(label) {
  const keys = new Set();
  const base = String(label ?? '').split('|')[0].trim();
  for (const candidate of [label, base]) {
    const nk = normKey(candidate);
    if (nk) keys.add(nk);
  }
  if (base.includes(':')) {
    const prefix = base.split(':', 1)[0].trim();
    keys.add(normKey(prefix));
    keys.add(normKey(`${prefix}:`));
  }
  return keys;
}

export function localesForSet(setId, names = {}) {
  const locs = [];
  if (names['zh-cn'] || (setId.endsWith('C') && /^CS/i.test(setId))) {
    locs.push('zh-cn');
  }
  if (names['zh-tw']) locs.push('zh-tw');
  if (names.ja) {
    locs.push('ja');
    locs.push('ko');
  } else if (names.ko) {
    locs.push('ko');
  }
  if (names.en && locs.length === 0) locs.push('en');
  if (locs.length === 0) locs.push('ja');
  return [...new Set(locs)];
}

export function registerEnAlias(aliases, label, locale, setId) {
  const clean = String(label ?? '').split('|')[0].trim();
  if (!clean || !setId) return;
  for (const nk of aliasKeys(clean)) {
    const bucket = aliases[nk] ?? (aliases[nk] = {});
    bucket[locale] = setId;
    if (locale === 'ja') bucket.ko = setId;
  }
}

export function ctCodeToSetId(code) {
  const c = String(code ?? '').trim();
  if (!c) return c;
  if (/^cs/i.test(c) && c.endsWith('c')) return c.toUpperCase();
  if (/^cbb/i.test(c)) return c.toUpperCase();
  if (/^m\d/i.test(c)) return c[0].toUpperCase() + c.slice(1);
  if (c[0] >= 'a' && c[0] <= 'z') return c[0].toUpperCase() + c.slice(1);
  return c;
}

export function buildExpansionMaps(entries, { jpById, cmByName } = {}) {
  const cardtraderEnToLocale = {};
  const sets = {};
  const localeSetToEn = { ja: {}, ko: {}, 'zh-cn': {}, 'zh-tw': {} };

  const registerEntry = (setId, english, names = {}, localeHint) => {
    if (!setId || !english) return;
    const locs = localeHint ? [localeHint] : localesForSet(setId, names);
    for (const loc of locs) {
      registerEnAlias(cardtraderEnToLocale, english, loc, setId);
      const key = `${loc}:${setId}`;
      sets[key] ??= {
        tcgdex_set_id: setId,
        locale: loc,
        names: {
          en_cardtrader: english,
          database: names,
        },
      };
      if (localeSetToEn[loc]) {
        localeSetToEn[loc][setId] = setId;
      }
    }
  };

  for (const entry of entries) {
    registerEntry(entry.id, entry.english, entry.names);
  }

  if (jpById) {
    for (const [setId, english] of jpById.entries()) {
      if (entries.some((e) => e.id === setId)) continue;
      registerEntry(setId, english, {});
    }
  }

  if (cmByName) {
    for (const [cmName, cmId] of cmByName.entries()) {
      const hit = entries.find((e) => e.cardmarket === Number(cmId));
      if (hit?.english) {
        registerEnAlias(
          cardtraderEnToLocale,
          cmName,
          localesForSet(hit.id, hit.names)[0],
          hit.id,
        );
      }
    }
  }

  const expansionToEnSet = {};
  for (const [nk, bucket] of Object.entries(cardtraderEnToLocale)) {
    expansionToEnSet[nk] = bucket.en ?? bucket.ja ?? bucket['zh-cn'] ?? Object.values(bucket)[0];
  }

  return {
    cardtrader_en_to_locale: cardtraderEnToLocale,
    sets,
    locale_set_to_en: localeSetToEn,
    expansion_to_en_set: expansionToEnSet,
  };
}

export function mergeCardtraderHomologFile(maps, homologJson) {
  const aliases = { ...maps.cardtrader_en_to_locale };
  const sets = { ...maps.sets };

  for (const entry of Object.values(homologJson.sets ?? {})) {
    const sid = entry?.tcgdex_set_id;
    const loc = entry?.locale ?? 'en';
    if (!sid) continue;
    sets[`${loc}:${sid}`] ??= entry;
    const names = entry.names ?? {};
    for (const label of [
      names.en_cardtrader,
      names.englishName,
      ...Object.values(names.database ?? {}),
    ]) {
      if (label) registerEnAlias(aliases, String(label), loc, String(sid));
    }
  }

  for (const item of homologJson.cardtrader_only ?? []) {
    const name = String(item?.name ?? '').trim();
    const code = String(item?.code ?? '').trim();
    if (!name || !code) continue;
    const sid = ctCodeToSetId(code);
    let loc = 'ja';
    if (/^cbb/i.test(code) || (sid.endsWith('C') && /^CS/i.test(sid))) {
      loc = 'zh-cn';
    }
    registerEnAlias(aliases, name, loc, sid);
    sets[`${loc}:${sid}`] ??= {
      tcgdex_set_id: sid,
      locale: loc,
      names: { en_cardtrader: name.split('|')[0].trim(), database: {} },
    };
  }

  const expansionToEnSet = { ...maps.expansion_to_en_set };
  for (const [nk, bucket] of Object.entries(aliases)) {
    expansionToEnSet[nk] = bucket.en ?? bucket.ja ?? bucket['zh-cn'] ?? Object.values(bucket)[0];
  }

  return {
    ...maps,
    cardtrader_en_to_locale: aliases,
    sets,
    expansion_to_en_set: expansionToEnSet,
  };
}
