import { BlocksTheme } from '../../types/theme.js';
import { BlockWithAttributes } from '../../components/WordPressBlocksViewer.js';

/**
 *
 * Returns the specified block Border Styles
 * @param theme Block Theme object
 * @returns React CSS Properties object
 */
export default function getBorderStyles<T extends BlockWithAttributes>(
  theme: BlocksTheme,
  block: T,
): React.CSSProperties {
  const { attributes } = block;
  const styles: React.CSSProperties = {};
  if (attributes?.borderColor) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    styles.borderColor = `var(--wp--preset--color--${attributes.borderColor})`;
  }
  return styles;
}
