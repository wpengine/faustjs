import 'isomorphic-fetch';
import * as getSitemapProps from '../../../src/server/sitemaps/getSitemapProps';

describe('validateConfig', () => {
	it('throws an error if frontendUrl is missing', () => {
		const config = {};

		expect(() => getSitemapProps.validateConfig(config)).toThrow(
			'frontendUrl must be a string',
		);
	});

	it('throws an error if frontendUrl is not a valid url', () => {
		const config: any = { frontendUrl: 'localhost:3000' };

		expect(() => getSitemapProps.validateConfig(config)).toThrow(
			'frontendUrl must be a valid URL.',
		);
	});

	it('throws an error if sitemapPathsToIgnore is not an array', () => {
		const config: any = {
			frontendUrl: 'http://localhost:3000',
			sitemapPathsToIgnore: 'string',
		};

		expect(() => getSitemapProps.validateConfig(config)).toThrow(
			'sitemapPathsToIgnore must be an array',
		);
	});

	it('throws an error if sitemapPathsToIgnore is not an array of strings', () => {
		const config: any = {
			frontendUrl: 'http://localhost:3000',
			sitemapPathsToIgnore: [{}, 'string'],
		};

		expect(() => getSitemapProps.validateConfig(config)).toThrow(
			'sitemapPathsToIgnore must be an array of strings',
		);
	});

	it('throws an error if sitemapPathsToIgnore contains a path that does not start with a forward slash', () => {
		const config: any = {
			frontendUrl: 'http://localhost:3000',
			sitemapPathsToIgnore: ['author-sitemap.xml'],
		};

		expect(() => getSitemapProps.validateConfig(config)).toThrow(
			'Each sitemapPathsToIgnore must start with a forward slash',
		);
	});

	it('throws an error if sitemapPathsToIgnore contains a path that contains a wildcard and does not end with a wildcard', () => {
		const config: any = {
			frontendUrl: 'http://localhost:3000',
			sitemapPathsToIgnore: ['/author-*sitemap.xml'],
		};

		expect(() => getSitemapProps.validateConfig(config)).toThrow(
			'sitemapPathsToIgnore with a wildcard must end with a wildcard',
		);
	});

	it('throws an error if pages is not an array', () => {
		const config: any = {
			frontendUrl: 'http://localhost:3000',
			pages: {},
		};

		expect(() => getSitemapProps.validateConfig(config)).toThrow(
			'pages must be an array',
		);
	});

	it('throws an error if pages is not an array of objects', () => {
		const config: any = {
			frontendUrl: 'http://localhost:3000',
			pages: ['some-string'],
		};

		expect(() => getSitemapProps.validateConfig(config)).toThrow(
			'pages must be an array of objects',
		);
	});

	it('throws an error if pages contains an object with no path', () => {
		const config: any = {
			frontendUrl: 'http://localhost:3000',
			pages: [{}],
		};

		expect(() => getSitemapProps.validateConfig(config)).toThrow(
			'pages must have a path property',
		);
	});

	it('throws an error if pages contains an object path that is not a string', () => {
		const config: any = {
			frontendUrl: 'http://localhost:3000',
			pages: [{ path: {} }],
		};

		expect(() => getSitemapProps.validateConfig(config)).toThrow(
			'The pages path property must be a string',
		);
	});
});
