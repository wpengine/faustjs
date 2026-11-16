import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
import process from 'process';

/**
 * Resolves the Next.js CLI script from the project's dependencies so it can
 * be run with Node directly. Spawning `next.cmd` on Windows fails with EINVAL
 * on Node versions patched for CVE-2024-27980.
 *
 * @returns The absolute path to the Next.js CLI script, or undefined if Next.js
 * cannot be resolved.
 */
export const getNextBinPath = (cwd = process.cwd()) => {
	try {
		const pkgPath = createRequire(path.join(cwd, 'package.json')).resolve(
			'next/package.json',
		);
		const { bin } = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as {
			bin?: string | Record<string, string>;
		};
		const binPath = typeof bin === 'string' ? bin : bin?.next;

		return binPath ? path.resolve(path.dirname(pkgPath), binPath) : undefined;
	} catch {
		return undefined;
	}
};
