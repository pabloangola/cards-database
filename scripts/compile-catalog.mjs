#!/usr/bin/env node
/**
 * Compila el catálogo TCGdex local (una pasada).
 * COMPILE_LANGS=ja (default) | ja,en | …
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const serverRoot = path.join(repoRoot, 'server')
const compileLangs = process.env.COMPILE_LANGS?.trim() || 'ja'

console.log(`Compilando catálogo (COMPILE_LANGS=${compileLangs})…`)

const result = spawnSync('npm', ['run', 'compile'], {
	cwd: serverRoot,
	stdio: 'inherit',
	shell: true,
	env: {
		...process.env,
		COMPILE_LANGS: compileLangs,
	},
})

process.exit(result.status ?? 1)
