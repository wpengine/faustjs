# @faustjs/astro

Astro integration for FaustJS template hierarchy, providing WordPress template resolution and content collection loaders.

## Overview

This package provides utilities for integrating WordPress template hierarchy into Astro applications, including reusable content collection loaders and template resolution functions.

## Features

- **Template Loaders**: Reusable content collection loaders for WordPress templates
- **Template Resolution**: WordPress template hierarchy resolution using `uriToTemplate`
- **Type Safety**: Comprehensive JSDoc type definitions
- **Flexible Configuration**: Customizable template paths and options

## Installation

```bash
npm install @faustjs/astro
```

## Usage

### Content Collection Setup

Set up your content collections to automatically discover WordPress templates:

**src/content/config.js:**

```javascript
import { defineCollection } from 'astro:content';
import { createTemplateCollection } from '@faustjs/astro';

// Default WordPress template collection (uses "wp-templates" path under src/pages.)
const templates = defineCollection(createTemplateCollection());

// Custom template collection with different path
const templates = defineCollection(
	createTemplateCollection({
		templatePath: 'my-custom-templates',
	}),
);

// Full customization
const templates = defineCollection(
	createTemplateCollection({
		templatePath: 'templates',
		srcDir: 'src',
		pagesDir: 'pages',
		fileExtension: '.astro',
	}),
);

export const collections = { templates };
```

### Template Directory Structure

Create your WordPress templates in the expected directory:

```
src/pages/wp-templates/
├── single-post.astro     # Single post template
├── page.astro            # Page template
├── category.astro        # Category archive template
├── archive.astro         # Generic archive template
└── index.astro           # Fallback template
```

### Template Resolution

Use `uriToTemplate` to resolve WordPress URIs to template data:

```javascript
import { uriToTemplate } from '@faustjs/astro';

// In your Astro page or API route
const templateData = await uriToTemplate({ uri: '/hello-world/' });

// Returns:
// {
//   uri: '/hello-world/',
//   seedQuery: { data: {...}, error: null },
//   availableTemplates: [...],
//   possibleTemplates: ['single-post-hello-world', 'single-post', 'single', 'singular', 'index'],
//   template: { id: 'single-post', path: 'wp-templates/single-post' }
// }
```

## API Reference

### Template Collections

#### `createTemplateCollection(options)`

Create a complete template collection configuration with loader and schema.

**Parameters:**

- `options.templatePath` (string, default: "wp-templates") - Path to template files
- `options.srcDir` (string, default: "src") - Source directory path
- `options.pagesDir` (string, default: "pages") - Pages directory path
- `options.fileExtension` (string, default: ".astro") - Template file extension

**Returns:** Complete Astro content collection configuration object

#### `templateSchema`

Zod schema for template collection entries. Defines the structure of template data.

**Type:** `z.object({ id: z.string(), path: z.string() })`

### Template Resolution

#### `uriToTemplate(options)`

Resolve a WordPress URI to template data using the template hierarchy.

**Parameters:**

- `options.uri` (string) - The URI to resolve

**Returns:** `Promise<TemplateData>` - Complete template resolution data

## Requirements

- Node.js 24+
- Astro 5+
- WordPress with GraphQL support

## License

MIT
