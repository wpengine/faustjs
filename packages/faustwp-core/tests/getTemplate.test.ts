import * as getTemplate from '../src/getTemplate';

describe('getPossibleTemplates', () => {
	test('home page possible templates list', () => {
		// Seed Node for resolved url: "/"
		const seedNode = {
			__typename: 'Page',
			uri: '/',
			id: 'cG9zdDozNjE=',
			databaseId: '361',
			isContentNode: true,
			slug: 'home',
			contentType: {
				__typename: 'ContentNodeToContentTypeConnectionEdge',
				node: { __typename: 'ContentType', name: 'page' },
			},
			template: { __typename: 'DefaultTemplate', templateName: 'Default' },
			isFrontPage: true,
			isPostsPage: false,
		};

		expect(getTemplate.getPossibleTemplates(seedNode)).toStrictEqual([
			'front-page',
			'page-home',
			'page-361',
			'page',
			'singular',
			'index',
		]);
	});

	test('uncategorized category archive possible templates list', () => {
		// Seed Node for resolved url: "/category/uncategorized"
		const seedNode = {
			__typename: 'Category',
			uri: '/category/uncategorized/',
			id: 'dGVybTox',
			databaseId: '1',
			isTermNode: true,
			slug: 'uncategorized',
			taxonomyName: 'category',
		};

		expect(getTemplate.getPossibleTemplates(seedNode)).toStrictEqual([
			'category-uncategorized',
			'category-1',
			'category',
			'archive',
			'index',
		]);
	});

	test('cpt post possible templates list', () => {
		// Seed Node for resolved url: "/movies/the-dark-knight"
		const seedNode = {
			__typename: 'Movie',
			uri: '/movies/the-dark-knight/',
			id: 'cG9zdDo0NDM=',
			databaseId: '443',
			isContentNode: true,
			slug: 'the-dark-knight',
			contentType: {
				__typename: 'ContentNodeToContentTypeConnectionEdge',
				node: { __typename: 'ContentType', name: 'movies' },
			},
			template: { __typename: 'DefaultTemplate', templateName: 'Default' },
		};

		expect(getTemplate.getPossibleTemplates(seedNode)).toStrictEqual([
			'single-movies-the-dark-knight',
			'single-movies',
			'singular',
			'index',
		]);
	});

	test('single page custom template possible templates list', () => {
		// Seed Node for resolved url: "/testing"
		const seedNode = {
			__typename: 'Page',
			uri: '/testing/',
			id: 'cG9zdDozMjk=',
			databaseId: '329',
			isContentNode: true,
			slug: 'testing',
			contentType: {
				__typename: 'ContentNodeToContentTypeConnectionEdge',
				node: { __typename: 'ContentType', name: 'page' },
			},
			template: {
				__typename: 'Template_PageWithoutSidebar',
				templateName: 'PageWithoutSidebar',
			},
			isFrontPage: false,
			isPostsPage: false,
		};

		expect(getTemplate.getPossibleTemplates(seedNode)).toStrictEqual([
			'template-PageWithoutSidebar',
			'page-testing',
			'page-329',
			'page',
			'singular',
			'index',
		]);
	});
});

describe('isDynamicComponent', () => {
	test('returns true for valid DynamicComponent', () => {
		const dynamicComponent = {
			render: {
				preload: async () => ({ default: () => null }),
			},
		};

		expect(getTemplate.isDynamicComponent(dynamicComponent)).toBe(true);
	});

	test('returns false for regular component', () => {
		const regularComponent = () => null;

		expect(getTemplate.isDynamicComponent(regularComponent)).toBe(false);
	});

	test('returns false for object without render.preload', () => {
		const invalidComponent = {
			render: {
				displayName: 'TestComponent',
			},
		};

		expect(getTemplate.isDynamicComponent(invalidComponent)).toBe(false);
	});

	test('returns false for object with render but no preload', () => {
		const invalidComponent = {
			render: {},
		};

		expect(getTemplate.isDynamicComponent(invalidComponent)).toBe(false);
	});
});

describe('loadDynamicComponent', () => {
	test('loads and resolves DynamicComponent correctly', async () => {
		const mockComponent = () => 'test component';
		const dynamicComponent = {
			render: {
				preload: jest.fn().mockResolvedValue({ default: mockComponent }),
			},
		};

		const result = await getTemplate.loadDynamicComponent(dynamicComponent);

		expect(dynamicComponent.render.preload).toHaveBeenCalledTimes(1);
		expect(result).toBe(mockComponent);
	});

	test('extracts default export from preload result', async () => {
		const mockComponent = { name: 'MyComponent' };
		const dynamicComponent = {
			render: {
				preload: async () => ({
					default: mockComponent,
					otherExport: 'should not be returned',
				}),
			},
		};

		const result = await getTemplate.loadDynamicComponent(dynamicComponent);

		expect(result).toBe(mockComponent);
		expect(result).not.toBe('should not be returned');
	});

	test('handles async preload resolution', async () => {
		const mockComponent = () => 'async component';
		const dynamicComponent = {
			render: {
				preload: () =>
					new Promise<{ default: typeof mockComponent }>((resolve) => {
						setTimeout(() => {
							resolve({ default: mockComponent });
						}, 10);
					}),
			},
		};

		const result = await getTemplate.loadDynamicComponent(dynamicComponent);

		expect(result).toBe(mockComponent);
	});
});
