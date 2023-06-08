import { BlockWithAttributes } from '../../../src/components/WordPressBlocksViewer.js';
import { BlocksTheme } from '../../../src/types/theme.js';
import getBorderStyles from '../../../src/utils/get-styles/getBorderStyles.js';

describe('getBorderStyles()', () => {
  const theme = {};
  it.each([
    [theme, { attributes: {} }, {}],
    [
      theme,
      {
        attributes: {
          borderColor: 'primary',
        },
      },
      {
        borderColor: 'var(--wp--preset--color--primary)',
      },
    ],
  ])(
    'theme %p and block %p expecting border Styles %p',
    (
      theme: BlocksTheme,
      block: BlockWithAttributes,
      result: React.CSSProperties | undefined,
    ) => {
      expect(getBorderStyles(theme, block)).toEqual(result);
    },
  );
});
