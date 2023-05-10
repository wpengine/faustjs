import { getCSSRules } from '@wordpress/style-engine';

type Style = Parameters<typeof getCSSRules>[0];

export function parseInlineStyles(styles: Style): React.CSSProperties {
  const output: Record<string, unknown> = {};
  getCSSRules(styles).forEach((rule) => {
    output[rule.key] = rule.value;
  });

  return output;
}

/**
 * Parses and returns any inline css styles on this block attributes
 * @param attributes Block Attributes object
 * @returns React CSS Properties object
 */
export default function getInlineStyles(
  attributes: Record<string, unknown>,
): React.CSSProperties | undefined {
  let styles;
  // Duck Typing
  if (attributes?.style) {
    try {
      styles = parseInlineStyles(
        JSON.parse(attributes?.style as string) as Style,
      );
    } catch (e) {
      return styles;
    }
  }
  return styles;
}
