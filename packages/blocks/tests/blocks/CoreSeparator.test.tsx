/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import {
  CoreSeparator,
  CoreSeparatorFragmentProps,
} from '../../src/blocks/CoreSeparator.js';
import { BlockWithAttributes } from '../../src/components/WordPressBlocksViewer';

function renderProvider(props: CoreSeparatorFragmentProps) {
  return render(
    <WordPressBlocksProvider config={{ blocks: {}, theme: {} }}>
      <CoreSeparator {...props} />
    </WordPressBlocksProvider>,
  );
}

describe('<CoreSeparator />', () => {
  test('renders the component correctly', () => {
    const tree = renderProvider({
      attributes: {
        backgroundColor: 'luminous-vivid-orange',
        cssClassName:
          'wp-block-separator has-text-color has-luminous-vivid-orange-color has-alpha-channel-opacity has-luminous-vivid-orange-background-color has-background',
        style: '{"border":{"radius":"37px","width":"27px"}}',
      },
    });

    expect(tree.container).toMatchInlineSnapshot(`
      <div>
        <hr
          class="wp-block-separator has-text-color has-luminous-vivid-orange-color has-alpha-channel-opacity has-luminous-vivid-orange-background-color has-background"
          style="border-width: 27px; border-radius: 37px;"
        />
      </div>
    `);
  });
});
