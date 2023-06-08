import type { ThemePropertiesLayout } from '../../types/layout';
import { isEmpty } from '../isEmpty.js';

export type LayoutProperties = Record<string, unknown>;

/**
 * Takes an object with an optional `layout` property and transforms it into the ThemePropertiesLayout object type.
 * @param {LayoutProperties} props - An object with an optional `layout` property.
 * @returns {ThemePropertiesLayout} An object with type ThemePropertiesLayout
 */
export function getLayoutOptions(
  layout?: LayoutProperties,
): ThemePropertiesLayout {
  if (!isEmpty(layout)) {
    return {
      layout,
    };
  }
  return {};
}
