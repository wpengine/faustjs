# @faustjs/nextjs Template Hierarchy Example

This example demonstrates how to use the `@faustjs/nextjs` package to automatically discover WordPress templates in a Next.js project using the WordPress template hierarchy.

## What This Example Shows

- **Template Discovery**: Automatically finds WordPress template files in your `wp-templates` directory
- **Template Registry**: Uses dynamic imports to organize and load templates efficiently
- **Template Hierarchy**: Follows WordPress template hierarchy rules for organizing templates
- **Template Resolution**: SSR catch-all route that dynamically resolves WordPress URLs to templates

## Project Structure

```
src/
├── components/
│   └── WordPressLayout.js     # Shared layout for all templates
├── pages/
│   ├── _app.js                # Next.js app wrapper
│   ├── _document.js           # Next.js document structure
│   ├── index.js               # Demo page showing discovered templates
│   ├── 404.js                 # Custom 404 page
│   └── [...uri].js            # Catch-all route implementing template resolution
├── styles/
│   └── globals.css            # Global styles
└── wp-templates/
    ├── index.js               # Template registry with dynamic imports
    ├── page.js                # Page template
    ├── single.js              # Single post template
    ├── archive.js             # Archive template
    └── index-template.js      # Index/fallback template
```

## How It Works

1. **Template Files**: Place your WordPress templates in `src/wp-templates/`
2. **Template Registry**: The `index.js` file exports all templates with dynamic imports
3. **Next.js Integration**: Uses Next.js dynamic imports for optimal loading
4. **SSR Resolution**: The `[...uri].js` route dynamically fetches content and resolves templates
5. **Shared Layout**: All templates use `WordPressLayout.js` for consistent styling
6. **Path Aliases**: Uses `@/` alias for clean imports (configured in `jsconfig.json` and `next.config.js`)

## Available Templates

The following templates are currently registered and available:

- **single.js** - Displays individual blog posts
- **page.js** - Displays individual WordPress pages
- **archive.js** - Displays category, tag, and other archive pages
- **index-template.js** - Fallback template for any content without a specific template

## Running the Example

```bash
# Install dependencies
pnpm install

# Copy environment configuration
cp .env.example .env.local

# Edit .env.local to set your WordPress URL
# WORDPRESS_URL=https://your-wordpress-site.com

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Template Discovery

The example shows discovered templates from the `wp-templates` directory on the home page, displaying:

- Template name and type
- File path information
- Template descriptions

The templates are loaded dynamically using Next.js dynamic imports for optimal performance.

## Live Template Router Demo

Try these example URLs to see the template hierarchy in action:

- `/about` → Resolves to `page.js` template
- `/hello-world` → Resolves to `single.js` template
- `/category/uncategorized` → Resolves to `archive.js` template
- `/tag/fun` → Resolves to `archive.js` template

## Environment Variables

Create a `.env.local` file with:

```bash
WORDPRESS_URL=https://your-wordpress-site.com
```

Replace with your actual WordPress site URL.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [@faustjs/nextjs Documentation](../../packages/nextjs/README.md) - Learn about the template hierarchy system
- [@faustjs/template-hierarchy Documentation](../../packages/template-hierarchy/README.md) - Understand the template hierarchy implementation

## Dependencies

This example uses:

- **@faustjs/nextjs** - Next.js integration for Faust.js
- **@faustjs/template-hierarchy** - Template hierarchy system
- **Next.js 15** - React framework
- **GraphQL** - Query language for APIs
- **React 18** - UI library
