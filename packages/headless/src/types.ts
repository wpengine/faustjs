export interface PaginationConfig {
  after: string;
  before: string;
  replace(url: string): string;
}

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

  /**
   * Configure how pagination is handled by the framework. The default method is to
   * assume `/after/<cursor>` and `/before/<cursor>`
   *
   * @type {PaginationConfig}
   * @memberof HeadlessConfig
   */
  pagination?: PaginationConfig;
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
  idType?: WPGraphQL.ContentNodeIdTypeEnum;
  isPostsPage?: boolean;
  isFrontPage?: boolean;
  isPreview?: boolean;
  isArchive?: boolean;
  isSingular?: boolean;
  is404?: boolean;
  uriPath: string;
  templates?: string[];
}
