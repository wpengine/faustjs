import getLayoutStyles from '../../../src/utils/get-styles/getLayoutStyles';
import { BlockWithAttributes } from '../../../src/components/WordPressBlocksViewer.js';
import { BlocksTheme } from '../../../src/types/theme.js';

describe('getLayoutStyles()', () => {
  const theme = {};
  it.each([
    [theme, { attributes: {} }, {}],
    [
      theme,
      { attributes: { width: '50%', height: '200px' } },
      { flexBasis: '50%', height: '200px' },
    ],
    [
      theme,
      {
        attributes: {
          width: '50%',
          height: '200px',
          layout: JSON.stringify({
            inherit: 'no',
            contentSize: '800px',
            wideSize: '1000px',
            justifyContent: 'left',
          }),
        },
      },
      {
        flexBasis: '50%',
        height: '200px',
        maxWidth: '800px',
        marginLeft: '0 !important',
        marginRight: 'auto !important',
      },
    ],
    [
      theme,
      {
        attributes: {
          width: '50%',
          height: '200px',
          layout: JSON.stringify({
            inherit: 'no',
            contentSize: '800px',
            wideSize: '1000px',
            justifyContent: 'right',
          }),
        },
      },
      {
        flexBasis: '50%',
        height: '200px',
        maxWidth: '800px',
        marginLeft: 'auto !important',
        marginRight: '0 !important',
      },
    ],
  ])(
    'theme %p and block %p expecting layout Styles %p',
    (
      theme: BlocksTheme,
      block: BlockWithAttributes,
      result: React.CSSProperties | undefined,
    ) => {
      expect(getLayoutStyles(theme, block)).toEqual(result);
    },
  );
});
