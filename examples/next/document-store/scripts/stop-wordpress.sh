#!/usr/bin/env bash
# Stops the local WordPress started by setup-wordpress.sh.
# Pass --volumes to also delete its database and files.
set -euo pipefail

EXAMPLE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_DIR="$(cd "$EXAMPLE_DIR/../../.." && pwd)"

docker compose \
	--project-name faust-document-store \
	-f "$REPO_DIR/plugins/faustwp/docker-compose.yml" \
	-f "$EXAMPLE_DIR/docker-compose.override.yml" \
	down "$@"
