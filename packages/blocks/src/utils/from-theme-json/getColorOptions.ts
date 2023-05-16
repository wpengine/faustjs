import type { Slugged } from '../../types/slugged';
import type { Palette, ThemePropertiesColor } from '../../types/color';
import { getSluggedProps } from './getSluggedProps.js';

export interface ColorProperties {
  palette?: (Slugged & { color: string })[];
}

/**
 * Takes an object with an optional `palette` property and transforms it into the ThemePropertiesColor object type.
 * @param {ColorProperties} color - An object with an optional `palette` property.
 * @returns {ThemePropertiesColor} An object with an optional `palette` property of type `Palette`.
 */
export function getColorOptions(color: ColorProperties): ThemePropertiesColor {
  if (color?.palette) {
    return {
      palette: getSluggedProps(color.palette, 'color') as Palette,
    };
  }
  return {};
}
