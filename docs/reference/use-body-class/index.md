---
title: "useBodyClass"
description: "Reference for adding WordPress-style body classes like single-post or category-news to Faust.js pages."
---

WordPress themes add classes like `home`, `single-post`, `postid-123` and `category-news` to `<body>`. Faust.js can add the same classes, so CSS ported from a theme keeps working.

## Add body classes to every WordPress page

Pass `bodyClass` to `WordPressTemplate` on every page that renders it. In the getting-started example, that's `pages/index.js`, `pages/[...wordpressNode].js` and `pages/preview.js`:

```js title="pages/[...wordpressNode].js"
export default function Page(props) {
	return <WordPressTemplate {...props} bodyClass />;
}
```

The classes are worked out from the seed node Faust.js already loads, and they also work in previews. They're off unless you set `bodyClass`.

| Page | Classes |
| --- | --- |
| Static front page | `home`, plus its page classes |
| Posts page | `blog` |
| Single post or custom post type | `single`, `single-{post type}`, `postid-{id}` |
| Attachment | `single`, `single-attachment`, `postid-{id}`, `attachment`, `attachmentid-{id}` |
| Page | `page`, `page-id-{id}`, `page-template-default` or `page-template-{template name}` |
| Category | `archive`, `category`, `category-{slug}`, `category-{id}` |
| Tag | `archive`, `tag`, `tag-{slug}`, `tag-{id}` |
| Other taxonomy term | `archive`, `tax-{taxonomy}`, `term-{slug}`, `term-{id}` |
| Author | `archive`, `author`, `author-{id}` |
| Post type archive | `archive`, `post-type-archive`, `post-type-archive-{post type}` |

Previews also get `logged-in`, since you have to be logged in to see them. When the Faust toolbar is showing, it adds `admin-bar`, even without `bodyClass`.

These are a subset of what WordPress's `body_class()` adds. Page template classes use the template's name, such as `page-template-full-width` for "Full Width", rather than its file name, and filters on `body_class` don't apply. As in WordPress, characters that can't go in a class name are removed from slugs.

## useBodyClass

To add your own classes, call the `useBodyClass` hook from any component. The classes are added while the component is mounted and removed when it unmounts or the list changes.

```js
import { useBodyClass } from "@faustwp/core";

export default function Landing() {
	useBodyClass(["landing", "dark"]);

	return <main>…</main>;
}
```

To get the WordPress classes yourself, for example to add them to an element other than `<body>`, call `getBodyClasses(seedNode)`. It returns them as an array.
