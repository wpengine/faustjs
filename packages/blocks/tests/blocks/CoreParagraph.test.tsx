/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import {
  CoreParagraph,
  CoreParagraphFragmentProps,
} from '../../src/blocks/CoreParagraph.js';

function renderProvider(props: CoreParagraphFragmentProps) {
  return render(
    <WordPressBlocksProvider config={{ blocks: {}, theme: {} }}>
      <CoreParagraph {...props} />
    </WordPressBlocksProvider>,
  );
}

describe('<CoreParagraph />', () => {
  test('renders the component correctly', () => {
    renderProvider({ attributes: { content: 'Hello World' } });
    expect(screen.queryByText('Hello World')).toBeInTheDocument();
  });

  test('applies the correct styles', () => {
    renderProvider({
      attributes: {
        cssClassName: 'has-background-color',
        style:
          '{"color":{"background":"#602929"},"typography":{"fontSize":"53px"}}',
        content: 'Hello World',
      },
    });
    expect(screen.queryByText('Hello World')).toMatchInlineSnapshot(`
      <p
        class="has-background-color"
        style="background-color: rgb(96, 41, 41); font-size: 53px;"
      >
        Hello World
      </p>
    `);
  });
});
