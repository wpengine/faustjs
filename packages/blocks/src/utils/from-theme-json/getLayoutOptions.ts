import type { ThemePropertiesLayout } from '../../types/layout';

export interface LayoutProperties {
  layout?: Record<string, unknown>;
}

/**
 * Takes an object with an optional `layout` property and transforms it into the ThemePropertiesLayout object type.
 * @param {LayoutProperties} props - An object with an optional `layout` property.
 * @returns {ThemePropertiesLayout} An object with type ThemePropertiesLayout
 */
export function getLayoutOptions(
  props: LayoutProperties,
): ThemePropertiesLayout {
  if (props?.layout) {
    /* eslint-disable @typescript-eslint/no-unsafe-return */
    return {
      ...((props.layout?.contentSize && {
        contentSize: props.layout.contentSize,
      }) as Record<string, unknown>),
      ...((props.layout?.wideSize && {
        wideSize: props.layout.wideSize,
      }) as Record<string, unknown>),
    };
  }
  return {};
}
