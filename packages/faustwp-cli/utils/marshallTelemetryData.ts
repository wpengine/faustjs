import fs from 'fs';
import { getCliArgs } from './getCliArgs.js';
import { WPTelemetryResponseData } from './requestWPTelemetryData.js';

export interface TelemetryData {
  wordpress: {
    faustwp_settings: {
      has_frontend_uri?: boolean;
      redirects_enabled?: boolean;
      rewrites_enabled?: boolean;
      themes_disabled?: boolean;
      image_source_replacement_enabled?: boolean;
    };
    faustwp_version?: string;
    is_wpe?: boolean;
    multisite?: boolean;
    php_version?: string;
    wp_version?: string;
  };
  node: {
    faust_core_version?: string;
    faust_cli_version?: string;
    apollo_client_version?: string;
    node_version?: string;
    next_version?: string;
    is_development?: boolean;
  };
}

/**
 * Sanitizes the version from a dependency in package.json.
 *
 * @param version The dependency version.
 * @returns A sanitized version or undefined if the version is a path.
 */
const sanitizePackageJsonVersion = (version: string | undefined) => {
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
  wpTelemetryData: WPTelemetryResponseData | undefined,
): TelemetryData => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  let telemetryData: TelemetryData = {
    node: {
      faust_core_version: sanitizePackageJsonVersion(
        packageJson?.dependencies?.['@faustwp/core'],
      ),
      faust_cli_version: sanitizePackageJsonVersion(
        packageJson?.dependencies?.['@faustwp/cli'],
      ),
      apollo_client_version: sanitizePackageJsonVersion(
        packageJson?.dependencies?.['@apollo/client'],
      ),
      node_version: process.versions.node,
      next_version: sanitizePackageJsonVersion(
        packageJson?.dependencies?.['next'],
      ),
      is_development: getCliArgs()[0] === 'dev',
    },
    wordpress: {
      faustwp_settings: {
        has_frontend_uri: wpTelemetryData?.faustwp?.has_frontend_uri,
        redirects_enabled: wpTelemetryData?.faustwp?.redirects_enabled,
        rewrites_enabled: wpTelemetryData?.faustwp?.rewrites_enabled,
        themes_disabled: wpTelemetryData?.faustwp?.themes_disabled,
        image_source_replacement_enabled:
          wpTelemetryData?.faustwp?.image_source_replacement_enabled,
      },
      faustwp_version: wpTelemetryData?.faustwp?.version,
      is_wpe: wpTelemetryData?.is_wpe,
      multisite: wpTelemetryData?.multisite,
      php_version: wpTelemetryData?.php_version,
      wp_version: wpTelemetryData?.wp_version,
    },
  };

  return telemetryData;
};
