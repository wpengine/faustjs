import { ThemeJson } from '../theme.js';
import { BlockWithAttributes } from '../components/WordPressBlocksViewer.js';

/**
 *
 * Returns the specified block Text Styles
 * @param theme Block Theme object
 * @returns React CSS Properties object
 */
export default function getTextStyles<T extends BlockWithAttributes>(
  theme: ThemeJson,
  block: T,
): React.CSSProperties {
  const { attributes } = block;
  const styles: React.CSSProperties = {};
  if (attributes?.textColor) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    styles.color = `var(--wp--preset--color--${attributes.textColor})`;
  }
  return styles;
}
