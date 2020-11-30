# Headless Components

React components for headless WordPress.

[![NPM](https://img.shields.io/npm/v/@wpengine/headless-components.svg)](https://www.npmjs.com/package/@wpengine/headless-components) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @wpengine/headless-components
```

## Usage

### WPMenu component

```jsx
import { WPMenu } from '@wpengine/headless-components'

class Example extends Component {
  render() {
    return <WPMenu location='primary' />
  }
}
```

See `packages/headless-components/example/README.md` for a full example with Next.js, GraphQL and Apollo.
