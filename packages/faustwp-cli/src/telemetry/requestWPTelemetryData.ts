import 'isomorphic-fetch';

const WP_TELEMETRY_ENDPOINT = '/wp-json/faustwp/v1/telemetry';

export interface WPTelemetryResponseData {
  faustwp: {
    version: string;
    has_frontend_uri: boolean;
    redirects_enabled: boolean;
    rewrites_enabled: boolean;
    themes_disabled: boolean;
    image_source_replacement_enabled: boolean;
  };
  wpgraphql_content_blocks: {
    version: string;
  };
  is_wpe: boolean;
  multisite: boolean;
  php_version: string;
  wp_version: string;
}

/**
 * Request the telemetry data from WordPress.
 *
 * @param headlessWpUrl The headless WordPress URL
 * @param headlessSecretKey The headless WordPress secret key for authorizing the request.
 * @returns WPTelemetryResponseData
 */
export const requestWPTelemetryData = async (
  headlessWpUrl: string,
  headlessSecretKey: string,
): Promise<WPTelemetryResponseData | undefined> => {
  const res = await fetch(`${headlessWpUrl}${WP_TELEMETRY_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'x-faustwp-secret': headlessSecretKey,
    },
  });

  // If the response is invalid, return undefined for appropriate error handling.
  if (res.status !== 200) {
    return undefined;
  }

  const json = (await res.json()) as WPTelemetryResponseData;

  return json;
};
