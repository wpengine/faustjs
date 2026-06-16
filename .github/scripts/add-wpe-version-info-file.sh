#!/bin/bash
#
# Refreshes the release-time fields in the plugin's info.json manifest.
#
# Reads PLUGIN_DIR from the environment (defaults to plugins/faustwp). Writes
# the resulting manifest to ./info.json in the current working directory.
#
# Usage: bash add-wpe-version-info-file.sh <version>

set -euo pipefail

VERSION="${1:?usage: $0 <version>}"
PLUGIN_DIR="${PLUGIN_DIR:-plugins/faustwp}"

README="${PLUGIN_DIR}/readme.txt"
if [ ! -f "$README" ]; then
	echo "::error::readme.txt not found at $README" >&2
	exit 1
fi

curl --fail --silent --show-error --location \
	"https://wpe-plugin-updates.wpengine.com/faustwp/info.json" \
	--output info.json

# date %p emits uppercase AM/PM on Linux; the manifest convention is lowercase.
current_time=$(LC_ALL=C date -u +"%Y-%m-%d %-I:%M%p GMT" | sed -e 's/AM/am/' -e 's/PM/pm/')
download_link="https://wpe-plugin-updates.wpengine.com/faustwp/faustwp.${VERSION}.zip"

# Sync compatibility headers from readme.txt — empty value skips the update.
tested=$(sed -nE 's/^Tested up to:[[:space:]]+([^[:space:]]+).*/\1/p' "$README" | head -1 | tr -d '\r')
requires=$(sed -nE 's/^Requires at least:[[:space:]]+([^[:space:]]+).*/\1/p' "$README" | head -1 | tr -d '\r')
requires_php=$(sed -nE 's/^Requires PHP:[[:space:]]+([^[:space:]]+).*/\1/p' "$README" | head -1 | tr -d '\r')

jq \
	--arg version "$VERSION" \
	--arg last_updated "$current_time" \
	--arg download_link "$download_link" \
	--arg new_version "$VERSION" \
	--arg new_download_link "$download_link" \
	--arg tested "$tested" \
	--arg requires "$requires" \
	--arg requires_php "$requires_php" \
	'
		.versions = {($new_version): $new_download_link} + .versions
		| .version = $version
		| .last_updated = $last_updated
		| .download_link = $download_link
		| if $tested != "" then .tested = $tested else . end
		| if $requires != "" then .requires = $requires else . end
		| if $requires_php != "" then .requires_php = $requires_php else . end
	' \
	info.json > info.json.tmp && mv info.json.tmp info.json
