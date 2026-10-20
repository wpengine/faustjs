import assert from 'node:assert/strict';
import { test } from 'node:test';

import { deepEqual, mergeDocuments, setAtPath } from './mergeDocuments.mjs';

const base = { title: 'Launch', notes: 'Draft', status: 'draft' };

test('takes their change when you left the field alone', () => {
	const { merged, conflicts } = mergeDocuments(base, { ...base, title: 'Launch v2' }, base);

	assert.deepEqual(merged, { ...base, title: 'Launch v2' });
	assert.deepEqual(conflicts, []);
});

test('keeps your change when they left the field alone', () => {
	const { merged, conflicts } = mergeDocuments(base, base, { ...base, notes: 'Mine' });

	assert.deepEqual(merged, { ...base, notes: 'Mine' });
	assert.deepEqual(conflicts, []);
});

test('merges changes to different fields', () => {
	const { merged, conflicts } = mergeDocuments(
		base,
		{ ...base, title: 'Theirs' },
		{ ...base, status: 'done' },
	);

	assert.deepEqual(merged, { title: 'Theirs', notes: 'Draft', status: 'done' });
	assert.deepEqual(conflicts, []);
});

test('accepts the same change on both sides', () => {
	const { merged, conflicts } = mergeDocuments(
		base,
		{ ...base, status: 'done' },
		{ ...base, status: 'done' },
	);

	assert.equal(merged.status, 'done');
	assert.deepEqual(conflicts, []);
});

test('reports different changes to the same field and keeps theirs', () => {
	const { merged, conflicts } = mergeDocuments(
		base,
		{ ...base, notes: 'Theirs' },
		{ ...base, notes: 'Yours', title: 'Also yours' },
	);

	assert.deepEqual(merged, { title: 'Also yours', notes: 'Theirs', status: 'draft' });
	assert.deepEqual(conflicts, [
		{ path: ['notes'], base: 'Draft', theirs: 'Theirs', yours: 'Yours' },
	]);
});

test('merges nested objects field by field', () => {
	const nestedBase = { meta: { color: 'red', size: 1 } };
	const { merged, conflicts } = mergeDocuments(
		nestedBase,
		{ meta: { color: 'blue', size: 1 } },
		{ meta: { color: 'red', size: 2 } },
	);

	assert.deepEqual(merged, { meta: { color: 'blue', size: 2 } });
	assert.deepEqual(conflicts, []);
});

test('reports nested conflicts with their full path', () => {
	const { conflicts } = mergeDocuments(
		{ meta: { color: 'red' } },
		{ meta: { color: 'blue' } },
		{ meta: { color: 'green' } },
	);

	assert.deepEqual(conflicts, [
		{ path: ['meta', 'color'], base: 'red', theirs: 'blue', yours: 'green' },
	]);
});

test('treats arrays as single values', () => {
	const { merged, conflicts } = mergeDocuments(
		{ tags: ['a'] },
		{ tags: ['a', 'b'] },
		{ tags: ['a', 'c'] },
	);

	assert.deepEqual(merged, { tags: ['a', 'b'] });
	assert.equal(conflicts.length, 1);
	assert.deepEqual(conflicts[0].path, ['tags']);
});

test('handles added and removed keys', () => {
	const { merged, conflicts } = mergeDocuments(
		{ keep: 1, drop: 2 },
		{ keep: 1, drop: 2, added: 'theirs' },
		{ keep: 1 },
	);

	assert.deepEqual(merged, { keep: 1, added: 'theirs' });
	assert.deepEqual(conflicts, []);
});

test('reports removing a field they changed as a conflict', () => {
	const { merged, conflicts } = mergeDocuments({ a: 1 }, { a: 2 }, {});

	assert.deepEqual(merged, { a: 2 });
	assert.deepEqual(conflicts, [{ path: ['a'], base: 1, theirs: 2, yours: undefined }]);
});

test('deepEqual compares objects and arrays by value', () => {
	assert.ok(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }));
	assert.ok(!deepEqual({ a: 1 }, { a: 1, b: undefined }));
	assert.ok(!deepEqual([1, 2], [2, 1]));
});

test('setAtPath replaces and removes nested values without mutating', () => {
	const original = { meta: { color: 'red' }, title: 'x' };

	assert.deepEqual(setAtPath(original, ['meta', 'color'], 'blue'), {
		meta: { color: 'blue' },
		title: 'x',
	});
	assert.deepEqual(setAtPath(original, ['title'], undefined), { meta: { color: 'red' } });
	assert.deepEqual(original, { meta: { color: 'red' }, title: 'x' });
});
