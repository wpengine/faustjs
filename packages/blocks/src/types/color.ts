/**
 * A mapping between standard color names and colors.
 */
export type Palette = Record<string, Color>;

/**
 * A CSS Color string of any sort.
 */
export type Color = string;

/**
 * Properties related to colors.
 */
export type ThemePropertiesColor = {
  palette?: Palette;
  [k: string]: unknown;
};
