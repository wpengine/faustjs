require('isomorphic-fetch');
const fs = require('fs')

const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`;

(async () => {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variables: {},
      query: `
        {
            __schema {
                types {
                    kind
                    name
                    possibleTypes {
                       name
                    }
                }
            }
        }
        `,
    }),
  });

  const json = await res.json();

  const possibleTypes = {};

  json.data.__schema.types.forEach((supertype) => {
    if (supertype.possibleTypes) {
      possibleTypes[supertype.name] = supertype.possibleTypes.map(
        (subtype) => subtype.name,
      );
    }
  });

  try {
    fs.writeFileSync('./possibleTypes.json', JSON.stringify(possibleTypes));
  } catch (err) {
    console.log('Error writing possible types', err);
  }

  console.log('Possible types successfully generated');
})();
