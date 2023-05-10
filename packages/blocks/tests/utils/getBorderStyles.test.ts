import { BlockWithAttributes } from '../../src/components/WordPressBlocksViewer.js';
import { ThemeJson } from '../../src/theme.js';
import getBorderStyles from '../../src/utils/getBorderStyles.js';

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
      theme: ThemeJson,
      block: BlockWithAttributes,
      result: React.CSSProperties | undefined,
    ) => {
      expect(getBorderStyles(theme, block)).toEqual(result);
    },
  );
});
