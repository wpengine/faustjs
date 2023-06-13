/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import { CoreCode, CoreCodeFragmentProps } from '../../src/blocks/CoreCode.js';

function renderProvider(props: CoreCodeFragmentProps) {
  return render(
    <WordPressBlocksProvider config={{ blocks: {}, theme: {} }}>
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
        backgroundColor: 'vivid-red',
        borderColor: 'pale-cyan-blue',
        content: '&lt;div&gt;My code block&lt;/div&gt;',
        cssClassName:
          'wp-block-code has-border-color has-pale-cyan-blue-border-color has-background-color has-vivid-red-background-color has-text-color has-background has-medium-font-size',
        fontSize: 'medium',
        style: '{"border":{"radius":"37px","width":"27px"}}',
        textColor: 'background',
      },
    });

    expect(tree.container).toMatchSnapshot(`
    <div>
      <pre
        class="wp-block-code has-border-color has-pale-cyan-blue-border-color has-background-color has-vivid-red-background-color has-text-color has-background has-medium-font-size"
        style="border-width: 27px; border-radius: 37px;"
      >
        <code>
          &lt;div&gt;My code block&lt;/div&gt;
        </code>
      </pre>
    </div>
    `);
  });
});
