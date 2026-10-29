import isEqual from 'lodash/isEqual.js';

type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
	if (value === null || typeof value !== 'object' || Array.isArray(value)) {
		return false;
	}

	const prototype = Object.getPrototypeOf(value) as unknown;
	return prototype === Object.prototype || prototype === null;
}

// Assigning a `__proto__` key replaces the object's prototype instead of
// adding a property, so it's never copied.
function ownKeys(object: PlainObject): string[] {
	return Object.keys(object).filter((key) => key !== '__proto__');
}

function clone(value: unknown): unknown {
	if (Array.isArray(value)) {
		return value.map(clone);
	}

	if (isPlainObject(value)) {
		const copy: PlainObject = {};
		ownKeys(value).forEach((key) => {
			copy[key] = clone(value[key]);
		});
		return copy;
	}

	return value;
}

function merge(existing: unknown, incoming: unknown): unknown {
	// Incoming items come first, followed by existing items it doesn't have.
	if (Array.isArray(existing) && Array.isArray(incoming)) {
		return [
			...incoming.map(clone),
			...existing
				.filter((item) => incoming.every((other) => !isEqual(item, other)))
				.map(clone),
		];
	}

	if (isPlainObject(existing) && isPlainObject(incoming)) {
		const result = clone(existing) as PlainObject;
		ownKeys(incoming).forEach((key) => {
			result[key] = Object.prototype.hasOwnProperty.call(existing, key)
				? merge(existing[key], incoming[key])
				: clone(incoming[key]);
		});
		return result;
	}

	return clone(incoming);
}

/**
 * Deeply merges Apollo cache data from the server into the client's existing
 * cache. Incoming values win, objects merge key by key, and arrays keep
 * incoming items first followed by existing items that aren't in them.
 *
 * @param existing The client's current cache, from `cache.extract()`.
 * @param incoming The cache data from getStaticProps or getServerSideProps.
 * @returns A new object; neither argument is changed.
 */
export function mergeApolloState<T>(existing: T, incoming: T): T {
	return merge(existing, incoming) as T;
}
