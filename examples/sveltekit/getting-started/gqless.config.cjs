require('dotenv').config();
const { headlessConfig, getGqlUrl } = require('@faustjs/core')

headlessConfig({
	wpUrl: process.env.VITE_WORDPRESS_URL,
})
/**
 * @type {import("@gqless/cli").GQlessConfig}
 */
const config = {
	react: false,
	scalarTypes: { DateTime: 'string' },
	introspection: {
		endpoint: getGqlUrl(),
		headers: {}
	},
	destination: './src/lib/client/index.ts',
	subscriptions: false,
	javascriptOutput: false
};

module.exports = config;
