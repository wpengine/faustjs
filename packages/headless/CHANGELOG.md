# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.3] - 2021-03-03

Requires the [WP Engine Headless plugin](https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download) [zip] version 0.5.3 or higher for features such as post previews.

### Fixed
- Fixes post previews for frontend apps running from a subfolder.

## [0.6.2] - 2021-03-02

Requires the [WP Engine Headless plugin](https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download) [zip] version 0.5.2 or higher for features such as post previews.

### Fixed
- Fixes an issue that could cause a 404 response for post previews.

## [0.6.1] - 2021-02-25

Requires the [WP Engine Headless plugin](https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download) [zip] version 0.5.1 or higher for features such as post previews.

### Added
- Pagination component and example in https://github.com/wpengine/headless-framework/blob/canary/examples/getting-started/wp-templates/category.tsx.
- `WORDPRESS_URL` falls back to a live demo site at https://headlessfw.wpengine.com if unset.

### Changed
- Missing `WORDPRESS_URL` and `WP_HEADLESS_SECRET` environment variables now soft-fail with a console warning instead of throwing an exception.

### Fixed
- Types are now exported from non-core modules.
- Prevent an issue with post previews that could result in “Additional keys were returned from `getServerSideProps`”.
