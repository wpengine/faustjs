import fs from 'fs';
import os from 'os';
import path from 'path';
import { getNextBinPath } from '../../src/utils';

describe('utils/getNextBinPath', () => {
	let cwd: string;

	beforeEach(() => {
		cwd = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'faust-cli-')));
	});

	afterEach(() => {
		fs.rmSync(cwd, { recursive: true, force: true });
	});

	const installNext = (bin: unknown) => {
		const nextDir = path.join(cwd, 'node_modules', 'next');
		fs.mkdirSync(nextDir, { recursive: true });
		fs.writeFileSync(
			path.join(nextDir, 'package.json'),
			JSON.stringify({ name: 'next', bin }),
		);
		return nextDir;
	};

	it('resolves the next bin from an object bin field', () => {
		const nextDir = installNext({ next: './dist/bin/next' });

		expect(getNextBinPath(cwd)).toBe(path.join(nextDir, 'dist', 'bin', 'next'));
	});

	it('resolves the next bin from a string bin field', () => {
		const nextDir = installNext('./dist/bin/next');

		expect(getNextBinPath(cwd)).toBe(path.join(nextDir, 'dist', 'bin', 'next'));
	});

	it('returns undefined when next is not installed', () => {
		expect(getNextBinPath(cwd)).toBeUndefined();
	});

	it('returns undefined when next has no bin', () => {
		installNext(undefined);

		expect(getNextBinPath(cwd)).toBeUndefined();
	});
});
