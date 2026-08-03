#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ctCodeToSetId } from './lib/expansion-map.mjs'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ONLY = JSON.parse(
	fs.readFileSync(path.join(REPO, '../dittos-army-back/data/cardtrader_only_not_in_tcgdex.json'), 'utf8'),
)
const S_ROOT = path.join(REPO, 'data-asia/S')

function cardCount(setId) {
	const dir = path.join(S_ROOT, setId)
	if (!fs.existsSync(dir)) return 0
	return fs.readdirSync(dir).filter((x) => x.endsWith('.ts')).length
}

function isSwshAsia(code) {
	const c = String(code || '').toLowerCase()
	if (/^sv|^csv|^cbb|^me|^m[0-9]|^mp-|^sm[0-9]/.test(c)) return false
	return /^s[0-9]|^cs[0-9]|^sc[0-9]|^sp[0-9]|^s-p|^sc[abcdf]|^sd[lpm]?$|^sn$|^sh$|^si$|^sj$|^sk$|^sf$|^sgg|^sgl|^sek|^sef|^scc/.test(c)
}

const todo = []
for (const item of ONLY.sets ?? []) {
	if (!item?.id || !item?.code) continue
	if (!isSwshAsia(item.code)) continue
	const setId = ctCodeToSetId(item.code)
	if (cardCount(setId) > 0) continue
	todo.push({ id: item.id, code: item.code, setId, name: item.name })
}

// Re-sync sets conocidos incompletos del pedido
for (const [setId, ctId] of [
	['S4a', null],
	['S8b', null],
]) {
	if (cardCount(setId) > 0) {
		// find cardtrader id from set file
		const src = fs.readFileSync(path.join(S_ROOT, `${setId}.ts`), 'utf8')
		const m = src.match(/cardtrader:\s*(\d+)/)
		if (m) todo.push({ id: Number(m[1]), code: setId.toLowerCase(), setId, name: setId, overwrite: true })
	}
}

const seen = new Set()
const unique = todo.filter((t) => {
	if (seen.has(t.id)) return false
	seen.add(t.id)
	return true
})

fs.writeFileSync(
	path.join(REPO, 'meta/cardtrader-imports/swsh-asia-queue.json'),
	JSON.stringify(unique, null, 2),
)
console.log(unique.length)
