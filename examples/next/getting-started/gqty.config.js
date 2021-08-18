require('dotenv').config();
require('./src/faust.config');
const { getGqlUrl } = require('@faustjs/core');

/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const config = {
  react: false,
  scalarTypes: { DateTime: 'string' },
  introspection: {
    endpoint: getGqlUrl(),
    headers: {},
  },
  destination: './src/client/index.ts',
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
