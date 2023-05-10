import { ThemeJson } from '../theme.js';
import { BlockWithAttributes } from '../components/WordPressBlocksViewer.js';
import getInlineStyles from './getInlineStyles.js';

export default function getStyles<T extends BlockWithAttributes>(
  theme: ThemeJson,
  block: T,
  overrides: Partial<ThemeJson>,
) {
  const { attributes } = block;

  return {
    ...getInlineStyles(attributes),
    // ...getBorderRadiusStyle(attributes),
    // ...getBorderStyle(attributes),
    // ...getPaddingStyle(attributes),
    // ...getMarginStyle(attributes),
    // ...getTypographyStyle(attributes),
    // ...getTextStyle(attributes),
    // ...getBackgroundStyle(attributes),
    // ...getMediaTextWidthStyle(attributes),
  };
}
