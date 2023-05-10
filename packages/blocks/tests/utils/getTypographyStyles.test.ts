import { BlockWithAttributes } from '../../src/components/WordPressBlocksViewer.js';
import { ThemeJson } from '../../src/theme.js';
import getTypographyStyles from '../../src/utils/getTypographyStyles.js';

describe('getTypographyStyles()', () => {
  const theme = {};
  it.each([
    [theme, { attributes: {} }, {}],
    [
      theme,
      {
        attributes: {
          fontFamily: 'primary',
          fontSize: 'medium',
        },
      },
      {
        fontFamily: 'var(--wp--preset--font-family--primary)',
        fontSize: 'var(--wp--preset--font-size--medium)',
      },
    ],
  ])(
    'theme %p and block %p expecting typography Styles %p',
    (
      theme: ThemeJson,
      block: BlockWithAttributes,
      result: React.CSSProperties | undefined,
    ) => {
      expect(getTypographyStyles(theme, block)).toEqual(result);
    },
  );
});
