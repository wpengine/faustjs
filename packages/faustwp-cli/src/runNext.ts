import { spawnSync } from 'child_process';
import { errorLog } from './stdout/index.js';
import { getNextBinPath } from './utils/index.js';

/**
 * Runs the Next.js CLI with the given args, inheriting standard i/o.
 *
 * @returns The exit code to exit Faust with.
 */
export function runNext(args: string[]): number {
	const nextBinPath = getNextBinPath();

	if (!nextBinPath) {
		errorLog('Could not find Next.js. Make sure `next` is installed.');
		return 1;
	}

	const result = spawnSync(process.execPath, [nextBinPath, ...args], {
		stdio: 'inherit',
	});

	if (result.error) {
		errorLog('Failed to start Next.js:', result.error);
	}

	return result.status ?? 1;
}
