import {
	isWPEngineComSubdomain,
	validateFaustEnvVars,
} from '../../src/healthCheck/validateFaustEnvVars';
import fetchMock from 'fetch-mock-jest';
/**
 * @jest-environment jsdom
 */
describe('healthCheck/validateFaustEnvVars', () => {
	const envBackup = process.env;

	beforeEach(() => {
		process.env = { ...envBackup };
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		process.env = envBackup;
	});

	it('exits with a 1 exit code when the WordPress URL is undefined', async () => {
		// @ts-ignore
		const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
			if (code && code !== 0) {
				throw new Error(`Exit code: ${code}`);
			}
		});

		// Use try/catch block to mock process.exit
		try {
			await validateFaustEnvVars();
		} catch (err) {
			console.log(err);
		}

		expect(mockExit).toHaveBeenCalledWith(1);
	});

	it('does not exit or throw an error when the WordPress URL is set', async () => {
		// @ts-ignore
		const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
			if (code && code !== 0) {
				return;
			}
		});

		process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';

		await validateFaustEnvVars();

		expect(mockExit).toBeCalledTimes(0);
	});

	it('logs an error when the secret key validation fails', async () => {
		process.env.NEXT_PUBLIC_WORDPRESS_URL = 'https://headless.local';
		process.env.FAUST_SECRET_KEY = 'invalid-secret-key';

		fetchMock.post(
			'https://headless.local/?rest_route=/faustwp/v1/validate_secret_key',
			{
				status: 401,
			},
		);

		await validateFaustEnvVars();

		return expect(Promise.resolve(validateFaustEnvVars())).toMatchSnapshot(
			`Ensure your FAUST_SECRET_KEY environment variable matches your Secret Key in the Faust WordPress plugin settings`,
		);
	});

	it('logs a Basic Auth error when the site returns 401 with WWW-Authenticate: Basic', async () => {
		// @ts-ignore
		const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
			if (code && code !== 0) {
				throw new Error(`Exit code: ${code}`);
			}
		});
		const mockLog = jest.spyOn(console, 'log').mockImplementation(() => {});

		process.env.NEXT_PUBLIC_WORDPRESS_URL = 'https://basicauth.local';
		process.env.FAUST_SECRET_KEY = 'valid-secret-key';

		fetchMock.post(
			'https://basicauth.local/?rest_route=/faustwp/v1/validate_secret_key',
			{
				status: 401,
				headers: { 'WWW-Authenticate': 'Basic realm="Restricted"' },
			},
		);

		try {
			await validateFaustEnvVars();
		} catch (err) {
			// Expected exit
		}

		expect(mockExit).toHaveBeenCalledWith(1);
		expect(mockLog).toHaveBeenCalledWith(
			expect.stringContaining('HTTP Basic Authentication'),
		);

		mockLog.mockRestore();
	});

	it('validates an Application Password instead of the secret key', async () => {
		// @ts-ignore
		const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

		process.env.NEXT_PUBLIC_WORDPRESS_URL = 'https://apppassword.local';
		process.env.FAUST_APPLICATION_USER = 'frontend';
		process.env.FAUST_APPLICATION_PASSWORD = 'abcd efgh ijkl mnop';

		fetchMock.post(
			'https://apppassword.local/?rest_route=/faustwp/v1/validate_secret_key',
			{ status: 200 },
		);
		fetchMock.post(
			'https://apppassword.local/?rest_route=/faustwp/v1/validate_public_wordpress_url',
			{ status: 200, body: {} },
		);

		await validateFaustEnvVars();

		expect(mockExit).not.toHaveBeenCalled();
		expect(fetchMock).toHaveFetched(
			'https://apppassword.local/?rest_route=/faustwp/v1/validate_secret_key',
			{
				headers: {
					Authorization: `Basic ${Buffer.from(
						'frontend:abcd efgh ijkl mnop',
					).toString('base64')}`,
				},
			},
		);
	});

	it("explains a 403 when the Application Password's user lacks the capability", async () => {
		// @ts-ignore
		const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
			if (code && code !== 0) {
				throw new Error(`Exit code: ${code}`);
			}
		});
		const mockLog = jest.spyOn(console, 'log').mockImplementation(() => {});

		process.env.NEXT_PUBLIC_WORDPRESS_URL = 'https://nocap.local';
		process.env.FAUST_APPLICATION_USER = 'subscriber';
		process.env.FAUST_APPLICATION_PASSWORD = 'abcd efgh ijkl mnop';

		fetchMock.post(
			'https://nocap.local/?rest_route=/faustwp/v1/validate_secret_key',
			{ status: 403 },
		);

		try {
			await validateFaustEnvVars();
		} catch (err) {
			// Expected exit
		}

		expect(mockExit).toHaveBeenCalledWith(1);
		expect(mockLog).toHaveBeenCalledWith(
			expect.stringContaining('faustwp_exchange_tokens'),
		);

		mockLog.mockRestore();
	});
});

describe('isWPEngineComTLD', () => {
	it('matches subdomains on wpengine.com', () => {
		expect(isWPEngineComSubdomain('https://my-site.wpengine.com')).toBeTruthy();
		expect(
			isWPEngineComSubdomain('http://some-site.wpengine.com/graphql'),
		).toBeTruthy();
		expect(isWPEngineComSubdomain('https://example.wpengine.com')).toBeTruthy();
		expect(
			isWPEngineComSubdomain('https://some-long-weird-subdomain.wpengine.com'),
		);
	});

	it('does not match urls that are not subdomains of wpengine.com', () => {
		expect(isWPEngineComSubdomain('https://example.com')).toBeFalsy();
		expect(isWPEngineComSubdomain('https://wpengine.com')).toBeFalsy();
		expect(isWPEngineComSubdomain('https://wpengine.com/plans')).toBeFalsy();
		expect(isWPEngineComSubdomain('https://my-site.wpengine.co')).toBeFalsy();
		expect(
			isWPEngineComSubdomain('https://my-site.wpenginepowered.com'),
		).toBeFalsy();
	});
});
