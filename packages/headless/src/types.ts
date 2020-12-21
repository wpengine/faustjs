/**
 * The configuration for your headless site
 *
 * @export
 * @interface HeadlessConfig
 */
export interface HeadlessConfig {
  /**
   * This is a prefix URI path that we will use as the base URL for your WordPress posts.
   * By default we will assume that your site is configured with no blog-specific URI.
   *
   * @example /blog
   *
   * @type {string}
   * @memberof WPEHeadlessConfig
   */
  uriPrefix?: string;
}

/**
 * WordPress Content Node types as defined in WPGraphQL
 *
 * @export
 * @enum {number}
 */
export enum ContentNodeIdType {
  DATABASE_ID = 'DATABASE_ID',
  ID = 'ID',
  URI = 'URI',
  SLUG = 'SLUG',
}

/**
 * A WPGraphQL NodeType edge
 *
 * @export
 * @interface ConnectionEdge
 * @template NodeType
 */
export interface ConnectionEdge<NodeType> {
  cursor: string;
  node: NodeType;
}

/**
 * The WPGraphQL Connection interface for a NodeType
 *
 * @export
 * @interface Connection
 * @template NodeType
 */
export interface Connection<NodeType> {
  pageInfo: PageInfo;
  edges: ConnectionEdge<NodeType>[];
}

/**
 * The result of parsing a URL into its parts
 *
 * @export
 * @interface ParsedUrlInfo
 */
export interface ParsedUrlInfo {
  href: string;
  protocol: string;
  baseUrl: string;
  host: string;
  pathname: string;
  search: string;
  hash: string;
}

/**
 * WordPress URI information
 *
 * @export
 * @interface UriInfo
 */
export interface UriInfo {
  id?: string;
  isPostsPage?: boolean;
  isFrontPage?: boolean;
  isPreview?: boolean;
  is404?: boolean;
  uriPath: string;
}

/**
 * WPGraphQL page information used for pagination
 *
 * @export
 * @interface PageInfo
 */
export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

/**
 * A WordPress Page or Post object obtained through a WPGraphQL request
 *
 * @export
 * @interface ContentNode
 */
export interface ContentNode {
  id: string;
  title: string;
  slug: string;
  status: string;
  content: string;
  isRevision: boolean;
  isPreview: boolean;
  uri: string;
}

/**
 * A WordPress Post object without preview information
 *
 * @export
 * @interface PostPreview
 */
export interface PostPreview {
  node: Omit<Post, 'preview'>;
}

/**
 * A WordPress Page object without preview information
 *
 * @export
 * @interface PagePreview
 */
export interface PagePreview {
  node: Omit<Page, 'preview'>;
}

/**
 * A WordPress Post object
 *
 * @export
 * @interface Post
 * @extends {ContentNode}
 */
export interface Post extends ContentNode {
  excerpt: string;
  isSticky: boolean;
  preview?: PostPreview;
}

/**
 * A WordPress Page object
 *
 * @export
 * @interface Page
 * @extends {ContentNode}
 */
export interface Page extends ContentNode {
  isFrontPage: boolean;
  isPostsPage: boolean;
  preview?: PagePreview;
}

/**
 * An object obtained from a WPGraphQL request to get WordPress General Settings
 *
 * @export
 * @interface GeneralSettings
 */
export interface GeneralSettings {
  title: string;
  description: string;
}
