/**
 * Direct TCGdex set id -> English display label (CardTrader / Bulbapedia / official product names).
 * Used when jp_set_translations or ja-name lookup is insufficient (CN/TW/SEA regional sets, promos).
 */
export const tcgdexSetEnglishById = new Map<string, string>([
  // DPt
  ['Pt1', 'Galactic\'s Conquest'],
  ['Pt2', 'Bonds to the End of Time'],
  ['Pt3', 'Beat of the Frontier'],
  ['Pt4', 'Advent of Arceus'],

  // e-Card
  ['E1', 'Base Expansion Pack'],
  ['E2', 'The Town on No Map'],
  ['E3', 'Wind from the Sea'],
  ['E4', 'Split Earth'],
  ['E5', 'Mysterious Mountains'],

  // HeartGold / SoulSilver (L)
  ['L1a', 'HeartGold Collection'],
  ['L1b', 'SoulSilver Collection'],
  ['L2', 'Reviving Legends'],
  ['L3', 'Clash at the Summit'],
  ['LL', 'Lost Link'],

  // BW (TCGdex ids; jp_set_translations uses BW3h/BW3p)
  ['BW1a', 'Black Collection'],
  ['BW1b', 'White Collection'],
  ['BW3a', 'Hail Blizzard'],
  ['BW3b', 'Psycho Drive'],

  // neo
  ['neo1', 'Neo Genesis'],
  ['neo2', 'Neo Discovery'],
  ['neo3', 'Neo Revelation'],
  ['neo4', 'Neo Destiny'],

  // PCG
  ['PCG1', 'Flight of Legends'],
  ['PCG2', 'Clash of the Blue Sky'],
  ['PCG3', 'Rocket Gang Strikes Back'],
  ['PCG4', 'Golden Sky, Silvery Ocean'],
  ['PCG5', 'Mirage Forest'],
  ['PCG6', 'Holon Research Tower'],
  ['PCG7', 'Holon Phantom'],
  ['PCG8', 'Miracle Crystal'],
  ['PCG9', 'Offense and Defense of the Furthest Ends'],
  ['PCG10', 'World Champions Pack'],

  // Original (PMCG)
  ['PMCG2', 'Pokémon Jungle'],
  ['PMCG3', 'Mystery of the Fossils'],
  ['PMCG4', 'Team Rocket'],
  ['PMCG5', 'Leaders\' Stadium'],
  ['PMCG6', 'Challenge from the Darkness'],

  // VS / web
  ['VS1', 'Pokémon Card ★VS'],
  ['web1', 'Pokémon Card ★web'],

  // Sun & Moon enhanced / plus
  ['SM1+', 'Sun & Moon plus'],
  ['SM2+', 'Facing a New Trial'],
  ['SM3+', 'Shining Legends'],
  ['SM4+', 'GX Battle Boost'],
  ['SM5+', 'Ultra Force'],

  // Promos (Asia)
  ['S-P', 'Sword & Shield Promos'],
  ['SM-P', 'Sun & Moon Promos'],
  ['SV-P', 'Scarlet & Violet Promos'],

  // Regional SV compilations (ID/TH)
  ['SV3s', 'Ruler of the Black Flame'],
  ['SV4s', 'Paradox Rift'],
  ['SV5s', 'Temporal Forces'],
  ['SV6s', 'Twilight Masquerade'],
  ['SV7s', 'Stellar Crown'],
  ['SV8s', 'Super Electric Breaker'],
  ['SV9s', 'Journey Together'],
  ['SVDs', 'ex Starter Decks'],

  // Simplified Chinese — Sword & Shield (CS*)
  ['CS1a', 'Dynamax Clash - Thunder'],
  ['CS1b', 'Dynamax Clash - Flame'],
  ['CS1.5', 'Dynamax Tactics'],
  ['CS1aC', 'Storming Emergence - Radiant'],
  ['CS1bC', 'Dynamax Clash - Flame'],
  ['CS1.5C', 'Dynamax Tactics'],
  ['CS2a', 'Vivid Portrayals - Obsidian'],
  ['CS2b', 'Vivid Portrayals - Indigo'],
  ['CS2.5', 'Brilliant Counterattack'],
  ['CS2aC', 'Vivid Portrayals - Obsidian'],
  ['CS2bC', 'Vivid Portrayals - Indigo'],
  ['CS2.5C', 'Brilliant Counterattack'],
  ['CS3a', 'Primordial Arts - Overgrow'],
  ['CS3b', 'Primordial Arts - Torrent'],
  ['CS3.5', 'Scorching Skies'],
  ['CS3aC', 'Primordial Arts - Overgrow'],
  ['CS3bC', 'Primordial Arts - Torrent'],
  ['CS3.5C', 'Scorching Skies'],
  ['CS3D', 'Primordial Arts'],
  ['CS4a', 'Nine Colors Gathering - Friends'],
  ['CS4b', 'Nine Colors Gathering - Origin'],
  ['CS4.5', 'Final Flame Dance'],
  ['CS4aC', 'Nine Colors Gathering - Friends'],
  ['CS4bC', 'Nine Colors Gathering - Origin'],
  ['CS4.5C', 'Final Flame Dance'],
  ['CS4Da', 'Nine Colors Gathering'],
  ['CS5aC', 'Brave Stars - Charm'],
  ['CS5bC', 'Brave Stars - Brave'],
  ['CS5.5C', 'Shadow of Glory'],
  ['CS6aC', 'Azure Shadow - Roar'],
  ['CS6bC', 'Azure Shadow - Pursuit'],
  ['CS6.5C', 'Victory Star Guide'],
  ['CSA', 'Triplet Beat'],

  // Simplified Chinese — Sun & Moon (CSM*, lowercase ids in DB)
  ['CSM1a', 'Storming Emergence'],
  ['csm1a', 'Storming Emergence'],
  ['CSM1b', 'Storming Emergence'],
  ['csm1b', 'Storming Emergence'],
  ['CSM1c', 'Storming Emergence'],
  ['csm1c', 'Storming Emergence'],
  ['CSM1aC', 'Storming Emergence - Radiant'],
  ['CSM1bC', 'Storming Emergence - Verdant'],
  ['CSM1cC', 'Storming Emergence - Abundant'],
  ['CSM1.5', 'Battle Elite'],
  ['csm1.5', 'Battle Elite'],
  ['CSM1.5C', 'Striking Competition'],
  ['CSM2a', 'Shining Synergy'],
  ['csm2a', 'Shining Synergy'],
  ['CSM2b', 'Shining Synergy'],
  ['csm2b', 'Shining Synergy'],
  ['CSM2c', 'Shining Synergy'],
  ['csm2c', 'Shining Synergy'],
  ['CSM2aC', 'Shining Synergy - Shower'],
  ['CSM2bC', 'Shining Synergy - Supreme'],
  ['CSM2cC', 'Shining Synergy - Summon'],
  ['CSM2.5', 'Battle Party Dream Vol. 1'],
  ['csm2.5', 'Battle Party Dream Vol. 1'],
  ['CSM2.5C', 'Battle Party Dream Together'],
  ['CSMPiC', 'Battle Party Dream Vol. 1'],

  // Simplified Chinese — Scarlet & Violet (CSV*)
  ['CSV1C', 'Eternal Birth'],
  ['CSV2C', 'Miracle Journey'],
  ['CSV3C', 'Fearless Terastal'],
  ['CSV4C', 'Bonus Round'],
  ['CSV5C', 'Dark Crystal Blaze'],
  ['CSV6C', 'Real Fantasy'],
  ['CSV7C', 'Blade Awakening'],

  // Traditional Chinese / SEA — Sword & Shield (SC*)
  ['SC1a', 'Sword & Shield SET A'],
  ['SC1b', 'Sword & Shield SET B'],
  ['SC1D', 'Sword & Shield'],
  ['SC2a', 'Infinite Power SET A'],
  ['SC2b', 'Infinite Power SET B'],
  ['SC2D', 'Infinite Power'],
  ['SC3a', 'Shiny VMAX Collection SET A'],
  ['SC3b', 'Shiny VMAX Collection SET B'],
  ['SCA', 'V Starter Deck Buddy'],
  ['SCB', 'V Starter Deck Challenge'],
  ['SCC', 'V Starter Deck Evolution'],
  ['SCD', 'V Starter Deck Power'],
  ['SCE', 'Great Power'],
  ['SCF', 'Transformation'],
  ['SDL', 'Charizard'],
  ['SDM', 'Mewtwo'],
  ['SDP', 'Pikachu'],

  // Sun & Moon TW (AC*)
  ['AC1a', 'Tag Team GX All Stars SET A'],
  ['AC1b', 'Tag Team GX All Stars SET B'],
  ['AC1D', 'Tag Team GX All Stars'],
  ['AC2a', 'Dream Come True SET A'],
  ['AC2b', 'Dream Come True SET B'],
  ['AC2D', 'Dream Come True'],
  ['AC3a', 'TAG TEAM Collection SET A'],
  ['AC3b', 'TAG TEAM Collection SET B'],
  ['AC3D', 'TAG TEAM Collection'],

  // Sun & Moon SEA (AS*)
  ['AS1a', 'Sun & Moon First Impact SET A'],
  ['AS1b', 'Sun & Moon First Impact SET B'],
  ['AS1D', 'Sun & Moon First Impact'],
  ['AS2a', 'Legendary Awakening SET A'],
  ['AS2b', 'Legendary Awakening SET B'],
  ['AS2D', 'Legendary Awakening'],
  ['AS3a', 'Hidden Shadows SET A'],
  ['AS3b', 'Hidden Shadows SET B'],
  ['AS3D', 'Hidden Shadows'],
  ['AS4a', 'Sky Ruler SET A'],
  ['AS4b', 'Sky Ruler SET B'],
  ['AS4D', 'Sky Ruler'],
  ['AS5a', 'Double Burst SET A'],
  ['AS5b', 'Double Burst SET B'],
  ['AS5D', 'Double Burst'],
  ['AS6a', 'Legendary Clash SET A'],
  ['AS6b', 'Legendary Clash SET B'],
  ['AS6D', 'Legendary Clash'],

  // Wrong ids in data-asia files (sv1a used for CS sets)
  ['sv1a', 'Triplet Beat'],
]);
