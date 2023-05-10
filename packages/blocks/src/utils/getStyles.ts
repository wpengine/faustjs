import { ThemeJson } from '../theme.js';
import { BlockWithAttributes } from '../components/WordPressBlocksViewer.js';
import getInlineStyles from './getInlineStyles.js';
import getTypographyStyles from './getTypographyStyles.js';
import getBackgroundStyles from './getBackgroundStyles.js';
import getTextStyles from './getTextStyles.js';

export default function getStyles<T extends BlockWithAttributes>(
  theme: ThemeJson,
  block: T,
): React.CSSProperties {
  const { attributes } = block;

  return {
    ...getInlineStyles(attributes),
    ...getTypographyStyles(theme, block),
    ...getBackgroundStyles(theme, block),
    ...getTextStyles(theme, block)
  };
}
