/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import { CoreCode, CoreCodeFragmentProps } from '../../src/blocks/CoreCode.js';
import { BlockWithAttributes } from '../../src/components/WordPressBlocksViewer';

function renderProvider(props: BlockWithAttributes<CoreCodeFragmentProps>) {
  return render(
    <WordPressBlocksProvider config={{ blocks: [], theme: {} }}>
      <CoreCode {...props} />
    </WordPressBlocksProvider>,
  );
}

describe('<CoreCode />', () => {
  test('renders the component correctly', () => {
    renderProvider({
      attributes: { content: '&lt;div&gt;My code block here&lt;/div&gt;' },
    });
    expect(
      screen.queryByText('<div>My code block here</div>'),
    ).toBeInTheDocument();
  });

  test('applies the correct styles', () => {
    const tree = renderProvider({
      attributes: {
        backgroundColor: 'secondary',
        textColor: 'primary',
        cssClassName:
          'wp-block-code has-secondary-background-color has-background',
        style: '{"typography":{"fontSize":"36px"}}',
        content: '&lt;div&gt;My code block here&lt;/div&gt;',
      },
    });

    expect(tree.container).toMatchInlineSnapshot(`
      <div>
        <pre
          style="font-size:36px;background-color:var(--wp--preset--color--secondary)"
          class="wp-block-code has-secondary-background-color has-background">
          <code>&lt;div&gt;My code block here&lt;/div&gt;</code>
        </pre>
      </div>
    `);
  });
});
