import 'isomorphic-fetch';
import fs from 'fs';

import { infoLog, errorLog, debugLog } from './stdout/index.js';
import { getGraphqlEndpoint, getWpUrl } from './utils/index.js';

export async function generateGlobalStylesheet(): Promise<void> {
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
            globalStylesheet
        }
        `,
      }),
    });

    const json: {
      data: { globalStylesheet: string };
      errors?: {
        message: string;
      }[];
    } = await response.json();

    if (json.errors) {
      const errors = json.errors.map((error) => {
        return error.message;
      });

      throw new Error(
        `There were errors in the GraphQL request: ${errors.join(', ')}`,
      );
    }

    fs.writeFileSync('./globalStylesheet.css', json.data.globalStylesheet);

    infoLog("This project's globalStylesheet.css has been updated!");
  } catch (err) {
    debugLog(
      `"faust generateGlobalStylesheet" failed with the following error: `,
      err,
    );

    errorLog("Unable to update this project's globalStylesheet.css");
    errorLog(
      `Make sure you have "Enable Public Introspection" checked in WPGraphQL: ${getWpUrl()}/wp-admin/admin.php?page=graphql-settings`,
    );

    process.exit(0);
  }
}
