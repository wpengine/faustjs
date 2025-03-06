#!/bin/bash
VERSION=$1

curl -sSL "https://wpe-plugin-updates.wpengine.com/faustwp/info.json" -o info.json
current_time=$(date -u +"%Y-%m-%d %-I:%M%p GMT")
download_link="https://wpe-plugin-updates.wpengine.com/faustwp/faustwp.${VERSION}.zip"

# Update the info.json file with the new version and download link
jq \
	--arg version "$VERSION" \
	--arg last_updated "$current_time" \
	--arg download_link "$download_link" \
	--arg new_version "$VERSION" \
	--arg new_download_link "https://wpe-plugin-updates.wpengine.com/faustwp/faustwp.${VERSION}.zip" \
	'.versions = {($new_version): $new_download_link} + .versions | .version=$version | .last_updated=$last_updated | .download_link=$download_link' \
	info.json > info.json.tmp && mv info.json.tmp info.json
