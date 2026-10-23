/**
 * @jest-environment jsdom
 */
import { gql } from '@apollo/client';
import fetchMock from 'fetch-mock';
import { setAccessToken } from '../../src/auth';
import { createApolloClient } from '../../src/client';

// Sends real queries through createApolloClient's links, with only fetch
// mocked, so the requests are checked with whichever Apollo Client is
// installed (npm run test:apollo-client-4 runs this with version 4).

const GET_TITLE = gql`
	query GetTitle {
		generalSettings {
			title
		}
	}
`;

const GRAPHQL_URL = 'begin:http://headless.local/index.php?graphql';

describe('Apollo link chain', () => {
	const envBackup = process.env;

	beforeEach(() => {
		process.env = {
			...envBackup,
			NEXT_PUBLIC_WORDPRESS_URL: 'http://headless.local',
		};
	});

	afterEach(() => {
		process.env = envBackup;
		setAccessToken(undefined, undefined);
		fetchMock.restore();
		jest.restoreAllMocks();
	});

	test('sends queries as GET without client library extensions', async () => {
		fetchMock.get(GRAPHQL_URL, {
			data: {
				generalSettings: { title: 'Site', __typename: 'GeneralSettings' },
			},
		});

		const { data } = await createApolloClient().query<any>({
			query: GET_TITLE,
		});

		expect(data.generalSettings.title).toBe('Site');
		const url = new URL(fetchMock.lastUrl() as string);
		expect(url.searchParams.get('operationName')).toBe('GetTitle');
		expect(url.searchParams.has('extensions')).toBe(false);
	});

	test('sends the access token from the auth client', async () => {
		setAccessToken('test-token', Math.floor(Date.now() / 1000) + 300);
		fetchMock.get(GRAPHQL_URL, {
			data: {
				generalSettings: { title: 'Site', __typename: 'GeneralSettings' },
			},
		});

		await createApolloClient(true).query<any>({ query: GET_TITLE });

		const headers = new Headers(
			fetchMock.lastOptions()?.headers as HeadersInit,
		);
		expect(headers.get('authorization')).toBe('Bearer test-token');
	});

	test('logs GraphQL errors and still rejects the query', async () => {
		const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
		fetchMock.get(GRAPHQL_URL, {
			data: null,
			errors: [{ message: 'Internal server error' }],
		});

		await expect(
			createApolloClient().query<any>({ query: GET_TITLE }),
		).rejects.toThrow('Internal server error');

		const logged = consoleSpy.mock.calls
			.map((args) => args.join(' '))
			.join('\n');
		expect(logged).toContain('GraphQL errors');
	});
});
