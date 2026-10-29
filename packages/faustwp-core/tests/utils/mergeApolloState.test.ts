import { mergeApolloState } from '../../src/utils/mergeApolloState';

describe('mergeApolloState', () => {
	it('merges objects key by key, preferring incoming values', () => {
		const existing = {
			ROOT_QUERY: { viewer: null, posts: 'old' },
			'Post:1': { title: 'Old title', slug: 'hello' },
		};
		const incoming = {
			ROOT_QUERY: { posts: 'new' },
			'Post:2': { title: 'Second' },
		};

		expect(mergeApolloState<unknown>(existing, incoming)).toEqual({
			ROOT_QUERY: { viewer: null, posts: 'new' },
			'Post:1': { title: 'Old title', slug: 'hello' },
			'Post:2': { title: 'Second' },
		});
	});

	it('puts incoming array items first, then existing items not among them', () => {
		const existing = { list: [{ __ref: 'Post:1' }, { __ref: 'Post:2' }] };
		const incoming = { list: [{ __ref: 'Post:2' }, { __ref: 'Post:3' }] };

		expect(mergeApolloState(existing, incoming)).toEqual({
			list: [{ __ref: 'Post:2' }, { __ref: 'Post:3' }, { __ref: 'Post:1' }],
		});
	});

	it('uses the incoming value when the types differ', () => {
		expect(
			mergeApolloState<unknown>(
				{ a: [1], b: { c: 1 }, d: 1 },
				{ a: { x: 1 }, b: [2], d: null },
			),
		).toEqual({ a: { x: 1 }, b: [2], d: null });
	});

	it('returns copies and leaves its arguments unchanged', () => {
		const existing = { 'Post:1': { tags: ['a'] } };
		const incoming = { 'Post:2': { tags: ['b'] } };
		const result = mergeApolloState<Record<string, { tags: string[] }>>(
			existing,
			incoming,
		);

		result['Post:1'].tags.push('changed');
		result['Post:2'].tags.push('changed');

		expect(existing).toEqual({ 'Post:1': { tags: ['a'] } });
		expect(incoming).toEqual({ 'Post:2': { tags: ['b'] } });
	});

	it("doesn't let a __proto__ key change the result's prototype", () => {
		const existing = JSON.parse(
			'{"ROOT_QUERY":{"a":1},"__proto__":{"polluted":true}}',
		) as Record<string, unknown>;
		const incoming = JSON.parse(
			'{"ROOT_QUERY":{"__proto__":{"polluted":true}},"Post:1":{"__proto__":{"polluted":true}}}',
		) as Record<string, unknown>;

		const result = mergeApolloState(existing, incoming) as Record<
			string,
			Record<string, unknown>
		>;

		expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
		expect(Object.getPrototypeOf(result.ROOT_QUERY)).toBe(Object.prototype);
		expect(Object.getPrototypeOf(result['Post:1'])).toBe(Object.prototype);
		expect(result).toEqual({ ROOT_QUERY: { a: 1 }, 'Post:1': {} });
		expect(({} as Record<string, unknown>).polluted).toBeUndefined();
	});
});
