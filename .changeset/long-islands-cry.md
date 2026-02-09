---
'@faustwp/block-editor-utils': patch
'@faustwp/core': patch
'@faustwp/cli': patch
'@faustwp/blocks': patch
---

## @faustwp/core

### Patch Changes

- Bump lodash from 4.17.21 to 4.17.23 to address security vulnerabilities

- Bump fast-xml-parser from 4.5.0 to 5.3.4 to address security vulnerabilities

- Testing infrastructure improvements
  - Updated Jest configuration to use V8 coverage provider instead of Babel
  - Disabled coverage collection by default for better test performance
  - Added `transformIgnorePatterns` for improved ESM dependency handling
  - Enhanced Apollo error logging with explicit type annotations
  - Refactored test assertions to use direct array equality instead of inline snapshots
  - Added coverage directory to .eslintignore

---

## @faustwp/cli

### Patch Changes

- Bump lodash from 4.17.21 to 4.17.23 to address security vulnerabilities

- Testing infrastructure improvements
  - Updated Jest configuration for better ESM support
  - Switched to V8 coverage provider
  - Enhanced health check test with more descriptive error output
  - Added coverage directory to .eslintignore

---

## @faustwp/blocks

### Patch Changes

- Testing infrastructure improvements
  - Updated Jest configuration with improved ESM support
  - Added `transformIgnorePatterns` for ESM dependencies
  - Suppressed expected React error logs in WordPressBlocksProvider tests
  - Added `@ts-expect-error` comment in Save.tsx to document known type incompatibility with `InnerBlocks.Content`

---

## @faustwp/block-editor-utils

### Patch Changes

- Testing infrastructure improvements
  - Updated Jest configuration to disable coverage collection by default
  - Added type annotation to document known InnerBlocks.Content compatibility issue across React versions
