# @faustjs/nextjs

Next.js integration for FaustJS template hierarchy (Pages Router support).

## Installation

```bash
npm install @faustjs/nextjs
# or
pnpm add @faustjs/nextjs
# or
yarn add @faustjs/nextjs
```

## Quick Start

### 1. Create Template Files

Create your WordPress templates in `src/wp-templates/`:

```
src/wp-templates/
├── index.js        # Template registry/exports
├── home.js         # Home/blog template
├── page.js         # Page template
├── single.js       # Single post template
├── archive.js      # Archive template
└── default.js      # Default fallback template
```

### 2. Create Templates

```jsx
// src/wp-templates/home.js
export default function HomeTemplate({ templateData }) {
	const { seedQuery } = templateData;
	const posts = seedQuery.data?.posts?.nodes || [];

	return (
		<div>
			<h1>Blog Home</h1>
			{posts.map((post) => (
				<article key={post.id}>
					<h2>{post.title}</h2>
					<div dangerouslySetInnerHTML={{ __html: post.content }} />
				</article>
			))}
		</div>
	);
}
```

```jsx
// src/wp-templates/single.js
export default function SingleTemplate({ templateData }) {
	const { seedQuery } = templateData;
	const post = seedQuery.data?.post;

	if (!post) {
		return <div>Post not found</div>;
	}

	return (
		<article>
			<h1>{post.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: post.content }} />
		</article>
	);
}
```

```jsx
// src/wp-templates/index.js - Template registry with dynamic imports
import dynamic from 'next/dynamic';

const home = dynamic(() => import('./home.js'), {
	loading: () => <p>Loading Home Template...</p>,
});

const single = dynamic(() => import('./single.js'), {
	loading: () => <p>Loading Single Template...</p>,
});

const page = dynamic(() => import('./page.js'), {
	loading: () => <p>Loading Page Template...</p>,
});

const archive = dynamic(() => import('./archive.js'), {
	loading: () => <p>Loading Archive Template...</p>,
});

const index = dynamic(() => import('./index-template.js'), {
	loading: () => <p>Loading Index Template...</p>,
});

export default { home, single, page, archive, index };
```

### 3. Create Catch-All Route

````jsx
// src/pages/[[...uri]].js
import { uriToTemplate } from '@faustjs/nextjs';
import availableTemplates from '@/wp-templates';

export default function Page(props) {
  const { templateData } = props;

  const PageTemplate = availableTemplates[templateData.template?.id];

  if (!PageTemplate) {
    return <div>Template not found</div>;
  }

  return <PageTemplate {...props} />;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const uri = Array.isArray(params?.uri)
    ? '/' + params.uri.join('/') + '/'
    : '/';

  const templateData = await uriToTemplate({
    uri,
    availableTemplates: Object.keys(availableTemplates),
    wordpressUrl: process.env.WORDPRESS_URL,
  });

  if (!templateData?.template?.id || templateData?.template?.id === '404 Not Found') {
    return { notFound: true };
  }

  return {
    props: {
      uri,
      templateData: JSON.parse(JSON.stringify(templateData)),
    },
  };
}
```### 4. Configure Environment

```bash
# .env.local
WORDPRESS_URL=https://your-wordpress-site.com
````

## API Reference

### Core Functions

#### `uriToTemplate(options)`

Resolves a URI to WordPress template data using the template hierarchy.

```js
import { uriToTemplate } from '@faustjs/nextjs';
import availableTemplates from '@/wp-templates';

const templateData = await uriToTemplate({
	uri: '/about/',
	availableTemplates: Object.keys(availableTemplates),
	wordpressUrl: process.env.WORDPRESS_URL,
});
```

#### `getSeedQuery(options)`

Executes the seed query to fetch WordPress content.

```js
import { getSeedQuery } from '@faustjs/nextjs';

const { data, error } = await getSeedQuery({
	uri: '/about/',
	wordpressUrl: process.env.WORDPRESS_URL,
});
```

### Pages Router Utilities

Since we use `next/dynamic` directly in the template index file, no additional utilities are needed. Simply import your templates and use them directly.

## Configuration

### NextJS Config

```js
// next.config.js
import { createNextJSConfig } from '@faustjs/nextjs';

const nextConfig = createNextJSConfig({
	wordpressUrl: process.env.WORDPRESS_URL,
});

export default nextConfig;
```

### Custom GraphQL Client

```js
import { GraphQLClient } from 'graphql-request';
import { uriToTemplate } from '@faustjs/nextjs';
import availableTemplates from '@/wp-templates';

const client = new GraphQLClient('https://example.com/index.php?graphql');

const templateData = await uriToTemplate({
	uri: '/about/',
	availableTemplates: Object.keys(availableTemplates),
	graphqlClient: client,
});
```

## Advanced Usage

### Custom Data Fetching

```js
// src/pages/[[...uri]].js
export async function getServerSideProps(context) {
	const { params } = context;
	const uri = Array.isArray(params?.uri)
		? '/' + params.uri.join('/') + '/'
		: '/';

	const templateData = await uriToTemplate({
		uri,
		availableTemplates: Object.keys(availableTemplates),
		wordpressUrl: process.env.WORDPRESS_URL,
	});

	if (!templateData?.template?.id) {
		return { notFound: true };
	}

	// Fetch additional data based on template and WordPress content
	let additionalData = {};

	if (templateData.template.id === 'single') {
		// Fetch related posts for single posts
		additionalData.relatedPosts = await fetchRelatedPosts(
			templateData.seedQuery.data.nodeByUri.id,
		);
	} else if (templateData.template.id === 'page') {
		// Fetch custom fields for pages
		additionalData.customFields = await fetchCustomFields(
			templateData.seedQuery.data.nodeByUri.id,
		);
	}

	return {
		props: {
			uri,
			templateData: JSON.parse(JSON.stringify(templateData)),
			additionalData,
		},
	};
}
```

### Template Usage

```js
import availableTemplates from '@/wp-templates';

// Use templates directly - they're already configured with next/dynamic
export default function Page({ templateData }) {
	const TemplateComponent = availableTemplates[templateData.template?.id];

	if (!TemplateComponent) {
		return <div>Template not found</div>;
	}

	return <TemplateComponent {...props} />;
}
```

### Static Generation

```js
// For ISR (Incremental Static Regeneration)
export async function getStaticProps(context) {
	const { params } = context;
	const uri = Array.isArray(params?.uri)
		? '/' + params.uri.join('/') + '/'
		: '/';

	const templateData = await uriToTemplate({
		uri,
		availableTemplates: Object.keys(availableTemplates),
		wordpressUrl: process.env.WORDPRESS_URL,
	});

	if (!templateData?.template?.id) {
		return { notFound: true };
	}

	return {
		props: {
			uri,
			templateData: JSON.parse(JSON.stringify(templateData)),
		},
		revalidate: 3600, // Revalidate every hour
	};
}

// Required for catch-all routes with getStaticProps
export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}
```

## TypeScript Support

The package includes TypeScript definitions. For best experience, create a types file:

```ts
// types/wordpress.ts
import type { NextJSTemplateData } from '@faustjs/nextjs';

export interface TemplateProps {
	templateData: NextJSTemplateData;
	uri: string;
	[key: string]: any;
}
```

## WordPress Setup

1. Install [WPGraphQL](https://www.wpgraphql.com/) plugin
2. Set your GraphQL endpoint in environment variables
3. Ensure your WordPress site is accessible from your Next.js application

## Template Hierarchy

The package follows WordPress template hierarchy rules:

- `index.js` - Default fallback template
- `home.js` - Home page template
- `page.js` - Default page template
- `single.js` - Default single post template
- `archive.js` - Default archive template
- `404.js` - 404 error template

More specific templates take precedence over general ones, following WordPress conventions.

## License

MIT
