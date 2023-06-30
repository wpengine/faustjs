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
        width: 498,
        height: 310,
        style: 'border-width:44px;border-radius:83px',
        caption: 'this_is_a_caption',
        src: '/image.png',
        href: 'https://google.com',
      },
    });

    expect(screen.queryByAltText('testing_alt_text')).toBeInTheDocument();

    expect(screen.queryByText(/this_is_a_caption/i)).toBeInTheDocument();

    expect(screen.queryByRole('img')).toBeInTheDocument();

    expect(screen.queryByRole('link')).toBeInTheDocument();
  });

  test('applies the correct styles for a regular img', () => {
    const tree = renderProvider({
      attributes: {
        align: 'wide',
        alt: 'My alt text',
        anchor: 'my-anchor',
        caption: 'My caption',
        className: 'is-style-rounded',
        cssClassName:
          'wp-block-image alignwide size-large has-custom-border is-style-rounded',
        href: 'http://localhost:3000/hello-world/my-image/',
        id: 429,
        linkClass: 'my-link-class',
        linkDestination: 'attachment',
        linkTarget: '_blank',
        rel: 'noreferrer noopener',
        sizeSlug: 'large',
        src: 'http://headless.local/wp-content/uploads/2022/12/My-image-1024x576.png',
        style: '{"border":{"width":"27px"}}',
        title: 'mytitle',
        url: 'http://localhost:3000/wp-content/uploads/2022/12/My-image-1024x576.png',
      },
    });

    expect(tree.container).toMatchInlineSnapshot(`
    <div>
      <figure
        class="wp-block-image alignwide size-large has-custom-border is-style-rounded"
        id="my-anchor"
      >
        <a
          class="my-link-class"
          href="http://localhost:3000/hello-world/my-image/"
          rel="noreferrer noopener"
          target="_blank"
        >
          <img
            alt="My alt text"
            src="http://headless.local/wp-content/uploads/2022/12/My-image-1024x576.png"
            style="border-width: 27px;"
            title="mytitle"
          />
        </a>
        <figcaption
          class="wp-element-caption"
        >
          My caption
        </figcaption>
      </figure>
    </div>
    `);
  });

  test('applies the correct styles for a Next.js img', () => {
    const tree = renderProvider({
      attributes: {
        alt: 'My alt text',
        anchor: 'my-anchor',
        caption: '',
        className: 'another-class',
        cssClassName: 'wp-block-image size-large is-resized another-class',
        height: 578,
        id: 389,
        linkDestination: 'none',
        sizeSlug: 'large',
        src: 'http://headless.local/wp-content/uploads/2022/09/carbon5-1024x578.png',
        title: 'mytitle',
        url: 'http://localhost:3000/wp-content/uploads/2022/09/carbon5-1024x578.png',
        width: 1024,
      },
    });

    expect(tree.container).toMatchInlineSnapshot(`
    <div>
      <figure
        class="wp-block-image size-large is-resized another-class"
        id="my-anchor"
      >
        <img
          alt="My alt text"
          src="http://headless.local/wp-content/uploads/2022/09/carbon5-1024x578.png"
          style="flex-basis: 1024px; height: 578px;"
          title="mytitle"
        />
        
      </figure>
    </div>
    `);
  });
});
