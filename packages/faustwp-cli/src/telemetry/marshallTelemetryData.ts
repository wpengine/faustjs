import fs from 'fs';
import { platform } from 'process';
import { getCliArgs } from '../utils/index.js';
import { WPTelemetryResponseData } from './requestWPTelemetryData.js';

export interface TelemetryData {
  setting_has_frontend_uri?: boolean;
  setting_redirects_enabled?: boolean;
  setting_rewrites_enabled?: boolean;
  setting_themes_disabled?: boolean;
  setting_img_src_replacement_enabled?: boolean;
  faustwp_version?: string;
  wpgraphql_content_blocks_version?: string;
  is_wpe?: boolean;
  multisite?: boolean;
  php_version?: string;
  wp_version?: string;
  platform?: string;
  node_faustwp_core_version?: string;
  node_faustwp_cli_version?: string;
  node_faustwp_blocks_version?: string;
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
 * Marshall the JS and WP telemetry data into a single object for GA.
 * @param wpTelemetryData
 */
export const marshallTelemetryData = (
  wpTelemetryData: WPTelemetryResponseData,
  command: string,
): TelemetryData => {
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
    node_apollo_client_version: sanitizePackageJsonVersion(
      packageJson?.dependencies?.['@apollo/client'] as string | undefined,
    ),
    node_version: process.versions.node,
    node_next_version: sanitizePackageJsonVersion(
      packageJson?.dependencies?.next as string | undefined,
    ),
    node_is_development: getCliArgs()[0] === 'dev',
    platform,
    setting_has_frontend_uri: wpTelemetryData?.faustwp?.has_frontend_uri,
    setting_redirects_enabled: wpTelemetryData?.faustwp?.redirects_enabled,
    setting_rewrites_enabled: wpTelemetryData?.faustwp?.rewrites_enabled,
    setting_themes_disabled: wpTelemetryData?.faustwp?.themes_disabled,
    setting_img_src_replacement_enabled:
      wpTelemetryData?.faustwp?.image_source_replacement_enabled,
    faustwp_version: wpTelemetryData?.faustwp?.version,
    wpgraphql_content_blocks_version:
      wpTelemetryData?.wpgraphql_content_blocks?.version,
    is_wpe: wpTelemetryData?.is_wpe,
    multisite: wpTelemetryData?.multisite,
    php_version: wpTelemetryData?.php_version,
    wp_version: wpTelemetryData?.wp_version,
    command,
  };

  return telemetryData;
};
