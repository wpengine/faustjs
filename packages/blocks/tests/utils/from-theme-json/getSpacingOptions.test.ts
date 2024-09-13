import {
  getSpacingOptions,
  SpacingProperties,
} from '../../../src/utils/from-theme-json/getSpacingOptions';
import type { ThemePropertiesSpacing } from '../../../src/types/spacing';

describe('getSpacingOptions()', () => {
  it.each([
    [{}, {}],
    [
      { spacingSizes: [{ name: 'small', slug: 's', size: '8px' }] },
      { sizes: { s: '8px' } },
    ],
    [
      {
        spacingSizes: [
          { name: 'small', slug: 's', size: '8px' },
          { name: 'medium', slug: 'm', size: '16px' },
        ],
      },
      { sizes: { s: '8px', m: '16px' } },
    ],
  ])(
    'returns %p when passed %p as its argument',
    (spacing: SpacingProperties, expected: ThemePropertiesSpacing) => {
      expect(getSpacingOptions(spacing)).toEqual(expected);
    },
  );
});
