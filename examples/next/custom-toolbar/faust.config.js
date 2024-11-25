import { setConfig } from "@faustwp/core";
import templates from "./wp-templates";
import possibleTypes from "./possibleTypes.json";
import { CustomToolbar } from "./plugins/CustomToolbar";

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  plugins: [new CustomToolbar()],
  experimentalToolbar: true,
  possibleTypes,
});
