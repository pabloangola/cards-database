/**
 * Rename downloaded TCGdex images to their card ID for local lookup.
 *
 * Before: {outDir}/{setId}/{cardName}.png
 * After:  {outDir}/{setId}/{cardId}.png   e.g. swsh3/swsh3-136.png
 *
 * Uses download-manifest.json from the download step.
 *
 * Usage:
 *   node scripts/rename-card-images-to-id.mjs
 *   node scripts/rename-card-images-to-id.mjs --out "D:\TcgDex images" --dry-run
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DEFAULT_OUT = 'D:\\TcgDex images'

function parseArgs(argv) {
	const opts = {
		outDir: DEFAULT_OUT,
		dryRun: false,
		manifest: null,
	}

	for (let i = 2; i < argv.length; i++) {
		const arg = argv[i]
		if (arg === '--out' && argv[i + 1]) opts.outDir = argv[++i]
		else if (arg === '--manifest' && argv[i + 1]) opts.manifest = argv[++i]
		else if (arg === '--dry-run') opts.dryRun = true
		else if (arg === '--help') {
			console.log(`Usage: node scripts/rename-card-images-to-id.mjs [options]

Options:
  --out <dir>        Image root (default: ${DEFAULT_OUT})
  --manifest <file>  Manifest path (default: {out}/download-manifest.json)
  --dry-run          Preview without renaming
`)
			process.exit(0)
		}
	}

	opts.manifest ??= path.join(opts.outDir, 'download-manifest.json')
	return opts
}

async function fileExists(p) {
	try {
		await fs.access(p)
		return true
	} catch {
		return false
	}
}

async function main() {
	const opts = parseArgs(process.argv)

	let manifest
	try {
		manifest = JSON.parse(await fs.readFile(opts.manifest, 'utf8'))
	} catch {
		console.error(`Manifest not found: ${opts.manifest}`)
		console.error('Run download-card-images.mjs first.')
		process.exit(1)
	}

	const jobs = manifest.jobs ?? []
	let renamed = 0
	let alreadyId = 0
	let missing = 0
	let errors = 0
	const failures = []
	const updatedJobs = []

	console.log(`Manifest: ${opts.manifest}`)
	console.log(`Jobs: ${jobs.length}`)
	if (opts.dryRun) console.log('Mode: dry-run')
	console.log('')

	for (let i = 0; i < jobs.length; i++) {
		const job = jobs[i]
		const srcPath = path.join(opts.outDir, job.file.replace(/\\/g, path.sep))
		const destRel = path.join(job.setId, `${job.cardId}.png`)
		const destPath = path.join(opts.outDir, destRel)

		const srcSameAsDest = path.normalize(srcPath) === path.normalize(destPath)

		if (srcSameAsDest && (await fileExists(destPath))) {
			alreadyId++
			updatedJobs.push({ ...job, file: destRel, name: job.name })
			continue
		}

		if (!(await fileExists(srcPath))) {
			if (await fileExists(destPath)) {
				alreadyId++
				updatedJobs.push({ ...job, file: destRel, name: job.name })
				continue
			}
			missing++
			failures.push({ cardId: job.cardId, file: job.file, error: 'source missing' })
			updatedJobs.push({ ...job, file: destRel, name: job.name })
			continue
		}

		if (await fileExists(destPath) && !srcSameAsDest) {
			// Target already exists (partial rename); remove source if different file
			if (opts.dryRun) {
				console.log(`[dry-run] unlink duplicate ${srcPath}`)
			} else {
				await fs.unlink(srcPath)
			}
			alreadyId++
			updatedJobs.push({ ...job, file: destRel, name: job.name })
			continue
		}

		try {
			if (opts.dryRun) {
				console.log(`[dry-run] ${srcPath} -> ${destPath}`)
			} else {
				await fs.rename(srcPath, destPath)
			}
			renamed++
			updatedJobs.push({ ...job, file: destRel, name: job.name })
		} catch (err) {
			errors++
			failures.push({
				cardId: job.cardId,
				file: job.file,
				error: err instanceof Error ? err.message : String(err),
			})
			updatedJobs.push({ ...job, file: destRel, name: job.name })
		}

		if ((i + 1) % 2000 === 0 || i + 1 === jobs.length) {
			process.stdout.write(`\rProcessed: ${i + 1}/${jobs.length}`)
		}
	}

	console.log('\n')
	console.log('Done.')
	console.log(`  Renamed: ${renamed}`)
	console.log(`  Already by ID: ${alreadyId}`)
	console.log(`  Missing source: ${missing}`)
	console.log(`  Errors: ${errors}`)

	if (!opts.dryRun) {
		const indexPath = path.join(opts.outDir, 'card-index.json')
		const index = Object.fromEntries(
			updatedJobs.map((j) => [j.cardId, { setId: j.setId, name: j.name, file: j.file.replace(/\\/g, '/') }]),
		)
		await fs.writeFile(indexPath, JSON.stringify(index, null, 2))
		console.log(`  Lookup index: ${indexPath}`)

		await fs.writeFile(
			opts.manifest,
			JSON.stringify(
				{
					...manifest,
					naming: 'tcgdex-id',
					renamedAt: new Date().toISOString(),
					jobs: updatedJobs.map((j) => ({
						cardId: j.cardId,
						setId: j.setId,
						name: j.name,
						file: j.file.replace(/\\/g, '/'),
						url: j.url,
					})),
				},
				null,
				2,
			),
		)
		console.log(`  Updated manifest: ${opts.manifest}`)
	}

	if (failures.length > 0) {
		const logPath = path.join(opts.outDir, 'rename-failures.json')
		if (!opts.dryRun) {
			await fs.writeFile(logPath, JSON.stringify(failures, null, 2))
		}
		console.log(`  Issues log: ${logPath} (${failures.length} entries)`)
	}
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
