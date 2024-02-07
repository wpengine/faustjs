import { validateFaustEnvVars } from './validateFaustEnvVars.js';
import { verifyGraphQLEndpoint } from './verifyGraphQLEndpoint.js';

/**
 * Ensure that everything Faust requires to run is available.
 */
export async function healthCheck(): Promise<void> {
  // Check Faust Env varibles before continuing.
  validateFaustEnvVars();

  // Perform our health checks.
  await verifyGraphQLEndpoint();
}
