# FaustJS SvelteKit Template Hierarchy Example

This example demonstrates how to use FaustJS with SvelteKit to create a headless WordPress application with automatic template hierarchy support.

## What is Template Hierarchy?

WordPress template hierarchy determines which template file is used to display different types of content (posts, pages, archives, etc.). This example shows how to implement similar functionality in a SvelteKit application using FaustJS.

## Features

- ✅ Automatic template selection based on WordPress content type
- ✅ Support for custom post types and archives
- ✅ WordPress-style template hierarchy (single.svelte, archive.svelte, index.svelte)
- ✅ GraphQL data fetching with URQL
- ✅ Server-side rendering (SSR)

## Getting Started

### Prerequisites

- Node.js v16.0.0 or newer
- A WordPress site with the [FaustJS plugin](https://wordpress.org/plugins/faustwp/) installed
- WPGraphQL plugin installed on your WordPress site

### Installation

1. Clone this repository or copy this example
2. Install dependencies:

```bash
npm install
```

3. Configure your WordPress URL in the `.env` file:

```bash
WORDPRESS_URL=https://your-wordpress-site.com
```

### Development

Start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

The application will automatically:

- Fetch content from your WordPress site
- Determine the appropriate template based on the URL
- Render the content using the matching Svelte template

### Template Structure

Templates are located in `src/wp-templates/`:

- `index.svelte` - Default template (homepage, fallback)
- `single.svelte` - Single post/page template
- `archive.svelte` - Archive pages (categories, tags, custom post types)

### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## How It Works

1. The `[...uri]/+page.server.js` route catches all URLs
2. Uses `uriToTemplate()` from `@faustjs/sveltekit` to:
   - Query WordPress for content at the given URI
   - Determine the appropriate template type
   - Fetch the necessary data
3. Renders the content using the matching Svelte template

## Learn More

- [FaustJS Documentation](https://faustjs.org/docs/)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [WordPress Template Hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/)
