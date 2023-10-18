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
      {
        "fontFamilies": {
          "dm-sans": ""DM Sans", sans-serif",
          "ibm-plex-mono": "'IBM Plex Mono', monospace",
          "inter": ""Inter", sans-serif",
          "source-serif-pro": ""Source Serif Pro", serif",
          "system-font": "-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif",
        },
        "fontSizes": {
          "large": "1.75rem",
          "medium": "1.125rem",
          "small": "1rem",
          "x-large": "2.25rem",
          "xx-large": "10rem",
        },
        "layout": {
          "contentSize": "650px",
          "wideSize": "1200px",
        },
        "palette": {
          "base": "#ffffff",
          "contrast": "#000000",
          "primary": "#9DFF20",
          "secondary": "#345C00",
          "tertiary": "#F6F6F6",
        },
        "sizes": {
          "30": "clamp(1.5rem, 5vw, 2rem)",
          "40": "clamp(1.8rem, 1.8rem + ((1vw - 0.48rem) * 2.885), 3rem)",
          "50": "clamp(2.5rem, 8vw, 4.5rem)",
          "60": "clamp(3.75rem, 10vw, 7rem)",
          "70": "clamp(5rem, 5.25rem + ((1vw - 0.48rem) * 9.096), 8rem)",
          "80": "clamp(7rem, 14vw, 11rem)",
        },
        "styles": {
          "blocks": {
            "core/comment-author-name": {
              "elements": {
                "link": {
                  ":active": {
                    "color": {
                      "text": "var(--wp--preset--color--secondary)",
                    },
                    "typography": {
                      "textDecoration": "none",
                    },
                  },
                  ":focus": {
                    "typography": {
                      "textDecoration": "underline dashed",
                    },
                  },
                  ":hover": {
                    "typography": {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": {
                    "textDecoration": "none",
                  },
                },
              },
            },
            "core/comment-date": {
              "elements": {
                "link": {
                  ":active": {
                    "color": {
                      "text": "var(--wp--preset--color--secondary)",
                    },
                    "typography": {
                      "textDecoration": "none",
                    },
                  },
                  ":focus": {
                    "typography": {
                      "textDecoration": "underline dashed",
                    },
                  },
                  ":hover": {
                    "typography": {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": {
                    "textDecoration": "none",
                  },
                },
              },
              "typography": {
                "fontSize": "var(--wp--preset--font-size--small)",
              },
            },
            "core/comment-edit-link": {
              "typography": {
                "fontSize": "var(--wp--preset--font-size--small)",
              },
            },
            "core/comment-reply-link": {
              "typography": {
                "fontSize": "var(--wp--preset--font-size--small)",
              },
            },
            "core/comments-pagination": {
              "elements": {
                "link": {
                  "typography": {
                    "textDecoration": "none",
                  },
                },
              },
              "spacing": {
                "margin": {
                  "top": "var(--wp--preset--spacing--40)",
                },
              },
            },
            "core/comments-title": {
              "spacing": {
                "margin": {
                  "bottom": "var(--wp--preset--spacing--40)",
                },
              },
              "typography": {
                "fontSize": "var(--wp--preset--font-size--large)",
              },
            },
            "core/navigation": {
              "elements": {
                "link": {
                  ":active": {
                    "typography": {
                      "textDecoration": "none",
                    },
                  },
                  ":focus": {
                    "typography": {
                      "textDecoration": "underline dashed",
                    },
                  },
                  ":hover": {
                    "typography": {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": {
                    "textDecoration": "none",
                  },
                },
              },
              "typography": {
                "fontSize": "var(--wp--preset--font-size--small)",
              },
            },
            "core/post-author": {
              "typography": {
                "fontSize": "var(--wp--preset--font-size--small)",
              },
            },
            "core/post-content": {
              "elements": {
                "link": {
                  "color": {
                    "text": "var(--wp--preset--color--secondary)",
                  },
                },
              },
            },
            "core/post-date": {
              "elements": {
                "link": {
                  ":hover": {
                    "typography": {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": {
                    "textDecoration": "none",
                  },
                },
              },
              "typography": {
                "fontSize": "var(--wp--preset--font-size--small)",
                "fontWeight": "400",
              },
            },
            "core/post-excerpt": {
              "typography": {
                "fontSize": "var(--wp--preset--font-size--medium)",
              },
            },
            "core/post-terms": {
              "typography": {
                "fontSize": "var(--wp--preset--font-size--small)",
              },
            },
            "core/post-title": {
              "elements": {
                "link": {
                  ":active": {
                    "color": {
                      "text": "var(--wp--preset--color--secondary)",
                    },
                    "typography": {
                      "textDecoration": "none",
                    },
                  },
                  ":focus": {
                    "typography": {
                      "textDecoration": "underline dashed",
                    },
                  },
                  ":hover": {
                    "typography": {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": {
                    "textDecoration": "none",
                  },
                },
              },
              "spacing": {
                "margin": {
                  "bottom": "1.25rem",
                  "top": "1.25rem",
                },
              },
              "typography": {
                "fontWeight": "400",
              },
            },
            "core/pullquote": {
              "border": {
                "style": "solid",
                "width": "1px 0",
              },
              "elements": {
                "cite": {
                  "typography": {
                    "fontSize": "var(--wp--preset--font-size--small)",
                    "fontStyle": "normal",
                    "textTransform": "none",
                  },
                },
              },
              "spacing": {
                "margin": {
                  "bottom": "var(--wp--preset--spacing--40) !important",
                  "top": "var(--wp--preset--spacing--40) !important",
                },
              },
              "typography": {
                "lineHeight": "1.3",
              },
            },
            "core/query": {
              "elements": {
                "h2": {
                  "typography": {
                    "fontSize": "var(--wp--preset--font-size--x-large)",
                  },
                },
              },
            },
            "core/query-pagination": {
              "elements": {
                "link": {
                  ":hover": {
                    "typography": {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": {
                    "textDecoration": "none",
                  },
                },
              },
              "typography": {
                "fontSize": "var(--wp--preset--font-size--small)",
                "fontWeight": "400",
              },
            },
            "core/quote": {
              "border": {
                "width": "1px",
              },
              "elements": {
                "cite": {
                  "typography": {
                    "fontSize": "var(--wp--preset--font-size--small)",
                    "fontStyle": "normal",
                  },
                },
              },
              "spacing": {
                "padding": {
                  "left": "var(--wp--preset--spacing--30)",
                  "right": "var(--wp--preset--spacing--30)",
                },
              },
            },
            "core/site-title": {
              "elements": {
                "link": {
                  ":active": {
                    "color": {
                      "text": "var(--wp--preset--color--secondary)",
                    },
                    "typography": {
                      "textDecoration": "none",
                    },
                  },
                  ":focus": {
                    "typography": {
                      "textDecoration": "underline dashed",
                    },
                  },
                  ":hover": {
                    "typography": {
                      "textDecoration": "underline",
                    },
                  },
                  "typography": {
                    "textDecoration": "none",
                  },
                },
              },
              "typography": {
                "fontSize": "var(--wp--preset--font-size--medium)",
                "fontWeight": "normal",
                "lineHeight": "1.4",
              },
            },
          },
          "color": {
            "background": "var(--wp--preset--color--base)",
            "text": "var(--wp--preset--color--contrast)",
          },
          "elements": {
            "button": {
              ":active": {
                "color": {
                  "background": "var(--wp--preset--color--secondary)",
                  "text": "var(--wp--preset--color--base)",
                },
              },
              ":focus": {
                "color": {
                  "background": "var(--wp--preset--color--contrast)",
                  "text": "var(--wp--preset--color--base)",
                },
              },
              ":hover": {
                "color": {
                  "background": "var(--wp--preset--color--contrast)",
                  "text": "var(--wp--preset--color--base)",
                },
              },
              ":visited": {
                "color": {
                  "text": "var(--wp--preset--color--contrast)",
                },
              },
              "border": {
                "radius": "0",
              },
              "color": {
                "background": "var(--wp--preset--color--primary)",
                "text": "var(--wp--preset--color--contrast)",
              },
            },
            "h1": {
              "typography": {
                "fontSize": "3.625rem",
                "lineHeight": "1.2",
              },
            },
            "h2": {
              "typography": {
                "fontSize": "clamp(2.625rem, calc(2.625rem + ((1vw - 0.48rem) * 8.4135)), 3.25rem)",
                "lineHeight": "1.2",
              },
            },
            "h3": {
              "typography": {
                "fontSize": "var(--wp--preset--font-size--x-large)",
              },
            },
            "h4": {
              "typography": {
                "fontSize": "var(--wp--preset--font-size--large)",
              },
            },
            "h5": {
              "typography": {
                "fontSize": "var(--wp--preset--font-size--medium)",
                "fontWeight": "700",
                "textTransform": "uppercase",
              },
            },
            "h6": {
              "typography": {
                "fontSize": "var(--wp--preset--font-size--medium)",
                "textTransform": "uppercase",
              },
            },
            "heading": {
              "typography": {
                "fontWeight": "400",
                "lineHeight": "1.4",
              },
            },
            "link": {
              ":active": {
                "color": {
                  "text": "var(--wp--preset--color--secondary)",
                },
                "typography": {
                  "textDecoration": "none",
                },
              },
              ":focus": {
                "typography": {
                  "textDecoration": "underline dashed",
                },
              },
              ":hover": {
                "typography": {
                  "textDecoration": "none",
                },
              },
              "color": {
                "text": "var(--wp--preset--color--contrast)",
              },
              "typography": {
                "textDecoration": "underline",
              },
            },
          },
          "spacing": {
            "blockGap": "1.5rem",
            "padding": {
              "bottom": "var(--wp--preset--spacing--40)",
              "left": "var(--wp--preset--spacing--30)",
              "right": "var(--wp--preset--spacing--30)",
              "top": "var(--wp--preset--spacing--40)",
            },
          },
          "typography": {
            "fontFamily": "var(--wp--preset--font-family--system-font)",
            "fontSize": "var(--wp--preset--font-size--medium)",
            "lineHeight": "1.6",
          },
        },
      }
    `);
  });
});
