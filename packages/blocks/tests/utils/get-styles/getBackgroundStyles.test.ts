import { BlockWithAttributes } from '../../../src/components/WordPressBlocksViewer.js';
import { BlocksTheme } from '../../../src/types/theme.js';
import getBackgroundStyles from '../../../src/utils/get-styles/getBackgroundStyles.js';

describe('getBackgroundStyles()', () => {
  const theme = {};
  it.each([
    [theme, { attributes: {} }, {}],
    [
      theme,
      {
        attributes: {
          backgroundColor: 'primary',
        },
      },
      {
        backgroundColor: 'var(--wp--preset--color--primary)',
      },
    ],
  ])(
    'theme %p and block %p expecting background Styles %p',
    (
      theme: BlocksTheme,
      block: BlockWithAttributes,
      result: React.CSSProperties | undefined,
    ) => {
      expect(getBackgroundStyles(theme, block)).toEqual(result);
    },
  );
});
