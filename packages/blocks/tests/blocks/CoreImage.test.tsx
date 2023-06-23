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
        src: '/image.png',
      },
    });

    expect(screen.queryByAltText('testing_alt_text')).toBeInTheDocument();

    expect(screen.queryByText(/this_is_a_caption/i)).toBeInTheDocument();
    
    expect(screen.queryByRole('img')).toBeInTheDocument();
  });

  test('applies the correct styles', () => {
    const tree = renderProvider({
      attributes: {
        width: '498',
        height: '310',
        alt: 'This is alt text for core image',
        style: '{"border":{"radius":"83px","width":"44px"}}',
        src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      },
    });

    expect(tree.container).toMatchSnapshot();

    //   expect(tree.container).toMatchInlineSnapshot(`
    //     <div>
    //       <figure>
    //         <img
    //           alt="This is alt text for core image"
    //           height="310"
    //           style="border-width: 44px; border-radius: 83px;"
    //           width="498"
    //         />
    //       </figure>
    //     </div>
    //    `);

    expect(tree.container).toMatchInlineSnapshot(`
      <div>
        <figure>
          <span
            style="box-sizing: border-box; display: inline-block; overflow: hidden; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;"
          >
            <span
              style="box-sizing: border-box; display: block; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; max-width: 100%;"
            >
              <img
                alt=""
                aria-hidden="true"
                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27498%27%20height=%27310%27/%3e"
                style="display: block; max-width: 100%; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;"
              />
            </span>
            <img
              alt="This is alt text for core image"
              data-nimg="intrinsic"
              decoding="async"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              style="border-radius: 83px; height: 0px; position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; box-sizing: border-box; padding: 0px; margin: auto; display: block; width: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;"
            />
            <noscript />
          </span>
        </figure>
      </div>
    `);
  });
});