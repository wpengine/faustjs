import type { ThemePropertiesColor } from './color.js';
import type { ThemePropertiesSpacing } from './spacing.js';
import type { ThemePropertiesLayout } from './layout.js';
import type { ThemePropertiesTypography } from './typography.js';
import type { ThemePropertiesBlocks } from './blocks.js';

export type BlocksTheme = {
  colors?: ThemePropertiesColor;
  spacing?: ThemePropertiesSpacing;
  blocks?: ThemePropertiesBlocks;
  layout?: ThemePropertiesLayout;
  typography?: ThemePropertiesTypography;
  [k: string]: unknown;
};
