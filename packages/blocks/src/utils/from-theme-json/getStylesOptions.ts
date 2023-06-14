import type { ThemePropertiesStyles } from '../../types/styles';
import { isEmpty } from '../isEmpty.js';

export type StylesProperties = Record<string, unknown> & {
  border?: unknown;
  color?: unknown;
  spacing?: unknown;
  typography?: unknown;
  filter?: unknown;
  shadow?: unknown;
  outline?: unknown;
  css?: unknown;
  elements?: Record<string, any>;
  blocks?: Record<string, any>;
};

/**
 * Takes an object with an optional `palette` property and transforms it into the ThemePropertiesColor object type.
 * @param {StylesProperties} styles - An object of type StylesProperties.
 * @returns {ThemePropertiesColor} An object with an optional `palette` property of type `Palette`.
 */
export function getStylesOptions(
  styles?: StylesProperties,
): ThemePropertiesStyles {
  if (!isEmpty(styles)) {
    return {
      ...styles,
    };
  }
  return {};
}
