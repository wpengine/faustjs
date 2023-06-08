import { BlocksTheme } from '../../types/theme.js';
import { BlockWithAttributes } from '../../components/WordPressBlocksViewer.js';

/**
 *
 * Returns the specified block Layout Styles
 * @param theme Block Theme object
 * @returns React CSS Properties object
 */
export default function getLayoutStyles<T extends BlockWithAttributes>(
  theme: BlocksTheme,
  block: T,
): React.CSSProperties {
  const { attributes } = block;
  const styles: React.CSSProperties = {};
  if (attributes?.width) {
    styles.flexBasis = attributes.width as string;
  }
  if (attributes?.height) {
    styles.height = attributes.height as string;
  }
  if (attributes?.layout) {
    let layout: {
      inherit?: string;
      contentSize?: string;
      wideSize?: string;
      justifyContent?: string;
    } = {};
    try {
      layout = JSON.parse(attributes.layout as string);
    } catch (e) {
      return styles;
    }
    const contentSize = layout?.contentSize ? layout.contentSize : null;
    const wideSize = layout?.wideSize ? layout.wideSize : null;
    const justifyContent = layout?.justifyContent
      ? layout.justifyContent
      : 'center';
    const allMaxWidthValue = contentSize || wideSize;
    const marginLeft =
      justifyContent === 'left' ? '0 !important' : 'auto !important';
    const marginRight =
      justifyContent === 'right' ? '0 !important' : 'auto !important';

    if (contentSize || wideSize) {
      styles.maxWidth = allMaxWidthValue as string;
      styles.marginLeft = marginLeft as string;
      styles.marginRight = marginRight as string;
    }
  }

  return styles;
}
