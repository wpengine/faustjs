import 'isomorphic-fetch';
import fs from 'fs';

import { infoLog, errorLog } from './log.js';

export async function generatePossibleTypes() {
  const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`;

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

  const possibleTypes: any = {};

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
    errorLog('Unable to update this project\'s possibleTypes schema.', err);
    process.exit(0);
  }

  infoLog('This project\'s possibleTypes schema has been updated!');
}
