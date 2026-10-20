import { validateFaustEnvVars } from './validateFaustEnvVars.js';
import { verifyGraphQLEndpoint } from './verifyGraphQLEndpoint.js';

/**
 * Ensure that everything Faust requires to run is available.
 *
 * @param command The CLI command being run, if any.
 */
export async function healthCheck(command?: string): Promise<void> {
	// Check Faust Env variables before continuing.
	await validateFaustEnvVars(command);

	// Perform our health checks.
	await verifyGraphQLEndpoint();
}
