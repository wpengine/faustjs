import { createHooks } from '@wordpress/hooks';
import { _Hooks } from '@wordpress/hooks/build-types/createHooks';

export interface Plugin {
  apply?: (hooks: _Hooks) => void;
  [key: string]: unknown;
}

export const hooks = createHooks();
