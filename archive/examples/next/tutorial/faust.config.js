import templates from "./src/wp-templates/index";
import possibleTypes from "./possibleTypes.json";
import { setConfig } from "@faustwp/core";

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  possibleTypes,
});
