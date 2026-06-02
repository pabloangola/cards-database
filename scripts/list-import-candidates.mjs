import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')

const ctOnly = JSON.parse(
	fs.readFileSync(path.resolve(REPO_ROOT, '../dittos-army-back/data/cardtrader_only_not_in_tcgdex.json'), 'utf8'),
).sets

const ctByName = new Map(ctOnly.map((s) => [s.name.toLowerCase(), s]))
const stubs = []

for (const serie of fs.readdirSync(path.join(REPO_ROOT, 'data-asia'), { withFileTypes: true })) {
	if (!serie.isDirectory()) continue
	const sp = path.join(REPO_ROOT, 'data-asia', serie.name)
	for (const f of fs.readdirSync(sp)) {
		if (!f.endsWith('.ts')) continue
		const setId = f.replace('.ts', '')
		const cardsDir = path.join(sp, setId)
		const hasCards =
			fs.existsSync(cardsDir) &&
			fs.readdirSync(cardsDir).some((x) => x.endsWith('.ts'))
		if (hasCards) continue
		const src = fs.readFileSync(path.join(sp, f), 'utf8')
		const en = src.match(/\ben:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
		if (!en) continue
		const ct = ctByName.get(en.toLowerCase())
		if (ct) stubs.push({ serie: serie.name, setId, nameEn: en, ctId: ct.id, ctCode: ct.code })
	}
}

console.log(JSON.stringify(stubs, null, 2))
