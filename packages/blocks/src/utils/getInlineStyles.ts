import isObject from 'lodash/isObject.js';
import map from 'lodash/map.js';
import camelCase from 'lodash/camelCase.js';
import { compileCSS } from '@wordpress/style-engine';

type Style = Parameters<typeof compileCSS>[0];

const cssToReactStyle = (css: string | object): React.CSSProperties => {
  // If object is given, return object (could be react style object mistakenly provided)
  if (isObject(css)) {
    return css;
  }

  // If falsy, then probably empty string or null, nothing to be done there
  if (!css) {
    return {};
  }

  // Only accepts strings
  if (typeof css !== 'string') {
    console.error(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Unexpected type "${typeof css}" when expecting string, with value "${css}"`,
    );
    return {};
  }

  const style: Record<string, unknown> = {};
  const rules = css.split(';');
  map(rules, (rule) => {
    let [key, value] = rule.split(':');

    if (key && value) {
      key = key.trim();
      value = value.trim();
      style[camelCase(key)] = value;
    }
  });

  return style;
};

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
      styles = cssToReactStyle(
        compileCSS(JSON.parse(attributes?.style as string) as Style),
      );
    } catch (e) {
      return styles;
    }
  }
  return styles;
}
