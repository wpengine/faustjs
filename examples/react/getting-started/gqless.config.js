const dotenv = require('dotenv');

dotenv.config({
  path: '.env',
});

/**
 * @type {import("@gqless/cli").GQlessConfig}
 */
const config = {
  react: false,
  scalarTypes: { DateTime: 'string' },
  introspection: {
    endpoint: `${process.env.REACT_APP_WORDPRESS_URL}/graphql`,
    headers: {},
  },
  destination: './src/client/index.ts',
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
