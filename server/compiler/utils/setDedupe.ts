import { readFileSync } from 'node:fs'
import type { Set } from '../../../interfaces.d.ts'
import { resolveText } from './util'

export function parseSetIdFromSource(setFilePath: string): string | undefined {
	try {
		const src = readFileSync(setFilePath, 'utf8')
		return src.match(/\bid:\s*['"]([^'"]+)['"]/)?.[1]
	} catch {
		return undefined
	}
}

export function scoreSetSourceCandidate(
	canonicalId: string,
	fileBase: string,
	cardFileCount: number,
	set?: Set,
): number {
	let score = cardFileCount * 10
	if (fileBase === canonicalId) {
		score += 200
	} else if (fileBase.toLowerCase() === canonicalId.toLowerCase()) {
		score += 120
	}
	if (set && resolveText(set.name, 'en')) {
		score += 15
	}
	return score
}

export function dedupeSetCandidates<T extends { canonicalId: string; fileBase: string; cardFileCount: number; set?: Set }>(
	candidates: T[],
): T[] {
	const byKey = new Map<string, T>()
	for (const candidate of candidates) {
		const key = candidate.canonicalId.toLowerCase()
		const prev = byKey.get(key)
		if (!prev) {
			byKey.set(key, candidate)
			continue
		}
		const prevScore = scoreSetSourceCandidate(
			prev.canonicalId,
			prev.fileBase,
			prev.cardFileCount,
			prev.set,
		)
		const nextScore = scoreSetSourceCandidate(
			candidate.canonicalId,
			candidate.fileBase,
			candidate.cardFileCount,
			candidate.set,
		)
		if (nextScore > prevScore) {
			byKey.set(key, candidate)
		}
	}
	return [...byKey.values()]
}
