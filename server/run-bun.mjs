import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const bunName = process.platform === 'win32' ? 'bun.exe' : 'bun'
const candidates = [
	path.join(os.homedir(), '.bun', 'bin', bunName),
	bunName,
]

const bun = candidates.find((candidate) => candidate === bunName || existsSync(candidate))
if (!bun) {
	console.error(
		'bun no encontrado. Instálalo desde https://bun.sh o añade %USERPROFILE%\\.bun\\bin al PATH.',
	)
	process.exit(1)
}

const args = process.argv.slice(2)
const result = spawnSync(bun, args, { stdio: 'inherit' })
process.exit(result.status ?? 1)
