import type { ThemePropertiesBlocks } from './blocks';

export interface StylesProperties {
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
    radius?:
      | string
      | {
          /**
           * Sets the `border-top-left-radius` CSS property.
           */
          topLeft?: string;
          /**
           * Sets the `border-top-right-radius` CSS property.
           */
          topRight?: string;
          /**
           * Sets the `border-bottom-left-radius` CSS property.
           */
          bottomLeft?: string;
          /**
           * Sets the `border-bottom-right-radius` CSS property.
           */
          bottomRight?: string;
          [k: string]: unknown;
        };
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
   * CSS and SVG filter styles.
   */
  filter?: {
    /**
     * Sets the duotone filter.
     */
    duotone?: string;
  };
  /**
   * Box shadow styles.
   */
  shadow?: string;
  /**
   * Outline styles.
   */
  outline?: {
    /**
     * Sets the `outline-color` CSS property.
     */
    color?: string;
    /**
     * Sets the `outline-offset` CSS property.
     */
    offset?: string;
    /**
     * Sets the `outline-style` CSS property.
     */
    style?: string;
    /**
     * Sets the `outline-width` CSS property.
     */
    width?: string;
  };
  /**
   * Sets custom CSS to apply styling not covered by other theme.json properties.
   */
  css?: string;
  [k: string]: unknown;
}

/**
 * Styles defined on a per-element basis using the element's selector.
 */
export interface StylesElementsPropertiesComplete {
  button?: StylesProperties & {
    border?: unknown;
    color?: unknown;
    filter?: unknown;
    shadow?: unknown;
    outline?: unknown;
    spacing?: unknown;
    typography?: unknown;
    css?: unknown;
    ':hover'?: StylesPropertiesComplete;
    ':focus'?: StylesPropertiesComplete;
    ':active'?: StylesPropertiesComplete;
    ':visited'?: StylesPropertiesComplete;
    ':link'?: StylesPropertiesComplete;
    ':any-link'?: StylesPropertiesComplete;
  };
  link?: StylesProperties & {
    border?: unknown;
    color?: unknown;
    spacing?: unknown;
    typography?: unknown;
    ':hover'?: StylesPropertiesComplete;
    ':focus'?: StylesPropertiesComplete;
    ':active'?: StylesPropertiesComplete;
    ':visited'?: StylesPropertiesComplete;
    ':link'?: StylesPropertiesComplete;
    ':any-link'?: StylesPropertiesComplete;
  };
  heading?: StylesPropertiesComplete;
  h1?: StylesPropertiesComplete;
  h2?: StylesPropertiesComplete;
  h3?: StylesPropertiesComplete;
  h4?: StylesPropertiesComplete;
  h5?: StylesPropertiesComplete;
  h6?: StylesPropertiesComplete;
  caption?: StylesPropertiesComplete;
  cite?: StylesPropertiesComplete;
}

export type StylesPropertiesComplete = StylesProperties & {
  border?: unknown;
  color?: unknown;
  dimensions?: unknown;
  spacing?: unknown;
  typography?: unknown;
  filter?: unknown;
  shadow?: unknown;
  outline?: unknown;
  css?: unknown;
};
export type StylesPropertiesAndElementsComplete = StylesProperties & {
  border?: unknown;
  color?: unknown;
  dimensions?: unknown;
  spacing?: unknown;
  typography?: unknown;
  filter?: unknown;
  shadow?: unknown;
  outline?: unknown;
  css?: unknown;
  elements?: StylesElementsPropertiesComplete;
};

export interface ThemePropertiesStyles {
  border?: unknown;
  color?: unknown;
  spacing?: unknown;
  typography?: unknown;
  filter?: unknown;
  shadow?: unknown;
  outline?: unknown;
  css?: unknown;
  elements?: StylesElementsPropertiesComplete;
  blocks?: ThemePropertiesBlocks;
}
