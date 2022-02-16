#!/bin/bash

# Note that this does not use pipefail
# because if the grep later doesn't match any deleted files,
# which is likely the majority case,
# it does not exit with a 0, and I only care about the final exit.
set -eo

# Ensure SVN username and password are set
# IMPORTANT: while secrets are encrypted and not viewable in the GitHub UI,
# they are by necessity provided as plaintext in the context of the Action,
# so do not echo or use debug mode unless you want your secrets exposed!
if [[ -z "$SVN_USERNAME" ]]; then
	echo "Set the SVN_USERNAME secret"
	exit 1
fi

if [[ -z "$SVN_PASSWORD" ]]; then
	echo "Set the SVN_PASSWORD secret"
	exit 1
fi

# Require the PLUGIN_DIR environment variable to be set
if [[ -z "$PLUGIN_DIR" ]]; then
	echo "Set the PLUGIN_DIR environment variable"
	exit 1
fi
echo "ℹ︎ PLUGIN_DIR is $PLUGIN_DIR"

# Allow some ENV variables to be customized
if [[ -z "$SLUG" ]]; then
	SLUG=${GITHUB_REPOSITORY#*/}
fi
echo "ℹ︎ SLUG is $SLUG"

# Does it even make sense for VERSION to be editable in a workflow definition?
if [[ -z "$VERSION" ]]; then
	VERSION="${GITHUB_REF#refs/tags/}"
	VERSION="${VERSION#plugin/faustwp/v}" # Strip the plugin/faustwp/v prefix from the version
fi
echo "ℹ︎ VERSION is $VERSION"

if [[ -z "$ASSETS_DIR" ]]; then
	ASSETS_DIR=".wordpress-org"
fi
echo "ℹ︎ ASSETS_DIR is $ASSETS_DIR"

SVN_URL="https://plugins.svn.wordpress.org/${SLUG}/"
SVN_DIR="${HOME}/svn-${SLUG}"

# Checkout just trunk and assets for efficiency
# Tagging will be handled on the SVN level
echo "➤ Checking out .org repository..."
svn checkout --depth immediates "$SVN_URL" "$SVN_DIR"
cd "$SVN_DIR"
svn update --set-depth infinity assets
svn update --set-depth infinity trunk

echo "➤ Copying files..."
if [[ -e "$GITHUB_WORKSPACE/$PLUGIN_DIR/.distignore" ]]; then
	echo "ℹ︎ Using .distignore"
	# Copy from PLUGIN_DIR to /trunk, excluding dotorg assets
	# The --delete flag will delete anything in destination that no longer exists in source
	rsync -rc --exclude-from="$GITHUB_WORKSPACE/$PLUGIN_DIR/.distignore" "$GITHUB_WORKSPACE/$PLUGIN_DIR/" trunk/ --delete --delete-excluded
else
	rsync -rc "$GITHUB_WORKSPACE/$PLUGIN_DIR/" trunk --delete --delete-excluded
fi

# Copy dotorg assets to /assets
if [[ -d "$GITHUB_WORKSPACE/$PLUGIN_DIR/$ASSETS_DIR/" ]]; then
	rsync -rc "$GITHUB_WORKSPACE/$PLUGIN_DIR/$ASSETS_DIR/" assets/ --delete
else
	echo "ℹ︎ No assets directory found; skipping asset copy"
fi

# Add everything and commit to SVN
# The force flag ensures we recurse into subdirectories even if they are already added
# Suppress stdout in favor of svn status later for readability
echo "➤ Preparing files..."
svn add . --force > /dev/null

# SVN delete all deleted files
# Also suppress stdout here
svn status | grep '^\!' | sed 's/! *//' | xargs -I% svn rm %@ > /dev/null

# Copy tag locally to make this a single commit
echo "➤ Copying tag..."
svn cp "trunk" "tags/$VERSION"

# Fix screenshots getting force downloaded when clicking them
# https://developer.wordpress.org/plugins/wordpress-org/plugin-assets/
svn propset svn:mime-type image/png assets/*.png || true
svn propset svn:mime-type image/jpeg assets/*.jpg || true

svn status

echo "➤ Committing files..."
svn commit -m "Update to version $VERSION from GitHub" --no-auth-cache --non-interactive  --username "$SVN_USERNAME" --password "$SVN_PASSWORD"

if $INPUT_GENERATE_ZIP; then
  echo "Generating zip file..."
  cd "$SVN_DIR/trunk" || exit
  zip -r "${GITHUB_WORKSPACE}/${PLUGIN_DIR}/${SLUG}.zip" .
  echo "::set-output name=zip-path::${GITHUB_WORKSPACE}/${PLUGIN_DIR}/${SLUG}.zip"
  echo "✓ Zip file generated!"
fi

echo "✓ Plugin deployed!"
