/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import { CoreList, CoreListFragmentProps } from '../../src/blocks/CoreList';

function renderProvider(props: CoreListFragmentProps) {
  return render(
    <WordPressBlocksProvider config={{ blocks: {}, theme: {} }}>
      <CoreList {...props} />
    </WordPressBlocksProvider>,
  );
}

describe('<CoreList />', () => {
  test('renders the proper ordered list', async () => {
    renderProvider({
      attributes: {
        values: '<li>Some Item</li><li>Another Item</li><li>One more item</li>',
      },
    });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(
      screen.getAllByRole('listitem').map((el) => el.textContent),
    ).toStrictEqual(['Some Item', 'Another Item', 'One more item']);
  });

  test('applies the correct styles', () => {
    const tree = renderProvider({
      attributes: {
        fontSize: 'large',
        ordered: true,
        reversed: true,
        start: 2,
        style: '{"color":{"background":"#5b2b2b"}}',
        textColor: 'background',
        values: '<li>My</li><li>Unordered</li><li>List</li>',
        cssClassName:
          'has-background-color has-text-color has-background has-large-font-size',
      },
    });

    expect(tree.container).toMatchInlineSnapshot(`
    <div>
      <ol
        class="has-background-color has-text-color has-background has-large-font-size"
        reversed=""
        start="2"
        style="background-color: rgb(91, 43, 43);"
      >
        <li>
          My
        </li>
        <li>
          Unordered
        </li>
        <li>
          List
        </li>
      </ol>
    </div>
    `);
  });
});
