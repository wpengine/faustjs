export { usePreviewNode } from './usePreviewNode.js';
export { useAuth } from './useAuth.js';

import { createHooks } from '@wordpress/hooks';
// eslint-disable-next-line import/extensions
import { _Hooks } from '@wordpress/hooks/build-types/createHooks';

export interface Plugin {
  apply?: (hooks: _Hooks) => void;
  [key: string]: unknown;
}

export const hooks = createHooks();
