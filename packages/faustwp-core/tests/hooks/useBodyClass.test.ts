/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { useBodyClass } from '../../src/hooks/useBodyClass';

describe('useBodyClass()', () => {
	afterEach(() => {
		document.body.className = '';
	});

	test('adds the classes and removes them on unmount', () => {
		document.body.classList.add('theirs');

		const { unmount } = renderHook(() => useBodyClass(['single', 'postid-7']));

		expect(document.body.className).toBe('theirs single postid-7');

		unmount();

		expect(document.body.className).toBe('theirs');
	});

	test('swaps the classes when they change', () => {
		const { rerender } = renderHook(({ classes }) => useBodyClass(classes), {
			initialProps: { classes: ['single', 'postid-7'] },
		});

		rerender({ classes: ['page', 'page-id-9'] });

		expect(document.body.className).toBe('page page-id-9');
	});

	test('does nothing for an empty list', () => {
		renderHook(() => useBodyClass([]));

		expect(document.body.className).toBe('');
	});
});
