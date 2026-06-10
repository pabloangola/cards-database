/**
 * Warns when compiled catalog data is missing before starting the server.
 */
import { existsSync, statSync } from 'node:fs'

const EN_CARDS = './generated/en/cards.json'
const MIN_BYTES = 1024

if (!existsSync(EN_CARDS) || statSync(EN_CARDS).size < MIN_BYTES) {
	console.error('')
	console.error('[tcgdex] No hay datos compilados en generated/en/.')
	console.error('[tcgdex] Ejecuta desde cards-database/server:  npm run compile')
	console.error('[tcgdex] Solo inglés (más rápido):  $env:COMPILE_LANGS="en"; npm run compile')
	console.error('')
	process.exit(1)
}
