/**
 * @type {import("@gqless/cli").GQlessConfig}
 */
 const config = {
  react: false,
  scalarTypes: { DateTime: "string" },
  introspection: {
    endpoint: "http://wptest.local/graphql",
    headers: {},
  },
  destination: "./src/api/client/index.ts",
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
