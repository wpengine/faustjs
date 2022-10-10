import 'isomorphic-fetch';
import fs from 'fs';

import { infoLog, errorLog } from './log.js';

type PossibleTypes = {
  [key: string]: any;
};

type Supertype = {
  possibleTypes: any[];
  name: string | number;
};

type Subtype = {
  name: string | number;
};

export async function generatePossibleTypes(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`;

  const response: Response = await fetch(GRAPHQL_ENDPOINT, {
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

  const json: {
    data: { __schema: { types: [] } };
  } = await response.json();
  const possibleTypes = <PossibleTypes>{};

  json.data.__schema.types.forEach((supertype: Supertype) => {
    if (supertype.possibleTypes) {
      possibleTypes[supertype.name] = supertype.possibleTypes.map(
        (subtype: Subtype) => subtype.name,
      );
    }
  });

  try {
    fs.writeFileSync('./possibleTypes.json', JSON.stringify(possibleTypes));
  } catch (err) {
    errorLog("Unable to update this project's possibleTypes schema", err);
    process.exit(0);
  }
  infoLog("This project's possibleTypes schema has been updated!");
}
