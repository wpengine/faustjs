import { ThemeJson } from '../theme.js';
import { BlockWithAttributes } from '../components/WordPressBlocksViewer.js';
import getInlineStyles from './getInlineStyles.js';
import getTypographyStyles from './getTypographyStyles.js';
import getBackgroundStyles from './getBackgroundStyles.js';
import getTextStyles from './getTextStyles.js';
import getBorderStyles from './getBorderStyles.js';

export default function getStyles<T extends BlockWithAttributes>(
  theme: ThemeJson,
  block: T,
): React.CSSProperties {
  return {
    ...getInlineStyles(block?.attributes ?? {}),
    ...getTypographyStyles(theme, block),
    ...getBackgroundStyles(theme, block),
    ...getTextStyles(theme, block),
    ...getBorderStyles(theme, block),
  };
}
