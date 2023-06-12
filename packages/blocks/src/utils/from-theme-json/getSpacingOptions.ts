import type { Slugged } from '../../types/slugged';
import type { SpacingSizes, ThemePropertiesSpacing } from '../../types/spacing';
import { getSluggedProps } from './getSluggedProps.js';

export interface SpacingProperties {
  spacingSizes?: (Slugged & { size: string })[];
}

/**
 * Takes an object with an optional `spacingSizes` property and transforms it into the ThemePropertiesSpacing object type.
 * @param {SpacingProperties} spacing - An object with an optional `spacingSizes` property.
 * @returns {ThemePropertiesSpacing} An object with an optional `sizes` property of type `SpacingSizes`.
 */
export function getSpacingOptions(
  spacing: SpacingProperties,
): ThemePropertiesSpacing {
  if (spacing?.spacingSizes) {
    return {
      sizes: getSluggedProps(spacing.spacingSizes, 'size') as SpacingSizes,
    };
  }
  return {};
}
