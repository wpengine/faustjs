<?php
/**
 * Bedrock simulator — manual-verification helper for issue #1872.
 *
 * Drop this file into wp-content/mu-plugins/ inside the docker-compose.yml stack
 * to make site_url() return /wp/<path> while home_url() stays at /<path>. This
 * mirrors a Bedrock-style WordPress layout without requiring a full roots/bedrock
 * install.
 *
 * Activate inside the Docker container:
 *
 *   docker compose -f plugins/faustwp/docker-compose.yml exec wordpress sh -c \
 *     'mkdir -p /var/www/html/wp-content/mu-plugins \
 *      && cp /var/www/html/wp-content/plugins/faustwp/tests/mu-plugins/mu-bedrock-simulator.php /var/www/html/wp-content/mu-plugins/'
 *
 * Then visit:
 *
 *   http://localhost:8080/generate?redirect_uri=https://example.test/
 *
 *   - canary (pre-fix): 404 / silent no-op
 *   - this branch (post-fix): redirects to wp-login.php
 *
 * Not loaded by PHPUnit; this file exists for manual browser reproduction only.
 *
 * @package FaustWP\Tests
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter(
	'site_url',
	static function ( $url ) {
		// Relative URL (scheme='relative'): /<path> -> /wp/<path>
		if ( '' !== $url && '/' === $url[0] && ( ! isset( $url[1] ) || '/' !== $url[1] ) ) {
			return '/wp' . $url;
		}
		// Absolute URL: <scheme>://<host>/<path> -> <scheme>://<host>/wp/<path>
		return preg_replace( '#(https?://[^/]+)(/.*)?#', '$1/wp$2', $url );
	},
	10,
	1
);
