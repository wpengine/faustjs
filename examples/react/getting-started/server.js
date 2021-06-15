require('dotenv').config();
const express = require('express');
const app = express();
const { authorizeHandler, headlessConfig } = require('@wpengine/headless-core');
const port = 5000;

headlessConfig({
  wpUrl: process.env.REACT_APP_WORDPRESS_URL,
  apiClientSecret: process.env.WP_HEADLESS_SECRET,
});

app.get('/api/auth/wpe-headless', (req, res) => {
  // Get the full request URL
  req.url = req.protocol + '://' + req.get('host') + req.originalUrl;

  return authorizeHandler(req, res);
});

app.listen(port, () => {
  console.log(`Headless API listening on port ${port}`);
});
