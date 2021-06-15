const express = require('express');
const app = express();
const { authorizeHandler, headlessConfig } = require('@wpengine/headless-core');
const port = 5000;

headlessConfig({
  wpUrl: process.env.REACT_APP_WORDPRESS_URL,
  apiClientSecret: process.env.WP_HEADLESS_SECRET,
});

app.get('/api/auth/wpe-headless', (req, res) => authorizeHandler);

app.listen(port, () => {
  console.log(`Headless API listening on port ${port}`);
});
