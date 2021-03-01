# Blocks

Here's a built-in way for you to write custom blocks, with less than half the code.

1. Clone the WordPress plugin [Headless Blocks](https://github.com/kienstra/headless-blocks) and follow its [setup instructions](https://github.com/kienstra/headless-blocks#setup), including installing the linked Genesis Custom Blocks `.zip`
1. Go to `/wp-admin` > Posts > Add New
1. Add the example 'Email Opt In' block that the Headless Blocks plugin registered: ![email-opt-in-block](https://user-images.githubusercontent.com/4063887/109478584-0cba5b00-7a3f-11eb-92d0-64f067719ce0.png)
1. Populate the fields with any text: ![populate-fields](https://user-images.githubusercontent.com/4063887/109478496-f1e7e680-7a3e-11eb-9655-cd86bb751644.png)
1. Click outside the block so the preview displays
1. You'll see the preview, a React component: ![preview-react-component](https://user-images.githubusercontent.com/4063887/109477726-0081ce00-7a3e-11eb-9e99-8cd3b52187fb.gif)
1. Give the post a title of 'Headless Blocks', or whatever you'd lke
1. Publish it
1. On your Next.js front-end, go to that post, maybe http://localhost:3000/headless-blocks
1. Notice how the block is the same as the preview you saw in the block editor
1. Click the button
1. See how the block is interactive, as it's a React component: ![next-js-front-end](https://user-images.githubusercontent.com/4063887/109477841-2313e700-7a3e-11eb-91f0-1c07f6b37aad.gif)

## Local development
1. First, ensure that Headless Blocks is [set up](https://github.com/kienstra/headless-blocks#setup)
1. `cd path/to/wp-content/plugins/headless-blocks`
1. `npm link path/to/next.js/repo`
1. That's the full path to your Next.js front-end repo
1. `npm run dev`
1. Open a new Terminal tab
1. `cd path/to/next.js/repo/blocks`
1. That's the `blocks/` directory in your Next.js front-end repo
1. `npm install && npm run dev`
1. Then, when you edit a block in `path/to/next.js/repo/blocks/`, you'll see the changes on the front-end and in the block editor: ![headless-block-editor](https://user-images.githubusercontent.com/4063887/109378623-c4ae0380-7899-11eb-8f47-53eebb33240f.gif)
