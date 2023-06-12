/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import {
  CoreColumns,
  CoreColumnsFragmentProps,
} from '../../src/blocks/CoreColumns.js';

function renderProvider(props: CoreColumnsFragmentProps) {
  const blocks = {
    CoreParagraph: () => {
      return <div>Hello World</div>;
    },
  };
  return render(
    <WordPressBlocksProvider config={{ blocks, theme: {} }}>
      <CoreColumns {...props} />
    </WordPressBlocksProvider>,
  );
}

describe('<CoreColumns />', () => {
  test('renders the component correctly', () => {
    renderProvider({
      innerBlocks: [
        {
          name: 'CoreParagraph',
        },
      ],
      attributes: {},
    });
    expect(screen.queryByText('Hello World')).toBeInTheDocument();
  });

  test('applies the correct styles', () => {
    renderProvider({
      innerBlocks: [
        {
          name: 'CoreParagraph',
        },
      ],
      attributes: {
        cssClassName: 'has-background-color',
        style:
          '{"color":{"background":"#602929"},"typography":{"fontSize":"53px"}}',
      },
    });
    expect(screen.queryByText('Hello World')?.parentNode)
      .toMatchInlineSnapshot(`
      <div
        class="has-background-color"
        style="background-color: rgb(96, 41, 41); font-size: 53px;"
      >
        <div>
          Hello World
        </div>
      </div>
    `);
  });
});
