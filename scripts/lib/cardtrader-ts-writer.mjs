import fs from 'node:fs/promises'
import path from 'node:path'

function esc(str) {
	return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export async function ensureSerieFile(dataRoot, serieFolder, locale) {
	const seriePath = path.join(dataRoot, `${serieFolder}.ts`)
	try {
		await fs.access(seriePath)
		return seriePath
	} catch {
		// create minimal serie
	}
	const nameBlock =
		locale === 'en'
			? `\n\t\ten: '${esc(serieFolder)}',\n\t`
			: `\n\t\ten: '${esc(serieFolder)}',\n\t\tja: '${esc(serieFolder)}',\n\t`
	const content = `import { Serie } from '../interfaces'

const serie: Serie = {
\tid: '${esc(serieFolder)}',
\tname: {${nameBlock}}
}

export default serie
`
	await fs.mkdir(path.dirname(seriePath), { recursive: true })
	await fs.writeFile(seriePath, content, 'utf8')
	return seriePath
}

export async function writeSetFile(target, expansion, cardCount, { forceSet = false } = {}) {
	const { setFilePath, serieFolder, setId, isNewSet, locale } = target
	if (!isNewSet && !forceSet) {
		return { written: false, path: setFilePath }
	}

	await ensureSerieFile(target.dataRoot, serieFolder, locale)

	const importDepth = setFilePath.includes('data-asia') ? '../../' : '../../'
	const content = `import { Set } from '${importDepth}interfaces'
import serie from '../${serieFolder}'

const set: Set = {
\tid: '${esc(setId)}',
\tname: {
\t\ten: '${esc(expansion.name)}',
${locale !== 'en' ? `\t\tja: '${esc(expansion.name)}',\n` : ''}\t},

\tserie: serie,

\tcardCount: {
\t\tofficial: ${cardCount}
\t},

\treleaseDate: '${new Date().toISOString().slice(0, 10)}',

\tthirdParty: {
\t\tcardtrader: ${expansion.id}
\t}
}

export default set
`
	await fs.mkdir(path.dirname(setFilePath), { recursive: true })
	await fs.writeFile(setFilePath, content, 'utf8')
	return { written: true, path: setFilePath }
}

export async function patchSetCardCount(setFilePath, cardCount) {
	let src = await fs.readFile(setFilePath, 'utf8')
	if (/official:\s*\d+/.test(src)) {
		src = src.replace(/official:\s*\d+/, `official: ${cardCount}`)
	} else if (/cardCount:\s*\{/.test(src)) {
		src = src.replace(/cardCount:\s*\{/, `cardCount: {\n\t\tofficial: ${cardCount},`)
	} else {
		src = src.replace(
			/(\tserie: serie,?\n)/,
			`$1\n\tcardCount: {\n\t\tofficial: ${cardCount}\n\t},\n`,
		)
	}
	if (!/cardtrader:\s*\d+/.test(src) && /thirdParty:\s*\{/.test(src)) {
		src = src.replace(/thirdParty:\s*\{/, 'thirdParty: {\n\t\tcardtrader: 0,')
	}
	await fs.writeFile(setFilePath, src, 'utf8')
}

export async function writeCardFile({
	cardsDir,
	setId,
	localId,
	cardName,
	category,
	rarity,
	blueprintId,
	locale,
	skipExisting = true,
}) {
	const cardPath = path.join(cardsDir, `${localId}.ts`)
	if (skipExisting) {
		try {
			await fs.access(cardPath)
			return { written: false, path: cardPath, localId }
		} catch {
			// new
		}
	}

	const interfacesImport = cardsDir.includes('data-asia')
		? '../../../interfaces'
		: '../../../../interfaces'
	const rarityLine = rarity ? `\n\trarity: '${esc(rarity)}',` : ''
	const nameLines =
		locale === 'en'
			? `\t\ten: '${esc(cardName)}',`
			: `\t\ten: '${esc(cardName)}',\n\t\tja: '${esc(cardName)}',`

	const content = `import { Card } from "${interfacesImport}"
import Set from "../${setId}"

const card: Card = {
\tset: Set,

\tname: {
${nameLines}
\t},

\tcategory: '${esc(category)}',${rarityLine}

\tvariants: [{
\t\ttype: 'normal',
\t\tthirdParty: {
\t\t\tcardtrader: ${blueprintId}
\t\t}
\t}],
}

export default card
`
	await fs.mkdir(cardsDir, { recursive: true })
	await fs.writeFile(cardPath, content, 'utf8')
	return { written: true, path: cardPath, localId }
}
