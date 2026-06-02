const VERBOSE = process.env.SERVER_VERBOSE === '1'

export function isVerboseStartup(): boolean {
	return VERBOSE
}

export function startupDetail(message: string): void {
	if (VERBOSE) {
		console.log(message)
	}
}

export function renderStartupProgress(label: string, current: number, total: number): void {
	const width = 28
	const safeTotal = Math.max(total, 1)
	const ratio = Math.min(current / safeTotal, 1)
	const filled = Math.round(ratio * width)
	const bar = '█'.repeat(filled) + '░'.repeat(width - filled)
	const pct = Math.round(ratio * 100).toString().padStart(3, ' ')
	process.stderr.write(`\r\x1b[2K${label} [${bar}] ${pct}%`)
}

export function finishStartup(message: string): void {
	process.stderr.write(`\r\x1b[2K${message}\n`)
}

export function warnStartup(message: string): void {
	if (VERBOSE) {
		console.warn(message)
	}
}
