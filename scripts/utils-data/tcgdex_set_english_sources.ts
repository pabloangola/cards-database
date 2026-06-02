/**
 * TCGdex set id -> key in jp_set_translations.ts when ids differ.
 */
export const tcgdexSetIdAliases = new Map<string, string>([
  ['BW1a', 'BW1b'],
  ['BW1b', 'BW1w'],
  ['BW5a', 'BW5z'],
  ['BW5b', 'BW5n'],
  ['BW6a', 'BW6f'],
  ['BW6b', 'BW6c'],
  ['BW8a', 'BW8f'],
  ['BW8b', 'BW8n'],
  ['XY1a', 'XY1x'],
  ['XY1b', 'XY1y'],
  ['XY5a', 'XY5g'],
  ['XY5b', 'XY5t'],
  ['XY11a', 'XY11b'],
  ['XY11b', 'XY11r'],
  ['XY8a', 'XY8b'],
]);

/**
 * Japanese set name -> official English product name (Bulbapedia / Cardmarket).
 */
export const asiaSetEnglishByJaName = new Map<string, string>([
  // BW split sets
  ['サイコドライブ', 'Psycho Drive'],
  ['ヘイルブリザード', 'Hail Blizzard'],
  ['ブラックコレクション', 'Black Collection'],
  ['ホワイトコレクション', 'White Collection'],
  ['リューズブラスト', 'Dragon Blast'],
  ['リューノブレード', 'Dragon Blade'],
  ['フリーズボルト', 'Freeze Bolt'],
  ['コールドフレア', 'Cold Flare'],
  ['ラセンフォース', 'Spiral Force'],
  ['ライデンナックル', 'Raiden Knuckle'],

  // ADV
  ['拡張パック', 'ADV Expansion Pack'],
  ['砂漠のきせき', 'Miracle of the Desert'],
  ['天空の覇者', 'Rulers of the Heavens'],
  ['とかれた封印', 'Undone Seal'],
  ['強化拡張パックex1マグマVSアクア ふたつの野望', 'Magma VS Aqua: Two Ambitions'],

  // DP
  ['時空の創造: ダイヤモンドコレクション', 'Diamond Collection'],
  ['時空の創造: パールコレクション', 'Pearl Collection'],
  ['湖の秘密', 'Secret of the Lakes'],
  ['ひかる闇', 'Shining Darkness'],
  ['月光の追跡', 'Moonlit Pursuit'],
  ['夜明けの疾走', 'Dawn Dash'],
  ['秘境の叫び', 'Cry from the Mysterious'],
  ['怒りの神殿', 'Temple of Anger'],
  ['破空の激闘', 'Intense Fight in the Sky'],

  // DPt
  ['ギンガの覇道', 'Galactic\'s Conquest'],
  ['時の果ての絆', 'Bonds to the End of Time'],
  ['フロンティアの鼓動', 'Beat of the Frontier'],
  ['アルセウス光臨', 'Advent of Arceus'],

  // e-Card
  ['基本拡張パック', 'Base Expansion Pack'],
  ['地図にない町', 'The Town on No Map'],
  ['海からの風', 'Wind from the Sea'],
  ['裂けた大地', 'Split Earth'],
  ['神秘なる山', 'Mysterious Mountains'],

  // neo
  ['金、銀、新世界へ...', 'Neo Genesis'],
  ['遺跡をこえて...', 'Neo Discovery'],
  ['めざめる伝説', 'Neo Revelation'],
  ['闇、そして光へ...', 'Neo Destiny'],

  // PCG
  ['伝説の飛翔', 'Flight of Legends'],
  ['蒼空の激突', 'Clash of the Blue Sky'],
  ['ロケット団の逆襲', 'Rocket Gang Strikes Back'],
  ['金の空、銀の海', 'Golden Sky, Silvery Ocean'],
  ['まぼろしの森', 'Mirage Forest'],
  ['ホロンの研究塔', 'Holon Research Tower'],
  ['ホロンの幻影', 'Holon Phantom'],
  ['きせきの結晶', 'Miracle Crystal'],
  ['さいはての攻防', 'Offense and Defense of the Furthest Ends'],
  ['ワールドチャンピオンズパック', 'World Champions Pack'],

  // PMCG (Original)
  ['ポケモンジャングル', 'Pokémon Jungle'],
  ['化石の秘密', 'Mystery of the Fossils'],
  ['ロケット団', 'Team Rocket'],
  ['リーダーズスタジアム', 'Leaders\' Stadium'],
  ['闇からの挑戦', 'Challenge from the Darkness'],

  // LEGEND (L)
  ['ハートゴールドコレクション', 'HeartGold Collection'],
  ['ソウルシルバーコレクション', 'SoulSilver Collection'],
  ['よみがえる伝説', 'Reviving Legends'],
  ['頂上大激突', 'Clash at the Summit'],
  ['強化パック ロストリンク', 'Lost Link'],

  // VS / web
  ['ポケモンカード★VS', 'Pokémon Card ★VS'],
  ['ポケモンカード★web', 'Pokémon Card ★web'],

  // XY splits (ja names in data-asia)
  ['コレクションX', 'Collection X'],
  ['コレクションY', 'Collection Y'],
  ['ガイアボルケーノ', 'Gaia Volcano'],
  ['タイダルストーム', 'Tidal Storm'],
  ['爆熱の闘士', 'Heat Burst Fighter'],
  ['冷酷の反逆者', 'Cruel Traitor'],
  ['青い衝撃', 'Blue Shock'],

  // SM plus sets
  ['サン＆ムーン', 'Sun & Moon plus'],
  ['新たな試練に直面', 'Facing a New Trial'],
  ['ひかる伝説', 'Shining Legends'],
  ['GXバトルブースト', 'GX Battle Boost'],
  ['ウルトラフォース', 'Ultra Force'],

  // Triplet Beat placeholder copies in CS files
  ['トリプレットビート', 'Triplet Beat'],
]);

/**
 * zh-cn / zh-tw / other localized names -> English label.
 */
export const asiaSetEnglishByLocalizedName = new Map<string, string>([
  // zh-cn (CardTrader / Bulbapedia)
  ['极巨攻防', 'Dynamax Tactics'],
  ['横空出世 赫', 'Storming Emergence - Radiant'],
  ['极巨争锋 焰', 'Dynamax Clash - Flame'],
  ['璀璨反击', 'Brilliant Counterattack'],
  ['浓墨重彩 黎', 'Vivid Portrayals - Obsidian'],
  ['浓墨重彩 靛', 'Vivid Portrayals - Indigo'],
  ['怒炎灼天', 'Scorching Skies'],
  ['洪荒演武 茂', 'Primordial Arts - Overgrow'],
  ['洪荒演武 激', 'Primordial Arts - Torrent'],
  ['终末炎舞', 'Final Flame Dance'],
  ['九彩汇聚 朋', 'Nine Colors Gathering - Friends'],
  ['九彩汇聚 源', 'Nine Colors Gathering - Origin'],
  ['暗影夺辉', 'Shadow of Glory'],
  ['勇魅群星 魅', 'Brave Stars - Charm'],
  ['勇魅群星 勇', 'Brave Stars - Brave'],
  ['胜象星引', 'Victory Star Guide'],
  ['碧海暗影 啸', 'Azure Shadow - Roar'],
  ['碧海暗影 逐', 'Azure Shadow - Pursuit'],
  ['战斗精英', 'Battle Elite'],
  ['对战精英', 'Striking Competition'],
  ['风暴涌现', 'Storming Emergence'],
  ['横空出世 苍', 'Storming Emergence - Verdant'],
  ['横空出世 泽', 'Storming Emergence - Abundant'],
  ['精彩的比赛', 'Battle Party Dream Vol. 1'],
  ['炫奇争胜', 'Battle Party Dream Together'],
  ['闪耀协同效应', 'Shining Synergy'],
  ['交相辉映 沐', 'Shining Synergy - Shower'],
  ['交相辉映 魁', 'Shining Synergy - Supreme'],
  ['交相辉映 唤', 'Shining Synergy - Summon'],
  ['亘古开来', 'Eternal Birth'],
  ['奇迹启程', 'Miracle Journey'],
  ['无畏太晶', 'Fearless Terastal'],
  ['嘉奖回合', 'Bonus Round'],
  ['黑晶炽诚', 'Dark Crystal Blaze'],
  ['真实玄虚', 'Real Fantasy'],
  ['利刃猛醒', 'Blade Awakening'],

  // zh-tw / zh-cn SV
  ['特典卡 朱&紫', 'Scarlet & Violet Promos'],
  ['對戰搭檔', 'Battle Partners'],
  ['火箭隊的榮耀', 'Glory of Team Rocket'],

  // zh-tw SC
  ['劍&盾 SET A', 'Sword & Shield SET A'],
  ['劍&盾 SET B', 'Sword & Shield SET B'],
  ['劍&盾', 'Sword & Shield'],
  ['無極力量 SET A', 'Infinite Power SET A'],
  ['無極力量 SET B', 'Infinite Power SET B'],
  ['無極力量', 'Infinite Power'],
  ['搭檔', 'V Starter Deck Buddy'],
  ['挑戰', 'V Starter Deck Challenge'],
  ['進化', 'V Starter Deck Evolution'],
  ['強大', 'V Starter Deck Power'],
  ['眾星雲集組合篇 SET A', 'Tag Team GX All Stars SET A'],
  ['眾星雲集組合篇 SET B', 'Tag Team GX All Stars SET B'],
  ['眾星雲集組合篇', 'Tag Team GX All Stars'],
  ['美夢成真組合篇 SET A', 'Dream Come True SET A'],
  ['美夢成真組合篇 SET B', 'Dream Come True SET B'],
  ['美夢成真組合篇', 'Dream Come True'],
  ['雙倍爆擊 SET A', 'Double Burst SET A'],
  ['雙倍爆擊 SET B', 'Double Burst SET B'],
  ['雙倍爆擊', 'Double Burst'],
  ['傳說交鋒 SET A', 'Legendary Clash SET A'],
  ['傳說交鋒 SET B', 'Legendary Clash SET B'],
  ['傳說交鋒', 'Legendary Clash'],

  // id / th regional
  ['Kilau Hitam', 'Ruler of the Black Flame'],
  ['Pertemuan Paradoks', 'Paradox Rift'],
  ['Paradoks Andalan', 'Temporal Forces'],
  ['Topeng Transfigurasi', 'Twilight Masquerade'],
  ['Bimbingan Rasi', 'Stellar Crown'],
  ['Kilat Rasi', 'Super Electric Breaker'],
  ['Ikatan Takdir', 'Journey Together'],
  ['Deck Ringkas ex', 'ex Starter Decks'],
  ['Hantaman Triplet', 'Triplet Beat'],
  ['三連音爆', 'Triplet Beat'],
]);
