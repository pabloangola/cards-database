import os from 'node:os'

/** Worker pool for I/O-bound compile tasks (dynamic imports, disk). */
export function resolveCompileConcurrency(): number {
	const fromEnv = Number(process.env.COMPILE_CONCURRENCY)
	if (Number.isFinite(fromEnv) && fromEnv > 0) {
		return Math.floor(fromEnv)
	}
	return Math.max(2, (os.cpus().length || 4) - 1)
}

export async function runPool<T, R>(
	items: readonly T[],
	worker: (item: T, index: number) => Promise<R>,
	concurrency: number,
): Promise<R[]> {
	if (items.length === 0) {
		return []
	}

	const limit = Math.max(1, Math.min(concurrency, items.length))
	const results: R[] = new Array(items.length)
	let nextIndex = 0

	await Promise.all(
		Array.from({ length: limit }, async () => {
			while (true) {
				const index = nextIndex++
				if (index >= items.length) {
					break
				}
				results[index] = await worker(items[index], index)
			}
		}),
	)

	return results
}
