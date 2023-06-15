/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import {
  CoreImage,
  CoreImageFragmentProps,
} from '../../src/blocks/CoreImage.js';
import { BlockWithAttributes } from '../../src/components/WordPressBlocksViewer';

function renderProvider(props: BlockWithAttributes<CoreImageFragmentProps>) {
  return render(
    <WordPressBlocksProvider config={{ blocks: [], theme: {} }}>
      <CoreImage {...props} />
    </WordPressBlocksProvider>,
  );
}

describe('<CoreImage />', () => {
  test('renders the component correctly', () => {
    renderProvider({
      attributes: {
        alt: 'testing_alt_text',
        width: '498',
        height: '310',
        style: 'border-width:44px;border-radius:83px',
      },
    });

    expect(
      screen.queryByAltText('testing_alt_text'),
    );

  });

  test('applies the correct styles', () => {
    const tree = renderProvider({
      attributes: {
            width: '498',
            height: '310',
            alt: 'This is alt text for core image',
            style: 'border-width:44px;border-radius:83px',
      },
    });

    expect(tree.container).toMatchInlineSnapshot(`
      <figure>
        <img>
          width="498"
          height="310"
          alt="This is alt text for core image"
          style="border-width:44px;border-radius:83px"
        </img>
      </figure>
    `);
  });
});