/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const config = {
  react: false,
  scalarTypes: { DateTime: 'string' },
  introspection: {
    endpoint: 'http://basicwpwithwpgraphql.local/graphql',
    headers: {},
  },
  destination: './src/api/client/index.ts',
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
