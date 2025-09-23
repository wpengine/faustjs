# @faustjs/utilities

A collection of utility functions for Faust.js applications.

## Installation

```bash
npm install @faustjs/utilities
```

Or if you're using pnpm:

```bash
pnpm add @faustjs/utilities
```

## Requirements

- Node.js >= 18
- npm >= 8

## Available Utilities

This package provides several utility functions commonly used in Faust.js applications:

- **Assert**: Assertion utilities for runtime type checking
- **Convert**: Conversion utilities
- **Flat List to Hierarchical**: Convert flat lists to hierarchical structures
- **Debug Mode**: Check if debug mode is enabled
- **WordPress Preview**: Utilities for handling WordPress preview functionality
- **Logging**: Enhanced logging utilities with chalk integration

## Usage

Import the utilities you need from the package:

```typescript
import { isDebug, isWordPressPreview, log } from '@faustjs/utilities';
```

## Building

To build the package:

```bash
pnpm build
```

This will build both ESM and CommonJS versions of the package.

## Contributing

For information about contributing to this package, please refer to the main [Faust.js repository](https://github.com/wpengine/faustjs).

## License

This package is part of the Faust.js project. See the project's LICENSE file for details.

## About Faust.js

Faust.js is a framework for building headless WordPress sites using modern JavaScript tools and frameworks. For more information, visit the [Faust.js documentation](https://faustjs.org).
