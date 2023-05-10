import { BlockWithAttributes } from '../../src/components/WordPressBlocksViewer.js';
import { ThemeJson } from '../../src/theme.js';
import getBackgroundStyles from '../../src/utils/getBackgroundStyles.js';

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
      theme: ThemeJson,
      block: BlockWithAttributes,
      result: React.CSSProperties | undefined,
    ) => {
      expect(getBackgroundStyles(theme, block)).toEqual(result);
    },
  );
});
