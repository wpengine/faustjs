import 'isomorphic-fetch';
import fs from 'fs';
import path from 'path';

import { infoLog, errorLog, debugLog } from './stdout/index.js';
import { getGraphqlEndpoint, getWpUrl } from './utils/index.js';

export const DEFAULT_GLOBAL_STYLESHEET_PATH = './globalStylesheet.css';

/**
 * Gets the stylesheet path from an `--output <path>` or `--output=<path>`
 * flag, falling back to the default path.
 *
 * @returns The output path, or undefined if the flag has no value.
 */
export function getGlobalStylesheetPath(args: string[]): string | undefined {
	const index = args.findIndex(
		(arg) => arg === '--output' || arg.startsWith('--output='),
	);

	if (index === -1) {
		return DEFAULT_GLOBAL_STYLESHEET_PATH;
	}

	const value = args[index].startsWith('--output=')
		? args[index].slice('--output='.length)
		: args[index + 1];

	if (!value || value.startsWith('--')) {
		return undefined;
	}

	// A folder path gets the default file name inside it.
	if (
		value.endsWith('/') ||
		value.endsWith(path.sep) ||
		(fs.existsSync(value) && fs.statSync(value).isDirectory())
	) {
		return path.join(value, path.basename(DEFAULT_GLOBAL_STYLESHEET_PATH));
	}

	return value;
}

export async function generateGlobalStylesheet(
	args: string[] = [],
): Promise<void> {
	const outputPath = getGlobalStylesheetPath(args);

	if (!outputPath) {
		errorLog(
			'The --output flag needs a file path, e.g. --output styles/wp.css',
		);
		process.exit(1);
	}

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

		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
		fs.writeFileSync(outputPath, json.data.globalStylesheet);

		infoLog(
			outputPath === DEFAULT_GLOBAL_STYLESHEET_PATH
				? "This project's globalStylesheet.css has been updated!"
				: `This project's global stylesheet has been updated at ${outputPath}!`,
		);
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
