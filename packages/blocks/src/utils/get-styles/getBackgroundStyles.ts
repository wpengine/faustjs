import { BlocksTheme } from '../../types/theme.js';
import { BlockWithAttributes } from '../../components/WordPressBlocksViewer.js';

/**
 * Returns the specified block Background Styles
 *
 * @param theme Block Theme object
 * @returns React CSS Properties object
 */
export default function getBackgroundStyles<T extends BlockWithAttributes>(
  theme: BlocksTheme,
  block: T,
): React.CSSProperties {
  const { attributes } = block;
  const styles: React.CSSProperties = {};
  if (attributes?.backgroundColor) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    styles.backgroundColor = `var(--wp--preset--color--${attributes.backgroundColor})`;
  }
  return styles;
}
