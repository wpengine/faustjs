import type { Keys } from './keys';

export type FontSizes = Record<Keys, string>;
export type FontFamilies = Record<Keys, string>;

/**
 * Properties related to Typography.
 */
export type ThemePropertiesTypography = {
  /**
   * Font size presets for the font size selector.
   * Generates a single class (`.has-{slug}-color`) and custom property (`--wp--preset--font-size--{slug}`) per preset value.
   */
  fontSizes?: FontSizes;
  fontFamilies?: FontFamilies;
  [k: string]: unknown;
};
