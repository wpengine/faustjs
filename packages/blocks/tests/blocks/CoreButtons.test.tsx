/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import {
  CoreButtons,
  CoreButtonsFragmentProps,
} from '../../src/blocks/CoreButtons.js';

function renderProvider(props: CoreButtonsFragmentProps) {
  const blocks = {
    CoreButton: () => {
      return <button>Click</button>;
    },
  };
  return render(
    <WordPressBlocksProvider config={{ blocks, theme: {} }}>
      <CoreButtons {...props} />
    </WordPressBlocksProvider>,
  );
}

describe('<CoreButtons />', () => {
  test('renders the component correctly', () => {
    renderProvider({
      innerBlocks: [
        {
          name: 'CoreButton',
        },
      ],
      attributes: {},
    });
    expect(screen.queryByText('Click')).toBeInTheDocument();
  });

  test('applies the correct styles', () => {
    renderProvider({
      innerBlocks: [
        {
          name: 'CoreButton',
        },
      ],
      attributes: {
        cssClassName: 'has-background-color',
        style:
          '{"color":{"background":"#602929"},"typography":{"fontSize":"53px"}}',
      },
    });
    expect(screen.queryByText('Click')?.parentNode).toMatchInlineSnapshot(`
      <div
        class="has-background-color"
        style="background-color: rgb(96, 41, 41); font-size: 53px;"
      >
        <button>
          Click
        </button>
      </div>
    `);
  });
});
