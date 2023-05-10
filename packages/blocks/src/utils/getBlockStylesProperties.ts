import { ThemeJson, StylesPropertiesAndElements } from '../theme.js';

export default function getBlockStylesProperties(
  theme: ThemeJson,
  blockName?: string,
): StylesPropertiesAndElements | undefined {
  let styles;
  if (blockName) {
    if (theme?.blocks?.[blockName]) {
      styles = theme?.blocks?.[blockName];
    }
  }
  return styles;
}
