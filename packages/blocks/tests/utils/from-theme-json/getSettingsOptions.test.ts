import type { BlocksTheme } from '../../../src/types/theme';
import { getSettingsOptions } from '../../../src/utils/from-theme-json/getSettingsOptions';

describe('getSettingsOptions()', () => {
  it.each([
    [
      {
        spacing: {
          spacingSizes: [
            { name: 'small', slug: 's', size: '8px' },
            { name: 'x-small', slug: 'xs', size: '4px' },
          ],
        },
        color: {
          palette: [
            { name: 'red', slug: 'r', color: '#FF0000' },
            { name: 'green', slug: 'g', color: '#00FF00' },
          ],
        },
        typography: {
          fontSizes: [
            { name: 'small', slug: 's', size: '12px' },
            { name: 'medium', slug: 'm', size: '16px' },
          ],
          fontFamilies: [
            { name: 'sans-serif', slug: 's', fontFamily: 'Arial, sans-serif' },
            { name: 'serif', slug: 'r', fontFamily: 'Georgia, serif' },
          ],
        },
        layout: {
          contentSize: '1000px',
          wideSize: '1200px',
        },
      },
      {
        sizes: { xs: '4px', s: '8px' },
        palette: { r: '#FF0000', g: '#00FF00' },
        fontSizes: { s: '12px', m: '16px' },
        fontFamilies: { s: 'Arial, sans-serif', r: 'Georgia, serif' },
        layout: {
          contentSize: '1000px',
          wideSize: '1200px',
        },
      },
    ],
    [
      {
        spacing: {
          spacingSizes: [
            { name: 'small', slug: 's', size: '8px' },
            { name: 'x-small', slug: 'xs', size: '4px' },
          ],
        },
      },
      {
        sizes: { xs: '4px', s: '8px' },
      },
    ],
    [
      {
        color: {
          palette: [
            { name: 'red', slug: 'r', color: '#FF0000' },
            { name: 'green', slug: 'g', color: '#00FF00' },
          ],
        },
      },
      {
        palette: { r: '#FF0000', g: '#00FF00' },
      },
    ],
    [
      {
        typography: {
          fontSizes: [
            { name: 'small', slug: 's', size: '12px' },
            { name: 'medium', slug: 'm', size: '16px' },
          ],
          fontFamilies: [
            { name: 'sans-serif', slug: 's', fontFamily: 'Arial, sans-serif' },
            { name: 'serif', slug: 'r', fontFamily: 'Georgia, serif' },
          ],
        },
      },
      {
        fontSizes: { s: '12px', m: '16px' },
        fontFamilies: { s: 'Arial, sans-serif', r: 'Georgia, serif' },
      },
    ],
    [
      {
        layout: {
          contentSize: '1000px',
          wideSize: '1200px',
        },
      },
      {
        layout: {
          contentSize: '1000px',
          wideSize: '1200px',
        },
      },
    ],
    [{}, {}],
  ])(
    'returns %p when passed %p as its argument',
    (settings: Record<string, unknown>, expected: BlocksTheme) => {
      expect(getSettingsOptions(settings)).toEqual(expected);
    },
  );
});
