import type { Keys } from './keys';

export type SpacingSizes = Record<Keys, number | string>;

/**
 * Properties related to spacing.
 */
export type ThemePropertiesSpacing = {
  sizes?: SpacingSizes;
  [k: string]: unknown;
};
