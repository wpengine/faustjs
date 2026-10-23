#!/usr/bin/env bash
# Serve a built example app and check that a page rendered on demand loads.
# `next build` alone doesn't catch errors that only happen when a page is
# rendered by the production server.
#
# Usage: scripts/smoke-test-example.sh <app-dir> [path]
set -euo pipefail

APP_DIR="$1"
PAGE_PATH="${2:-/sample-page}"
PORT="${PORT:-3999}"

cd "$APP_DIR"
npx next start -p "$PORT" >next-start.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 30); do
	curl -s -o /dev/null "http://localhost:$PORT/" && break
	sleep 1
done

STATUS=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:$PORT$PAGE_PATH")
echo "GET $PAGE_PATH -> $STATUS"

if [ "$STATUS" != "200" ]; then
	echo "Expected 200. Server log:"
	cat next-start.log
	exit 1
fi
