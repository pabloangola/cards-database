import Queue from '@dzeio/queue'
import { glob } from 'glob'
import { exec, spawn } from 'node:child_process'
import type { Card, Languages, Set, SupportedLanguages } from '../../../interfaces.d.ts'
import * as legals from '../../../meta/legals'

/** Local dev: skip git timestamps unless CI or SKIP_GIT_TIMESTAMPS=0. */
export function isLocalDevCompile(): boolean {
	if (process.env.LOCAL_COMPILE === '0') {
		return false
	}
	if (process.env.LOCAL_COMPILE === '1') {
		return true
	}
	return process.env.CI !== 'true' && process.env.GITHUB_ACTIONS !== 'true'
}

export function shouldSkipGitTimestamps(): boolean {
	if (process.env.SKIP_GIT_TIMESTAMPS === '0') {
		return false
	}
	if (process.env.SKIP_GIT_TIMESTAMPS === '1') {
		return true
	}
	return isLocalDevCompile()
}
interface fileCacheInterface {
	[key: string]: any
}

export const DB_PATH = "../"

const fileCache: fileCacheInterface = {}

/**
 * Fetch a JSON file from a remote location
 * @param url the URL to fetch
 * @returns the JSON file content
 */
export async function fetchRemoteFile<T = any>(url: string): Promise<T> {
	if (!fileCache[url]) {
		const signal = new AbortController()

		const finished = setTimeout(() => {
			signal.abort()
		}, 60 * 1000);

		const resp = await fetch(url, {
			signal: signal.signal
		})
		clearTimeout(finished)
		fileCache[url] = resp.json()
	}
	return fileCache[url]
}

const globCache: Record<string, Array<string>> = {}

export async function smartGlob(query: string): Promise<Array<string>> {
	if (!globCache[query]) {
		globCache[query] = await glob(query)
	}
	return globCache[query]
}

/**
 * Check if a card is currently Legal
 * @param type the type of legality
 * @param card the card to check
 * @param localId the card localid
 * @returns {boolean} if the card is currently in the legal type
 */
export function cardIsLegal(type: 'standard' | 'expanded', card: Card, localId: string): boolean {
	const legal = legals[type]
	if (
		legal.includes.series.includes(card.set.serie.id) ||
		legal.includes.sets.includes(card.set.id) ||
		card.energyType === "Normal" ||
		card.regulationMark && legal.includes.regulationMark.includes(card.regulationMark)
	) {
		return !(
			legal.excludes.sets.includes(card.set.id) ||
			(type === 'standard' && card.types?.includes("Fairy")) ||
			legal.excludes.cards.includes(`${card.set.id}-${localId}`)
		)
	}

    return false;
}

/**
 * Check if a set is currently Legal
 * @param type the type of legality
 * @param set the set to check
 * @returns {boolean} if the set is currently in the legal type
 */
export function setIsLegal(type: 'standard' | 'expanded', set: Set): boolean {
	const legal = legals[type]
	if (
		legal.includes.series.includes(set.serie.id) ||
		legal.includes.sets.includes(set.id)
	) {
		return !legal.excludes.sets.includes(set.id)
	}
	return false
}

export function getDataFolder(lang: SupportedLanguages) {
	return ['ja', 'ko', 'zh-tw', 'id', 'th', 'zh-cn'].includes(lang) ? 'data-asia' : 'data'
}

/**
 * run a command on the OS, it uses Spawn by default because exec seems to have a bug linked to the Buffer
 *
 * @param command the command to run
 * @param useSpawn select the method to use to run the command
 * @returns a string with the stdout
 */
function runCommand(command: string, useSpawn = true): Promise<string> {
	if (!useSpawn) {
		return new Promise<string>((res, rej) => {
			exec(command, (err, out) => {
				if (err) {
					rej(err)
				}
				res(out)
			})
		})
	}
	const splitted = command.split(' ')
	command = splitted.shift()!

	return new Promise<string>((res, rej) => {
		const cmd = spawn(command, splitted)
		let out: string = ''
		cmd.stdout.on('data', (data) => {
			out += data.toString()
		})

		cmd.on('close', (code) => {
			if (code !== 0) {
				console.log(`command exited with code ${code}`);
				rej(code)
				return
			}
			res(out)
		})
	})
}

const lastEditsCache: Record<string, string> = {}

export async function loadLastEditsForPaths(relativePaths: string[]): Promise<void> {
	if (shouldSkipGitTimestamps()) {
		return
	}

	const uniquePaths = [...new Set(relativePaths.map((p) => p.replace(/\\/g, '/')))]
	if (uniquePaths.length === 0) {
		return
	}

	console.log(`Loading Git last-edit for ${uniquePaths.length} changed files...`)
	let processed = 0
	const concurrent = process.platform === 'win32' ? 10 : 100
	const queue = new Queue(concurrent, 10)
	queue.start()

	for (const file of uniquePaths) {
		if (lastEditsCache[file]) {
			continue
		}
		await queue.add(runCommand(`git log -1 --pretty="format:%cd" --date=iso-strict "${file}"`, false).then((res) => {
			lastEditsCache[file] = res
		}).catch(() => {
			// fall back to "now" in getLastEdit
		}).finally(() => {
			processed++
			if (processed % 250 === 0 || processed === uniquePaths.length) {
				console.log('loaded', processed, 'out of', uniquePaths.length, 'files')
			}
		}))
	}
	await queue.waitEnd()
}

export function getLastEdit(path: string): string {
	const date = lastEditsCache[path]
	if (!date) {
		return new Date().toISOString()
		// throw new Error(`edit date not found for file ${path}`)
	}
	return date
}

export function resolveText<T>(text: Languages<T> | undefined, lang: SupportedLanguages): T | undefined {
	if (!text) return text as undefined
	let res: T | undefined = text[lang]
	if (typeof res === 'undefined' && !lang.includes('-')) {
		const key = Object.keys(text).find(key => key.startsWith(lang))
		return text[key as keyof Languages<T>]
	}
	return res
}
