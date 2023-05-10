import { ThemeJson } from '../theme.js';
import { BlockWithAttributes } from '../components/WordPressBlocksViewer.js';
import getInlineStyles from './getInlineStyles.js';
import getTypographyStyles from './getTypographyStyles.js';

export default function getStyles<T extends BlockWithAttributes>(
  theme: ThemeJson,
  block: T,
) {
  const { attributes } = block;

  return {
    ...getInlineStyles(attributes),
    ...getTypographyStyles(theme, block),
    // ...getBorderRadiusStyle(attributes),
    // ...getBorderStyle(attributes),
    // ...getPaddingStyle(attributes),
    // ...getMarginStyle(attributes),
    // ,
    // ...getTextStyle(attributes),
    // ...getBackgroundStyle(attributes),
    // ...getMediaTextWidthStyle(attributes),
  };
}
