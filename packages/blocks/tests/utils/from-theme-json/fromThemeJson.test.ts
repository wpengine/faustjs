import { fromThemeJson } from '../../../src/utils/from-theme-json/fromThemeJson';
import theme from './theme.test.json';

describe('fromThemeJson()', () => {
  it('returns an empty object when passed an empty theme.json object', () => {
    const themeJson = {};
    const expectedResult = {};
    expect(fromThemeJson(themeJson)).toEqual(expectedResult);
  });

  it('returns a BlocksTheme object when passed a theme.json object with settings and styles', () => {
    const themeJson = theme;

    expect(fromThemeJson(themeJson)).toMatchInlineSnapshot(`
      Object {
        "fontFamilies": Object {
          "dm-sans": "\\"DM Sans\\", sans-serif",
          "ibm-plex-mono": "'IBM Plex Mono', monospace",
          "inter": "\\"Inter\\", sans-serif",
          "source-serif-pro": "\\"Source Serif Pro\\", serif",
          "system-font": "-apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\\"Helvetica Neue\\",sans-serif",
        },
        "fontSizes": Object {
          "large": "1.75rem",
          "medium": "1.125rem",
          "small": "1rem",
          "x-large": "2.25rem",
          "xx-large": "10rem",
        },
        "layout": Object {
          "contentSize": "650px",
          "wideSize": "1200px",
        },
        "palette": Object {
          "base": "#ffffff",
          "contrast": "#000000",
          "primary": "#9DFF20",
          "secondary": "#345C00",
          "tertiary": "#F6F6F6",
        },
        "sizes": Object {
          "30": "clamp(1.5rem, 5vw, 2rem)",
          "40": "clamp(1.8rem, 1.8rem + ((1vw - 0.48rem) * 2.885), 3rem)",
          "50": "clamp(2.5rem, 8vw, 4.5rem)",
          "60": "clamp(3.75rem, 10vw, 7rem)",
          "70": "clamp(5rem, 5.25rem + ((1vw - 0.48rem) * 9.096), 8rem)",
          "80": "clamp(7rem, 14vw, 11rem)",
        },
        "styles": Object {
          "blocks": Object {
            "core/comment-author-name": Object {
              "elements": Object {
                "link": Object {
                  ":active": Object {
                    "color": Object {
                      "text": "var(--wp--preset--color--secondary)",
                    },
                    "typography": Object {
                      "textDecoration": "none",
                    },
                  },
                  ":focus": Object {
                    "typography": Object {
                      "textDecoration": "underline dashed",
                    },
                  },
                  ":hover": Object {
                    "typography": Object {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": Object {
                    "textDecoration": "none",
                  },
                },
              },
            },
            "core/comment-date": Object {
              "elements": Object {
                "link": Object {
                  ":active": Object {
                    "color": Object {
                      "text": "var(--wp--preset--color--secondary)",
                    },
                    "typography": Object {
                      "textDecoration": "none",
                    },
                  },
                  ":focus": Object {
                    "typography": Object {
                      "textDecoration": "underline dashed",
                    },
                  },
                  ":hover": Object {
                    "typography": Object {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": Object {
                    "textDecoration": "none",
                  },
                },
              },
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--small)",
              },
            },
            "core/comment-edit-link": Object {
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--small)",
              },
            },
            "core/comment-reply-link": Object {
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--small)",
              },
            },
            "core/comments-pagination": Object {
              "elements": Object {
                "link": Object {
                  "typography": Object {
                    "textDecoration": "none",
                  },
                },
              },
              "spacing": Object {
                "margin": Object {
                  "top": "var(--wp--preset--spacing--40)",
                },
              },
            },
            "core/comments-title": Object {
              "spacing": Object {
                "margin": Object {
                  "bottom": "var(--wp--preset--spacing--40)",
                },
              },
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--large)",
              },
            },
            "core/navigation": Object {
              "elements": Object {
                "link": Object {
                  ":active": Object {
                    "typography": Object {
                      "textDecoration": "none",
                    },
                  },
                  ":focus": Object {
                    "typography": Object {
                      "textDecoration": "underline dashed",
                    },
                  },
                  ":hover": Object {
                    "typography": Object {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": Object {
                    "textDecoration": "none",
                  },
                },
              },
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--small)",
              },
            },
            "core/post-author": Object {
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--small)",
              },
            },
            "core/post-content": Object {
              "elements": Object {
                "link": Object {
                  "color": Object {
                    "text": "var(--wp--preset--color--secondary)",
                  },
                },
              },
            },
            "core/post-date": Object {
              "elements": Object {
                "link": Object {
                  ":hover": Object {
                    "typography": Object {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": Object {
                    "textDecoration": "none",
                  },
                },
              },
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--small)",
                "fontWeight": "400",
              },
            },
            "core/post-excerpt": Object {
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--medium)",
              },
            },
            "core/post-terms": Object {
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--small)",
              },
            },
            "core/post-title": Object {
              "elements": Object {
                "link": Object {
                  ":active": Object {
                    "color": Object {
                      "text": "var(--wp--preset--color--secondary)",
                    },
                    "typography": Object {
                      "textDecoration": "none",
                    },
                  },
                  ":focus": Object {
                    "typography": Object {
                      "textDecoration": "underline dashed",
                    },
                  },
                  ":hover": Object {
                    "typography": Object {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": Object {
                    "textDecoration": "none",
                  },
                },
              },
              "spacing": Object {
                "margin": Object {
                  "bottom": "1.25rem",
                  "top": "1.25rem",
                },
              },
              "typography": Object {
                "fontWeight": "400",
              },
            },
            "core/pullquote": Object {
              "border": Object {
                "style": "solid",
                "width": "1px 0",
              },
              "elements": Object {
                "cite": Object {
                  "typography": Object {
                    "fontSize": "var(--wp--preset--font-size--small)",
                    "fontStyle": "normal",
                    "textTransform": "none",
                  },
                },
              },
              "spacing": Object {
                "margin": Object {
                  "bottom": "var(--wp--preset--spacing--40) !important",
                  "top": "var(--wp--preset--spacing--40) !important",
                },
              },
              "typography": Object {
                "lineHeight": "1.3",
              },
            },
            "core/query": Object {
              "elements": Object {
                "h2": Object {
                  "typography": Object {
                    "fontSize": "var(--wp--preset--font-size--x-large)",
                  },
                },
              },
            },
            "core/query-pagination": Object {
              "elements": Object {
                "link": Object {
                  ":hover": Object {
                    "typography": Object {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": Object {
                    "textDecoration": "none",
                  },
                },
              },
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--small)",
                "fontWeight": "400",
              },
            },
            "core/quote": Object {
              "border": Object {
                "width": "1px",
              },
              "elements": Object {
                "cite": Object {
                  "typography": Object {
                    "fontSize": "var(--wp--preset--font-size--small)",
                    "fontStyle": "normal",
                  },
                },
              },
              "spacing": Object {
                "padding": Object {
                  "left": "var(--wp--preset--spacing--30)",
                  "right": "var(--wp--preset--spacing--30)",
                },
              },
            },
            "core/site-title": Object {
              "elements": Object {
                "link": Object {
                  ":active": Object {
                    "color": Object {
                      "text": "var(--wp--preset--color--secondary)",
                    },
                    "typography": Object {
                      "textDecoration": "none",
                    },
                  },
                  ":focus": Object {
                    "typography": Object {
                      "textDecoration": "underline dashed",
                    },
                  },
                  ":hover": Object {
                    "typography": Object {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": Object {
                    "textDecoration": "none",
                  },
                },
              },
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--medium)",
                "fontWeight": "normal",
                "lineHeight": "1.4",
              },
            },
          },
          "color": Object {
            "background": "var(--wp--preset--color--base)",
            "text": "var(--wp--preset--color--contrast)",
          },
          "elements": Object {
            "button": Object {
              ":active": Object {
                "color": Object {
                  "background": "var(--wp--preset--color--secondary)",
                  "text": "var(--wp--preset--color--base)",
                },
              },
              ":focus": Object {
                "color": Object {
                  "background": "var(--wp--preset--color--contrast)",
                  "text": "var(--wp--preset--color--base)",
                },
              },
              ":hover": Object {
                "color": Object {
                  "background": "var(--wp--preset--color--contrast)",
                  "text": "var(--wp--preset--color--base)",
                },
              },
              ":visited": Object {
                "color": Object {
                  "text": "var(--wp--preset--color--contrast)",
                },
              },
              "border": Object {
                "radius": "0",
              },
              "color": Object {
                "background": "var(--wp--preset--color--primary)",
                "text": "var(--wp--preset--color--contrast)",
              },
            },
            "h1": Object {
              "typography": Object {
                "fontSize": "3.625rem",
                "lineHeight": "1.2",
              },
            },
            "h2": Object {
              "typography": Object {
                "fontSize": "clamp(2.625rem, calc(2.625rem + ((1vw - 0.48rem) * 8.4135)), 3.25rem)",
                "lineHeight": "1.2",
              },
            },
            "h3": Object {
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--x-large)",
              },
            },
            "h4": Object {
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--large)",
              },
            },
            "h5": Object {
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--medium)",
                "fontWeight": "700",
                "textTransform": "uppercase",
              },
            },
            "h6": Object {
              "typography": Object {
                "fontSize": "var(--wp--preset--font-size--medium)",
                "textTransform": "uppercase",
              },
            },
            "heading": Object {
              "typography": Object {
                "fontWeight": "400",
                "lineHeight": "1.4",
              },
            },
            "link": Object {
              ":active": Object {
                "color": Object {
                  "text": "var(--wp--preset--color--secondary)",
                },
                "typography": Object {
                  "textDecoration": "none",
                },
              },
              ":focus": Object {
                "typography": Object {
                  "textDecoration": "underline dashed",
                },
              },
              ":hover": Object {
                "typography": Object {
                  "textDecoration": "none",
                },
              },
              "color": Object {
                "text": "var(--wp--preset--color--contrast)",
              },
              "typography": Object {
                "textDecoration": "underline",
              },
            },
          },
          "spacing": Object {
            "blockGap": "1.5rem",
            "padding": Object {
              "bottom": "var(--wp--preset--spacing--40)",
              "left": "var(--wp--preset--spacing--30)",
              "right": "var(--wp--preset--spacing--30)",
              "top": "var(--wp--preset--spacing--40)",
            },
          },
          "typography": Object {
            "fontFamily": "var(--wp--preset--font-family--system-font)",
            "fontSize": "var(--wp--preset--font-size--medium)",
            "lineHeight": "1.6",
          },
        },
      }
    `);
  });
});
