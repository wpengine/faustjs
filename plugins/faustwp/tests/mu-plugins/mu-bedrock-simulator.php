<?php
/**
 * Bedrock-style site_url() simulator -- manual-verification helper for #1872.
 *
 * Drop this file into wp-content/mu-plugins/ inside the docker-compose.yml stack
 * to make site_url() return /wp/<path> while home_url() stays at /<path>. This
 * mirrors the URL divergence of a Bedrock-style WordPress layout without
 * requiring a full `composer create-project roots/bedrock` install.
 *
 * Scope and faithfulness:
 *
 *   This mu-plugin filters the OUTPUT of site_url(). It does NOT change the
 *   underlying `siteurl` option value. That is sufficient for end-to-end browser
 *   verification of #1872, where the only thing that matters is the regex match
 *   inside handle_generate_endpoint().
 *
 *   For test-time fidelity that more closely matches a real Bedrock configuration
 *   (where every consumer of `get_option('siteurl')` and `site_url()` sees the
 *   divergent value), the PHPUnit suite updates the siteurl option directly --
 *   see tests/integration/AuthCallbacksTests.php::set_bedrock_siteurl().
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
 *   - canary (pre-fix): handler early-returns; WordPress's normal routing kicks in
 *   - this branch (post-fix): handler matches, redirects to wp-login.php
 *
 * Not loaded by PHPUnit (the testsuite config in phpunit.xml.dist only scans
 * ./tests/integration/ and ./tests/unit/). This file exists for manual browser
 * reproduction only.
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
