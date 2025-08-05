# @faustwp/block-support-example

Example showcasing Faust.js block editor support.


# How to setup block-support-example

## Pre-requisites

See <https://faustjs.org/tutorial/get-started-with-faust> and <https://faustjs.org/tutorial/get-started-with-wp-graphql-content-blocks> for reference

You have a WordPress instance with tne following plugins installed and active on your WordPress instance:

-  [WPGraphQL](https://github.com/wp-graphql/wp-graphql)
- [FaustWP](https://github.com/wpengine/faustjs/tree/canary/plugins/faustwp)
- [WPGraphQL Content Blocks](https://github.com/wpengine/wp-graphql-content-blocks)


In order to run the block-support example you need to do the following:


```bash
git clone git@github.com:wpengine/faustjs.git my-project
cd my-project/examples/next/block-support/
touch .env.local
```

Update the .env.local as per setup guide

```.env.local
# Your WordPress site URL
NEXT_PUBLIC_WORDPRESS_URL=https://faustexample.wpengine.com

# Plugin secret found in WordPress Settings->Headless
#FAUST_SECRET_KEY=

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
