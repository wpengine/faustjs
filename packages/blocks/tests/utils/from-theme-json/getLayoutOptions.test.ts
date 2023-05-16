import { ThemePropertiesLayout } from '../../../src/types/layout';
import {
  LayoutProperties,
  getLayoutOptions,
} from '../../../src/utils/from-theme-json/getLayoutOptions';

describe('getLayoutOptions', () => {
  it.each([
    [
      {
        layout: {
          contentSize: '1000px',
          wideSize: '1200px',
        },
      },
      {
        layout: {
          layout: {
            contentSize: '1000px',
            wideSize: '1200px',
          },
        },
      },
    ],
    [
      {
        layout: {
          contentSize: '1000px',
        },
      },
      {
        layout: {
          layout: {
            contentSize: '1000px',
          },
        },
      },
    ],
    [
      {
        layout: {
          wideSize: '1200px',
        },
      },
      {
        layout: {
          layout: {
            wideSize: '1200px',
          },
        },
      },
    ],
    [{}, {}],
  ])(
    'returns %p when passed %p as its argument',
    (props: LayoutProperties, expected: ThemePropertiesLayout) => {
      expect(getLayoutOptions(props)).toEqual(expected);
    },
  );
});
