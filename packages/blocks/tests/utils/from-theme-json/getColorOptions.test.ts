import { ThemePropertiesColor } from '../../../src/types/color';
import {
  ColorProperties,
  getColorOptions,
} from '../../../src/utils/from-theme-json/getColorOptions';

describe('getColorOptions()', () => {
  it.each([
    [
      { palette: [{ name: 'red', slug: 'r', color: '#FF0000' }] },
      { palette: { r: '#FF0000' } },
    ],
    [
      {
        palette: [
          { name: 'red', slug: 'r', color: '#FF0000' },
          { name: 'green', slug: 'g', color: '#00FF00' },
        ],
      },
      { palette: { r: '#FF0000', g: '#00FF00' } },
    ],
    [{}, {}],
  ])(
    'returns %p when passed %p as its argument',
    (color: ColorProperties, expected: ThemePropertiesColor) => {
      expect(getColorOptions(color)).toEqual(expected);
    },
  );
});
