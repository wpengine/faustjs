import { BlocksTheme } from '../../../src/types/theme.js';
import { getStyles } from '../../../src/utils/get-styles/getStyles.js';
import { BlockWithAttributes } from '../../../src/components/WordPressBlocksViewer.js';

describe('getStyles()', () => {
  const theme: BlocksTheme = {};
  it.each([
    [theme, {}, {}],
    [theme, { attributes: {} }, {}],
    [
      theme,
      {
        attributes: {
          borderColor: 'secondary',
          backgroundColor: 'red',
          color: 'blue',
          fontFamily: 'inter',
          fontSize: 'large',
          style: '{"border":{"radius":"20px"}}',
        },
      },
      {
        backgroundColor: 'var(--wp--preset--color--red)',
        borderColor: 'var(--wp--preset--color--secondary)',
        borderRadius: '20px',
        fontFamily: 'var(--wp--preset--font-family--inter)',
        fontSize: 'var(--wp--preset--font-size--large)',
      },
    ],
  ])(
    'theme %p and block %p expecting css Styles %p',
    (
      theme: BlocksTheme,
      block: BlockWithAttributes,
      result: React.CSSProperties | undefined,
    ) => {
      expect(getStyles(theme, block)).toEqual(result);
    },
  );
});
