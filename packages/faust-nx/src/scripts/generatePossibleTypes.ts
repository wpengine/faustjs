import 'isomorphic-fetch';
import fs from 'fs';
const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_URL!}/graphql`;

export const generatePossibleTypes = async () => {
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

  const possibleTypes = {} as any;

  json.data.__schema.types.forEach((supertype: any) => {
    if (supertype.possibleTypes) {
      possibleTypes[supertype.name] = supertype.possibleTypes.map(
        (subtype: any) => subtype.name,
      );
    }
  });

  try {
    fs.writeFileSync('./possibleTypes.json', JSON.stringify(possibleTypes));
  } catch (err) {
    console.log('Error writing possible types', err);
  }

  console.log('Possible types successfully generated');
};
