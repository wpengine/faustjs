import fs from 'fs-extra';
import os from 'os';
import path from 'path';

// archiver is ESM-only, which Jest's CommonJS runtime can't load, and this
// test doesn't build a ZIP.
jest.mock('archiver', () => ({ ZipArchive: jest.fn() }));
jest.mock('isomorphic-fetch', () => ({
	__esModule: true,
	default: jest.fn(),
}));

import fetch from 'isomorphic-fetch';
import { uploadToWordPress } from '../../src/blockset';

const fetchMock = fetch as unknown as jest.Mock;

describe('uploadToWordPress', () => {
	const envBackup = process.env;
	let zipPath: string;

	beforeEach(async () => {
		process.env = { ...envBackup };
		zipPath = path.join(
			await fs.mkdtemp(path.join(os.tmpdir(), 'faust-blockset-')),
			'blocks.zip',
		);
		await fs.writeFile(zipPath, 'zip');
	});

	afterEach(async () => {
		await fs.remove(path.dirname(zipPath));
		fetchMock.mockReset();
		jest.restoreAllMocks();
	});

	afterAll(() => {
		process.env = envBackup;
	});

	it('uploads with the rest_route query parameter so Plain permalinks work', async () => {
		process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local/';
		process.env.FAUST_SECRET_KEY = 'secret-key';
		jest.spyOn(console, 'log').mockImplementation(() => {});

		fetchMock.mockResolvedValue({
			ok: true,
			json: async () => ({ message: 'ok' }),
		});

		await uploadToWordPress(zipPath);

		expect(fetchMock).toHaveBeenCalledWith(
			'http://headless.local/?rest_route=/faustwp/v1/blockset',
			expect.objectContaining({ method: 'POST' }),
		);
	});
});
