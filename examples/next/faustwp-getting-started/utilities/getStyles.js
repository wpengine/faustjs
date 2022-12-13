import { colorsMap } from '../styles/variables.js';
import { cssToReactStyle } from '../utilities/cssToReactStyle.js';

export default function getStyles(attributes) {
  return {
    backgroundColor: colorsMap[attributes?.backgroundColor],
    color: colorsMap[attributes?.textColor],
    fontSize: attributes?.fontSize,
    ...cssToReactStyle(attributes?.style),
  };
}
