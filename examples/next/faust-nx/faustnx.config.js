import { setConfig } from 'faust-nx';
import templates from './wp-templates';
import possibleTypes from './possibleTypes.json';

/**
 * @type {import('faust-nx').FaustNXConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [],
  possibleTypes: possibleTypes,
});
