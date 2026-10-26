# @faustwp/block-support-example

Example showcasing Faust.js block editor support.


# How to setup block-support-example

## Pre-requisites

See [Basic Setup](https://faustjs.org/docs/how-to/basic-setup/) and [Rendering Blocks](https://faustjs.org/docs/how-to/rendering-blocks/) for reference.

You need your own WordPress site with these plugins installed and active:

-  [WPGraphQL](https://github.com/wp-graphql/wp-graphql)
- [FaustWP](https://github.com/wpengine/faustjs/tree/canary/plugins/faustwp)
- [WPGraphQL Content Blocks](https://github.com/wpengine/wp-graphql-content-blocks)

The example only has a front page template, so set a static front page in Settings > Reading and add some blocks to it.


In order to run the block-support example you need to do the following:


```bash
git clone git@github.com:wpengine/faustjs.git my-project
cd my-project/examples/next/block-support/
cp .env.local.sample .env.local
```

Update the .env.local as per setup guide

```.env.local
# Your WordPress site URL
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com

# Plugin secret found in WordPress Settings->Faust
FAUST_SECRET_KEY=YOUR_PLUGIN_SECRET

# The URL of your site, used by Faust for sitemap generation, however you can name this whatever you want.
NEXT_PUBLIC_SITE_URL=http://localhost:3000

```

Finally
```
nvm use
npm install
npm run blockset
npm run dev
```

Your site should now be working on http://localhost:3000
