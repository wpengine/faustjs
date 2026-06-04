#!/usr/bin/env bash
# Verify the published faustwp plugin artifact against a set of release-quality
# invariants. Called from .github/workflows/verify-published-plugin.yml after
# the plugin has been installed (via wp-cli from wp.org, or via Composer from
# wpackagist) into a real WordPress instance.
#
# Args:
#   $1  WP_PATH       — absolute path to the WordPress install root
#   $2  PLUGIN_DIR    — absolute path to the installed plugin (typically
#                       $WP_PATH/wp-content/plugins/faustwp)
#   $3  VERSION       — the version we expected to install
#   $4  DISTIGNORE    — absolute path to the source-of-truth .distignore file
#                       (typically $GITHUB_WORKSPACE/plugins/faustwp/.distignore)

set -euo pipefail

WP_PATH="${1:?WP_PATH required}"
PLUGIN_DIR="${2:?PLUGIN_DIR required}"
VERSION="${3:?VERSION required}"
DISTIGNORE="${4:?DISTIGNORE required}"

WP="wp --path=${WP_PATH} --allow-root"

fail() {
  echo "::error::$*"
  exit 1
}

echo "==> Assertion 1: wp-cli reports plugin version ${VERSION}"
ACTUAL_VERSION=$($WP plugin get faustwp --field=version)
[ "$ACTUAL_VERSION" = "$VERSION" ] || fail "version mismatch: expected ${VERSION}, got ${ACTUAL_VERSION}"

echo "==> Assertion 2: plugin is active"
$WP plugin is-active faustwp || fail "plugin is not active"

echo "==> Assertion 3: WordPress eval runs cleanly with the plugin loaded"
$WP eval 'echo "ok";' >/dev/null

echo "==> Assertion 4: admin_notices fires without errors"
$WP eval 'do_action("admin_notices"); echo "ok";' >/dev/null

echo "==> Assertion 5: \`Update URI: false\` header is absent from shipped faustwp.php"
if grep -F "Update URI: false" "$PLUGIN_DIR/faustwp.php" >/dev/null 2>&1; then
  fail "\`Update URI: false\` header is present — wordpress.org auto-updates would be suppressed"
fi

echo "==> Assertion 6: IV-in-HMAC fix is present in encrypt() and decrypt()"
HMAC_COUNT=$(grep -cF '$iv . $cipher_text' "$PLUGIN_DIR/includes/auth/functions.php" || true)
[ "$HMAC_COUNT" = "2" ] || fail "expected 2 \`\$iv . \$cipher_text\` occurrences in includes/auth/functions.php, found ${HMAC_COUNT}"

echo "==> Assertion 7: distribution payload excludes paths listed in .distignore"
# Reads top-level entries from canary's .distignore and asserts none are present
# at the root of the installed plugin. Comments and empty lines are skipped.
# A leading "/" anchors to root (rsync convention); we treat all entries as root-anchored
# for this check since wp.org distributions only ship the plugin root.
while IFS= read -r raw; do
  entry="${raw%$'\r'}"
  [ -z "$entry" ] && continue
  case "$entry" in
    \#*) continue ;;
  esac
  path="${entry#/}"
  if [ -e "${PLUGIN_DIR}/${path}" ]; then
    fail "forbidden path present in published artifact: ${path}"
  fi
done < "$DISTIGNORE"

echo "==> Assertion 8: faustwp.php Version: header matches ${VERSION}"
PHP_VERSION=$(grep -E '^\s*\*\s*Version:' "$PLUGIN_DIR/faustwp.php" | head -1 | awk '{print $NF}')
[ "$PHP_VERSION" = "$VERSION" ] || fail "faustwp.php Version: header is ${PHP_VERSION}, expected ${VERSION}"

echo "==> Assertion 8b: readme.txt Stable tag matches ${VERSION}"
README_STABLE=$(grep -iE '^Stable tag:' "$PLUGIN_DIR/readme.txt" | awk '{print $3}' | tr -d '\r')
[ "$README_STABLE" = "$VERSION" ] || fail "readme.txt Stable tag is ${README_STABLE}, expected ${VERSION}"

echo "✓ all assertions passed for faustwp ${VERSION}"
