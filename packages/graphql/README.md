# @faustjs/graphql

Shared GraphQL utilities for FaustJS packages.

## Features

- Default GraphQL client using fetch
- Global client configuration with fallback priority
- WordPress URL utilities
- Framework-agnostic GraphQL endpoint handling

## Installation

```bash
npm install @faustjs/graphql
# or
pnpm add @faustjs/graphql
# or
yarn add @faustjs/graphql
```

## Usage

### Basic Usage

```js
import {
	setGraphQLClient,
	getGraphQLClient,
	createDefaultClient,
} from '@faustjs/graphql';

// Create and set up client explicitly
const client = createDefaultClient('https://my-wordpress-site.com');
setGraphQLClient(client);

// Later, get the configured client
const configuredClient = getGraphQLClient();

// Use client for your own queries
const result = await configuredClient.request(yourQuery, variables);
```

### Client Priority System

The GraphQL client uses a simple priority system:

1. **Provided Client**: Client passed directly to functions
2. **Configured Client**: Client set globally with `setGraphQLClient()`
3. **Error**: No automatic fallback - explicit setup required

This explicit approach ensures you know exactly which client is being used.

### Environment Variables

The package supports these environment variables:

- `WORDPRESS_URL` - Your WordPress site URL
- Framework-specific variants (e.g., `NEXT_PUBLIC_WORDPRESS_URL`)

## API Reference

### `setGraphQLClient(client)`

Set a global GraphQL client.

### `createDefaultGraphQLClient(wordpressUrl)`

Create a default fetch-based GraphQL client. Requires explicit WordPress URL.

### `getGraphQLClient(providedClient)`

Get a GraphQL client using the priority system. Throws error if no client is available.

## License

MIT
