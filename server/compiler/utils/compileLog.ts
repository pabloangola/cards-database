import type { SupportedLanguages } from '../../../interfaces.d.ts'

const USE_COLOR = !process.env.NO_COLOR && process.stdout.isTTY

const c = {
	reset: USE_COLOR ? '\x1b[0m' : '',
	bold: USE_COLOR ? '\x1b[1m' : '',
	dim: USE_COLOR ? '\x1b[2m' : '',
	green: USE_COLOR ? '\x1b[32m' : '',
	yellow: USE_COLOR ? '\x1b[33m' : '',
	cyan: USE_COLOR ? '\x1b[36m' : '',
	magenta: USE_COLOR ? '\x1b[35m' : '',
	blue: USE_COLOR ? '\x1b[34m' : '',
	gray: USE_COLOR ? '\x1b[90m' : '',
}

function fmt(style: string, text: string): string {
	return `${style}${text}${c.reset}`
}

function formatDuration(ms: number): string {
	if (ms < 1000) {
		return `${ms}ms`
	}
	return `${(ms / 1000).toFixed(1)}s`
}

function formatIds(ids: string[], max = 12): string {
	if (ids.length === 0) {
		return '—'
	}
	const sorted = [...ids].sort((a, b) => a.localeCompare(b))
	if (sorted.length <= max) {
		return sorted.join(', ')
	}
	const shown = sorted.slice(0, max).join(', ')
	return `${shown} ${c.dim}(+${sorted.length - max} más)${c.reset}`
}

function progressBar(ratio: number, width = 24): string {
	const clamped = Math.max(0, Math.min(1, ratio))
	const filled = Math.round(clamped * width)
	const empty = width - filled
	return `${c.cyan}${'█'.repeat(filled)}${c.gray}${'░'.repeat(empty)}${c.reset}`
}

export interface CompileBannerOptions {
	langs: SupportedLanguages[]
	concurrency: number
	localMode: boolean
	skipGit: boolean
	force: boolean
}

export class CompileLogger {
	private readonly startedAt = Date.now()
	private langIndex = 0
	private readonly langTotal: number
	private stepIndex = 0
	private readonly stepTotal: number
	private rebuiltTotal = 0
	private cachedTotal = 0

	constructor(langTotal: number, stepTotal: number) {
		this.langTotal = langTotal
		this.stepTotal = stepTotal
	}

	banner(opts: CompileBannerOptions): void {
		console.log('')
		console.log(fmt(c.bold + c.cyan, '╔══════════════════════════════════════════════════════════╗'))
		console.log(fmt(c.bold + c.cyan, '║  TCGdex — compilación de catálogo                        ║'))
		console.log(fmt(c.bold + c.cyan, '╚══════════════════════════════════════════════════════════╝'))
		console.log('')

		const flags = [
			opts.localMode ? 'modo local' : 'modo CI',
			'caché por expansión',
			`${opts.concurrency} workers`,
			opts.skipGit ? 'sin git log' : 'git log',
			opts.force ? fmt(c.yellow, 'FORCE') : undefined,
		].filter(Boolean)

		console.log(`  ${fmt(c.dim, flags.join(' · '))}`)
		console.log(`  ${fmt(c.dim, 'idiomas:')} ${fmt(c.bold, opts.langs.join(', '))}`)
		console.log('')
	}

	phase(title: string): void {
		console.log(fmt(c.bold, `▸ ${title}`))
	}

	phaseOk(detail?: string): void {
		console.log(`  ${fmt(c.green, '✓')} ${detail ?? 'ok'}`)
	}

	langStart(lang: SupportedLanguages): void {
		this.langIndex++
		console.log('')
		console.log(
			fmt(
				c.bold + c.magenta,
				`━━ ${lang} (${this.langIndex}/${this.langTotal}) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
			),
		)
	}

	private stepLabel(lang: SupportedLanguages, endpoint: string): string {
		return `${lang}/${endpoint}`
	}

	endpointCacheHit(lang: SupportedLanguages, endpoint: string, detail?: string): void {
		this.stepIndex++
		const pct = ((this.stepIndex / this.stepTotal) * 100).toFixed(0)
		console.log(
			`  ${fmt(c.gray, `[${pct}%]`)} ${fmt(c.green, '✓ caché')} ${fmt(c.dim, this.stepLabel(lang, endpoint))}${detail ? ` ${fmt(c.dim, `— ${detail}`)}` : ''}`,
		)
	}

	endpointRebuilt(lang: SupportedLanguages, endpoint: string, detail?: string): void {
		this.stepIndex++
		const pct = ((this.stepIndex / this.stepTotal) * 100).toFixed(0)
		console.log(
			`  ${fmt(c.gray, `[${pct}%]`)} ${fmt(c.yellow, '▶ build')} ${fmt(c.dim, this.stepLabel(lang, endpoint))}${detail ? ` ${fmt(c.dim, `— ${detail}`)}` : ''}`,
		)
	}

	expansionPlan(
		lang: SupportedLanguages,
		endpoint: string,
		rebuilt: string[],
		cached: string[],
	): void {
		const total = rebuilt.length + cached.length
		console.log(`  ${fmt(c.dim, `┌─ ${lang}/${endpoint} ─`)}`)
		console.log(`  ${fmt(c.dim, '│')}`)
		console.log(
			`  ${fmt(c.dim, '│')}  ${fmt(c.green, `✓ ${cached.length}`)} ${fmt(c.dim, 'en caché')}   ${fmt(c.yellow, `▶ ${rebuilt.length}`)} ${fmt(c.dim, `a compilar`)}   ${fmt(c.gray, `(${total} expansiones)`)}`,
		)
		if (rebuilt.length > 0) {
			console.log(
				`  ${fmt(c.dim, '│')}  ${fmt(c.yellow, 'compilar:')} ${formatIds(rebuilt)}`,
			)
		}
		if (cached.length > 0 && rebuilt.length === 0) {
			console.log(
				`  ${fmt(c.dim, '│')}  ${fmt(c.green, 'caché:')} ${formatIds(cached, 8)}`,
			)
		} else if (cached.length > 0 && process.env.COMPILE_VERBOSE === '1') {
			console.log(
				`  ${fmt(c.dim, '│')}  ${fmt(c.green, 'caché:')} ${formatIds(cached, 8)}`,
			)
		}
	}

	expansionProgress(
		lang: SupportedLanguages,
		endpoint: string,
		done: number,
		total: number,
		currentId: string,
	): void {
		if (total === 0) {
			return
		}
		const bar = progressBar(done / total)
		const line = `  ${fmt(c.dim, '│')}  ${bar} ${fmt(c.bold, `${done}/${total}`)} ${fmt(c.yellow, currentId)}`
		if (process.stdout.isTTY) {
			process.stdout.write(`\r${line.padEnd(72)}`)
		} else if (done === total || done % Math.max(1, Math.floor(total / 8)) === 0) {
			console.log(line)
		}
	}

	expansionProgressDone(): void {
		if (process.stdout.isTTY) {
			process.stdout.write('\n')
		}
	}

	endpointExpansionSummary(
		lang: SupportedLanguages,
		endpoint: string,
		opts: {
			rebuilt: number
			cached: number
			elapsedMs: number
			extra?: string
		},
	): void {
		this.stepIndex++
		this.rebuiltTotal += opts.rebuilt
		this.cachedTotal += opts.cached
		const parts = [
			fmt(c.green, `${opts.cached} caché`),
			opts.rebuilt > 0 ? fmt(c.yellow, `${opts.rebuilt} compiladas`) : undefined,
			fmt(c.dim, formatDuration(opts.elapsedMs)),
			opts.extra,
		].filter(Boolean)
		const pct = ((this.stepIndex / this.stepTotal) * 100).toFixed(0)
		console.log(
			`  ${fmt(c.dim, '│')}  ${fmt(c.bold, '✓')} ${fmt(c.gray, `[${pct}%]`)} ${this.stepLabel(lang, endpoint)} — ${parts.join(fmt(c.dim, ' · '))}`,
		)
		console.log(`  ${fmt(c.dim, '└' + '─'.repeat(54))}`)
	}

	finalSummary(): void {
		const elapsed = Date.now() - this.startedAt
		console.log('')
		console.log(fmt(c.bold + c.cyan, '──────────────────────────────────────────────────────────'))
		console.log(
			`  ${fmt(c.bold, 'Listo')} ${fmt(c.dim, 'en')} ${fmt(c.bold, formatDuration(elapsed))}`,
		)
		console.log(
			`  ${fmt(c.dim, 'expansiones:')} ${fmt(c.green, `${this.cachedTotal} caché`)} ${fmt(c.dim, '·')} ${fmt(c.yellow, `${this.rebuiltTotal} compiladas`)}`,
		)
		console.log(fmt(c.bold + c.cyan, '──────────────────────────────────────────────────────────'))
		console.log('')
	}
}
