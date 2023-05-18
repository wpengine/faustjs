import { getStylesOptions } from '../../../src/utils/from-theme-json/getStylesOptions';

describe('getStylesOptions()', () => {
  it('returns an empty object when passed an undefined argument', () => {
    expect(getStylesOptions(undefined)).toEqual({});
  });

  it('returns the same object when passed a non-empty object as its argument', () => {
    const styles = {
      blocks: {
        'core/navigation': {
          elements: {
            link: {
              ':hover': {
                typography: {
                  textDecoration: 'underline',
                },
              },
              ':focus': {
                typography: {
                  textDecoration: 'underline dashed',
                },
              },
              ':active': {
                typography: {
                  textDecoration: 'none',
                },
              },
              typography: {
                textDecoration: 'none',
              },
            },
          },
          typography: {
            fontSize: 'var(--wp--preset--font-size--small)',
          },
        },
        'core/post-author': {
          typography: {
            fontSize: 'var(--wp--preset--font-size--small)',
          },
        },
        'core/post-content': {
          elements: {
            link: {
              color: {
                text: 'var(--wp--preset--color--secondary)',
              },
            },
          },
        },
      },
    };
    expect(getStylesOptions(styles)).toEqual(styles);
  });
});
