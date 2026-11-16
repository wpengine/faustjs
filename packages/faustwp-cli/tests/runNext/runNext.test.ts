import { spawnSync, SpawnSyncReturns } from 'child_process';
jest.mock('child_process');
import { getNextBinPath } from '../../src/utils/getNextBinPath.js';
jest.mock('../../src/utils/getNextBinPath.js', () => ({
	__esModule: true,
	getNextBinPath: jest.fn(),
}));

import { runNext } from '../../src/runNext';

const spawnSyncMock = spawnSync as unknown as jest.Mock<
	Partial<SpawnSyncReturns<Buffer>>
>;
const getNextBinPathMock = getNextBinPath as jest.Mock;

describe('runNext', () => {
	beforeEach(() => {
		jest.spyOn(console, 'log').mockImplementation(() => {});
		getNextBinPathMock.mockReturnValue('/app/node_modules/next/dist/bin/next');
	});

	afterEach(() => {
		jest.restoreAllMocks();
		jest.clearAllMocks();
	});

	it('runs the Next.js CLI script with the current Node binary', () => {
		spawnSyncMock.mockReturnValueOnce({ status: 0 });

		expect(runNext(['dev', '-p', '4040'])).toBe(0);
		expect(spawnSyncMock).toHaveBeenCalledWith(
			process.execPath,
			['/app/node_modules/next/dist/bin/next', 'dev', '-p', '4040'],
			{ stdio: 'inherit' },
		);
	});

	it("returns the Next.js CLI's exit code", () => {
		spawnSyncMock.mockReturnValueOnce({ status: 2 });

		expect(runNext(['build'])).toBe(2);
	});

	it('returns 1 when Next.js cannot be found', () => {
		getNextBinPathMock.mockReturnValueOnce(undefined);

		expect(runNext(['dev'])).toBe(1);
		expect(spawnSyncMock).not.toHaveBeenCalled();
	});

	it('returns 1 when the process fails to start', () => {
		spawnSyncMock.mockReturnValueOnce({
			status: null,
			error: new Error('spawnSync EINVAL'),
		});

		expect(runNext(['dev'])).toBe(1);
	});
});
