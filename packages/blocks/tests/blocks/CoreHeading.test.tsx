/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { print } from 'graphql';
import { render, screen } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import {
	CoreHeading,
	CoreHeadingFragmentProps,
} from '../../src/blocks/CoreHeading.js';

function renderProvider(props: CoreHeadingFragmentProps) {
	return render(
		<WordPressBlocksProvider config={{ blocks: {}, theme: {} }}>
			<CoreHeading {...props} />
		</WordPressBlocksProvider>,
	);
}

describe('<CoreHeading />', () => {
	test('renders the heading level and content', () => {
		renderProvider({ attributes: { level: 2, content: 'Hello World' } });
		expect(
			screen.getByRole('heading', { level: 2, name: 'Hello World' }),
		).toBeInTheDocument();
	});

	// WordPress 7.0+ stores text alignment in style.typography.textAlign and
	// adds the has-text-align-* class to the saved markup.
	test('keeps text alignment from WordPress 7.0+ through the class name', () => {
		renderProvider({
			attributes: {
				level: 2,
				content: 'Centered heading',
				cssClassName: 'wp-block-heading has-text-align-center',
				style: '{"typography":{"textAlign":"center"}}',
			},
		});
		expect(screen.getByRole('heading', { level: 2 })).toHaveClass(
			'has-text-align-center',
		);
	});

	test('does not query textAlign, which WordPress 7.0 removed', () => {
		expect(print(CoreHeading.fragments.entry)).not.toMatch(/\btextAlign\b/);
	});
});
