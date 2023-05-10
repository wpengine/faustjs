import { ThemeJson } from '../theme.js';
import { BlockWithAttributes } from '../components/WordPressBlocksViewer.js';


/**
 *
 * Returns the specified block Typography Styles
 * @param theme Block Theme object
 * @returns React CSS Properties object
 */
export default function getTypographyStyles<T extends BlockWithAttributes>(
  theme: ThemeJson,
  block: T,
): React.CSSProperties {
  const { attributes } = block;
  const styles: React.CSSProperties = {};
  if (attributes?.fontFamily) {
    // TODO: Have a CSS Var generator strategy generate those.
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    styles.fontFamily = `var(--wp--preset--font-family--${attributes.fontFamily})`;
  }

  if (attributes?.fontSize) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    styles.fontSize = `var(--wp--preset--font-size--${attributes.fontSize})`;
  }

  return styles;
}
