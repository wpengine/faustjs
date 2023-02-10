import { setConfig } from '@faustwp/core';
import templates from './wp-templates';
import possibleTypes from './possibleTypes.json';
import { CustomToolbar } from './plugins/CustomToolbar.tsx';

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [new CustomToolbar()],
  possibleTypes,
  // disableToolbar: true,
});
