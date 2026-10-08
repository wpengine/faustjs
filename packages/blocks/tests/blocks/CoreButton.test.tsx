/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { print } from 'graphql';
import { render, screen } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import {
	CoreButton,
	CoreButtonFragmentProps,
} from '../../src/blocks/CoreButton.js';

function renderProvider(props: CoreButtonFragmentProps) {
	return render(
		<WordPressBlocksProvider config={{ blocks: {}, theme: {} }}>
			<CoreButton {...props} />
		</WordPressBlocksProvider>,
	);
}

describe('<CoreButton />', () => {
	test('renders the button text and link', () => {
		renderProvider({
			attributes: { text: 'Click', url: 'https://example.com' },
		});
		expect(screen.getByRole('link', { name: 'Click' })).toHaveAttribute(
			'href',
			'https://example.com',
		);
	});

	// WordPress 7.0+ stores text alignment in style.typography.textAlign and
	// adds the has-text-align-* class to the saved markup.
	test('keeps text alignment from WordPress 7.0+ through the class name', () => {
		renderProvider({
			attributes: {
				text: 'Click',
				url: 'https://example.com',
				cssClassName: 'wp-block-button',
				linkClassName:
					'wp-block-button__link has-text-align-center wp-element-button',
				style: '{"typography":{"textAlign":"center"}}',
			},
		});
		expect(screen.getByRole('link', { name: 'Click' })).toHaveClass(
			'has-text-align-center',
		);
	});

	test('does not query textAlign, which WordPress 7.0 removed', () => {
		expect(print(CoreButton.fragments.entry)).not.toMatch(/\btextAlign\b/);
	});
});
