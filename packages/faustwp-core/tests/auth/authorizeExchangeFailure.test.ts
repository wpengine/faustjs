/**
 * @jest-environment jsdom
 */

import fetchMock from 'fetch-mock';
import { ensureAuthorization } from '../../src/auth/authorize';
import * as getWpUrl from '../../src/lib/getWpUrl';
import * as log from '../../src/utils/log';

describe('ensureAuthorization() when exchanging a code fails', () => {
	afterEach(() => {
		fetchMock.restore();
		jest.restoreAllMocks();
	});

	test('stops instead of sending the user back for another code', async () => {
		jest.spyOn(getWpUrl, 'getWpUrl').mockReturnValue('http://test.local');
		const errorSpy = jest.spyOn(log, 'errorLog').mockImplementation(() => {});
		window.history.pushState({}, '', '/preview?p=1&preview=true&code=abc');
		fetchMock.get('begin:/api/faust/auth/token', { status: 403, body: {} });

		const result = await ensureAuthorization({
			redirectUri: window.location.href,
		});

		expect(result).toEqual({});
		expect(window.location.search).toBe('?p=1&preview=true');
		expect(errorSpy).toHaveBeenCalled();
	});
});
