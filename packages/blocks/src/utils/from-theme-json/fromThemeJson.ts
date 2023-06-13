import { BlocksTheme } from '../../types/theme.js';
import { getSettingsOptions } from './getSettingsOptions.js';
import { getStylesOptions } from './getStylesOptions.js';

/**
 * Parses the passed theme.json object and returns a valid Block Theme schema.
 * @param theme The theme.json object
 */
export function fromThemeJson(theme: Record<string, any>): BlocksTheme {
  const result: BlocksTheme = Object.entries(theme).reduce(
    (acc, [key, value]) => {
      if (key === 'settings') {
        const fromSettings = getSettingsOptions(
          value as Record<string, unknown>,
        );
        return {
          ...acc,
          ...fromSettings,
        };
      }
      if (key === 'styles') {
        const fromStyles = getStylesOptions(value as Record<string, unknown>);
        return {
          ...acc,
          styles: fromStyles,
        };
      }
      return acc;
    },
    {} as BlocksTheme,
  );
  return result;
}
