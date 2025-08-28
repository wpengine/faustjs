# Kitchen Sink Example

A comprehensive Next.js example showcasing FaustJS features including template hierarchy, data fetching, and WordPress integration.

## Features

- **Template Hierarchy**: Dynamic WordPress template mapping (single, page, archive, home)
- **Data Fetching**: Server-side rendering with WordPress GraphQL data
- **Preview Mode**: WordPress post/page previews with authentication
- **Fallback Routing**: Catch-all routing with blocking fallback strategy
- **Dynamic Loading**: Code-split templates for optimal performance

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables:

   ```bash
   cp .env.example .env.local
   # Add your NEXT_PUBLIC_WORDPRESS_URL
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

## Architecture

- Uses `[[...identifier]].js` for dynamic WordPress routing
- Template queries are fetched server-side using `@faustjs/data-fetching`
- WordPress templates are dynamically loaded based on content type
- Supports both static generation and draft previews

Perfect for testing FaustJS capabilities and as a reference implementation.
