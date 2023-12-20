import fs from 'fs';
import { getCliArgs } from '../utils/index.js';

export interface TelemetryData {
  node_faustwp_core_version?: string;
  node_faustwp_cli_version?: string;
  node_faustwp_blocks_version?: string;
  node_faustwp_block_editor_utils_version?: string;
  node_faustwp_experimental_app_router_version?: string;
  node_apollo_client_version?: string;
  node_version?: string;
  node_next_version?: string;
  node_is_development?: boolean;
  command?: string;
}

/**
 * Sanitizes the version from a dependency in package.json.
 *
 * @param version The dependency version.
 * @returns A sanitized version or undefined if the version is a path.
 */
const sanitizePackageJsonVersion = (_version: string | undefined) => {
  let version = _version;

  if (!version) {
    return undefined;
  }

  if (version.charAt(0) === '^' || version.charAt(0) === '~') {
    version = version.substring(1);
  }

  /**
   * If a dependency is a file path set the value to undefined as we
   * don't want to collect file paths in telemetry
   */
  if (version.startsWith('file:')) {
    version = undefined;
  }

  return version;
};

/**
 * Marshall the JS telemetry data.
 * @param command Command that initiated the request
 */
export const marshallTelemetryData = (command: string) => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  const telemetryData: TelemetryData = {
    node_faustwp_core_version: sanitizePackageJsonVersion(
      packageJson?.dependencies?.['@faustwp/core'] as string | undefined,
    ),
    node_faustwp_cli_version: sanitizePackageJsonVersion(
      packageJson?.dependencies?.['@faustwp/cli'] as string | undefined,
    ),
    node_faustwp_blocks_version: sanitizePackageJsonVersion(
      packageJson?.dependencies?.['@faustwp/blocks'] as string | undefined,
    ),
    node_faustwp_block_editor_utils_version: sanitizePackageJsonVersion(
      packageJson?.devDependencies?.['@faustwp/block-editor-utils'] as
        | string
        | undefined,
    ),
    node_faustwp_experimental_app_router_version: sanitizePackageJsonVersion(
      packageJson?.dependencies?.['@faustwp/experimental-app-router'] as
        | string
        | undefined,
    ),

    node_apollo_client_version: sanitizePackageJsonVersion(
      packageJson?.dependencies?.['@apollo/client'] as string | undefined,
    ),
    node_version: process.versions.node,
    node_next_version: sanitizePackageJsonVersion(
      packageJson?.dependencies?.next as string | undefined,
    ),
    node_is_development: getCliArgs()[0] === 'dev',
    command,
  };

  return telemetryData;
};
