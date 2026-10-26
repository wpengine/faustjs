#!/usr/bin/env bash
# Run the core and blocks builds and tests against Apollo Client 4. The
# packages' dev dependencies stay on Apollo Client 3, so `npm test` covers 3.
set -euo pipefail

npm install --no-save --no-audit --no-fund \
	--workspace=@faustwp/core --workspace=@faustwp/blocks \
	@apollo/client@^4 rxjs@^7

npm run build --workspace=@faustwp/core --workspace=@faustwp/blocks
npm test --workspace=@faustwp/core --workspace=@faustwp/blocks
