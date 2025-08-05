# @faustjs/template-hierarchy

WordPress template hierarchy utilities for FaustJS applications.

## Overview

This package provides utilities for resolving WordPress template hierarchy in headless applications. It implements the WordPress template hierarchy system, allowing you to determine which template should be used for any given WordPress content based on the same rules WordPress uses internally.

## Features

- **WordPress Template Hierarchy**: Full implementation of WordPress's template hierarchy logic
- **URI Resolution**: Convert URIs to appropriate templates using WordPress data
- **GraphQL Integration**: Built-in seed query for fetching WordPress node data
- **Type Safety**: Comprehensive JSDoc type definitions for better developer experience
- **ESM Support**: Modern ES modules with no build step required

## Installation

```bash
npm install @faustjs/template-hierarchy
```

## Usage

### Basic Template Resolution

```javascript
import { getPossibleTemplates, getTemplate } from '@faustjs/template-hierarchy';

// Get possible templates for a WordPress node
const node = {
	__typename: 'Post',
	isContentNode: true,
	slug: 'hello-world',
	contentType: {
		node: { name: 'post' },
	},
};

const possibleTemplates = getPossibleTemplates(node);
// Returns: ['single-post-hello-world', 'single-post', 'single', 'singular', 'index']

// Find the first matching template from available templates
const availableTemplates = [
	{ id: 'single-post', path: './templates/single-post.js' },
	{ id: 'index', path: './templates/index.js' },
];

const template = getTemplate(availableTemplates, possibleTemplates);
// Returns: { id: 'single-post', path: './templates/single-post.js' }
```

### Using the Seed Query

```javascript
import { SEED_QUERY } from '@faustjs/template-hierarchy';

// Use the seed query to fetch WordPress node data
const { data } = await client.query(SEED_QUERY, { uri: '/hello-world/' });
const node = data.nodeByUri;

// Then use with template resolution
const possibleTemplates = getPossibleTemplates(node);
```

## Template Hierarchy Support

This package implements the complete WordPress template hierarchy, including:

### Page Templates

- Custom page templates (`template-{name}`)
- Front page (`front-page`)
- Blog page (`home`)
- Specific pages (`page-{slug}`, `page-{id}`)
- Generic page (`page`)

### Post Templates

- Custom post templates
- Single posts (`single-post-{slug}`, `single-post`, `single`)
- Custom post types (`single-{post-type}-{slug}`, `single-{post-type}`)

### Archive Templates

- Custom post type archives (`archive-{post-type}`)
- Category archives (`category-{slug}`, `category-{id}`, `category`)
- Tag archives (`tag-{slug}`, `tag-{id}`, `tag`)
- Custom taxonomy archives (`taxonomy-{taxonomy}-{term}`, `taxonomy-{taxonomy}`)
- Author archives (`author-{nicename}`, `author-{id}`, `author`)
- Generic archive (`archive`)

### Fallback

- Index template (`index`) - always available as final fallback

## API Reference

### `getPossibleTemplates(node)`

Generates an array of possible template names for a WordPress node in priority order.

**Parameters:**

- `node` (SeedNode): WordPress node data from GraphQL

**Returns:**

- `string[]`: Array of template names in priority order

### `getTemplate(availableTemplates, possibleTemplates)`

Finds the first matching template from available templates.

**Parameters:**

- `availableTemplates` (WordPressTemplate[]): Available template configurations
- `possibleTemplates` (string[]): Possible template names in priority order

**Returns:**

- `WordPressTemplate | undefined`: First matching template or undefined

### `SEED_QUERY`

GraphQL query for fetching WordPress node data needed for template resolution.

**Type:** `DocumentNode`

**Variables:**

- `uri` (string): The URI to fetch node data for
- `id` (ID): Database ID for preview content
- `asPreview` (boolean): Whether to fetch as preview content

## Types

The package includes comprehensive JSDoc type definitions:

- **SeedNode**: WordPress node data structure from GraphQL
- **WordPressTemplate**: Template configuration object

## Requirements

- Node.js 24+
- ESM support
- GraphQL client (for using `SEED_QUERY`)

## License

MIT

## Contributing

This package is part of the FaustJS monorepo. Please see the main repository for contribution guidelines.
