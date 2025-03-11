import type { StylesElementsPropertiesComplete } from './styles';

type BlockKeys =
  | 'core/paragraph'
  | 'core/image'
  | 'core/heading'
  | 'core/gallery'
  | 'core/list'
  | 'core/list-item'
  | 'core/quote'
  | 'core/shortcode'
  | 'core/archives'
  | 'core/audio'
  | 'core/button'
  | 'core/buttons'
  | 'core/calendar'
  | 'core/categories'
  | 'core/code'
  | 'core/columns'
  | 'core/column'
  | 'core/cover'
  | 'core/embed'
  | 'core/file'
  | 'core/group'
  | 'core/freeform'
  | 'core/html'
  | 'core/media-text'
  | 'core/latest-comments'
  | 'core/latest-posts'
  | 'core/missing'
  | 'core/more'
  | 'core/nextpage'
  | 'core/preformatted'
  | 'core/pullquote'
  | 'core/rss'
  | 'core/search'
  | 'core/separator'
  | 'core/block'
  | 'core/social-links'
  | 'core/social-link'
  | 'core/spacer'
  | 'core/subhead'
  | 'core/table'
  | 'core/tag-cloud'
  | 'core/text-columns'
  | 'core/verse'
  | 'core/video'
  | string;

/**
 * Styles defined on a per-block basis
 */
export type ThemePropertiesBlocks = {
  [k: BlockKeys]: StylesElementsPropertiesComplete;
};
