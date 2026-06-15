/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import { CoreList, CoreListFragmentProps } from '../../src/blocks/CoreList';
import { CoreListItem } from '../../src/blocks/CoreListItem';

function renderProvider(props: CoreListFragmentProps) {
  const blocks = {
    CoreListItem,
    CoreList,
  };

  return render(
    <WordPressBlocksProvider config={{ blocks, theme: {} }}>
      <CoreList {...props} />
    </WordPressBlocksProvider>,
  );
}

describe('<CoreList />', () => {
  test('renders the proper ordered list', async () => {
    renderProvider({
      attributes: {
        values: '<li>Some Item</li><li>Another Item</li><li>One more item</li>',
        ordered: true,
      },
      innerBlocks: [
        {
          __typename: 'CoreListItem',
          attributes: {
            content: 'Some Item',
          },
        },
        {
          __typename: 'CoreListItem',
          attributes: {
            content: 'Another Item',
          },
        },
        {
          __typename: 'CoreListItem',
          attributes: {
            content: 'One more item',
          },
        },
      ],
    });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('list')).toHaveProperty('nodeName', 'OL');
    expect(
      screen
        .getAllByRole('listitem')
        .map((el) => el.querySelector('div')?.textContent),
    ).toStrictEqual(['Some Item', 'Another Item', 'One more item']);
  });

  test('renders deep lists', () => {
    const tree = renderProvider({
      attributes: {
        values:
          '<li>Level 1\n<ul class="wp-block-list">\n<li>Level 2\n<ul class="wp-block-list">\n<li>Level 3</li>\n</ul>\n</li>\n</ul>\n</li><li>Level 2\n<ul class="wp-block-list">\n<li>Level 3</li>\n</ul>\n</li><li>Level 3</li><li>Level 2\n<ul class="wp-block-list">\n<li>Level 3</li>\n</ul>\n</li><li>Level 3</li><li>Level 3</li>',
        cssClassName: 'wp-block-list',
      },
      innerBlocks: [
        {
          __typename: 'CoreListItem',
          attributes: {
            content:
              'Level 1\n<ul class="wp-block-list">\n<li>Level 2\n<ul class="wp-block-list">\n<li>Level 3</li>\n</ul>\n</li>\n</ul>\nLevel 2\n<ul class="wp-block-list">\n<li>Level 3</li>\n</ul>\nLevel 3',
          },
          innerBlocks: [
            {
              __typename: 'CoreList',
              attributes: {
                values:
                  '<li>Level 2\n<ul class="wp-block-list">\n<li>Level 3</li>\n</ul>\n</li><li>Level 3</li><li>Level 3</li>',
                cssClassName: 'wp-block-list',
              },
              innerBlocks: [
                {
                  __typename: 'CoreListItem',
                  attributes: {
                    content:
                      'Level 2\n<ul class="wp-block-list">\n<li>Level 3</li>\n</ul>\nLevel 3',
                  },
                  innerBlocks: [
                    {
                      __typename: 'CoreList',
                      attributes: {
                        values: '<li>Level 3</li>',
                        cssClassName: 'wp-block-list',
                      },
                      innerBlocks: [
                        {
                          __typename: 'CoreListItem',
                          attributes: {
                            content: 'Level 3',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    expect(tree.container).toMatchInlineSnapshot(`
      <div>
        <ul
          class="wp-block-list"
        >
          <li>
            <div>
              Level 1
            </div>
            <ul
              class="wp-block-list"
            >
              <li>
                <div>
                  Level 2
                </div>
                <ul
                  class="wp-block-list"
                >
                  <li>
                    <div>
                      Level 3
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    `);
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
      innerBlocks: [
        {
          __typename: 'CoreListItem',
          attributes: {
            content: 'My',
          },
        },
        {
          __typename: 'CoreListItem',
          attributes: {
            content: 'Ordered',
          },
        },
        {
          __typename: 'CoreListItem',
          attributes: {
            content: 'List',
          },
        },
      ],
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
          <div>
            My
          </div>
        </li>
        <li>
          <div>
            Ordered
          </div>
        </li>
        <li>
          <div>
            List
          </div>
        </li>
      </ol>
    </div>
    `);
  });
});
