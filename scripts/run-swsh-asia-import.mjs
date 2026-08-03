#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const queue = JSON.parse(
	fs.readFileSync(path.join(REPO, 'meta/cardtrader-imports/swsh-asia-queue.json'), 'utf8'),
)

for (let i = 0; i < queue.length; i++) {
	const t = queue[i]
	const args = [
		'scripts/import-cardtrader-expansion.mjs',
		'--expansion-id',
		String(t.id),
		'--set-id',
		t.setId,
		'--serie',
		'S',
		'--locale',
		'ja',
		'--delay-ms',
		'2500',
	]
	if (t.overwrite) args.push('--overwrite-cards', '--force-set')
	if (i === queue.length - 1) args.push('--compile', '--compile-langs', 'ja,en')
	spawnSync(process.execPath, args, { cwd: REPO, stdio: 'inherit' })
}
