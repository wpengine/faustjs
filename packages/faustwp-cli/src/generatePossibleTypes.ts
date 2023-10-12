import 'isomorphic-fetch';
import fs from 'fs';

import { infoLog, errorLog, debugLog } from './stdout/index.js';
import { getGraphqlEndpoint, getWpSecret, getWpUrl } from './utils/index.js';

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
        'x-faust-secret': getWpSecret() || '',
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
      `Make sure the FAUST_SECRET_KEY value in your environment matches the value in the Faust WordPress plugin settings, or that you have "Enable Public Introspection" checked in WPGraphQL if not using FAUST_SECRET_KEY: ${getWpUrl()}/wp-admin/admin.php?page=graphql-settings`,
    );

    process.exit(0);
  }
}
