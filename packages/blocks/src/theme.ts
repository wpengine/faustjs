type Keys = string | number;

export type ThemeJson = {
  colors?: ThemePropertiesColor;
  spacing?: ThemePropertiesSpacing;
  blocks?: ThemePropertiesBlocks;
  layout?: ThemePropertiesLayout;
  typography?: ThemePropertiesTypography;
  [k: string]: unknown;
};

/**
 * A mapping between standard color names and colors.
 */
type Palette = Record<string, Color>;

/**
 * A CSS Color string of any sort.
 */
type Color = string;

/**
 * Properties related to colors.
 */
export type ThemePropertiesColor = {
  palette?: Palette;
  [k: string]: unknown;
};

type SpacingSizes = Record<Keys, number | string>;

/**
 * Properties related to spacing.
 */
export type ThemePropertiesSpacing = {
  sizes?: SpacingSizes;
  [k: string]: unknown;
};

type BlockKeys =
  | 'core/paragraph'
  | 'core/image'
  | 'core/heading'
  | 'core/gallery'
  | 'core/list'
  | 'core/quote'
  | 'core/shortcode'
  | 'core/archives'
  | 'core/audio'
  | 'core/button'
  | 'core/buttons'
  | 'core/calendar'
  | 'core/categories'
  | 'core/code'
  | 'core/columns'
  | 'core/column'
  | 'core/cover'
  | 'core/embed'
  | 'core/file'
  | 'core/group'
  | 'core/freeform'
  | 'core/html'
  | 'core/media-text'
  | 'core/latest-comments'
  | 'core/latest-posts'
  | 'core/missing'
  | 'core/more'
  | 'core/nextpage'
  | 'core/preformatted'
  | 'core/pullquote'
  | 'core/rss'
  | 'core/search'
  | 'core/separator'
  | 'core/block'
  | 'core/social-links'
  | 'core/social-link'
  | 'core/spacer'
  | 'core/subhead'
  | 'core/table'
  | 'core/tag-cloud'
  | 'core/text-columns'
  | 'core/verse'
  | 'core/video'
  | string;

/**
 * Styles defined on a per-block basis
 */
export type ThemePropertiesBlocks = {
  [k: BlockKeys]: StylesPropertiesAndElements;
};

export type StylesPropertiesAndElements = StylesProperties & {
  border?: unknown;
  color?: unknown;
  spacing?: unknown;
  typography?: unknown;
  css?: unknown;
  elements?: StylesPropertiesAndElements;
  [k: string]: unknown;
};

export type StylesProperties = {
  /**
   * Border styles.
   */
  border?: {
    /**
     * Sets the `border-color` CSS property.
     */
    color?: string;
    /**
     * Sets the `border-radius` CSS property.
     */
    radius?: string;
    /**
     * Sets the `border-style` CSS property.
     */
    style?: string;
    /**
     * Sets the `border-width` CSS property.
     */
    width?: string;
    top?: {
      /**
       * Sets the `border-top-color` CSS property.
       */
      color?: string;
      /**
       * Sets the `border-top-style` CSS property.
       */
      style?: string;
      /**
       * Sets the `border-top-width` CSS property.
       */
      width?: string;
    };
    right?: {
      /**
       * Sets the `border-right-color` CSS property.
       */
      color?: string;
      /**
       * Sets the `border-right-style` CSS property.
       */
      style?: string;
      /**
       * Sets the `border-right-width` CSS property.
       */
      width?: string;
    };
    bottom?: {
      /**
       * Sets the `border-bottom-color` CSS property.
       */
      color?: string;
      /**
       * Sets the `border-bottom-style` CSS property.
       */
      style?: string;
      /**
       * Sets the `border-bottom-width` CSS property.
       */
      width?: string;
    };
    left?: {
      /**
       * Sets the `border-left-color` CSS property.
       */
      color?: string;
      /**
       * Sets the `border-left-style` CSS property.
       */
      style?: string;
      /**
       * Sets the `border-left-width` CSS property.
       */
      width?: string;
    };
  };
  /**
   * Color styles.
   */
  color?: {
    /**
     * Sets the `background-color` CSS property.
     */
    background?: string;
    /**
     * Sets the `background` CSS property.
     */
    gradient?: string;
    /**
     * Sets the `color` CSS property.
     */
    text?: string;
  };
  /**
   * Dimensions styles
   */
  dimensions?: {
    /**
     * Sets the `min-height` CSS property.
     */
    minHeight?: string;
    [k: string]: unknown;
  };
  /**
   * Spacing styles.
   */
  spacing?: {
    /**
     * Sets the `--wp--style--block-gap` CSS custom property when settings.spacing.blockGap is true.
     */
    blockGap?: string;
    /**
     * Margin styles.
     */
    margin?: {
      /**
       * Sets the `margin-top` CSS property.
       */
      top?: string;
      /**
       * Sets the `margin-right` CSS property.
       */
      right?: string;
      /**
       * Sets the `margin-bottom` CSS property.
       */
      bottom?: string;
      /**
       * Sets the `margin-left` CSS property.
       */
      left?: string;
    };
    /**
     * Padding styles.
     */
    padding?: {
      /**
       * Sets the `padding-top` CSS property.
       */
      top?: string;
      /**
       * Sets the `padding-right` CSS property.
       */
      right?: string;
      /**
       * Sets the `padding-bottom` CSS property.
       */
      bottom?: string;
      /**
       * Sets the `padding-left` CSS property.
       */
      left?: string;
    };
  };
  /**
   * Typography styles.
   */
  typography?: {
    /**
     * Sets the `font-family` CSS property.
     */
    fontFamily?: string;
    /**
     * Sets the `font-size` CSS property.
     */
    fontSize?: string;
    /**
     * Sets the `font-style` CSS property.
     */
    fontStyle?: string;
    /**
     * Sets the `font-weight` CSS property.
     */
    fontWeight?: string;
    /**
     * Sets the `letter-spacing` CSS property.
     */
    letterSpacing?: string;
    /**
     * Sets the `line-height` CSS property.
     */
    lineHeight?: string;
    /**
     * Sets the `column-count` CSS property.
     */
    textColumns?: string;
    /**
     * Sets the `text-decoration` CSS property.
     */
    textDecoration?: string;
    /**
     * Sets the `text-transform` CSS property.
     */
    textTransform?: string;
  };
  /**
   * Box shadow styles.
   */
  shadow?: string;
  /**
   * Sets custom CSS to apply styling not covered by other theme.json properties.
   */
  css?: string;
  [k: string]: unknown;
};

/**
 * Properties related to layout.
 */
export type ThemePropertiesLayout = {
  /**
   * Sets the max-width of the content.
   */
  contentSize?: string;
  /**
   * Sets the max-width of wide (`.alignwide`) content.
   */
  wideSize?: string;
  [k: string]: unknown;
};

type FontSizes = Record<Keys, string>;
type FontFamilies = Record<Keys, string>;

/**
 * Properties related to Typography.
 */
export type ThemePropertiesTypography = {
  /**
   * Font size presets for the font size selector.
   * Generates a single class (`.has-{slug}-color`) and custom property (`--wp--preset--font-size--{slug}`) per preset value.
   */
  fontSizes?: FontSizes;
  fontFamilies?: FontFamilies;
  [k: string]: unknown;
};
