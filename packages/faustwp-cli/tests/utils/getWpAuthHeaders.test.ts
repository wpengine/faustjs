import { getWpAuthHeaders, hasWpCredentials } from '../../src/utils';

describe('utils/getWpAuthHeaders', () => {
	const envBackup = process.env;

	beforeEach(() => {
		process.env = { ...envBackup };
		delete process.env.FAUST_SECRET_KEY;
		delete process.env.FAUSTWP_SECRET_KEY;
		delete process.env.FAUST_APPLICATION_USER;
		delete process.env.FAUST_APPLICATION_PASSWORD;
	});

	afterAll(() => {
		process.env = envBackup;
	});

	it('sends the secret key when no Application Password is set', () => {
		process.env.FAUST_SECRET_KEY = 'secret';

		expect(getWpAuthHeaders()).toEqual({ 'x-faustwp-secret': 'secret' });
		expect(getWpAuthHeaders('x-faust-secret')).toEqual({
			'x-faust-secret': 'secret',
		});
	});

	it('sends Basic auth instead of the secret key when an Application Password is set', () => {
		process.env.FAUST_SECRET_KEY = 'secret';
		process.env.FAUST_APPLICATION_USER = 'frontend';
		process.env.FAUST_APPLICATION_PASSWORD = 'abcd efgh ijkl mnop';

		expect(getWpAuthHeaders()).toEqual({
			Authorization: `Basic ${Buffer.from(
				'frontend:abcd efgh ijkl mnop',
			).toString('base64')}`,
		});
	});

	it('ignores an Application Password without a user', () => {
		process.env.FAUST_APPLICATION_PASSWORD = 'abcd efgh ijkl mnop';

		expect(getWpAuthHeaders()).toEqual({});
		expect(hasWpCredentials()).toBe(false);
	});

	it('reports whether any credentials are set', () => {
		expect(hasWpCredentials()).toBe(false);

		process.env.FAUST_APPLICATION_USER = 'frontend';
		process.env.FAUST_APPLICATION_PASSWORD = 'abcd efgh ijkl mnop';

		expect(hasWpCredentials()).toBe(true);
	});
});
