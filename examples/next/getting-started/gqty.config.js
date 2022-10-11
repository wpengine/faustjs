require('dotenv-flow').config();

/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const config = {
  react: false,
  scalarTypes: { DateTime: 'string' },
  introspection: {
    endpoint: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    headers: {},
  },
  destination: './src/client/index.ts',
  subscriptions: false,
  javascriptOutput: false,
};

console.log(`Using "${config.introspection.endpoint}" to generate schema...`);
console.log(
  '**********************************************************************',
);
console.log(`* ✨ There is a new version of Faust ✨.                             *
* If you are still using the this version, and you wish to migrate,  *
* take a look at our migration guide at                              *
* https://faustjs.org/docs/migrationPath/overview                    *`);
console.log(
  '**********************************************************************',
);

module.exports = config;
