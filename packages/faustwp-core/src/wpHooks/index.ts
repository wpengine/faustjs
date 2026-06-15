import { createHooks } from '@wordpress/hooks';
import { FaustHooks } from './overloads.js';

export type FaustPlugin = {
	apply: (hooks: FaustHooks) => void;
};

export const hooks = createHooks();
