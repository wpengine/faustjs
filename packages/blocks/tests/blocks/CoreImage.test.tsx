/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WordPressBlocksProvider } from '../../src/components/WordPressBlocksProvider';
import {
  CoreImage,
  CoreImageFragmentProps,
} from '../../src/blocks/CoreImage.js';

function renderProvider(props: CoreImageFragmentProps) {
  return render(
    <WordPressBlocksProvider config={{ blocks: {}, theme: {} }}>
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
        caption: 'this_is_a_caption',
        src: 'image.png'
      },
    });

    expect(
      screen.queryByAltText('testing_alt_text'),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('testing', {
        name: /this_is_a_caption/i
      })
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('img')
    ).toBeInTheDocument()

  });


  test('applies the correct styles', () => {
    const tree = renderProvider({
      attributes: {
            width: "498",
            height: "310",
            alt: "This is alt text for core image",
            style: "{\"border\":{\"radius\":\"83px\",\"width\":\"44px\"}}"
      },
    });

    expect(tree.container).toMatchInlineSnapshot(`
      <div>
        <figure>
          <img
            alt="This is alt text for core image"
            height="310"
            style="border-width: 44px; border-radius: 83px;"
            width="498"
          />
        </figure>
      </div>
     `);
  });
});