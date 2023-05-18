import type { Slugged } from '../../types/slugged';
import type {
  ThemePropertiesTypography,
  FontFamilies,
  FontSizes,
} from '../../types/typography';
import { getSluggedProps } from './getSluggedProps.js';

export interface TypographyProperties {
  fontSizes?: (Slugged & { size: string })[];
  fontFamilies?: (Slugged & { fontFamily: string })[];
}

/**
 * Takes an object of type TypographyProperties property and transforms it into the ThemePropertiesTypography object type.
 * @param {TypographyProperties} typography - An object of type TypographyProperties
 * @returns {ThemePropertiesTypography} An object of type ThemePropertiesTypography
 */
export function getTypographyOptions(
  typography: TypographyProperties,
): ThemePropertiesTypography {
  return {
    ...((typography.fontSizes && {
      fontSizes: getSluggedProps(typography.fontSizes, 'size') as FontSizes,
    }) as Record<string, unknown>),
    ...((typography.fontFamilies && {
      fontFamilies: getSluggedProps(
        typography.fontFamilies,
        'fontFamily',
      ) as FontFamilies,
    }) as Record<string, unknown>),
  };
}
