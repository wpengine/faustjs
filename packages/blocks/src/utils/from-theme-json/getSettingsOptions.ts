import { getSpacingOptions } from './getSpacingOptions.js';
import { getColorOptions } from './getColorOptions.js';
import { getTypographyOptions } from './getTypographyOptions.js';
import { getLayoutOptions } from './getLayoutOptions.js';
import { BlocksTheme } from '../../types/theme.js';

const mappers = [
  { key: 'spacing', fn: getSpacingOptions },
  { key: 'color', fn: getColorOptions },
  { key: 'typography', fn: getTypographyOptions },
  { key: 'layout', fn: getLayoutOptions },
];

export function getSettingsOptions(
  settings: Record<string, unknown>,
): Record<string, unknown> {
  const result = Object.entries(settings).reduce((acc, [key, value]) => {
    for (let i = 0; i < mappers.length; i += 1) {
      if (mappers[i].key === key) {
        const options = mappers[i].fn(value as Record<string, unknown>);
        return {
          ...acc,
          ...options,
        };
      }
    }
    return acc;
  }, {} as BlocksTheme);
  return result;
}
