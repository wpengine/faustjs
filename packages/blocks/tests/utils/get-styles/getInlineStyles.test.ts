import getInlineStyles from '../../../src/utils/get-styles/getInlineStyles.js';

describe('getInlineStyles()', () => {
  it.each([
    [{ style: null }, undefined],
    [{ style: undefined }, undefined],
    [{ style: 'invalid' }, undefined],
    [{ style: {} }, undefined],
    [
      {
        style:
          '{"color":{"background":"#602929"},"typography":{"fontSize":"53px"}}',
      },
      {
        backgroundColor: '#602929',
        fontSize: '53px',
      },
    ],
  ])(
    'attribute styles %p expecting %p',
    (
      attributes: Record<string, unknown>,
      result: React.CSSProperties | undefined,
    ) => {
      expect(getInlineStyles(attributes)).toEqual(result);
    },
  );
});
