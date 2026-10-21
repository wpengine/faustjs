/** @jest-environment jsdom */
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import * as getConfig from '../../src/config/index.js';
import * as WordPressTemplate from '../../src/components/WordPressTemplate.js';
import * as useAuth from '../../src/hooks/useAuth.js';
import * as client from '../../src/client.js';
import { SEED_QUERY } from '../../src/queries/seedQuery.js';
import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';
import * as getTemplate from '../../src/getTemplate.js';
import * as FaustProvider from '../../src/components/FaustProvider.js';
import { FaustContext } from '../../src/store/FaustContext.js';
import * as nextRouter from 'next/router';

xdescribe('<WordPressTemplate />', () => {
	const windowBackup = window;

	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
		window = windowBackup;
	});

	test('it throws an error if templates are not defined in config', () => {
		const getConfigSpy = jest.spyOn(getConfig, 'getConfig').mockReturnValue({});

		expect(() => render(<WordPressTemplate.WordPressTemplate />)).toThrow(
			'Templates are required. Please add them to your config.',
		);
	});

	test('Properly redirects to login URL on preview route with no logged in user', async () => {
		const getConfigSpy = jest.spyOn(getConfig, 'getConfig').mockReturnValue({
			templates: {},
		});

		const loginUrl = 'http://testing.local/wp-login.php';

		delete (window as any).location;
		// Preview route
		window.location = new URL(
			'http://localhost:3000/?preview=true&p=40',
		) as any as Location;
		window.location.assign = jest.fn();

		const windowLocationAssignSpy = jest.spyOn(window.location, 'assign');

		const useAuthSpy = jest.spyOn(useAuth, 'useAuth').mockReturnValue({
			isAuthenticated: false,
			isReady: true,
			loginUrl,
		});

		await act(async () => {
			render(
				<WordPressTemplate.WordPressTemplate
					__SEED_NODE__={{ databaseId: '1' }}
					__TEMPLATE_QUERY_DATA__={{ fakeData: true }}
				/>,
			);
		});

		expect(windowLocationAssignSpy).toHaveBeenCalledWith(loginUrl);
	});

	test('makes a request for the seed query if one does not exist', async () => {
		const getConfigSpy = jest.spyOn(getConfig, 'getConfig').mockReturnValue({
			templates: {},
		});

		const useAuthSpy = jest.spyOn(useAuth, 'useAuth').mockReturnValue({
			isAuthenticated: false,
			isReady: true,
			loginUrl: null,
		});

		const clientQueryMock = jest.fn();
		const getApolloClientSpy = jest
			.spyOn(client, 'getApolloClient')
			.mockImplementation(
				() =>
					({
						query: clientQueryMock,
					} as any as ApolloClient<NormalizedCacheObject>),
			);

		delete (window as any).location;
		window.location = new URL(
			'http://localhost:3000/my-page',
		) as any as Location;

		await act(async () => {
			render(<WordPressTemplate.WordPressTemplate />);
		});

		expect(clientQueryMock).toBeCalledWith({
			query: SEED_QUERY,
			variables: {
				uri: '/my-page',
			},
		});
	});

	test('makes a request for the preview seed query if one does not exist', async () => {
		const getConfigSpy = jest.spyOn(getConfig, 'getConfig').mockReturnValue({
			templates: {},
		});

		const useAuthSpy = jest.spyOn(useAuth, 'useAuth').mockReturnValue({
			isAuthenticated: true,
			isReady: true,
			loginUrl: null,
		});

		const clientQueryMock = jest.fn();
		const getApolloAuthClientSpy = jest
			.spyOn(client, 'getApolloAuthClient')
			.mockImplementation(
				() =>
					({
						query: clientQueryMock,
					} as any as ApolloClient<NormalizedCacheObject>),
			);

		delete (window as any).location;
		window.location = new URL(
			'http://localhost:3000/preview?preview=true&p=40&previewPathname=%2Fhello-world%2F',
		) as any as Location;

		await act(async () => {
			render(<WordPressTemplate.WordPressTemplate />);
		});

		expect(clientQueryMock).toBeCalledWith({
			query: SEED_QUERY,
			variables: {
				asPreview: true,
				id: '40',
			},
		});
	});
});

xdescribe('<WordPressTemplateInternal />', () => {
	const windowBackup = window;

	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
		window = windowBackup;
	});

	const setLoadingMock = jest.fn();

	const props = {
		seedNode: { databaseId: '1' },
		setLoading: setLoadingMock,
		loading: false,
		isPreview: false,
		isAuthenticated: false,
		__TEMPLATE_QUERY_DATA__: null,
	};

	const GET_TITLE_QUERY = gql`
		query GetTitle {
			generalSettings {
				title
			}
		}
	`;

	const GET_POST_QUERY = gql`
		query GetPost($postId: ID!) {
			post(id: $postId, idType: DATABASE_ID) {
				title
			}
		}
	`;

	test('it throws an error if templates are not defined in config', () => {
		const getConfigSpy = jest.spyOn(getConfig, 'getConfig').mockReturnValue({});
		expect(() =>
			render(<WordPressTemplate.WordPressTemplateInternal {...props} />),
		).toThrow('Templates are required. Please add them to your config.');
	});

	test('it throws an error if the template has both queries and query defined', () => {
		const getConfigSpy = jest.spyOn(getConfig, 'getConfig').mockReturnValue({
			templates: {},
		});

		const MyTemplate = () => {
			return <>My component</>;
		};

		MyTemplate.query = GET_TITLE_QUERY;
		MyTemplate.variables = () => ({
			databaseId: '5',
		});

		MyTemplate.queries = [
			{
				query: GET_POST_QUERY,
				variables: () => ({
					postId: '50',
				}),
			},
		];

		const templateSpy = jest
			.spyOn(getTemplate, 'getTemplate')
			.mockReturnValue(MyTemplate);

		expect(() =>
			render(<WordPressTemplate.WordPressTemplateInternal {...props} />),
		).toThrow(
			'`Only either `Component.query` or `Component.queries` can be provided, but not both.',
		);
	});

	test('it queries the template.query properly', async () => {
		const getConfigSpy = jest.spyOn(getConfig, 'getConfig').mockReturnValue({
			templates: {},
		});

		const GET_TITLE_QUERY = gql`
			query GetTitle {
				generalSettings {
					title
				}
			}
		`;

		const MyTemplate = () => {
			return <>My component</>;
		};

		MyTemplate.query = GET_TITLE_QUERY;
		MyTemplate.variables = () => ({
			databaseId: '5',
		});

		const templateSpy = jest
			.spyOn(getTemplate, 'getTemplate')
			.mockReturnValue(MyTemplate);

		const clientQueryMock = jest.fn();
		const getApolloClientSpy = jest
			.spyOn(client, 'getApolloClient')
			.mockImplementation(
				() =>
					({
						query: clientQueryMock,
					} as any as ApolloClient<NormalizedCacheObject>),
			);
		clientQueryMock.mockImplementation(() => ({
			data: {
				generalSettings: {
					title: 'testing',
				},
			},
		}));

		await act(async () => {
			render(<WordPressTemplate.WordPressTemplateInternal {...props} />);
		});

		expect(clientQueryMock).toHaveBeenCalledWith({
			query: GET_TITLE_QUERY,
			variables: {
				databaseId: '5',
			},
		});
	});

	test('it queries the template.queries properly', async () => {
		const getConfigSpy = jest.spyOn(getConfig, 'getConfig').mockReturnValue({
			templates: {},
		});

		const MyTemplate = () => {
			return <>My component</>;
		};

		MyTemplate.queries = [
			{
				query: GET_TITLE_QUERY,
			},
			{
				query: GET_POST_QUERY,
				variables: () => ({
					postId: '50',
				}),
			},
		];

		const templateSpy = jest
			.spyOn(getTemplate, 'getTemplate')
			.mockReturnValue(MyTemplate);

		const clientQueryMock = jest.fn();
		const getApolloClientSpy = jest
			.spyOn(client, 'getApolloClient')
			.mockImplementation(
				() =>
					({
						query: clientQueryMock,
					} as any as ApolloClient<NormalizedCacheObject>),
			);

		clientQueryMock.mockImplementationOnce(() => ({
			data: {
				generalSettings: {
					title: 'testing',
				},
			},
		}));

		clientQueryMock.mockImplementationOnce(() => ({
			data: {
				post: {
					databaseId: '50',
				},
			},
		}));

		await act(async () => {
			render(
				<FaustProvider.FaustProvider pageProps={{}}>
					<WordPressTemplate.WordPressTemplateInternal {...props} />
				</FaustProvider.FaustProvider>,
			);
		});

		expect(clientQueryMock).toHaveBeenCalledWith({
			query: GET_TITLE_QUERY,
		});

		expect(clientQueryMock).toHaveBeenCalledWith({
			query: GET_POST_QUERY,
			variables: {
				postId: '50',
			},
		});
	});
});

describe('<WordPressTemplateInternal /> client-side query variables', () => {
	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	const props = {
		seedNode: { databaseId: '1' },
		setLoading: jest.fn(),
		loading: false,
		isPreview: false,
		isAuthenticated: false,
		__TEMPLATE_QUERY_DATA__: null,
	};

	const GET_POST_QUERY = gql`
		query GetPost($postId: ID!) {
			post(id: $postId, idType: DATABASE_ID) {
				title
			}
		}
	`;

	function mockClient() {
		const clientQueryMock = jest.fn().mockResolvedValue({ data: {} });
		jest.spyOn(client, 'getApolloClient').mockImplementation(
			() =>
				({
					query: clientQueryMock,
				} as any as ApolloClient<NormalizedCacheObject>),
		);
		return clientQueryMock;
	}

	beforeEach(() => {
		jest.spyOn(getConfig, 'getConfig').mockReturnValue({ templates: {} });
		jest
			.spyOn(nextRouter, 'useRouter')
			.mockReturnValue({ locale: 'fr' } as any as nextRouter.NextRouter);
	});

	test('passes the locale to template.variables', async () => {
		const MyTemplate = () => <>My component</>;
		MyTemplate.query = GET_POST_QUERY;
		MyTemplate.variables = jest.fn(() => ({ postId: '1' }));
		jest.spyOn(getTemplate, 'getTemplate').mockReturnValue(MyTemplate);
		const clientQueryMock = mockClient();

		await act(async () => {
			render(<WordPressTemplate.WordPressTemplateInternal {...props} />);
		});

		expect(MyTemplate.variables).toHaveBeenCalledWith(props.seedNode, {
			asPreview: false,
			locale: 'fr',
		});
		expect(clientQueryMock).toHaveBeenCalledWith({
			query: GET_POST_QUERY,
			variables: { postId: '1' },
		});
	});

	test('passes the locale to each template.queries variables function', async () => {
		const variablesMock = jest.fn(() => ({ postId: '1' }));
		const MyTemplate = () => <>My component</>;
		MyTemplate.queries = [{ query: GET_POST_QUERY, variables: variablesMock }];
		jest.spyOn(getTemplate, 'getTemplate').mockReturnValue(MyTemplate);
		const clientQueryMock = mockClient();

		await act(async () => {
			render(
				<FaustContext.Provider value={{ queries: null, setQueries: jest.fn() }}>
					<WordPressTemplate.WordPressTemplateInternal {...props} />
				</FaustContext.Provider>,
			);
		});

		expect(variablesMock).toHaveBeenCalledWith(props.seedNode, {
			asPreview: false,
			locale: 'fr',
		});
		expect(clientQueryMock).toHaveBeenCalledWith({
			query: GET_POST_QUERY,
			variables: { postId: '1' },
		});
	});

	test('adds WordPress body classes only when bodyClass is set', async () => {
		const MyTemplate = () => <>My component</>;
		jest.spyOn(getTemplate, 'getTemplate').mockReturnValue(MyTemplate);
		const seedNode = {
			databaseId: '7',
			isContentNode: true,
			contentType: { node: { name: 'post' } },
		};

		let view = render(
			<WordPressTemplate.WordPressTemplateInternal
				{...props}
				seedNode={seedNode}
			/>,
		);
		expect(document.body.classList.contains('single-post')).toBe(false);
		view.unmount();

		view = render(
			<WordPressTemplate.WordPressTemplateInternal
				{...props}
				seedNode={seedNode}
				bodyClass
			/>,
		);
		expect(document.body.classList.contains('single-post')).toBe(true);
		expect(document.body.classList.contains('postid-7')).toBe(true);

		view.unmount();
		expect(document.body.classList.contains('single-post')).toBe(false);
	});
});
