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
