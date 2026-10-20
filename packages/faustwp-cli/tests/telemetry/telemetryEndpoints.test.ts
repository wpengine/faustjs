import fetchMock from 'fetch-mock-jest';
import { requestWPTelemetryData } from '../../src/telemetry/requestWPTelemetryData';
import { sendTelemetryData } from '../../src/telemetry/sendTelemetryData';
import type { TelemetryData } from '../../src/telemetry/marshallTelemetryData';

/**
 * The telemetry endpoints use the ?rest_route= form so they also work on
 * sites that use Plain permalinks.
 */
describe('telemetry endpoints', () => {
	const envBackup = process.env;

	beforeEach(() => {
		process.env = { ...envBackup };
	});

	afterEach(() => {
		fetchMock.mockReset();
	});

	afterAll(() => {
		process.env = envBackup;
	});

	it('requests WordPress telemetry data with the rest_route query parameter', async () => {
		fetchMock.post('http://headless.local/?rest_route=/faustwp/v1/telemetry', {
			status: 200,
			body: { faustwp: { version: '1.8.13' } },
		});

		const data = await requestWPTelemetryData(
			'http://headless.local',
			'secret-key',
		);

		expect(data?.faustwp.version).toBe('1.8.13');
		expect(fetchMock).toHaveFetched(
			'http://headless.local/?rest_route=/faustwp/v1/telemetry',
			{ headers: { 'x-faustwp-secret': 'secret-key' } },
		);
	});

	it('sends telemetry data with the rest_route query parameter', async () => {
		process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';
		process.env.FAUST_SECRET_KEY = 'secret-key';

		fetchMock.post(
			'http://headless.local/?rest_route=/faustwp/v1/process_telemetry',
			200,
		);

		await sendTelemetryData({} as TelemetryData);

		expect(fetchMock).toHaveFetched(
			'http://headless.local/?rest_route=/faustwp/v1/process_telemetry',
			{ headers: { 'x-faustwp-secret': 'secret-key' } },
		);
	});
});
