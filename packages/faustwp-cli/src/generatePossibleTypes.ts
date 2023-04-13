import 'isomorphic-fetch';
import fs from 'fs';

import { infoLog, errorLog, debugLog } from './stdout/index.js';
import { getGraphqlEndpoint, getWpUrl } from './utils/index.js';

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
  const graphqlEndpoint = getGraphqlEndpoint();

  try {
    const response: Response = await fetch(graphqlEndpoint, {
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
      errors?: {
        message: string;
      }[];
    } = await response.json();
    const possibleTypes = <PossibleTypes>{};

    if (json.errors) {
      const errors = json.errors.map((error) => {
        return error.message;
      });

      throw new Error(
        `There were errors in the GraphQL request: ${errors.join(', ')}`,
      );
    }

    json.data.__schema.types.forEach((supertype: Supertype) => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map(
          (subtype: Subtype) => subtype.name,
        );
      }
    });

    fs.writeFileSync('./possibleTypes.json', JSON.stringify(possibleTypes));

    infoLog("This project's possibleTypes schema has been updated!");
  } catch (err) {
    debugLog(
      `"faust generatePossibleTypes" failed with the following error: `,
      err,
    );

    errorLog("Unable to update this project's possibleTypes schema");
    errorLog(
      `Make sure you have "Enable Public Introspection" checked in WPGraphQL: ${getWpUrl()}/wp-admin/admin.php?page=graphql-settings`,
    );

    process.exit(0);
  }
}
