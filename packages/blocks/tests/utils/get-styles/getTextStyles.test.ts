import { BlockWithAttributes } from '../../../src/components/WordPressBlocksViewer.js';
import { BlocksTheme } from '../../../src/types/theme.js';
import getTextStyles from '../../../src/utils/get-styles/getTextStyles.js';

describe('getTextStyles()', () => {
  const theme = {};
  it.each([
    [theme, { attributes: {} }, {}],
    [
      theme,
      {
        attributes: {
          textColor: 'primary',
        },
      },
      {
        color: 'var(--wp--preset--color--primary)',
      },
    ],
  ])(
    'theme %p and block %p expecting text Styles %p',
    (
      theme: BlocksTheme,
      block: BlockWithAttributes,
      result: React.CSSProperties | undefined,
    ) => {
      expect(getTextStyles(theme, block)).toEqual(result);
    },
  );
});
