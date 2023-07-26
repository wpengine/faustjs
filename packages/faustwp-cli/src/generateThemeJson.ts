import 'isomorphic-fetch';
import fs from 'fs';

import { infoLog, errorLog, debugLog } from './stdout/index.js';
import { getWpUrl, getWpSecret } from './utils/index.js';

export async function generateThemeJson(): Promise<void> {
  const wpUrl = getWpUrl();
  const endpointUrl = `${wpUrl}/wp-json/faustwp/v1/theme.json`;

  try {
    const response = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-faustwp-secret': getWpSecret() || '',
      },
    });

    if (response.ok) {
      infoLog('Discovered theme.json!');
    } else {
      errorLog('Failed to fetch theme.json', response.statusText);
    }

    const data: any = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    fs.writeFileSync('./theme.json', JSON.stringify(data));

    infoLog("This project's theme.json has been updated!");
  } catch (err) {
    debugLog(
      `"faust generateThemeJson" failed with the following error: `,
      err,
    );

    errorLog("Unable to update this project's theme.json");
    errorLog(
      `Make sure you have "Enable Public Introspection" checked in WPGraphQL: ${getWpUrl()}/wp-admin/admin.php?page=graphql-settings`,
    );

    process.exit(0);
  }
}
