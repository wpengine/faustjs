# @faustjs/astro Template Hierarchy Example

This example demonstrates how to use the `@faustjs/astro` package to automatically discover WordPress templates in an Astro project using the WordPress template hierarchy.

## What This Example Shows

- **Template Discovery**: Automatically finds WordPress template files in your `wp-templates` directory
- **Content Collections**: Uses Astro's content collections to organize and query templates
- **Template Hierarchy**: Follows WordPress template hierarchy rules for organizing templates
- **Template Resolution**: SSR catch-all route that dynamically resolves WordPress URLs to templates

## Project Structure

```
src/
├── layouts/
│   └── WordPressLayout.astro  # Shared layout for all templates
├── content.config.js          # Content collection configuration
└── pages/
    ├── index.astro            # Demo page showing discovered templates
    ├── 404.astro              # Custom 404 page
    ├── [...uri].astro         # Catch-all route implementing template resolution
    └── wp-templates/          # WordPress template files (protected from direct access)
        ├── index.astro        # Home/blog template
        ├── page.astro         # Page template
        ├── single-post.astro  # Single post template
        └── archive.astro      # Archive template
```

## How It Works

1. **Template Files**: Place your WordPress templates in `src/pages/wp-templates/`
2. **Auto-Discovery**: The `createTemplateCollection()` function finds all template files
3. **Content Collections**: Templates are available as an Astro content collection with `id` and `path`
4. **SSR Resolution**: The `[...uri].astro` route dynamically fetches content and resolves templates
5. **Shared Layout**: All templates use `WordPressLayout.astro` for consistent styling
6. **Template Protection**: Templates can't be accessed directly (e.g., `/wp-templates/page` returns 404)

## Running the Example

```bash
# Install dependencies (includes GraphQL requirements)
pnpm install

# Copy environment configuration
cp .env.example .env

# Edit .env to set your WordPress URL
# WORDPRESS_URL=https://your-wordpress-site.com

# Start development server (SSR mode)
pnpm dev

# Build for production (outputs server bundle)
pnpm build
```

## Dependencies

This example requires the following dependencies (automatically installed):

- `@faustjs/astro` - Astro integration with WordPress template hierarchy
- `@faustjs/template-hierarchy` - Core template hierarchy logic
- `astro` - Astro framework (peer dependency)
- `graphql` - GraphQL core library (peer dependency)
- `graphql-tag` - GraphQL query parsing (peer dependency)

## WordPress Setup

This example requires a WordPress site with WPGraphQL plugin installed:

1. **Install WPGraphQL**: Install the [WPGraphQL plugin](https://www.wpgraphql.com/) on your WordPress site
2. **Set Environment Variable**: Copy `.env.example` to `.env` and set your WordPress URL
3. **GraphQL Endpoint**: The endpoint should be `https://your-site.com/graphql`

### Supported WordPress Content

The example automatically discovers and creates routes for:

- **Posts**: Individual blog posts with categories and tags
- **Pages**: Static pages like About, Contact, etc.
- **Category Archives**: Archive pages for each category
- **Tag Archives**: Archive pages for each tag
- **Home Page**: Main blog index

## Template Discovery

The `@faustjs/astro` package automatically discovers templates in your `wp-templates` directory:

- **index.astro** → Home template
- **page.astro** → Page template
- **single-post.astro** → Single post template
- **archive.astro** → Archive template

Each template is automatically added to the content collection with an `id` and `path`.

## Template Resolution Demo

The catch-all route (`[...uri].astro`) fetches real WordPress content and demonstrates URL resolution:

- `/` → `index.astro` (home page)
- `/about` → `page.astro` (WordPress page)
- `/hello-world` → `single-post.astro` (WordPress post)
- `/category/uncategorized` → `archive.astro` (category archive)
- `/tag/fun` → `archive.astro` (tag archive)

_Note: Actual URLs depend on your WordPress content_

## Content Collection Usage

```js
// Get all templates
import { getCollection } from 'astro:content';
const templates = await getCollection('templates');

// Find a specific template by id
const pageTemplate = templates.find((t) => t.id === 'page');

// Each template has: { id: string, path: string }
console.log(pageTemplate); // { id: 'page', path: 'wp-templates/page' }
```

## Real-World Usage

This example shows how a real WordPress headless site works with SSR:

1. **WordPress GraphQL API**: Dynamically fetches content from WordPress on each request
2. **Server-Side Rendering**: Renders pages on-demand with fresh WordPress content
3. **Template Resolution**: Uses WordPress template hierarchy to render content
4. **Content Types**: Handles posts, pages, categories, and tags dynamically
5. **SEO Ready**: Generates proper HTML with fresh WordPress content
6. **404 Handling**: Automatically redirects to 404 for non-existent content

## Learn More

- [WordPress Template Hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [@faustjs/template-hierarchy](../packages/template-hierarchy/)
