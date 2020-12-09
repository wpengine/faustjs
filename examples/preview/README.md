# Headless WordPress Previews Example

[Preview Documentation](../../docs/previews/README.md)

# Configuration

## WordPress

Install the latest plugin for this project and [WPGraphQL](https://wordpress.org/plugins/wp-graphql/)

## Example Project

The framework expects a few environment variables. Create a file in the root of the example project `/.env.local`.

```
# Base URL for WordPress
NEXT_PUBLIC_WORDPRESS_URL=http://yourwpsite.com

# Plugin secret found in WordPress Settings->Headless
WPE_HEADLESS_SECRET=YOUR_PLUGIN_SECRET

```

## Run it

```
npm i
npm run dev
```

[http://localhost:3000]()
