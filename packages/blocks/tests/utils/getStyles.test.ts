import { ThemeJson } from '../../src/theme.js';
import { BlockWithAttributes } from '../../src/components/WordPressBlocksViewer.js';
import getStyles from '../../src/utils/getStyles.js';

describe('getStyles()', () => {
  const theme: ThemeJson = {};
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
      theme: ThemeJson,
      block: BlockWithAttributes,
      result: React.CSSProperties | undefined,
    ) => {
      expect(getStyles(theme, block)).toEqual(result);
    },
  );
});
