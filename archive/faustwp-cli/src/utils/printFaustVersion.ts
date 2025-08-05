import fs from 'fs';
import { infoLog } from '../stdout/index.js';

/**
 * Sanitizes the version from a dependency in package.json.
 *
 * @param version The dependency version.
 * @returns A sanitized version or undefined if the version is a path.
 */
export function sanitizePackageJsonVersion(_version: string | undefined) {
	let version = _version;

	if (!version) {
		return undefined;
	}

	if (version.charAt(0) === '^' || version.charAt(0) === '~') {
		version = version.substring(1);
	}

	/**
	 * If a dependency is a file path set the value to undefined as we
	 * don't want to collect file paths in telemetry
	 */
	if (version.startsWith('file:')) {
		version = undefined;
	}

	return version;
}

export function printFaustVersion(): void {
	const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
	const coreVersion = sanitizePackageJsonVersion(
		packageJson?.dependencies?.['@faustwp/core'] as string | undefined,
	);
	const cliVersion = sanitizePackageJsonVersion(
		packageJson?.dependencies?.['@faustwp/cli'] as string | undefined,
	);
	// eslint-disable-next-line
	infoLog(`Faust.js v${coreVersion || 'unknown'}`);
	infoLog(`Faust.js CLI v${cliVersion || 'unknown'}`);
}
