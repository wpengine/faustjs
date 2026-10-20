// Three-way merge for plain JSON objects.
//
// `base` is the version both sides started from, `theirs` is what's stored now,
// and `yours` is the local edit. Fields only one side changed are merged
// automatically. Fields both sides changed to different values are returned as
// conflicts, with the merged result keeping theirs until someone decides.
//
// Nested plain objects are merged field by field. Arrays and other values are
// compared as a whole.

function isPlainObject(value) {
	return (
		value !== null &&
		typeof value === 'object' &&
		!Array.isArray(value) &&
		Object.getPrototypeOf(value) === Object.prototype
	);
}

export function deepEqual(a, b) {
	if (a === b) {
		return true;
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		return a.length === b.length && a.every((item, i) => deepEqual(item, b[i]));
	}
	if (isPlainObject(a) && isPlainObject(b)) {
		const keys = Object.keys(a);
		return (
			keys.length === Object.keys(b).length &&
			keys.every((key) => Object.hasOwn(b, key) && deepEqual(a[key], b[key]))
		);
	}
	return false;
}

// A missing key and a key set to undefined both mean "not there".
const MISSING = undefined;

function mergeValue(base, theirs, yours, path, conflicts) {
	const theyChanged = !deepEqual(base, theirs);
	const youChanged = !deepEqual(base, yours);

	if (!youChanged) {
		return theirs;
	}
	if (!theyChanged || deepEqual(theirs, yours)) {
		return yours;
	}
	if (isPlainObject(base) && isPlainObject(theirs) && isPlainObject(yours)) {
		return mergeObjects(base, theirs, yours, path, conflicts);
	}

	conflicts.push({ path, base, theirs, yours });
	return theirs;
}

function mergeObjects(base, theirs, yours, path, conflicts) {
	const merged = {};
	const keys = new Set([
		...Object.keys(base),
		...Object.keys(theirs),
		...Object.keys(yours),
	]);

	for (const key of keys) {
		const value = mergeValue(
			Object.hasOwn(base, key) ? base[key] : MISSING,
			Object.hasOwn(theirs, key) ? theirs[key] : MISSING,
			Object.hasOwn(yours, key) ? yours[key] : MISSING,
			[...path, key],
			conflicts,
		);
		if (value !== MISSING) {
			// defineProperty rather than assignment, so a "__proto__" key from
			// the JSON becomes a field instead of changing the prototype.
			Object.defineProperty(merged, key, {
				value,
				enumerable: true,
				configurable: true,
				writable: true,
			});
		}
	}

	return merged;
}

/**
 * @param {object} base   The document both sides started from.
 * @param {object} theirs The document as it's stored now.
 * @param {object} yours  The local edit.
 * @returns {{ merged: object, conflicts: Array<{ path: string[], base: any, theirs: any, yours: any }> }}
 */
export function mergeDocuments(base, theirs, yours) {
	const conflicts = [];
	const merged = mergeObjects(base ?? {}, theirs ?? {}, yours ?? {}, [], conflicts);

	return { merged, conflicts };
}

/**
 * Return a copy of `object` with the value at `path` replaced.
 *
 * @param {object}   object
 * @param {string[]} path
 * @param {any}      value Use undefined to remove the key.
 * @returns {object}
 */
export function setAtPath(object, path, value) {
	const [key, ...rest] = path;
	// A computed key defines an own property, even for "__proto__", so the
	// assignments below write a field instead of changing the prototype.
	const copy = { ...object, [key]: undefined };
	if (rest.length) {
		copy[key] = setAtPath(isPlainObject(object[key]) ? object[key] : {}, rest, value);
	} else if (value === MISSING) {
		delete copy[key];
	} else {
		copy[key] = value;
	}
	return copy;
}
