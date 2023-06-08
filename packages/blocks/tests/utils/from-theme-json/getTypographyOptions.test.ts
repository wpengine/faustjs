import {
  getTypographyOptions,
  TypographyProperties,
} from '../../../src/utils/from-theme-json/getTypographyOptions';
import type { ThemePropertiesTypography } from '../../../src/types/typography';

describe('getTypographyOptions()', () => {
  it.each([
    [
      {
        fontSizes: [
          { name: 'small', slug: 's', size: '12px' },
          { name: 'medium', slug: 'm', size: '16px' },
        ],
        fontFamilies: [
          { name: 'sans-serif', slug: 's', fontFamily: 'Arial, sans-serif' },
          { name: 'serif', slug: 'r', fontFamily: 'Georgia, serif' },
        ],
      },
      {
        fontSizes: { s: '12px', m: '16px' },
        fontFamilies: { s: 'Arial, sans-serif', r: 'Georgia, serif' },
      },
    ],
    [
      {
        fontSizes: [{ name: 'small', slug: 's', size: '12px' }],
      },
      {
        fontSizes: { s: '12px' },
      },
    ],
    [
      {
        fontFamilies: [
          { name: 'sans-serif', slug: 's', fontFamily: 'Arial, sans-serif' },
        ],
      },
      {
        fontFamilies: { s: 'Arial, sans-serif' },
      },
    ],
    [{}, {}],
  ])(
    'returns %p when passed %p as its argument',
    (typography: TypographyProperties, expected: ThemePropertiesTypography) => {
      expect(getTypographyOptions(typography)).toEqual(expected);
    },
  );
});
