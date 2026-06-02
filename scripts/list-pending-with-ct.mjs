import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')

const homolog = JSON.parse(
	fs.readFileSync(path.resolve(REPO_ROOT, '../dittos-army-back/data/cardtrader_tcgdex_homolog.json'), 'utf8'),
)
const ctBySetId = new Map()
for (const entry of Object.values(homolog.sets ?? {})) {
	const id = entry.tcgdex_set_id
	const ct = entry.cardtrader?.id
	if (id && ct) ctBySetId.set(id, { ctId: ct, name: entry.names?.en_cardtrader })
}

const root = path.join(REPO_ROOT, 'data-asia')
const pending = []

for (const serie of fs.readdirSync(root, { withFileTypes: true })) {
	if (!serie.isDirectory()) continue
	const sp = path.join(root, serie.name)
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
		const ct = ctBySetId.get(setId)
		pending.push({
			serie: serie.name,
			setId,
			en,
			ctId: ct?.ctId ?? null,
		})
	}
}

const withCt = pending.filter((p) => p.ctId)
console.log(`Sin cartas: ${pending.length} | con CT en homolog: ${withCt.length}`)
for (const p of withCt) {
	console.log(`${p.ctId}\t${p.serie}/${p.setId}\t${p.en ?? ''}`)
}
