#!/usr/bin/env bash
# Starts a local WordPress with FaustWP and the document store enabled, creates
# a user that can only read and write documents, and prints the values for
# .env.local.
#
# Usage: npm run wordpress:setup
# Set WP_PORT or DB_PORT to use other host ports (defaults: 8090 and 33090),
# and WP_VERSION to pick a WordPress version (default: 6.8).
set -euo pipefail

EXAMPLE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_DIR="$(cd "$EXAMPLE_DIR/../../.." && pwd)"

export WP_PORT="${WP_PORT:-8090}"
export DB_PORT="${DB_PORT:-33090}"
export WP_VERSION="${WP_VERSION:-6.8}"
WP_URL="http://localhost:$WP_PORT"

compose() {
	docker compose \
		--project-name faust-document-store \
		-f "$REPO_DIR/plugins/faustwp/docker-compose.yml" \
		-f "$EXAMPLE_DIR/docker-compose.override.yml" \
		"$@"
}

wp() {
	compose exec -T wordpress wp --allow-root "$@"
}

echo "Starting WordPress $WP_VERSION on $WP_URL..."
compose build --build-arg WP_VERSION="$WP_VERSION"
compose up -d

echo "Waiting for WordPress files..."
until compose exec -T wordpress test -f /var/www/html/wp-config.php; do
	sleep 2
done

# MySQL answers pings while it's still initializing, so wait until PHP can
# connect the way WordPress does. (wp db query uses the mysql client, which
# rejects this MySQL container's self-signed certificate.)
echo "Waiting for the database..."
until compose exec -T wordpress php -r 'exit( @mysqli_connect( "db", "root", "wordpress", "wordpress" ) ? 0 : 1 );'; do
	sleep 2
done

if ! wp core is-installed >/dev/null 2>&1; then
	wp core install \
		--url="$WP_URL" \
		--title="Faust document store example" \
		--admin_user=admin \
		--admin_password=password \
		--admin_email=admin@example.test \
		--skip-email
fi

wp plugin is-active faustwp || wp plugin activate faustwp

# A role with only the document capabilities, so the app's credentials can't
# do anything else in WordPress.
if ! wp role exists document_writer >/dev/null 2>&1; then
	wp role create document_writer "Document writer"
fi
wp cap add document_writer read read_faustwp_documents edit_faustwp_documents

if ! wp user get document-app >/dev/null 2>&1; then
	wp user create document-app document-app@example.test --role=document_writer --porcelain >/dev/null
fi

APP_PASSWORD="$(wp user application-password create document-app "Document store example $(date +%s)" --porcelain | tr -d '\r')"

cat <<EOF

WordPress is ready at $WP_URL (admin / password).
Add these lines to $EXAMPLE_DIR/.env.local:

NEXT_PUBLIC_WORDPRESS_URL=$WP_URL
WP_SERVICE_USER=document-app
WP_SERVICE_APP_PASSWORD=$APP_PASSWORD

Stop WordPress with: npm run wordpress:stop
EOF
