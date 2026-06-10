/**
 * Dev daemon: watches source/data changes, runs incremental compile when needed,
 * and restarts the TCGdex server.
 *
 * Usage (from cards-database/server/):
 *   npm run daemon
 */
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, watch } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const serverRoot = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(serverRoot, '..')

// Local defaults: skip git timestamps, keep incremental cache (see compiler/utils/util.ts).
if (!process.env.CI && process.env.GITHUB_ACTIONS !== 'true') {
	process.env.LOCAL_COMPILE ??= '1'
	process.env.SKIP_GIT_TIMESTAMPS ??= '1'
}

const WATCH_PATHS = [
	path.join(serverRoot, 'src'),
	path.join(serverRoot, 'generated'),
	path.join(serverRoot, 'compiler'),
	path.join(repoRoot, 'data-asia'),
]

if (process.env.WATCH_DATA === '1') {
	WATCH_PATHS.push(path.join(repoRoot, 'data'))
}

const RESTART_DEBOUNCE_MS = 800
const COMPILE_DEBOUNCE_MS = 1500

/** @type {import('node:child_process').ChildProcess | null} */
let serverProcess = null
/** @type {import('node:child_process').ChildProcess | null} */
let compileProcess = null
/** @type {ReturnType<typeof setTimeout> | undefined} */
let restartTimer
/** @type {ReturnType<typeof setTimeout> | undefined} */
let compileTimer
let compileQueued = false
let compiling = false

function log(message) {
	if (process.env.DAEMON_VERBOSE === '1') {
		console.log(`[daemon] ${message}`)
	}
}

function logAlways(message) {
	console.log(`[daemon] ${message}`)
}

function shouldIgnore(relativePath) {
	const normalized = relativePath.replace(/\\/g, '/')
	return (
		normalized.includes('/node_modules/') ||
		normalized.endsWith('.compile-manifest.json') ||
		normalized.endsWith('/.compile-manifest.json')
	)
}

function killProcessTree(child) {
	if (!child?.pid) {
		return
	}

	if (process.platform === 'win32') {
		spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' })
		return
	}

	child.kill('SIGTERM')
}

function freePort3000() {
	if (process.platform !== 'win32') {
		return
	}

	try {
		const result = spawnSync(
			'powershell',
			[
				'-NoProfile',
				'-Command',
				"Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }",
			],
			{ stdio: 'ignore' },
		)
		void result
	} catch {
		// best effort
	}
}

function stopServer() {
	if (serverProcess) {
		killProcessTree(serverProcess)
		serverProcess = null
	}
	freePort3000()
}

function startServer() {
	stopServer()
	logAlways('Iniciando servidor…')

	serverProcess = spawn('node', ['run-bun.mjs', 'src/index.ts'], {
		cwd: serverRoot,
		stdio: 'inherit',
		shell: false,
	})

	serverProcess.on('exit', () => {
		serverProcess = null
	})
}

function scheduleRestart(reason) {
	clearTimeout(restartTimer)
	restartTimer = setTimeout(() => {
		log(`Reiniciando servidor (${reason})`)
		startServer()
	}, RESTART_DEBOUNCE_MS)
}

function runCompile() {
	return new Promise((resolve) => {
		if (compiling) {
			compileQueued = true
			resolve(1)
			return
		}

		compiling = true
		log('Compilando (incremental)...')

		compileProcess = spawn('node', ['run-bun.mjs', 'compiler/index.ts'], {
			cwd: serverRoot,
			stdio: 'inherit',
			shell: false,
		})

		compileProcess.on('exit', (code) => {
			compileProcess = null
			compiling = false

			if (compileQueued) {
				compileQueued = false
				runCompile().then(resolve)
				return
			}

			resolve(code ?? 1)
		})
	})
}

function scheduleCompileAndRestart(reason) {
	clearTimeout(compileTimer)
	compileTimer = setTimeout(async () => {
		const code = await runCompile()
		if (code === 0) {
			scheduleRestart(`post-compile: ${reason}`)
		} else {
			log('La compilación falló; el servidor no se reinició')
		}
	}, COMPILE_DEBOUNCE_MS)
}

function onPathChanged(changedPath) {
	if (shouldIgnore(changedPath)) {
		return
	}

	const normalized = changedPath.replace(/\\/g, '/')

	if (
		normalized.includes('/data-asia/') ||
		normalized.includes('/data/') ||
		normalized.includes('/compiler/')
	) {
		if (process.env.COMPILE_ON_DATA_CHANGE === '1') {
			scheduleCompileAndRestart(path.basename(normalized))
		} else {
			logAlways('Cambio en datos (compilación diferida). Ejecuta: cd cards-database/server && npm run compile')
		}
		return
	}

	if (normalized.includes('/generated/')) {
		scheduleRestart('generated')
		return
	}

	if (normalized.includes('/src/')) {
		scheduleRestart('src')
	}
}

function registerWatch(targetPath) {
	if (!existsSync(targetPath)) {
		log(`Omitiendo watch (no existe): ${targetPath}`)
		return
	}

	watch(targetPath, { recursive: true }, (_event, filename) => {
		if (!filename) {
			return
		}
		onPathChanged(path.join(targetPath, filename))
	})

	log(`Watching ${targetPath}`)
}

function shutdown() {
	clearTimeout(restartTimer)
	clearTimeout(compileTimer)
	stopServer()
	if (compileProcess) {
		killProcessTree(compileProcess)
	}
	process.exit(0)
}

for (const targetPath of WATCH_PATHS) {
	registerWatch(targetPath)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

startServer()
