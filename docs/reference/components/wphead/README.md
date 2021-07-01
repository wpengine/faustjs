# WPHead

The `<WPHead>` component injects a title element and stylesheets needed by the current WordPress page.

WPHead requires [Next.js](https://nextjs.org/) with the `usePost` and `useGeneralSettings` custom hooks from the `@wpengine/headless` package. These hooks assume the connected WordPress site is using GraphQL and your JavaScript app is using the `HeadlessProvider` component.

## Usage

Add the `<WPHead>` component to your site's header:

```tsx
import React from 'react';
import { WPHead } from '@wpengine/headless/nest';

function Header(): JSX.Element {
  return (
    <>
      <WPHead />
      <header>
          {/* Your site title and menu items here*/}
      </header>
    </>
  );
}

export default Header;
```

Your site's head will contain the page title and stylesheets required by WordPress, such as Gutenberg block CSS.

## Add extra content to head

Use the [Next.js `Head` component](https://nextjs.org/docs/api-reference/next/head) before `WPHead` to add additional elements to the site head:

```tsx
import React from 'react';
import { WPHead } from '@wpengine/headless/next';
import Head from 'next/head';

function Header(): JSX.Element {
  return (
    <>
      <Head>
        <title>{/* Title is required here but replaced by WPHead. */}</title>
        {/* Add extra elements to <head> here, such as web font links: */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?display=swap&amp;family=Public%20Sans%3Aital%2Cwght%400%2C100..900%3B1%2C100..900&amp;subset=latin%2Clatin-ext"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?display=swap&amp;family=Public%20Sans%3Aital%2Cwght%400%2C100..900%3B1%2C100..900&amp;subset=latin%2Clatin-ext"
          type="text/css"
          media="all"
        />
      </Head>
      {/* Next.js combines elements in the Head component above with those in WPHead. */}
      <WPHead />
      <header>
        {/* Your site title and menu items here*/}
      </header>
    </>
  );
}

export default Header;
```

## Override the WPHead page title

Place a Next.js `Head` component _after_ `WPHead` to override its title:

```tsx
import React from 'react';
import { WPHead } from '@wpengine/headless/next';
import Head from 'next/head';

function Header(): JSX.Element {
  return (
    <>
      <WPHead />
      <Head>
          <title>Your custom page title here</title>
      </Head>
      <header>
          {/* Your site title and menu items here*/}
      </header>
    </>
  );
}

export default Header;
```

A page can contain multiple Next.js `<Head>` components. Next.js will combine them into one.
