const express = require('express');
const app = express();
const { authorizeHandler } = require('@faustjs/core');
const port = 5000;

require('./src/faust.config');

app.get('/api/auth/wpe-headless', (req, res) => {
  // Get the full request URL
  req.url = req.protocol + '://' + req.get('host') + req.originalUrl;

  return authorizeHandler(req, res);
});

app.listen(port, () => {
  console.log(`Headless API listening on port ${port}`);
});
