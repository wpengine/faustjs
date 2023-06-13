/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import {
  CoreQuote,
  CoreQuoteFragmentProps,
} from '../../src/blocks/CoreQuote.js';

function renderProvider(props: CoreQuoteFragmentProps) {
  return render(
    <WordPressBlocksProvider config={{ blocks: {}, theme: {} }}>
      <CoreQuote {...props} />
    </WordPressBlocksProvider>,
  );
}

describe('<CoreCode />', () => {
  test('renders the component correctly', () => {
    renderProvider({
      attributes: {
        value: '<p>This is my quote.</p>',
        citation: '<p>Walter P Engine</p>',
      },
    });

    expect(
      screen.queryByRole('blockquote', {
        name: /This is my quote./i,
      }),
    );
    expect(
      screen.queryByRole('cite', {
        name: /Walter P Engine/i,
      }),
    );
  });

  test('applies the correct styles', () => {
    const tree = renderProvider({
      attributes: {
        backgroundColor: 'secondary',
        citation: 'Blake',
        className: 'is-style-default',
        cssClassName:
          'wp-block-quote is-style-default has-primary-color has-secondary-background-color has-text-color has-background',
        style: '{"typography":{"fontStyle":"normal","fontWeight":"700"}}',
        textColor: 'primary',
        value: '<p>Quote with colors</p>',
      },
    });

    expect(tree.container).toMatchInlineSnapshot(`
    <div>
      <blockquote
        class="wp-block-quote is-style-default has-primary-color has-secondary-background-color has-text-color has-background"
        style="font-style: normal; font-weight: 700;"
      >
        <p>
          Quote with colors
        </p>
        <cite>
          Blake
        </cite>
      </blockquote>
    </div>
    `);
  });
});
