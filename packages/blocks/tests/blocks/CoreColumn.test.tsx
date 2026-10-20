/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import {
  CoreColumn,
  CoreColumnFragmentProps,
} from '../../src/blocks/CoreColumn.js';

function renderProvider(props: CoreColumnFragmentProps) {
  const blocks = {
    CoreParagraph: () => {
      return <p>Hello World</p>;
    },
  };
  return render(
    <WordPressBlocksProvider config={{ blocks, theme: {} }}>
      <CoreColumn {...props} />
    </WordPressBlocksProvider>,
  );
}

const innerBlocks = [{ name: 'CoreParagraph' }];

describe('<CoreColumn />', () => {
  test('renders the inner blocks', () => {
    renderProvider({ innerBlocks, attributes: {} });
    expect(screen.queryByText('Hello World')).toBeInTheDocument();
  });

  test('renders no layout styles when inner blocks use the full width', () => {
    const { container } = renderProvider({
      innerBlocks,
      attributes: {
        cssClassName: 'wp-block-column',
        layout: '{"type":"default"}',
      },
    });
    expect(container.querySelector('style')).toBeNull();
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="wp-block-column"
      >
        <p>
          Hello World
        </p>
      </div>
    `);
  });

  test('applies the content width to the inner blocks, not the column', () => {
    const { container } = renderProvider({
      innerBlocks,
      attributes: {
        cssClassName: 'wp-block-column',
        layout: '{"type":"constrained","contentSize":"300px","wideSize":"600px"}',
      },
    });
    const column = screen.queryByText('Hello World')?.parentElement;
    expect(column).not.toHaveStyle({ maxWidth: '300px' });
    expect(column).toHaveClass('wp-block-column');

    const containerClass = Array.from(column?.classList ?? []).find((name) =>
      name.startsWith('wp-container-core-column-faust-'),
    );
    expect(containerClass).toBeDefined();

    const css = container.querySelector('style')?.textContent;
    expect(css).toBe(
      [
        `.${containerClass} > :where(:not(.alignleft):not(.alignright):not(.alignfull)) { max-width: 300px; margin-left: auto !important; margin-right: auto !important; }`,
        `.${containerClass} > .alignwide { max-width: 600px; }`,
        `.${containerClass} > .alignfull { max-width: none; }`,
      ].join('\n'),
    );
  });

  test('keeps inner blocks to one side when justified', () => {
    const { container } = renderProvider({
      innerBlocks,
      attributes: {
        layout:
          '{"type":"constrained","contentSize":"300px","justifyContent":"left"}',
      },
    });
    const css = container.querySelector('style')?.textContent;
    expect(css).toContain(
      'max-width: 300px; margin-left: 0 !important; margin-right: auto !important;',
    );
    expect(css).toContain('> .alignwide { max-width: 300px; }');
  });

  test('gives the same layout the same class name', () => {
    const layout = '{"type":"constrained","contentSize":"300px"}';
    const first = renderProvider({ innerBlocks, attributes: { layout } });
    const firstClass = first.container.querySelector('div')?.className;
    first.unmount();

    const second = renderProvider({ innerBlocks, attributes: { layout } });
    expect(second.container.querySelector('div')?.className).toBe(firstClass);
  });

  test('strips characters that could break out of the style element', () => {
    const { container } = renderProvider({
      innerBlocks,
      attributes: {
        layout:
          '{"type":"constrained","contentSize":"300px;}</style><script>alert(1)</script>"}',
      },
    });
    const css = container.querySelector('style')?.textContent ?? '';
    expect(css).not.toMatch(/[<>{};]\s*script|<\/style>/);
    expect(container.querySelector('script')).toBeNull();
  });
});
