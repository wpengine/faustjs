/**
 * GQTY AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { SchemaUnionsKey } from 'gqty';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

/** What rating to display avatars up to. Accepts 'G', 'PG', 'R', 'X', and are judged in that order. Default is the value of the 'avatar_rating' option */
export enum AvatarRatingEnum {
  /** Indicates a G level avatar rating level. */
  G = 'G',
  /** Indicates a PG level avatar rating level. */
  PG = 'PG',
  /** Indicates an R level avatar rating level. */
  R = 'R',
  /** Indicates an X level avatar rating level. */
  X = 'X',
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum CategoryIdType {
  /** The Database ID for the node */
  DATABASE_ID = 'DATABASE_ID',
  /** The hashed Global ID */
  ID = 'ID',
  /** The name of the node */
  NAME = 'NAME',
  /** Url friendly name of the node */
  SLUG = 'SLUG',
  /** The URI for the node */
  URI = 'URI',
}

/** Arguments for filtering the CategoryToCategoryConnection connection */
export interface CategoryToCategoryConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']>;
}

/** Arguments for filtering the CategoryToContentNodeConnection connection */
export interface CategoryToContentNodeConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfCategoryEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the CategoryToPostConnection connection */
export interface CategoryToPostConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** The Type of Identifier used to fetch a single comment node. Default is "ID". To be used along with the "id" field. */
export enum CommentNodeIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  ID = 'ID',
}

/** The status of the comment object. */
export enum CommentStatusEnum {
  /** Comments with the Approved status */
  APPROVE = 'APPROVE',
  /** Comments with the Unapproved status */
  HOLD = 'HOLD',
  /** Comments with the Spam status */
  SPAM = 'SPAM',
  /** Comments with the Trash status */
  TRASH = 'TRASH',
}

/** Arguments for filtering the CommentToCommentConnection connection */
export interface CommentToCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']>;
}

/** Arguments for filtering the CommentToParentCommentConnection connection */
export interface CommentToParentCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']>;
}

/** Options for ordering the connection */
export enum CommentsConnectionOrderbyEnum {
  /** Order by browser user agent of the commenter. */
  COMMENT_AGENT = 'COMMENT_AGENT',
  /** Order by approval status of the comment. */
  COMMENT_APPROVED = 'COMMENT_APPROVED',
  /** Order by name of the comment author. */
  COMMENT_AUTHOR = 'COMMENT_AUTHOR',
  /** Order by e-mail of the comment author. */
  COMMENT_AUTHOR_EMAIL = 'COMMENT_AUTHOR_EMAIL',
  /** Order by IP address of the comment author. */
  COMMENT_AUTHOR_IP = 'COMMENT_AUTHOR_IP',
  /** Order by URL address of the comment author. */
  COMMENT_AUTHOR_URL = 'COMMENT_AUTHOR_URL',
  /** Order by the comment contents. */
  COMMENT_CONTENT = 'COMMENT_CONTENT',
  /** Order by date/time timestamp of the comment. */
  COMMENT_DATE = 'COMMENT_DATE',
  /** Order by GMT timezone date/time timestamp of the comment. */
  COMMENT_DATE_GMT = 'COMMENT_DATE_GMT',
  /** Order by the globally unique identifier for the comment object */
  COMMENT_ID = 'COMMENT_ID',
  /** Order by the array list of comment IDs listed in the where clause. */
  COMMENT_IN = 'COMMENT_IN',
  /** Order by the comment karma score. */
  COMMENT_KARMA = 'COMMENT_KARMA',
  /** Order by the comment parent ID. */
  COMMENT_PARENT = 'COMMENT_PARENT',
  /** Order by the post object ID. */
  COMMENT_POST_ID = 'COMMENT_POST_ID',
  /** Order by the the type of comment, such as 'comment', 'pingback', or 'trackback'. */
  COMMENT_TYPE = 'COMMENT_TYPE',
  /** Order by the user ID. */
  USER_ID = 'USER_ID',
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ContentNodeIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  ID = 'ID',
  /** Identify a resource by the URI. */
  URI = 'URI',
}

/** Allowed Content Types */
export enum ContentTypeEnum {
  /** The Type of Content object */
  ATTACHMENT = 'ATTACHMENT',
  /** The Type of Content object */
  PAGE = 'PAGE',
  /** The Type of Content object */
  POST = 'POST',
}

/** The Type of Identifier used to fetch a single Content Type node. To be used along with the "id" field. Default is "ID". */
export enum ContentTypeIdTypeEnum {
  /** The globally unique ID */
  ID = 'ID',
  /** The name of the content type. */
  NAME = 'NAME',
}

/** Arguments for filtering the ContentTypeToContentNodeConnection connection */
export interface ContentTypeToContentNodeConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Allowed Content Types of the Category taxonomy. */
export enum ContentTypesOfCategoryEnum {
  /** The Type of Content object */
  POST = 'POST',
}

/** Allowed Content Types of the PostFormat taxonomy. */
export enum ContentTypesOfPostFormatEnum {
  /** The Type of Content object */
  POST = 'POST',
}

/** Allowed Content Types of the Tag taxonomy. */
export enum ContentTypesOfTagEnum {
  /** The Type of Content object */
  POST = 'POST',
}

/** Input for the createCategory mutation. */
export interface CreateCategoryInput {
  /** The slug that the category will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The description of the category object */
  description?: InputMaybe<Scalars['String']>;
  /** The name of the category object to mutate */
  name: Scalars['String'];
  /** The ID of the category that should be set as the parent */
  parentId?: InputMaybe<Scalars['ID']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']>;
}

/** Input for the createComment mutation. */
export interface CreateCommentInput {
  /** The approval status of the comment. */
  approved?: InputMaybe<Scalars['String']>;
  /** The name of the comment's author. */
  author?: InputMaybe<Scalars['String']>;
  /** The email of the comment's author. */
  authorEmail?: InputMaybe<Scalars['String']>;
  /** The url of the comment's author. */
  authorUrl?: InputMaybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The database ID of the post object the comment belongs to. */
  commentOn?: InputMaybe<Scalars['Int']>;
  /** Content of the comment. */
  content?: InputMaybe<Scalars['String']>;
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']>;
  /** Parent comment ID of current comment. */
  parent?: InputMaybe<Scalars['ID']>;
  /** The approval status of the comment */
  status?: InputMaybe<CommentStatusEnum>;
  /** Type of comment. */
  type?: InputMaybe<Scalars['String']>;
}

/** Input for the createMediaItem mutation. */
export interface CreateMediaItemInput {
  /** Alternative text to display when mediaItem is not displayed */
  altText?: InputMaybe<Scalars['String']>;
  /** The userId to assign as the author of the mediaItem */
  authorId?: InputMaybe<Scalars['ID']>;
  /** The caption for the mediaItem */
  caption?: InputMaybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The comment status for the mediaItem */
  commentStatus?: InputMaybe<Scalars['String']>;
  /** The date of the mediaItem */
  date?: InputMaybe<Scalars['String']>;
  /** The date (in GMT zone) of the mediaItem */
  dateGmt?: InputMaybe<Scalars['String']>;
  /** Description of the mediaItem */
  description?: InputMaybe<Scalars['String']>;
  /** The file name of the mediaItem */
  filePath?: InputMaybe<Scalars['String']>;
  /** The file type of the mediaItem */
  fileType?: InputMaybe<MimeTypeEnum>;
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars['ID']>;
  /** The ping status for the mediaItem */
  pingStatus?: InputMaybe<Scalars['String']>;
  /** The slug of the mediaItem */
  slug?: InputMaybe<Scalars['String']>;
  /** The status of the mediaItem */
  status?: InputMaybe<MediaItemStatusEnum>;
  /** The title of the mediaItem */
  title?: InputMaybe<Scalars['String']>;
}

/** Input for the createPage mutation. */
export interface CreatePageInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars['ID']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars['String']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']>;
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars['ID']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Input for the createPostFormat mutation. */
export interface CreatePostFormatInput {
  /** The slug that the post_format will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The description of the post_format object */
  description?: InputMaybe<Scalars['String']>;
  /** The name of the post_format object to mutate */
  name: Scalars['String'];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']>;
}

/** Input for the createPost mutation. */
export interface CreatePostInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars['ID']>;
  /** Set connections between the post and categories */
  categories?: InputMaybe<PostCategoriesInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars['String']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']>;
  /** The excerpt of the object */
  excerpt?: InputMaybe<Scalars['String']>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']>;
  /** The ping status for the object */
  pingStatus?: InputMaybe<Scalars['String']>;
  /** URLs that have been pinged. */
  pinged?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Set connections between the post and postFormats */
  postFormats?: InputMaybe<PostPostFormatsInput>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** Set connections between the post and tags */
  tags?: InputMaybe<PostTagsInput>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']>;
  /** URLs queued to be pinged. */
  toPing?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Input for the createTag mutation. */
export interface CreateTagInput {
  /** The slug that the post_tag will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The description of the post_tag object */
  description?: InputMaybe<Scalars['String']>;
  /** The name of the post_tag object to mutate */
  name: Scalars['String'];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']>;
}

/** Input for the createUser mutation. */
export interface CreateUserInput {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars['String']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars['String']>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars['String']>;
  /** 	The user's first name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars['String']>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** User's locale. */
  locale?: InputMaybe<Scalars['String']>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars['String']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars['String']>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars['String']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars['String']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars['String']>;
  /** An array of roles to be assigned to the user. */
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** A string that contains the user's username for logging in. */
  username: Scalars['String'];
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars['String']>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars['String']>;
}

/** Date values */
export interface DateInput {
  /** Day of the month (from 1 to 31) */
  day?: InputMaybe<Scalars['Int']>;
  /** Month number (from 1 to 12) */
  month?: InputMaybe<Scalars['Int']>;
  /** 4 digit year (e.g. 2017) */
  year?: InputMaybe<Scalars['Int']>;
}

/** Filter the connection based on input */
export interface DateQueryInput {
  /** Nodes should be returned after this date */
  after?: InputMaybe<DateInput>;
  /** Nodes should be returned before this date */
  before?: InputMaybe<DateInput>;
  /** Column to query against */
  column?: InputMaybe<PostObjectsConnectionDateColumnEnum>;
  /** For after/before, whether exact value should be matched or not */
  compare?: InputMaybe<Scalars['String']>;
  /** Day of the month (from 1 to 31) */
  day?: InputMaybe<Scalars['Int']>;
  /** Hour (from 0 to 23) */
  hour?: InputMaybe<Scalars['Int']>;
  /** For after/before, whether exact value should be matched or not */
  inclusive?: InputMaybe<Scalars['Boolean']>;
  /** Minute (from 0 to 59) */
  minute?: InputMaybe<Scalars['Int']>;
  /** Month number (from 1 to 12) */
  month?: InputMaybe<Scalars['Int']>;
  /** OR or AND, how the sub-arrays should be compared */
  relation?: InputMaybe<RelationEnum>;
  /** Second (0 to 59) */
  second?: InputMaybe<Scalars['Int']>;
  /** Week of the year (from 0 to 53) */
  week?: InputMaybe<Scalars['Int']>;
  /** 4 digit year (e.g. 2017) */
  year?: InputMaybe<Scalars['Int']>;
}

/** Input for the deleteCategory mutation. */
export interface DeleteCategoryInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The ID of the category to delete */
  id: Scalars['ID'];
}

/** Input for the deleteComment mutation. */
export interface DeleteCommentInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Whether the comment should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']>;
  /** The deleted comment ID */
  id: Scalars['ID'];
}

/** Input for the deleteMediaItem mutation. */
export interface DeleteMediaItemInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Whether the mediaItem should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']>;
  /** The ID of the mediaItem to delete */
  id: Scalars['ID'];
}

/** Input for the deletePage mutation. */
export interface DeletePageInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']>;
  /** The ID of the page to delete */
  id: Scalars['ID'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']>;
}

/** Input for the deletePostFormat mutation. */
export interface DeletePostFormatInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The ID of the postFormat to delete */
  id: Scalars['ID'];
}

/** Input for the deletePost mutation. */
export interface DeletePostInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']>;
  /** The ID of the post to delete */
  id: Scalars['ID'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']>;
}

/** Input for the deleteTag mutation. */
export interface DeleteTagInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The ID of the tag to delete */
  id: Scalars['ID'];
}

/** Input for the deleteUser mutation. */
export interface DeleteUserInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The ID of the user you want to delete */
  id: Scalars['ID'];
  /** Reassign posts and links to new User ID. */
  reassignId?: InputMaybe<Scalars['ID']>;
}

/** Input for the generateAuthorizationCode mutation. */
export interface GenerateAuthorizationCodeInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Email for WordPress user */
  email?: InputMaybe<Scalars['String']>;
  /** Password for WordPress user */
  password?: InputMaybe<Scalars['String']>;
  /** Username for WordPress user */
  username?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the HierarchicalContentNodeToContentNodeAncestorsConnection connection */
export interface HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the HierarchicalContentNodeToContentNodeChildrenConnection connection */
export interface HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum MediaItemIdType {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  ID = 'ID',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  SLUG = 'SLUG',
  /** Identify a media item by its source url */
  SOURCE_URL = 'SOURCE_URL',
  /** Identify a resource by the URI. */
  URI = 'URI',
}

/** The size of the media item object. */
export enum MediaItemSizeEnum {
  /** MediaItem with the large size */
  LARGE = 'LARGE',
  /** MediaItem with the medium size */
  MEDIUM = 'MEDIUM',
  /** MediaItem with the medium_large size */
  MEDIUM_LARGE = 'MEDIUM_LARGE',
  /** MediaItem with the post-thumbnail size */
  POST_THUMBNAIL = 'POST_THUMBNAIL',
  /** MediaItem with the thumbnail size */
  THUMBNAIL = 'THUMBNAIL',
  /** MediaItem with the 1536x1536 size */
  _1536X1536 = '_1536X1536',
  /** MediaItem with the 2048x2048 size */
  _2048X2048 = '_2048X2048',
}

/** The status of the media item object. */
export enum MediaItemStatusEnum {
  /** Objects with the auto-draft status */
  AUTO_DRAFT = 'AUTO_DRAFT',
  /** Objects with the inherit status */
  INHERIT = 'INHERIT',
  /** Objects with the private status */
  PRIVATE = 'PRIVATE',
  /** Objects with the trash status */
  TRASH = 'TRASH',
}

/** Arguments for filtering the MediaItemToCommentConnection connection */
export interface MediaItemToCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']>;
}

/** The Type of Identifier used to fetch a single node. Default is "ID". To be used along with the "id" field. */
export enum MenuItemNodeIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  ID = 'ID',
}

/** Arguments for filtering the MenuItemToMenuItemConnection connection */
export interface MenuItemToMenuItemConnectionWhereArgs {
  /** The database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: InputMaybe<Scalars['Int']>;
  /** The ID of the parent menu object */
  parentId?: InputMaybe<Scalars['ID']>;
}

/** Registered menu locations */
export enum MenuLocationEnum {
  /** Put the menu in the footer location */
  FOOTER = 'FOOTER',
  /** Put the menu in the primary location */
  PRIMARY = 'PRIMARY',
}

/** The Type of Identifier used to fetch a single node. Default is "ID". To be used along with the "id" field. */
export enum MenuNodeIdTypeEnum {
  /** Identify a menu node by the Database ID. */
  DATABASE_ID = 'DATABASE_ID',
  /** Identify a menu node by the (hashed) Global ID. */
  ID = 'ID',
  /** Identify a menu node by the slug of menu location to which it is assigned */
  LOCATION = 'LOCATION',
  /** Identify a menu node by its name */
  NAME = 'NAME',
  /** Identify a menu node by its slug */
  SLUG = 'SLUG',
}

/** Arguments for filtering the MenuToMenuItemConnection connection */
export interface MenuToMenuItemConnectionWhereArgs {
  /** The database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: InputMaybe<Scalars['Int']>;
  /** The ID of the parent menu object */
  parentId?: InputMaybe<Scalars['ID']>;
}

/** The MimeType of the object */
export enum MimeTypeEnum {
  /** application/java mime type. */
  APPLICATION_JAVA = 'APPLICATION_JAVA',
  /** application/msword mime type. */
  APPLICATION_MSWORD = 'APPLICATION_MSWORD',
  /** application/octet-stream mime type. */
  APPLICATION_OCTET_STREAM = 'APPLICATION_OCTET_STREAM',
  /** application/onenote mime type. */
  APPLICATION_ONENOTE = 'APPLICATION_ONENOTE',
  /** application/oxps mime type. */
  APPLICATION_OXPS = 'APPLICATION_OXPS',
  /** application/pdf mime type. */
  APPLICATION_PDF = 'APPLICATION_PDF',
  /** application/rar mime type. */
  APPLICATION_RAR = 'APPLICATION_RAR',
  /** application/rtf mime type. */
  APPLICATION_RTF = 'APPLICATION_RTF',
  /** application/ttaf+xml mime type. */
  APPLICATION_TTAF_XML = 'APPLICATION_TTAF_XML',
  /** application/vnd.apple.keynote mime type. */
  APPLICATION_VND_APPLE_KEYNOTE = 'APPLICATION_VND_APPLE_KEYNOTE',
  /** application/vnd.apple.numbers mime type. */
  APPLICATION_VND_APPLE_NUMBERS = 'APPLICATION_VND_APPLE_NUMBERS',
  /** application/vnd.apple.pages mime type. */
  APPLICATION_VND_APPLE_PAGES = 'APPLICATION_VND_APPLE_PAGES',
  /** application/vnd.ms-access mime type. */
  APPLICATION_VND_MS_ACCESS = 'APPLICATION_VND_MS_ACCESS',
  /** application/vnd.ms-excel mime type. */
  APPLICATION_VND_MS_EXCEL = 'APPLICATION_VND_MS_EXCEL',
  /** application/vnd.ms-excel.addin.macroEnabled.12 mime type. */
  APPLICATION_VND_MS_EXCEL_ADDIN_MACROENABLED_12 = 'APPLICATION_VND_MS_EXCEL_ADDIN_MACROENABLED_12',
  /** application/vnd.ms-excel.sheet.binary.macroEnabled.12 mime type. */
  APPLICATION_VND_MS_EXCEL_SHEET_BINARY_MACROENABLED_12 = 'APPLICATION_VND_MS_EXCEL_SHEET_BINARY_MACROENABLED_12',
  /** application/vnd.ms-excel.sheet.macroEnabled.12 mime type. */
  APPLICATION_VND_MS_EXCEL_SHEET_MACROENABLED_12 = 'APPLICATION_VND_MS_EXCEL_SHEET_MACROENABLED_12',
  /** application/vnd.ms-excel.template.macroEnabled.12 mime type. */
  APPLICATION_VND_MS_EXCEL_TEMPLATE_MACROENABLED_12 = 'APPLICATION_VND_MS_EXCEL_TEMPLATE_MACROENABLED_12',
  /** application/vnd.ms-powerpoint mime type. */
  APPLICATION_VND_MS_POWERPOINT = 'APPLICATION_VND_MS_POWERPOINT',
  /** application/vnd.ms-powerpoint.addin.macroEnabled.12 mime type. */
  APPLICATION_VND_MS_POWERPOINT_ADDIN_MACROENABLED_12 = 'APPLICATION_VND_MS_POWERPOINT_ADDIN_MACROENABLED_12',
  /** application/vnd.ms-powerpoint.presentation.macroEnabled.12 mime type. */
  APPLICATION_VND_MS_POWERPOINT_PRESENTATION_MACROENABLED_12 = 'APPLICATION_VND_MS_POWERPOINT_PRESENTATION_MACROENABLED_12',
  /** application/vnd.ms-powerpoint.slideshow.macroEnabled.12 mime type. */
  APPLICATION_VND_MS_POWERPOINT_SLIDESHOW_MACROENABLED_12 = 'APPLICATION_VND_MS_POWERPOINT_SLIDESHOW_MACROENABLED_12',
  /** application/vnd.ms-powerpoint.slide.macroEnabled.12 mime type. */
  APPLICATION_VND_MS_POWERPOINT_SLIDE_MACROENABLED_12 = 'APPLICATION_VND_MS_POWERPOINT_SLIDE_MACROENABLED_12',
  /** application/vnd.ms-powerpoint.template.macroEnabled.12 mime type. */
  APPLICATION_VND_MS_POWERPOINT_TEMPLATE_MACROENABLED_12 = 'APPLICATION_VND_MS_POWERPOINT_TEMPLATE_MACROENABLED_12',
  /** application/vnd.ms-project mime type. */
  APPLICATION_VND_MS_PROJECT = 'APPLICATION_VND_MS_PROJECT',
  /** application/vnd.ms-word.document.macroEnabled.12 mime type. */
  APPLICATION_VND_MS_WORD_DOCUMENT_MACROENABLED_12 = 'APPLICATION_VND_MS_WORD_DOCUMENT_MACROENABLED_12',
  /** application/vnd.ms-word.template.macroEnabled.12 mime type. */
  APPLICATION_VND_MS_WORD_TEMPLATE_MACROENABLED_12 = 'APPLICATION_VND_MS_WORD_TEMPLATE_MACROENABLED_12',
  /** application/vnd.ms-write mime type. */
  APPLICATION_VND_MS_WRITE = 'APPLICATION_VND_MS_WRITE',
  /** application/vnd.ms-xpsdocument mime type. */
  APPLICATION_VND_MS_XPSDOCUMENT = 'APPLICATION_VND_MS_XPSDOCUMENT',
  /** application/vnd.oasis.opendocument.chart mime type. */
  APPLICATION_VND_OASIS_OPENDOCUMENT_CHART = 'APPLICATION_VND_OASIS_OPENDOCUMENT_CHART',
  /** application/vnd.oasis.opendocument.database mime type. */
  APPLICATION_VND_OASIS_OPENDOCUMENT_DATABASE = 'APPLICATION_VND_OASIS_OPENDOCUMENT_DATABASE',
  /** application/vnd.oasis.opendocument.formula mime type. */
  APPLICATION_VND_OASIS_OPENDOCUMENT_FORMULA = 'APPLICATION_VND_OASIS_OPENDOCUMENT_FORMULA',
  /** application/vnd.oasis.opendocument.graphics mime type. */
  APPLICATION_VND_OASIS_OPENDOCUMENT_GRAPHICS = 'APPLICATION_VND_OASIS_OPENDOCUMENT_GRAPHICS',
  /** application/vnd.oasis.opendocument.presentation mime type. */
  APPLICATION_VND_OASIS_OPENDOCUMENT_PRESENTATION = 'APPLICATION_VND_OASIS_OPENDOCUMENT_PRESENTATION',
  /** application/vnd.oasis.opendocument.spreadsheet mime type. */
  APPLICATION_VND_OASIS_OPENDOCUMENT_SPREADSHEET = 'APPLICATION_VND_OASIS_OPENDOCUMENT_SPREADSHEET',
  /** application/vnd.oasis.opendocument.text mime type. */
  APPLICATION_VND_OASIS_OPENDOCUMENT_TEXT = 'APPLICATION_VND_OASIS_OPENDOCUMENT_TEXT',
  /** application/vnd.openxmlformats-officedocument.presentationml.presentation mime type. */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION',
  /** application/vnd.openxmlformats-officedocument.presentationml.slide mime type. */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDE = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDE',
  /** application/vnd.openxmlformats-officedocument.presentationml.slideshow mime type. */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDESHOW = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDESHOW',
  /** application/vnd.openxmlformats-officedocument.presentationml.template mime type. */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_TEMPLATE = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_TEMPLATE',
  /** application/vnd.openxmlformats-officedocument.spreadsheetml.sheet mime type. */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET',
  /** application/vnd.openxmlformats-officedocument.spreadsheetml.template mime type. */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_TEMPLATE = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_TEMPLATE',
  /** application/vnd.openxmlformats-officedocument.wordprocessingml.document mime type. */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT',
  /** application/vnd.openxmlformats-officedocument.wordprocessingml.template mime type. */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_TEMPLATE = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_TEMPLATE',
  /** application/wordperfect mime type. */
  APPLICATION_WORDPERFECT = 'APPLICATION_WORDPERFECT',
  /** application/x-7z-compressed mime type. */
  APPLICATION_X_7Z_COMPRESSED = 'APPLICATION_X_7Z_COMPRESSED',
  /** application/x-gzip mime type. */
  APPLICATION_X_GZIP = 'APPLICATION_X_GZIP',
  /** application/x-tar mime type. */
  APPLICATION_X_TAR = 'APPLICATION_X_TAR',
  /** application/zip mime type. */
  APPLICATION_ZIP = 'APPLICATION_ZIP',
  /** audio/aac mime type. */
  AUDIO_AAC = 'AUDIO_AAC',
  /** audio/flac mime type. */
  AUDIO_FLAC = 'AUDIO_FLAC',
  /** audio/midi mime type. */
  AUDIO_MIDI = 'AUDIO_MIDI',
  /** audio/mpeg mime type. */
  AUDIO_MPEG = 'AUDIO_MPEG',
  /** audio/ogg mime type. */
  AUDIO_OGG = 'AUDIO_OGG',
  /** audio/wav mime type. */
  AUDIO_WAV = 'AUDIO_WAV',
  /** audio/x-matroska mime type. */
  AUDIO_X_MATROSKA = 'AUDIO_X_MATROSKA',
  /** audio/x-ms-wax mime type. */
  AUDIO_X_MS_WAX = 'AUDIO_X_MS_WAX',
  /** audio/x-ms-wma mime type. */
  AUDIO_X_MS_WMA = 'AUDIO_X_MS_WMA',
  /** audio/x-realaudio mime type. */
  AUDIO_X_REALAUDIO = 'AUDIO_X_REALAUDIO',
  /** image/bmp mime type. */
  IMAGE_BMP = 'IMAGE_BMP',
  /** image/gif mime type. */
  IMAGE_GIF = 'IMAGE_GIF',
  /** image/heic mime type. */
  IMAGE_HEIC = 'IMAGE_HEIC',
  /** image/jpeg mime type. */
  IMAGE_JPEG = 'IMAGE_JPEG',
  /** image/png mime type. */
  IMAGE_PNG = 'IMAGE_PNG',
  /** image/tiff mime type. */
  IMAGE_TIFF = 'IMAGE_TIFF',
  /** image/webp mime type. */
  IMAGE_WEBP = 'IMAGE_WEBP',
  /** image/x-icon mime type. */
  IMAGE_X_ICON = 'IMAGE_X_ICON',
  /** text/calendar mime type. */
  TEXT_CALENDAR = 'TEXT_CALENDAR',
  /** text/css mime type. */
  TEXT_CSS = 'TEXT_CSS',
  /** text/csv mime type. */
  TEXT_CSV = 'TEXT_CSV',
  /** text/plain mime type. */
  TEXT_PLAIN = 'TEXT_PLAIN',
  /** text/richtext mime type. */
  TEXT_RICHTEXT = 'TEXT_RICHTEXT',
  /** text/tab-separated-values mime type. */
  TEXT_TAB_SEPARATED_VALUES = 'TEXT_TAB_SEPARATED_VALUES',
  /** text/vtt mime type. */
  TEXT_VTT = 'TEXT_VTT',
  /** video/3gpp mime type. */
  VIDEO_3GPP = 'VIDEO_3GPP',
  /** video/3gpp2 mime type. */
  VIDEO_3GPP2 = 'VIDEO_3GPP2',
  /** video/avi mime type. */
  VIDEO_AVI = 'VIDEO_AVI',
  /** video/divx mime type. */
  VIDEO_DIVX = 'VIDEO_DIVX',
  /** video/mp4 mime type. */
  VIDEO_MP4 = 'VIDEO_MP4',
  /** video/mpeg mime type. */
  VIDEO_MPEG = 'VIDEO_MPEG',
  /** video/ogg mime type. */
  VIDEO_OGG = 'VIDEO_OGG',
  /** video/quicktime mime type. */
  VIDEO_QUICKTIME = 'VIDEO_QUICKTIME',
  /** video/webm mime type. */
  VIDEO_WEBM = 'VIDEO_WEBM',
  /** video/x-flv mime type. */
  VIDEO_X_FLV = 'VIDEO_X_FLV',
  /** video/x-matroska mime type. */
  VIDEO_X_MATROSKA = 'VIDEO_X_MATROSKA',
  /** video/x-ms-asf mime type. */
  VIDEO_X_MS_ASF = 'VIDEO_X_MS_ASF',
  /** video/x-ms-wm mime type. */
  VIDEO_X_MS_WM = 'VIDEO_X_MS_WM',
  /** video/x-ms-wmv mime type. */
  VIDEO_X_MS_WMV = 'VIDEO_X_MS_WMV',
  /** video/x-ms-wmx mime type. */
  VIDEO_X_MS_WMX = 'VIDEO_X_MS_WMX',
}

/** The cardinality of the connection order */
export enum OrderEnum {
  /** Sort the query result set in an ascending order */
  ASC = 'ASC',
  /** Sort the query result set in a descending order */
  DESC = 'DESC',
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PageIdType {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  ID = 'ID',
  /** Identify a resource by the URI. */
  URI = 'URI',
}

/** Arguments for filtering the PageToCommentConnection connection */
export interface PageToCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']>;
}

/** Arguments for filtering the PageToRevisionConnection connection */
export interface PageToRevisionConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** The status of the WordPress plugin. */
export enum PluginStatusEnum {
  /** The plugin is currently active. */
  ACTIVE = 'ACTIVE',
  /** The plugin is a drop-in plugin. */
  DROP_IN = 'DROP_IN',
  /** The plugin is currently inactive. */
  INACTIVE = 'INACTIVE',
  /** The plugin is a must-use plugin. */
  MUST_USE = 'MUST_USE',
  /** The plugin is technically active but was paused while loading. */
  PAUSED = 'PAUSED',
  /** The plugin was active recently. */
  RECENTLY_ACTIVE = 'RECENTLY_ACTIVE',
  /** The plugin has an upgrade available. */
  UPGRADE = 'UPGRADE',
}

/** Set relationships between the post to categories */
export interface PostCategoriesInput {
  /** If true, this will append the category to existing related categories. If false, this will replace existing relationships. Default true. */
  append?: InputMaybe<Scalars['Boolean']>;
  /** The input list of items to set. */
  nodes?: InputMaybe<Array<InputMaybe<PostCategoriesNodeInput>>>;
}

/** List of categories to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export interface PostCategoriesNodeInput {
  /** The description of the category. This field is used to set a description of the category if a new one is created during the mutation. */
  description?: InputMaybe<Scalars['String']>;
  /** The ID of the category. If present, this will be used to connect to the post. If no existing category exists with this ID, no connection will be made. */
  id?: InputMaybe<Scalars['ID']>;
  /** The name of the category. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: InputMaybe<Scalars['String']>;
  /** The slug of the category. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: InputMaybe<Scalars['String']>;
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PostFormatIdType {
  /** The Database ID for the node */
  DATABASE_ID = 'DATABASE_ID',
  /** The hashed Global ID */
  ID = 'ID',
  /** The name of the node */
  NAME = 'NAME',
  /** Url friendly name of the node */
  SLUG = 'SLUG',
  /** The URI for the node */
  URI = 'URI',
}

/** Arguments for filtering the PostFormatToContentNodeConnection connection */
export interface PostFormatToContentNodeConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfPostFormatEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the PostFormatToPostConnection connection */
export interface PostFormatToPostConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PostIdType {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  ID = 'ID',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  SLUG = 'SLUG',
  /** Identify a resource by the URI. */
  URI = 'URI',
}

/** The format of post field data. */
export enum PostObjectFieldFormatEnum {
  /** Provide the field value directly from database. Null on unauthenticated requests. */
  RAW = 'RAW',
  /** Provide the field value as rendered by WordPress. Default. */
  RENDERED = 'RENDERED',
}

/** The column to use when filtering by date */
export enum PostObjectsConnectionDateColumnEnum {
  /** The date the comment was created in local time. */
  DATE = 'DATE',
  /** The most recent modification date of the comment. */
  MODIFIED = 'MODIFIED',
}

/** Field to order the connection by */
export enum PostObjectsConnectionOrderbyEnum {
  /** Order by author */
  AUTHOR = 'AUTHOR',
  /** Order by the number of comments it has acquired */
  COMMENT_COUNT = 'COMMENT_COUNT',
  /** Order by publish date */
  DATE = 'DATE',
  /** Preserve the ID order given in the IN array */
  IN = 'IN',
  /** Order by the menu order value */
  MENU_ORDER = 'MENU_ORDER',
  /** Order by last modified date */
  MODIFIED = 'MODIFIED',
  /** Preserve slug order given in the NAME_IN array */
  NAME_IN = 'NAME_IN',
  /** Order by parent ID */
  PARENT = 'PARENT',
  /** Order by slug */
  SLUG = 'SLUG',
  /** Order by title */
  TITLE = 'TITLE',
}

/** Options for ordering the connection */
export interface PostObjectsConnectionOrderbyInput {
  /** The field to order the connection by */
  field: PostObjectsConnectionOrderbyEnum;
  /** Possible directions in which to order a list of items */
  order: OrderEnum;
}

/** Set relationships between the post to postFormats */
export interface PostPostFormatsInput {
  /** If true, this will append the postFormat to existing related postFormats. If false, this will replace existing relationships. Default true. */
  append?: InputMaybe<Scalars['Boolean']>;
  /** The input list of items to set. */
  nodes?: InputMaybe<Array<InputMaybe<PostPostFormatsNodeInput>>>;
}

/** List of postFormats to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export interface PostPostFormatsNodeInput {
  /** The description of the postFormat. This field is used to set a description of the postFormat if a new one is created during the mutation. */
  description?: InputMaybe<Scalars['String']>;
  /** The ID of the postFormat. If present, this will be used to connect to the post. If no existing postFormat exists with this ID, no connection will be made. */
  id?: InputMaybe<Scalars['ID']>;
  /** The name of the postFormat. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: InputMaybe<Scalars['String']>;
  /** The slug of the postFormat. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: InputMaybe<Scalars['String']>;
}

/** The status of the object. */
export enum PostStatusEnum {
  /** Objects with the auto-draft status */
  AUTO_DRAFT = 'AUTO_DRAFT',
  /** Objects with the draft status */
  DRAFT = 'DRAFT',
  /** Objects with the future status */
  FUTURE = 'FUTURE',
  /** Objects with the inherit status */
  INHERIT = 'INHERIT',
  /** Objects with the pending status */
  PENDING = 'PENDING',
  /** Objects with the private status */
  PRIVATE = 'PRIVATE',
  /** Objects with the publish status */
  PUBLISH = 'PUBLISH',
  /** Objects with the request-completed status */
  REQUEST_COMPLETED = 'REQUEST_COMPLETED',
  /** Objects with the request-confirmed status */
  REQUEST_CONFIRMED = 'REQUEST_CONFIRMED',
  /** Objects with the request-failed status */
  REQUEST_FAILED = 'REQUEST_FAILED',
  /** Objects with the request-pending status */
  REQUEST_PENDING = 'REQUEST_PENDING',
  /** Objects with the trash status */
  TRASH = 'TRASH',
}

/** Set relationships between the post to tags */
export interface PostTagsInput {
  /** If true, this will append the tag to existing related tags. If false, this will replace existing relationships. Default true. */
  append?: InputMaybe<Scalars['Boolean']>;
  /** The input list of items to set. */
  nodes?: InputMaybe<Array<InputMaybe<PostTagsNodeInput>>>;
}

/** List of tags to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export interface PostTagsNodeInput {
  /** The description of the tag. This field is used to set a description of the tag if a new one is created during the mutation. */
  description?: InputMaybe<Scalars['String']>;
  /** The ID of the tag. If present, this will be used to connect to the post. If no existing tag exists with this ID, no connection will be made. */
  id?: InputMaybe<Scalars['ID']>;
  /** The name of the tag. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: InputMaybe<Scalars['String']>;
  /** The slug of the tag. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the PostToCategoryConnection connection */
export interface PostToCategoryConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']>;
}

/** Arguments for filtering the PostToCommentConnection connection */
export interface PostToCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']>;
}

/** Arguments for filtering the PostToPostFormatConnection connection */
export interface PostToPostFormatConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']>;
}

/** Arguments for filtering the PostToRevisionConnection connection */
export interface PostToRevisionConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the PostToTagConnection connection */
export interface PostToTagConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']>;
}

/** Arguments for filtering the PostToTermNodeConnection connection */
export interface PostToTermNodeConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The Taxonomy to filter terms by */
  taxonomies?: InputMaybe<Array<InputMaybe<TaxonomyEnum>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']>;
}

/** Input for the registerUser mutation. */
export interface RegisterUserInput {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars['String']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars['String']>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars['String']>;
  /** 	The user's first name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars['String']>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** User's locale. */
  locale?: InputMaybe<Scalars['String']>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars['String']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars['String']>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars['String']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars['String']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars['String']>;
  /** A string that contains the user's username. */
  username: Scalars['String'];
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars['String']>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars['String']>;
}

/** The logical relation between each item in the array when there are more than one. */
export enum RelationEnum {
  /** The logical AND condition returns true if both operands are true, otherwise, it returns false. */
  AND = 'AND',
  /** The logical OR condition returns false if both operands are false, otherwise, it returns true. */
  OR = 'OR',
}

/** Input for the resetUserPassword mutation. */
export interface ResetUserPasswordInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Password reset key */
  key?: InputMaybe<Scalars['String']>;
  /** The user's login (username). */
  login?: InputMaybe<Scalars['String']>;
  /** The new password. */
  password?: InputMaybe<Scalars['String']>;
}

/** Input for the restoreComment mutation. */
export interface RestoreCommentInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The ID of the comment to be restored */
  id: Scalars['ID'];
}

/** Arguments for filtering the RootQueryToCategoryConnection connection */
export interface RootQueryToCategoryConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']>;
}

/** Arguments for filtering the RootQueryToCommentConnection connection */
export interface RootQueryToCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']>;
}

/** Arguments for filtering the RootQueryToContentNodeConnection connection */
export interface RootQueryToContentNodeConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the RootQueryToMediaItemConnection connection */
export interface RootQueryToMediaItemConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the RootQueryToMenuConnection connection */
export interface RootQueryToMenuConnectionWhereArgs {
  /** The database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The slug of the menu to query items for */
  slug?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the RootQueryToMenuItemConnection connection */
export interface RootQueryToMenuItemConnectionWhereArgs {
  /** The database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: InputMaybe<Scalars['Int']>;
  /** The ID of the parent menu object */
  parentId?: InputMaybe<Scalars['ID']>;
}

/** Arguments for filtering the RootQueryToPageConnection connection */
export interface RootQueryToPageConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the RootQueryToPluginConnection connection */
export interface RootQueryToPluginConnectionWhereArgs {
  /** Show plugin based on a keyword search. */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve plugins where plugin status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PluginStatusEnum>>>;
  /** Show plugins with a specific status. */
  status?: InputMaybe<PluginStatusEnum>;
}

/** Arguments for filtering the RootQueryToPostConnection connection */
export interface RootQueryToPostConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the RootQueryToPostFormatConnection connection */
export interface RootQueryToPostFormatConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']>;
}

/** Arguments for filtering the RootQueryToRevisionsConnection connection */
export interface RootQueryToRevisionsConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the RootQueryToTagConnection connection */
export interface RootQueryToTagConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']>;
}

/** Arguments for filtering the RootQueryToTermNodeConnection connection */
export interface RootQueryToTermNodeConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The Taxonomy to filter terms by */
  taxonomies?: InputMaybe<Array<InputMaybe<TaxonomyEnum>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']>;
}

/** Arguments for filtering the RootQueryToUserConnection connection */
export interface RootQueryToUserConnectionWhereArgs {
  /** Array of userIds to exclude. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** Pass an array of post types to filter results to users who have published posts in those post types. */
  hasPublishedPosts?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of userIds to include. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** The user login. */
  login?: InputMaybe<Scalars['String']>;
  /** An array of logins to include. Users matching one of these logins will be included in results. */
  loginIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** An array of logins to exclude. Users matching one of these logins will not be included in results. */
  loginNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The user nicename. */
  nicename?: InputMaybe<Scalars['String']>;
  /** An array of nicenames to include. Users matching one of these nicenames will be included in results. */
  nicenameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** An array of nicenames to exclude. Users matching one of these nicenames will not be included in results. */
  nicenameNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<UsersConnectionOrderbyInput>>>;
  /** An array of role names that users must match to be included in results. Note that this is an inclusive list: users must match *each* role. */
  role?: InputMaybe<UserRoleEnum>;
  /** An array of role names. Matched users must have at least one of these roles. */
  roleIn?: InputMaybe<Array<InputMaybe<UserRoleEnum>>>;
  /** An array of role names to exclude. Users matching one or more of these roles will not be included in results. */
  roleNotIn?: InputMaybe<Array<InputMaybe<UserRoleEnum>>>;
  /** Search keyword. Searches for possible string matches on columns. When "searchColumns" is left empty, it tries to determine which column to search in based on search string. */
  search?: InputMaybe<Scalars['String']>;
  /** Array of column names to be searched. Accepts 'ID', 'login', 'nicename', 'email', 'url'. */
  searchColumns?: InputMaybe<
    Array<InputMaybe<UsersConnectionSearchColumnEnum>>
  >;
}

/** The strategy to use when loading the script */
export enum ScriptLoadingStrategyEnum {
  /** Use the script `async` attribute */
  ASYNC = 'ASYNC',
  /** Use the script `defer` attribute */
  DEFER = 'DEFER',
}

/** Input for the sendPasswordResetEmail mutation. */
export interface SendPasswordResetEmailInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** A string that contains the user's username or email address. */
  username: Scalars['String'];
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum TagIdType {
  /** The Database ID for the node */
  DATABASE_ID = 'DATABASE_ID',
  /** The hashed Global ID */
  ID = 'ID',
  /** The name of the node */
  NAME = 'NAME',
  /** Url friendly name of the node */
  SLUG = 'SLUG',
  /** The URI for the node */
  URI = 'URI',
}

/** Arguments for filtering the TagToContentNodeConnection connection */
export interface TagToContentNodeConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfTagEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the TagToPostConnection connection */
export interface TagToPostConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Allowed taxonomies */
export enum TaxonomyEnum {
  /** Taxonomy enum category */
  CATEGORY = 'CATEGORY',
  /** Taxonomy enum post_format */
  POSTFORMAT = 'POSTFORMAT',
  /** Taxonomy enum post_tag */
  TAG = 'TAG',
}

/** The Type of Identifier used to fetch a single Taxonomy node. To be used along with the "id" field. Default is "ID". */
export enum TaxonomyIdTypeEnum {
  /** The globally unique ID */
  ID = 'ID',
  /** The name of the taxonomy */
  NAME = 'NAME',
}

/** The Type of Identifier used to fetch a single resource. Default is "ID". To be used along with the "id" field. */
export enum TermNodeIdTypeEnum {
  /** The Database ID for the node */
  DATABASE_ID = 'DATABASE_ID',
  /** The hashed Global ID */
  ID = 'ID',
  /** The name of the node */
  NAME = 'NAME',
  /** Url friendly name of the node */
  SLUG = 'SLUG',
  /** The URI for the node */
  URI = 'URI',
}

/** Options for ordering the connection by */
export enum TermObjectsConnectionOrderbyEnum {
  /** Order the connection by item count. */
  COUNT = 'COUNT',
  /** Order the connection by description. */
  DESCRIPTION = 'DESCRIPTION',
  /** Order the connection by name. */
  NAME = 'NAME',
  /** Order the connection by slug. */
  SLUG = 'SLUG',
  /** Order the connection by term group. */
  TERM_GROUP = 'TERM_GROUP',
  /** Order the connection by term id. */
  TERM_ID = 'TERM_ID',
  /** Order the connection by term order. */
  TERM_ORDER = 'TERM_ORDER',
}

/** Input for the updateCategory mutation. */
export interface UpdateCategoryInput {
  /** The slug that the category will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The description of the category object */
  description?: InputMaybe<Scalars['String']>;
  /** The ID of the category object to update */
  id: Scalars['ID'];
  /** The name of the category object to mutate */
  name?: InputMaybe<Scalars['String']>;
  /** The ID of the category that should be set as the parent */
  parentId?: InputMaybe<Scalars['ID']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']>;
}

/** Input for the updateComment mutation. */
export interface UpdateCommentInput {
  /** The approval status of the comment. */
  approved?: InputMaybe<Scalars['String']>;
  /** The name of the comment's author. */
  author?: InputMaybe<Scalars['String']>;
  /** The email of the comment's author. */
  authorEmail?: InputMaybe<Scalars['String']>;
  /** The url of the comment's author. */
  authorUrl?: InputMaybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The database ID of the post object the comment belongs to. */
  commentOn?: InputMaybe<Scalars['Int']>;
  /** Content of the comment. */
  content?: InputMaybe<Scalars['String']>;
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']>;
  /** The ID of the comment being updated. */
  id: Scalars['ID'];
  /** Parent comment ID of current comment. */
  parent?: InputMaybe<Scalars['ID']>;
  /** The approval status of the comment */
  status?: InputMaybe<CommentStatusEnum>;
  /** Type of comment. */
  type?: InputMaybe<Scalars['String']>;
}

/** Input for the updateMediaItem mutation. */
export interface UpdateMediaItemInput {
  /** Alternative text to display when mediaItem is not displayed */
  altText?: InputMaybe<Scalars['String']>;
  /** The userId to assign as the author of the mediaItem */
  authorId?: InputMaybe<Scalars['ID']>;
  /** The caption for the mediaItem */
  caption?: InputMaybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The comment status for the mediaItem */
  commentStatus?: InputMaybe<Scalars['String']>;
  /** The date of the mediaItem */
  date?: InputMaybe<Scalars['String']>;
  /** The date (in GMT zone) of the mediaItem */
  dateGmt?: InputMaybe<Scalars['String']>;
  /** Description of the mediaItem */
  description?: InputMaybe<Scalars['String']>;
  /** The file name of the mediaItem */
  filePath?: InputMaybe<Scalars['String']>;
  /** The file type of the mediaItem */
  fileType?: InputMaybe<MimeTypeEnum>;
  /** The ID of the mediaItem object */
  id: Scalars['ID'];
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars['ID']>;
  /** The ping status for the mediaItem */
  pingStatus?: InputMaybe<Scalars['String']>;
  /** The slug of the mediaItem */
  slug?: InputMaybe<Scalars['String']>;
  /** The status of the mediaItem */
  status?: InputMaybe<MediaItemStatusEnum>;
  /** The title of the mediaItem */
  title?: InputMaybe<Scalars['String']>;
}

/** Input for the updatePage mutation. */
export interface UpdatePageInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars['ID']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars['String']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']>;
  /** The ID of the page object */
  id: Scalars['ID'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']>;
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars['ID']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Input for the updatePostFormat mutation. */
export interface UpdatePostFormatInput {
  /** The slug that the post_format will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The description of the post_format object */
  description?: InputMaybe<Scalars['String']>;
  /** The ID of the postFormat object to update */
  id: Scalars['ID'];
  /** The name of the post_format object to mutate */
  name?: InputMaybe<Scalars['String']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']>;
}

/** Input for the updatePost mutation. */
export interface UpdatePostInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars['ID']>;
  /** Set connections between the post and categories */
  categories?: InputMaybe<PostCategoriesInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars['String']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']>;
  /** The excerpt of the object */
  excerpt?: InputMaybe<Scalars['String']>;
  /** The ID of the post object */
  id: Scalars['ID'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']>;
  /** The ping status for the object */
  pingStatus?: InputMaybe<Scalars['String']>;
  /** URLs that have been pinged. */
  pinged?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Set connections between the post and postFormats */
  postFormats?: InputMaybe<PostPostFormatsInput>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** Set connections between the post and tags */
  tags?: InputMaybe<PostTagsInput>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']>;
  /** URLs queued to be pinged. */
  toPing?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Input for the updateSettings mutation. */
export interface UpdateSettingsInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Allow people to submit comments on new posts. */
  discussionSettingsDefaultCommentStatus?: InputMaybe<Scalars['String']>;
  /** Allow link notifications from other blogs (pingbacks and trackbacks) on new articles. */
  discussionSettingsDefaultPingStatus?: InputMaybe<Scalars['String']>;
  /** A date format for all date strings. */
  generalSettingsDateFormat?: InputMaybe<Scalars['String']>;
  /** Site tagline. */
  generalSettingsDescription?: InputMaybe<Scalars['String']>;
  /** This address is used for admin purposes, like new user notification. */
  generalSettingsEmail?: InputMaybe<Scalars['String']>;
  /** WordPress locale code. */
  generalSettingsLanguage?: InputMaybe<Scalars['String']>;
  /** A day number of the week that the week should start on. */
  generalSettingsStartOfWeek?: InputMaybe<Scalars['Int']>;
  /** A time format for all time strings. */
  generalSettingsTimeFormat?: InputMaybe<Scalars['String']>;
  /** A city in the same timezone as you. */
  generalSettingsTimezone?: InputMaybe<Scalars['String']>;
  /** Site title. */
  generalSettingsTitle?: InputMaybe<Scalars['String']>;
  /** Site URL. */
  generalSettingsUrl?: InputMaybe<Scalars['String']>;
  /** The ID of the page that should display the latest posts */
  readingSettingsPageForPosts?: InputMaybe<Scalars['Int']>;
  /** The ID of the page that should be displayed on the front page */
  readingSettingsPageOnFront?: InputMaybe<Scalars['Int']>;
  /** Blog pages show at most. */
  readingSettingsPostsPerPage?: InputMaybe<Scalars['Int']>;
  /** What to show on the front page */
  readingSettingsShowOnFront?: InputMaybe<Scalars['String']>;
  /** Default post category. */
  writingSettingsDefaultCategory?: InputMaybe<Scalars['Int']>;
  /** Default post format. */
  writingSettingsDefaultPostFormat?: InputMaybe<Scalars['String']>;
  /** Convert emoticons like :-) and :-P to graphics on display. */
  writingSettingsUseSmilies?: InputMaybe<Scalars['Boolean']>;
}

/** Input for the updateTag mutation. */
export interface UpdateTagInput {
  /** The slug that the post_tag will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The description of the post_tag object */
  description?: InputMaybe<Scalars['String']>;
  /** The ID of the tag object to update */
  id: Scalars['ID'];
  /** The name of the post_tag object to mutate */
  name?: InputMaybe<Scalars['String']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']>;
}

/** Input for the updateUser mutation. */
export interface UpdateUserInput {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars['String']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars['String']>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars['String']>;
  /** 	The user's first name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** The ID of the user */
  id: Scalars['ID'];
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars['String']>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** User's locale. */
  locale?: InputMaybe<Scalars['String']>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars['String']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars['String']>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars['String']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars['String']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars['String']>;
  /** An array of roles to be assigned to the user. */
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars['String']>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars['String']>;
}

/** The Type of Identifier used to fetch a single User node. To be used along with the "id" field. Default is "ID". */
export enum UserNodeIdTypeEnum {
  /** The Database ID for the node */
  DATABASE_ID = 'DATABASE_ID',
  /** The Email of the User */
  EMAIL = 'EMAIL',
  /** The hashed Global ID */
  ID = 'ID',
  /** The slug of the User */
  SLUG = 'SLUG',
  /** The URI for the node */
  URI = 'URI',
  /** The username the User uses to login with */
  USERNAME = 'USERNAME',
}

/** Names of available user roles */
export enum UserRoleEnum {
  /** User role with specific capabilities */
  ADMINISTRATOR = 'ADMINISTRATOR',
  /** User role with specific capabilities */
  AUTHOR = 'AUTHOR',
  /** User role with specific capabilities */
  CONTRIBUTOR = 'CONTRIBUTOR',
  /** User role with specific capabilities */
  EDITOR = 'EDITOR',
  /** User role with specific capabilities */
  SUBSCRIBER = 'SUBSCRIBER',
}

/** Arguments for filtering the UserToCommentConnection connection */
export interface UserToCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']>;
}

/** Arguments for filtering the UserToMediaItemConnection connection */
export interface UserToMediaItemConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the UserToPageConnection connection */
export interface UserToPageConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the UserToPostConnection connection */
export interface UserToPostConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Arguments for filtering the UserToRevisionsConnection connection */
export interface UserToRevisionsConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']>;
}

/** Field to order the connection by */
export enum UsersConnectionOrderbyEnum {
  /** Order by display name */
  DISPLAY_NAME = 'DISPLAY_NAME',
  /** Order by email address */
  EMAIL = 'EMAIL',
  /** Order by login */
  LOGIN = 'LOGIN',
  /** Preserve the login order given in the LOGIN_IN array */
  LOGIN_IN = 'LOGIN_IN',
  /** Order by nice name */
  NICE_NAME = 'NICE_NAME',
  /** Preserve the nice name order given in the NICE_NAME_IN array */
  NICE_NAME_IN = 'NICE_NAME_IN',
  /** Order by registration date */
  REGISTERED = 'REGISTERED',
  /** Order by URL */
  URL = 'URL',
}

/** Options for ordering the connection */
export interface UsersConnectionOrderbyInput {
  /** The field name used to sort the results. */
  field: UsersConnectionOrderbyEnum;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
}

/** Column used for searching for users. */
export enum UsersConnectionSearchColumnEnum {
  /** The user's email address. */
  EMAIL = 'EMAIL',
  /** The globally unique ID. */
  ID = 'ID',
  /** The username the User uses to login with. */
  LOGIN = 'LOGIN',
  /** A URL-friendly name for the user. The default is the user's username. */
  NICENAME = 'NICENAME',
  /** The URL of the user's website. */
  URL = 'URL',
}

export const scalarsEnumsHash: import('gqty').ScalarsEnumsHash = {
  AvatarRatingEnum: true,
  Boolean: true,
  CategoryIdType: true,
  CommentNodeIdTypeEnum: true,
  CommentStatusEnum: true,
  CommentsConnectionOrderbyEnum: true,
  ContentNodeIdTypeEnum: true,
  ContentTypeEnum: true,
  ContentTypeIdTypeEnum: true,
  ContentTypesOfCategoryEnum: true,
  ContentTypesOfPostFormatEnum: true,
  ContentTypesOfTagEnum: true,
  Float: true,
  ID: true,
  Int: true,
  MediaItemIdType: true,
  MediaItemSizeEnum: true,
  MediaItemStatusEnum: true,
  MenuItemNodeIdTypeEnum: true,
  MenuLocationEnum: true,
  MenuNodeIdTypeEnum: true,
  MimeTypeEnum: true,
  OrderEnum: true,
  PageIdType: true,
  PluginStatusEnum: true,
  PostFormatIdType: true,
  PostIdType: true,
  PostObjectFieldFormatEnum: true,
  PostObjectsConnectionDateColumnEnum: true,
  PostObjectsConnectionOrderbyEnum: true,
  PostStatusEnum: true,
  RelationEnum: true,
  ScriptLoadingStrategyEnum: true,
  String: true,
  TagIdType: true,
  TaxonomyEnum: true,
  TaxonomyIdTypeEnum: true,
  TermNodeIdTypeEnum: true,
  TermObjectsConnectionOrderbyEnum: true,
  UserNodeIdTypeEnum: true,
  UserRoleEnum: true,
  UsersConnectionOrderbyEnum: true,
  UsersConnectionSearchColumnEnum: true,
};
export const generatedSchema = {
  Avatar: {
    __typename: { __type: 'String!' },
    default: { __type: 'String' },
    extraAttr: { __type: 'String' },
    forceDefault: { __type: 'Boolean' },
    foundAvatar: { __type: 'Boolean' },
    height: { __type: 'Int' },
    isRestricted: { __type: 'Boolean' },
    rating: { __type: 'String' },
    scheme: { __type: 'String' },
    size: { __type: 'Int' },
    url: { __type: 'String' },
    width: { __type: 'Int' },
  },
  Category: {
    __typename: { __type: 'String!' },
    ancestors: {
      __type: 'CategoryToAncestorsCategoryConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    categoryId: { __type: 'Int' },
    children: {
      __type: 'CategoryToCategoryConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'CategoryToCategoryConnectionWhereArgs',
      },
    },
    conditionalTags: { __type: 'ConditionalTags' },
    contentNodes: {
      __type: 'CategoryToContentNodeConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'CategoryToContentNodeConnectionWhereArgs',
      },
    },
    count: { __type: 'Int' },
    databaseId: { __type: 'Int!' },
    description: { __type: 'String' },
    enqueuedScripts: {
      __type: 'TermNodeToEnqueuedScriptConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    enqueuedStylesheets: {
      __type: 'TermNodeToEnqueuedStylesheetConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isRestricted: { __type: 'Boolean' },
    isTermNode: { __type: 'Boolean!' },
    link: { __type: 'String' },
    name: { __type: 'String' },
    parent: { __type: 'CategoryToParentCategoryConnectionEdge' },
    parentDatabaseId: { __type: 'Int' },
    parentId: { __type: 'ID' },
    posts: {
      __type: 'CategoryToPostConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'CategoryToPostConnectionWhereArgs',
      },
    },
    slug: { __type: 'String' },
    taxonomy: { __type: 'CategoryToTaxonomyConnectionEdge' },
    taxonomyName: { __type: 'String' },
    templates: { __type: '[String]' },
    termGroupId: { __type: 'Int' },
    termTaxonomyId: { __type: 'Int' },
    uri: { __type: 'String' },
  },
  CategoryConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[CategoryConnectionEdge!]!' },
    nodes: { __type: '[Category!]!' },
    pageInfo: { __type: 'CategoryConnectionPageInfo!' },
    $on: { __type: '$CategoryConnection!' },
  },
  CategoryConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Category!' },
    $on: { __type: '$CategoryConnectionEdge!' },
  },
  CategoryConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$CategoryConnectionPageInfo!' },
  },
  CategoryToAncestorsCategoryConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[CategoryToAncestorsCategoryConnectionEdge!]!' },
    nodes: { __type: '[Category!]!' },
    pageInfo: { __type: 'CategoryToAncestorsCategoryConnectionPageInfo!' },
  },
  CategoryToAncestorsCategoryConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Category!' },
  },
  CategoryToAncestorsCategoryConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  CategoryToCategoryConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[CategoryToCategoryConnectionEdge!]!' },
    nodes: { __type: '[Category!]!' },
    pageInfo: { __type: 'CategoryToCategoryConnectionPageInfo!' },
  },
  CategoryToCategoryConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Category!' },
  },
  CategoryToCategoryConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  CategoryToCategoryConnectionWhereArgs: {
    cacheDomain: { __type: 'String' },
    childOf: { __type: 'Int' },
    childless: { __type: 'Boolean' },
    descriptionLike: { __type: 'String' },
    exclude: { __type: '[ID]' },
    excludeTree: { __type: '[ID]' },
    hideEmpty: { __type: 'Boolean' },
    hierarchical: { __type: 'Boolean' },
    include: { __type: '[ID]' },
    name: { __type: '[String]' },
    nameLike: { __type: 'String' },
    objectIds: { __type: '[ID]' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'TermObjectsConnectionOrderbyEnum' },
    padCounts: { __type: 'Boolean' },
    parent: { __type: 'Int' },
    search: { __type: 'String' },
    slug: { __type: '[String]' },
    termTaxonomId: { __type: '[ID]' },
    termTaxonomyId: { __type: '[ID]' },
    updateTermMetaCache: { __type: 'Boolean' },
  },
  CategoryToContentNodeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[CategoryToContentNodeConnectionEdge!]!' },
    nodes: { __type: '[ContentNode!]!' },
    pageInfo: { __type: 'CategoryToContentNodeConnectionPageInfo!' },
  },
  CategoryToContentNodeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentNode!' },
  },
  CategoryToContentNodeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  CategoryToContentNodeConnectionWhereArgs: {
    contentTypes: { __type: '[ContentTypesOfCategoryEnum]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  CategoryToParentCategoryConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Category!' },
  },
  CategoryToPostConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[CategoryToPostConnectionEdge!]!' },
    nodes: { __type: '[Post!]!' },
    pageInfo: { __type: 'CategoryToPostConnectionPageInfo!' },
  },
  CategoryToPostConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Post!' },
  },
  CategoryToPostConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  CategoryToPostConnectionWhereArgs: {
    author: { __type: 'Int' },
    authorIn: { __type: '[ID]' },
    authorName: { __type: 'String' },
    authorNotIn: { __type: '[ID]' },
    categoryId: { __type: 'Int' },
    categoryIn: { __type: '[ID]' },
    categoryName: { __type: 'String' },
    categoryNotIn: { __type: '[ID]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    tag: { __type: 'String' },
    tagId: { __type: 'String' },
    tagIn: { __type: '[ID]' },
    tagNotIn: { __type: '[ID]' },
    tagSlugAnd: { __type: '[String]' },
    tagSlugIn: { __type: '[String]' },
    title: { __type: 'String' },
  },
  CategoryToTaxonomyConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Taxonomy!' },
  },
  Comment: {
    __typename: { __type: 'String!' },
    agent: { __type: 'String' },
    approved: { __type: 'Boolean' },
    author: { __type: 'CommentToCommenterConnectionEdge' },
    authorIp: { __type: 'String' },
    commentId: { __type: 'Int' },
    commentedOn: { __type: 'CommentToContentNodeConnectionEdge' },
    content: {
      __type: 'String',
      __args: { format: 'PostObjectFieldFormatEnum' },
    },
    databaseId: { __type: 'Int!' },
    date: { __type: 'String' },
    dateGmt: { __type: 'String' },
    id: { __type: 'ID!' },
    isRestricted: { __type: 'Boolean' },
    karma: { __type: 'Int' },
    parent: {
      __type: 'CommentToParentCommentConnectionEdge',
      __args: { where: 'CommentToParentCommentConnectionWhereArgs' },
    },
    parentDatabaseId: { __type: 'Int' },
    parentId: { __type: 'ID' },
    replies: {
      __type: 'CommentToCommentConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'CommentToCommentConnectionWhereArgs',
      },
    },
    status: { __type: 'CommentStatusEnum' },
    type: { __type: 'String' },
  },
  CommentAuthor: {
    __typename: { __type: 'String!' },
    avatar: {
      __type: 'Avatar',
      __args: {
        forceDefault: 'Boolean',
        rating: 'AvatarRatingEnum',
        size: 'Int',
      },
    },
    databaseId: { __type: 'Int!' },
    email: { __type: 'String' },
    id: { __type: 'ID!' },
    isRestricted: { __type: 'Boolean' },
    name: { __type: 'String' },
    url: { __type: 'String' },
  },
  CommentConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[CommentConnectionEdge!]!' },
    nodes: { __type: '[Comment!]!' },
    pageInfo: { __type: 'CommentConnectionPageInfo!' },
    $on: { __type: '$CommentConnection!' },
  },
  CommentConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Comment!' },
    $on: { __type: '$CommentConnectionEdge!' },
  },
  CommentConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$CommentConnectionPageInfo!' },
  },
  CommentToCommentConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[CommentToCommentConnectionEdge!]!' },
    nodes: { __type: '[Comment!]!' },
    pageInfo: { __type: 'CommentToCommentConnectionPageInfo!' },
  },
  CommentToCommentConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Comment!' },
  },
  CommentToCommentConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  CommentToCommentConnectionWhereArgs: {
    authorEmail: { __type: 'String' },
    authorIn: { __type: '[ID]' },
    authorNotIn: { __type: '[ID]' },
    authorUrl: { __type: 'String' },
    commentIn: { __type: '[ID]' },
    commentNotIn: { __type: '[ID]' },
    commentType: { __type: 'String' },
    commentTypeIn: { __type: '[String]' },
    commentTypeNotIn: { __type: 'String' },
    contentAuthor: { __type: '[ID]' },
    contentAuthorIn: { __type: '[ID]' },
    contentAuthorNotIn: { __type: '[ID]' },
    contentId: { __type: 'ID' },
    contentIdIn: { __type: '[ID]' },
    contentIdNotIn: { __type: '[ID]' },
    contentName: { __type: 'String' },
    contentParent: { __type: 'Int' },
    contentStatus: { __type: '[PostStatusEnum]' },
    contentType: { __type: '[ContentTypeEnum]' },
    includeUnapproved: { __type: '[ID]' },
    karma: { __type: 'Int' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'CommentsConnectionOrderbyEnum' },
    parent: { __type: 'Int' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    search: { __type: 'String' },
    status: { __type: 'String' },
    userId: { __type: 'ID' },
  },
  CommentToCommenterConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Commenter!' },
  },
  CommentToContentNodeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentNode!' },
  },
  CommentToParentCommentConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Comment!' },
  },
  CommentToParentCommentConnectionWhereArgs: {
    authorEmail: { __type: 'String' },
    authorIn: { __type: '[ID]' },
    authorNotIn: { __type: '[ID]' },
    authorUrl: { __type: 'String' },
    commentIn: { __type: '[ID]' },
    commentNotIn: { __type: '[ID]' },
    commentType: { __type: 'String' },
    commentTypeIn: { __type: '[String]' },
    commentTypeNotIn: { __type: 'String' },
    contentAuthor: { __type: '[ID]' },
    contentAuthorIn: { __type: '[ID]' },
    contentAuthorNotIn: { __type: '[ID]' },
    contentId: { __type: 'ID' },
    contentIdIn: { __type: '[ID]' },
    contentIdNotIn: { __type: '[ID]' },
    contentName: { __type: 'String' },
    contentParent: { __type: 'Int' },
    contentStatus: { __type: '[PostStatusEnum]' },
    contentType: { __type: '[ContentTypeEnum]' },
    includeUnapproved: { __type: '[ID]' },
    karma: { __type: 'Int' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'CommentsConnectionOrderbyEnum' },
    parent: { __type: 'Int' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    search: { __type: 'String' },
    status: { __type: 'String' },
    userId: { __type: 'ID' },
  },
  Commenter: {
    __typename: { __type: 'String!' },
    avatar: { __type: 'Avatar' },
    databaseId: { __type: 'Int!' },
    email: { __type: 'String' },
    id: { __type: 'ID!' },
    isRestricted: { __type: 'Boolean' },
    name: { __type: 'String' },
    url: { __type: 'String' },
    $on: { __type: '$Commenter!' },
  },
  CommenterConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Commenter!' },
    $on: { __type: '$CommenterConnectionEdge!' },
  },
  ConditionalTags: {
    __typename: { __type: 'String!' },
    isArchive: { __type: 'Boolean' },
    isAttachment: { __type: 'Boolean' },
    isAuthor: { __type: 'Boolean' },
    isCategory: { __type: 'Boolean' },
    isDate: { __type: 'Boolean' },
    isDay: { __type: 'Boolean' },
    isFrontPage: { __type: 'Boolean' },
    isHome: { __type: 'Boolean' },
    isMonth: { __type: 'Boolean' },
    isMultiAuthor: { __type: 'Boolean' },
    isPage: { __type: 'Boolean' },
    isPageTemplate: { __type: 'Boolean' },
    isPostTypeArchive: { __type: 'Boolean' },
    isPreview: { __type: 'Boolean' },
    isPrivacyPolicy: { __type: 'Boolean' },
    isSearch: { __type: 'Boolean' },
    isSingle: { __type: 'Boolean' },
    isSingular: { __type: 'Boolean' },
    isSticky: { __type: 'Boolean' },
    isTag: { __type: 'Boolean' },
    isTax: { __type: 'Boolean' },
    isYear: { __type: 'Boolean' },
  },
  Connection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[Edge!]!' },
    nodes: { __type: '[Node!]!' },
    pageInfo: { __type: 'PageInfo!' },
    $on: { __type: '$Connection!' },
  },
  ContentNode: {
    __typename: { __type: 'String!' },
    conditionalTags: { __type: 'ConditionalTags' },
    contentType: { __type: 'ContentNodeToContentTypeConnectionEdge' },
    contentTypeName: { __type: 'String!' },
    databaseId: { __type: 'Int!' },
    date: { __type: 'String' },
    dateGmt: { __type: 'String' },
    desiredSlug: { __type: 'String' },
    editingLockedBy: { __type: 'ContentNodeToEditLockConnectionEdge' },
    enclosure: { __type: 'String' },
    enqueuedScripts: {
      __type: 'ContentNodeToEnqueuedScriptConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    enqueuedStylesheets: {
      __type: 'ContentNodeToEnqueuedStylesheetConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    guid: { __type: 'String' },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isPreview: { __type: 'Boolean' },
    isRestricted: { __type: 'Boolean' },
    isTermNode: { __type: 'Boolean!' },
    lastEditedBy: { __type: 'ContentNodeToEditLastConnectionEdge' },
    link: { __type: 'String' },
    modified: { __type: 'String' },
    modifiedGmt: { __type: 'String' },
    previewRevisionDatabaseId: { __type: 'Int' },
    previewRevisionId: { __type: 'ID' },
    slug: { __type: 'String' },
    status: { __type: 'String' },
    template: { __type: 'ContentTemplate' },
    templates: { __type: '[String]' },
    uri: { __type: 'String' },
    $on: { __type: '$ContentNode!' },
  },
  ContentNodeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[ContentNodeConnectionEdge!]!' },
    nodes: { __type: '[ContentNode!]!' },
    pageInfo: { __type: 'ContentNodeConnectionPageInfo!' },
    $on: { __type: '$ContentNodeConnection!' },
  },
  ContentNodeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentNode!' },
    $on: { __type: '$ContentNodeConnectionEdge!' },
  },
  ContentNodeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$ContentNodeConnectionPageInfo!' },
  },
  ContentNodeToContentTypeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentType!' },
  },
  ContentNodeToEditLastConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'User!' },
  },
  ContentNodeToEditLockConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    lockTimestamp: { __type: 'String' },
    node: { __type: 'User!' },
  },
  ContentNodeToEnqueuedScriptConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[ContentNodeToEnqueuedScriptConnectionEdge!]!' },
    nodes: { __type: '[EnqueuedScript!]!' },
    pageInfo: { __type: 'ContentNodeToEnqueuedScriptConnectionPageInfo!' },
  },
  ContentNodeToEnqueuedScriptConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'EnqueuedScript!' },
  },
  ContentNodeToEnqueuedScriptConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  ContentNodeToEnqueuedStylesheetConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[ContentNodeToEnqueuedStylesheetConnectionEdge!]!' },
    nodes: { __type: '[EnqueuedStylesheet!]!' },
    pageInfo: { __type: 'ContentNodeToEnqueuedStylesheetConnectionPageInfo!' },
  },
  ContentNodeToEnqueuedStylesheetConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'EnqueuedStylesheet!' },
  },
  ContentNodeToEnqueuedStylesheetConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  ContentTemplate: {
    __typename: { __type: 'String!' },
    templateName: { __type: 'String' },
    $on: { __type: '$ContentTemplate!' },
  },
  ContentType: {
    __typename: { __type: 'String!' },
    canExport: { __type: 'Boolean' },
    conditionalTags: { __type: 'ConditionalTags' },
    connectedTaxonomies: {
      __type: 'ContentTypeToTaxonomyConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    contentNodes: {
      __type: 'ContentTypeToContentNodeConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'ContentTypeToContentNodeConnectionWhereArgs',
      },
    },
    deleteWithUser: { __type: 'Boolean' },
    description: { __type: 'String' },
    excludeFromSearch: { __type: 'Boolean' },
    graphqlPluralName: { __type: 'String' },
    graphqlSingleName: { __type: 'String' },
    hasArchive: { __type: 'Boolean' },
    hierarchical: { __type: 'Boolean' },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isFrontPage: { __type: 'Boolean!' },
    isPostsPage: { __type: 'Boolean!' },
    isRestricted: { __type: 'Boolean' },
    isTermNode: { __type: 'Boolean!' },
    label: { __type: 'String' },
    labels: { __type: 'PostTypeLabelDetails' },
    menuIcon: { __type: 'String' },
    menuPosition: { __type: 'Int' },
    name: { __type: 'String' },
    public: { __type: 'Boolean' },
    publiclyQueryable: { __type: 'Boolean' },
    restBase: { __type: 'String' },
    restControllerClass: { __type: 'String' },
    showInAdminBar: { __type: 'Boolean' },
    showInGraphql: { __type: 'Boolean' },
    showInMenu: { __type: 'Boolean' },
    showInNavMenus: { __type: 'Boolean' },
    showInRest: { __type: 'Boolean' },
    showUi: { __type: 'Boolean' },
    templates: { __type: '[String]' },
    uri: { __type: 'String' },
  },
  ContentTypeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[ContentTypeConnectionEdge!]!' },
    nodes: { __type: '[ContentType!]!' },
    pageInfo: { __type: 'ContentTypeConnectionPageInfo!' },
    $on: { __type: '$ContentTypeConnection!' },
  },
  ContentTypeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentType!' },
    $on: { __type: '$ContentTypeConnectionEdge!' },
  },
  ContentTypeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$ContentTypeConnectionPageInfo!' },
  },
  ContentTypeToContentNodeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[ContentTypeToContentNodeConnectionEdge!]!' },
    nodes: { __type: '[ContentNode!]!' },
    pageInfo: { __type: 'ContentTypeToContentNodeConnectionPageInfo!' },
  },
  ContentTypeToContentNodeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentNode!' },
  },
  ContentTypeToContentNodeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  ContentTypeToContentNodeConnectionWhereArgs: {
    contentTypes: { __type: '[ContentTypeEnum]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  ContentTypeToTaxonomyConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[ContentTypeToTaxonomyConnectionEdge!]!' },
    nodes: { __type: '[Taxonomy!]!' },
    pageInfo: { __type: 'ContentTypeToTaxonomyConnectionPageInfo!' },
  },
  ContentTypeToTaxonomyConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Taxonomy!' },
  },
  ContentTypeToTaxonomyConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  CreateCategoryInput: {
    aliasOf: { __type: 'String' },
    clientMutationId: { __type: 'String' },
    description: { __type: 'String' },
    name: { __type: 'String!' },
    parentId: { __type: 'ID' },
    slug: { __type: 'String' },
  },
  CreateCategoryPayload: {
    __typename: { __type: 'String!' },
    category: { __type: 'Category' },
    clientMutationId: { __type: 'String' },
  },
  CreateCommentInput: {
    approved: { __type: 'String' },
    author: { __type: 'String' },
    authorEmail: { __type: 'String' },
    authorUrl: { __type: 'String' },
    clientMutationId: { __type: 'String' },
    commentOn: { __type: 'Int' },
    content: { __type: 'String' },
    date: { __type: 'String' },
    parent: { __type: 'ID' },
    status: { __type: 'CommentStatusEnum' },
    type: { __type: 'String' },
  },
  CreateCommentPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    comment: { __type: 'Comment' },
    success: { __type: 'Boolean' },
  },
  CreateMediaItemInput: {
    altText: { __type: 'String' },
    authorId: { __type: 'ID' },
    caption: { __type: 'String' },
    clientMutationId: { __type: 'String' },
    commentStatus: { __type: 'String' },
    date: { __type: 'String' },
    dateGmt: { __type: 'String' },
    description: { __type: 'String' },
    filePath: { __type: 'String' },
    fileType: { __type: 'MimeTypeEnum' },
    parentId: { __type: 'ID' },
    pingStatus: { __type: 'String' },
    slug: { __type: 'String' },
    status: { __type: 'MediaItemStatusEnum' },
    title: { __type: 'String' },
  },
  CreateMediaItemPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    mediaItem: { __type: 'MediaItem' },
  },
  CreatePageInput: {
    authorId: { __type: 'ID' },
    clientMutationId: { __type: 'String' },
    commentStatus: { __type: 'String' },
    content: { __type: 'String' },
    date: { __type: 'String' },
    menuOrder: { __type: 'Int' },
    parentId: { __type: 'ID' },
    password: { __type: 'String' },
    slug: { __type: 'String' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  CreatePagePayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    page: { __type: 'Page' },
  },
  CreatePostFormatInput: {
    aliasOf: { __type: 'String' },
    clientMutationId: { __type: 'String' },
    description: { __type: 'String' },
    name: { __type: 'String!' },
    slug: { __type: 'String' },
  },
  CreatePostFormatPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    postFormat: { __type: 'PostFormat' },
  },
  CreatePostInput: {
    authorId: { __type: 'ID' },
    categories: { __type: 'PostCategoriesInput' },
    clientMutationId: { __type: 'String' },
    commentStatus: { __type: 'String' },
    content: { __type: 'String' },
    date: { __type: 'String' },
    excerpt: { __type: 'String' },
    menuOrder: { __type: 'Int' },
    password: { __type: 'String' },
    pingStatus: { __type: 'String' },
    pinged: { __type: '[String]' },
    postFormats: { __type: 'PostPostFormatsInput' },
    slug: { __type: 'String' },
    status: { __type: 'PostStatusEnum' },
    tags: { __type: 'PostTagsInput' },
    title: { __type: 'String' },
    toPing: { __type: '[String]' },
  },
  CreatePostPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    post: { __type: 'Post' },
  },
  CreateTagInput: {
    aliasOf: { __type: 'String' },
    clientMutationId: { __type: 'String' },
    description: { __type: 'String' },
    name: { __type: 'String!' },
    slug: { __type: 'String' },
  },
  CreateTagPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    tag: { __type: 'Tag' },
  },
  CreateUserInput: {
    aim: { __type: 'String' },
    clientMutationId: { __type: 'String' },
    description: { __type: 'String' },
    displayName: { __type: 'String' },
    email: { __type: 'String' },
    firstName: { __type: 'String' },
    jabber: { __type: 'String' },
    lastName: { __type: 'String' },
    locale: { __type: 'String' },
    nicename: { __type: 'String' },
    nickname: { __type: 'String' },
    password: { __type: 'String' },
    registered: { __type: 'String' },
    richEditing: { __type: 'String' },
    roles: { __type: '[String]' },
    username: { __type: 'String!' },
    websiteUrl: { __type: 'String' },
    yim: { __type: 'String' },
  },
  CreateUserPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    user: { __type: 'User' },
  },
  DatabaseIdentifier: {
    __typename: { __type: 'String!' },
    databaseId: { __type: 'Int!' },
    $on: { __type: '$DatabaseIdentifier!' },
  },
  DateInput: {
    day: { __type: 'Int' },
    month: { __type: 'Int' },
    year: { __type: 'Int' },
  },
  DateQueryInput: {
    after: { __type: 'DateInput' },
    before: { __type: 'DateInput' },
    column: { __type: 'PostObjectsConnectionDateColumnEnum' },
    compare: { __type: 'String' },
    day: { __type: 'Int' },
    hour: { __type: 'Int' },
    inclusive: { __type: 'Boolean' },
    minute: { __type: 'Int' },
    month: { __type: 'Int' },
    relation: { __type: 'RelationEnum' },
    second: { __type: 'Int' },
    week: { __type: 'Int' },
    year: { __type: 'Int' },
  },
  DefaultTemplate: {
    __typename: { __type: 'String!' },
    templateName: { __type: 'String' },
  },
  DeleteCategoryInput: {
    clientMutationId: { __type: 'String' },
    id: { __type: 'ID!' },
  },
  DeleteCategoryPayload: {
    __typename: { __type: 'String!' },
    category: { __type: 'Category' },
    clientMutationId: { __type: 'String' },
    deletedId: { __type: 'ID' },
  },
  DeleteCommentInput: {
    clientMutationId: { __type: 'String' },
    forceDelete: { __type: 'Boolean' },
    id: { __type: 'ID!' },
  },
  DeleteCommentPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    comment: { __type: 'Comment' },
    deletedId: { __type: 'ID' },
  },
  DeleteMediaItemInput: {
    clientMutationId: { __type: 'String' },
    forceDelete: { __type: 'Boolean' },
    id: { __type: 'ID!' },
  },
  DeleteMediaItemPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    deletedId: { __type: 'ID' },
    mediaItem: { __type: 'MediaItem' },
  },
  DeletePageInput: {
    clientMutationId: { __type: 'String' },
    forceDelete: { __type: 'Boolean' },
    id: { __type: 'ID!' },
    ignoreEditLock: { __type: 'Boolean' },
  },
  DeletePagePayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    deletedId: { __type: 'ID' },
    page: { __type: 'Page' },
  },
  DeletePostFormatInput: {
    clientMutationId: { __type: 'String' },
    id: { __type: 'ID!' },
  },
  DeletePostFormatPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    deletedId: { __type: 'ID' },
    postFormat: { __type: 'PostFormat' },
  },
  DeletePostInput: {
    clientMutationId: { __type: 'String' },
    forceDelete: { __type: 'Boolean' },
    id: { __type: 'ID!' },
    ignoreEditLock: { __type: 'Boolean' },
  },
  DeletePostPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    deletedId: { __type: 'ID' },
    post: { __type: 'Post' },
  },
  DeleteTagInput: {
    clientMutationId: { __type: 'String' },
    id: { __type: 'ID!' },
  },
  DeleteTagPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    deletedId: { __type: 'ID' },
    tag: { __type: 'Tag' },
  },
  DeleteUserInput: {
    clientMutationId: { __type: 'String' },
    id: { __type: 'ID!' },
    reassignId: { __type: 'ID' },
  },
  DeleteUserPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    deletedId: { __type: 'ID' },
    user: { __type: 'User' },
  },
  DiscussionSettings: {
    __typename: { __type: 'String!' },
    defaultCommentStatus: { __type: 'String' },
    defaultPingStatus: { __type: 'String' },
  },
  Edge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Node!' },
    $on: { __type: '$Edge!' },
  },
  EnqueuedAsset: {
    __typename: { __type: 'String!' },
    after: { __type: '[String]' },
    args: { __type: 'Boolean' },
    before: { __type: '[String]' },
    conditional: { __type: 'String' },
    dependencies: { __type: '[EnqueuedAsset]' },
    extra: { __type: 'String' },
    handle: { __type: 'String' },
    id: { __type: 'ID!' },
    src: { __type: 'String' },
    version: { __type: 'String' },
    $on: { __type: '$EnqueuedAsset!' },
  },
  EnqueuedScript: {
    __typename: { __type: 'String!' },
    after: { __type: '[String]' },
    args: { __type: 'Boolean' },
    before: { __type: '[String]' },
    conditional: { __type: 'String' },
    dependencies: { __type: '[EnqueuedScript]' },
    extra: { __type: 'String' },
    extraData: { __type: 'String' },
    handle: { __type: 'String' },
    id: { __type: 'ID!' },
    src: { __type: 'String' },
    strategy: { __type: 'ScriptLoadingStrategyEnum' },
    version: { __type: 'String' },
  },
  EnqueuedScriptConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[EnqueuedScriptConnectionEdge!]!' },
    nodes: { __type: '[EnqueuedScript!]!' },
    pageInfo: { __type: 'EnqueuedScriptConnectionPageInfo!' },
    $on: { __type: '$EnqueuedScriptConnection!' },
  },
  EnqueuedScriptConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'EnqueuedScript!' },
    $on: { __type: '$EnqueuedScriptConnectionEdge!' },
  },
  EnqueuedScriptConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$EnqueuedScriptConnectionPageInfo!' },
  },
  EnqueuedStylesheet: {
    __typename: { __type: 'String!' },
    after: { __type: '[String]' },
    args: { __type: 'Boolean' },
    before: { __type: '[String]' },
    conditional: { __type: 'String' },
    dependencies: { __type: '[EnqueuedStylesheet]' },
    extra: { __type: 'String' },
    handle: { __type: 'String' },
    id: { __type: 'ID!' },
    isRtl: { __type: 'Boolean' },
    media: { __type: 'String' },
    path: { __type: 'String' },
    rel: { __type: 'String' },
    src: { __type: 'String' },
    suffix: { __type: 'String' },
    title: { __type: 'String' },
    version: { __type: 'String' },
  },
  EnqueuedStylesheetConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[EnqueuedStylesheetConnectionEdge!]!' },
    nodes: { __type: '[EnqueuedStylesheet!]!' },
    pageInfo: { __type: 'EnqueuedStylesheetConnectionPageInfo!' },
    $on: { __type: '$EnqueuedStylesheetConnection!' },
  },
  EnqueuedStylesheetConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'EnqueuedStylesheet!' },
    $on: { __type: '$EnqueuedStylesheetConnectionEdge!' },
  },
  EnqueuedStylesheetConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$EnqueuedStylesheetConnectionPageInfo!' },
  },
  GeneralSettings: {
    __typename: { __type: 'String!' },
    dateFormat: { __type: 'String' },
    description: { __type: 'String' },
    email: { __type: 'String' },
    language: { __type: 'String' },
    startOfWeek: { __type: 'Int' },
    timeFormat: { __type: 'String' },
    timezone: { __type: 'String' },
    title: { __type: 'String' },
    url: { __type: 'String' },
  },
  GenerateAuthorizationCodeInput: {
    clientMutationId: { __type: 'String' },
    email: { __type: 'String' },
    password: { __type: 'String' },
    username: { __type: 'String' },
  },
  GenerateAuthorizationCodePayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    code: { __type: 'String' },
    error: { __type: 'String' },
  },
  HierarchicalContentNode: {
    __typename: { __type: 'String!' },
    ancestors: {
      __type: 'HierarchicalContentNodeToContentNodeAncestorsConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where:
          'HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs',
      },
    },
    children: {
      __type: 'HierarchicalContentNodeToContentNodeChildrenConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where:
          'HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs',
      },
    },
    conditionalTags: { __type: 'ConditionalTags' },
    contentType: { __type: 'ContentNodeToContentTypeConnectionEdge' },
    contentTypeName: { __type: 'String!' },
    databaseId: { __type: 'Int!' },
    date: { __type: 'String' },
    dateGmt: { __type: 'String' },
    desiredSlug: { __type: 'String' },
    editingLockedBy: { __type: 'ContentNodeToEditLockConnectionEdge' },
    enclosure: { __type: 'String' },
    enqueuedScripts: {
      __type: 'ContentNodeToEnqueuedScriptConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    enqueuedStylesheets: {
      __type: 'ContentNodeToEnqueuedStylesheetConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    guid: { __type: 'String' },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isPreview: { __type: 'Boolean' },
    isRestricted: { __type: 'Boolean' },
    isTermNode: { __type: 'Boolean!' },
    lastEditedBy: { __type: 'ContentNodeToEditLastConnectionEdge' },
    link: { __type: 'String' },
    modified: { __type: 'String' },
    modifiedGmt: { __type: 'String' },
    parent: {
      __type: 'HierarchicalContentNodeToParentContentNodeConnectionEdge',
    },
    parentDatabaseId: { __type: 'Int' },
    parentId: { __type: 'ID' },
    previewRevisionDatabaseId: { __type: 'Int' },
    previewRevisionId: { __type: 'ID' },
    slug: { __type: 'String' },
    status: { __type: 'String' },
    template: { __type: 'ContentTemplate' },
    templates: { __type: '[String]' },
    uri: { __type: 'String' },
    $on: { __type: '$HierarchicalContentNode!' },
  },
  HierarchicalContentNodeToContentNodeAncestorsConnection: {
    __typename: { __type: 'String!' },
    edges: {
      __type: '[HierarchicalContentNodeToContentNodeAncestorsConnectionEdge!]!',
    },
    nodes: { __type: '[ContentNode!]!' },
    pageInfo: {
      __type:
        'HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo!',
    },
  },
  HierarchicalContentNodeToContentNodeAncestorsConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentNode!' },
  },
  HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs: {
    contentTypes: { __type: '[ContentTypeEnum]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  HierarchicalContentNodeToContentNodeChildrenConnection: {
    __typename: { __type: 'String!' },
    edges: {
      __type: '[HierarchicalContentNodeToContentNodeChildrenConnectionEdge!]!',
    },
    nodes: { __type: '[ContentNode!]!' },
    pageInfo: {
      __type: 'HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo!',
    },
  },
  HierarchicalContentNodeToContentNodeChildrenConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentNode!' },
  },
  HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs: {
    contentTypes: { __type: '[ContentTypeEnum]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  HierarchicalContentNodeToParentContentNodeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentNode!' },
  },
  HierarchicalNode: {
    __typename: { __type: 'String!' },
    databaseId: { __type: 'Int!' },
    id: { __type: 'ID!' },
    parentDatabaseId: { __type: 'Int' },
    parentId: { __type: 'ID' },
    $on: { __type: '$HierarchicalNode!' },
  },
  HierarchicalTermNode: {
    __typename: { __type: 'String!' },
    conditionalTags: { __type: 'ConditionalTags' },
    count: { __type: 'Int' },
    databaseId: { __type: 'Int!' },
    description: { __type: 'String' },
    enqueuedScripts: {
      __type: 'TermNodeToEnqueuedScriptConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    enqueuedStylesheets: {
      __type: 'TermNodeToEnqueuedStylesheetConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isRestricted: { __type: 'Boolean' },
    isTermNode: { __type: 'Boolean!' },
    link: { __type: 'String' },
    name: { __type: 'String' },
    parentDatabaseId: { __type: 'Int' },
    parentId: { __type: 'ID' },
    slug: { __type: 'String' },
    taxonomyName: { __type: 'String' },
    templates: { __type: '[String]' },
    termGroupId: { __type: 'Int' },
    termTaxonomyId: { __type: 'Int' },
    uri: { __type: 'String' },
    $on: { __type: '$HierarchicalTermNode!' },
  },
  MediaDetails: {
    __typename: { __type: 'String!' },
    file: { __type: 'String' },
    height: { __type: 'Int' },
    meta: { __type: 'MediaItemMeta' },
    sizes: {
      __type: '[MediaSize]',
      __args: {
        exclude: '[MediaItemSizeEnum]',
        include: '[MediaItemSizeEnum]',
      },
    },
    width: { __type: 'Int' },
  },
  MediaItem: {
    __typename: { __type: 'String!' },
    altText: { __type: 'String' },
    ancestors: {
      __type: 'HierarchicalContentNodeToContentNodeAncestorsConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where:
          'HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs',
      },
    },
    author: { __type: 'NodeWithAuthorToUserConnectionEdge' },
    authorDatabaseId: { __type: 'Int' },
    authorId: { __type: 'ID' },
    caption: {
      __type: 'String',
      __args: { format: 'PostObjectFieldFormatEnum' },
    },
    children: {
      __type: 'HierarchicalContentNodeToContentNodeChildrenConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where:
          'HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs',
      },
    },
    commentCount: { __type: 'Int' },
    commentStatus: { __type: 'String' },
    comments: {
      __type: 'MediaItemToCommentConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'MediaItemToCommentConnectionWhereArgs',
      },
    },
    conditionalTags: { __type: 'ConditionalTags' },
    contentType: { __type: 'ContentNodeToContentTypeConnectionEdge' },
    contentTypeName: { __type: 'String!' },
    databaseId: { __type: 'Int!' },
    date: { __type: 'String' },
    dateGmt: { __type: 'String' },
    description: {
      __type: 'String',
      __args: { format: 'PostObjectFieldFormatEnum' },
    },
    desiredSlug: { __type: 'String' },
    editingLockedBy: { __type: 'ContentNodeToEditLockConnectionEdge' },
    enclosure: { __type: 'String' },
    enqueuedScripts: {
      __type: 'ContentNodeToEnqueuedScriptConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    enqueuedStylesheets: {
      __type: 'ContentNodeToEnqueuedStylesheetConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    fileSize: { __type: 'Int', __args: { size: 'MediaItemSizeEnum' } },
    guid: { __type: 'String' },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isPreview: { __type: 'Boolean' },
    isRestricted: { __type: 'Boolean' },
    isTermNode: { __type: 'Boolean!' },
    lastEditedBy: { __type: 'ContentNodeToEditLastConnectionEdge' },
    link: { __type: 'String' },
    mediaDetails: { __type: 'MediaDetails' },
    mediaItemId: { __type: 'Int!' },
    mediaItemUrl: { __type: 'String' },
    mediaType: { __type: 'String' },
    mimeType: { __type: 'String' },
    modified: { __type: 'String' },
    modifiedGmt: { __type: 'String' },
    parent: {
      __type: 'HierarchicalContentNodeToParentContentNodeConnectionEdge',
    },
    parentDatabaseId: { __type: 'Int' },
    parentId: { __type: 'ID' },
    previewRevisionDatabaseId: { __type: 'Int' },
    previewRevisionId: { __type: 'ID' },
    sizes: { __type: 'String', __args: { size: 'MediaItemSizeEnum' } },
    slug: { __type: 'String' },
    sourceUrl: { __type: 'String', __args: { size: 'MediaItemSizeEnum' } },
    srcSet: { __type: 'String', __args: { size: 'MediaItemSizeEnum' } },
    status: { __type: 'String' },
    template: { __type: 'ContentTemplate' },
    templates: { __type: '[String]' },
    title: {
      __type: 'String',
      __args: { format: 'PostObjectFieldFormatEnum' },
    },
    uri: { __type: 'String' },
  },
  MediaItemConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[MediaItemConnectionEdge!]!' },
    nodes: { __type: '[MediaItem!]!' },
    pageInfo: { __type: 'MediaItemConnectionPageInfo!' },
    $on: { __type: '$MediaItemConnection!' },
  },
  MediaItemConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'MediaItem!' },
    $on: { __type: '$MediaItemConnectionEdge!' },
  },
  MediaItemConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$MediaItemConnectionPageInfo!' },
  },
  MediaItemMeta: {
    __typename: { __type: 'String!' },
    aperture: { __type: 'Float' },
    camera: { __type: 'String' },
    caption: { __type: 'String' },
    copyright: { __type: 'String' },
    createdTimestamp: { __type: 'Int' },
    credit: { __type: 'String' },
    focalLength: { __type: 'Float' },
    iso: { __type: 'Int' },
    keywords: { __type: '[String]' },
    orientation: { __type: 'String' },
    shutterSpeed: { __type: 'Float' },
    title: { __type: 'String' },
  },
  MediaItemToCommentConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[MediaItemToCommentConnectionEdge!]!' },
    nodes: { __type: '[Comment!]!' },
    pageInfo: { __type: 'MediaItemToCommentConnectionPageInfo!' },
  },
  MediaItemToCommentConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Comment!' },
  },
  MediaItemToCommentConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  MediaItemToCommentConnectionWhereArgs: {
    authorEmail: { __type: 'String' },
    authorIn: { __type: '[ID]' },
    authorNotIn: { __type: '[ID]' },
    authorUrl: { __type: 'String' },
    commentIn: { __type: '[ID]' },
    commentNotIn: { __type: '[ID]' },
    commentType: { __type: 'String' },
    commentTypeIn: { __type: '[String]' },
    commentTypeNotIn: { __type: 'String' },
    contentAuthor: { __type: '[ID]' },
    contentAuthorIn: { __type: '[ID]' },
    contentAuthorNotIn: { __type: '[ID]' },
    contentId: { __type: 'ID' },
    contentIdIn: { __type: '[ID]' },
    contentIdNotIn: { __type: '[ID]' },
    contentName: { __type: 'String' },
    contentParent: { __type: 'Int' },
    contentStatus: { __type: '[PostStatusEnum]' },
    contentType: { __type: '[ContentTypeEnum]' },
    includeUnapproved: { __type: '[ID]' },
    karma: { __type: 'Int' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'CommentsConnectionOrderbyEnum' },
    parent: { __type: 'Int' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    search: { __type: 'String' },
    status: { __type: 'String' },
    userId: { __type: 'ID' },
  },
  MediaSize: {
    __typename: { __type: 'String!' },
    file: { __type: 'String' },
    fileSize: { __type: 'Int' },
    height: { __type: 'String' },
    mimeType: { __type: 'String' },
    name: { __type: 'String' },
    sourceUrl: { __type: 'String' },
    width: { __type: 'String' },
  },
  Menu: {
    __typename: { __type: 'String!' },
    count: { __type: 'Int' },
    databaseId: { __type: 'Int!' },
    id: { __type: 'ID!' },
    isRestricted: { __type: 'Boolean' },
    locations: { __type: '[MenuLocationEnum]' },
    menuId: { __type: 'Int' },
    menuItems: {
      __type: 'MenuToMenuItemConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'MenuToMenuItemConnectionWhereArgs',
      },
    },
    name: { __type: 'String' },
    slug: { __type: 'String' },
  },
  MenuConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[MenuConnectionEdge!]!' },
    nodes: { __type: '[Menu!]!' },
    pageInfo: { __type: 'MenuConnectionPageInfo!' },
    $on: { __type: '$MenuConnection!' },
  },
  MenuConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Menu!' },
    $on: { __type: '$MenuConnectionEdge!' },
  },
  MenuConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$MenuConnectionPageInfo!' },
  },
  MenuItem: {
    __typename: { __type: 'String!' },
    childItems: {
      __type: 'MenuItemToMenuItemConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'MenuItemToMenuItemConnectionWhereArgs',
      },
    },
    connectedNode: { __type: 'MenuItemToMenuItemLinkableConnectionEdge' },
    connectedObject: { __type: 'MenuItemObjectUnion' },
    cssClasses: { __type: '[String]' },
    databaseId: { __type: 'Int!' },
    description: { __type: 'String' },
    id: { __type: 'ID!' },
    isRestricted: { __type: 'Boolean' },
    label: { __type: 'String' },
    linkRelationship: { __type: 'String' },
    locations: { __type: '[MenuLocationEnum]' },
    menu: { __type: 'MenuItemToMenuConnectionEdge' },
    menuItemId: { __type: 'Int' },
    order: { __type: 'Int' },
    parentDatabaseId: { __type: 'Int' },
    parentId: { __type: 'ID' },
    path: { __type: 'String' },
    target: { __type: 'String' },
    title: { __type: 'String' },
    uri: { __type: 'String' },
    url: { __type: 'String' },
  },
  MenuItemConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[MenuItemConnectionEdge!]!' },
    nodes: { __type: '[MenuItem!]!' },
    pageInfo: { __type: 'MenuItemConnectionPageInfo!' },
    $on: { __type: '$MenuItemConnection!' },
  },
  MenuItemConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'MenuItem!' },
    $on: { __type: '$MenuItemConnectionEdge!' },
  },
  MenuItemConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$MenuItemConnectionPageInfo!' },
  },
  MenuItemLinkable: {
    __typename: { __type: 'String!' },
    conditionalTags: { __type: 'ConditionalTags' },
    databaseId: { __type: 'Int!' },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isTermNode: { __type: 'Boolean!' },
    templates: { __type: '[String]' },
    uri: { __type: 'String' },
    $on: { __type: '$MenuItemLinkable!' },
  },
  MenuItemLinkableConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'MenuItemLinkable!' },
    $on: { __type: '$MenuItemLinkableConnectionEdge!' },
  },
  MenuItemObjectUnion: {
    __typename: { __type: 'String!' },
    $on: { __type: '$MenuItemObjectUnion!' },
  },
  MenuItemToMenuConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Menu!' },
  },
  MenuItemToMenuItemConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[MenuItemToMenuItemConnectionEdge!]!' },
    nodes: { __type: '[MenuItem!]!' },
    pageInfo: { __type: 'MenuItemToMenuItemConnectionPageInfo!' },
  },
  MenuItemToMenuItemConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'MenuItem!' },
  },
  MenuItemToMenuItemConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  MenuItemToMenuItemConnectionWhereArgs: {
    id: { __type: 'Int' },
    location: { __type: 'MenuLocationEnum' },
    parentDatabaseId: { __type: 'Int' },
    parentId: { __type: 'ID' },
  },
  MenuItemToMenuItemLinkableConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'MenuItemLinkable!' },
  },
  MenuToMenuItemConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[MenuToMenuItemConnectionEdge!]!' },
    nodes: { __type: '[MenuItem!]!' },
    pageInfo: { __type: 'MenuToMenuItemConnectionPageInfo!' },
  },
  MenuToMenuItemConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'MenuItem!' },
  },
  MenuToMenuItemConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  MenuToMenuItemConnectionWhereArgs: {
    id: { __type: 'Int' },
    location: { __type: 'MenuLocationEnum' },
    parentDatabaseId: { __type: 'Int' },
    parentId: { __type: 'ID' },
  },
  Node: {
    __typename: { __type: 'String!' },
    id: { __type: 'ID!' },
    $on: { __type: '$Node!' },
  },
  NodeWithAuthor: {
    __typename: { __type: 'String!' },
    author: { __type: 'NodeWithAuthorToUserConnectionEdge' },
    authorDatabaseId: { __type: 'Int' },
    authorId: { __type: 'ID' },
    id: { __type: 'ID!' },
    $on: { __type: '$NodeWithAuthor!' },
  },
  NodeWithAuthorToUserConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'User!' },
  },
  NodeWithComments: {
    __typename: { __type: 'String!' },
    commentCount: { __type: 'Int' },
    commentStatus: { __type: 'String' },
    id: { __type: 'ID!' },
    $on: { __type: '$NodeWithComments!' },
  },
  NodeWithContentEditor: {
    __typename: { __type: 'String!' },
    content: {
      __type: 'String',
      __args: { format: 'PostObjectFieldFormatEnum' },
    },
    id: { __type: 'ID!' },
    $on: { __type: '$NodeWithContentEditor!' },
  },
  NodeWithExcerpt: {
    __typename: { __type: 'String!' },
    excerpt: {
      __type: 'String',
      __args: { format: 'PostObjectFieldFormatEnum' },
    },
    id: { __type: 'ID!' },
    $on: { __type: '$NodeWithExcerpt!' },
  },
  NodeWithFeaturedImage: {
    __typename: { __type: 'String!' },
    featuredImage: { __type: 'NodeWithFeaturedImageToMediaItemConnectionEdge' },
    featuredImageDatabaseId: { __type: 'Int' },
    featuredImageId: { __type: 'ID' },
    id: { __type: 'ID!' },
    $on: { __type: '$NodeWithFeaturedImage!' },
  },
  NodeWithFeaturedImageToMediaItemConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'MediaItem!' },
  },
  NodeWithPageAttributes: {
    __typename: { __type: 'String!' },
    id: { __type: 'ID!' },
    menuOrder: { __type: 'Int' },
    $on: { __type: '$NodeWithPageAttributes!' },
  },
  NodeWithRevisions: {
    __typename: { __type: 'String!' },
    id: { __type: 'ID!' },
    isRevision: { __type: 'Boolean' },
    revisionOf: { __type: 'NodeWithRevisionsToContentNodeConnectionEdge' },
    $on: { __type: '$NodeWithRevisions!' },
  },
  NodeWithRevisionsToContentNodeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentNode!' },
  },
  NodeWithTemplate: {
    __typename: { __type: 'String!' },
    id: { __type: 'ID!' },
    template: { __type: 'ContentTemplate' },
    $on: { __type: '$NodeWithTemplate!' },
  },
  NodeWithTitle: {
    __typename: { __type: 'String!' },
    id: { __type: 'ID!' },
    title: {
      __type: 'String',
      __args: { format: 'PostObjectFieldFormatEnum' },
    },
    $on: { __type: '$NodeWithTitle!' },
  },
  NodeWithTrackbacks: {
    __typename: { __type: 'String!' },
    id: { __type: 'ID!' },
    pingStatus: { __type: 'String' },
    pinged: { __type: '[String]' },
    toPing: { __type: '[String]' },
    $on: { __type: '$NodeWithTrackbacks!' },
  },
  OneToOneConnection: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Node!' },
    $on: { __type: '$OneToOneConnection!' },
  },
  Page: {
    __typename: { __type: 'String!' },
    ancestors: {
      __type: 'HierarchicalContentNodeToContentNodeAncestorsConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where:
          'HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs',
      },
    },
    author: { __type: 'NodeWithAuthorToUserConnectionEdge' },
    authorDatabaseId: { __type: 'Int' },
    authorId: { __type: 'ID' },
    children: {
      __type: 'HierarchicalContentNodeToContentNodeChildrenConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where:
          'HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs',
      },
    },
    commentCount: { __type: 'Int' },
    commentStatus: { __type: 'String' },
    comments: {
      __type: 'PageToCommentConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'PageToCommentConnectionWhereArgs',
      },
    },
    conditionalTags: { __type: 'ConditionalTags' },
    content: {
      __type: 'String',
      __args: { format: 'PostObjectFieldFormatEnum' },
    },
    contentType: { __type: 'ContentNodeToContentTypeConnectionEdge' },
    contentTypeName: { __type: 'String!' },
    databaseId: { __type: 'Int!' },
    date: { __type: 'String' },
    dateGmt: { __type: 'String' },
    desiredSlug: { __type: 'String' },
    editingLockedBy: { __type: 'ContentNodeToEditLockConnectionEdge' },
    enclosure: { __type: 'String' },
    enqueuedScripts: {
      __type: 'ContentNodeToEnqueuedScriptConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    enqueuedStylesheets: {
      __type: 'ContentNodeToEnqueuedStylesheetConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    featuredImage: { __type: 'NodeWithFeaturedImageToMediaItemConnectionEdge' },
    featuredImageDatabaseId: { __type: 'Int' },
    featuredImageId: { __type: 'ID' },
    guid: { __type: 'String' },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isFrontPage: { __type: 'Boolean!' },
    isPostsPage: { __type: 'Boolean!' },
    isPreview: { __type: 'Boolean' },
    isPrivacyPage: { __type: 'Boolean!' },
    isRestricted: { __type: 'Boolean' },
    isRevision: { __type: 'Boolean' },
    isTermNode: { __type: 'Boolean!' },
    lastEditedBy: { __type: 'ContentNodeToEditLastConnectionEdge' },
    link: { __type: 'String' },
    menuOrder: { __type: 'Int' },
    modified: { __type: 'String' },
    modifiedGmt: { __type: 'String' },
    pageId: { __type: 'Int!' },
    parent: {
      __type: 'HierarchicalContentNodeToParentContentNodeConnectionEdge',
    },
    parentDatabaseId: { __type: 'Int' },
    parentId: { __type: 'ID' },
    preview: { __type: 'PageToPreviewConnectionEdge' },
    previewRevisionDatabaseId: { __type: 'Int' },
    previewRevisionId: { __type: 'ID' },
    revisionOf: { __type: 'NodeWithRevisionsToContentNodeConnectionEdge' },
    revisions: {
      __type: 'PageToRevisionConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'PageToRevisionConnectionWhereArgs',
      },
    },
    slug: { __type: 'String' },
    status: { __type: 'String' },
    template: { __type: 'ContentTemplate' },
    templates: { __type: '[String]' },
    title: {
      __type: 'String',
      __args: { format: 'PostObjectFieldFormatEnum' },
    },
    uri: { __type: 'String' },
  },
  PageConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PageConnectionEdge!]!' },
    nodes: { __type: '[Page!]!' },
    pageInfo: { __type: 'PageConnectionPageInfo!' },
    $on: { __type: '$PageConnection!' },
  },
  PageConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Page!' },
    $on: { __type: '$PageConnectionEdge!' },
  },
  PageConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$PageConnectionPageInfo!' },
  },
  PageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$PageInfo!' },
  },
  PageToCommentConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PageToCommentConnectionEdge!]!' },
    nodes: { __type: '[Comment!]!' },
    pageInfo: { __type: 'PageToCommentConnectionPageInfo!' },
  },
  PageToCommentConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Comment!' },
  },
  PageToCommentConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  PageToCommentConnectionWhereArgs: {
    authorEmail: { __type: 'String' },
    authorIn: { __type: '[ID]' },
    authorNotIn: { __type: '[ID]' },
    authorUrl: { __type: 'String' },
    commentIn: { __type: '[ID]' },
    commentNotIn: { __type: '[ID]' },
    commentType: { __type: 'String' },
    commentTypeIn: { __type: '[String]' },
    commentTypeNotIn: { __type: 'String' },
    contentAuthor: { __type: '[ID]' },
    contentAuthorIn: { __type: '[ID]' },
    contentAuthorNotIn: { __type: '[ID]' },
    contentId: { __type: 'ID' },
    contentIdIn: { __type: '[ID]' },
    contentIdNotIn: { __type: '[ID]' },
    contentName: { __type: 'String' },
    contentParent: { __type: 'Int' },
    contentStatus: { __type: '[PostStatusEnum]' },
    contentType: { __type: '[ContentTypeEnum]' },
    includeUnapproved: { __type: '[ID]' },
    karma: { __type: 'Int' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'CommentsConnectionOrderbyEnum' },
    parent: { __type: 'Int' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    search: { __type: 'String' },
    status: { __type: 'String' },
    userId: { __type: 'ID' },
  },
  PageToPreviewConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Page!' },
  },
  PageToRevisionConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PageToRevisionConnectionEdge!]!' },
    nodes: { __type: '[Page!]!' },
    pageInfo: { __type: 'PageToRevisionConnectionPageInfo!' },
  },
  PageToRevisionConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Page!' },
  },
  PageToRevisionConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  PageToRevisionConnectionWhereArgs: {
    author: { __type: 'Int' },
    authorIn: { __type: '[ID]' },
    authorName: { __type: 'String' },
    authorNotIn: { __type: '[ID]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  Plugin: {
    __typename: { __type: 'String!' },
    author: { __type: 'String' },
    authorUri: { __type: 'String' },
    description: { __type: 'String' },
    id: { __type: 'ID!' },
    isRestricted: { __type: 'Boolean' },
    name: { __type: 'String' },
    path: { __type: 'String' },
    pluginUri: { __type: 'String' },
    version: { __type: 'String' },
  },
  PluginConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PluginConnectionEdge!]!' },
    nodes: { __type: '[Plugin!]!' },
    pageInfo: { __type: 'PluginConnectionPageInfo!' },
    $on: { __type: '$PluginConnection!' },
  },
  PluginConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Plugin!' },
    $on: { __type: '$PluginConnectionEdge!' },
  },
  PluginConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$PluginConnectionPageInfo!' },
  },
  Post: {
    __typename: { __type: 'String!' },
    author: { __type: 'NodeWithAuthorToUserConnectionEdge' },
    authorDatabaseId: { __type: 'Int' },
    authorId: { __type: 'ID' },
    categories: {
      __type: 'PostToCategoryConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'PostToCategoryConnectionWhereArgs',
      },
    },
    commentCount: { __type: 'Int' },
    commentStatus: { __type: 'String' },
    comments: {
      __type: 'PostToCommentConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'PostToCommentConnectionWhereArgs',
      },
    },
    conditionalTags: { __type: 'ConditionalTags' },
    content: {
      __type: 'String',
      __args: { format: 'PostObjectFieldFormatEnum' },
    },
    contentType: { __type: 'ContentNodeToContentTypeConnectionEdge' },
    contentTypeName: { __type: 'String!' },
    databaseId: { __type: 'Int!' },
    date: { __type: 'String' },
    dateGmt: { __type: 'String' },
    desiredSlug: { __type: 'String' },
    editingLockedBy: { __type: 'ContentNodeToEditLockConnectionEdge' },
    enclosure: { __type: 'String' },
    enqueuedScripts: {
      __type: 'ContentNodeToEnqueuedScriptConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    enqueuedStylesheets: {
      __type: 'ContentNodeToEnqueuedStylesheetConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    excerpt: {
      __type: 'String',
      __args: { format: 'PostObjectFieldFormatEnum' },
    },
    featuredImage: { __type: 'NodeWithFeaturedImageToMediaItemConnectionEdge' },
    featuredImageDatabaseId: { __type: 'Int' },
    featuredImageId: { __type: 'ID' },
    guid: { __type: 'String' },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isPreview: { __type: 'Boolean' },
    isRestricted: { __type: 'Boolean' },
    isRevision: { __type: 'Boolean' },
    isSticky: { __type: 'Boolean!' },
    isTermNode: { __type: 'Boolean!' },
    lastEditedBy: { __type: 'ContentNodeToEditLastConnectionEdge' },
    link: { __type: 'String' },
    modified: { __type: 'String' },
    modifiedGmt: { __type: 'String' },
    pingStatus: { __type: 'String' },
    pinged: { __type: '[String]' },
    postFormats: {
      __type: 'PostToPostFormatConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'PostToPostFormatConnectionWhereArgs',
      },
    },
    postId: { __type: 'Int!' },
    preview: { __type: 'PostToPreviewConnectionEdge' },
    previewRevisionDatabaseId: { __type: 'Int' },
    previewRevisionId: { __type: 'ID' },
    revisionOf: { __type: 'NodeWithRevisionsToContentNodeConnectionEdge' },
    revisions: {
      __type: 'PostToRevisionConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'PostToRevisionConnectionWhereArgs',
      },
    },
    slug: { __type: 'String' },
    status: { __type: 'String' },
    tags: {
      __type: 'PostToTagConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'PostToTagConnectionWhereArgs',
      },
    },
    template: { __type: 'ContentTemplate' },
    templates: { __type: '[String]' },
    terms: {
      __type: 'PostToTermNodeConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'PostToTermNodeConnectionWhereArgs',
      },
    },
    title: {
      __type: 'String',
      __args: { format: 'PostObjectFieldFormatEnum' },
    },
    toPing: { __type: '[String]' },
    uri: { __type: 'String' },
  },
  PostCategoriesInput: {
    append: { __type: 'Boolean' },
    nodes: { __type: '[PostCategoriesNodeInput]' },
  },
  PostCategoriesNodeInput: {
    description: { __type: 'String' },
    id: { __type: 'ID' },
    name: { __type: 'String' },
    slug: { __type: 'String' },
  },
  PostConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PostConnectionEdge!]!' },
    nodes: { __type: '[Post!]!' },
    pageInfo: { __type: 'PostConnectionPageInfo!' },
    $on: { __type: '$PostConnection!' },
  },
  PostConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Post!' },
    $on: { __type: '$PostConnectionEdge!' },
  },
  PostConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$PostConnectionPageInfo!' },
  },
  PostFormat: {
    __typename: { __type: 'String!' },
    conditionalTags: { __type: 'ConditionalTags' },
    contentNodes: {
      __type: 'PostFormatToContentNodeConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'PostFormatToContentNodeConnectionWhereArgs',
      },
    },
    count: { __type: 'Int' },
    databaseId: { __type: 'Int!' },
    description: { __type: 'String' },
    enqueuedScripts: {
      __type: 'TermNodeToEnqueuedScriptConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    enqueuedStylesheets: {
      __type: 'TermNodeToEnqueuedStylesheetConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isRestricted: { __type: 'Boolean' },
    isTermNode: { __type: 'Boolean!' },
    link: { __type: 'String' },
    name: { __type: 'String' },
    postFormatId: { __type: 'Int' },
    posts: {
      __type: 'PostFormatToPostConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'PostFormatToPostConnectionWhereArgs',
      },
    },
    slug: { __type: 'String' },
    taxonomy: { __type: 'PostFormatToTaxonomyConnectionEdge' },
    taxonomyName: { __type: 'String' },
    templates: { __type: '[String]' },
    termGroupId: { __type: 'Int' },
    termTaxonomyId: { __type: 'Int' },
    uri: { __type: 'String' },
  },
  PostFormatConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PostFormatConnectionEdge!]!' },
    nodes: { __type: '[PostFormat!]!' },
    pageInfo: { __type: 'PostFormatConnectionPageInfo!' },
    $on: { __type: '$PostFormatConnection!' },
  },
  PostFormatConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'PostFormat!' },
    $on: { __type: '$PostFormatConnectionEdge!' },
  },
  PostFormatConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$PostFormatConnectionPageInfo!' },
  },
  PostFormatToContentNodeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PostFormatToContentNodeConnectionEdge!]!' },
    nodes: { __type: '[ContentNode!]!' },
    pageInfo: { __type: 'PostFormatToContentNodeConnectionPageInfo!' },
  },
  PostFormatToContentNodeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentNode!' },
  },
  PostFormatToContentNodeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  PostFormatToContentNodeConnectionWhereArgs: {
    contentTypes: { __type: '[ContentTypesOfPostFormatEnum]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  PostFormatToPostConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PostFormatToPostConnectionEdge!]!' },
    nodes: { __type: '[Post!]!' },
    pageInfo: { __type: 'PostFormatToPostConnectionPageInfo!' },
  },
  PostFormatToPostConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Post!' },
  },
  PostFormatToPostConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  PostFormatToPostConnectionWhereArgs: {
    author: { __type: 'Int' },
    authorIn: { __type: '[ID]' },
    authorName: { __type: 'String' },
    authorNotIn: { __type: '[ID]' },
    categoryId: { __type: 'Int' },
    categoryIn: { __type: '[ID]' },
    categoryName: { __type: 'String' },
    categoryNotIn: { __type: '[ID]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    tag: { __type: 'String' },
    tagId: { __type: 'String' },
    tagIn: { __type: '[ID]' },
    tagNotIn: { __type: '[ID]' },
    tagSlugAnd: { __type: '[String]' },
    tagSlugIn: { __type: '[String]' },
    title: { __type: 'String' },
  },
  PostFormatToTaxonomyConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Taxonomy!' },
  },
  PostObjectsConnectionOrderbyInput: {
    field: { __type: 'PostObjectsConnectionOrderbyEnum!' },
    order: { __type: 'OrderEnum!' },
  },
  PostPostFormatsInput: {
    append: { __type: 'Boolean' },
    nodes: { __type: '[PostPostFormatsNodeInput]' },
  },
  PostPostFormatsNodeInput: {
    description: { __type: 'String' },
    id: { __type: 'ID' },
    name: { __type: 'String' },
    slug: { __type: 'String' },
  },
  PostTagsInput: {
    append: { __type: 'Boolean' },
    nodes: { __type: '[PostTagsNodeInput]' },
  },
  PostTagsNodeInput: {
    description: { __type: 'String' },
    id: { __type: 'ID' },
    name: { __type: 'String' },
    slug: { __type: 'String' },
  },
  PostToCategoryConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PostToCategoryConnectionEdge!]!' },
    nodes: { __type: '[Category!]!' },
    pageInfo: { __type: 'PostToCategoryConnectionPageInfo!' },
  },
  PostToCategoryConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Category!' },
  },
  PostToCategoryConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  PostToCategoryConnectionWhereArgs: {
    cacheDomain: { __type: 'String' },
    childOf: { __type: 'Int' },
    childless: { __type: 'Boolean' },
    descriptionLike: { __type: 'String' },
    exclude: { __type: '[ID]' },
    excludeTree: { __type: '[ID]' },
    hideEmpty: { __type: 'Boolean' },
    hierarchical: { __type: 'Boolean' },
    include: { __type: '[ID]' },
    name: { __type: '[String]' },
    nameLike: { __type: 'String' },
    objectIds: { __type: '[ID]' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'TermObjectsConnectionOrderbyEnum' },
    padCounts: { __type: 'Boolean' },
    parent: { __type: 'Int' },
    search: { __type: 'String' },
    slug: { __type: '[String]' },
    termTaxonomId: { __type: '[ID]' },
    termTaxonomyId: { __type: '[ID]' },
    updateTermMetaCache: { __type: 'Boolean' },
  },
  PostToCommentConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PostToCommentConnectionEdge!]!' },
    nodes: { __type: '[Comment!]!' },
    pageInfo: { __type: 'PostToCommentConnectionPageInfo!' },
  },
  PostToCommentConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Comment!' },
  },
  PostToCommentConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  PostToCommentConnectionWhereArgs: {
    authorEmail: { __type: 'String' },
    authorIn: { __type: '[ID]' },
    authorNotIn: { __type: '[ID]' },
    authorUrl: { __type: 'String' },
    commentIn: { __type: '[ID]' },
    commentNotIn: { __type: '[ID]' },
    commentType: { __type: 'String' },
    commentTypeIn: { __type: '[String]' },
    commentTypeNotIn: { __type: 'String' },
    contentAuthor: { __type: '[ID]' },
    contentAuthorIn: { __type: '[ID]' },
    contentAuthorNotIn: { __type: '[ID]' },
    contentId: { __type: 'ID' },
    contentIdIn: { __type: '[ID]' },
    contentIdNotIn: { __type: '[ID]' },
    contentName: { __type: 'String' },
    contentParent: { __type: 'Int' },
    contentStatus: { __type: '[PostStatusEnum]' },
    contentType: { __type: '[ContentTypeEnum]' },
    includeUnapproved: { __type: '[ID]' },
    karma: { __type: 'Int' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'CommentsConnectionOrderbyEnum' },
    parent: { __type: 'Int' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    search: { __type: 'String' },
    status: { __type: 'String' },
    userId: { __type: 'ID' },
  },
  PostToPostFormatConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PostToPostFormatConnectionEdge!]!' },
    nodes: { __type: '[PostFormat!]!' },
    pageInfo: { __type: 'PostToPostFormatConnectionPageInfo!' },
  },
  PostToPostFormatConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'PostFormat!' },
  },
  PostToPostFormatConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  PostToPostFormatConnectionWhereArgs: {
    cacheDomain: { __type: 'String' },
    childOf: { __type: 'Int' },
    childless: { __type: 'Boolean' },
    descriptionLike: { __type: 'String' },
    exclude: { __type: '[ID]' },
    excludeTree: { __type: '[ID]' },
    hideEmpty: { __type: 'Boolean' },
    hierarchical: { __type: 'Boolean' },
    include: { __type: '[ID]' },
    name: { __type: '[String]' },
    nameLike: { __type: 'String' },
    objectIds: { __type: '[ID]' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'TermObjectsConnectionOrderbyEnum' },
    padCounts: { __type: 'Boolean' },
    parent: { __type: 'Int' },
    search: { __type: 'String' },
    slug: { __type: '[String]' },
    termTaxonomId: { __type: '[ID]' },
    termTaxonomyId: { __type: '[ID]' },
    updateTermMetaCache: { __type: 'Boolean' },
  },
  PostToPreviewConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Post!' },
  },
  PostToRevisionConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PostToRevisionConnectionEdge!]!' },
    nodes: { __type: '[Post!]!' },
    pageInfo: { __type: 'PostToRevisionConnectionPageInfo!' },
  },
  PostToRevisionConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Post!' },
  },
  PostToRevisionConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  PostToRevisionConnectionWhereArgs: {
    author: { __type: 'Int' },
    authorIn: { __type: '[ID]' },
    authorName: { __type: 'String' },
    authorNotIn: { __type: '[ID]' },
    categoryId: { __type: 'Int' },
    categoryIn: { __type: '[ID]' },
    categoryName: { __type: 'String' },
    categoryNotIn: { __type: '[ID]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    tag: { __type: 'String' },
    tagId: { __type: 'String' },
    tagIn: { __type: '[ID]' },
    tagNotIn: { __type: '[ID]' },
    tagSlugAnd: { __type: '[String]' },
    tagSlugIn: { __type: '[String]' },
    title: { __type: 'String' },
  },
  PostToTagConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PostToTagConnectionEdge!]!' },
    nodes: { __type: '[Tag!]!' },
    pageInfo: { __type: 'PostToTagConnectionPageInfo!' },
  },
  PostToTagConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Tag!' },
  },
  PostToTagConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  PostToTagConnectionWhereArgs: {
    cacheDomain: { __type: 'String' },
    childOf: { __type: 'Int' },
    childless: { __type: 'Boolean' },
    descriptionLike: { __type: 'String' },
    exclude: { __type: '[ID]' },
    excludeTree: { __type: '[ID]' },
    hideEmpty: { __type: 'Boolean' },
    hierarchical: { __type: 'Boolean' },
    include: { __type: '[ID]' },
    name: { __type: '[String]' },
    nameLike: { __type: 'String' },
    objectIds: { __type: '[ID]' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'TermObjectsConnectionOrderbyEnum' },
    padCounts: { __type: 'Boolean' },
    parent: { __type: 'Int' },
    search: { __type: 'String' },
    slug: { __type: '[String]' },
    termTaxonomId: { __type: '[ID]' },
    termTaxonomyId: { __type: '[ID]' },
    updateTermMetaCache: { __type: 'Boolean' },
  },
  PostToTermNodeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[PostToTermNodeConnectionEdge!]!' },
    nodes: { __type: '[TermNode!]!' },
    pageInfo: { __type: 'PostToTermNodeConnectionPageInfo!' },
  },
  PostToTermNodeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'TermNode!' },
  },
  PostToTermNodeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  PostToTermNodeConnectionWhereArgs: {
    cacheDomain: { __type: 'String' },
    childOf: { __type: 'Int' },
    childless: { __type: 'Boolean' },
    descriptionLike: { __type: 'String' },
    exclude: { __type: '[ID]' },
    excludeTree: { __type: '[ID]' },
    hideEmpty: { __type: 'Boolean' },
    hierarchical: { __type: 'Boolean' },
    include: { __type: '[ID]' },
    name: { __type: '[String]' },
    nameLike: { __type: 'String' },
    objectIds: { __type: '[ID]' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'TermObjectsConnectionOrderbyEnum' },
    padCounts: { __type: 'Boolean' },
    parent: { __type: 'Int' },
    search: { __type: 'String' },
    slug: { __type: '[String]' },
    taxonomies: { __type: '[TaxonomyEnum]' },
    termTaxonomId: { __type: '[ID]' },
    termTaxonomyId: { __type: '[ID]' },
    updateTermMetaCache: { __type: 'Boolean' },
  },
  PostTypeLabelDetails: {
    __typename: { __type: 'String!' },
    addNew: { __type: 'String' },
    addNewItem: { __type: 'String' },
    allItems: { __type: 'String' },
    archives: { __type: 'String' },
    attributes: { __type: 'String' },
    editItem: { __type: 'String' },
    featuredImage: { __type: 'String' },
    filterItemsList: { __type: 'String' },
    insertIntoItem: { __type: 'String' },
    itemsList: { __type: 'String' },
    itemsListNavigation: { __type: 'String' },
    menuName: { __type: 'String' },
    name: { __type: 'String' },
    newItem: { __type: 'String' },
    notFound: { __type: 'String' },
    notFoundInTrash: { __type: 'String' },
    parentItemColon: { __type: 'String' },
    removeFeaturedImage: { __type: 'String' },
    searchItems: { __type: 'String' },
    setFeaturedImage: { __type: 'String' },
    singularName: { __type: 'String' },
    uploadedToThisItem: { __type: 'String' },
    useFeaturedImage: { __type: 'String' },
    viewItem: { __type: 'String' },
    viewItems: { __type: 'String' },
  },
  Previewable: {
    __typename: { __type: 'String!' },
    isPreview: { __type: 'Boolean' },
    previewRevisionDatabaseId: { __type: 'Int' },
    previewRevisionId: { __type: 'ID' },
    $on: { __type: '$Previewable!' },
  },
  ReadingSettings: {
    __typename: { __type: 'String!' },
    pageForPosts: { __type: 'Int' },
    pageOnFront: { __type: 'Int' },
    postsPerPage: { __type: 'Int' },
    showOnFront: { __type: 'String' },
  },
  RegisterUserInput: {
    aim: { __type: 'String' },
    clientMutationId: { __type: 'String' },
    description: { __type: 'String' },
    displayName: { __type: 'String' },
    email: { __type: 'String' },
    firstName: { __type: 'String' },
    jabber: { __type: 'String' },
    lastName: { __type: 'String' },
    locale: { __type: 'String' },
    nicename: { __type: 'String' },
    nickname: { __type: 'String' },
    password: { __type: 'String' },
    registered: { __type: 'String' },
    richEditing: { __type: 'String' },
    username: { __type: 'String!' },
    websiteUrl: { __type: 'String' },
    yim: { __type: 'String' },
  },
  RegisterUserPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    user: { __type: 'User' },
  },
  ResetUserPasswordInput: {
    clientMutationId: { __type: 'String' },
    key: { __type: 'String' },
    login: { __type: 'String' },
    password: { __type: 'String' },
  },
  ResetUserPasswordPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    user: { __type: 'User' },
  },
  RestoreCommentInput: {
    clientMutationId: { __type: 'String' },
    id: { __type: 'ID!' },
  },
  RestoreCommentPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    comment: { __type: 'Comment' },
    restoredId: { __type: 'ID' },
  },
  RootQueryToCategoryConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToCategoryConnectionEdge!]!' },
    nodes: { __type: '[Category!]!' },
    pageInfo: { __type: 'RootQueryToCategoryConnectionPageInfo!' },
  },
  RootQueryToCategoryConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Category!' },
  },
  RootQueryToCategoryConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToCategoryConnectionWhereArgs: {
    cacheDomain: { __type: 'String' },
    childOf: { __type: 'Int' },
    childless: { __type: 'Boolean' },
    descriptionLike: { __type: 'String' },
    exclude: { __type: '[ID]' },
    excludeTree: { __type: '[ID]' },
    hideEmpty: { __type: 'Boolean' },
    hierarchical: { __type: 'Boolean' },
    include: { __type: '[ID]' },
    name: { __type: '[String]' },
    nameLike: { __type: 'String' },
    objectIds: { __type: '[ID]' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'TermObjectsConnectionOrderbyEnum' },
    padCounts: { __type: 'Boolean' },
    parent: { __type: 'Int' },
    search: { __type: 'String' },
    slug: { __type: '[String]' },
    termTaxonomId: { __type: '[ID]' },
    termTaxonomyId: { __type: '[ID]' },
    updateTermMetaCache: { __type: 'Boolean' },
  },
  RootQueryToCommentConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToCommentConnectionEdge!]!' },
    nodes: { __type: '[Comment!]!' },
    pageInfo: { __type: 'RootQueryToCommentConnectionPageInfo!' },
  },
  RootQueryToCommentConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Comment!' },
  },
  RootQueryToCommentConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToCommentConnectionWhereArgs: {
    authorEmail: { __type: 'String' },
    authorIn: { __type: '[ID]' },
    authorNotIn: { __type: '[ID]' },
    authorUrl: { __type: 'String' },
    commentIn: { __type: '[ID]' },
    commentNotIn: { __type: '[ID]' },
    commentType: { __type: 'String' },
    commentTypeIn: { __type: '[String]' },
    commentTypeNotIn: { __type: 'String' },
    contentAuthor: { __type: '[ID]' },
    contentAuthorIn: { __type: '[ID]' },
    contentAuthorNotIn: { __type: '[ID]' },
    contentId: { __type: 'ID' },
    contentIdIn: { __type: '[ID]' },
    contentIdNotIn: { __type: '[ID]' },
    contentName: { __type: 'String' },
    contentParent: { __type: 'Int' },
    contentStatus: { __type: '[PostStatusEnum]' },
    contentType: { __type: '[ContentTypeEnum]' },
    includeUnapproved: { __type: '[ID]' },
    karma: { __type: 'Int' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'CommentsConnectionOrderbyEnum' },
    parent: { __type: 'Int' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    search: { __type: 'String' },
    status: { __type: 'String' },
    userId: { __type: 'ID' },
  },
  RootQueryToContentNodeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToContentNodeConnectionEdge!]!' },
    nodes: { __type: '[ContentNode!]!' },
    pageInfo: { __type: 'RootQueryToContentNodeConnectionPageInfo!' },
  },
  RootQueryToContentNodeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentNode!' },
  },
  RootQueryToContentNodeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToContentNodeConnectionWhereArgs: {
    contentTypes: { __type: '[ContentTypeEnum]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  RootQueryToContentTypeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToContentTypeConnectionEdge!]!' },
    nodes: { __type: '[ContentType!]!' },
    pageInfo: { __type: 'RootQueryToContentTypeConnectionPageInfo!' },
  },
  RootQueryToContentTypeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentType!' },
  },
  RootQueryToContentTypeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToEnqueuedScriptConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToEnqueuedScriptConnectionEdge!]!' },
    nodes: { __type: '[EnqueuedScript!]!' },
    pageInfo: { __type: 'RootQueryToEnqueuedScriptConnectionPageInfo!' },
  },
  RootQueryToEnqueuedScriptConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'EnqueuedScript!' },
  },
  RootQueryToEnqueuedScriptConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToEnqueuedStylesheetConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToEnqueuedStylesheetConnectionEdge!]!' },
    nodes: { __type: '[EnqueuedStylesheet!]!' },
    pageInfo: { __type: 'RootQueryToEnqueuedStylesheetConnectionPageInfo!' },
  },
  RootQueryToEnqueuedStylesheetConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'EnqueuedStylesheet!' },
  },
  RootQueryToEnqueuedStylesheetConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToMediaItemConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToMediaItemConnectionEdge!]!' },
    nodes: { __type: '[MediaItem!]!' },
    pageInfo: { __type: 'RootQueryToMediaItemConnectionPageInfo!' },
  },
  RootQueryToMediaItemConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'MediaItem!' },
  },
  RootQueryToMediaItemConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToMediaItemConnectionWhereArgs: {
    author: { __type: 'Int' },
    authorIn: { __type: '[ID]' },
    authorName: { __type: 'String' },
    authorNotIn: { __type: '[ID]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  RootQueryToMenuConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToMenuConnectionEdge!]!' },
    nodes: { __type: '[Menu!]!' },
    pageInfo: { __type: 'RootQueryToMenuConnectionPageInfo!' },
  },
  RootQueryToMenuConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Menu!' },
  },
  RootQueryToMenuConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToMenuConnectionWhereArgs: {
    id: { __type: 'Int' },
    location: { __type: 'MenuLocationEnum' },
    slug: { __type: 'String' },
  },
  RootQueryToMenuItemConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToMenuItemConnectionEdge!]!' },
    nodes: { __type: '[MenuItem!]!' },
    pageInfo: { __type: 'RootQueryToMenuItemConnectionPageInfo!' },
  },
  RootQueryToMenuItemConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'MenuItem!' },
  },
  RootQueryToMenuItemConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToMenuItemConnectionWhereArgs: {
    id: { __type: 'Int' },
    location: { __type: 'MenuLocationEnum' },
    parentDatabaseId: { __type: 'Int' },
    parentId: { __type: 'ID' },
  },
  RootQueryToPageConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToPageConnectionEdge!]!' },
    nodes: { __type: '[Page!]!' },
    pageInfo: { __type: 'RootQueryToPageConnectionPageInfo!' },
  },
  RootQueryToPageConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Page!' },
  },
  RootQueryToPageConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToPageConnectionWhereArgs: {
    author: { __type: 'Int' },
    authorIn: { __type: '[ID]' },
    authorName: { __type: 'String' },
    authorNotIn: { __type: '[ID]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  RootQueryToPluginConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToPluginConnectionEdge!]!' },
    nodes: { __type: '[Plugin!]!' },
    pageInfo: { __type: 'RootQueryToPluginConnectionPageInfo!' },
  },
  RootQueryToPluginConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Plugin!' },
  },
  RootQueryToPluginConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToPluginConnectionWhereArgs: {
    search: { __type: 'String' },
    stati: { __type: '[PluginStatusEnum]' },
    status: { __type: 'PluginStatusEnum' },
  },
  RootQueryToPostConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToPostConnectionEdge!]!' },
    nodes: { __type: '[Post!]!' },
    pageInfo: { __type: 'RootQueryToPostConnectionPageInfo!' },
  },
  RootQueryToPostConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Post!' },
  },
  RootQueryToPostConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToPostConnectionWhereArgs: {
    author: { __type: 'Int' },
    authorIn: { __type: '[ID]' },
    authorName: { __type: 'String' },
    authorNotIn: { __type: '[ID]' },
    categoryId: { __type: 'Int' },
    categoryIn: { __type: '[ID]' },
    categoryName: { __type: 'String' },
    categoryNotIn: { __type: '[ID]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    tag: { __type: 'String' },
    tagId: { __type: 'String' },
    tagIn: { __type: '[ID]' },
    tagNotIn: { __type: '[ID]' },
    tagSlugAnd: { __type: '[String]' },
    tagSlugIn: { __type: '[String]' },
    title: { __type: 'String' },
  },
  RootQueryToPostFormatConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToPostFormatConnectionEdge!]!' },
    nodes: { __type: '[PostFormat!]!' },
    pageInfo: { __type: 'RootQueryToPostFormatConnectionPageInfo!' },
  },
  RootQueryToPostFormatConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'PostFormat!' },
  },
  RootQueryToPostFormatConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToPostFormatConnectionWhereArgs: {
    cacheDomain: { __type: 'String' },
    childOf: { __type: 'Int' },
    childless: { __type: 'Boolean' },
    descriptionLike: { __type: 'String' },
    exclude: { __type: '[ID]' },
    excludeTree: { __type: '[ID]' },
    hideEmpty: { __type: 'Boolean' },
    hierarchical: { __type: 'Boolean' },
    include: { __type: '[ID]' },
    name: { __type: '[String]' },
    nameLike: { __type: 'String' },
    objectIds: { __type: '[ID]' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'TermObjectsConnectionOrderbyEnum' },
    padCounts: { __type: 'Boolean' },
    parent: { __type: 'Int' },
    search: { __type: 'String' },
    slug: { __type: '[String]' },
    termTaxonomId: { __type: '[ID]' },
    termTaxonomyId: { __type: '[ID]' },
    updateTermMetaCache: { __type: 'Boolean' },
  },
  RootQueryToRevisionsConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToRevisionsConnectionEdge!]!' },
    nodes: { __type: '[ContentNode!]!' },
    pageInfo: { __type: 'RootQueryToRevisionsConnectionPageInfo!' },
  },
  RootQueryToRevisionsConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentNode!' },
  },
  RootQueryToRevisionsConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToRevisionsConnectionWhereArgs: {
    contentTypes: { __type: '[ContentTypeEnum]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  RootQueryToTagConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToTagConnectionEdge!]!' },
    nodes: { __type: '[Tag!]!' },
    pageInfo: { __type: 'RootQueryToTagConnectionPageInfo!' },
  },
  RootQueryToTagConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Tag!' },
  },
  RootQueryToTagConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToTagConnectionWhereArgs: {
    cacheDomain: { __type: 'String' },
    childOf: { __type: 'Int' },
    childless: { __type: 'Boolean' },
    descriptionLike: { __type: 'String' },
    exclude: { __type: '[ID]' },
    excludeTree: { __type: '[ID]' },
    hideEmpty: { __type: 'Boolean' },
    hierarchical: { __type: 'Boolean' },
    include: { __type: '[ID]' },
    name: { __type: '[String]' },
    nameLike: { __type: 'String' },
    objectIds: { __type: '[ID]' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'TermObjectsConnectionOrderbyEnum' },
    padCounts: { __type: 'Boolean' },
    parent: { __type: 'Int' },
    search: { __type: 'String' },
    slug: { __type: '[String]' },
    termTaxonomId: { __type: '[ID]' },
    termTaxonomyId: { __type: '[ID]' },
    updateTermMetaCache: { __type: 'Boolean' },
  },
  RootQueryToTaxonomyConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToTaxonomyConnectionEdge!]!' },
    nodes: { __type: '[Taxonomy!]!' },
    pageInfo: { __type: 'RootQueryToTaxonomyConnectionPageInfo!' },
  },
  RootQueryToTaxonomyConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Taxonomy!' },
  },
  RootQueryToTaxonomyConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToTermNodeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToTermNodeConnectionEdge!]!' },
    nodes: { __type: '[TermNode!]!' },
    pageInfo: { __type: 'RootQueryToTermNodeConnectionPageInfo!' },
  },
  RootQueryToTermNodeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'TermNode!' },
  },
  RootQueryToTermNodeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToTermNodeConnectionWhereArgs: {
    cacheDomain: { __type: 'String' },
    childOf: { __type: 'Int' },
    childless: { __type: 'Boolean' },
    descriptionLike: { __type: 'String' },
    exclude: { __type: '[ID]' },
    excludeTree: { __type: '[ID]' },
    hideEmpty: { __type: 'Boolean' },
    hierarchical: { __type: 'Boolean' },
    include: { __type: '[ID]' },
    name: { __type: '[String]' },
    nameLike: { __type: 'String' },
    objectIds: { __type: '[ID]' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'TermObjectsConnectionOrderbyEnum' },
    padCounts: { __type: 'Boolean' },
    parent: { __type: 'Int' },
    search: { __type: 'String' },
    slug: { __type: '[String]' },
    taxonomies: { __type: '[TaxonomyEnum]' },
    termTaxonomId: { __type: '[ID]' },
    termTaxonomyId: { __type: '[ID]' },
    updateTermMetaCache: { __type: 'Boolean' },
  },
  RootQueryToThemeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToThemeConnectionEdge!]!' },
    nodes: { __type: '[Theme!]!' },
    pageInfo: { __type: 'RootQueryToThemeConnectionPageInfo!' },
  },
  RootQueryToThemeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Theme!' },
  },
  RootQueryToThemeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToUserConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToUserConnectionEdge!]!' },
    nodes: { __type: '[User!]!' },
    pageInfo: { __type: 'RootQueryToUserConnectionPageInfo!' },
  },
  RootQueryToUserConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'User!' },
  },
  RootQueryToUserConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  RootQueryToUserConnectionWhereArgs: {
    exclude: { __type: '[Int]' },
    hasPublishedPosts: { __type: '[ContentTypeEnum]' },
    include: { __type: '[Int]' },
    login: { __type: 'String' },
    loginIn: { __type: '[String]' },
    loginNotIn: { __type: '[String]' },
    nicename: { __type: 'String' },
    nicenameIn: { __type: '[String]' },
    nicenameNotIn: { __type: '[String]' },
    orderby: { __type: '[UsersConnectionOrderbyInput]' },
    role: { __type: 'UserRoleEnum' },
    roleIn: { __type: '[UserRoleEnum]' },
    roleNotIn: { __type: '[UserRoleEnum]' },
    search: { __type: 'String' },
    searchColumns: { __type: '[UsersConnectionSearchColumnEnum]' },
  },
  RootQueryToUserRoleConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[RootQueryToUserRoleConnectionEdge!]!' },
    nodes: { __type: '[UserRole!]!' },
    pageInfo: { __type: 'RootQueryToUserRoleConnectionPageInfo!' },
  },
  RootQueryToUserRoleConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'UserRole!' },
  },
  RootQueryToUserRoleConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  SendPasswordResetEmailInput: {
    clientMutationId: { __type: 'String' },
    username: { __type: 'String!' },
  },
  SendPasswordResetEmailPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    success: { __type: 'Boolean' },
    user: { __type: 'User' },
  },
  Settings: {
    __typename: { __type: 'String!' },
    discussionSettingsDefaultCommentStatus: { __type: 'String' },
    discussionSettingsDefaultPingStatus: { __type: 'String' },
    generalSettingsDateFormat: { __type: 'String' },
    generalSettingsDescription: { __type: 'String' },
    generalSettingsEmail: { __type: 'String' },
    generalSettingsLanguage: { __type: 'String' },
    generalSettingsStartOfWeek: { __type: 'Int' },
    generalSettingsTimeFormat: { __type: 'String' },
    generalSettingsTimezone: { __type: 'String' },
    generalSettingsTitle: { __type: 'String' },
    generalSettingsUrl: { __type: 'String' },
    readingSettingsPageForPosts: { __type: 'Int' },
    readingSettingsPageOnFront: { __type: 'Int' },
    readingSettingsPostsPerPage: { __type: 'Int' },
    readingSettingsShowOnFront: { __type: 'String' },
    writingSettingsDefaultCategory: { __type: 'Int' },
    writingSettingsDefaultPostFormat: { __type: 'String' },
    writingSettingsUseSmilies: { __type: 'Boolean' },
  },
  Tag: {
    __typename: { __type: 'String!' },
    conditionalTags: { __type: 'ConditionalTags' },
    contentNodes: {
      __type: 'TagToContentNodeConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'TagToContentNodeConnectionWhereArgs',
      },
    },
    count: { __type: 'Int' },
    databaseId: { __type: 'Int!' },
    description: { __type: 'String' },
    enqueuedScripts: {
      __type: 'TermNodeToEnqueuedScriptConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    enqueuedStylesheets: {
      __type: 'TermNodeToEnqueuedStylesheetConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isRestricted: { __type: 'Boolean' },
    isTermNode: { __type: 'Boolean!' },
    link: { __type: 'String' },
    name: { __type: 'String' },
    posts: {
      __type: 'TagToPostConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'TagToPostConnectionWhereArgs',
      },
    },
    slug: { __type: 'String' },
    tagId: { __type: 'Int' },
    taxonomy: { __type: 'TagToTaxonomyConnectionEdge' },
    taxonomyName: { __type: 'String' },
    templates: { __type: '[String]' },
    termGroupId: { __type: 'Int' },
    termTaxonomyId: { __type: 'Int' },
    uri: { __type: 'String' },
  },
  TagConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[TagConnectionEdge!]!' },
    nodes: { __type: '[Tag!]!' },
    pageInfo: { __type: 'TagConnectionPageInfo!' },
    $on: { __type: '$TagConnection!' },
  },
  TagConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Tag!' },
    $on: { __type: '$TagConnectionEdge!' },
  },
  TagConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$TagConnectionPageInfo!' },
  },
  TagToContentNodeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[TagToContentNodeConnectionEdge!]!' },
    nodes: { __type: '[ContentNode!]!' },
    pageInfo: { __type: 'TagToContentNodeConnectionPageInfo!' },
  },
  TagToContentNodeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentNode!' },
  },
  TagToContentNodeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  TagToContentNodeConnectionWhereArgs: {
    contentTypes: { __type: '[ContentTypesOfTagEnum]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  TagToPostConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[TagToPostConnectionEdge!]!' },
    nodes: { __type: '[Post!]!' },
    pageInfo: { __type: 'TagToPostConnectionPageInfo!' },
  },
  TagToPostConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Post!' },
  },
  TagToPostConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  TagToPostConnectionWhereArgs: {
    author: { __type: 'Int' },
    authorIn: { __type: '[ID]' },
    authorName: { __type: 'String' },
    authorNotIn: { __type: '[ID]' },
    categoryId: { __type: 'Int' },
    categoryIn: { __type: '[ID]' },
    categoryName: { __type: 'String' },
    categoryNotIn: { __type: '[ID]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    tag: { __type: 'String' },
    tagId: { __type: 'String' },
    tagIn: { __type: '[ID]' },
    tagNotIn: { __type: '[ID]' },
    tagSlugAnd: { __type: '[String]' },
    tagSlugIn: { __type: '[String]' },
    title: { __type: 'String' },
  },
  TagToTaxonomyConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Taxonomy!' },
  },
  Taxonomy: {
    __typename: { __type: 'String!' },
    connectedContentTypes: {
      __type: 'TaxonomyToContentTypeConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    connectedTerms: {
      __type: 'TaxonomyToTermNodeConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    description: { __type: 'String' },
    graphqlPluralName: { __type: 'String' },
    graphqlSingleName: { __type: 'String' },
    hierarchical: { __type: 'Boolean' },
    id: { __type: 'ID!' },
    isRestricted: { __type: 'Boolean' },
    label: { __type: 'String' },
    name: { __type: 'String' },
    public: { __type: 'Boolean' },
    restBase: { __type: 'String' },
    restControllerClass: { __type: 'String' },
    showCloud: { __type: 'Boolean' },
    showInAdminColumn: { __type: 'Boolean' },
    showInGraphql: { __type: 'Boolean' },
    showInMenu: { __type: 'Boolean' },
    showInNavMenus: { __type: 'Boolean' },
    showInQuickEdit: { __type: 'Boolean' },
    showInRest: { __type: 'Boolean' },
    showUi: { __type: 'Boolean' },
  },
  TaxonomyConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[TaxonomyConnectionEdge!]!' },
    nodes: { __type: '[Taxonomy!]!' },
    pageInfo: { __type: 'TaxonomyConnectionPageInfo!' },
    $on: { __type: '$TaxonomyConnection!' },
  },
  TaxonomyConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Taxonomy!' },
    $on: { __type: '$TaxonomyConnectionEdge!' },
  },
  TaxonomyConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$TaxonomyConnectionPageInfo!' },
  },
  TaxonomyToContentTypeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[TaxonomyToContentTypeConnectionEdge!]!' },
    nodes: { __type: '[ContentType!]!' },
    pageInfo: { __type: 'TaxonomyToContentTypeConnectionPageInfo!' },
  },
  TaxonomyToContentTypeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentType!' },
  },
  TaxonomyToContentTypeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  TaxonomyToTermNodeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[TaxonomyToTermNodeConnectionEdge!]!' },
    nodes: { __type: '[TermNode!]!' },
    pageInfo: { __type: 'TaxonomyToTermNodeConnectionPageInfo!' },
  },
  TaxonomyToTermNodeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'TermNode!' },
  },
  TaxonomyToTermNodeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  TermNode: {
    __typename: { __type: 'String!' },
    conditionalTags: { __type: 'ConditionalTags' },
    count: { __type: 'Int' },
    databaseId: { __type: 'Int!' },
    description: { __type: 'String' },
    enqueuedScripts: {
      __type: 'TermNodeToEnqueuedScriptConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    enqueuedStylesheets: {
      __type: 'TermNodeToEnqueuedStylesheetConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isRestricted: { __type: 'Boolean' },
    isTermNode: { __type: 'Boolean!' },
    link: { __type: 'String' },
    name: { __type: 'String' },
    slug: { __type: 'String' },
    taxonomyName: { __type: 'String' },
    templates: { __type: '[String]' },
    termGroupId: { __type: 'Int' },
    termTaxonomyId: { __type: 'Int' },
    uri: { __type: 'String' },
    $on: { __type: '$TermNode!' },
  },
  TermNodeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[TermNodeConnectionEdge!]!' },
    nodes: { __type: '[TermNode!]!' },
    pageInfo: { __type: 'TermNodeConnectionPageInfo!' },
    $on: { __type: '$TermNodeConnection!' },
  },
  TermNodeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'TermNode!' },
    $on: { __type: '$TermNodeConnectionEdge!' },
  },
  TermNodeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$TermNodeConnectionPageInfo!' },
  },
  TermNodeToEnqueuedScriptConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[TermNodeToEnqueuedScriptConnectionEdge!]!' },
    nodes: { __type: '[EnqueuedScript!]!' },
    pageInfo: { __type: 'TermNodeToEnqueuedScriptConnectionPageInfo!' },
  },
  TermNodeToEnqueuedScriptConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'EnqueuedScript!' },
  },
  TermNodeToEnqueuedScriptConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  TermNodeToEnqueuedStylesheetConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[TermNodeToEnqueuedStylesheetConnectionEdge!]!' },
    nodes: { __type: '[EnqueuedStylesheet!]!' },
    pageInfo: { __type: 'TermNodeToEnqueuedStylesheetConnectionPageInfo!' },
  },
  TermNodeToEnqueuedStylesheetConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'EnqueuedStylesheet!' },
  },
  TermNodeToEnqueuedStylesheetConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  Theme: {
    __typename: { __type: 'String!' },
    author: { __type: 'String' },
    authorUri: { __type: 'String' },
    description: { __type: 'String' },
    id: { __type: 'ID!' },
    isRestricted: { __type: 'Boolean' },
    name: { __type: 'String' },
    screenshot: { __type: 'String' },
    slug: { __type: 'String' },
    tags: { __type: '[String]' },
    themeUri: { __type: 'String' },
    version: { __type: 'String' },
  },
  ThemeConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[ThemeConnectionEdge!]!' },
    nodes: { __type: '[Theme!]!' },
    pageInfo: { __type: 'ThemeConnectionPageInfo!' },
    $on: { __type: '$ThemeConnection!' },
  },
  ThemeConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Theme!' },
    $on: { __type: '$ThemeConnectionEdge!' },
  },
  ThemeConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$ThemeConnectionPageInfo!' },
  },
  UniformResourceIdentifiable: {
    __typename: { __type: 'String!' },
    conditionalTags: { __type: 'ConditionalTags' },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isTermNode: { __type: 'Boolean!' },
    templates: { __type: '[String]' },
    uri: { __type: 'String' },
    $on: { __type: '$UniformResourceIdentifiable!' },
  },
  UpdateCategoryInput: {
    aliasOf: { __type: 'String' },
    clientMutationId: { __type: 'String' },
    description: { __type: 'String' },
    id: { __type: 'ID!' },
    name: { __type: 'String' },
    parentId: { __type: 'ID' },
    slug: { __type: 'String' },
  },
  UpdateCategoryPayload: {
    __typename: { __type: 'String!' },
    category: { __type: 'Category' },
    clientMutationId: { __type: 'String' },
  },
  UpdateCommentInput: {
    approved: { __type: 'String' },
    author: { __type: 'String' },
    authorEmail: { __type: 'String' },
    authorUrl: { __type: 'String' },
    clientMutationId: { __type: 'String' },
    commentOn: { __type: 'Int' },
    content: { __type: 'String' },
    date: { __type: 'String' },
    id: { __type: 'ID!' },
    parent: { __type: 'ID' },
    status: { __type: 'CommentStatusEnum' },
    type: { __type: 'String' },
  },
  UpdateCommentPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    comment: { __type: 'Comment' },
    success: { __type: 'Boolean' },
  },
  UpdateMediaItemInput: {
    altText: { __type: 'String' },
    authorId: { __type: 'ID' },
    caption: { __type: 'String' },
    clientMutationId: { __type: 'String' },
    commentStatus: { __type: 'String' },
    date: { __type: 'String' },
    dateGmt: { __type: 'String' },
    description: { __type: 'String' },
    filePath: { __type: 'String' },
    fileType: { __type: 'MimeTypeEnum' },
    id: { __type: 'ID!' },
    parentId: { __type: 'ID' },
    pingStatus: { __type: 'String' },
    slug: { __type: 'String' },
    status: { __type: 'MediaItemStatusEnum' },
    title: { __type: 'String' },
  },
  UpdateMediaItemPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    mediaItem: { __type: 'MediaItem' },
  },
  UpdatePageInput: {
    authorId: { __type: 'ID' },
    clientMutationId: { __type: 'String' },
    commentStatus: { __type: 'String' },
    content: { __type: 'String' },
    date: { __type: 'String' },
    id: { __type: 'ID!' },
    ignoreEditLock: { __type: 'Boolean' },
    menuOrder: { __type: 'Int' },
    parentId: { __type: 'ID' },
    password: { __type: 'String' },
    slug: { __type: 'String' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  UpdatePagePayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    page: { __type: 'Page' },
  },
  UpdatePostFormatInput: {
    aliasOf: { __type: 'String' },
    clientMutationId: { __type: 'String' },
    description: { __type: 'String' },
    id: { __type: 'ID!' },
    name: { __type: 'String' },
    slug: { __type: 'String' },
  },
  UpdatePostFormatPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    postFormat: { __type: 'PostFormat' },
  },
  UpdatePostInput: {
    authorId: { __type: 'ID' },
    categories: { __type: 'PostCategoriesInput' },
    clientMutationId: { __type: 'String' },
    commentStatus: { __type: 'String' },
    content: { __type: 'String' },
    date: { __type: 'String' },
    excerpt: { __type: 'String' },
    id: { __type: 'ID!' },
    ignoreEditLock: { __type: 'Boolean' },
    menuOrder: { __type: 'Int' },
    password: { __type: 'String' },
    pingStatus: { __type: 'String' },
    pinged: { __type: '[String]' },
    postFormats: { __type: 'PostPostFormatsInput' },
    slug: { __type: 'String' },
    status: { __type: 'PostStatusEnum' },
    tags: { __type: 'PostTagsInput' },
    title: { __type: 'String' },
    toPing: { __type: '[String]' },
  },
  UpdatePostPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    post: { __type: 'Post' },
  },
  UpdateSettingsInput: {
    clientMutationId: { __type: 'String' },
    discussionSettingsDefaultCommentStatus: { __type: 'String' },
    discussionSettingsDefaultPingStatus: { __type: 'String' },
    generalSettingsDateFormat: { __type: 'String' },
    generalSettingsDescription: { __type: 'String' },
    generalSettingsEmail: { __type: 'String' },
    generalSettingsLanguage: { __type: 'String' },
    generalSettingsStartOfWeek: { __type: 'Int' },
    generalSettingsTimeFormat: { __type: 'String' },
    generalSettingsTimezone: { __type: 'String' },
    generalSettingsTitle: { __type: 'String' },
    generalSettingsUrl: { __type: 'String' },
    readingSettingsPageForPosts: { __type: 'Int' },
    readingSettingsPageOnFront: { __type: 'Int' },
    readingSettingsPostsPerPage: { __type: 'Int' },
    readingSettingsShowOnFront: { __type: 'String' },
    writingSettingsDefaultCategory: { __type: 'Int' },
    writingSettingsDefaultPostFormat: { __type: 'String' },
    writingSettingsUseSmilies: { __type: 'Boolean' },
  },
  UpdateSettingsPayload: {
    __typename: { __type: 'String!' },
    allSettings: { __type: 'Settings' },
    clientMutationId: { __type: 'String' },
    discussionSettings: { __type: 'DiscussionSettings' },
    generalSettings: { __type: 'GeneralSettings' },
    readingSettings: { __type: 'ReadingSettings' },
    writingSettings: { __type: 'WritingSettings' },
  },
  UpdateTagInput: {
    aliasOf: { __type: 'String' },
    clientMutationId: { __type: 'String' },
    description: { __type: 'String' },
    id: { __type: 'ID!' },
    name: { __type: 'String' },
    slug: { __type: 'String' },
  },
  UpdateTagPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    tag: { __type: 'Tag' },
  },
  UpdateUserInput: {
    aim: { __type: 'String' },
    clientMutationId: { __type: 'String' },
    description: { __type: 'String' },
    displayName: { __type: 'String' },
    email: { __type: 'String' },
    firstName: { __type: 'String' },
    id: { __type: 'ID!' },
    jabber: { __type: 'String' },
    lastName: { __type: 'String' },
    locale: { __type: 'String' },
    nicename: { __type: 'String' },
    nickname: { __type: 'String' },
    password: { __type: 'String' },
    registered: { __type: 'String' },
    richEditing: { __type: 'String' },
    roles: { __type: '[String]' },
    websiteUrl: { __type: 'String' },
    yim: { __type: 'String' },
  },
  UpdateUserPayload: {
    __typename: { __type: 'String!' },
    clientMutationId: { __type: 'String' },
    user: { __type: 'User' },
  },
  User: {
    __typename: { __type: 'String!' },
    avatar: {
      __type: 'Avatar',
      __args: {
        forceDefault: 'Boolean',
        rating: 'AvatarRatingEnum',
        size: 'Int',
      },
    },
    capKey: { __type: 'String' },
    capabilities: { __type: '[String]' },
    comments: {
      __type: 'UserToCommentConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'UserToCommentConnectionWhereArgs',
      },
    },
    conditionalTags: { __type: 'ConditionalTags' },
    databaseId: { __type: 'Int!' },
    description: { __type: 'String' },
    email: { __type: 'String' },
    enqueuedScripts: {
      __type: 'UserToEnqueuedScriptConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    enqueuedStylesheets: {
      __type: 'UserToEnqueuedStylesheetConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    extraCapabilities: { __type: '[String]' },
    firstName: { __type: 'String' },
    id: { __type: 'ID!' },
    isContentNode: { __type: 'Boolean!' },
    isRestricted: { __type: 'Boolean' },
    isTermNode: { __type: 'Boolean!' },
    lastName: { __type: 'String' },
    locale: { __type: 'String' },
    mediaItems: {
      __type: 'UserToMediaItemConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'UserToMediaItemConnectionWhereArgs',
      },
    },
    name: { __type: 'String' },
    nicename: { __type: 'String' },
    nickname: { __type: 'String' },
    pages: {
      __type: 'UserToPageConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'UserToPageConnectionWhereArgs',
      },
    },
    posts: {
      __type: 'UserToPostConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'UserToPostConnectionWhereArgs',
      },
    },
    registeredDate: { __type: 'String' },
    revisions: {
      __type: 'UserToRevisionsConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'UserToRevisionsConnectionWhereArgs',
      },
    },
    roles: {
      __type: 'UserToUserRoleConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    shouldShowAdminToolbar: { __type: 'Boolean' },
    slug: { __type: 'String' },
    templates: { __type: '[String]' },
    uri: { __type: 'String' },
    url: { __type: 'String' },
    userId: { __type: 'Int' },
    username: { __type: 'String' },
  },
  UserConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[UserConnectionEdge!]!' },
    nodes: { __type: '[User!]!' },
    pageInfo: { __type: 'UserConnectionPageInfo!' },
    $on: { __type: '$UserConnection!' },
  },
  UserConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'User!' },
    $on: { __type: '$UserConnectionEdge!' },
  },
  UserConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$UserConnectionPageInfo!' },
  },
  UserRole: {
    __typename: { __type: 'String!' },
    capabilities: { __type: '[String]' },
    displayName: { __type: 'String' },
    id: { __type: 'ID!' },
    isRestricted: { __type: 'Boolean' },
    name: { __type: 'String' },
  },
  UserRoleConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[UserRoleConnectionEdge!]!' },
    nodes: { __type: '[UserRole!]!' },
    pageInfo: { __type: 'UserRoleConnectionPageInfo!' },
    $on: { __type: '$UserRoleConnection!' },
  },
  UserRoleConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'UserRole!' },
    $on: { __type: '$UserRoleConnectionEdge!' },
  },
  UserRoleConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$UserRoleConnectionPageInfo!' },
  },
  UserToCommentConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[UserToCommentConnectionEdge!]!' },
    nodes: { __type: '[Comment!]!' },
    pageInfo: { __type: 'UserToCommentConnectionPageInfo!' },
  },
  UserToCommentConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Comment!' },
  },
  UserToCommentConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  UserToCommentConnectionWhereArgs: {
    authorEmail: { __type: 'String' },
    authorIn: { __type: '[ID]' },
    authorNotIn: { __type: '[ID]' },
    authorUrl: { __type: 'String' },
    commentIn: { __type: '[ID]' },
    commentNotIn: { __type: '[ID]' },
    commentType: { __type: 'String' },
    commentTypeIn: { __type: '[String]' },
    commentTypeNotIn: { __type: 'String' },
    contentAuthor: { __type: '[ID]' },
    contentAuthorIn: { __type: '[ID]' },
    contentAuthorNotIn: { __type: '[ID]' },
    contentId: { __type: 'ID' },
    contentIdIn: { __type: '[ID]' },
    contentIdNotIn: { __type: '[ID]' },
    contentName: { __type: 'String' },
    contentParent: { __type: 'Int' },
    contentStatus: { __type: '[PostStatusEnum]' },
    contentType: { __type: '[ContentTypeEnum]' },
    includeUnapproved: { __type: '[ID]' },
    karma: { __type: 'Int' },
    order: { __type: 'OrderEnum' },
    orderby: { __type: 'CommentsConnectionOrderbyEnum' },
    parent: { __type: 'Int' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    search: { __type: 'String' },
    status: { __type: 'String' },
    userId: { __type: 'ID' },
  },
  UserToEnqueuedScriptConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[UserToEnqueuedScriptConnectionEdge!]!' },
    nodes: { __type: '[EnqueuedScript!]!' },
    pageInfo: { __type: 'UserToEnqueuedScriptConnectionPageInfo!' },
  },
  UserToEnqueuedScriptConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'EnqueuedScript!' },
  },
  UserToEnqueuedScriptConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  UserToEnqueuedStylesheetConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[UserToEnqueuedStylesheetConnectionEdge!]!' },
    nodes: { __type: '[EnqueuedStylesheet!]!' },
    pageInfo: { __type: 'UserToEnqueuedStylesheetConnectionPageInfo!' },
  },
  UserToEnqueuedStylesheetConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'EnqueuedStylesheet!' },
  },
  UserToEnqueuedStylesheetConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  UserToMediaItemConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[UserToMediaItemConnectionEdge!]!' },
    nodes: { __type: '[MediaItem!]!' },
    pageInfo: { __type: 'UserToMediaItemConnectionPageInfo!' },
  },
  UserToMediaItemConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'MediaItem!' },
  },
  UserToMediaItemConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  UserToMediaItemConnectionWhereArgs: {
    author: { __type: 'Int' },
    authorIn: { __type: '[ID]' },
    authorName: { __type: 'String' },
    authorNotIn: { __type: '[ID]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  UserToPageConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[UserToPageConnectionEdge!]!' },
    nodes: { __type: '[Page!]!' },
    pageInfo: { __type: 'UserToPageConnectionPageInfo!' },
  },
  UserToPageConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Page!' },
  },
  UserToPageConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  UserToPageConnectionWhereArgs: {
    author: { __type: 'Int' },
    authorIn: { __type: '[ID]' },
    authorName: { __type: 'String' },
    authorNotIn: { __type: '[ID]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  UserToPostConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[UserToPostConnectionEdge!]!' },
    nodes: { __type: '[Post!]!' },
    pageInfo: { __type: 'UserToPostConnectionPageInfo!' },
  },
  UserToPostConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'Post!' },
  },
  UserToPostConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  UserToPostConnectionWhereArgs: {
    author: { __type: 'Int' },
    authorIn: { __type: '[ID]' },
    authorName: { __type: 'String' },
    authorNotIn: { __type: '[ID]' },
    categoryId: { __type: 'Int' },
    categoryIn: { __type: '[ID]' },
    categoryName: { __type: 'String' },
    categoryNotIn: { __type: '[ID]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    tag: { __type: 'String' },
    tagId: { __type: 'String' },
    tagIn: { __type: '[ID]' },
    tagNotIn: { __type: '[ID]' },
    tagSlugAnd: { __type: '[String]' },
    tagSlugIn: { __type: '[String]' },
    title: { __type: 'String' },
  },
  UserToRevisionsConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[UserToRevisionsConnectionEdge!]!' },
    nodes: { __type: '[ContentNode!]!' },
    pageInfo: { __type: 'UserToRevisionsConnectionPageInfo!' },
  },
  UserToRevisionsConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'ContentNode!' },
  },
  UserToRevisionsConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  UserToRevisionsConnectionWhereArgs: {
    contentTypes: { __type: '[ContentTypeEnum]' },
    dateQuery: { __type: 'DateQueryInput' },
    hasPassword: { __type: 'Boolean' },
    id: { __type: 'Int' },
    in: { __type: '[ID]' },
    mimeType: { __type: 'MimeTypeEnum' },
    name: { __type: 'String' },
    nameIn: { __type: '[String]' },
    notIn: { __type: '[ID]' },
    orderby: { __type: '[PostObjectsConnectionOrderbyInput]' },
    parent: { __type: 'ID' },
    parentIn: { __type: '[ID]' },
    parentNotIn: { __type: '[ID]' },
    password: { __type: 'String' },
    search: { __type: 'String' },
    stati: { __type: '[PostStatusEnum]' },
    status: { __type: 'PostStatusEnum' },
    title: { __type: 'String' },
  },
  UserToUserRoleConnection: {
    __typename: { __type: 'String!' },
    edges: { __type: '[UserToUserRoleConnectionEdge!]!' },
    nodes: { __type: '[UserRole!]!' },
    pageInfo: { __type: 'UserToUserRoleConnectionPageInfo!' },
  },
  UserToUserRoleConnectionEdge: {
    __typename: { __type: 'String!' },
    cursor: { __type: 'String' },
    node: { __type: 'UserRole!' },
  },
  UserToUserRoleConnectionPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
  },
  UsersConnectionOrderbyInput: {
    field: { __type: 'UsersConnectionOrderbyEnum!' },
    order: { __type: 'OrderEnum' },
  },
  WPPageInfo: {
    __typename: { __type: 'String!' },
    endCursor: { __type: 'String' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    $on: { __type: '$WPPageInfo!' },
  },
  WritingSettings: {
    __typename: { __type: 'String!' },
    defaultCategory: { __type: 'Int' },
    defaultPostFormat: { __type: 'String' },
    useSmilies: { __type: 'Boolean' },
  },
  mutation: {
    __typename: { __type: 'String!' },
    createCategory: {
      __type: 'CreateCategoryPayload',
      __args: { input: 'CreateCategoryInput!' },
    },
    createComment: {
      __type: 'CreateCommentPayload',
      __args: { input: 'CreateCommentInput!' },
    },
    createMediaItem: {
      __type: 'CreateMediaItemPayload',
      __args: { input: 'CreateMediaItemInput!' },
    },
    createPage: {
      __type: 'CreatePagePayload',
      __args: { input: 'CreatePageInput!' },
    },
    createPost: {
      __type: 'CreatePostPayload',
      __args: { input: 'CreatePostInput!' },
    },
    createPostFormat: {
      __type: 'CreatePostFormatPayload',
      __args: { input: 'CreatePostFormatInput!' },
    },
    createTag: {
      __type: 'CreateTagPayload',
      __args: { input: 'CreateTagInput!' },
    },
    createUser: {
      __type: 'CreateUserPayload',
      __args: { input: 'CreateUserInput!' },
    },
    deleteCategory: {
      __type: 'DeleteCategoryPayload',
      __args: { input: 'DeleteCategoryInput!' },
    },
    deleteComment: {
      __type: 'DeleteCommentPayload',
      __args: { input: 'DeleteCommentInput!' },
    },
    deleteMediaItem: {
      __type: 'DeleteMediaItemPayload',
      __args: { input: 'DeleteMediaItemInput!' },
    },
    deletePage: {
      __type: 'DeletePagePayload',
      __args: { input: 'DeletePageInput!' },
    },
    deletePost: {
      __type: 'DeletePostPayload',
      __args: { input: 'DeletePostInput!' },
    },
    deletePostFormat: {
      __type: 'DeletePostFormatPayload',
      __args: { input: 'DeletePostFormatInput!' },
    },
    deleteTag: {
      __type: 'DeleteTagPayload',
      __args: { input: 'DeleteTagInput!' },
    },
    deleteUser: {
      __type: 'DeleteUserPayload',
      __args: { input: 'DeleteUserInput!' },
    },
    generateAuthorizationCode: {
      __type: 'GenerateAuthorizationCodePayload',
      __args: { input: 'GenerateAuthorizationCodeInput!' },
    },
    increaseCount: { __type: 'Int', __args: { count: 'Int' } },
    registerUser: {
      __type: 'RegisterUserPayload',
      __args: { input: 'RegisterUserInput!' },
    },
    resetUserPassword: {
      __type: 'ResetUserPasswordPayload',
      __args: { input: 'ResetUserPasswordInput!' },
    },
    restoreComment: {
      __type: 'RestoreCommentPayload',
      __args: { input: 'RestoreCommentInput!' },
    },
    sendPasswordResetEmail: {
      __type: 'SendPasswordResetEmailPayload',
      __args: { input: 'SendPasswordResetEmailInput!' },
    },
    updateCategory: {
      __type: 'UpdateCategoryPayload',
      __args: { input: 'UpdateCategoryInput!' },
    },
    updateComment: {
      __type: 'UpdateCommentPayload',
      __args: { input: 'UpdateCommentInput!' },
    },
    updateMediaItem: {
      __type: 'UpdateMediaItemPayload',
      __args: { input: 'UpdateMediaItemInput!' },
    },
    updatePage: {
      __type: 'UpdatePagePayload',
      __args: { input: 'UpdatePageInput!' },
    },
    updatePost: {
      __type: 'UpdatePostPayload',
      __args: { input: 'UpdatePostInput!' },
    },
    updatePostFormat: {
      __type: 'UpdatePostFormatPayload',
      __args: { input: 'UpdatePostFormatInput!' },
    },
    updateSettings: {
      __type: 'UpdateSettingsPayload',
      __args: { input: 'UpdateSettingsInput!' },
    },
    updateTag: {
      __type: 'UpdateTagPayload',
      __args: { input: 'UpdateTagInput!' },
    },
    updateUser: {
      __type: 'UpdateUserPayload',
      __args: { input: 'UpdateUserInput!' },
    },
  },
  query: {
    __typename: { __type: 'String!' },
    allSettings: { __type: 'Settings' },
    categories: {
      __type: 'RootQueryToCategoryConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToCategoryConnectionWhereArgs',
      },
    },
    category: {
      __type: 'Category',
      __args: { id: 'ID!', idType: 'CategoryIdType' },
    },
    comment: {
      __type: 'Comment',
      __args: { id: 'ID!', idType: 'CommentNodeIdTypeEnum' },
    },
    comments: {
      __type: 'RootQueryToCommentConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToCommentConnectionWhereArgs',
      },
    },
    contentNode: {
      __type: 'ContentNode',
      __args: {
        asPreview: 'Boolean',
        contentType: 'ContentTypeEnum',
        id: 'ID!',
        idType: 'ContentNodeIdTypeEnum',
      },
    },
    contentNodes: {
      __type: 'RootQueryToContentNodeConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToContentNodeConnectionWhereArgs',
      },
    },
    contentType: {
      __type: 'ContentType',
      __args: { id: 'ID!', idType: 'ContentTypeIdTypeEnum' },
    },
    contentTypes: {
      __type: 'RootQueryToContentTypeConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    discussionSettings: { __type: 'DiscussionSettings' },
    generalSettings: { __type: 'GeneralSettings' },
    mediaItem: {
      __type: 'MediaItem',
      __args: { asPreview: 'Boolean', id: 'ID!', idType: 'MediaItemIdType' },
    },
    mediaItemBy: {
      __type: 'MediaItem',
      __args: { id: 'ID', mediaItemId: 'Int', slug: 'String', uri: 'String' },
    },
    mediaItems: {
      __type: 'RootQueryToMediaItemConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToMediaItemConnectionWhereArgs',
      },
    },
    menu: {
      __type: 'Menu',
      __args: { id: 'ID!', idType: 'MenuNodeIdTypeEnum' },
    },
    menuItem: {
      __type: 'MenuItem',
      __args: { id: 'ID!', idType: 'MenuItemNodeIdTypeEnum' },
    },
    menuItems: {
      __type: 'RootQueryToMenuItemConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToMenuItemConnectionWhereArgs',
      },
    },
    menus: {
      __type: 'RootQueryToMenuConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToMenuConnectionWhereArgs',
      },
    },
    node: { __type: 'Node', __args: { id: 'ID' } },
    nodeByUri: {
      __type: 'UniformResourceIdentifiable',
      __args: { uri: 'String!' },
    },
    page: {
      __type: 'Page',
      __args: { asPreview: 'Boolean', id: 'ID!', idType: 'PageIdType' },
    },
    pageBy: {
      __type: 'Page',
      __args: { id: 'ID', pageId: 'Int', uri: 'String' },
    },
    pages: {
      __type: 'RootQueryToPageConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToPageConnectionWhereArgs',
      },
    },
    plugin: { __type: 'Plugin', __args: { id: 'ID!' } },
    plugins: {
      __type: 'RootQueryToPluginConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToPluginConnectionWhereArgs',
      },
    },
    post: {
      __type: 'Post',
      __args: { asPreview: 'Boolean', id: 'ID!', idType: 'PostIdType' },
    },
    postBy: {
      __type: 'Post',
      __args: { id: 'ID', postId: 'Int', slug: 'String', uri: 'String' },
    },
    postFormat: {
      __type: 'PostFormat',
      __args: { id: 'ID!', idType: 'PostFormatIdType' },
    },
    postFormats: {
      __type: 'RootQueryToPostFormatConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToPostFormatConnectionWhereArgs',
      },
    },
    posts: {
      __type: 'RootQueryToPostConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToPostConnectionWhereArgs',
      },
    },
    readingSettings: { __type: 'ReadingSettings' },
    registeredScripts: {
      __type: 'RootQueryToEnqueuedScriptConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    registeredStylesheets: {
      __type: 'RootQueryToEnqueuedStylesheetConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    revisions: {
      __type: 'RootQueryToRevisionsConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToRevisionsConnectionWhereArgs',
      },
    },
    tag: { __type: 'Tag', __args: { id: 'ID!', idType: 'TagIdType' } },
    tags: {
      __type: 'RootQueryToTagConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToTagConnectionWhereArgs',
      },
    },
    taxonomies: {
      __type: 'RootQueryToTaxonomyConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    taxonomy: {
      __type: 'Taxonomy',
      __args: { id: 'ID!', idType: 'TaxonomyIdTypeEnum' },
    },
    termNode: {
      __type: 'TermNode',
      __args: {
        id: 'ID!',
        idType: 'TermNodeIdTypeEnum',
        taxonomy: 'TaxonomyEnum',
      },
    },
    terms: {
      __type: 'RootQueryToTermNodeConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToTermNodeConnectionWhereArgs',
      },
    },
    theme: { __type: 'Theme', __args: { id: 'ID!' } },
    themes: {
      __type: 'RootQueryToThemeConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    user: {
      __type: 'User',
      __args: { id: 'ID!', idType: 'UserNodeIdTypeEnum' },
    },
    userRole: { __type: 'UserRole', __args: { id: 'ID!' } },
    userRoles: {
      __type: 'RootQueryToUserRoleConnection',
      __args: { after: 'String', before: 'String', first: 'Int', last: 'Int' },
    },
    users: {
      __type: 'RootQueryToUserConnection',
      __args: {
        after: 'String',
        before: 'String',
        first: 'Int',
        last: 'Int',
        where: 'RootQueryToUserConnectionWhereArgs',
      },
    },
    viewer: { __type: 'User' },
    writingSettings: { __type: 'WritingSettings' },
  },
  subscription: {},
  [SchemaUnionsKey]: {
    DatabaseIdentifier: [
      'Category',
      'Comment',
      'CommentAuthor',
      'MediaItem',
      'Menu',
      'MenuItem',
      'Page',
      'Post',
      'PostFormat',
      'Tag',
      'User',
    ],
    HierarchicalNode: ['Category', 'MediaItem', 'Page'],
    HierarchicalTermNode: ['Category'],
    MenuItemLinkable: ['Category', 'Page', 'Post', 'PostFormat', 'Tag'],
    Node: [
      'Category',
      'Comment',
      'CommentAuthor',
      'ContentType',
      'EnqueuedScript',
      'EnqueuedStylesheet',
      'MediaItem',
      'Menu',
      'MenuItem',
      'Page',
      'Plugin',
      'Post',
      'PostFormat',
      'Tag',
      'Taxonomy',
      'Theme',
      'User',
      'UserRole',
    ],
    TermNode: ['Category', 'PostFormat', 'Tag'],
    UniformResourceIdentifiable: [
      'Category',
      'ContentType',
      'MediaItem',
      'Page',
      'Post',
      'PostFormat',
      'Tag',
      'User',
    ],
    CategoryConnection: [
      'CategoryToAncestorsCategoryConnection',
      'CategoryToCategoryConnection',
      'PostToCategoryConnection',
      'RootQueryToCategoryConnection',
    ],
    Connection: [
      'CategoryToAncestorsCategoryConnection',
      'CategoryToCategoryConnection',
      'CategoryToContentNodeConnection',
      'CategoryToPostConnection',
      'CommentToCommentConnection',
      'ContentNodeToEnqueuedScriptConnection',
      'ContentNodeToEnqueuedStylesheetConnection',
      'ContentTypeToContentNodeConnection',
      'ContentTypeToTaxonomyConnection',
      'HierarchicalContentNodeToContentNodeAncestorsConnection',
      'HierarchicalContentNodeToContentNodeChildrenConnection',
      'MediaItemToCommentConnection',
      'MenuItemToMenuItemConnection',
      'MenuToMenuItemConnection',
      'PageToCommentConnection',
      'PageToRevisionConnection',
      'PostFormatToContentNodeConnection',
      'PostFormatToPostConnection',
      'PostToCategoryConnection',
      'PostToCommentConnection',
      'PostToPostFormatConnection',
      'PostToRevisionConnection',
      'PostToTagConnection',
      'PostToTermNodeConnection',
      'RootQueryToCategoryConnection',
      'RootQueryToCommentConnection',
      'RootQueryToContentNodeConnection',
      'RootQueryToContentTypeConnection',
      'RootQueryToEnqueuedScriptConnection',
      'RootQueryToEnqueuedStylesheetConnection',
      'RootQueryToMediaItemConnection',
      'RootQueryToMenuConnection',
      'RootQueryToMenuItemConnection',
      'RootQueryToPageConnection',
      'RootQueryToPluginConnection',
      'RootQueryToPostConnection',
      'RootQueryToPostFormatConnection',
      'RootQueryToRevisionsConnection',
      'RootQueryToTagConnection',
      'RootQueryToTaxonomyConnection',
      'RootQueryToTermNodeConnection',
      'RootQueryToThemeConnection',
      'RootQueryToUserConnection',
      'RootQueryToUserRoleConnection',
      'TagToContentNodeConnection',
      'TagToPostConnection',
      'TaxonomyToContentTypeConnection',
      'TaxonomyToTermNodeConnection',
      'TermNodeToEnqueuedScriptConnection',
      'TermNodeToEnqueuedStylesheetConnection',
      'UserToCommentConnection',
      'UserToEnqueuedScriptConnection',
      'UserToEnqueuedStylesheetConnection',
      'UserToMediaItemConnection',
      'UserToPageConnection',
      'UserToPostConnection',
      'UserToRevisionsConnection',
      'UserToUserRoleConnection',
    ],
    CategoryConnectionEdge: [
      'CategoryToAncestorsCategoryConnectionEdge',
      'CategoryToCategoryConnectionEdge',
      'CategoryToParentCategoryConnectionEdge',
      'PostToCategoryConnectionEdge',
      'RootQueryToCategoryConnectionEdge',
    ],
    Edge: [
      'CategoryToAncestorsCategoryConnectionEdge',
      'CategoryToCategoryConnectionEdge',
      'CategoryToContentNodeConnectionEdge',
      'CategoryToParentCategoryConnectionEdge',
      'CategoryToPostConnectionEdge',
      'CategoryToTaxonomyConnectionEdge',
      'CommentToCommentConnectionEdge',
      'CommentToCommenterConnectionEdge',
      'CommentToContentNodeConnectionEdge',
      'CommentToParentCommentConnectionEdge',
      'ContentNodeToContentTypeConnectionEdge',
      'ContentNodeToEditLastConnectionEdge',
      'ContentNodeToEditLockConnectionEdge',
      'ContentNodeToEnqueuedScriptConnectionEdge',
      'ContentNodeToEnqueuedStylesheetConnectionEdge',
      'ContentTypeToContentNodeConnectionEdge',
      'ContentTypeToTaxonomyConnectionEdge',
      'HierarchicalContentNodeToContentNodeAncestorsConnectionEdge',
      'HierarchicalContentNodeToContentNodeChildrenConnectionEdge',
      'HierarchicalContentNodeToParentContentNodeConnectionEdge',
      'MediaItemToCommentConnectionEdge',
      'MenuItemToMenuConnectionEdge',
      'MenuItemToMenuItemConnectionEdge',
      'MenuItemToMenuItemLinkableConnectionEdge',
      'MenuToMenuItemConnectionEdge',
      'NodeWithAuthorToUserConnectionEdge',
      'NodeWithFeaturedImageToMediaItemConnectionEdge',
      'NodeWithRevisionsToContentNodeConnectionEdge',
      'PageToCommentConnectionEdge',
      'PageToPreviewConnectionEdge',
      'PageToRevisionConnectionEdge',
      'PostFormatToContentNodeConnectionEdge',
      'PostFormatToPostConnectionEdge',
      'PostFormatToTaxonomyConnectionEdge',
      'PostToCategoryConnectionEdge',
      'PostToCommentConnectionEdge',
      'PostToPostFormatConnectionEdge',
      'PostToPreviewConnectionEdge',
      'PostToRevisionConnectionEdge',
      'PostToTagConnectionEdge',
      'PostToTermNodeConnectionEdge',
      'RootQueryToCategoryConnectionEdge',
      'RootQueryToCommentConnectionEdge',
      'RootQueryToContentNodeConnectionEdge',
      'RootQueryToContentTypeConnectionEdge',
      'RootQueryToEnqueuedScriptConnectionEdge',
      'RootQueryToEnqueuedStylesheetConnectionEdge',
      'RootQueryToMediaItemConnectionEdge',
      'RootQueryToMenuConnectionEdge',
      'RootQueryToMenuItemConnectionEdge',
      'RootQueryToPageConnectionEdge',
      'RootQueryToPluginConnectionEdge',
      'RootQueryToPostConnectionEdge',
      'RootQueryToPostFormatConnectionEdge',
      'RootQueryToRevisionsConnectionEdge',
      'RootQueryToTagConnectionEdge',
      'RootQueryToTaxonomyConnectionEdge',
      'RootQueryToTermNodeConnectionEdge',
      'RootQueryToThemeConnectionEdge',
      'RootQueryToUserConnectionEdge',
      'RootQueryToUserRoleConnectionEdge',
      'TagToContentNodeConnectionEdge',
      'TagToPostConnectionEdge',
      'TagToTaxonomyConnectionEdge',
      'TaxonomyToContentTypeConnectionEdge',
      'TaxonomyToTermNodeConnectionEdge',
      'TermNodeToEnqueuedScriptConnectionEdge',
      'TermNodeToEnqueuedStylesheetConnectionEdge',
      'UserToCommentConnectionEdge',
      'UserToEnqueuedScriptConnectionEdge',
      'UserToEnqueuedStylesheetConnectionEdge',
      'UserToMediaItemConnectionEdge',
      'UserToPageConnectionEdge',
      'UserToPostConnectionEdge',
      'UserToRevisionsConnectionEdge',
      'UserToUserRoleConnectionEdge',
    ],
    CategoryConnectionPageInfo: [
      'CategoryToAncestorsCategoryConnectionPageInfo',
      'CategoryToCategoryConnectionPageInfo',
      'PostToCategoryConnectionPageInfo',
      'RootQueryToCategoryConnectionPageInfo',
    ],
    PageInfo: [
      'CategoryToAncestorsCategoryConnectionPageInfo',
      'CategoryToCategoryConnectionPageInfo',
      'CategoryToContentNodeConnectionPageInfo',
      'CategoryToPostConnectionPageInfo',
      'CommentToCommentConnectionPageInfo',
      'ContentNodeToEnqueuedScriptConnectionPageInfo',
      'ContentNodeToEnqueuedStylesheetConnectionPageInfo',
      'ContentTypeToContentNodeConnectionPageInfo',
      'ContentTypeToTaxonomyConnectionPageInfo',
      'HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo',
      'HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo',
      'MediaItemToCommentConnectionPageInfo',
      'MenuItemToMenuItemConnectionPageInfo',
      'MenuToMenuItemConnectionPageInfo',
      'PageToCommentConnectionPageInfo',
      'PageToRevisionConnectionPageInfo',
      'PostFormatToContentNodeConnectionPageInfo',
      'PostFormatToPostConnectionPageInfo',
      'PostToCategoryConnectionPageInfo',
      'PostToCommentConnectionPageInfo',
      'PostToPostFormatConnectionPageInfo',
      'PostToRevisionConnectionPageInfo',
      'PostToTagConnectionPageInfo',
      'PostToTermNodeConnectionPageInfo',
      'RootQueryToCategoryConnectionPageInfo',
      'RootQueryToCommentConnectionPageInfo',
      'RootQueryToContentNodeConnectionPageInfo',
      'RootQueryToContentTypeConnectionPageInfo',
      'RootQueryToEnqueuedScriptConnectionPageInfo',
      'RootQueryToEnqueuedStylesheetConnectionPageInfo',
      'RootQueryToMediaItemConnectionPageInfo',
      'RootQueryToMenuConnectionPageInfo',
      'RootQueryToMenuItemConnectionPageInfo',
      'RootQueryToPageConnectionPageInfo',
      'RootQueryToPluginConnectionPageInfo',
      'RootQueryToPostConnectionPageInfo',
      'RootQueryToPostFormatConnectionPageInfo',
      'RootQueryToRevisionsConnectionPageInfo',
      'RootQueryToTagConnectionPageInfo',
      'RootQueryToTaxonomyConnectionPageInfo',
      'RootQueryToTermNodeConnectionPageInfo',
      'RootQueryToThemeConnectionPageInfo',
      'RootQueryToUserConnectionPageInfo',
      'RootQueryToUserRoleConnectionPageInfo',
      'TagToContentNodeConnectionPageInfo',
      'TagToPostConnectionPageInfo',
      'TaxonomyToContentTypeConnectionPageInfo',
      'TaxonomyToTermNodeConnectionPageInfo',
      'TermNodeToEnqueuedScriptConnectionPageInfo',
      'TermNodeToEnqueuedStylesheetConnectionPageInfo',
      'UserToCommentConnectionPageInfo',
      'UserToEnqueuedScriptConnectionPageInfo',
      'UserToEnqueuedStylesheetConnectionPageInfo',
      'UserToMediaItemConnectionPageInfo',
      'UserToPageConnectionPageInfo',
      'UserToPostConnectionPageInfo',
      'UserToRevisionsConnectionPageInfo',
      'UserToUserRoleConnectionPageInfo',
    ],
    WPPageInfo: [
      'CategoryToAncestorsCategoryConnectionPageInfo',
      'CategoryToCategoryConnectionPageInfo',
      'CategoryToContentNodeConnectionPageInfo',
      'CategoryToPostConnectionPageInfo',
      'CommentToCommentConnectionPageInfo',
      'ContentNodeToEnqueuedScriptConnectionPageInfo',
      'ContentNodeToEnqueuedStylesheetConnectionPageInfo',
      'ContentTypeToContentNodeConnectionPageInfo',
      'ContentTypeToTaxonomyConnectionPageInfo',
      'HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo',
      'HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo',
      'MediaItemToCommentConnectionPageInfo',
      'MenuItemToMenuItemConnectionPageInfo',
      'MenuToMenuItemConnectionPageInfo',
      'PageToCommentConnectionPageInfo',
      'PageToRevisionConnectionPageInfo',
      'PostFormatToContentNodeConnectionPageInfo',
      'PostFormatToPostConnectionPageInfo',
      'PostToCategoryConnectionPageInfo',
      'PostToCommentConnectionPageInfo',
      'PostToPostFormatConnectionPageInfo',
      'PostToRevisionConnectionPageInfo',
      'PostToTagConnectionPageInfo',
      'PostToTermNodeConnectionPageInfo',
      'RootQueryToCategoryConnectionPageInfo',
      'RootQueryToCommentConnectionPageInfo',
      'RootQueryToContentNodeConnectionPageInfo',
      'RootQueryToContentTypeConnectionPageInfo',
      'RootQueryToEnqueuedScriptConnectionPageInfo',
      'RootQueryToEnqueuedStylesheetConnectionPageInfo',
      'RootQueryToMediaItemConnectionPageInfo',
      'RootQueryToMenuConnectionPageInfo',
      'RootQueryToMenuItemConnectionPageInfo',
      'RootQueryToPageConnectionPageInfo',
      'RootQueryToPluginConnectionPageInfo',
      'RootQueryToPostConnectionPageInfo',
      'RootQueryToPostFormatConnectionPageInfo',
      'RootQueryToRevisionsConnectionPageInfo',
      'RootQueryToTagConnectionPageInfo',
      'RootQueryToTaxonomyConnectionPageInfo',
      'RootQueryToTermNodeConnectionPageInfo',
      'RootQueryToThemeConnectionPageInfo',
      'RootQueryToUserConnectionPageInfo',
      'RootQueryToUserRoleConnectionPageInfo',
      'TagToContentNodeConnectionPageInfo',
      'TagToPostConnectionPageInfo',
      'TaxonomyToContentTypeConnectionPageInfo',
      'TaxonomyToTermNodeConnectionPageInfo',
      'TermNodeToEnqueuedScriptConnectionPageInfo',
      'TermNodeToEnqueuedStylesheetConnectionPageInfo',
      'UserToCommentConnectionPageInfo',
      'UserToEnqueuedScriptConnectionPageInfo',
      'UserToEnqueuedStylesheetConnectionPageInfo',
      'UserToMediaItemConnectionPageInfo',
      'UserToPageConnectionPageInfo',
      'UserToPostConnectionPageInfo',
      'UserToRevisionsConnectionPageInfo',
      'UserToUserRoleConnectionPageInfo',
    ],
    ContentNodeConnection: [
      'CategoryToContentNodeConnection',
      'ContentTypeToContentNodeConnection',
      'HierarchicalContentNodeToContentNodeAncestorsConnection',
      'HierarchicalContentNodeToContentNodeChildrenConnection',
      'PostFormatToContentNodeConnection',
      'RootQueryToContentNodeConnection',
      'RootQueryToRevisionsConnection',
      'TagToContentNodeConnection',
      'UserToRevisionsConnection',
    ],
    ContentNodeConnectionEdge: [
      'CategoryToContentNodeConnectionEdge',
      'CommentToContentNodeConnectionEdge',
      'ContentTypeToContentNodeConnectionEdge',
      'HierarchicalContentNodeToContentNodeAncestorsConnectionEdge',
      'HierarchicalContentNodeToContentNodeChildrenConnectionEdge',
      'HierarchicalContentNodeToParentContentNodeConnectionEdge',
      'NodeWithRevisionsToContentNodeConnectionEdge',
      'PostFormatToContentNodeConnectionEdge',
      'RootQueryToContentNodeConnectionEdge',
      'RootQueryToRevisionsConnectionEdge',
      'TagToContentNodeConnectionEdge',
      'UserToRevisionsConnectionEdge',
    ],
    ContentNodeConnectionPageInfo: [
      'CategoryToContentNodeConnectionPageInfo',
      'ContentTypeToContentNodeConnectionPageInfo',
      'HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo',
      'HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo',
      'PostFormatToContentNodeConnectionPageInfo',
      'RootQueryToContentNodeConnectionPageInfo',
      'RootQueryToRevisionsConnectionPageInfo',
      'TagToContentNodeConnectionPageInfo',
      'UserToRevisionsConnectionPageInfo',
    ],
    OneToOneConnection: [
      'CategoryToParentCategoryConnectionEdge',
      'CategoryToTaxonomyConnectionEdge',
      'CommentToCommenterConnectionEdge',
      'CommentToContentNodeConnectionEdge',
      'CommentToParentCommentConnectionEdge',
      'ContentNodeToContentTypeConnectionEdge',
      'ContentNodeToEditLastConnectionEdge',
      'ContentNodeToEditLockConnectionEdge',
      'HierarchicalContentNodeToParentContentNodeConnectionEdge',
      'MenuItemToMenuConnectionEdge',
      'MenuItemToMenuItemLinkableConnectionEdge',
      'NodeWithAuthorToUserConnectionEdge',
      'NodeWithFeaturedImageToMediaItemConnectionEdge',
      'NodeWithRevisionsToContentNodeConnectionEdge',
      'PageToPreviewConnectionEdge',
      'PostFormatToTaxonomyConnectionEdge',
      'PostToPreviewConnectionEdge',
      'TagToTaxonomyConnectionEdge',
    ],
    PostConnection: [
      'CategoryToPostConnection',
      'PostFormatToPostConnection',
      'PostToRevisionConnection',
      'RootQueryToPostConnection',
      'TagToPostConnection',
      'UserToPostConnection',
    ],
    PostConnectionEdge: [
      'CategoryToPostConnectionEdge',
      'PostFormatToPostConnectionEdge',
      'PostToPreviewConnectionEdge',
      'PostToRevisionConnectionEdge',
      'RootQueryToPostConnectionEdge',
      'TagToPostConnectionEdge',
      'UserToPostConnectionEdge',
    ],
    PostConnectionPageInfo: [
      'CategoryToPostConnectionPageInfo',
      'PostFormatToPostConnectionPageInfo',
      'PostToRevisionConnectionPageInfo',
      'RootQueryToPostConnectionPageInfo',
      'TagToPostConnectionPageInfo',
      'UserToPostConnectionPageInfo',
    ],
    TaxonomyConnectionEdge: [
      'CategoryToTaxonomyConnectionEdge',
      'ContentTypeToTaxonomyConnectionEdge',
      'PostFormatToTaxonomyConnectionEdge',
      'RootQueryToTaxonomyConnectionEdge',
      'TagToTaxonomyConnectionEdge',
    ],
    Commenter: ['CommentAuthor', 'User'],
    CommentConnection: [
      'CommentToCommentConnection',
      'MediaItemToCommentConnection',
      'PageToCommentConnection',
      'PostToCommentConnection',
      'RootQueryToCommentConnection',
      'UserToCommentConnection',
    ],
    CommentConnectionEdge: [
      'CommentToCommentConnectionEdge',
      'CommentToParentCommentConnectionEdge',
      'MediaItemToCommentConnectionEdge',
      'PageToCommentConnectionEdge',
      'PostToCommentConnectionEdge',
      'RootQueryToCommentConnectionEdge',
      'UserToCommentConnectionEdge',
    ],
    CommentConnectionPageInfo: [
      'CommentToCommentConnectionPageInfo',
      'MediaItemToCommentConnectionPageInfo',
      'PageToCommentConnectionPageInfo',
      'PostToCommentConnectionPageInfo',
      'RootQueryToCommentConnectionPageInfo',
      'UserToCommentConnectionPageInfo',
    ],
    CommenterConnectionEdge: ['CommentToCommenterConnectionEdge'],
    ContentTypeConnectionEdge: [
      'ContentNodeToContentTypeConnectionEdge',
      'RootQueryToContentTypeConnectionEdge',
      'TaxonomyToContentTypeConnectionEdge',
    ],
    UserConnectionEdge: [
      'ContentNodeToEditLastConnectionEdge',
      'ContentNodeToEditLockConnectionEdge',
      'NodeWithAuthorToUserConnectionEdge',
      'RootQueryToUserConnectionEdge',
    ],
    EnqueuedScriptConnection: [
      'ContentNodeToEnqueuedScriptConnection',
      'RootQueryToEnqueuedScriptConnection',
      'TermNodeToEnqueuedScriptConnection',
      'UserToEnqueuedScriptConnection',
    ],
    EnqueuedScriptConnectionEdge: [
      'ContentNodeToEnqueuedScriptConnectionEdge',
      'RootQueryToEnqueuedScriptConnectionEdge',
      'TermNodeToEnqueuedScriptConnectionEdge',
      'UserToEnqueuedScriptConnectionEdge',
    ],
    EnqueuedScriptConnectionPageInfo: [
      'ContentNodeToEnqueuedScriptConnectionPageInfo',
      'RootQueryToEnqueuedScriptConnectionPageInfo',
      'TermNodeToEnqueuedScriptConnectionPageInfo',
      'UserToEnqueuedScriptConnectionPageInfo',
    ],
    EnqueuedStylesheetConnection: [
      'ContentNodeToEnqueuedStylesheetConnection',
      'RootQueryToEnqueuedStylesheetConnection',
      'TermNodeToEnqueuedStylesheetConnection',
      'UserToEnqueuedStylesheetConnection',
    ],
    EnqueuedStylesheetConnectionEdge: [
      'ContentNodeToEnqueuedStylesheetConnectionEdge',
      'RootQueryToEnqueuedStylesheetConnectionEdge',
      'TermNodeToEnqueuedStylesheetConnectionEdge',
      'UserToEnqueuedStylesheetConnectionEdge',
    ],
    EnqueuedStylesheetConnectionPageInfo: [
      'ContentNodeToEnqueuedStylesheetConnectionPageInfo',
      'RootQueryToEnqueuedStylesheetConnectionPageInfo',
      'TermNodeToEnqueuedStylesheetConnectionPageInfo',
      'UserToEnqueuedStylesheetConnectionPageInfo',
    ],
    TaxonomyConnection: [
      'ContentTypeToTaxonomyConnection',
      'RootQueryToTaxonomyConnection',
    ],
    TaxonomyConnectionPageInfo: [
      'ContentTypeToTaxonomyConnectionPageInfo',
      'RootQueryToTaxonomyConnectionPageInfo',
    ],
    ContentTemplate: ['DefaultTemplate'],
    EnqueuedAsset: ['EnqueuedScript', 'EnqueuedStylesheet'],
    ContentNode: ['MediaItem', 'Page', 'Post'],
    HierarchicalContentNode: ['MediaItem', 'Page'],
    NodeWithAuthor: ['MediaItem', 'Page', 'Post'],
    NodeWithComments: ['MediaItem', 'Page', 'Post'],
    NodeWithTemplate: ['MediaItem', 'Page', 'Post'],
    NodeWithTitle: ['MediaItem', 'Page', 'Post'],
    MenuItemObjectUnion: ['Category', 'Page', 'Post', 'PostFormat', 'Tag'],
    MenuConnectionEdge: [
      'MenuItemToMenuConnectionEdge',
      'RootQueryToMenuConnectionEdge',
    ],
    MenuItemConnection: [
      'MenuItemToMenuItemConnection',
      'MenuToMenuItemConnection',
      'RootQueryToMenuItemConnection',
    ],
    MenuItemConnectionEdge: [
      'MenuItemToMenuItemConnectionEdge',
      'MenuToMenuItemConnectionEdge',
      'RootQueryToMenuItemConnectionEdge',
    ],
    MenuItemConnectionPageInfo: [
      'MenuItemToMenuItemConnectionPageInfo',
      'MenuToMenuItemConnectionPageInfo',
      'RootQueryToMenuItemConnectionPageInfo',
    ],
    MenuItemLinkableConnectionEdge: [
      'MenuItemToMenuItemLinkableConnectionEdge',
    ],
    MediaItemConnectionEdge: [
      'NodeWithFeaturedImageToMediaItemConnectionEdge',
      'RootQueryToMediaItemConnectionEdge',
      'UserToMediaItemConnectionEdge',
    ],
    NodeWithContentEditor: ['Page', 'Post'],
    NodeWithFeaturedImage: ['Page', 'Post'],
    NodeWithPageAttributes: ['Page'],
    NodeWithRevisions: ['Page', 'Post'],
    Previewable: ['Page', 'Post'],
    PageConnectionEdge: [
      'PageToPreviewConnectionEdge',
      'PageToRevisionConnectionEdge',
      'RootQueryToPageConnectionEdge',
      'UserToPageConnectionEdge',
    ],
    PageConnection: [
      'PageToRevisionConnection',
      'RootQueryToPageConnection',
      'UserToPageConnection',
    ],
    PageConnectionPageInfo: [
      'PageToRevisionConnectionPageInfo',
      'RootQueryToPageConnectionPageInfo',
      'UserToPageConnectionPageInfo',
    ],
    NodeWithExcerpt: ['Post'],
    NodeWithTrackbacks: ['Post'],
    PostFormatConnection: [
      'PostToPostFormatConnection',
      'RootQueryToPostFormatConnection',
    ],
    PostFormatConnectionEdge: [
      'PostToPostFormatConnectionEdge',
      'RootQueryToPostFormatConnectionEdge',
    ],
    PostFormatConnectionPageInfo: [
      'PostToPostFormatConnectionPageInfo',
      'RootQueryToPostFormatConnectionPageInfo',
    ],
    TagConnection: ['PostToTagConnection', 'RootQueryToTagConnection'],
    TagConnectionEdge: [
      'PostToTagConnectionEdge',
      'RootQueryToTagConnectionEdge',
    ],
    TagConnectionPageInfo: [
      'PostToTagConnectionPageInfo',
      'RootQueryToTagConnectionPageInfo',
    ],
    TermNodeConnection: [
      'PostToTermNodeConnection',
      'RootQueryToTermNodeConnection',
      'TaxonomyToTermNodeConnection',
    ],
    TermNodeConnectionEdge: [
      'PostToTermNodeConnectionEdge',
      'RootQueryToTermNodeConnectionEdge',
      'TaxonomyToTermNodeConnectionEdge',
    ],
    TermNodeConnectionPageInfo: [
      'PostToTermNodeConnectionPageInfo',
      'RootQueryToTermNodeConnectionPageInfo',
      'TaxonomyToTermNodeConnectionPageInfo',
    ],
    ContentTypeConnection: [
      'RootQueryToContentTypeConnection',
      'TaxonomyToContentTypeConnection',
    ],
    ContentTypeConnectionPageInfo: [
      'RootQueryToContentTypeConnectionPageInfo',
      'TaxonomyToContentTypeConnectionPageInfo',
    ],
    MediaItemConnection: [
      'RootQueryToMediaItemConnection',
      'UserToMediaItemConnection',
    ],
    MediaItemConnectionPageInfo: [
      'RootQueryToMediaItemConnectionPageInfo',
      'UserToMediaItemConnectionPageInfo',
    ],
    MenuConnection: ['RootQueryToMenuConnection'],
    MenuConnectionPageInfo: ['RootQueryToMenuConnectionPageInfo'],
    PluginConnection: ['RootQueryToPluginConnection'],
    PluginConnectionEdge: ['RootQueryToPluginConnectionEdge'],
    PluginConnectionPageInfo: ['RootQueryToPluginConnectionPageInfo'],
    ThemeConnection: ['RootQueryToThemeConnection'],
    ThemeConnectionEdge: ['RootQueryToThemeConnectionEdge'],
    ThemeConnectionPageInfo: ['RootQueryToThemeConnectionPageInfo'],
    UserConnection: ['RootQueryToUserConnection'],
    UserConnectionPageInfo: ['RootQueryToUserConnectionPageInfo'],
    UserRoleConnection: [
      'RootQueryToUserRoleConnection',
      'UserToUserRoleConnection',
    ],
    UserRoleConnectionEdge: [
      'RootQueryToUserRoleConnectionEdge',
      'UserToUserRoleConnectionEdge',
    ],
    UserRoleConnectionPageInfo: [
      'RootQueryToUserRoleConnectionPageInfo',
      'UserToUserRoleConnectionPageInfo',
    ],
  },
} as const;

/**
 * Avatars are profile images for users. WordPress by default uses the Gravatar service to host and fetch avatars from.
 */
export interface Avatar {
  __typename?: 'Avatar';
  /**
   * URL for the default image or a default type. Accepts &#039;404&#039; (return a 404 instead of a default image), &#039;retro&#039; (8bit), &#039;monsterid&#039; (monster), &#039;wavatar&#039; (cartoon face), &#039;indenticon&#039; (the &#039;quilt&#039;), &#039;mystery&#039;, &#039;mm&#039;, or &#039;mysteryman&#039; (The Oyster Man), &#039;blank&#039; (transparent GIF), or &#039;gravatar_default&#039; (the Gravatar logo).
   */
  default?: Maybe<ScalarsEnums['String']>;
  /**
   * HTML attributes to insert in the IMG element. Is not sanitized.
   */
  extraAttr?: Maybe<ScalarsEnums['String']>;
  /**
   * Whether to always show the default image, never the Gravatar.
   */
  forceDefault?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the avatar was successfully found.
   */
  foundAvatar?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Height of the avatar image.
   */
  height?: Maybe<ScalarsEnums['Int']>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * What rating to display avatars up to. Accepts &#039;G&#039;, &#039;PG&#039;, &#039;R&#039;, &#039;X&#039;, and are judged in that order.
   */
  rating?: Maybe<ScalarsEnums['String']>;
  /**
   * Type of url scheme to use. Typically HTTP vs. HTTPS.
   */
  scheme?: Maybe<ScalarsEnums['String']>;
  /**
   * The size of the avatar in pixels. A value of 96 will match a 96px x 96px gravatar image.
   */
  size?: Maybe<ScalarsEnums['Int']>;
  /**
   * URL for the gravatar image source.
   */
  url?: Maybe<ScalarsEnums['String']>;
  /**
   * Width of the avatar image.
   */
  width?: Maybe<ScalarsEnums['Int']>;
}

/**
 * The category type
 */
export interface Category {
  __typename?: 'Category';
  /**
   * The ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root).
   */
  ancestors: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<CategoryToAncestorsCategoryConnection>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of databaseId
   */
  categoryId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Connection between the category type and its children categories.
   */
  children: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<CategoryToCategoryConnectionWhereArgs>;
  }) => Maybe<CategoryToCategoryConnection>;
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the Category type and the ContentNode type
   */
  contentNodes: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<CategoryToContentNodeConnectionWhereArgs>;
  }) => Maybe<CategoryToContentNodeConnection>;
  /**
   * The number of objects connected to the object
   */
  count?: Maybe<ScalarsEnums['Int']>;
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * The description of the object
   */
  description?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the TermNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<TermNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the TermNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<TermNodeToEnqueuedStylesheetConnection>;
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  /**
   * The link to the term
   */
  link?: Maybe<ScalarsEnums['String']>;
  /**
   * The human friendly name of the object.
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the category type and its parent category.
   */
  parent?: Maybe<CategoryToParentCategoryConnectionEdge>;
  /**
   * Database id of the parent node
   */
  parentDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The globally unique identifier of the parent node.
   */
  parentId?: Maybe<ScalarsEnums['ID']>;
  /**
   * Connection between the Category type and the post type
   */
  posts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<CategoryToPostConnectionWhereArgs>;
  }) => Maybe<CategoryToPostConnection>;
  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the Category type and the Taxonomy type
   */
  taxonomy?: Maybe<CategoryToTaxonomyConnectionEdge>;
  /**
   * The name of the taxonomy that the object is associated with
   */
  taxonomyName?: Maybe<ScalarsEnums['String']>;
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The ID of the term group that this term object belongs to
   */
  termGroupId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The taxonomy ID that the object is associated with
   */
  termTaxonomyId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to category Nodes
 */
export interface CategoryConnection {
  __typename?:
    | 'CategoryToAncestorsCategoryConnection'
    | 'CategoryToCategoryConnection'
    | 'PostToCategoryConnection'
    | 'RootQueryToCategoryConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected category Nodes
   */
  edges: Array<CategoryConnectionEdge>;
  /**
   * A list of connected category Nodes
   */
  nodes: Array<Category>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: CategoryConnectionPageInfo;
  $on: $CategoryConnection;
}

/**
 * Edge between a Node and a connected category
 */
export interface CategoryConnectionEdge {
  __typename?:
    | 'CategoryToAncestorsCategoryConnectionEdge'
    | 'CategoryToCategoryConnectionEdge'
    | 'CategoryToParentCategoryConnectionEdge'
    | 'PostToCategoryConnectionEdge'
    | 'RootQueryToCategoryConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected category Node
   */
  node: Category;
  $on: $CategoryConnectionEdge;
}

/**
 * Page Info on the connected CategoryConnectionEdge
 */
export interface CategoryConnectionPageInfo {
  __typename?:
    | 'CategoryToAncestorsCategoryConnectionPageInfo'
    | 'CategoryToCategoryConnectionPageInfo'
    | 'PostToCategoryConnectionPageInfo'
    | 'RootQueryToCategoryConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $CategoryConnectionPageInfo;
}

/**
 * Connection between the Category type and the category type
 */
export interface CategoryToAncestorsCategoryConnection {
  __typename?: 'CategoryToAncestorsCategoryConnection';
  /**
   * Edges for the CategoryToAncestorsCategoryConnection connection
   */
  edges: Array<CategoryToAncestorsCategoryConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Category>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: CategoryToAncestorsCategoryConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface CategoryToAncestorsCategoryConnectionEdge {
  __typename?: 'CategoryToAncestorsCategoryConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Category;
}

/**
 * Page Info on the &quot;CategoryToAncestorsCategoryConnection&quot;
 */
export interface CategoryToAncestorsCategoryConnectionPageInfo {
  __typename?: 'CategoryToAncestorsCategoryConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Category type and the category type
 */
export interface CategoryToCategoryConnection {
  __typename?: 'CategoryToCategoryConnection';
  /**
   * Edges for the CategoryToCategoryConnection connection
   */
  edges: Array<CategoryToCategoryConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Category>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: CategoryToCategoryConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface CategoryToCategoryConnectionEdge {
  __typename?: 'CategoryToCategoryConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Category;
}

/**
 * Page Info on the &quot;CategoryToCategoryConnection&quot;
 */
export interface CategoryToCategoryConnectionPageInfo {
  __typename?: 'CategoryToCategoryConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Category type and the ContentNode type
 */
export interface CategoryToContentNodeConnection {
  __typename?: 'CategoryToContentNodeConnection';
  /**
   * Edges for the CategoryToContentNodeConnection connection
   */
  edges: Array<CategoryToContentNodeConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<ContentNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: CategoryToContentNodeConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface CategoryToContentNodeConnectionEdge {
  __typename?: 'CategoryToContentNodeConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: ContentNode;
}

/**
 * Page Info on the &quot;CategoryToContentNodeConnection&quot;
 */
export interface CategoryToContentNodeConnectionPageInfo {
  __typename?: 'CategoryToContentNodeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Category type and the category type
 */
export interface CategoryToParentCategoryConnectionEdge {
  __typename?: 'CategoryToParentCategoryConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: Category;
}

/**
 * Connection between the Category type and the post type
 */
export interface CategoryToPostConnection {
  __typename?: 'CategoryToPostConnection';
  /**
   * Edges for the CategoryToPostConnection connection
   */
  edges: Array<CategoryToPostConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Post>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: CategoryToPostConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface CategoryToPostConnectionEdge {
  __typename?: 'CategoryToPostConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Post;
}

/**
 * Page Info on the &quot;CategoryToPostConnection&quot;
 */
export interface CategoryToPostConnectionPageInfo {
  __typename?: 'CategoryToPostConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Category type and the Taxonomy type
 */
export interface CategoryToTaxonomyConnectionEdge {
  __typename?: 'CategoryToTaxonomyConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: Taxonomy;
}

/**
 * A Comment object
 */
export interface Comment {
  __typename?: 'Comment';
  /**
   * User agent used to post the comment. This field is equivalent to WP_Comment-&gt;comment_agent and the value matching the &quot;comment_agent&quot; column in SQL.
   */
  agent?: Maybe<ScalarsEnums['String']>;
  /**
   * The approval status of the comment. This field is equivalent to WP_Comment-&gt;comment_approved and the value matching the &quot;comment_approved&quot; column in SQL.
   * @deprecated Deprecated in favor of the `status` field
   */
  approved?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The author of the comment
   */
  author?: Maybe<CommentToCommenterConnectionEdge>;
  /**
   * IP address for the author. This field is equivalent to WP_Comment-&gt;comment_author_IP and the value matching the &quot;comment_author_IP&quot; column in SQL.
   */
  authorIp?: Maybe<ScalarsEnums['String']>;
  /**
   * ID for the comment, unique among comments.
   * @deprecated Deprecated in favor of databaseId
   */
  commentId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Connection between the Comment type and the ContentNode type
   */
  commentedOn?: Maybe<CommentToContentNodeConnectionEdge>;
  /**
   * Content of the comment. This field is equivalent to WP_Comment-&gt;comment_content and the value matching the &quot;comment_content&quot; column in SQL.
   */
  content: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * Date the comment was posted in local time. This field is equivalent to WP_Comment-&gt;date and the value matching the &quot;date&quot; column in SQL.
   */
  date?: Maybe<ScalarsEnums['String']>;
  /**
   * Date the comment was posted in GMT. This field is equivalent to WP_Comment-&gt;date_gmt and the value matching the &quot;date_gmt&quot; column in SQL.
   */
  dateGmt?: Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique identifier for the comment object
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Karma value for the comment. This field is equivalent to WP_Comment-&gt;comment_karma and the value matching the &quot;comment_karma&quot; column in SQL.
   */
  karma?: Maybe<ScalarsEnums['Int']>;
  /**
   * Connection between the Comment type and the Comment type
   */
  parent: (args?: {
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<CommentToParentCommentConnectionWhereArgs>;
  }) => Maybe<CommentToParentCommentConnectionEdge>;
  /**
   * The database id of the parent comment node or null if it is the root comment
   */
  parentDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The globally unique identifier of the parent comment node.
   */
  parentId?: Maybe<ScalarsEnums['ID']>;
  /**
   * Connection between the Comment type and the Comment type
   */
  replies: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<CommentToCommentConnectionWhereArgs>;
  }) => Maybe<CommentToCommentConnection>;
  /**
   * The approval status of the comment. This field is equivalent to WP_Comment-&gt;comment_approved and the value matching the &quot;comment_approved&quot; column in SQL.
   */
  status?: Maybe<ScalarsEnums['CommentStatusEnum']>;
  /**
   * Type of comment. This field is equivalent to WP_Comment-&gt;comment_type and the value matching the &quot;comment_type&quot; column in SQL.
   */
  type?: Maybe<ScalarsEnums['String']>;
}

/**
 * A Comment Author object
 */
export interface CommentAuthor {
  __typename?: 'CommentAuthor';
  /**
   * Avatar object for user. The avatar object can be retrieved in different sizes by specifying the size argument.
   */
  avatar: (args?: {
    /**
     * Whether to always show the default image, never the Gravatar. Default false
     */
    forceDefault?: Maybe<Scalars['Boolean']>;
    /**
     * The rating level of the avatar.
     */
    rating?: Maybe<AvatarRatingEnum>;
    /**
     * The size attribute of the avatar field can be used to fetch avatars of different sizes. The value corresponds to the dimension in pixels to fetch. The default is 96 pixels.
     * @defaultValue `96`
     */
    size?: Maybe<Scalars['Int']>;
  }) => Maybe<Avatar>;
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * The email for the comment author
   */
  email?: Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique identifier for the comment author object
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The name for the comment author.
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * The url the comment author.
   */
  url?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to Comment Nodes
 */
export interface CommentConnection {
  __typename?:
    | 'CommentToCommentConnection'
    | 'MediaItemToCommentConnection'
    | 'PageToCommentConnection'
    | 'PostToCommentConnection'
    | 'RootQueryToCommentConnection'
    | 'UserToCommentConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected Comment Nodes
   */
  edges: Array<CommentConnectionEdge>;
  /**
   * A list of connected Comment Nodes
   */
  nodes: Array<Comment>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: CommentConnectionPageInfo;
  $on: $CommentConnection;
}

/**
 * Edge between a Node and a connected Comment
 */
export interface CommentConnectionEdge {
  __typename?:
    | 'CommentToCommentConnectionEdge'
    | 'CommentToParentCommentConnectionEdge'
    | 'MediaItemToCommentConnectionEdge'
    | 'PageToCommentConnectionEdge'
    | 'PostToCommentConnectionEdge'
    | 'RootQueryToCommentConnectionEdge'
    | 'UserToCommentConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected Comment Node
   */
  node: Comment;
  $on: $CommentConnectionEdge;
}

/**
 * Page Info on the connected CommentConnectionEdge
 */
export interface CommentConnectionPageInfo {
  __typename?:
    | 'CommentToCommentConnectionPageInfo'
    | 'MediaItemToCommentConnectionPageInfo'
    | 'PageToCommentConnectionPageInfo'
    | 'PostToCommentConnectionPageInfo'
    | 'RootQueryToCommentConnectionPageInfo'
    | 'UserToCommentConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $CommentConnectionPageInfo;
}

/**
 * Connection between the Comment type and the Comment type
 */
export interface CommentToCommentConnection {
  __typename?: 'CommentToCommentConnection';
  /**
   * Edges for the CommentToCommentConnection connection
   */
  edges: Array<CommentToCommentConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Comment>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: CommentToCommentConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface CommentToCommentConnectionEdge {
  __typename?: 'CommentToCommentConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Comment;
}

/**
 * Page Info on the &quot;CommentToCommentConnection&quot;
 */
export interface CommentToCommentConnectionPageInfo {
  __typename?: 'CommentToCommentConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Comment type and the Commenter type
 */
export interface CommentToCommenterConnectionEdge {
  __typename?: 'CommentToCommenterConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: Commenter;
}

/**
 * Connection between the Comment type and the ContentNode type
 */
export interface CommentToContentNodeConnectionEdge {
  __typename?: 'CommentToContentNodeConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: ContentNode;
}

/**
 * Connection between the Comment type and the Comment type
 */
export interface CommentToParentCommentConnectionEdge {
  __typename?: 'CommentToParentCommentConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: Comment;
}

/**
 * The author of a comment
 */
export interface Commenter {
  __typename?: 'CommentAuthor' | 'User';
  /**
   * Avatar object for user. The avatar object can be retrieved in different sizes by specifying the size argument.
   */
  avatar?: Maybe<Avatar>;
  /**
   * Identifies the primary key from the database.
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * The email address of the author of a comment.
   */
  email?: Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique identifier for the comment author.
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the author information is considered restricted. (not fully public)
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The name of the author of a comment.
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * The url of the author of a comment.
   */
  url?: Maybe<ScalarsEnums['String']>;
  $on: $Commenter;
}

/**
 * Edge between a Node and a connected Commenter
 */
export interface CommenterConnectionEdge {
  __typename?: 'CommentToCommenterConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected Commenter Node
   */
  node: Commenter;
  $on: $CommenterConnectionEdge;
}

/**
 * GraphQL representation of WordPress Conditional Tags.
 */
export interface ConditionalTags {
  __typename?: 'ConditionalTags';
  /**
   * Determines whether the query is for an existing archive page.
   */
  isArchive?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for an existing attachment page.
   */
  isAttachment?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for an existing author archive page.
   */
  isAuthor?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for an existing category archive page.
   */
  isCategory?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for an existing date archive.
   */
  isDate?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for an existing day archive.
   */
  isDay?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for the front page of the site.
   */
  isFrontPage?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for the blog homepage.
   */
  isHome?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for an existing month archive.
   */
  isMonth?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether this site has more than one author.
   */
  isMultiAuthor?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for an existing single page.
   */
  isPage?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether currently in a page template.
   */
  isPageTemplate?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for an existing post type archive page.
   */
  isPostTypeArchive?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for a post or page preview.
   */
  isPreview?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for the Privacy Policy page.
   */
  isPrivacyPolicy?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for a search.
   */
  isSearch?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for an existing single post.
   */
  isSingle?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for an existing single post of any post type (post, attachment, page, custom post types).
   */
  isSingular?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether a post is sticky.
   */
  isSticky?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for an existing tag archive page.
   */
  isTag?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for an existing custom taxonomy archive page.
   */
  isTax?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Determines whether the query is for an existing year archive.
   */
  isYear?: Maybe<ScalarsEnums['Boolean']>;
}

/**
 * A plural connection from one Node Type in the Graph to another Node Type, with support for relational data via &quot;edges&quot;.
 */
export interface Connection {
  __typename?:
    | 'CategoryToAncestorsCategoryConnection'
    | 'CategoryToCategoryConnection'
    | 'CategoryToContentNodeConnection'
    | 'CategoryToPostConnection'
    | 'CommentToCommentConnection'
    | 'ContentNodeToEnqueuedScriptConnection'
    | 'ContentNodeToEnqueuedStylesheetConnection'
    | 'ContentTypeToContentNodeConnection'
    | 'ContentTypeToTaxonomyConnection'
    | 'HierarchicalContentNodeToContentNodeAncestorsConnection'
    | 'HierarchicalContentNodeToContentNodeChildrenConnection'
    | 'MediaItemToCommentConnection'
    | 'MenuItemToMenuItemConnection'
    | 'MenuToMenuItemConnection'
    | 'PageToCommentConnection'
    | 'PageToRevisionConnection'
    | 'PostFormatToContentNodeConnection'
    | 'PostFormatToPostConnection'
    | 'PostToCategoryConnection'
    | 'PostToCommentConnection'
    | 'PostToPostFormatConnection'
    | 'PostToRevisionConnection'
    | 'PostToTagConnection'
    | 'PostToTermNodeConnection'
    | 'RootQueryToCategoryConnection'
    | 'RootQueryToCommentConnection'
    | 'RootQueryToContentNodeConnection'
    | 'RootQueryToContentTypeConnection'
    | 'RootQueryToEnqueuedScriptConnection'
    | 'RootQueryToEnqueuedStylesheetConnection'
    | 'RootQueryToMediaItemConnection'
    | 'RootQueryToMenuConnection'
    | 'RootQueryToMenuItemConnection'
    | 'RootQueryToPageConnection'
    | 'RootQueryToPluginConnection'
    | 'RootQueryToPostConnection'
    | 'RootQueryToPostFormatConnection'
    | 'RootQueryToRevisionsConnection'
    | 'RootQueryToTagConnection'
    | 'RootQueryToTaxonomyConnection'
    | 'RootQueryToTermNodeConnection'
    | 'RootQueryToThemeConnection'
    | 'RootQueryToUserConnection'
    | 'RootQueryToUserRoleConnection'
    | 'TagToContentNodeConnection'
    | 'TagToPostConnection'
    | 'TaxonomyToContentTypeConnection'
    | 'TaxonomyToTermNodeConnection'
    | 'TermNodeToEnqueuedScriptConnection'
    | 'TermNodeToEnqueuedStylesheetConnection'
    | 'UserToCommentConnection'
    | 'UserToEnqueuedScriptConnection'
    | 'UserToEnqueuedStylesheetConnection'
    | 'UserToMediaItemConnection'
    | 'UserToPageConnection'
    | 'UserToPostConnection'
    | 'UserToRevisionsConnection'
    | 'UserToUserRoleConnection';
  /**
   * A list of edges (relational context) between connected nodes
   */
  edges: Array<Edge>;
  /**
   * A list of connected nodes
   */
  nodes: Array<Node>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PageInfo;
  $on: $Connection;
}

/**
 * Nodes used to manage content
 */
export interface ContentNode {
  __typename?: 'MediaItem' | 'Page' | 'Post';
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums['String'];
  /**
   * The ID of the node in the database.
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums['String']>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums['String']>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums['String']>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums['String']>;
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums['String']>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums['String']>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums['String']>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums['String']>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums['String']>;
  /**
   * The template assigned to a node of content
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
  $on: $ContentNode;
}

/**
 * Connection to ContentNode Nodes
 */
export interface ContentNodeConnection {
  __typename?:
    | 'CategoryToContentNodeConnection'
    | 'ContentTypeToContentNodeConnection'
    | 'HierarchicalContentNodeToContentNodeAncestorsConnection'
    | 'HierarchicalContentNodeToContentNodeChildrenConnection'
    | 'PostFormatToContentNodeConnection'
    | 'RootQueryToContentNodeConnection'
    | 'RootQueryToRevisionsConnection'
    | 'TagToContentNodeConnection'
    | 'UserToRevisionsConnection';
  /**
   * A list of edges (relational context) between ContentType and connected ContentNode Nodes
   */
  edges: Array<ContentNodeConnectionEdge>;
  /**
   * A list of connected ContentNode Nodes
   */
  nodes: Array<ContentNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: ContentNodeConnectionPageInfo;
  $on: $ContentNodeConnection;
}

/**
 * Edge between a Node and a connected ContentNode
 */
export interface ContentNodeConnectionEdge {
  __typename?:
    | 'CategoryToContentNodeConnectionEdge'
    | 'CommentToContentNodeConnectionEdge'
    | 'ContentTypeToContentNodeConnectionEdge'
    | 'HierarchicalContentNodeToContentNodeAncestorsConnectionEdge'
    | 'HierarchicalContentNodeToContentNodeChildrenConnectionEdge'
    | 'HierarchicalContentNodeToParentContentNodeConnectionEdge'
    | 'NodeWithRevisionsToContentNodeConnectionEdge'
    | 'PostFormatToContentNodeConnectionEdge'
    | 'RootQueryToContentNodeConnectionEdge'
    | 'RootQueryToRevisionsConnectionEdge'
    | 'TagToContentNodeConnectionEdge'
    | 'UserToRevisionsConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected ContentNode Node
   */
  node: ContentNode;
  $on: $ContentNodeConnectionEdge;
}

/**
 * Page Info on the connected ContentNodeConnectionEdge
 */
export interface ContentNodeConnectionPageInfo {
  __typename?:
    | 'CategoryToContentNodeConnectionPageInfo'
    | 'ContentTypeToContentNodeConnectionPageInfo'
    | 'HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo'
    | 'HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo'
    | 'PostFormatToContentNodeConnectionPageInfo'
    | 'RootQueryToContentNodeConnectionPageInfo'
    | 'RootQueryToRevisionsConnectionPageInfo'
    | 'TagToContentNodeConnectionPageInfo'
    | 'UserToRevisionsConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $ContentNodeConnectionPageInfo;
}

/**
 * Connection between the ContentNode type and the ContentType type
 */
export interface ContentNodeToContentTypeConnectionEdge {
  __typename?: 'ContentNodeToContentTypeConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: ContentType;
}

/**
 * Connection between the ContentNode type and the User type
 */
export interface ContentNodeToEditLastConnectionEdge {
  __typename?: 'ContentNodeToEditLastConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: User;
}

/**
 * Connection between the ContentNode type and the User type
 */
export interface ContentNodeToEditLockConnectionEdge {
  __typename?: 'ContentNodeToEditLockConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The timestamp for when the node was last edited
   */
  lockTimestamp?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: User;
}

/**
 * Connection between the ContentNode type and the EnqueuedScript type
 */
export interface ContentNodeToEnqueuedScriptConnection {
  __typename?: 'ContentNodeToEnqueuedScriptConnection';
  /**
   * Edges for the ContentNodeToEnqueuedScriptConnection connection
   */
  edges: Array<ContentNodeToEnqueuedScriptConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<EnqueuedScript>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: ContentNodeToEnqueuedScriptConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface ContentNodeToEnqueuedScriptConnectionEdge {
  __typename?: 'ContentNodeToEnqueuedScriptConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: EnqueuedScript;
}

/**
 * Page Info on the &quot;ContentNodeToEnqueuedScriptConnection&quot;
 */
export interface ContentNodeToEnqueuedScriptConnectionPageInfo {
  __typename?: 'ContentNodeToEnqueuedScriptConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the ContentNode type and the EnqueuedStylesheet type
 */
export interface ContentNodeToEnqueuedStylesheetConnection {
  __typename?: 'ContentNodeToEnqueuedStylesheetConnection';
  /**
   * Edges for the ContentNodeToEnqueuedStylesheetConnection connection
   */
  edges: Array<ContentNodeToEnqueuedStylesheetConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<EnqueuedStylesheet>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: ContentNodeToEnqueuedStylesheetConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface ContentNodeToEnqueuedStylesheetConnectionEdge {
  __typename?: 'ContentNodeToEnqueuedStylesheetConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: EnqueuedStylesheet;
}

/**
 * Page Info on the &quot;ContentNodeToEnqueuedStylesheetConnection&quot;
 */
export interface ContentNodeToEnqueuedStylesheetConnectionPageInfo {
  __typename?: 'ContentNodeToEnqueuedStylesheetConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * The template assigned to a node of content
 */
export interface ContentTemplate {
  __typename?: 'DefaultTemplate';
  /**
   * The name of the template
   */
  templateName?: Maybe<ScalarsEnums['String']>;
  $on: $ContentTemplate;
}

/**
 * An Post Type object
 */
export interface ContentType {
  __typename?: 'ContentType';
  /**
   * Whether this content type should can be exported.
   */
  canExport?: Maybe<ScalarsEnums['Boolean']>;
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the ContentType type and the Taxonomy type
   */
  connectedTaxonomies: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<ContentTypeToTaxonomyConnection>;
  /**
   * Connection between the ContentType type and the ContentNode type
   */
  contentNodes: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<ContentTypeToContentNodeConnectionWhereArgs>;
  }) => Maybe<ContentTypeToContentNodeConnection>;
  /**
   * Whether content of this type should be deleted when the author of it is deleted from the system.
   */
  deleteWithUser?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Description of the content type.
   */
  description?: Maybe<ScalarsEnums['String']>;
  /**
   * Whether to exclude nodes of this content type from front end search results.
   */
  excludeFromSearch?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The plural name of the content type within the GraphQL Schema.
   */
  graphqlPluralName?: Maybe<ScalarsEnums['String']>;
  /**
   * The singular name of the content type within the GraphQL Schema.
   */
  graphqlSingleName?: Maybe<ScalarsEnums['String']>;
  /**
   * Whether this content type should have archives. Content archives are generated by type and by date.
   */
  hasArchive?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the content type is hierarchical, for example pages.
   */
  hierarchical?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The globally unique identifier of the post-type object.
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether this page is set to the static front page.
   */
  isFrontPage: ScalarsEnums['Boolean'];
  /**
   * Whether this page is set to the blog posts page.
   */
  isPostsPage: ScalarsEnums['Boolean'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  /**
   * Display name of the content type.
   */
  label?: Maybe<ScalarsEnums['String']>;
  /**
   * Details about the content type labels.
   */
  labels?: Maybe<PostTypeLabelDetails>;
  /**
   * The name of the icon file to display as a menu icon.
   */
  menuIcon?: Maybe<ScalarsEnums['String']>;
  /**
   * The position of this post type in the menu. Only applies if show_in_menu is true.
   */
  menuPosition?: Maybe<ScalarsEnums['Int']>;
  /**
   * The internal name of the post type. This should not be used for display purposes.
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * Whether a content type is intended for use publicly either via the admin interface or by front-end users. While the default settings of exclude_from_search, publicly_queryable, show_ui, and show_in_nav_menus are inherited from public, each does not rely on this relationship and controls a very specific intention.
   */
  public?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether queries can be performed on the front end for the content type as part of parse_request().
   */
  publiclyQueryable?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Name of content type to display in REST API &quot;wp/v2&quot; namespace.
   */
  restBase?: Maybe<ScalarsEnums['String']>;
  /**
   * The REST Controller class assigned to handling this content type.
   */
  restControllerClass?: Maybe<ScalarsEnums['String']>;
  /**
   * Makes this content type available via the admin bar.
   */
  showInAdminBar?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether to add the content type to the GraphQL Schema.
   */
  showInGraphql?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Where to show the content type in the admin menu. To work, $show_ui must be true. If true, the post type is shown in its own top level menu. If false, no menu is shown. If a string of an existing top level menu (eg. &quot;tools.php&quot; or &quot;edit.php?post_type=page&quot;), the post type will be placed as a sub-menu of that.
   */
  showInMenu?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Makes this content type available for selection in navigation menus.
   */
  showInNavMenus?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the content type is associated with a route under the the REST API &quot;wp/v2&quot; namespace.
   */
  showInRest?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether to generate and allow a UI for managing this content type in the admin.
   */
  showUi?: Maybe<ScalarsEnums['Boolean']>;
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to ContentType Nodes
 */
export interface ContentTypeConnection {
  __typename?:
    | 'RootQueryToContentTypeConnection'
    | 'TaxonomyToContentTypeConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected ContentType Nodes
   */
  edges: Array<ContentTypeConnectionEdge>;
  /**
   * A list of connected ContentType Nodes
   */
  nodes: Array<ContentType>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: ContentTypeConnectionPageInfo;
  $on: $ContentTypeConnection;
}

/**
 * Edge between a Node and a connected ContentType
 */
export interface ContentTypeConnectionEdge {
  __typename?:
    | 'ContentNodeToContentTypeConnectionEdge'
    | 'RootQueryToContentTypeConnectionEdge'
    | 'TaxonomyToContentTypeConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected ContentType Node
   */
  node: ContentType;
  $on: $ContentTypeConnectionEdge;
}

/**
 * Page Info on the connected ContentTypeConnectionEdge
 */
export interface ContentTypeConnectionPageInfo {
  __typename?:
    | 'RootQueryToContentTypeConnectionPageInfo'
    | 'TaxonomyToContentTypeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $ContentTypeConnectionPageInfo;
}

/**
 * Connection between the ContentType type and the ContentNode type
 */
export interface ContentTypeToContentNodeConnection {
  __typename?: 'ContentTypeToContentNodeConnection';
  /**
   * Edges for the ContentTypeToContentNodeConnection connection
   */
  edges: Array<ContentTypeToContentNodeConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<ContentNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: ContentTypeToContentNodeConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface ContentTypeToContentNodeConnectionEdge {
  __typename?: 'ContentTypeToContentNodeConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: ContentNode;
}

/**
 * Page Info on the &quot;ContentTypeToContentNodeConnection&quot;
 */
export interface ContentTypeToContentNodeConnectionPageInfo {
  __typename?: 'ContentTypeToContentNodeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the ContentType type and the Taxonomy type
 */
export interface ContentTypeToTaxonomyConnection {
  __typename?: 'ContentTypeToTaxonomyConnection';
  /**
   * Edges for the ContentTypeToTaxonomyConnection connection
   */
  edges: Array<ContentTypeToTaxonomyConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Taxonomy>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: ContentTypeToTaxonomyConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface ContentTypeToTaxonomyConnectionEdge {
  __typename?: 'ContentTypeToTaxonomyConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Taxonomy;
}

/**
 * Page Info on the &quot;ContentTypeToTaxonomyConnection&quot;
 */
export interface ContentTypeToTaxonomyConnectionPageInfo {
  __typename?: 'ContentTypeToTaxonomyConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * The payload for the createCategory mutation.
 */
export interface CreateCategoryPayload {
  __typename?: 'CreateCategoryPayload';
  /**
   * The created category
   */
  category?: Maybe<Category>;
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
}

/**
 * The payload for the createComment mutation.
 */
export interface CreateCommentPayload {
  __typename?: 'CreateCommentPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The comment that was created
   */
  comment?: Maybe<Comment>;
  /**
   * Whether the mutation succeeded. If the comment is not approved, the server will not return the comment to a non authenticated user, but a success message can be returned if the create succeeded, and the client can optimistically add the comment to the client cache
   */
  success?: Maybe<ScalarsEnums['Boolean']>;
}

/**
 * The payload for the createMediaItem mutation.
 */
export interface CreateMediaItemPayload {
  __typename?: 'CreateMediaItemPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The MediaItem object mutation type.
   */
  mediaItem?: Maybe<MediaItem>;
}

/**
 * The payload for the createPage mutation.
 */
export interface CreatePagePayload {
  __typename?: 'CreatePagePayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The Post object mutation type.
   */
  page?: Maybe<Page>;
}

/**
 * The payload for the createPostFormat mutation.
 */
export interface CreatePostFormatPayload {
  __typename?: 'CreatePostFormatPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The created post_format
   */
  postFormat?: Maybe<PostFormat>;
}

/**
 * The payload for the createPost mutation.
 */
export interface CreatePostPayload {
  __typename?: 'CreatePostPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The Post object mutation type.
   */
  post?: Maybe<Post>;
}

/**
 * The payload for the createTag mutation.
 */
export interface CreateTagPayload {
  __typename?: 'CreateTagPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The created post_tag
   */
  tag?: Maybe<Tag>;
}

/**
 * The payload for the createUser mutation.
 */
export interface CreateUserPayload {
  __typename?: 'CreateUserPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The User object mutation type.
   */
  user?: Maybe<User>;
}

/**
 * Object that can be identified with a Database ID
 */
export interface DatabaseIdentifier {
  __typename?:
    | 'Category'
    | 'Comment'
    | 'CommentAuthor'
    | 'MediaItem'
    | 'Menu'
    | 'MenuItem'
    | 'Page'
    | 'Post'
    | 'PostFormat'
    | 'Tag'
    | 'User';
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  $on: $DatabaseIdentifier;
}

/**
 * The template assigned to the node
 */
export interface DefaultTemplate {
  __typename?: 'DefaultTemplate';
  /**
   * The name of the template
   */
  templateName?: Maybe<ScalarsEnums['String']>;
}

/**
 * The payload for the deleteCategory mutation.
 */
export interface DeleteCategoryPayload {
  __typename?: 'DeleteCategoryPayload';
  /**
   * The deleted term object
   */
  category?: Maybe<Category>;
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums['ID']>;
}

/**
 * The payload for the deleteComment mutation.
 */
export interface DeleteCommentPayload {
  __typename?: 'DeleteCommentPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The deleted comment object
   */
  comment?: Maybe<Comment>;
  /**
   * The deleted comment ID
   */
  deletedId?: Maybe<ScalarsEnums['ID']>;
}

/**
 * The payload for the deleteMediaItem mutation.
 */
export interface DeleteMediaItemPayload {
  __typename?: 'DeleteMediaItemPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The ID of the deleted mediaItem
   */
  deletedId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The mediaItem before it was deleted
   */
  mediaItem?: Maybe<MediaItem>;
}

/**
 * The payload for the deletePage mutation.
 */
export interface DeletePagePayload {
  __typename?: 'DeletePagePayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The object before it was deleted
   */
  page?: Maybe<Page>;
}

/**
 * The payload for the deletePostFormat mutation.
 */
export interface DeletePostFormatPayload {
  __typename?: 'DeletePostFormatPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The deleted term object
   */
  postFormat?: Maybe<PostFormat>;
}

/**
 * The payload for the deletePost mutation.
 */
export interface DeletePostPayload {
  __typename?: 'DeletePostPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The object before it was deleted
   */
  post?: Maybe<Post>;
}

/**
 * The payload for the deleteTag mutation.
 */
export interface DeleteTagPayload {
  __typename?: 'DeleteTagPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The deleted term object
   */
  tag?: Maybe<Tag>;
}

/**
 * The payload for the deleteUser mutation.
 */
export interface DeleteUserPayload {
  __typename?: 'DeleteUserPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The ID of the user that you just deleted
   */
  deletedId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The deleted user object
   */
  user?: Maybe<User>;
}

/**
 * The discussion setting type
 */
export interface DiscussionSettings {
  __typename?: 'DiscussionSettings';
  /**
   * Allow people to submit comments on new posts.
   */
  defaultCommentStatus?: Maybe<ScalarsEnums['String']>;
  /**
   * Allow link notifications from other blogs (pingbacks and trackbacks) on new articles.
   */
  defaultPingStatus?: Maybe<ScalarsEnums['String']>;
}

/**
 * Relational context between connected nodes
 */
export interface Edge {
  __typename?:
    | 'CategoryToAncestorsCategoryConnectionEdge'
    | 'CategoryToCategoryConnectionEdge'
    | 'CategoryToContentNodeConnectionEdge'
    | 'CategoryToParentCategoryConnectionEdge'
    | 'CategoryToPostConnectionEdge'
    | 'CategoryToTaxonomyConnectionEdge'
    | 'CommentToCommentConnectionEdge'
    | 'CommentToCommenterConnectionEdge'
    | 'CommentToContentNodeConnectionEdge'
    | 'CommentToParentCommentConnectionEdge'
    | 'ContentNodeToContentTypeConnectionEdge'
    | 'ContentNodeToEditLastConnectionEdge'
    | 'ContentNodeToEditLockConnectionEdge'
    | 'ContentNodeToEnqueuedScriptConnectionEdge'
    | 'ContentNodeToEnqueuedStylesheetConnectionEdge'
    | 'ContentTypeToContentNodeConnectionEdge'
    | 'ContentTypeToTaxonomyConnectionEdge'
    | 'HierarchicalContentNodeToContentNodeAncestorsConnectionEdge'
    | 'HierarchicalContentNodeToContentNodeChildrenConnectionEdge'
    | 'HierarchicalContentNodeToParentContentNodeConnectionEdge'
    | 'MediaItemToCommentConnectionEdge'
    | 'MenuItemToMenuConnectionEdge'
    | 'MenuItemToMenuItemConnectionEdge'
    | 'MenuItemToMenuItemLinkableConnectionEdge'
    | 'MenuToMenuItemConnectionEdge'
    | 'NodeWithAuthorToUserConnectionEdge'
    | 'NodeWithFeaturedImageToMediaItemConnectionEdge'
    | 'NodeWithRevisionsToContentNodeConnectionEdge'
    | 'PageToCommentConnectionEdge'
    | 'PageToPreviewConnectionEdge'
    | 'PageToRevisionConnectionEdge'
    | 'PostFormatToContentNodeConnectionEdge'
    | 'PostFormatToPostConnectionEdge'
    | 'PostFormatToTaxonomyConnectionEdge'
    | 'PostToCategoryConnectionEdge'
    | 'PostToCommentConnectionEdge'
    | 'PostToPostFormatConnectionEdge'
    | 'PostToPreviewConnectionEdge'
    | 'PostToRevisionConnectionEdge'
    | 'PostToTagConnectionEdge'
    | 'PostToTermNodeConnectionEdge'
    | 'RootQueryToCategoryConnectionEdge'
    | 'RootQueryToCommentConnectionEdge'
    | 'RootQueryToContentNodeConnectionEdge'
    | 'RootQueryToContentTypeConnectionEdge'
    | 'RootQueryToEnqueuedScriptConnectionEdge'
    | 'RootQueryToEnqueuedStylesheetConnectionEdge'
    | 'RootQueryToMediaItemConnectionEdge'
    | 'RootQueryToMenuConnectionEdge'
    | 'RootQueryToMenuItemConnectionEdge'
    | 'RootQueryToPageConnectionEdge'
    | 'RootQueryToPluginConnectionEdge'
    | 'RootQueryToPostConnectionEdge'
    | 'RootQueryToPostFormatConnectionEdge'
    | 'RootQueryToRevisionsConnectionEdge'
    | 'RootQueryToTagConnectionEdge'
    | 'RootQueryToTaxonomyConnectionEdge'
    | 'RootQueryToTermNodeConnectionEdge'
    | 'RootQueryToThemeConnectionEdge'
    | 'RootQueryToUserConnectionEdge'
    | 'RootQueryToUserRoleConnectionEdge'
    | 'TagToContentNodeConnectionEdge'
    | 'TagToPostConnectionEdge'
    | 'TagToTaxonomyConnectionEdge'
    | 'TaxonomyToContentTypeConnectionEdge'
    | 'TaxonomyToTermNodeConnectionEdge'
    | 'TermNodeToEnqueuedScriptConnectionEdge'
    | 'TermNodeToEnqueuedStylesheetConnectionEdge'
    | 'UserToCommentConnectionEdge'
    | 'UserToEnqueuedScriptConnectionEdge'
    | 'UserToEnqueuedStylesheetConnectionEdge'
    | 'UserToMediaItemConnectionEdge'
    | 'UserToPageConnectionEdge'
    | 'UserToPostConnectionEdge'
    | 'UserToRevisionsConnectionEdge'
    | 'UserToUserRoleConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected node
   */
  node: Node;
  $on: $Edge;
}

/**
 * Asset enqueued by the CMS
 */
export interface EnqueuedAsset {
  __typename?: 'EnqueuedScript' | 'EnqueuedStylesheet';
  /**
   * The inline code to be run after the asset is loaded.
   */
  after?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * Deprecated
   * @deprecated Use `EnqueuedAsset.media` instead.
   */
  args?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The inline code to be run before the asset is loaded.
   */
  before?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The HTML conditional comment for the enqueued asset. E.g. IE 6, lte IE 7, etc
   */
  conditional?: Maybe<ScalarsEnums['String']>;
  /**
   * Dependencies needed to use this asset
   */
  dependencies?: Maybe<Array<Maybe<EnqueuedAsset>>>;
  /**
   * Extra information needed for the script
   * @deprecated Use `EnqueuedScript.extraData` instead.
   */
  extra?: Maybe<ScalarsEnums['String']>;
  /**
   * The handle of the enqueued asset
   */
  handle?: Maybe<ScalarsEnums['String']>;
  /**
   * The ID of the enqueued asset
   */
  id: ScalarsEnums['ID'];
  /**
   * The source of the asset
   */
  src?: Maybe<ScalarsEnums['String']>;
  /**
   * The version of the enqueued asset
   */
  version?: Maybe<ScalarsEnums['String']>;
  $on: $EnqueuedAsset;
}

/**
 * Script enqueued by the CMS
 */
export interface EnqueuedScript {
  __typename?: 'EnqueuedScript';
  /**
   * The inline code to be run after the asset is loaded.
   */
  after?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * Deprecated
   * @deprecated Use `EnqueuedAsset.media` instead.
   */
  args?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The inline code to be run before the asset is loaded.
   */
  before?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The HTML conditional comment for the enqueued asset. E.g. IE 6, lte IE 7, etc
   */
  conditional?: Maybe<ScalarsEnums['String']>;
  /**
   * Dependencies needed to use this asset
   */
  dependencies?: Maybe<Array<Maybe<EnqueuedScript>>>;
  /**
   * Extra information needed for the script
   * @deprecated Use `EnqueuedScript.extraData` instead.
   */
  extra?: Maybe<ScalarsEnums['String']>;
  /**
   * Extra data supplied to the enqueued script
   */
  extraData?: Maybe<ScalarsEnums['String']>;
  /**
   * The handle of the enqueued asset
   */
  handle?: Maybe<ScalarsEnums['String']>;
  /**
   * The global ID of the enqueued script
   */
  id: ScalarsEnums['ID'];
  /**
   * The source of the asset
   */
  src?: Maybe<ScalarsEnums['String']>;
  /**
   * The loading strategy to use on the script tag
   */
  strategy?: Maybe<ScalarsEnums['ScriptLoadingStrategyEnum']>;
  /**
   * The version of the enqueued script
   */
  version?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to EnqueuedScript Nodes
 */
export interface EnqueuedScriptConnection {
  __typename?:
    | 'ContentNodeToEnqueuedScriptConnection'
    | 'RootQueryToEnqueuedScriptConnection'
    | 'TermNodeToEnqueuedScriptConnection'
    | 'UserToEnqueuedScriptConnection';
  /**
   * A list of edges (relational context) between ContentNode and connected EnqueuedScript Nodes
   */
  edges: Array<EnqueuedScriptConnectionEdge>;
  /**
   * A list of connected EnqueuedScript Nodes
   */
  nodes: Array<EnqueuedScript>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: EnqueuedScriptConnectionPageInfo;
  $on: $EnqueuedScriptConnection;
}

/**
 * Edge between a Node and a connected EnqueuedScript
 */
export interface EnqueuedScriptConnectionEdge {
  __typename?:
    | 'ContentNodeToEnqueuedScriptConnectionEdge'
    | 'RootQueryToEnqueuedScriptConnectionEdge'
    | 'TermNodeToEnqueuedScriptConnectionEdge'
    | 'UserToEnqueuedScriptConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected EnqueuedScript Node
   */
  node: EnqueuedScript;
  $on: $EnqueuedScriptConnectionEdge;
}

/**
 * Page Info on the connected EnqueuedScriptConnectionEdge
 */
export interface EnqueuedScriptConnectionPageInfo {
  __typename?:
    | 'ContentNodeToEnqueuedScriptConnectionPageInfo'
    | 'RootQueryToEnqueuedScriptConnectionPageInfo'
    | 'TermNodeToEnqueuedScriptConnectionPageInfo'
    | 'UserToEnqueuedScriptConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $EnqueuedScriptConnectionPageInfo;
}

/**
 * Stylesheet enqueued by the CMS
 */
export interface EnqueuedStylesheet {
  __typename?: 'EnqueuedStylesheet';
  /**
   * The inline code to be run after the asset is loaded.
   */
  after?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * Deprecated
   * @deprecated Use `EnqueuedAsset.media` instead.
   */
  args?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The inline code to be run before the asset is loaded.
   */
  before?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The HTML conditional comment for the enqueued asset. E.g. IE 6, lte IE 7, etc
   */
  conditional?: Maybe<ScalarsEnums['String']>;
  /**
   * Dependencies needed to use this asset
   */
  dependencies?: Maybe<Array<Maybe<EnqueuedStylesheet>>>;
  /**
   * Extra information needed for the script
   * @deprecated Use `EnqueuedScript.extraData` instead.
   */
  extra?: Maybe<ScalarsEnums['String']>;
  /**
   * The handle of the enqueued asset
   */
  handle?: Maybe<ScalarsEnums['String']>;
  /**
   * The global ID of the enqueued stylesheet
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the enqueued style is RTL or not
   */
  isRtl?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The media attribute to use for the link
   */
  media?: Maybe<ScalarsEnums['String']>;
  /**
   * The absolute path to the enqueued style. Set when the stylesheet is meant to load inline.
   */
  path?: Maybe<ScalarsEnums['String']>;
  /**
   * The `rel` attribute to use for the link
   */
  rel?: Maybe<ScalarsEnums['String']>;
  /**
   * The source of the asset
   */
  src?: Maybe<ScalarsEnums['String']>;
  /**
   * Optional suffix, used in combination with RTL
   */
  suffix?: Maybe<ScalarsEnums['String']>;
  /**
   * The title of the enqueued style. Used for preferred/alternate stylesheets.
   */
  title?: Maybe<ScalarsEnums['String']>;
  /**
   * The version of the enqueued style
   */
  version?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to EnqueuedStylesheet Nodes
 */
export interface EnqueuedStylesheetConnection {
  __typename?:
    | 'ContentNodeToEnqueuedStylesheetConnection'
    | 'RootQueryToEnqueuedStylesheetConnection'
    | 'TermNodeToEnqueuedStylesheetConnection'
    | 'UserToEnqueuedStylesheetConnection';
  /**
   * A list of edges (relational context) between ContentNode and connected EnqueuedStylesheet Nodes
   */
  edges: Array<EnqueuedStylesheetConnectionEdge>;
  /**
   * A list of connected EnqueuedStylesheet Nodes
   */
  nodes: Array<EnqueuedStylesheet>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: EnqueuedStylesheetConnectionPageInfo;
  $on: $EnqueuedStylesheetConnection;
}

/**
 * Edge between a Node and a connected EnqueuedStylesheet
 */
export interface EnqueuedStylesheetConnectionEdge {
  __typename?:
    | 'ContentNodeToEnqueuedStylesheetConnectionEdge'
    | 'RootQueryToEnqueuedStylesheetConnectionEdge'
    | 'TermNodeToEnqueuedStylesheetConnectionEdge'
    | 'UserToEnqueuedStylesheetConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected EnqueuedStylesheet Node
   */
  node: EnqueuedStylesheet;
  $on: $EnqueuedStylesheetConnectionEdge;
}

/**
 * Page Info on the connected EnqueuedStylesheetConnectionEdge
 */
export interface EnqueuedStylesheetConnectionPageInfo {
  __typename?:
    | 'ContentNodeToEnqueuedStylesheetConnectionPageInfo'
    | 'RootQueryToEnqueuedStylesheetConnectionPageInfo'
    | 'TermNodeToEnqueuedStylesheetConnectionPageInfo'
    | 'UserToEnqueuedStylesheetConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $EnqueuedStylesheetConnectionPageInfo;
}

/**
 * The general setting type
 */
export interface GeneralSettings {
  __typename?: 'GeneralSettings';
  /**
   * A date format for all date strings.
   */
  dateFormat?: Maybe<ScalarsEnums['String']>;
  /**
   * Site tagline.
   */
  description?: Maybe<ScalarsEnums['String']>;
  /**
   * This address is used for admin purposes, like new user notification.
   */
  email?: Maybe<ScalarsEnums['String']>;
  /**
   * WordPress locale code.
   */
  language?: Maybe<ScalarsEnums['String']>;
  /**
   * A day number of the week that the week should start on.
   */
  startOfWeek?: Maybe<ScalarsEnums['Int']>;
  /**
   * A time format for all time strings.
   */
  timeFormat?: Maybe<ScalarsEnums['String']>;
  /**
   * A city in the same timezone as you.
   */
  timezone?: Maybe<ScalarsEnums['String']>;
  /**
   * Site title.
   */
  title?: Maybe<ScalarsEnums['String']>;
  /**
   * Site URL.
   */
  url?: Maybe<ScalarsEnums['String']>;
}

/**
 * The payload for the generateAuthorizationCode mutation.
 */
export interface GenerateAuthorizationCodePayload {
  __typename?: 'GenerateAuthorizationCodePayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * Authorization code used for requesting refresh/access tokens
   */
  code?: Maybe<ScalarsEnums['String']>;
  /**
   * Error encountered during user authentication, if any
   */
  error?: Maybe<ScalarsEnums['String']>;
}

/**
 * Content node with hierarchical (parent/child) relationships
 */
export interface HierarchicalContentNode {
  __typename?: 'MediaItem' | 'Page';
  /**
   * Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root).
   */
  ancestors: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>;
  }) => Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>;
  /**
   * Connection between the HierarchicalContentNode type and the ContentNode type
   */
  children: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>;
  }) => Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>;
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums['String'];
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums['String']>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums['String']>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums['String']>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums['String']>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums['String']>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums['String']>;
  /**
   * The parent of the node. The parent object can be of various types
   */
  parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>;
  /**
   * Database id of the parent node
   */
  parentDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The globally unique identifier of the parent node.
   */
  parentId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums['String']>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums['String']>;
  /**
   * The template assigned to a node of content
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
  $on: $HierarchicalContentNode;
}

/**
 * Connection between the HierarchicalContentNode type and the ContentNode type
 */
export interface HierarchicalContentNodeToContentNodeAncestorsConnection {
  __typename?: 'HierarchicalContentNodeToContentNodeAncestorsConnection';
  /**
   * Edges for the HierarchicalContentNodeToContentNodeAncestorsConnection connection
   */
  edges: Array<HierarchicalContentNodeToContentNodeAncestorsConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<ContentNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface HierarchicalContentNodeToContentNodeAncestorsConnectionEdge {
  __typename?: 'HierarchicalContentNodeToContentNodeAncestorsConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: ContentNode;
}

/**
 * Page Info on the &quot;HierarchicalContentNodeToContentNodeAncestorsConnection&quot;
 */
export interface HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo {
  __typename?: 'HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the HierarchicalContentNode type and the ContentNode type
 */
export interface HierarchicalContentNodeToContentNodeChildrenConnection {
  __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnection';
  /**
   * Edges for the HierarchicalContentNodeToContentNodeChildrenConnection connection
   */
  edges: Array<HierarchicalContentNodeToContentNodeChildrenConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<ContentNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface HierarchicalContentNodeToContentNodeChildrenConnectionEdge {
  __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: ContentNode;
}

/**
 * Page Info on the &quot;HierarchicalContentNodeToContentNodeChildrenConnection&quot;
 */
export interface HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo {
  __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the HierarchicalContentNode type and the ContentNode type
 */
export interface HierarchicalContentNodeToParentContentNodeConnectionEdge {
  __typename?: 'HierarchicalContentNodeToParentContentNodeConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: ContentNode;
}

/**
 * Node with hierarchical (parent/child) relationships
 */
export interface HierarchicalNode {
  __typename?: 'Category' | 'MediaItem' | 'Page';
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  /**
   * Database id of the parent node
   */
  parentDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The globally unique identifier of the parent node.
   */
  parentId?: Maybe<ScalarsEnums['ID']>;
  $on: $HierarchicalNode;
}

/**
 * Term node with hierarchical (parent/child) relationships
 */
export interface HierarchicalTermNode {
  __typename?: 'Category';
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * The number of objects connected to the object
   */
  count?: Maybe<ScalarsEnums['Int']>;
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * The description of the object
   */
  description?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the TermNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<TermNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the TermNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<TermNodeToEnqueuedStylesheetConnection>;
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  /**
   * The link to the term
   */
  link?: Maybe<ScalarsEnums['String']>;
  /**
   * The human friendly name of the object.
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * Database id of the parent node
   */
  parentDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The globally unique identifier of the parent node.
   */
  parentId?: Maybe<ScalarsEnums['ID']>;
  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: Maybe<ScalarsEnums['String']>;
  /**
   * The name of the taxonomy that the object is associated with
   */
  taxonomyName?: Maybe<ScalarsEnums['String']>;
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The ID of the term group that this term object belongs to
   */
  termGroupId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The taxonomy ID that the object is associated with
   */
  termTaxonomyId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
  $on: $HierarchicalTermNode;
}

/**
 * File details for a Media Item
 */
export interface MediaDetails {
  __typename?: 'MediaDetails';
  /**
   * The filename of the mediaItem
   */
  file?: Maybe<ScalarsEnums['String']>;
  /**
   * The height of the mediaItem
   */
  height?: Maybe<ScalarsEnums['Int']>;
  /**
   * Meta information associated with the mediaItem
   */
  meta?: Maybe<MediaItemMeta>;
  /**
   * The available sizes of the mediaItem
   */
  sizes: (args?: {
    /**
     * The sizes to exclude. Will take precedence over `include`.
     */
    exclude?: Maybe<Array<Maybe<MediaItemSizeEnum>>>;
    /**
     * The sizes to include. Can be overridden by `exclude`.
     */
    include?: Maybe<Array<Maybe<MediaItemSizeEnum>>>;
  }) => Maybe<Array<Maybe<MediaSize>>>;
  /**
   * The width of the mediaItem
   */
  width?: Maybe<ScalarsEnums['Int']>;
}

/**
 * The mediaItem type
 */
export interface MediaItem {
  __typename?: 'MediaItem';
  /**
   * Alternative text to display when resource is not displayed
   */
  altText?: Maybe<ScalarsEnums['String']>;
  /**
   * Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root).
   */
  ancestors: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>;
  }) => Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>;
  /**
   * Connection between the NodeWithAuthor type and the User type
   */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /**
   * The database identifier of the author of the node
   */
  authorDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The globally unique identifier of the author of the node
   */
  authorId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The caption for the resource
   */
  caption: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the HierarchicalContentNode type and the ContentNode type
   */
  children: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>;
  }) => Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>;
  /**
   * The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility.
   */
  commentCount?: Maybe<ScalarsEnums['Int']>;
  /**
   * Whether the comments are open or closed for this particular post.
   */
  commentStatus?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the MediaItem type and the Comment type
   */
  comments: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<MediaItemToCommentConnectionWhereArgs>;
  }) => Maybe<MediaItemToCommentConnection>;
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums['String'];
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums['String']>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums['String']>;
  /**
   * Description of the image (stored as post_content)
   */
  description: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums['String']>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The filesize in bytes of the resource
   */
  fileSize: (args?: {
    /**
     * Size of the MediaItem to return
     */
    size?: Maybe<MediaItemSizeEnum>;
  }) => Maybe<ScalarsEnums['Int']>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique identifier of the attachment object.
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums['String']>;
  /**
   * Details about the mediaItem
   */
  mediaDetails?: Maybe<MediaDetails>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of the databaseId field
   */
  mediaItemId: ScalarsEnums['Int'];
  /**
   * Url of the mediaItem
   */
  mediaItemUrl?: Maybe<ScalarsEnums['String']>;
  /**
   * Type of resource
   */
  mediaType?: Maybe<ScalarsEnums['String']>;
  /**
   * The mime type of the mediaItem
   */
  mimeType?: Maybe<ScalarsEnums['String']>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums['String']>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums['String']>;
  /**
   * The parent of the node. The parent object can be of various types
   */
  parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>;
  /**
   * Database id of the parent node
   */
  parentDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The globally unique identifier of the parent node.
   */
  parentId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The sizes attribute value for an image.
   */
  sizes: (args?: {
    /**
     * Size of the MediaItem to calculate sizes with
     */
    size?: Maybe<MediaItemSizeEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums['String']>;
  /**
   * Url of the mediaItem
   */
  sourceUrl: (args?: {
    /**
     * Size of the MediaItem to return
     */
    size?: Maybe<MediaItemSizeEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * The srcset attribute specifies the URL of the image to use in different situations. It is a comma separated string of urls and their widths.
   */
  srcSet: (args?: {
    /**
     * Size of the MediaItem to calculate srcSet with
     */
    size?: Maybe<MediaItemSizeEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums['String']>;
  /**
   * The template assigned to a node of content
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to mediaItem Nodes
 */
export interface MediaItemConnection {
  __typename?: 'RootQueryToMediaItemConnection' | 'UserToMediaItemConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected mediaItem Nodes
   */
  edges: Array<MediaItemConnectionEdge>;
  /**
   * A list of connected mediaItem Nodes
   */
  nodes: Array<MediaItem>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: MediaItemConnectionPageInfo;
  $on: $MediaItemConnection;
}

/**
 * Edge between a Node and a connected mediaItem
 */
export interface MediaItemConnectionEdge {
  __typename?:
    | 'NodeWithFeaturedImageToMediaItemConnectionEdge'
    | 'RootQueryToMediaItemConnectionEdge'
    | 'UserToMediaItemConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected mediaItem Node
   */
  node: MediaItem;
  $on: $MediaItemConnectionEdge;
}

/**
 * Page Info on the connected MediaItemConnectionEdge
 */
export interface MediaItemConnectionPageInfo {
  __typename?:
    | 'RootQueryToMediaItemConnectionPageInfo'
    | 'UserToMediaItemConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $MediaItemConnectionPageInfo;
}

/**
 * Meta connected to a MediaItem
 */
export interface MediaItemMeta {
  __typename?: 'MediaItemMeta';
  /**
   * Aperture measurement of the media item.
   */
  aperture?: Maybe<ScalarsEnums['Float']>;
  /**
   * Information about the camera used to create the media item.
   */
  camera?: Maybe<ScalarsEnums['String']>;
  /**
   * The text string description associated with the media item.
   */
  caption?: Maybe<ScalarsEnums['String']>;
  /**
   * Copyright information associated with the media item.
   */
  copyright?: Maybe<ScalarsEnums['String']>;
  /**
   * The date/time when the media was created.
   */
  createdTimestamp?: Maybe<ScalarsEnums['Int']>;
  /**
   * The original creator of the media item.
   */
  credit?: Maybe<ScalarsEnums['String']>;
  /**
   * The focal length value of the media item.
   */
  focalLength?: Maybe<ScalarsEnums['Float']>;
  /**
   * The ISO (International Organization for Standardization) value of the media item.
   */
  iso?: Maybe<ScalarsEnums['Int']>;
  /**
   * List of keywords used to describe or identfy the media item.
   */
  keywords?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The vertical or horizontal aspect of the media item.
   */
  orientation?: Maybe<ScalarsEnums['String']>;
  /**
   * The shutter speed information of the media item.
   */
  shutterSpeed?: Maybe<ScalarsEnums['Float']>;
  /**
   * A useful title for the media item.
   */
  title?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the MediaItem type and the Comment type
 */
export interface MediaItemToCommentConnection {
  __typename?: 'MediaItemToCommentConnection';
  /**
   * Edges for the MediaItemToCommentConnection connection
   */
  edges: Array<MediaItemToCommentConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Comment>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: MediaItemToCommentConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface MediaItemToCommentConnectionEdge {
  __typename?: 'MediaItemToCommentConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Comment;
}

/**
 * Page Info on the &quot;MediaItemToCommentConnection&quot;
 */
export interface MediaItemToCommentConnectionPageInfo {
  __typename?: 'MediaItemToCommentConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Details of an available size for a media item
 */
export interface MediaSize {
  __typename?: 'MediaSize';
  /**
   * The filename of the referenced size
   */
  file?: Maybe<ScalarsEnums['String']>;
  /**
   * The filesize of the resource
   */
  fileSize?: Maybe<ScalarsEnums['Int']>;
  /**
   * The height of the referenced size
   */
  height?: Maybe<ScalarsEnums['String']>;
  /**
   * The mime type of the referenced size
   */
  mimeType?: Maybe<ScalarsEnums['String']>;
  /**
   * The referenced size name
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * The url of the referenced size
   */
  sourceUrl?: Maybe<ScalarsEnums['String']>;
  /**
   * The width of the referenced size
   */
  width?: Maybe<ScalarsEnums['String']>;
}

/**
 * Menus are the containers for navigation items. Menus can be assigned to menu locations, which are typically registered by the active theme.
 */
export interface Menu {
  __typename?: 'Menu';
  /**
   * The number of items in the menu
   */
  count?: Maybe<ScalarsEnums['Int']>;
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * The globally unique identifier of the nav menu object.
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The locations a menu is assigned to
   */
  locations?: Maybe<Array<Maybe<ScalarsEnums['MenuLocationEnum']>>>;
  /**
   * WP ID of the nav menu.
   * @deprecated Deprecated in favor of the databaseId field
   */
  menuId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Connection between the Menu type and the MenuItem type
   */
  menuItems: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<MenuToMenuItemConnectionWhereArgs>;
  }) => Maybe<MenuToMenuItemConnection>;
  /**
   * Display name of the menu. Equivalent to WP_Term-&gt;name.
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * The url friendly name of the menu. Equivalent to WP_Term-&gt;slug
   */
  slug?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to Menu Nodes
 */
export interface MenuConnection {
  __typename?: 'RootQueryToMenuConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected Menu Nodes
   */
  edges: Array<MenuConnectionEdge>;
  /**
   * A list of connected Menu Nodes
   */
  nodes: Array<Menu>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: MenuConnectionPageInfo;
  $on: $MenuConnection;
}

/**
 * Edge between a Node and a connected Menu
 */
export interface MenuConnectionEdge {
  __typename?: 'MenuItemToMenuConnectionEdge' | 'RootQueryToMenuConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected Menu Node
   */
  node: Menu;
  $on: $MenuConnectionEdge;
}

/**
 * Page Info on the connected MenuConnectionEdge
 */
export interface MenuConnectionPageInfo {
  __typename?: 'RootQueryToMenuConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $MenuConnectionPageInfo;
}

/**
 * Navigation menu items are the individual items assigned to a menu. These are rendered as the links in a navigation menu.
 */
export interface MenuItem {
  __typename?: 'MenuItem';
  /**
   * Connection between the MenuItem type and the MenuItem type
   */
  childItems: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<MenuItemToMenuItemConnectionWhereArgs>;
  }) => Maybe<MenuItemToMenuItemConnection>;
  /**
   * Connection from MenuItem to it&#039;s connected node
   */
  connectedNode?: Maybe<MenuItemToMenuItemLinkableConnectionEdge>;
  /**
   * The object connected to this menu item.
   * @deprecated Deprecated in favor of the connectedNode field
   */
  connectedObject?: Maybe<MenuItemObjectUnion>;
  /**
   * Class attribute for the menu item link
   */
  cssClasses?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * Description of the menu item.
   */
  description?: Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique identifier of the nav menu item object.
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Label or title of the menu item.
   */
  label?: Maybe<ScalarsEnums['String']>;
  /**
   * Link relationship (XFN) of the menu item.
   */
  linkRelationship?: Maybe<ScalarsEnums['String']>;
  /**
   * The locations the menu item&#039;s Menu is assigned to
   */
  locations?: Maybe<Array<Maybe<ScalarsEnums['MenuLocationEnum']>>>;
  /**
   * The Menu a MenuItem is part of
   */
  menu?: Maybe<MenuItemToMenuConnectionEdge>;
  /**
   * WP ID of the menu item.
   * @deprecated Deprecated in favor of the databaseId field
   */
  menuItemId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Menu item order
   */
  order?: Maybe<ScalarsEnums['Int']>;
  /**
   * The database id of the parent menu item or null if it is the root
   */
  parentDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The globally unique identifier of the parent nav menu item object.
   */
  parentId?: Maybe<ScalarsEnums['ID']>;
  /**
   * Path for the resource. Relative path for internal resources. Absolute path for external resources.
   */
  path?: Maybe<ScalarsEnums['String']>;
  /**
   * Target attribute for the menu item link.
   */
  target?: Maybe<ScalarsEnums['String']>;
  /**
   * Title attribute for the menu item link
   */
  title?: Maybe<ScalarsEnums['String']>;
  /**
   * The uri of the resource the menu item links to
   */
  uri?: Maybe<ScalarsEnums['String']>;
  /**
   * URL or destination of the menu item.
   */
  url?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to MenuItem Nodes
 */
export interface MenuItemConnection {
  __typename?:
    | 'MenuItemToMenuItemConnection'
    | 'MenuToMenuItemConnection'
    | 'RootQueryToMenuItemConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected MenuItem Nodes
   */
  edges: Array<MenuItemConnectionEdge>;
  /**
   * A list of connected MenuItem Nodes
   */
  nodes: Array<MenuItem>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: MenuItemConnectionPageInfo;
  $on: $MenuItemConnection;
}

/**
 * Edge between a Node and a connected MenuItem
 */
export interface MenuItemConnectionEdge {
  __typename?:
    | 'MenuItemToMenuItemConnectionEdge'
    | 'MenuToMenuItemConnectionEdge'
    | 'RootQueryToMenuItemConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected MenuItem Node
   */
  node: MenuItem;
  $on: $MenuItemConnectionEdge;
}

/**
 * Page Info on the connected MenuItemConnectionEdge
 */
export interface MenuItemConnectionPageInfo {
  __typename?:
    | 'MenuItemToMenuItemConnectionPageInfo'
    | 'MenuToMenuItemConnectionPageInfo'
    | 'RootQueryToMenuItemConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $MenuItemConnectionPageInfo;
}

/**
 * Nodes that can be linked to as Menu Items
 */
export interface MenuItemLinkable {
  __typename?: 'Category' | 'Page' | 'Post' | 'PostFormat' | 'Tag';
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
  $on: $MenuItemLinkable;
}

/**
 * Edge between a Node and a connected MenuItemLinkable
 */
export interface MenuItemLinkableConnectionEdge {
  __typename?: 'MenuItemToMenuItemLinkableConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected MenuItemLinkable Node
   */
  node: MenuItemLinkable;
  $on: $MenuItemLinkableConnectionEdge;
}

/**
 * Deprecated in favor of MenuItemLinkeable Interface
 */
export interface MenuItemObjectUnion {
  __typename?: 'Category' | 'Page' | 'Post' | 'PostFormat' | 'Tag';
  $on: $MenuItemObjectUnion;
}

/**
 * Connection between the MenuItem type and the Menu type
 */
export interface MenuItemToMenuConnectionEdge {
  __typename?: 'MenuItemToMenuConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: Menu;
}

/**
 * Connection between the MenuItem type and the MenuItem type
 */
export interface MenuItemToMenuItemConnection {
  __typename?: 'MenuItemToMenuItemConnection';
  /**
   * Edges for the MenuItemToMenuItemConnection connection
   */
  edges: Array<MenuItemToMenuItemConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<MenuItem>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: MenuItemToMenuItemConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface MenuItemToMenuItemConnectionEdge {
  __typename?: 'MenuItemToMenuItemConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: MenuItem;
}

/**
 * Page Info on the &quot;MenuItemToMenuItemConnection&quot;
 */
export interface MenuItemToMenuItemConnectionPageInfo {
  __typename?: 'MenuItemToMenuItemConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the MenuItem type and the MenuItemLinkable type
 */
export interface MenuItemToMenuItemLinkableConnectionEdge {
  __typename?: 'MenuItemToMenuItemLinkableConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: MenuItemLinkable;
}

/**
 * Connection between the Menu type and the MenuItem type
 */
export interface MenuToMenuItemConnection {
  __typename?: 'MenuToMenuItemConnection';
  /**
   * Edges for the MenuToMenuItemConnection connection
   */
  edges: Array<MenuToMenuItemConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<MenuItem>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: MenuToMenuItemConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface MenuToMenuItemConnectionEdge {
  __typename?: 'MenuToMenuItemConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: MenuItem;
}

/**
 * Page Info on the &quot;MenuToMenuItemConnection&quot;
 */
export interface MenuToMenuItemConnectionPageInfo {
  __typename?: 'MenuToMenuItemConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * An object with an ID
 */
export interface Node {
  __typename?:
    | 'Category'
    | 'Comment'
    | 'CommentAuthor'
    | 'ContentType'
    | 'EnqueuedScript'
    | 'EnqueuedStylesheet'
    | 'MediaItem'
    | 'Menu'
    | 'MenuItem'
    | 'Page'
    | 'Plugin'
    | 'Post'
    | 'PostFormat'
    | 'Tag'
    | 'Taxonomy'
    | 'Theme'
    | 'User'
    | 'UserRole';
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  $on: $Node;
}

/**
 * A node that can have an author assigned to it
 */
export interface NodeWithAuthor {
  __typename?: 'MediaItem' | 'Page' | 'Post';
  /**
   * Connection between the NodeWithAuthor type and the User type
   */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /**
   * The database identifier of the author of the node
   */
  authorDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The globally unique identifier of the author of the node
   */
  authorId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  $on: $NodeWithAuthor;
}

/**
 * Connection between the NodeWithAuthor type and the User type
 */
export interface NodeWithAuthorToUserConnectionEdge {
  __typename?: 'NodeWithAuthorToUserConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: User;
}

/**
 * A node that can have comments associated with it
 */
export interface NodeWithComments {
  __typename?: 'MediaItem' | 'Page' | 'Post';
  /**
   * The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility.
   */
  commentCount?: Maybe<ScalarsEnums['Int']>;
  /**
   * Whether the comments are open or closed for this particular post.
   */
  commentStatus?: Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  $on: $NodeWithComments;
}

/**
 * A node that supports the content editor
 */
export interface NodeWithContentEditor {
  __typename?: 'Page' | 'Post';
  /**
   * The content of the post.
   */
  content: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  $on: $NodeWithContentEditor;
}

/**
 * A node that can have an excerpt
 */
export interface NodeWithExcerpt {
  __typename?: 'Post';
  /**
   * The excerpt of the post.
   */
  excerpt: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  $on: $NodeWithExcerpt;
}

/**
 * A node that can have a featured image set
 */
export interface NodeWithFeaturedImage {
  __typename?: 'Page' | 'Post';
  /**
   * Connection between the NodeWithFeaturedImage type and the MediaItem type
   */
  featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
  /**
   * The database identifier for the featured image node assigned to the content node
   */
  featuredImageDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Globally unique ID of the featured image assigned to the node
   */
  featuredImageId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  $on: $NodeWithFeaturedImage;
}

/**
 * Connection between the NodeWithFeaturedImage type and the MediaItem type
 */
export interface NodeWithFeaturedImageToMediaItemConnectionEdge {
  __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: MediaItem;
}

/**
 * A node that can have page attributes
 */
export interface NodeWithPageAttributes {
  __typename?: 'Page';
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  /**
   * A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types.
   */
  menuOrder?: Maybe<ScalarsEnums['Int']>;
  $on: $NodeWithPageAttributes;
}

/**
 * A node that can have revisions
 */
export interface NodeWithRevisions {
  __typename?: 'Page' | 'Post';
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  /**
   * True if the node is a revision of another node
   */
  isRevision?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node.
   */
  revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
  $on: $NodeWithRevisions;
}

/**
 * Connection between the NodeWithRevisions type and the ContentNode type
 */
export interface NodeWithRevisionsToContentNodeConnectionEdge {
  __typename?: 'NodeWithRevisionsToContentNodeConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: ContentNode;
}

/**
 * A node that can have a template associated with it
 */
export interface NodeWithTemplate {
  __typename?: 'MediaItem' | 'Page' | 'Post';
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  /**
   * The template assigned to the node
   */
  template?: Maybe<ContentTemplate>;
  $on: $NodeWithTemplate;
}

/**
 * A node that NodeWith a title
 */
export interface NodeWithTitle {
  __typename?: 'MediaItem' | 'Page' | 'Post';
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  $on: $NodeWithTitle;
}

/**
 * A node that can have trackbacks and pingbacks
 */
export interface NodeWithTrackbacks {
  __typename?: 'Post';
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the pings are open or closed for this particular post.
   */
  pingStatus?: Maybe<ScalarsEnums['String']>;
  /**
   * URLs that have been pinged.
   */
  pinged?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * URLs queued to be pinged.
   */
  toPing?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  $on: $NodeWithTrackbacks;
}

/**
 * A singular connection from one Node to another, with support for relational data on the &quot;edge&quot; of the connection.
 */
export interface OneToOneConnection {
  __typename?:
    | 'CategoryToParentCategoryConnectionEdge'
    | 'CategoryToTaxonomyConnectionEdge'
    | 'CommentToCommenterConnectionEdge'
    | 'CommentToContentNodeConnectionEdge'
    | 'CommentToParentCommentConnectionEdge'
    | 'ContentNodeToContentTypeConnectionEdge'
    | 'ContentNodeToEditLastConnectionEdge'
    | 'ContentNodeToEditLockConnectionEdge'
    | 'HierarchicalContentNodeToParentContentNodeConnectionEdge'
    | 'MenuItemToMenuConnectionEdge'
    | 'MenuItemToMenuItemLinkableConnectionEdge'
    | 'NodeWithAuthorToUserConnectionEdge'
    | 'NodeWithFeaturedImageToMediaItemConnectionEdge'
    | 'NodeWithRevisionsToContentNodeConnectionEdge'
    | 'PageToPreviewConnectionEdge'
    | 'PostFormatToTaxonomyConnectionEdge'
    | 'PostToPreviewConnectionEdge'
    | 'TagToTaxonomyConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected node
   */
  node: Node;
  $on: $OneToOneConnection;
}

/**
 * The page type
 */
export interface Page {
  __typename?: 'Page';
  /**
   * Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root).
   */
  ancestors: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>;
  }) => Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>;
  /**
   * Connection between the NodeWithAuthor type and the User type
   */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /**
   * The database identifier of the author of the node
   */
  authorDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The globally unique identifier of the author of the node
   */
  authorId?: Maybe<ScalarsEnums['ID']>;
  /**
   * Connection between the HierarchicalContentNode type and the ContentNode type
   */
  children: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>;
  }) => Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>;
  /**
   * The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility.
   */
  commentCount?: Maybe<ScalarsEnums['Int']>;
  /**
   * Whether the comments are open or closed for this particular post.
   */
  commentStatus?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the Page type and the Comment type
   */
  comments: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PageToCommentConnectionWhereArgs>;
  }) => Maybe<PageToCommentConnection>;
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * The content of the post.
   */
  content: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums['String'];
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums['String']>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums['String']>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums['String']>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * Connection between the NodeWithFeaturedImage type and the MediaItem type
   */
  featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
  /**
   * The database identifier for the featured image node assigned to the content node
   */
  featuredImageDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Globally unique ID of the featured image assigned to the node
   */
  featuredImageId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique identifier of the page object.
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether this page is set to the static front page.
   */
  isFrontPage: ScalarsEnums['Boolean'];
  /**
   * Whether this page is set to the blog posts page.
   */
  isPostsPage: ScalarsEnums['Boolean'];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether this page is set to the privacy page.
   */
  isPrivacyPage: ScalarsEnums['Boolean'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * True if the node is a revision of another node
   */
  isRevision?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums['String']>;
  /**
   * A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types.
   */
  menuOrder?: Maybe<ScalarsEnums['Int']>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums['String']>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums['String']>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of the databaseId field
   */
  pageId: ScalarsEnums['Int'];
  /**
   * The parent of the node. The parent object can be of various types
   */
  parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>;
  /**
   * Database id of the parent node
   */
  parentDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The globally unique identifier of the parent node.
   */
  parentId?: Maybe<ScalarsEnums['ID']>;
  /**
   * Connection between the Page type and the page type
   */
  preview?: Maybe<PageToPreviewConnectionEdge>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums['ID']>;
  /**
   * If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node.
   */
  revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
  /**
   * Connection between the Page type and the page type
   */
  revisions: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PageToRevisionConnectionWhereArgs>;
  }) => Maybe<PageToRevisionConnection>;
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums['String']>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums['String']>;
  /**
   * The template assigned to a node of content
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to page Nodes
 */
export interface PageConnection {
  __typename?:
    | 'PageToRevisionConnection'
    | 'RootQueryToPageConnection'
    | 'UserToPageConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected page Nodes
   */
  edges: Array<PageConnectionEdge>;
  /**
   * A list of connected page Nodes
   */
  nodes: Array<Page>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PageConnectionPageInfo;
  $on: $PageConnection;
}

/**
 * Edge between a Node and a connected page
 */
export interface PageConnectionEdge {
  __typename?:
    | 'PageToPreviewConnectionEdge'
    | 'PageToRevisionConnectionEdge'
    | 'RootQueryToPageConnectionEdge'
    | 'UserToPageConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected page Node
   */
  node: Page;
  $on: $PageConnectionEdge;
}

/**
 * Page Info on the connected PageConnectionEdge
 */
export interface PageConnectionPageInfo {
  __typename?:
    | 'PageToRevisionConnectionPageInfo'
    | 'RootQueryToPageConnectionPageInfo'
    | 'UserToPageConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $PageConnectionPageInfo;
}

/**
 * Information about pagination in a connection.
 */
export interface PageInfo {
  __typename?:
    | 'CategoryToAncestorsCategoryConnectionPageInfo'
    | 'CategoryToCategoryConnectionPageInfo'
    | 'CategoryToContentNodeConnectionPageInfo'
    | 'CategoryToPostConnectionPageInfo'
    | 'CommentToCommentConnectionPageInfo'
    | 'ContentNodeToEnqueuedScriptConnectionPageInfo'
    | 'ContentNodeToEnqueuedStylesheetConnectionPageInfo'
    | 'ContentTypeToContentNodeConnectionPageInfo'
    | 'ContentTypeToTaxonomyConnectionPageInfo'
    | 'HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo'
    | 'HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo'
    | 'MediaItemToCommentConnectionPageInfo'
    | 'MenuItemToMenuItemConnectionPageInfo'
    | 'MenuToMenuItemConnectionPageInfo'
    | 'PageToCommentConnectionPageInfo'
    | 'PageToRevisionConnectionPageInfo'
    | 'PostFormatToContentNodeConnectionPageInfo'
    | 'PostFormatToPostConnectionPageInfo'
    | 'PostToCategoryConnectionPageInfo'
    | 'PostToCommentConnectionPageInfo'
    | 'PostToPostFormatConnectionPageInfo'
    | 'PostToRevisionConnectionPageInfo'
    | 'PostToTagConnectionPageInfo'
    | 'PostToTermNodeConnectionPageInfo'
    | 'RootQueryToCategoryConnectionPageInfo'
    | 'RootQueryToCommentConnectionPageInfo'
    | 'RootQueryToContentNodeConnectionPageInfo'
    | 'RootQueryToContentTypeConnectionPageInfo'
    | 'RootQueryToEnqueuedScriptConnectionPageInfo'
    | 'RootQueryToEnqueuedStylesheetConnectionPageInfo'
    | 'RootQueryToMediaItemConnectionPageInfo'
    | 'RootQueryToMenuConnectionPageInfo'
    | 'RootQueryToMenuItemConnectionPageInfo'
    | 'RootQueryToPageConnectionPageInfo'
    | 'RootQueryToPluginConnectionPageInfo'
    | 'RootQueryToPostConnectionPageInfo'
    | 'RootQueryToPostFormatConnectionPageInfo'
    | 'RootQueryToRevisionsConnectionPageInfo'
    | 'RootQueryToTagConnectionPageInfo'
    | 'RootQueryToTaxonomyConnectionPageInfo'
    | 'RootQueryToTermNodeConnectionPageInfo'
    | 'RootQueryToThemeConnectionPageInfo'
    | 'RootQueryToUserConnectionPageInfo'
    | 'RootQueryToUserRoleConnectionPageInfo'
    | 'TagToContentNodeConnectionPageInfo'
    | 'TagToPostConnectionPageInfo'
    | 'TaxonomyToContentTypeConnectionPageInfo'
    | 'TaxonomyToTermNodeConnectionPageInfo'
    | 'TermNodeToEnqueuedScriptConnectionPageInfo'
    | 'TermNodeToEnqueuedStylesheetConnectionPageInfo'
    | 'UserToCommentConnectionPageInfo'
    | 'UserToEnqueuedScriptConnectionPageInfo'
    | 'UserToEnqueuedStylesheetConnectionPageInfo'
    | 'UserToMediaItemConnectionPageInfo'
    | 'UserToPageConnectionPageInfo'
    | 'UserToPostConnectionPageInfo'
    | 'UserToRevisionsConnectionPageInfo'
    | 'UserToUserRoleConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $PageInfo;
}

/**
 * Connection between the Page type and the Comment type
 */
export interface PageToCommentConnection {
  __typename?: 'PageToCommentConnection';
  /**
   * Edges for the PageToCommentConnection connection
   */
  edges: Array<PageToCommentConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Comment>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PageToCommentConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface PageToCommentConnectionEdge {
  __typename?: 'PageToCommentConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Comment;
}

/**
 * Page Info on the &quot;PageToCommentConnection&quot;
 */
export interface PageToCommentConnectionPageInfo {
  __typename?: 'PageToCommentConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Page type and the page type
 */
export interface PageToPreviewConnectionEdge {
  __typename?: 'PageToPreviewConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: Page;
}

/**
 * Connection between the Page type and the page type
 */
export interface PageToRevisionConnection {
  __typename?: 'PageToRevisionConnection';
  /**
   * Edges for the PageToRevisionConnection connection
   */
  edges: Array<PageToRevisionConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Page>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PageToRevisionConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface PageToRevisionConnectionEdge {
  __typename?: 'PageToRevisionConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Page;
}

/**
 * Page Info on the &quot;PageToRevisionConnection&quot;
 */
export interface PageToRevisionConnectionPageInfo {
  __typename?: 'PageToRevisionConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * An plugin object
 */
export interface Plugin {
  __typename?: 'Plugin';
  /**
   * Name of the plugin author(s), may also be a company name.
   */
  author?: Maybe<ScalarsEnums['String']>;
  /**
   * URI for the related author(s)/company website.
   */
  authorUri?: Maybe<ScalarsEnums['String']>;
  /**
   * Description of the plugin.
   */
  description?: Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique identifier of the plugin object.
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Display name of the plugin.
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * Plugin path.
   */
  path?: Maybe<ScalarsEnums['String']>;
  /**
   * URI for the plugin website. This is useful for directing users for support requests etc.
   */
  pluginUri?: Maybe<ScalarsEnums['String']>;
  /**
   * Current version of the plugin.
   */
  version?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to Plugin Nodes
 */
export interface PluginConnection {
  __typename?: 'RootQueryToPluginConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected Plugin Nodes
   */
  edges: Array<PluginConnectionEdge>;
  /**
   * A list of connected Plugin Nodes
   */
  nodes: Array<Plugin>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PluginConnectionPageInfo;
  $on: $PluginConnection;
}

/**
 * Edge between a Node and a connected Plugin
 */
export interface PluginConnectionEdge {
  __typename?: 'RootQueryToPluginConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected Plugin Node
   */
  node: Plugin;
  $on: $PluginConnectionEdge;
}

/**
 * Page Info on the connected PluginConnectionEdge
 */
export interface PluginConnectionPageInfo {
  __typename?: 'RootQueryToPluginConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $PluginConnectionPageInfo;
}

/**
 * The post type
 */
export interface Post {
  __typename?: 'Post';
  /**
   * Connection between the NodeWithAuthor type and the User type
   */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /**
   * The database identifier of the author of the node
   */
  authorDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The globally unique identifier of the author of the node
   */
  authorId?: Maybe<ScalarsEnums['ID']>;
  /**
   * Connection between the Post type and the category type
   */
  categories: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostToCategoryConnectionWhereArgs>;
  }) => Maybe<PostToCategoryConnection>;
  /**
   * The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility.
   */
  commentCount?: Maybe<ScalarsEnums['Int']>;
  /**
   * Whether the comments are open or closed for this particular post.
   */
  commentStatus?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the Post type and the Comment type
   */
  comments: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostToCommentConnectionWhereArgs>;
  }) => Maybe<PostToCommentConnection>;
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * The content of the post.
   */
  content: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums['String'];
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums['String']>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums['String']>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums['String']>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The excerpt of the post.
   */
  excerpt: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the NodeWithFeaturedImage type and the MediaItem type
   */
  featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
  /**
   * The database identifier for the featured image node assigned to the content node
   */
  featuredImageDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Globally unique ID of the featured image assigned to the node
   */
  featuredImageId?: Maybe<ScalarsEnums['ID']>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique identifier of the post object.
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * True if the node is a revision of another node
   */
  isRevision?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether this page is sticky
   */
  isSticky: ScalarsEnums['Boolean'];
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums['String']>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums['String']>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums['String']>;
  /**
   * Whether the pings are open or closed for this particular post.
   */
  pingStatus?: Maybe<ScalarsEnums['String']>;
  /**
   * URLs that have been pinged.
   */
  pinged?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * Connection between the Post type and the postFormat type
   */
  postFormats: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostToPostFormatConnectionWhereArgs>;
  }) => Maybe<PostToPostFormatConnection>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of the databaseId field
   */
  postId: ScalarsEnums['Int'];
  /**
   * Connection between the Post type and the post type
   */
  preview?: Maybe<PostToPreviewConnectionEdge>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums['ID']>;
  /**
   * If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node.
   */
  revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
  /**
   * Connection between the Post type and the post type
   */
  revisions: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostToRevisionConnectionWhereArgs>;
  }) => Maybe<PostToRevisionConnection>;
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums['String']>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the Post type and the tag type
   */
  tags: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostToTagConnectionWhereArgs>;
  }) => Maybe<PostToTagConnection>;
  /**
   * The template assigned to the node
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * Connection between the Post type and the TermNode type
   */
  terms: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostToTermNodeConnectionWhereArgs>;
  }) => Maybe<PostToTermNodeConnection>;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums['String']>;
  /**
   * URLs queued to be pinged.
   */
  toPing?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to post Nodes
 */
export interface PostConnection {
  __typename?:
    | 'CategoryToPostConnection'
    | 'PostFormatToPostConnection'
    | 'PostToRevisionConnection'
    | 'RootQueryToPostConnection'
    | 'TagToPostConnection'
    | 'UserToPostConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected post Nodes
   */
  edges: Array<PostConnectionEdge>;
  /**
   * A list of connected post Nodes
   */
  nodes: Array<Post>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PostConnectionPageInfo;
  $on: $PostConnection;
}

/**
 * Edge between a Node and a connected post
 */
export interface PostConnectionEdge {
  __typename?:
    | 'CategoryToPostConnectionEdge'
    | 'PostFormatToPostConnectionEdge'
    | 'PostToPreviewConnectionEdge'
    | 'PostToRevisionConnectionEdge'
    | 'RootQueryToPostConnectionEdge'
    | 'TagToPostConnectionEdge'
    | 'UserToPostConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected post Node
   */
  node: Post;
  $on: $PostConnectionEdge;
}

/**
 * Page Info on the connected PostConnectionEdge
 */
export interface PostConnectionPageInfo {
  __typename?:
    | 'CategoryToPostConnectionPageInfo'
    | 'PostFormatToPostConnectionPageInfo'
    | 'PostToRevisionConnectionPageInfo'
    | 'RootQueryToPostConnectionPageInfo'
    | 'TagToPostConnectionPageInfo'
    | 'UserToPostConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $PostConnectionPageInfo;
}

/**
 * The postFormat type
 */
export interface PostFormat {
  __typename?: 'PostFormat';
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the PostFormat type and the ContentNode type
   */
  contentNodes: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostFormatToContentNodeConnectionWhereArgs>;
  }) => Maybe<PostFormatToContentNodeConnection>;
  /**
   * The number of objects connected to the object
   */
  count?: Maybe<ScalarsEnums['Int']>;
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * The description of the object
   */
  description?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the TermNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<TermNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the TermNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<TermNodeToEnqueuedStylesheetConnection>;
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  /**
   * The link to the term
   */
  link?: Maybe<ScalarsEnums['String']>;
  /**
   * The human friendly name of the object.
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of databaseId
   */
  postFormatId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Connection between the PostFormat type and the post type
   */
  posts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostFormatToPostConnectionWhereArgs>;
  }) => Maybe<PostFormatToPostConnection>;
  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the PostFormat type and the Taxonomy type
   */
  taxonomy?: Maybe<PostFormatToTaxonomyConnectionEdge>;
  /**
   * The name of the taxonomy that the object is associated with
   */
  taxonomyName?: Maybe<ScalarsEnums['String']>;
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The ID of the term group that this term object belongs to
   */
  termGroupId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The taxonomy ID that the object is associated with
   */
  termTaxonomyId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to postFormat Nodes
 */
export interface PostFormatConnection {
  __typename?: 'PostToPostFormatConnection' | 'RootQueryToPostFormatConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected postFormat Nodes
   */
  edges: Array<PostFormatConnectionEdge>;
  /**
   * A list of connected postFormat Nodes
   */
  nodes: Array<PostFormat>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PostFormatConnectionPageInfo;
  $on: $PostFormatConnection;
}

/**
 * Edge between a Node and a connected postFormat
 */
export interface PostFormatConnectionEdge {
  __typename?:
    | 'PostToPostFormatConnectionEdge'
    | 'RootQueryToPostFormatConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected postFormat Node
   */
  node: PostFormat;
  $on: $PostFormatConnectionEdge;
}

/**
 * Page Info on the connected PostFormatConnectionEdge
 */
export interface PostFormatConnectionPageInfo {
  __typename?:
    | 'PostToPostFormatConnectionPageInfo'
    | 'RootQueryToPostFormatConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $PostFormatConnectionPageInfo;
}

/**
 * Connection between the PostFormat type and the ContentNode type
 */
export interface PostFormatToContentNodeConnection {
  __typename?: 'PostFormatToContentNodeConnection';
  /**
   * Edges for the PostFormatToContentNodeConnection connection
   */
  edges: Array<PostFormatToContentNodeConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<ContentNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PostFormatToContentNodeConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface PostFormatToContentNodeConnectionEdge {
  __typename?: 'PostFormatToContentNodeConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: ContentNode;
}

/**
 * Page Info on the &quot;PostFormatToContentNodeConnection&quot;
 */
export interface PostFormatToContentNodeConnectionPageInfo {
  __typename?: 'PostFormatToContentNodeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the PostFormat type and the post type
 */
export interface PostFormatToPostConnection {
  __typename?: 'PostFormatToPostConnection';
  /**
   * Edges for the PostFormatToPostConnection connection
   */
  edges: Array<PostFormatToPostConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Post>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PostFormatToPostConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface PostFormatToPostConnectionEdge {
  __typename?: 'PostFormatToPostConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Post;
}

/**
 * Page Info on the &quot;PostFormatToPostConnection&quot;
 */
export interface PostFormatToPostConnectionPageInfo {
  __typename?: 'PostFormatToPostConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the PostFormat type and the Taxonomy type
 */
export interface PostFormatToTaxonomyConnectionEdge {
  __typename?: 'PostFormatToTaxonomyConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: Taxonomy;
}

/**
 * Connection between the Post type and the category type
 */
export interface PostToCategoryConnection {
  __typename?: 'PostToCategoryConnection';
  /**
   * Edges for the PostToCategoryConnection connection
   */
  edges: Array<PostToCategoryConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Category>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PostToCategoryConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface PostToCategoryConnectionEdge {
  __typename?: 'PostToCategoryConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Category;
}

/**
 * Page Info on the &quot;PostToCategoryConnection&quot;
 */
export interface PostToCategoryConnectionPageInfo {
  __typename?: 'PostToCategoryConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Post type and the Comment type
 */
export interface PostToCommentConnection {
  __typename?: 'PostToCommentConnection';
  /**
   * Edges for the PostToCommentConnection connection
   */
  edges: Array<PostToCommentConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Comment>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PostToCommentConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface PostToCommentConnectionEdge {
  __typename?: 'PostToCommentConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Comment;
}

/**
 * Page Info on the &quot;PostToCommentConnection&quot;
 */
export interface PostToCommentConnectionPageInfo {
  __typename?: 'PostToCommentConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Post type and the postFormat type
 */
export interface PostToPostFormatConnection {
  __typename?: 'PostToPostFormatConnection';
  /**
   * Edges for the PostToPostFormatConnection connection
   */
  edges: Array<PostToPostFormatConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<PostFormat>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PostToPostFormatConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface PostToPostFormatConnectionEdge {
  __typename?: 'PostToPostFormatConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: PostFormat;
}

/**
 * Page Info on the &quot;PostToPostFormatConnection&quot;
 */
export interface PostToPostFormatConnectionPageInfo {
  __typename?: 'PostToPostFormatConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Post type and the post type
 */
export interface PostToPreviewConnectionEdge {
  __typename?: 'PostToPreviewConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: Post;
}

/**
 * Connection between the Post type and the post type
 */
export interface PostToRevisionConnection {
  __typename?: 'PostToRevisionConnection';
  /**
   * Edges for the PostToRevisionConnection connection
   */
  edges: Array<PostToRevisionConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Post>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PostToRevisionConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface PostToRevisionConnectionEdge {
  __typename?: 'PostToRevisionConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Post;
}

/**
 * Page Info on the &quot;PostToRevisionConnection&quot;
 */
export interface PostToRevisionConnectionPageInfo {
  __typename?: 'PostToRevisionConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Post type and the tag type
 */
export interface PostToTagConnection {
  __typename?: 'PostToTagConnection';
  /**
   * Edges for the PostToTagConnection connection
   */
  edges: Array<PostToTagConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Tag>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PostToTagConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface PostToTagConnectionEdge {
  __typename?: 'PostToTagConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Tag;
}

/**
 * Page Info on the &quot;PostToTagConnection&quot;
 */
export interface PostToTagConnectionPageInfo {
  __typename?: 'PostToTagConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Post type and the TermNode type
 */
export interface PostToTermNodeConnection {
  __typename?: 'PostToTermNodeConnection';
  /**
   * Edges for the PostToTermNodeConnection connection
   */
  edges: Array<PostToTermNodeConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<TermNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: PostToTermNodeConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface PostToTermNodeConnectionEdge {
  __typename?: 'PostToTermNodeConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: TermNode;
}

/**
 * Page Info on the &quot;PostToTermNodeConnection&quot;
 */
export interface PostToTermNodeConnectionPageInfo {
  __typename?: 'PostToTermNodeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Details for labels of the PostType
 */
export interface PostTypeLabelDetails {
  __typename?: 'PostTypeLabelDetails';
  /**
   * Default is ‘Add New’ for both hierarchical and non-hierarchical types.
   */
  addNew?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for adding a new singular item.
   */
  addNewItem?: Maybe<ScalarsEnums['String']>;
  /**
   * Label to signify all items in a submenu link.
   */
  allItems?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for archives in nav menus
   */
  archives?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for the attributes meta box.
   */
  attributes?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for editing a singular item.
   */
  editItem?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for the Featured Image meta box title.
   */
  featuredImage?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for the table views hidden heading.
   */
  filterItemsList?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for the media frame button.
   */
  insertIntoItem?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for the table hidden heading.
   */
  itemsList?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for the table pagination hidden heading.
   */
  itemsListNavigation?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for the menu name.
   */
  menuName?: Maybe<ScalarsEnums['String']>;
  /**
   * General name for the post type, usually plural.
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for the new item page title.
   */
  newItem?: Maybe<ScalarsEnums['String']>;
  /**
   * Label used when no items are found.
   */
  notFound?: Maybe<ScalarsEnums['String']>;
  /**
   * Label used when no items are in the trash.
   */
  notFoundInTrash?: Maybe<ScalarsEnums['String']>;
  /**
   * Label used to prefix parents of hierarchical items.
   */
  parentItemColon?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for removing the featured image.
   */
  removeFeaturedImage?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for searching plural items.
   */
  searchItems?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for setting the featured image.
   */
  setFeaturedImage?: Maybe<ScalarsEnums['String']>;
  /**
   * Name for one object of this post type.
   */
  singularName?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for the media frame filter.
   */
  uploadedToThisItem?: Maybe<ScalarsEnums['String']>;
  /**
   * Label in the media frame for using a featured image.
   */
  useFeaturedImage?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for viewing a singular item.
   */
  viewItem?: Maybe<ScalarsEnums['String']>;
  /**
   * Label for viewing post type archives.
   */
  viewItems?: Maybe<ScalarsEnums['String']>;
}

/**
 * Nodes that can be seen in a preview (unpublished) state.
 */
export interface Previewable {
  __typename?: 'Page' | 'Post';
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums['ID']>;
  $on: $Previewable;
}

/**
 * The reading setting type
 */
export interface ReadingSettings {
  __typename?: 'ReadingSettings';
  /**
   * The ID of the page that should display the latest posts
   */
  pageForPosts?: Maybe<ScalarsEnums['Int']>;
  /**
   * The ID of the page that should be displayed on the front page
   */
  pageOnFront?: Maybe<ScalarsEnums['Int']>;
  /**
   * Blog pages show at most.
   */
  postsPerPage?: Maybe<ScalarsEnums['Int']>;
  /**
   * What to show on the front page
   */
  showOnFront?: Maybe<ScalarsEnums['String']>;
}

/**
 * The payload for the registerUser mutation.
 */
export interface RegisterUserPayload {
  __typename?: 'RegisterUserPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The User object mutation type.
   */
  user?: Maybe<User>;
}

/**
 * The payload for the resetUserPassword mutation.
 */
export interface ResetUserPasswordPayload {
  __typename?: 'ResetUserPasswordPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The User object mutation type.
   */
  user?: Maybe<User>;
}

/**
 * The payload for the restoreComment mutation.
 */
export interface RestoreCommentPayload {
  __typename?: 'RestoreCommentPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The restored comment object
   */
  comment?: Maybe<Comment>;
  /**
   * The ID of the restored comment
   */
  restoredId?: Maybe<ScalarsEnums['ID']>;
}

/**
 * Connection between the RootQuery type and the category type
 */
export interface RootQueryToCategoryConnection {
  __typename?: 'RootQueryToCategoryConnection';
  /**
   * Edges for the RootQueryToCategoryConnection connection
   */
  edges: Array<RootQueryToCategoryConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Category>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToCategoryConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToCategoryConnectionEdge {
  __typename?: 'RootQueryToCategoryConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Category;
}

/**
 * Page Info on the &quot;RootQueryToCategoryConnection&quot;
 */
export interface RootQueryToCategoryConnectionPageInfo {
  __typename?: 'RootQueryToCategoryConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the Comment type
 */
export interface RootQueryToCommentConnection {
  __typename?: 'RootQueryToCommentConnection';
  /**
   * Edges for the RootQueryToCommentConnection connection
   */
  edges: Array<RootQueryToCommentConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Comment>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToCommentConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToCommentConnectionEdge {
  __typename?: 'RootQueryToCommentConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Comment;
}

/**
 * Page Info on the &quot;RootQueryToCommentConnection&quot;
 */
export interface RootQueryToCommentConnectionPageInfo {
  __typename?: 'RootQueryToCommentConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the ContentNode type
 */
export interface RootQueryToContentNodeConnection {
  __typename?: 'RootQueryToContentNodeConnection';
  /**
   * Edges for the RootQueryToContentNodeConnection connection
   */
  edges: Array<RootQueryToContentNodeConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<ContentNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToContentNodeConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToContentNodeConnectionEdge {
  __typename?: 'RootQueryToContentNodeConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: ContentNode;
}

/**
 * Page Info on the &quot;RootQueryToContentNodeConnection&quot;
 */
export interface RootQueryToContentNodeConnectionPageInfo {
  __typename?: 'RootQueryToContentNodeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the ContentType type
 */
export interface RootQueryToContentTypeConnection {
  __typename?: 'RootQueryToContentTypeConnection';
  /**
   * Edges for the RootQueryToContentTypeConnection connection
   */
  edges: Array<RootQueryToContentTypeConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<ContentType>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToContentTypeConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToContentTypeConnectionEdge {
  __typename?: 'RootQueryToContentTypeConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: ContentType;
}

/**
 * Page Info on the &quot;RootQueryToContentTypeConnection&quot;
 */
export interface RootQueryToContentTypeConnectionPageInfo {
  __typename?: 'RootQueryToContentTypeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the EnqueuedScript type
 */
export interface RootQueryToEnqueuedScriptConnection {
  __typename?: 'RootQueryToEnqueuedScriptConnection';
  /**
   * Edges for the RootQueryToEnqueuedScriptConnection connection
   */
  edges: Array<RootQueryToEnqueuedScriptConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<EnqueuedScript>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToEnqueuedScriptConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToEnqueuedScriptConnectionEdge {
  __typename?: 'RootQueryToEnqueuedScriptConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: EnqueuedScript;
}

/**
 * Page Info on the &quot;RootQueryToEnqueuedScriptConnection&quot;
 */
export interface RootQueryToEnqueuedScriptConnectionPageInfo {
  __typename?: 'RootQueryToEnqueuedScriptConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the EnqueuedStylesheet type
 */
export interface RootQueryToEnqueuedStylesheetConnection {
  __typename?: 'RootQueryToEnqueuedStylesheetConnection';
  /**
   * Edges for the RootQueryToEnqueuedStylesheetConnection connection
   */
  edges: Array<RootQueryToEnqueuedStylesheetConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<EnqueuedStylesheet>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToEnqueuedStylesheetConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToEnqueuedStylesheetConnectionEdge {
  __typename?: 'RootQueryToEnqueuedStylesheetConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: EnqueuedStylesheet;
}

/**
 * Page Info on the &quot;RootQueryToEnqueuedStylesheetConnection&quot;
 */
export interface RootQueryToEnqueuedStylesheetConnectionPageInfo {
  __typename?: 'RootQueryToEnqueuedStylesheetConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the mediaItem type
 */
export interface RootQueryToMediaItemConnection {
  __typename?: 'RootQueryToMediaItemConnection';
  /**
   * Edges for the RootQueryToMediaItemConnection connection
   */
  edges: Array<RootQueryToMediaItemConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<MediaItem>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToMediaItemConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToMediaItemConnectionEdge {
  __typename?: 'RootQueryToMediaItemConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: MediaItem;
}

/**
 * Page Info on the &quot;RootQueryToMediaItemConnection&quot;
 */
export interface RootQueryToMediaItemConnectionPageInfo {
  __typename?: 'RootQueryToMediaItemConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the Menu type
 */
export interface RootQueryToMenuConnection {
  __typename?: 'RootQueryToMenuConnection';
  /**
   * Edges for the RootQueryToMenuConnection connection
   */
  edges: Array<RootQueryToMenuConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Menu>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToMenuConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToMenuConnectionEdge {
  __typename?: 'RootQueryToMenuConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Menu;
}

/**
 * Page Info on the &quot;RootQueryToMenuConnection&quot;
 */
export interface RootQueryToMenuConnectionPageInfo {
  __typename?: 'RootQueryToMenuConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the MenuItem type
 */
export interface RootQueryToMenuItemConnection {
  __typename?: 'RootQueryToMenuItemConnection';
  /**
   * Edges for the RootQueryToMenuItemConnection connection
   */
  edges: Array<RootQueryToMenuItemConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<MenuItem>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToMenuItemConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToMenuItemConnectionEdge {
  __typename?: 'RootQueryToMenuItemConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: MenuItem;
}

/**
 * Page Info on the &quot;RootQueryToMenuItemConnection&quot;
 */
export interface RootQueryToMenuItemConnectionPageInfo {
  __typename?: 'RootQueryToMenuItemConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the page type
 */
export interface RootQueryToPageConnection {
  __typename?: 'RootQueryToPageConnection';
  /**
   * Edges for the RootQueryToPageConnection connection
   */
  edges: Array<RootQueryToPageConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Page>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToPageConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToPageConnectionEdge {
  __typename?: 'RootQueryToPageConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Page;
}

/**
 * Page Info on the &quot;RootQueryToPageConnection&quot;
 */
export interface RootQueryToPageConnectionPageInfo {
  __typename?: 'RootQueryToPageConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the Plugin type
 */
export interface RootQueryToPluginConnection {
  __typename?: 'RootQueryToPluginConnection';
  /**
   * Edges for the RootQueryToPluginConnection connection
   */
  edges: Array<RootQueryToPluginConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Plugin>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToPluginConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToPluginConnectionEdge {
  __typename?: 'RootQueryToPluginConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Plugin;
}

/**
 * Page Info on the &quot;RootQueryToPluginConnection&quot;
 */
export interface RootQueryToPluginConnectionPageInfo {
  __typename?: 'RootQueryToPluginConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the post type
 */
export interface RootQueryToPostConnection {
  __typename?: 'RootQueryToPostConnection';
  /**
   * Edges for the RootQueryToPostConnection connection
   */
  edges: Array<RootQueryToPostConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Post>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToPostConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToPostConnectionEdge {
  __typename?: 'RootQueryToPostConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Post;
}

/**
 * Page Info on the &quot;RootQueryToPostConnection&quot;
 */
export interface RootQueryToPostConnectionPageInfo {
  __typename?: 'RootQueryToPostConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the postFormat type
 */
export interface RootQueryToPostFormatConnection {
  __typename?: 'RootQueryToPostFormatConnection';
  /**
   * Edges for the RootQueryToPostFormatConnection connection
   */
  edges: Array<RootQueryToPostFormatConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<PostFormat>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToPostFormatConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToPostFormatConnectionEdge {
  __typename?: 'RootQueryToPostFormatConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: PostFormat;
}

/**
 * Page Info on the &quot;RootQueryToPostFormatConnection&quot;
 */
export interface RootQueryToPostFormatConnectionPageInfo {
  __typename?: 'RootQueryToPostFormatConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the ContentNode type
 */
export interface RootQueryToRevisionsConnection {
  __typename?: 'RootQueryToRevisionsConnection';
  /**
   * Edges for the RootQueryToRevisionsConnection connection
   */
  edges: Array<RootQueryToRevisionsConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<ContentNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToRevisionsConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToRevisionsConnectionEdge {
  __typename?: 'RootQueryToRevisionsConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: ContentNode;
}

/**
 * Page Info on the &quot;RootQueryToRevisionsConnection&quot;
 */
export interface RootQueryToRevisionsConnectionPageInfo {
  __typename?: 'RootQueryToRevisionsConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the tag type
 */
export interface RootQueryToTagConnection {
  __typename?: 'RootQueryToTagConnection';
  /**
   * Edges for the RootQueryToTagConnection connection
   */
  edges: Array<RootQueryToTagConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Tag>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToTagConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToTagConnectionEdge {
  __typename?: 'RootQueryToTagConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Tag;
}

/**
 * Page Info on the &quot;RootQueryToTagConnection&quot;
 */
export interface RootQueryToTagConnectionPageInfo {
  __typename?: 'RootQueryToTagConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the Taxonomy type
 */
export interface RootQueryToTaxonomyConnection {
  __typename?: 'RootQueryToTaxonomyConnection';
  /**
   * Edges for the RootQueryToTaxonomyConnection connection
   */
  edges: Array<RootQueryToTaxonomyConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Taxonomy>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToTaxonomyConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToTaxonomyConnectionEdge {
  __typename?: 'RootQueryToTaxonomyConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Taxonomy;
}

/**
 * Page Info on the &quot;RootQueryToTaxonomyConnection&quot;
 */
export interface RootQueryToTaxonomyConnectionPageInfo {
  __typename?: 'RootQueryToTaxonomyConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the TermNode type
 */
export interface RootQueryToTermNodeConnection {
  __typename?: 'RootQueryToTermNodeConnection';
  /**
   * Edges for the RootQueryToTermNodeConnection connection
   */
  edges: Array<RootQueryToTermNodeConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<TermNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToTermNodeConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToTermNodeConnectionEdge {
  __typename?: 'RootQueryToTermNodeConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: TermNode;
}

/**
 * Page Info on the &quot;RootQueryToTermNodeConnection&quot;
 */
export interface RootQueryToTermNodeConnectionPageInfo {
  __typename?: 'RootQueryToTermNodeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the Theme type
 */
export interface RootQueryToThemeConnection {
  __typename?: 'RootQueryToThemeConnection';
  /**
   * Edges for the RootQueryToThemeConnection connection
   */
  edges: Array<RootQueryToThemeConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Theme>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToThemeConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToThemeConnectionEdge {
  __typename?: 'RootQueryToThemeConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Theme;
}

/**
 * Page Info on the &quot;RootQueryToThemeConnection&quot;
 */
export interface RootQueryToThemeConnectionPageInfo {
  __typename?: 'RootQueryToThemeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the User type
 */
export interface RootQueryToUserConnection {
  __typename?: 'RootQueryToUserConnection';
  /**
   * Edges for the RootQueryToUserConnection connection
   */
  edges: Array<RootQueryToUserConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<User>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToUserConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToUserConnectionEdge {
  __typename?: 'RootQueryToUserConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: User;
}

/**
 * Page Info on the &quot;RootQueryToUserConnection&quot;
 */
export interface RootQueryToUserConnectionPageInfo {
  __typename?: 'RootQueryToUserConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the RootQuery type and the UserRole type
 */
export interface RootQueryToUserRoleConnection {
  __typename?: 'RootQueryToUserRoleConnection';
  /**
   * Edges for the RootQueryToUserRoleConnection connection
   */
  edges: Array<RootQueryToUserRoleConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<UserRole>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: RootQueryToUserRoleConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface RootQueryToUserRoleConnectionEdge {
  __typename?: 'RootQueryToUserRoleConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: UserRole;
}

/**
 * Page Info on the &quot;RootQueryToUserRoleConnection&quot;
 */
export interface RootQueryToUserRoleConnectionPageInfo {
  __typename?: 'RootQueryToUserRoleConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * The payload for the sendPasswordResetEmail mutation.
 */
export interface SendPasswordResetEmailPayload {
  __typename?: 'SendPasswordResetEmailPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * Whether the mutation completed successfully. This does NOT necessarily mean that an email was sent.
   */
  success?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The user that the password reset email was sent to
   * @deprecated This field will be removed in a future version of WPGraphQL
   */
  user?: Maybe<User>;
}

/**
 * All of the registered settings
 */
export interface Settings {
  __typename?: 'Settings';
  /**
   * Settings of the the string Settings Group
   */
  discussionSettingsDefaultCommentStatus?: Maybe<ScalarsEnums['String']>;
  /**
   * Settings of the the string Settings Group
   */
  discussionSettingsDefaultPingStatus?: Maybe<ScalarsEnums['String']>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsDateFormat?: Maybe<ScalarsEnums['String']>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsDescription?: Maybe<ScalarsEnums['String']>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsEmail?: Maybe<ScalarsEnums['String']>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsLanguage?: Maybe<ScalarsEnums['String']>;
  /**
   * Settings of the the integer Settings Group
   */
  generalSettingsStartOfWeek?: Maybe<ScalarsEnums['Int']>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsTimeFormat?: Maybe<ScalarsEnums['String']>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsTimezone?: Maybe<ScalarsEnums['String']>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsTitle?: Maybe<ScalarsEnums['String']>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsUrl?: Maybe<ScalarsEnums['String']>;
  /**
   * Settings of the the integer Settings Group
   */
  readingSettingsPageForPosts?: Maybe<ScalarsEnums['Int']>;
  /**
   * Settings of the the integer Settings Group
   */
  readingSettingsPageOnFront?: Maybe<ScalarsEnums['Int']>;
  /**
   * Settings of the the integer Settings Group
   */
  readingSettingsPostsPerPage?: Maybe<ScalarsEnums['Int']>;
  /**
   * Settings of the the string Settings Group
   */
  readingSettingsShowOnFront?: Maybe<ScalarsEnums['String']>;
  /**
   * Settings of the the integer Settings Group
   */
  writingSettingsDefaultCategory?: Maybe<ScalarsEnums['Int']>;
  /**
   * Settings of the the string Settings Group
   */
  writingSettingsDefaultPostFormat?: Maybe<ScalarsEnums['String']>;
  /**
   * Settings of the the boolean Settings Group
   */
  writingSettingsUseSmilies?: Maybe<ScalarsEnums['Boolean']>;
}

/**
 * The tag type
 */
export interface Tag {
  __typename?: 'Tag';
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the Tag type and the ContentNode type
   */
  contentNodes: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<TagToContentNodeConnectionWhereArgs>;
  }) => Maybe<TagToContentNodeConnection>;
  /**
   * The number of objects connected to the object
   */
  count?: Maybe<ScalarsEnums['Int']>;
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * The description of the object
   */
  description?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the TermNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<TermNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the TermNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<TermNodeToEnqueuedStylesheetConnection>;
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  /**
   * The link to the term
   */
  link?: Maybe<ScalarsEnums['String']>;
  /**
   * The human friendly name of the object.
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the Tag type and the post type
   */
  posts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<TagToPostConnectionWhereArgs>;
  }) => Maybe<TagToPostConnection>;
  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: Maybe<ScalarsEnums['String']>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of databaseId
   */
  tagId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Connection between the Tag type and the Taxonomy type
   */
  taxonomy?: Maybe<TagToTaxonomyConnectionEdge>;
  /**
   * The name of the taxonomy that the object is associated with
   */
  taxonomyName?: Maybe<ScalarsEnums['String']>;
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The ID of the term group that this term object belongs to
   */
  termGroupId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The taxonomy ID that the object is associated with
   */
  termTaxonomyId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to tag Nodes
 */
export interface TagConnection {
  __typename?: 'PostToTagConnection' | 'RootQueryToTagConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected tag Nodes
   */
  edges: Array<TagConnectionEdge>;
  /**
   * A list of connected tag Nodes
   */
  nodes: Array<Tag>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: TagConnectionPageInfo;
  $on: $TagConnection;
}

/**
 * Edge between a Node and a connected tag
 */
export interface TagConnectionEdge {
  __typename?: 'PostToTagConnectionEdge' | 'RootQueryToTagConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected tag Node
   */
  node: Tag;
  $on: $TagConnectionEdge;
}

/**
 * Page Info on the connected TagConnectionEdge
 */
export interface TagConnectionPageInfo {
  __typename?:
    | 'PostToTagConnectionPageInfo'
    | 'RootQueryToTagConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $TagConnectionPageInfo;
}

/**
 * Connection between the Tag type and the ContentNode type
 */
export interface TagToContentNodeConnection {
  __typename?: 'TagToContentNodeConnection';
  /**
   * Edges for the TagToContentNodeConnection connection
   */
  edges: Array<TagToContentNodeConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<ContentNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: TagToContentNodeConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface TagToContentNodeConnectionEdge {
  __typename?: 'TagToContentNodeConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: ContentNode;
}

/**
 * Page Info on the &quot;TagToContentNodeConnection&quot;
 */
export interface TagToContentNodeConnectionPageInfo {
  __typename?: 'TagToContentNodeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Tag type and the post type
 */
export interface TagToPostConnection {
  __typename?: 'TagToPostConnection';
  /**
   * Edges for the TagToPostConnection connection
   */
  edges: Array<TagToPostConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Post>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: TagToPostConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface TagToPostConnectionEdge {
  __typename?: 'TagToPostConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Post;
}

/**
 * Page Info on the &quot;TagToPostConnection&quot;
 */
export interface TagToPostConnectionPageInfo {
  __typename?: 'TagToPostConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Tag type and the Taxonomy type
 */
export interface TagToTaxonomyConnectionEdge {
  __typename?: 'TagToTaxonomyConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The node of the connection, without the edges
   */
  node: Taxonomy;
}

/**
 * A taxonomy object
 */
export interface Taxonomy {
  __typename?: 'Taxonomy';
  /**
   * List of Content Types associated with the Taxonomy
   */
  connectedContentTypes: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<TaxonomyToContentTypeConnection>;
  /**
   * List of Term Nodes associated with the Taxonomy
   */
  connectedTerms: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<TaxonomyToTermNodeConnection>;
  /**
   * Description of the taxonomy. This field is equivalent to WP_Taxonomy-&gt;description
   */
  description?: Maybe<ScalarsEnums['String']>;
  /**
   * The plural name of the post type within the GraphQL Schema.
   */
  graphqlPluralName?: Maybe<ScalarsEnums['String']>;
  /**
   * The singular name of the post type within the GraphQL Schema.
   */
  graphqlSingleName?: Maybe<ScalarsEnums['String']>;
  /**
   * Whether the taxonomy is hierarchical
   */
  hierarchical?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The globally unique identifier of the taxonomy object.
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Name of the taxonomy shown in the menu. Usually plural.
   */
  label?: Maybe<ScalarsEnums['String']>;
  /**
   * The display name of the taxonomy. This field is equivalent to WP_Taxonomy-&gt;label
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * Whether the taxonomy is publicly queryable
   */
  public?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Name of content type to display in REST API &quot;wp/v2&quot; namespace.
   */
  restBase?: Maybe<ScalarsEnums['String']>;
  /**
   * The REST Controller class assigned to handling this content type.
   */
  restControllerClass?: Maybe<ScalarsEnums['String']>;
  /**
   * Whether to show the taxonomy as part of a tag cloud widget. This field is equivalent to WP_Taxonomy-&gt;show_tagcloud
   */
  showCloud?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether to display a column for the taxonomy on its post type listing screens.
   */
  showInAdminColumn?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether to add the post type to the GraphQL Schema.
   */
  showInGraphql?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether to show the taxonomy in the admin menu
   */
  showInMenu?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the taxonomy is available for selection in navigation menus.
   */
  showInNavMenus?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether to show the taxonomy in the quick/bulk edit panel.
   */
  showInQuickEdit?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether to add the post type route in the REST API &quot;wp/v2&quot; namespace.
   */
  showInRest?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether to generate and allow a UI for managing terms in this taxonomy in the admin
   */
  showUi?: Maybe<ScalarsEnums['Boolean']>;
}

/**
 * Connection to Taxonomy Nodes
 */
export interface TaxonomyConnection {
  __typename?:
    | 'ContentTypeToTaxonomyConnection'
    | 'RootQueryToTaxonomyConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected Taxonomy Nodes
   */
  edges: Array<TaxonomyConnectionEdge>;
  /**
   * A list of connected Taxonomy Nodes
   */
  nodes: Array<Taxonomy>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: TaxonomyConnectionPageInfo;
  $on: $TaxonomyConnection;
}

/**
 * Edge between a Node and a connected Taxonomy
 */
export interface TaxonomyConnectionEdge {
  __typename?:
    | 'CategoryToTaxonomyConnectionEdge'
    | 'ContentTypeToTaxonomyConnectionEdge'
    | 'PostFormatToTaxonomyConnectionEdge'
    | 'RootQueryToTaxonomyConnectionEdge'
    | 'TagToTaxonomyConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected Taxonomy Node
   */
  node: Taxonomy;
  $on: $TaxonomyConnectionEdge;
}

/**
 * Page Info on the connected TaxonomyConnectionEdge
 */
export interface TaxonomyConnectionPageInfo {
  __typename?:
    | 'ContentTypeToTaxonomyConnectionPageInfo'
    | 'RootQueryToTaxonomyConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $TaxonomyConnectionPageInfo;
}

/**
 * Connection between the Taxonomy type and the ContentType type
 */
export interface TaxonomyToContentTypeConnection {
  __typename?: 'TaxonomyToContentTypeConnection';
  /**
   * Edges for the TaxonomyToContentTypeConnection connection
   */
  edges: Array<TaxonomyToContentTypeConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<ContentType>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: TaxonomyToContentTypeConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface TaxonomyToContentTypeConnectionEdge {
  __typename?: 'TaxonomyToContentTypeConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: ContentType;
}

/**
 * Page Info on the &quot;TaxonomyToContentTypeConnection&quot;
 */
export interface TaxonomyToContentTypeConnectionPageInfo {
  __typename?: 'TaxonomyToContentTypeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the Taxonomy type and the TermNode type
 */
export interface TaxonomyToTermNodeConnection {
  __typename?: 'TaxonomyToTermNodeConnection';
  /**
   * Edges for the TaxonomyToTermNodeConnection connection
   */
  edges: Array<TaxonomyToTermNodeConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<TermNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: TaxonomyToTermNodeConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface TaxonomyToTermNodeConnectionEdge {
  __typename?: 'TaxonomyToTermNodeConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: TermNode;
}

/**
 * Page Info on the &quot;TaxonomyToTermNodeConnection&quot;
 */
export interface TaxonomyToTermNodeConnectionPageInfo {
  __typename?: 'TaxonomyToTermNodeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Terms are nodes within a Taxonomy, used to group and relate other nodes.
 */
export interface TermNode {
  __typename?: 'Category' | 'PostFormat' | 'Tag';
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * The number of objects connected to the object
   */
  count?: Maybe<ScalarsEnums['Int']>;
  /**
   * Identifies the primary key from the database.
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * The description of the object
   */
  description?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the TermNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<TermNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the TermNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<TermNodeToEnqueuedStylesheetConnection>;
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  /**
   * The link to the term
   */
  link?: Maybe<ScalarsEnums['String']>;
  /**
   * The human friendly name of the object.
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: Maybe<ScalarsEnums['String']>;
  /**
   * The name of the taxonomy that the object is associated with
   */
  taxonomyName?: Maybe<ScalarsEnums['String']>;
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The ID of the term group that this term object belongs to
   */
  termGroupId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The taxonomy ID that the object is associated with
   */
  termTaxonomyId?: Maybe<ScalarsEnums['Int']>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
  $on: $TermNode;
}

/**
 * Connection to TermNode Nodes
 */
export interface TermNodeConnection {
  __typename?:
    | 'PostToTermNodeConnection'
    | 'RootQueryToTermNodeConnection'
    | 'TaxonomyToTermNodeConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected TermNode Nodes
   */
  edges: Array<TermNodeConnectionEdge>;
  /**
   * A list of connected TermNode Nodes
   */
  nodes: Array<TermNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: TermNodeConnectionPageInfo;
  $on: $TermNodeConnection;
}

/**
 * Edge between a Node and a connected TermNode
 */
export interface TermNodeConnectionEdge {
  __typename?:
    | 'PostToTermNodeConnectionEdge'
    | 'RootQueryToTermNodeConnectionEdge'
    | 'TaxonomyToTermNodeConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected TermNode Node
   */
  node: TermNode;
  $on: $TermNodeConnectionEdge;
}

/**
 * Page Info on the connected TermNodeConnectionEdge
 */
export interface TermNodeConnectionPageInfo {
  __typename?:
    | 'PostToTermNodeConnectionPageInfo'
    | 'RootQueryToTermNodeConnectionPageInfo'
    | 'TaxonomyToTermNodeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $TermNodeConnectionPageInfo;
}

/**
 * Connection between the TermNode type and the EnqueuedScript type
 */
export interface TermNodeToEnqueuedScriptConnection {
  __typename?: 'TermNodeToEnqueuedScriptConnection';
  /**
   * Edges for the TermNodeToEnqueuedScriptConnection connection
   */
  edges: Array<TermNodeToEnqueuedScriptConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<EnqueuedScript>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: TermNodeToEnqueuedScriptConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface TermNodeToEnqueuedScriptConnectionEdge {
  __typename?: 'TermNodeToEnqueuedScriptConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: EnqueuedScript;
}

/**
 * Page Info on the &quot;TermNodeToEnqueuedScriptConnection&quot;
 */
export interface TermNodeToEnqueuedScriptConnectionPageInfo {
  __typename?: 'TermNodeToEnqueuedScriptConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the TermNode type and the EnqueuedStylesheet type
 */
export interface TermNodeToEnqueuedStylesheetConnection {
  __typename?: 'TermNodeToEnqueuedStylesheetConnection';
  /**
   * Edges for the TermNodeToEnqueuedStylesheetConnection connection
   */
  edges: Array<TermNodeToEnqueuedStylesheetConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<EnqueuedStylesheet>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: TermNodeToEnqueuedStylesheetConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface TermNodeToEnqueuedStylesheetConnectionEdge {
  __typename?: 'TermNodeToEnqueuedStylesheetConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: EnqueuedStylesheet;
}

/**
 * Page Info on the &quot;TermNodeToEnqueuedStylesheetConnection&quot;
 */
export interface TermNodeToEnqueuedStylesheetConnectionPageInfo {
  __typename?: 'TermNodeToEnqueuedStylesheetConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * A theme object
 */
export interface Theme {
  __typename?: 'Theme';
  /**
   * Name of the theme author(s), could also be a company name. This field is equivalent to WP_Theme-&gt;get( &quot;Author&quot; ).
   */
  author?: Maybe<ScalarsEnums['String']>;
  /**
   * URI for the author/company website. This field is equivalent to WP_Theme-&gt;get( &quot;AuthorURI&quot; ).
   */
  authorUri?: Maybe<ScalarsEnums['String']>;
  /**
   * The description of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Description&quot; ).
   */
  description?: Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique identifier of the theme object.
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Display name of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Name&quot; ).
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * The URL of the screenshot for the theme. The screenshot is intended to give an overview of what the theme looks like. This field is equivalent to WP_Theme-&gt;get_screenshot().
   */
  screenshot?: Maybe<ScalarsEnums['String']>;
  /**
   * The theme slug is used to internally match themes. Theme slugs can have subdirectories like: my-theme/sub-theme. This field is equivalent to WP_Theme-&gt;get_stylesheet().
   */
  slug?: Maybe<ScalarsEnums['String']>;
  /**
   * URI for the author/company website. This field is equivalent to WP_Theme-&gt;get( &quot;Tags&quot; ).
   */
  tags?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * A URI if the theme has a website associated with it. The Theme URI is handy for directing users to a theme site for support etc. This field is equivalent to WP_Theme-&gt;get( &quot;ThemeURI&quot; ).
   */
  themeUri?: Maybe<ScalarsEnums['String']>;
  /**
   * The current version of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Version&quot; ).
   */
  version?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to Theme Nodes
 */
export interface ThemeConnection {
  __typename?: 'RootQueryToThemeConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected Theme Nodes
   */
  edges: Array<ThemeConnectionEdge>;
  /**
   * A list of connected Theme Nodes
   */
  nodes: Array<Theme>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: ThemeConnectionPageInfo;
  $on: $ThemeConnection;
}

/**
 * Edge between a Node and a connected Theme
 */
export interface ThemeConnectionEdge {
  __typename?: 'RootQueryToThemeConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected Theme Node
   */
  node: Theme;
  $on: $ThemeConnectionEdge;
}

/**
 * Page Info on the connected ThemeConnectionEdge
 */
export interface ThemeConnectionPageInfo {
  __typename?: 'RootQueryToThemeConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $ThemeConnectionPageInfo;
}

/**
 * Any node that has a URI
 */
export interface UniformResourceIdentifiable {
  __typename?:
    | 'Category'
    | 'ContentType'
    | 'MediaItem'
    | 'Page'
    | 'Post'
    | 'PostFormat'
    | 'Tag'
    | 'User';
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
  $on: $UniformResourceIdentifiable;
}

/**
 * The payload for the updateCategory mutation.
 */
export interface UpdateCategoryPayload {
  __typename?: 'UpdateCategoryPayload';
  /**
   * The created category
   */
  category?: Maybe<Category>;
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
}

/**
 * The payload for the updateComment mutation.
 */
export interface UpdateCommentPayload {
  __typename?: 'UpdateCommentPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The comment that was created
   */
  comment?: Maybe<Comment>;
  /**
   * Whether the mutation succeeded. If the comment is not approved, the server will not return the comment to a non authenticated user, but a success message can be returned if the create succeeded, and the client can optimistically add the comment to the client cache
   */
  success?: Maybe<ScalarsEnums['Boolean']>;
}

/**
 * The payload for the updateMediaItem mutation.
 */
export interface UpdateMediaItemPayload {
  __typename?: 'UpdateMediaItemPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The MediaItem object mutation type.
   */
  mediaItem?: Maybe<MediaItem>;
}

/**
 * The payload for the updatePage mutation.
 */
export interface UpdatePagePayload {
  __typename?: 'UpdatePagePayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The Post object mutation type.
   */
  page?: Maybe<Page>;
}

/**
 * The payload for the updatePostFormat mutation.
 */
export interface UpdatePostFormatPayload {
  __typename?: 'UpdatePostFormatPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The created post_format
   */
  postFormat?: Maybe<PostFormat>;
}

/**
 * The payload for the updatePost mutation.
 */
export interface UpdatePostPayload {
  __typename?: 'UpdatePostPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The Post object mutation type.
   */
  post?: Maybe<Post>;
}

/**
 * The payload for the updateSettings mutation.
 */
export interface UpdateSettingsPayload {
  __typename?: 'UpdateSettingsPayload';
  /**
   * Update all settings.
   */
  allSettings?: Maybe<Settings>;
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * Update the DiscussionSettings setting.
   */
  discussionSettings?: Maybe<DiscussionSettings>;
  /**
   * Update the GeneralSettings setting.
   */
  generalSettings?: Maybe<GeneralSettings>;
  /**
   * Update the ReadingSettings setting.
   */
  readingSettings?: Maybe<ReadingSettings>;
  /**
   * Update the WritingSettings setting.
   */
  writingSettings?: Maybe<WritingSettings>;
}

/**
 * The payload for the updateTag mutation.
 */
export interface UpdateTagPayload {
  __typename?: 'UpdateTagPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The created post_tag
   */
  tag?: Maybe<Tag>;
}

/**
 * The payload for the updateUser mutation.
 */
export interface UpdateUserPayload {
  __typename?: 'UpdateUserPayload';
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums['String']>;
  /**
   * The User object mutation type.
   */
  user?: Maybe<User>;
}

/**
 * A User object
 */
export interface User {
  __typename?: 'User';
  /**
   * Avatar object for user. The avatar object can be retrieved in different sizes by specifying the size argument.
   */
  avatar: (args?: {
    /**
     * Whether to always show the default image, never the Gravatar. Default false
     */
    forceDefault?: Maybe<Scalars['Boolean']>;
    /**
     * The rating level of the avatar.
     */
    rating?: Maybe<AvatarRatingEnum>;
    /**
     * The size attribute of the avatar field can be used to fetch avatars of different sizes. The value corresponds to the dimension in pixels to fetch. The default is 96 pixels.
     * @defaultValue `96`
     */
    size?: Maybe<Scalars['Int']>;
  }) => Maybe<Avatar>;
  /**
   * User metadata option name. Usually it will be &quot;wp_capabilities&quot;.
   */
  capKey?: Maybe<ScalarsEnums['String']>;
  /**
   * A list of capabilities (permissions) granted to the user
   */
  capabilities?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * Connection between the User type and the Comment type
   */
  comments: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToCommentConnectionWhereArgs>;
  }) => Maybe<UserToCommentConnection>;
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Identifies the primary key from the database.
   */
  databaseId: ScalarsEnums['Int'];
  /**
   * Description of the user.
   */
  description?: Maybe<ScalarsEnums['String']>;
  /**
   * Email address of the user. This is equivalent to the WP_User-&gt;user_email property.
   */
  email?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the User type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<UserToEnqueuedScriptConnection>;
  /**
   * Connection between the User type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<UserToEnqueuedStylesheetConnection>;
  /**
   * A complete list of capabilities including capabilities inherited from a role. This is equivalent to the array keys of WP_User-&gt;allcaps.
   */
  extraCapabilities?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * First name of the user. This is equivalent to the WP_User-&gt;user_first_name property.
   */
  firstName?: Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique identifier for the user object.
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums['Boolean'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums['Boolean'];
  /**
   * Last name of the user. This is equivalent to the WP_User-&gt;user_last_name property.
   */
  lastName?: Maybe<ScalarsEnums['String']>;
  /**
   * The preferred language locale set for the user. Value derived from get_user_locale().
   */
  locale?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the User type and the mediaItem type
   */
  mediaItems: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToMediaItemConnectionWhereArgs>;
  }) => Maybe<UserToMediaItemConnection>;
  /**
   * Display name of the user. This is equivalent to the WP_User-&gt;display_name property.
   */
  name?: Maybe<ScalarsEnums['String']>;
  /**
   * The nicename for the user. This field is equivalent to WP_User-&gt;user_nicename
   */
  nicename?: Maybe<ScalarsEnums['String']>;
  /**
   * Nickname of the user.
   */
  nickname?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the User type and the page type
   */
  pages: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToPageConnectionWhereArgs>;
  }) => Maybe<UserToPageConnection>;
  /**
   * Connection between the User type and the post type
   */
  posts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToPostConnectionWhereArgs>;
  }) => Maybe<UserToPostConnection>;
  /**
   * The date the user registered or was created. The field follows a full ISO8601 date string format.
   */
  registeredDate?: Maybe<ScalarsEnums['String']>;
  /**
   * Connection between the User and Revisions authored by the user
   */
  revisions: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToRevisionsConnectionWhereArgs>;
  }) => Maybe<UserToRevisionsConnection>;
  /**
   * Connection between the User type and the UserRole type
   */
  roles: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars['String']>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars['String']>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars['Int']>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<UserToUserRoleConnection>;
  /**
   * Whether the Toolbar should be displayed when the user is viewing the site.
   */
  shouldShowAdminToolbar?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The slug for the user. This field is equivalent to WP_User-&gt;user_nicename
   */
  slug?: Maybe<ScalarsEnums['String']>;
  templates?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums['String']>;
  /**
   * A website url that is associated with the user.
   */
  url?: Maybe<ScalarsEnums['String']>;
  /**
   * The Id of the user. Equivalent to WP_User-&gt;ID
   * @deprecated Deprecated in favor of the databaseId field
   */
  userId?: Maybe<ScalarsEnums['Int']>;
  /**
   * Username for the user. This field is equivalent to WP_User-&gt;user_login.
   */
  username?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to User Nodes
 */
export interface UserConnection {
  __typename?: 'RootQueryToUserConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected User Nodes
   */
  edges: Array<UserConnectionEdge>;
  /**
   * A list of connected User Nodes
   */
  nodes: Array<User>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: UserConnectionPageInfo;
  $on: $UserConnection;
}

/**
 * Edge between a Node and a connected User
 */
export interface UserConnectionEdge {
  __typename?:
    | 'ContentNodeToEditLastConnectionEdge'
    | 'ContentNodeToEditLockConnectionEdge'
    | 'NodeWithAuthorToUserConnectionEdge'
    | 'RootQueryToUserConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected User Node
   */
  node: User;
  $on: $UserConnectionEdge;
}

/**
 * Page Info on the connected UserConnectionEdge
 */
export interface UserConnectionPageInfo {
  __typename?: 'RootQueryToUserConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $UserConnectionPageInfo;
}

/**
 * A user role object
 */
export interface UserRole {
  __typename?: 'UserRole';
  /**
   * The capabilities that belong to this role
   */
  capabilities?: Maybe<Array<Maybe<ScalarsEnums['String']>>>;
  /**
   * The display name of the role
   */
  displayName?: Maybe<ScalarsEnums['String']>;
  /**
   * The globally unique identifier for the user role object.
   */
  id: ScalarsEnums['ID'];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums['Boolean']>;
  /**
   * The registered name of the role
   */
  name?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection to UserRole Nodes
 */
export interface UserRoleConnection {
  __typename?: 'RootQueryToUserRoleConnection' | 'UserToUserRoleConnection';
  /**
   * A list of edges (relational context) between RootQuery and connected UserRole Nodes
   */
  edges: Array<UserRoleConnectionEdge>;
  /**
   * A list of connected UserRole Nodes
   */
  nodes: Array<UserRole>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: UserRoleConnectionPageInfo;
  $on: $UserRoleConnection;
}

/**
 * Edge between a Node and a connected UserRole
 */
export interface UserRoleConnectionEdge {
  __typename?:
    | 'RootQueryToUserRoleConnectionEdge'
    | 'UserToUserRoleConnectionEdge';
  /**
   * Opaque reference to the nodes position in the connection. Value can be used with pagination args.
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The connected UserRole Node
   */
  node: UserRole;
  $on: $UserRoleConnectionEdge;
}

/**
 * Page Info on the connected UserRoleConnectionEdge
 */
export interface UserRoleConnectionPageInfo {
  __typename?:
    | 'RootQueryToUserRoleConnectionPageInfo'
    | 'UserToUserRoleConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $UserRoleConnectionPageInfo;
}

/**
 * Connection between the User type and the Comment type
 */
export interface UserToCommentConnection {
  __typename?: 'UserToCommentConnection';
  /**
   * Edges for the UserToCommentConnection connection
   */
  edges: Array<UserToCommentConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Comment>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: UserToCommentConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface UserToCommentConnectionEdge {
  __typename?: 'UserToCommentConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Comment;
}

/**
 * Page Info on the &quot;UserToCommentConnection&quot;
 */
export interface UserToCommentConnectionPageInfo {
  __typename?: 'UserToCommentConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the User type and the EnqueuedScript type
 */
export interface UserToEnqueuedScriptConnection {
  __typename?: 'UserToEnqueuedScriptConnection';
  /**
   * Edges for the UserToEnqueuedScriptConnection connection
   */
  edges: Array<UserToEnqueuedScriptConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<EnqueuedScript>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: UserToEnqueuedScriptConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface UserToEnqueuedScriptConnectionEdge {
  __typename?: 'UserToEnqueuedScriptConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: EnqueuedScript;
}

/**
 * Page Info on the &quot;UserToEnqueuedScriptConnection&quot;
 */
export interface UserToEnqueuedScriptConnectionPageInfo {
  __typename?: 'UserToEnqueuedScriptConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the User type and the EnqueuedStylesheet type
 */
export interface UserToEnqueuedStylesheetConnection {
  __typename?: 'UserToEnqueuedStylesheetConnection';
  /**
   * Edges for the UserToEnqueuedStylesheetConnection connection
   */
  edges: Array<UserToEnqueuedStylesheetConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<EnqueuedStylesheet>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: UserToEnqueuedStylesheetConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface UserToEnqueuedStylesheetConnectionEdge {
  __typename?: 'UserToEnqueuedStylesheetConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: EnqueuedStylesheet;
}

/**
 * Page Info on the &quot;UserToEnqueuedStylesheetConnection&quot;
 */
export interface UserToEnqueuedStylesheetConnectionPageInfo {
  __typename?: 'UserToEnqueuedStylesheetConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the User type and the mediaItem type
 */
export interface UserToMediaItemConnection {
  __typename?: 'UserToMediaItemConnection';
  /**
   * Edges for the UserToMediaItemConnection connection
   */
  edges: Array<UserToMediaItemConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<MediaItem>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: UserToMediaItemConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface UserToMediaItemConnectionEdge {
  __typename?: 'UserToMediaItemConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: MediaItem;
}

/**
 * Page Info on the &quot;UserToMediaItemConnection&quot;
 */
export interface UserToMediaItemConnectionPageInfo {
  __typename?: 'UserToMediaItemConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the User type and the page type
 */
export interface UserToPageConnection {
  __typename?: 'UserToPageConnection';
  /**
   * Edges for the UserToPageConnection connection
   */
  edges: Array<UserToPageConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Page>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: UserToPageConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface UserToPageConnectionEdge {
  __typename?: 'UserToPageConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Page;
}

/**
 * Page Info on the &quot;UserToPageConnection&quot;
 */
export interface UserToPageConnectionPageInfo {
  __typename?: 'UserToPageConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the User type and the post type
 */
export interface UserToPostConnection {
  __typename?: 'UserToPostConnection';
  /**
   * Edges for the UserToPostConnection connection
   */
  edges: Array<UserToPostConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<Post>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: UserToPostConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface UserToPostConnectionEdge {
  __typename?: 'UserToPostConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: Post;
}

/**
 * Page Info on the &quot;UserToPostConnection&quot;
 */
export interface UserToPostConnectionPageInfo {
  __typename?: 'UserToPostConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the User type and the ContentNode type
 */
export interface UserToRevisionsConnection {
  __typename?: 'UserToRevisionsConnection';
  /**
   * Edges for the UserToRevisionsConnection connection
   */
  edges: Array<UserToRevisionsConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<ContentNode>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: UserToRevisionsConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface UserToRevisionsConnectionEdge {
  __typename?: 'UserToRevisionsConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: ContentNode;
}

/**
 * Page Info on the &quot;UserToRevisionsConnection&quot;
 */
export interface UserToRevisionsConnectionPageInfo {
  __typename?: 'UserToRevisionsConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Connection between the User type and the UserRole type
 */
export interface UserToUserRoleConnection {
  __typename?: 'UserToUserRoleConnection';
  /**
   * Edges for the UserToUserRoleConnection connection
   */
  edges: Array<UserToUserRoleConnectionEdge>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes: Array<UserRole>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo: UserToUserRoleConnectionPageInfo;
}

/**
 * An edge in a connection
 */
export interface UserToUserRoleConnectionEdge {
  __typename?: 'UserToUserRoleConnectionEdge';
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums['String']>;
  /**
   * The item at the end of the edge
   */
  node: UserRole;
}

/**
 * Page Info on the &quot;UserToUserRoleConnection&quot;
 */
export interface UserToUserRoleConnectionPageInfo {
  __typename?: 'UserToUserRoleConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
}

/**
 * Information about pagination in a connection.
 */
export interface WPPageInfo {
  __typename?:
    | 'CategoryToAncestorsCategoryConnectionPageInfo'
    | 'CategoryToCategoryConnectionPageInfo'
    | 'CategoryToContentNodeConnectionPageInfo'
    | 'CategoryToPostConnectionPageInfo'
    | 'CommentToCommentConnectionPageInfo'
    | 'ContentNodeToEnqueuedScriptConnectionPageInfo'
    | 'ContentNodeToEnqueuedStylesheetConnectionPageInfo'
    | 'ContentTypeToContentNodeConnectionPageInfo'
    | 'ContentTypeToTaxonomyConnectionPageInfo'
    | 'HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo'
    | 'HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo'
    | 'MediaItemToCommentConnectionPageInfo'
    | 'MenuItemToMenuItemConnectionPageInfo'
    | 'MenuToMenuItemConnectionPageInfo'
    | 'PageToCommentConnectionPageInfo'
    | 'PageToRevisionConnectionPageInfo'
    | 'PostFormatToContentNodeConnectionPageInfo'
    | 'PostFormatToPostConnectionPageInfo'
    | 'PostToCategoryConnectionPageInfo'
    | 'PostToCommentConnectionPageInfo'
    | 'PostToPostFormatConnectionPageInfo'
    | 'PostToRevisionConnectionPageInfo'
    | 'PostToTagConnectionPageInfo'
    | 'PostToTermNodeConnectionPageInfo'
    | 'RootQueryToCategoryConnectionPageInfo'
    | 'RootQueryToCommentConnectionPageInfo'
    | 'RootQueryToContentNodeConnectionPageInfo'
    | 'RootQueryToContentTypeConnectionPageInfo'
    | 'RootQueryToEnqueuedScriptConnectionPageInfo'
    | 'RootQueryToEnqueuedStylesheetConnectionPageInfo'
    | 'RootQueryToMediaItemConnectionPageInfo'
    | 'RootQueryToMenuConnectionPageInfo'
    | 'RootQueryToMenuItemConnectionPageInfo'
    | 'RootQueryToPageConnectionPageInfo'
    | 'RootQueryToPluginConnectionPageInfo'
    | 'RootQueryToPostConnectionPageInfo'
    | 'RootQueryToPostFormatConnectionPageInfo'
    | 'RootQueryToRevisionsConnectionPageInfo'
    | 'RootQueryToTagConnectionPageInfo'
    | 'RootQueryToTaxonomyConnectionPageInfo'
    | 'RootQueryToTermNodeConnectionPageInfo'
    | 'RootQueryToThemeConnectionPageInfo'
    | 'RootQueryToUserConnectionPageInfo'
    | 'RootQueryToUserRoleConnectionPageInfo'
    | 'TagToContentNodeConnectionPageInfo'
    | 'TagToPostConnectionPageInfo'
    | 'TaxonomyToContentTypeConnectionPageInfo'
    | 'TaxonomyToTermNodeConnectionPageInfo'
    | 'TermNodeToEnqueuedScriptConnectionPageInfo'
    | 'TermNodeToEnqueuedStylesheetConnectionPageInfo'
    | 'UserToCommentConnectionPageInfo'
    | 'UserToEnqueuedScriptConnectionPageInfo'
    | 'UserToEnqueuedStylesheetConnectionPageInfo'
    | 'UserToMediaItemConnectionPageInfo'
    | 'UserToPageConnectionPageInfo'
    | 'UserToPostConnectionPageInfo'
    | 'UserToRevisionsConnectionPageInfo'
    | 'UserToUserRoleConnectionPageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean'];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>;
  $on: $WPPageInfo;
}

/**
 * The writing setting type
 */
export interface WritingSettings {
  __typename?: 'WritingSettings';
  /**
   * Default post category.
   */
  defaultCategory?: Maybe<ScalarsEnums['Int']>;
  /**
   * Default post format.
   */
  defaultPostFormat?: Maybe<ScalarsEnums['String']>;
  /**
   * Convert emoticons like :-) and :-P to graphics on display.
   */
  useSmilies?: Maybe<ScalarsEnums['Boolean']>;
}

export interface Mutation {
  __typename?: 'Mutation';
  createCategory: (args: {
    input: CreateCategoryInput;
  }) => Maybe<CreateCategoryPayload>;
  createComment: (args: {
    input: CreateCommentInput;
  }) => Maybe<CreateCommentPayload>;
  createMediaItem: (args: {
    input: CreateMediaItemInput;
  }) => Maybe<CreateMediaItemPayload>;
  createPage: (args: { input: CreatePageInput }) => Maybe<CreatePagePayload>;
  createPost: (args: { input: CreatePostInput }) => Maybe<CreatePostPayload>;
  createPostFormat: (args: {
    input: CreatePostFormatInput;
  }) => Maybe<CreatePostFormatPayload>;
  createTag: (args: { input: CreateTagInput }) => Maybe<CreateTagPayload>;
  createUser: (args: { input: CreateUserInput }) => Maybe<CreateUserPayload>;
  deleteCategory: (args: {
    input: DeleteCategoryInput;
  }) => Maybe<DeleteCategoryPayload>;
  deleteComment: (args: {
    input: DeleteCommentInput;
  }) => Maybe<DeleteCommentPayload>;
  deleteMediaItem: (args: {
    input: DeleteMediaItemInput;
  }) => Maybe<DeleteMediaItemPayload>;
  deletePage: (args: { input: DeletePageInput }) => Maybe<DeletePagePayload>;
  deletePost: (args: { input: DeletePostInput }) => Maybe<DeletePostPayload>;
  deletePostFormat: (args: {
    input: DeletePostFormatInput;
  }) => Maybe<DeletePostFormatPayload>;
  deleteTag: (args: { input: DeleteTagInput }) => Maybe<DeleteTagPayload>;
  deleteUser: (args: { input: DeleteUserInput }) => Maybe<DeleteUserPayload>;
  generateAuthorizationCode: (args: {
    input: GenerateAuthorizationCodeInput;
  }) => Maybe<GenerateAuthorizationCodePayload>;
  increaseCount: (args?: {
    count?: Maybe<Scalars['Int']>;
  }) => Maybe<ScalarsEnums['Int']>;
  registerUser: (args: {
    input: RegisterUserInput;
  }) => Maybe<RegisterUserPayload>;
  resetUserPassword: (args: {
    input: ResetUserPasswordInput;
  }) => Maybe<ResetUserPasswordPayload>;
  restoreComment: (args: {
    input: RestoreCommentInput;
  }) => Maybe<RestoreCommentPayload>;
  sendPasswordResetEmail: (args: {
    input: SendPasswordResetEmailInput;
  }) => Maybe<SendPasswordResetEmailPayload>;
  updateCategory: (args: {
    input: UpdateCategoryInput;
  }) => Maybe<UpdateCategoryPayload>;
  updateComment: (args: {
    input: UpdateCommentInput;
  }) => Maybe<UpdateCommentPayload>;
  updateMediaItem: (args: {
    input: UpdateMediaItemInput;
  }) => Maybe<UpdateMediaItemPayload>;
  updatePage: (args: { input: UpdatePageInput }) => Maybe<UpdatePagePayload>;
  updatePost: (args: { input: UpdatePostInput }) => Maybe<UpdatePostPayload>;
  updatePostFormat: (args: {
    input: UpdatePostFormatInput;
  }) => Maybe<UpdatePostFormatPayload>;
  updateSettings: (args: {
    input: UpdateSettingsInput;
  }) => Maybe<UpdateSettingsPayload>;
  updateTag: (args: { input: UpdateTagInput }) => Maybe<UpdateTagPayload>;
  updateUser: (args: { input: UpdateUserInput }) => Maybe<UpdateUserPayload>;
}

export interface Query {
  __typename?: 'Query';
  allSettings?: Maybe<Settings>;
  categories: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToCategoryConnectionWhereArgs>;
  }) => Maybe<RootQueryToCategoryConnection>;
  category: (args: {
    id: Scalars['ID'];
    idType?: Maybe<CategoryIdType>;
  }) => Maybe<Category>;
  comment: (args: {
    id: Scalars['ID'];
    idType?: Maybe<CommentNodeIdTypeEnum>;
  }) => Maybe<Comment>;
  comments: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToCommentConnectionWhereArgs>;
  }) => Maybe<RootQueryToCommentConnection>;
  contentNode: (args: {
    asPreview?: Maybe<Scalars['Boolean']>;
    contentType?: Maybe<ContentTypeEnum>;
    id: Scalars['ID'];
    idType?: Maybe<ContentNodeIdTypeEnum>;
  }) => Maybe<ContentNode>;
  contentNodes: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToContentNodeConnectionWhereArgs>;
  }) => Maybe<RootQueryToContentNodeConnection>;
  contentType: (args: {
    id: Scalars['ID'];
    idType?: Maybe<ContentTypeIdTypeEnum>;
  }) => Maybe<ContentType>;
  contentTypes: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<RootQueryToContentTypeConnection>;
  discussionSettings?: Maybe<DiscussionSettings>;
  generalSettings?: Maybe<GeneralSettings>;
  mediaItem: (args: {
    asPreview?: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
    idType?: Maybe<MediaItemIdType>;
  }) => Maybe<MediaItem>;
  mediaItemBy: (args?: {
    id?: Maybe<Scalars['ID']>;
    mediaItemId?: Maybe<Scalars['Int']>;
    slug?: Maybe<Scalars['String']>;
    uri?: Maybe<Scalars['String']>;
  }) => Maybe<MediaItem>;
  mediaItems: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToMediaItemConnectionWhereArgs>;
  }) => Maybe<RootQueryToMediaItemConnection>;
  menu: (args: {
    id: Scalars['ID'];
    idType?: Maybe<MenuNodeIdTypeEnum>;
  }) => Maybe<Menu>;
  menuItem: (args: {
    id: Scalars['ID'];
    idType?: Maybe<MenuItemNodeIdTypeEnum>;
  }) => Maybe<MenuItem>;
  menuItems: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToMenuItemConnectionWhereArgs>;
  }) => Maybe<RootQueryToMenuItemConnection>;
  menus: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToMenuConnectionWhereArgs>;
  }) => Maybe<RootQueryToMenuConnection>;
  node: (args?: { id?: Maybe<Scalars['ID']> }) => Maybe<Node>;
  nodeByUri: (args: {
    uri: Scalars['String'];
  }) => Maybe<UniformResourceIdentifiable>;
  page: (args: {
    asPreview?: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
    idType?: Maybe<PageIdType>;
  }) => Maybe<Page>;
  pageBy: (args?: {
    id?: Maybe<Scalars['ID']>;
    pageId?: Maybe<Scalars['Int']>;
    uri?: Maybe<Scalars['String']>;
  }) => Maybe<Page>;
  pages: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToPageConnectionWhereArgs>;
  }) => Maybe<RootQueryToPageConnection>;
  plugin: (args: { id: Scalars['ID'] }) => Maybe<Plugin>;
  plugins: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToPluginConnectionWhereArgs>;
  }) => Maybe<RootQueryToPluginConnection>;
  post: (args: {
    asPreview?: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
    idType?: Maybe<PostIdType>;
  }) => Maybe<Post>;
  postBy: (args?: {
    id?: Maybe<Scalars['ID']>;
    postId?: Maybe<Scalars['Int']>;
    slug?: Maybe<Scalars['String']>;
    uri?: Maybe<Scalars['String']>;
  }) => Maybe<Post>;
  postFormat: (args: {
    id: Scalars['ID'];
    idType?: Maybe<PostFormatIdType>;
  }) => Maybe<PostFormat>;
  postFormats: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToPostFormatConnectionWhereArgs>;
  }) => Maybe<RootQueryToPostFormatConnection>;
  posts: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToPostConnectionWhereArgs>;
  }) => Maybe<RootQueryToPostConnection>;
  readingSettings?: Maybe<ReadingSettings>;
  registeredScripts: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<RootQueryToEnqueuedScriptConnection>;
  registeredStylesheets: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<RootQueryToEnqueuedStylesheetConnection>;
  revisions: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToRevisionsConnectionWhereArgs>;
  }) => Maybe<RootQueryToRevisionsConnection>;
  tag: (args: { id: Scalars['ID']; idType?: Maybe<TagIdType> }) => Maybe<Tag>;
  tags: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToTagConnectionWhereArgs>;
  }) => Maybe<RootQueryToTagConnection>;
  taxonomies: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<RootQueryToTaxonomyConnection>;
  taxonomy: (args: {
    id: Scalars['ID'];
    idType?: Maybe<TaxonomyIdTypeEnum>;
  }) => Maybe<Taxonomy>;
  termNode: (args: {
    id: Scalars['ID'];
    idType?: Maybe<TermNodeIdTypeEnum>;
    taxonomy?: Maybe<TaxonomyEnum>;
  }) => Maybe<TermNode>;
  terms: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToTermNodeConnectionWhereArgs>;
  }) => Maybe<RootQueryToTermNodeConnection>;
  theme: (args: { id: Scalars['ID'] }) => Maybe<Theme>;
  themes: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<RootQueryToThemeConnection>;
  user: (args: {
    id: Scalars['ID'];
    idType?: Maybe<UserNodeIdTypeEnum>;
  }) => Maybe<User>;
  userRole: (args: { id: Scalars['ID'] }) => Maybe<UserRole>;
  userRoles: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
  }) => Maybe<RootQueryToUserRoleConnection>;
  users: (args?: {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    where?: Maybe<RootQueryToUserConnectionWhereArgs>;
  }) => Maybe<RootQueryToUserConnection>;
  viewer?: Maybe<User>;
  writingSettings?: Maybe<WritingSettings>;
}

export interface Subscription {
  __typename?: 'Subscription';
}

export interface SchemaObjectTypes {
  Avatar: Avatar;
  Category: Category;
  CategoryToAncestorsCategoryConnection: CategoryToAncestorsCategoryConnection;
  CategoryToAncestorsCategoryConnectionEdge: CategoryToAncestorsCategoryConnectionEdge;
  CategoryToAncestorsCategoryConnectionPageInfo: CategoryToAncestorsCategoryConnectionPageInfo;
  CategoryToCategoryConnection: CategoryToCategoryConnection;
  CategoryToCategoryConnectionEdge: CategoryToCategoryConnectionEdge;
  CategoryToCategoryConnectionPageInfo: CategoryToCategoryConnectionPageInfo;
  CategoryToContentNodeConnection: CategoryToContentNodeConnection;
  CategoryToContentNodeConnectionEdge: CategoryToContentNodeConnectionEdge;
  CategoryToContentNodeConnectionPageInfo: CategoryToContentNodeConnectionPageInfo;
  CategoryToParentCategoryConnectionEdge: CategoryToParentCategoryConnectionEdge;
  CategoryToPostConnection: CategoryToPostConnection;
  CategoryToPostConnectionEdge: CategoryToPostConnectionEdge;
  CategoryToPostConnectionPageInfo: CategoryToPostConnectionPageInfo;
  CategoryToTaxonomyConnectionEdge: CategoryToTaxonomyConnectionEdge;
  Comment: Comment;
  CommentAuthor: CommentAuthor;
  CommentToCommentConnection: CommentToCommentConnection;
  CommentToCommentConnectionEdge: CommentToCommentConnectionEdge;
  CommentToCommentConnectionPageInfo: CommentToCommentConnectionPageInfo;
  CommentToCommenterConnectionEdge: CommentToCommenterConnectionEdge;
  CommentToContentNodeConnectionEdge: CommentToContentNodeConnectionEdge;
  CommentToParentCommentConnectionEdge: CommentToParentCommentConnectionEdge;
  ConditionalTags: ConditionalTags;
  ContentNodeToContentTypeConnectionEdge: ContentNodeToContentTypeConnectionEdge;
  ContentNodeToEditLastConnectionEdge: ContentNodeToEditLastConnectionEdge;
  ContentNodeToEditLockConnectionEdge: ContentNodeToEditLockConnectionEdge;
  ContentNodeToEnqueuedScriptConnection: ContentNodeToEnqueuedScriptConnection;
  ContentNodeToEnqueuedScriptConnectionEdge: ContentNodeToEnqueuedScriptConnectionEdge;
  ContentNodeToEnqueuedScriptConnectionPageInfo: ContentNodeToEnqueuedScriptConnectionPageInfo;
  ContentNodeToEnqueuedStylesheetConnection: ContentNodeToEnqueuedStylesheetConnection;
  ContentNodeToEnqueuedStylesheetConnectionEdge: ContentNodeToEnqueuedStylesheetConnectionEdge;
  ContentNodeToEnqueuedStylesheetConnectionPageInfo: ContentNodeToEnqueuedStylesheetConnectionPageInfo;
  ContentType: ContentType;
  ContentTypeToContentNodeConnection: ContentTypeToContentNodeConnection;
  ContentTypeToContentNodeConnectionEdge: ContentTypeToContentNodeConnectionEdge;
  ContentTypeToContentNodeConnectionPageInfo: ContentTypeToContentNodeConnectionPageInfo;
  ContentTypeToTaxonomyConnection: ContentTypeToTaxonomyConnection;
  ContentTypeToTaxonomyConnectionEdge: ContentTypeToTaxonomyConnectionEdge;
  ContentTypeToTaxonomyConnectionPageInfo: ContentTypeToTaxonomyConnectionPageInfo;
  CreateCategoryPayload: CreateCategoryPayload;
  CreateCommentPayload: CreateCommentPayload;
  CreateMediaItemPayload: CreateMediaItemPayload;
  CreatePagePayload: CreatePagePayload;
  CreatePostFormatPayload: CreatePostFormatPayload;
  CreatePostPayload: CreatePostPayload;
  CreateTagPayload: CreateTagPayload;
  CreateUserPayload: CreateUserPayload;
  DefaultTemplate: DefaultTemplate;
  DeleteCategoryPayload: DeleteCategoryPayload;
  DeleteCommentPayload: DeleteCommentPayload;
  DeleteMediaItemPayload: DeleteMediaItemPayload;
  DeletePagePayload: DeletePagePayload;
  DeletePostFormatPayload: DeletePostFormatPayload;
  DeletePostPayload: DeletePostPayload;
  DeleteTagPayload: DeleteTagPayload;
  DeleteUserPayload: DeleteUserPayload;
  DiscussionSettings: DiscussionSettings;
  EnqueuedScript: EnqueuedScript;
  EnqueuedStylesheet: EnqueuedStylesheet;
  GeneralSettings: GeneralSettings;
  GenerateAuthorizationCodePayload: GenerateAuthorizationCodePayload;
  HierarchicalContentNodeToContentNodeAncestorsConnection: HierarchicalContentNodeToContentNodeAncestorsConnection;
  HierarchicalContentNodeToContentNodeAncestorsConnectionEdge: HierarchicalContentNodeToContentNodeAncestorsConnectionEdge;
  HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo: HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo;
  HierarchicalContentNodeToContentNodeChildrenConnection: HierarchicalContentNodeToContentNodeChildrenConnection;
  HierarchicalContentNodeToContentNodeChildrenConnectionEdge: HierarchicalContentNodeToContentNodeChildrenConnectionEdge;
  HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo: HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo;
  HierarchicalContentNodeToParentContentNodeConnectionEdge: HierarchicalContentNodeToParentContentNodeConnectionEdge;
  MediaDetails: MediaDetails;
  MediaItem: MediaItem;
  MediaItemMeta: MediaItemMeta;
  MediaItemToCommentConnection: MediaItemToCommentConnection;
  MediaItemToCommentConnectionEdge: MediaItemToCommentConnectionEdge;
  MediaItemToCommentConnectionPageInfo: MediaItemToCommentConnectionPageInfo;
  MediaSize: MediaSize;
  Menu: Menu;
  MenuItem: MenuItem;
  MenuItemToMenuConnectionEdge: MenuItemToMenuConnectionEdge;
  MenuItemToMenuItemConnection: MenuItemToMenuItemConnection;
  MenuItemToMenuItemConnectionEdge: MenuItemToMenuItemConnectionEdge;
  MenuItemToMenuItemConnectionPageInfo: MenuItemToMenuItemConnectionPageInfo;
  MenuItemToMenuItemLinkableConnectionEdge: MenuItemToMenuItemLinkableConnectionEdge;
  MenuToMenuItemConnection: MenuToMenuItemConnection;
  MenuToMenuItemConnectionEdge: MenuToMenuItemConnectionEdge;
  MenuToMenuItemConnectionPageInfo: MenuToMenuItemConnectionPageInfo;
  Mutation: Mutation;
  NodeWithAuthorToUserConnectionEdge: NodeWithAuthorToUserConnectionEdge;
  NodeWithFeaturedImageToMediaItemConnectionEdge: NodeWithFeaturedImageToMediaItemConnectionEdge;
  NodeWithRevisionsToContentNodeConnectionEdge: NodeWithRevisionsToContentNodeConnectionEdge;
  Page: Page;
  PageToCommentConnection: PageToCommentConnection;
  PageToCommentConnectionEdge: PageToCommentConnectionEdge;
  PageToCommentConnectionPageInfo: PageToCommentConnectionPageInfo;
  PageToPreviewConnectionEdge: PageToPreviewConnectionEdge;
  PageToRevisionConnection: PageToRevisionConnection;
  PageToRevisionConnectionEdge: PageToRevisionConnectionEdge;
  PageToRevisionConnectionPageInfo: PageToRevisionConnectionPageInfo;
  Plugin: Plugin;
  Post: Post;
  PostFormat: PostFormat;
  PostFormatToContentNodeConnection: PostFormatToContentNodeConnection;
  PostFormatToContentNodeConnectionEdge: PostFormatToContentNodeConnectionEdge;
  PostFormatToContentNodeConnectionPageInfo: PostFormatToContentNodeConnectionPageInfo;
  PostFormatToPostConnection: PostFormatToPostConnection;
  PostFormatToPostConnectionEdge: PostFormatToPostConnectionEdge;
  PostFormatToPostConnectionPageInfo: PostFormatToPostConnectionPageInfo;
  PostFormatToTaxonomyConnectionEdge: PostFormatToTaxonomyConnectionEdge;
  PostToCategoryConnection: PostToCategoryConnection;
  PostToCategoryConnectionEdge: PostToCategoryConnectionEdge;
  PostToCategoryConnectionPageInfo: PostToCategoryConnectionPageInfo;
  PostToCommentConnection: PostToCommentConnection;
  PostToCommentConnectionEdge: PostToCommentConnectionEdge;
  PostToCommentConnectionPageInfo: PostToCommentConnectionPageInfo;
  PostToPostFormatConnection: PostToPostFormatConnection;
  PostToPostFormatConnectionEdge: PostToPostFormatConnectionEdge;
  PostToPostFormatConnectionPageInfo: PostToPostFormatConnectionPageInfo;
  PostToPreviewConnectionEdge: PostToPreviewConnectionEdge;
  PostToRevisionConnection: PostToRevisionConnection;
  PostToRevisionConnectionEdge: PostToRevisionConnectionEdge;
  PostToRevisionConnectionPageInfo: PostToRevisionConnectionPageInfo;
  PostToTagConnection: PostToTagConnection;
  PostToTagConnectionEdge: PostToTagConnectionEdge;
  PostToTagConnectionPageInfo: PostToTagConnectionPageInfo;
  PostToTermNodeConnection: PostToTermNodeConnection;
  PostToTermNodeConnectionEdge: PostToTermNodeConnectionEdge;
  PostToTermNodeConnectionPageInfo: PostToTermNodeConnectionPageInfo;
  PostTypeLabelDetails: PostTypeLabelDetails;
  Query: Query;
  ReadingSettings: ReadingSettings;
  RegisterUserPayload: RegisterUserPayload;
  ResetUserPasswordPayload: ResetUserPasswordPayload;
  RestoreCommentPayload: RestoreCommentPayload;
  RootQueryToCategoryConnection: RootQueryToCategoryConnection;
  RootQueryToCategoryConnectionEdge: RootQueryToCategoryConnectionEdge;
  RootQueryToCategoryConnectionPageInfo: RootQueryToCategoryConnectionPageInfo;
  RootQueryToCommentConnection: RootQueryToCommentConnection;
  RootQueryToCommentConnectionEdge: RootQueryToCommentConnectionEdge;
  RootQueryToCommentConnectionPageInfo: RootQueryToCommentConnectionPageInfo;
  RootQueryToContentNodeConnection: RootQueryToContentNodeConnection;
  RootQueryToContentNodeConnectionEdge: RootQueryToContentNodeConnectionEdge;
  RootQueryToContentNodeConnectionPageInfo: RootQueryToContentNodeConnectionPageInfo;
  RootQueryToContentTypeConnection: RootQueryToContentTypeConnection;
  RootQueryToContentTypeConnectionEdge: RootQueryToContentTypeConnectionEdge;
  RootQueryToContentTypeConnectionPageInfo: RootQueryToContentTypeConnectionPageInfo;
  RootQueryToEnqueuedScriptConnection: RootQueryToEnqueuedScriptConnection;
  RootQueryToEnqueuedScriptConnectionEdge: RootQueryToEnqueuedScriptConnectionEdge;
  RootQueryToEnqueuedScriptConnectionPageInfo: RootQueryToEnqueuedScriptConnectionPageInfo;
  RootQueryToEnqueuedStylesheetConnection: RootQueryToEnqueuedStylesheetConnection;
  RootQueryToEnqueuedStylesheetConnectionEdge: RootQueryToEnqueuedStylesheetConnectionEdge;
  RootQueryToEnqueuedStylesheetConnectionPageInfo: RootQueryToEnqueuedStylesheetConnectionPageInfo;
  RootQueryToMediaItemConnection: RootQueryToMediaItemConnection;
  RootQueryToMediaItemConnectionEdge: RootQueryToMediaItemConnectionEdge;
  RootQueryToMediaItemConnectionPageInfo: RootQueryToMediaItemConnectionPageInfo;
  RootQueryToMenuConnection: RootQueryToMenuConnection;
  RootQueryToMenuConnectionEdge: RootQueryToMenuConnectionEdge;
  RootQueryToMenuConnectionPageInfo: RootQueryToMenuConnectionPageInfo;
  RootQueryToMenuItemConnection: RootQueryToMenuItemConnection;
  RootQueryToMenuItemConnectionEdge: RootQueryToMenuItemConnectionEdge;
  RootQueryToMenuItemConnectionPageInfo: RootQueryToMenuItemConnectionPageInfo;
  RootQueryToPageConnection: RootQueryToPageConnection;
  RootQueryToPageConnectionEdge: RootQueryToPageConnectionEdge;
  RootQueryToPageConnectionPageInfo: RootQueryToPageConnectionPageInfo;
  RootQueryToPluginConnection: RootQueryToPluginConnection;
  RootQueryToPluginConnectionEdge: RootQueryToPluginConnectionEdge;
  RootQueryToPluginConnectionPageInfo: RootQueryToPluginConnectionPageInfo;
  RootQueryToPostConnection: RootQueryToPostConnection;
  RootQueryToPostConnectionEdge: RootQueryToPostConnectionEdge;
  RootQueryToPostConnectionPageInfo: RootQueryToPostConnectionPageInfo;
  RootQueryToPostFormatConnection: RootQueryToPostFormatConnection;
  RootQueryToPostFormatConnectionEdge: RootQueryToPostFormatConnectionEdge;
  RootQueryToPostFormatConnectionPageInfo: RootQueryToPostFormatConnectionPageInfo;
  RootQueryToRevisionsConnection: RootQueryToRevisionsConnection;
  RootQueryToRevisionsConnectionEdge: RootQueryToRevisionsConnectionEdge;
  RootQueryToRevisionsConnectionPageInfo: RootQueryToRevisionsConnectionPageInfo;
  RootQueryToTagConnection: RootQueryToTagConnection;
  RootQueryToTagConnectionEdge: RootQueryToTagConnectionEdge;
  RootQueryToTagConnectionPageInfo: RootQueryToTagConnectionPageInfo;
  RootQueryToTaxonomyConnection: RootQueryToTaxonomyConnection;
  RootQueryToTaxonomyConnectionEdge: RootQueryToTaxonomyConnectionEdge;
  RootQueryToTaxonomyConnectionPageInfo: RootQueryToTaxonomyConnectionPageInfo;
  RootQueryToTermNodeConnection: RootQueryToTermNodeConnection;
  RootQueryToTermNodeConnectionEdge: RootQueryToTermNodeConnectionEdge;
  RootQueryToTermNodeConnectionPageInfo: RootQueryToTermNodeConnectionPageInfo;
  RootQueryToThemeConnection: RootQueryToThemeConnection;
  RootQueryToThemeConnectionEdge: RootQueryToThemeConnectionEdge;
  RootQueryToThemeConnectionPageInfo: RootQueryToThemeConnectionPageInfo;
  RootQueryToUserConnection: RootQueryToUserConnection;
  RootQueryToUserConnectionEdge: RootQueryToUserConnectionEdge;
  RootQueryToUserConnectionPageInfo: RootQueryToUserConnectionPageInfo;
  RootQueryToUserRoleConnection: RootQueryToUserRoleConnection;
  RootQueryToUserRoleConnectionEdge: RootQueryToUserRoleConnectionEdge;
  RootQueryToUserRoleConnectionPageInfo: RootQueryToUserRoleConnectionPageInfo;
  SendPasswordResetEmailPayload: SendPasswordResetEmailPayload;
  Settings: Settings;
  Subscription: Subscription;
  Tag: Tag;
  TagToContentNodeConnection: TagToContentNodeConnection;
  TagToContentNodeConnectionEdge: TagToContentNodeConnectionEdge;
  TagToContentNodeConnectionPageInfo: TagToContentNodeConnectionPageInfo;
  TagToPostConnection: TagToPostConnection;
  TagToPostConnectionEdge: TagToPostConnectionEdge;
  TagToPostConnectionPageInfo: TagToPostConnectionPageInfo;
  TagToTaxonomyConnectionEdge: TagToTaxonomyConnectionEdge;
  Taxonomy: Taxonomy;
  TaxonomyToContentTypeConnection: TaxonomyToContentTypeConnection;
  TaxonomyToContentTypeConnectionEdge: TaxonomyToContentTypeConnectionEdge;
  TaxonomyToContentTypeConnectionPageInfo: TaxonomyToContentTypeConnectionPageInfo;
  TaxonomyToTermNodeConnection: TaxonomyToTermNodeConnection;
  TaxonomyToTermNodeConnectionEdge: TaxonomyToTermNodeConnectionEdge;
  TaxonomyToTermNodeConnectionPageInfo: TaxonomyToTermNodeConnectionPageInfo;
  TermNodeToEnqueuedScriptConnection: TermNodeToEnqueuedScriptConnection;
  TermNodeToEnqueuedScriptConnectionEdge: TermNodeToEnqueuedScriptConnectionEdge;
  TermNodeToEnqueuedScriptConnectionPageInfo: TermNodeToEnqueuedScriptConnectionPageInfo;
  TermNodeToEnqueuedStylesheetConnection: TermNodeToEnqueuedStylesheetConnection;
  TermNodeToEnqueuedStylesheetConnectionEdge: TermNodeToEnqueuedStylesheetConnectionEdge;
  TermNodeToEnqueuedStylesheetConnectionPageInfo: TermNodeToEnqueuedStylesheetConnectionPageInfo;
  Theme: Theme;
  UpdateCategoryPayload: UpdateCategoryPayload;
  UpdateCommentPayload: UpdateCommentPayload;
  UpdateMediaItemPayload: UpdateMediaItemPayload;
  UpdatePagePayload: UpdatePagePayload;
  UpdatePostFormatPayload: UpdatePostFormatPayload;
  UpdatePostPayload: UpdatePostPayload;
  UpdateSettingsPayload: UpdateSettingsPayload;
  UpdateTagPayload: UpdateTagPayload;
  UpdateUserPayload: UpdateUserPayload;
  User: User;
  UserRole: UserRole;
  UserToCommentConnection: UserToCommentConnection;
  UserToCommentConnectionEdge: UserToCommentConnectionEdge;
  UserToCommentConnectionPageInfo: UserToCommentConnectionPageInfo;
  UserToEnqueuedScriptConnection: UserToEnqueuedScriptConnection;
  UserToEnqueuedScriptConnectionEdge: UserToEnqueuedScriptConnectionEdge;
  UserToEnqueuedScriptConnectionPageInfo: UserToEnqueuedScriptConnectionPageInfo;
  UserToEnqueuedStylesheetConnection: UserToEnqueuedStylesheetConnection;
  UserToEnqueuedStylesheetConnectionEdge: UserToEnqueuedStylesheetConnectionEdge;
  UserToEnqueuedStylesheetConnectionPageInfo: UserToEnqueuedStylesheetConnectionPageInfo;
  UserToMediaItemConnection: UserToMediaItemConnection;
  UserToMediaItemConnectionEdge: UserToMediaItemConnectionEdge;
  UserToMediaItemConnectionPageInfo: UserToMediaItemConnectionPageInfo;
  UserToPageConnection: UserToPageConnection;
  UserToPageConnectionEdge: UserToPageConnectionEdge;
  UserToPageConnectionPageInfo: UserToPageConnectionPageInfo;
  UserToPostConnection: UserToPostConnection;
  UserToPostConnectionEdge: UserToPostConnectionEdge;
  UserToPostConnectionPageInfo: UserToPostConnectionPageInfo;
  UserToRevisionsConnection: UserToRevisionsConnection;
  UserToRevisionsConnectionEdge: UserToRevisionsConnectionEdge;
  UserToRevisionsConnectionPageInfo: UserToRevisionsConnectionPageInfo;
  UserToUserRoleConnection: UserToUserRoleConnection;
  UserToUserRoleConnectionEdge: UserToUserRoleConnectionEdge;
  UserToUserRoleConnectionPageInfo: UserToUserRoleConnectionPageInfo;
  WritingSettings: WritingSettings;
}
export type SchemaObjectTypesNames =
  | 'Avatar'
  | 'Category'
  | 'CategoryToAncestorsCategoryConnection'
  | 'CategoryToAncestorsCategoryConnectionEdge'
  | 'CategoryToAncestorsCategoryConnectionPageInfo'
  | 'CategoryToCategoryConnection'
  | 'CategoryToCategoryConnectionEdge'
  | 'CategoryToCategoryConnectionPageInfo'
  | 'CategoryToContentNodeConnection'
  | 'CategoryToContentNodeConnectionEdge'
  | 'CategoryToContentNodeConnectionPageInfo'
  | 'CategoryToParentCategoryConnectionEdge'
  | 'CategoryToPostConnection'
  | 'CategoryToPostConnectionEdge'
  | 'CategoryToPostConnectionPageInfo'
  | 'CategoryToTaxonomyConnectionEdge'
  | 'Comment'
  | 'CommentAuthor'
  | 'CommentToCommentConnection'
  | 'CommentToCommentConnectionEdge'
  | 'CommentToCommentConnectionPageInfo'
  | 'CommentToCommenterConnectionEdge'
  | 'CommentToContentNodeConnectionEdge'
  | 'CommentToParentCommentConnectionEdge'
  | 'ConditionalTags'
  | 'ContentNodeToContentTypeConnectionEdge'
  | 'ContentNodeToEditLastConnectionEdge'
  | 'ContentNodeToEditLockConnectionEdge'
  | 'ContentNodeToEnqueuedScriptConnection'
  | 'ContentNodeToEnqueuedScriptConnectionEdge'
  | 'ContentNodeToEnqueuedScriptConnectionPageInfo'
  | 'ContentNodeToEnqueuedStylesheetConnection'
  | 'ContentNodeToEnqueuedStylesheetConnectionEdge'
  | 'ContentNodeToEnqueuedStylesheetConnectionPageInfo'
  | 'ContentType'
  | 'ContentTypeToContentNodeConnection'
  | 'ContentTypeToContentNodeConnectionEdge'
  | 'ContentTypeToContentNodeConnectionPageInfo'
  | 'ContentTypeToTaxonomyConnection'
  | 'ContentTypeToTaxonomyConnectionEdge'
  | 'ContentTypeToTaxonomyConnectionPageInfo'
  | 'CreateCategoryPayload'
  | 'CreateCommentPayload'
  | 'CreateMediaItemPayload'
  | 'CreatePagePayload'
  | 'CreatePostFormatPayload'
  | 'CreatePostPayload'
  | 'CreateTagPayload'
  | 'CreateUserPayload'
  | 'DefaultTemplate'
  | 'DeleteCategoryPayload'
  | 'DeleteCommentPayload'
  | 'DeleteMediaItemPayload'
  | 'DeletePagePayload'
  | 'DeletePostFormatPayload'
  | 'DeletePostPayload'
  | 'DeleteTagPayload'
  | 'DeleteUserPayload'
  | 'DiscussionSettings'
  | 'EnqueuedScript'
  | 'EnqueuedStylesheet'
  | 'GeneralSettings'
  | 'GenerateAuthorizationCodePayload'
  | 'HierarchicalContentNodeToContentNodeAncestorsConnection'
  | 'HierarchicalContentNodeToContentNodeAncestorsConnectionEdge'
  | 'HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo'
  | 'HierarchicalContentNodeToContentNodeChildrenConnection'
  | 'HierarchicalContentNodeToContentNodeChildrenConnectionEdge'
  | 'HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo'
  | 'HierarchicalContentNodeToParentContentNodeConnectionEdge'
  | 'MediaDetails'
  | 'MediaItem'
  | 'MediaItemMeta'
  | 'MediaItemToCommentConnection'
  | 'MediaItemToCommentConnectionEdge'
  | 'MediaItemToCommentConnectionPageInfo'
  | 'MediaSize'
  | 'Menu'
  | 'MenuItem'
  | 'MenuItemToMenuConnectionEdge'
  | 'MenuItemToMenuItemConnection'
  | 'MenuItemToMenuItemConnectionEdge'
  | 'MenuItemToMenuItemConnectionPageInfo'
  | 'MenuItemToMenuItemLinkableConnectionEdge'
  | 'MenuToMenuItemConnection'
  | 'MenuToMenuItemConnectionEdge'
  | 'MenuToMenuItemConnectionPageInfo'
  | 'Mutation'
  | 'NodeWithAuthorToUserConnectionEdge'
  | 'NodeWithFeaturedImageToMediaItemConnectionEdge'
  | 'NodeWithRevisionsToContentNodeConnectionEdge'
  | 'Page'
  | 'PageToCommentConnection'
  | 'PageToCommentConnectionEdge'
  | 'PageToCommentConnectionPageInfo'
  | 'PageToPreviewConnectionEdge'
  | 'PageToRevisionConnection'
  | 'PageToRevisionConnectionEdge'
  | 'PageToRevisionConnectionPageInfo'
  | 'Plugin'
  | 'Post'
  | 'PostFormat'
  | 'PostFormatToContentNodeConnection'
  | 'PostFormatToContentNodeConnectionEdge'
  | 'PostFormatToContentNodeConnectionPageInfo'
  | 'PostFormatToPostConnection'
  | 'PostFormatToPostConnectionEdge'
  | 'PostFormatToPostConnectionPageInfo'
  | 'PostFormatToTaxonomyConnectionEdge'
  | 'PostToCategoryConnection'
  | 'PostToCategoryConnectionEdge'
  | 'PostToCategoryConnectionPageInfo'
  | 'PostToCommentConnection'
  | 'PostToCommentConnectionEdge'
  | 'PostToCommentConnectionPageInfo'
  | 'PostToPostFormatConnection'
  | 'PostToPostFormatConnectionEdge'
  | 'PostToPostFormatConnectionPageInfo'
  | 'PostToPreviewConnectionEdge'
  | 'PostToRevisionConnection'
  | 'PostToRevisionConnectionEdge'
  | 'PostToRevisionConnectionPageInfo'
  | 'PostToTagConnection'
  | 'PostToTagConnectionEdge'
  | 'PostToTagConnectionPageInfo'
  | 'PostToTermNodeConnection'
  | 'PostToTermNodeConnectionEdge'
  | 'PostToTermNodeConnectionPageInfo'
  | 'PostTypeLabelDetails'
  | 'Query'
  | 'ReadingSettings'
  | 'RegisterUserPayload'
  | 'ResetUserPasswordPayload'
  | 'RestoreCommentPayload'
  | 'RootQueryToCategoryConnection'
  | 'RootQueryToCategoryConnectionEdge'
  | 'RootQueryToCategoryConnectionPageInfo'
  | 'RootQueryToCommentConnection'
  | 'RootQueryToCommentConnectionEdge'
  | 'RootQueryToCommentConnectionPageInfo'
  | 'RootQueryToContentNodeConnection'
  | 'RootQueryToContentNodeConnectionEdge'
  | 'RootQueryToContentNodeConnectionPageInfo'
  | 'RootQueryToContentTypeConnection'
  | 'RootQueryToContentTypeConnectionEdge'
  | 'RootQueryToContentTypeConnectionPageInfo'
  | 'RootQueryToEnqueuedScriptConnection'
  | 'RootQueryToEnqueuedScriptConnectionEdge'
  | 'RootQueryToEnqueuedScriptConnectionPageInfo'
  | 'RootQueryToEnqueuedStylesheetConnection'
  | 'RootQueryToEnqueuedStylesheetConnectionEdge'
  | 'RootQueryToEnqueuedStylesheetConnectionPageInfo'
  | 'RootQueryToMediaItemConnection'
  | 'RootQueryToMediaItemConnectionEdge'
  | 'RootQueryToMediaItemConnectionPageInfo'
  | 'RootQueryToMenuConnection'
  | 'RootQueryToMenuConnectionEdge'
  | 'RootQueryToMenuConnectionPageInfo'
  | 'RootQueryToMenuItemConnection'
  | 'RootQueryToMenuItemConnectionEdge'
  | 'RootQueryToMenuItemConnectionPageInfo'
  | 'RootQueryToPageConnection'
  | 'RootQueryToPageConnectionEdge'
  | 'RootQueryToPageConnectionPageInfo'
  | 'RootQueryToPluginConnection'
  | 'RootQueryToPluginConnectionEdge'
  | 'RootQueryToPluginConnectionPageInfo'
  | 'RootQueryToPostConnection'
  | 'RootQueryToPostConnectionEdge'
  | 'RootQueryToPostConnectionPageInfo'
  | 'RootQueryToPostFormatConnection'
  | 'RootQueryToPostFormatConnectionEdge'
  | 'RootQueryToPostFormatConnectionPageInfo'
  | 'RootQueryToRevisionsConnection'
  | 'RootQueryToRevisionsConnectionEdge'
  | 'RootQueryToRevisionsConnectionPageInfo'
  | 'RootQueryToTagConnection'
  | 'RootQueryToTagConnectionEdge'
  | 'RootQueryToTagConnectionPageInfo'
  | 'RootQueryToTaxonomyConnection'
  | 'RootQueryToTaxonomyConnectionEdge'
  | 'RootQueryToTaxonomyConnectionPageInfo'
  | 'RootQueryToTermNodeConnection'
  | 'RootQueryToTermNodeConnectionEdge'
  | 'RootQueryToTermNodeConnectionPageInfo'
  | 'RootQueryToThemeConnection'
  | 'RootQueryToThemeConnectionEdge'
  | 'RootQueryToThemeConnectionPageInfo'
  | 'RootQueryToUserConnection'
  | 'RootQueryToUserConnectionEdge'
  | 'RootQueryToUserConnectionPageInfo'
  | 'RootQueryToUserRoleConnection'
  | 'RootQueryToUserRoleConnectionEdge'
  | 'RootQueryToUserRoleConnectionPageInfo'
  | 'SendPasswordResetEmailPayload'
  | 'Settings'
  | 'Subscription'
  | 'Tag'
  | 'TagToContentNodeConnection'
  | 'TagToContentNodeConnectionEdge'
  | 'TagToContentNodeConnectionPageInfo'
  | 'TagToPostConnection'
  | 'TagToPostConnectionEdge'
  | 'TagToPostConnectionPageInfo'
  | 'TagToTaxonomyConnectionEdge'
  | 'Taxonomy'
  | 'TaxonomyToContentTypeConnection'
  | 'TaxonomyToContentTypeConnectionEdge'
  | 'TaxonomyToContentTypeConnectionPageInfo'
  | 'TaxonomyToTermNodeConnection'
  | 'TaxonomyToTermNodeConnectionEdge'
  | 'TaxonomyToTermNodeConnectionPageInfo'
  | 'TermNodeToEnqueuedScriptConnection'
  | 'TermNodeToEnqueuedScriptConnectionEdge'
  | 'TermNodeToEnqueuedScriptConnectionPageInfo'
  | 'TermNodeToEnqueuedStylesheetConnection'
  | 'TermNodeToEnqueuedStylesheetConnectionEdge'
  | 'TermNodeToEnqueuedStylesheetConnectionPageInfo'
  | 'Theme'
  | 'UpdateCategoryPayload'
  | 'UpdateCommentPayload'
  | 'UpdateMediaItemPayload'
  | 'UpdatePagePayload'
  | 'UpdatePostFormatPayload'
  | 'UpdatePostPayload'
  | 'UpdateSettingsPayload'
  | 'UpdateTagPayload'
  | 'UpdateUserPayload'
  | 'User'
  | 'UserRole'
  | 'UserToCommentConnection'
  | 'UserToCommentConnectionEdge'
  | 'UserToCommentConnectionPageInfo'
  | 'UserToEnqueuedScriptConnection'
  | 'UserToEnqueuedScriptConnectionEdge'
  | 'UserToEnqueuedScriptConnectionPageInfo'
  | 'UserToEnqueuedStylesheetConnection'
  | 'UserToEnqueuedStylesheetConnectionEdge'
  | 'UserToEnqueuedStylesheetConnectionPageInfo'
  | 'UserToMediaItemConnection'
  | 'UserToMediaItemConnectionEdge'
  | 'UserToMediaItemConnectionPageInfo'
  | 'UserToPageConnection'
  | 'UserToPageConnectionEdge'
  | 'UserToPageConnectionPageInfo'
  | 'UserToPostConnection'
  | 'UserToPostConnectionEdge'
  | 'UserToPostConnectionPageInfo'
  | 'UserToRevisionsConnection'
  | 'UserToRevisionsConnectionEdge'
  | 'UserToRevisionsConnectionPageInfo'
  | 'UserToUserRoleConnection'
  | 'UserToUserRoleConnectionEdge'
  | 'UserToUserRoleConnectionPageInfo'
  | 'WritingSettings';

export interface $CategoryConnection {
  CategoryToAncestorsCategoryConnection?: CategoryToAncestorsCategoryConnection;
  CategoryToCategoryConnection?: CategoryToCategoryConnection;
  PostToCategoryConnection?: PostToCategoryConnection;
  RootQueryToCategoryConnection?: RootQueryToCategoryConnection;
}

export interface $CategoryConnectionEdge {
  CategoryToAncestorsCategoryConnectionEdge?: CategoryToAncestorsCategoryConnectionEdge;
  CategoryToCategoryConnectionEdge?: CategoryToCategoryConnectionEdge;
  CategoryToParentCategoryConnectionEdge?: CategoryToParentCategoryConnectionEdge;
  PostToCategoryConnectionEdge?: PostToCategoryConnectionEdge;
  RootQueryToCategoryConnectionEdge?: RootQueryToCategoryConnectionEdge;
}

export interface $CategoryConnectionPageInfo {
  CategoryToAncestorsCategoryConnectionPageInfo?: CategoryToAncestorsCategoryConnectionPageInfo;
  CategoryToCategoryConnectionPageInfo?: CategoryToCategoryConnectionPageInfo;
  PostToCategoryConnectionPageInfo?: PostToCategoryConnectionPageInfo;
  RootQueryToCategoryConnectionPageInfo?: RootQueryToCategoryConnectionPageInfo;
}

export interface $CommentConnection {
  CommentToCommentConnection?: CommentToCommentConnection;
  MediaItemToCommentConnection?: MediaItemToCommentConnection;
  PageToCommentConnection?: PageToCommentConnection;
  PostToCommentConnection?: PostToCommentConnection;
  RootQueryToCommentConnection?: RootQueryToCommentConnection;
  UserToCommentConnection?: UserToCommentConnection;
}

export interface $CommentConnectionEdge {
  CommentToCommentConnectionEdge?: CommentToCommentConnectionEdge;
  CommentToParentCommentConnectionEdge?: CommentToParentCommentConnectionEdge;
  MediaItemToCommentConnectionEdge?: MediaItemToCommentConnectionEdge;
  PageToCommentConnectionEdge?: PageToCommentConnectionEdge;
  PostToCommentConnectionEdge?: PostToCommentConnectionEdge;
  RootQueryToCommentConnectionEdge?: RootQueryToCommentConnectionEdge;
  UserToCommentConnectionEdge?: UserToCommentConnectionEdge;
}

export interface $CommentConnectionPageInfo {
  CommentToCommentConnectionPageInfo?: CommentToCommentConnectionPageInfo;
  MediaItemToCommentConnectionPageInfo?: MediaItemToCommentConnectionPageInfo;
  PageToCommentConnectionPageInfo?: PageToCommentConnectionPageInfo;
  PostToCommentConnectionPageInfo?: PostToCommentConnectionPageInfo;
  RootQueryToCommentConnectionPageInfo?: RootQueryToCommentConnectionPageInfo;
  UserToCommentConnectionPageInfo?: UserToCommentConnectionPageInfo;
}

export interface $Commenter {
  CommentAuthor?: CommentAuthor;
  User?: User;
}

export interface $CommenterConnectionEdge {
  CommentToCommenterConnectionEdge?: CommentToCommenterConnectionEdge;
}

export interface $Connection {
  CategoryToAncestorsCategoryConnection?: CategoryToAncestorsCategoryConnection;
  CategoryToCategoryConnection?: CategoryToCategoryConnection;
  CategoryToContentNodeConnection?: CategoryToContentNodeConnection;
  CategoryToPostConnection?: CategoryToPostConnection;
  CommentToCommentConnection?: CommentToCommentConnection;
  ContentNodeToEnqueuedScriptConnection?: ContentNodeToEnqueuedScriptConnection;
  ContentNodeToEnqueuedStylesheetConnection?: ContentNodeToEnqueuedStylesheetConnection;
  ContentTypeToContentNodeConnection?: ContentTypeToContentNodeConnection;
  ContentTypeToTaxonomyConnection?: ContentTypeToTaxonomyConnection;
  HierarchicalContentNodeToContentNodeAncestorsConnection?: HierarchicalContentNodeToContentNodeAncestorsConnection;
  HierarchicalContentNodeToContentNodeChildrenConnection?: HierarchicalContentNodeToContentNodeChildrenConnection;
  MediaItemToCommentConnection?: MediaItemToCommentConnection;
  MenuItemToMenuItemConnection?: MenuItemToMenuItemConnection;
  MenuToMenuItemConnection?: MenuToMenuItemConnection;
  PageToCommentConnection?: PageToCommentConnection;
  PageToRevisionConnection?: PageToRevisionConnection;
  PostFormatToContentNodeConnection?: PostFormatToContentNodeConnection;
  PostFormatToPostConnection?: PostFormatToPostConnection;
  PostToCategoryConnection?: PostToCategoryConnection;
  PostToCommentConnection?: PostToCommentConnection;
  PostToPostFormatConnection?: PostToPostFormatConnection;
  PostToRevisionConnection?: PostToRevisionConnection;
  PostToTagConnection?: PostToTagConnection;
  PostToTermNodeConnection?: PostToTermNodeConnection;
  RootQueryToCategoryConnection?: RootQueryToCategoryConnection;
  RootQueryToCommentConnection?: RootQueryToCommentConnection;
  RootQueryToContentNodeConnection?: RootQueryToContentNodeConnection;
  RootQueryToContentTypeConnection?: RootQueryToContentTypeConnection;
  RootQueryToEnqueuedScriptConnection?: RootQueryToEnqueuedScriptConnection;
  RootQueryToEnqueuedStylesheetConnection?: RootQueryToEnqueuedStylesheetConnection;
  RootQueryToMediaItemConnection?: RootQueryToMediaItemConnection;
  RootQueryToMenuConnection?: RootQueryToMenuConnection;
  RootQueryToMenuItemConnection?: RootQueryToMenuItemConnection;
  RootQueryToPageConnection?: RootQueryToPageConnection;
  RootQueryToPluginConnection?: RootQueryToPluginConnection;
  RootQueryToPostConnection?: RootQueryToPostConnection;
  RootQueryToPostFormatConnection?: RootQueryToPostFormatConnection;
  RootQueryToRevisionsConnection?: RootQueryToRevisionsConnection;
  RootQueryToTagConnection?: RootQueryToTagConnection;
  RootQueryToTaxonomyConnection?: RootQueryToTaxonomyConnection;
  RootQueryToTermNodeConnection?: RootQueryToTermNodeConnection;
  RootQueryToThemeConnection?: RootQueryToThemeConnection;
  RootQueryToUserConnection?: RootQueryToUserConnection;
  RootQueryToUserRoleConnection?: RootQueryToUserRoleConnection;
  TagToContentNodeConnection?: TagToContentNodeConnection;
  TagToPostConnection?: TagToPostConnection;
  TaxonomyToContentTypeConnection?: TaxonomyToContentTypeConnection;
  TaxonomyToTermNodeConnection?: TaxonomyToTermNodeConnection;
  TermNodeToEnqueuedScriptConnection?: TermNodeToEnqueuedScriptConnection;
  TermNodeToEnqueuedStylesheetConnection?: TermNodeToEnqueuedStylesheetConnection;
  UserToCommentConnection?: UserToCommentConnection;
  UserToEnqueuedScriptConnection?: UserToEnqueuedScriptConnection;
  UserToEnqueuedStylesheetConnection?: UserToEnqueuedStylesheetConnection;
  UserToMediaItemConnection?: UserToMediaItemConnection;
  UserToPageConnection?: UserToPageConnection;
  UserToPostConnection?: UserToPostConnection;
  UserToRevisionsConnection?: UserToRevisionsConnection;
  UserToUserRoleConnection?: UserToUserRoleConnection;
}

export interface $ContentNode {
  MediaItem?: MediaItem;
  Page?: Page;
  Post?: Post;
}

export interface $ContentNodeConnection {
  CategoryToContentNodeConnection?: CategoryToContentNodeConnection;
  ContentTypeToContentNodeConnection?: ContentTypeToContentNodeConnection;
  HierarchicalContentNodeToContentNodeAncestorsConnection?: HierarchicalContentNodeToContentNodeAncestorsConnection;
  HierarchicalContentNodeToContentNodeChildrenConnection?: HierarchicalContentNodeToContentNodeChildrenConnection;
  PostFormatToContentNodeConnection?: PostFormatToContentNodeConnection;
  RootQueryToContentNodeConnection?: RootQueryToContentNodeConnection;
  RootQueryToRevisionsConnection?: RootQueryToRevisionsConnection;
  TagToContentNodeConnection?: TagToContentNodeConnection;
  UserToRevisionsConnection?: UserToRevisionsConnection;
}

export interface $ContentNodeConnectionEdge {
  CategoryToContentNodeConnectionEdge?: CategoryToContentNodeConnectionEdge;
  CommentToContentNodeConnectionEdge?: CommentToContentNodeConnectionEdge;
  ContentTypeToContentNodeConnectionEdge?: ContentTypeToContentNodeConnectionEdge;
  HierarchicalContentNodeToContentNodeAncestorsConnectionEdge?: HierarchicalContentNodeToContentNodeAncestorsConnectionEdge;
  HierarchicalContentNodeToContentNodeChildrenConnectionEdge?: HierarchicalContentNodeToContentNodeChildrenConnectionEdge;
  HierarchicalContentNodeToParentContentNodeConnectionEdge?: HierarchicalContentNodeToParentContentNodeConnectionEdge;
  NodeWithRevisionsToContentNodeConnectionEdge?: NodeWithRevisionsToContentNodeConnectionEdge;
  PostFormatToContentNodeConnectionEdge?: PostFormatToContentNodeConnectionEdge;
  RootQueryToContentNodeConnectionEdge?: RootQueryToContentNodeConnectionEdge;
  RootQueryToRevisionsConnectionEdge?: RootQueryToRevisionsConnectionEdge;
  TagToContentNodeConnectionEdge?: TagToContentNodeConnectionEdge;
  UserToRevisionsConnectionEdge?: UserToRevisionsConnectionEdge;
}

export interface $ContentNodeConnectionPageInfo {
  CategoryToContentNodeConnectionPageInfo?: CategoryToContentNodeConnectionPageInfo;
  ContentTypeToContentNodeConnectionPageInfo?: ContentTypeToContentNodeConnectionPageInfo;
  HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo?: HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo;
  HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo?: HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo;
  PostFormatToContentNodeConnectionPageInfo?: PostFormatToContentNodeConnectionPageInfo;
  RootQueryToContentNodeConnectionPageInfo?: RootQueryToContentNodeConnectionPageInfo;
  RootQueryToRevisionsConnectionPageInfo?: RootQueryToRevisionsConnectionPageInfo;
  TagToContentNodeConnectionPageInfo?: TagToContentNodeConnectionPageInfo;
  UserToRevisionsConnectionPageInfo?: UserToRevisionsConnectionPageInfo;
}

export interface $ContentTemplate {
  DefaultTemplate?: DefaultTemplate;
}

export interface $ContentTypeConnection {
  RootQueryToContentTypeConnection?: RootQueryToContentTypeConnection;
  TaxonomyToContentTypeConnection?: TaxonomyToContentTypeConnection;
}

export interface $ContentTypeConnectionEdge {
  ContentNodeToContentTypeConnectionEdge?: ContentNodeToContentTypeConnectionEdge;
  RootQueryToContentTypeConnectionEdge?: RootQueryToContentTypeConnectionEdge;
  TaxonomyToContentTypeConnectionEdge?: TaxonomyToContentTypeConnectionEdge;
}

export interface $ContentTypeConnectionPageInfo {
  RootQueryToContentTypeConnectionPageInfo?: RootQueryToContentTypeConnectionPageInfo;
  TaxonomyToContentTypeConnectionPageInfo?: TaxonomyToContentTypeConnectionPageInfo;
}

export interface $DatabaseIdentifier {
  Category?: Category;
  Comment?: Comment;
  CommentAuthor?: CommentAuthor;
  MediaItem?: MediaItem;
  Menu?: Menu;
  MenuItem?: MenuItem;
  Page?: Page;
  Post?: Post;
  PostFormat?: PostFormat;
  Tag?: Tag;
  User?: User;
}

export interface $Edge {
  CategoryToAncestorsCategoryConnectionEdge?: CategoryToAncestorsCategoryConnectionEdge;
  CategoryToCategoryConnectionEdge?: CategoryToCategoryConnectionEdge;
  CategoryToContentNodeConnectionEdge?: CategoryToContentNodeConnectionEdge;
  CategoryToParentCategoryConnectionEdge?: CategoryToParentCategoryConnectionEdge;
  CategoryToPostConnectionEdge?: CategoryToPostConnectionEdge;
  CategoryToTaxonomyConnectionEdge?: CategoryToTaxonomyConnectionEdge;
  CommentToCommentConnectionEdge?: CommentToCommentConnectionEdge;
  CommentToCommenterConnectionEdge?: CommentToCommenterConnectionEdge;
  CommentToContentNodeConnectionEdge?: CommentToContentNodeConnectionEdge;
  CommentToParentCommentConnectionEdge?: CommentToParentCommentConnectionEdge;
  ContentNodeToContentTypeConnectionEdge?: ContentNodeToContentTypeConnectionEdge;
  ContentNodeToEditLastConnectionEdge?: ContentNodeToEditLastConnectionEdge;
  ContentNodeToEditLockConnectionEdge?: ContentNodeToEditLockConnectionEdge;
  ContentNodeToEnqueuedScriptConnectionEdge?: ContentNodeToEnqueuedScriptConnectionEdge;
  ContentNodeToEnqueuedStylesheetConnectionEdge?: ContentNodeToEnqueuedStylesheetConnectionEdge;
  ContentTypeToContentNodeConnectionEdge?: ContentTypeToContentNodeConnectionEdge;
  ContentTypeToTaxonomyConnectionEdge?: ContentTypeToTaxonomyConnectionEdge;
  HierarchicalContentNodeToContentNodeAncestorsConnectionEdge?: HierarchicalContentNodeToContentNodeAncestorsConnectionEdge;
  HierarchicalContentNodeToContentNodeChildrenConnectionEdge?: HierarchicalContentNodeToContentNodeChildrenConnectionEdge;
  HierarchicalContentNodeToParentContentNodeConnectionEdge?: HierarchicalContentNodeToParentContentNodeConnectionEdge;
  MediaItemToCommentConnectionEdge?: MediaItemToCommentConnectionEdge;
  MenuItemToMenuConnectionEdge?: MenuItemToMenuConnectionEdge;
  MenuItemToMenuItemConnectionEdge?: MenuItemToMenuItemConnectionEdge;
  MenuItemToMenuItemLinkableConnectionEdge?: MenuItemToMenuItemLinkableConnectionEdge;
  MenuToMenuItemConnectionEdge?: MenuToMenuItemConnectionEdge;
  NodeWithAuthorToUserConnectionEdge?: NodeWithAuthorToUserConnectionEdge;
  NodeWithFeaturedImageToMediaItemConnectionEdge?: NodeWithFeaturedImageToMediaItemConnectionEdge;
  NodeWithRevisionsToContentNodeConnectionEdge?: NodeWithRevisionsToContentNodeConnectionEdge;
  PageToCommentConnectionEdge?: PageToCommentConnectionEdge;
  PageToPreviewConnectionEdge?: PageToPreviewConnectionEdge;
  PageToRevisionConnectionEdge?: PageToRevisionConnectionEdge;
  PostFormatToContentNodeConnectionEdge?: PostFormatToContentNodeConnectionEdge;
  PostFormatToPostConnectionEdge?: PostFormatToPostConnectionEdge;
  PostFormatToTaxonomyConnectionEdge?: PostFormatToTaxonomyConnectionEdge;
  PostToCategoryConnectionEdge?: PostToCategoryConnectionEdge;
  PostToCommentConnectionEdge?: PostToCommentConnectionEdge;
  PostToPostFormatConnectionEdge?: PostToPostFormatConnectionEdge;
  PostToPreviewConnectionEdge?: PostToPreviewConnectionEdge;
  PostToRevisionConnectionEdge?: PostToRevisionConnectionEdge;
  PostToTagConnectionEdge?: PostToTagConnectionEdge;
  PostToTermNodeConnectionEdge?: PostToTermNodeConnectionEdge;
  RootQueryToCategoryConnectionEdge?: RootQueryToCategoryConnectionEdge;
  RootQueryToCommentConnectionEdge?: RootQueryToCommentConnectionEdge;
  RootQueryToContentNodeConnectionEdge?: RootQueryToContentNodeConnectionEdge;
  RootQueryToContentTypeConnectionEdge?: RootQueryToContentTypeConnectionEdge;
  RootQueryToEnqueuedScriptConnectionEdge?: RootQueryToEnqueuedScriptConnectionEdge;
  RootQueryToEnqueuedStylesheetConnectionEdge?: RootQueryToEnqueuedStylesheetConnectionEdge;
  RootQueryToMediaItemConnectionEdge?: RootQueryToMediaItemConnectionEdge;
  RootQueryToMenuConnectionEdge?: RootQueryToMenuConnectionEdge;
  RootQueryToMenuItemConnectionEdge?: RootQueryToMenuItemConnectionEdge;
  RootQueryToPageConnectionEdge?: RootQueryToPageConnectionEdge;
  RootQueryToPluginConnectionEdge?: RootQueryToPluginConnectionEdge;
  RootQueryToPostConnectionEdge?: RootQueryToPostConnectionEdge;
  RootQueryToPostFormatConnectionEdge?: RootQueryToPostFormatConnectionEdge;
  RootQueryToRevisionsConnectionEdge?: RootQueryToRevisionsConnectionEdge;
  RootQueryToTagConnectionEdge?: RootQueryToTagConnectionEdge;
  RootQueryToTaxonomyConnectionEdge?: RootQueryToTaxonomyConnectionEdge;
  RootQueryToTermNodeConnectionEdge?: RootQueryToTermNodeConnectionEdge;
  RootQueryToThemeConnectionEdge?: RootQueryToThemeConnectionEdge;
  RootQueryToUserConnectionEdge?: RootQueryToUserConnectionEdge;
  RootQueryToUserRoleConnectionEdge?: RootQueryToUserRoleConnectionEdge;
  TagToContentNodeConnectionEdge?: TagToContentNodeConnectionEdge;
  TagToPostConnectionEdge?: TagToPostConnectionEdge;
  TagToTaxonomyConnectionEdge?: TagToTaxonomyConnectionEdge;
  TaxonomyToContentTypeConnectionEdge?: TaxonomyToContentTypeConnectionEdge;
  TaxonomyToTermNodeConnectionEdge?: TaxonomyToTermNodeConnectionEdge;
  TermNodeToEnqueuedScriptConnectionEdge?: TermNodeToEnqueuedScriptConnectionEdge;
  TermNodeToEnqueuedStylesheetConnectionEdge?: TermNodeToEnqueuedStylesheetConnectionEdge;
  UserToCommentConnectionEdge?: UserToCommentConnectionEdge;
  UserToEnqueuedScriptConnectionEdge?: UserToEnqueuedScriptConnectionEdge;
  UserToEnqueuedStylesheetConnectionEdge?: UserToEnqueuedStylesheetConnectionEdge;
  UserToMediaItemConnectionEdge?: UserToMediaItemConnectionEdge;
  UserToPageConnectionEdge?: UserToPageConnectionEdge;
  UserToPostConnectionEdge?: UserToPostConnectionEdge;
  UserToRevisionsConnectionEdge?: UserToRevisionsConnectionEdge;
  UserToUserRoleConnectionEdge?: UserToUserRoleConnectionEdge;
}

export interface $EnqueuedAsset {
  EnqueuedScript?: EnqueuedScript;
  EnqueuedStylesheet?: EnqueuedStylesheet;
}

export interface $EnqueuedScriptConnection {
  ContentNodeToEnqueuedScriptConnection?: ContentNodeToEnqueuedScriptConnection;
  RootQueryToEnqueuedScriptConnection?: RootQueryToEnqueuedScriptConnection;
  TermNodeToEnqueuedScriptConnection?: TermNodeToEnqueuedScriptConnection;
  UserToEnqueuedScriptConnection?: UserToEnqueuedScriptConnection;
}

export interface $EnqueuedScriptConnectionEdge {
  ContentNodeToEnqueuedScriptConnectionEdge?: ContentNodeToEnqueuedScriptConnectionEdge;
  RootQueryToEnqueuedScriptConnectionEdge?: RootQueryToEnqueuedScriptConnectionEdge;
  TermNodeToEnqueuedScriptConnectionEdge?: TermNodeToEnqueuedScriptConnectionEdge;
  UserToEnqueuedScriptConnectionEdge?: UserToEnqueuedScriptConnectionEdge;
}

export interface $EnqueuedScriptConnectionPageInfo {
  ContentNodeToEnqueuedScriptConnectionPageInfo?: ContentNodeToEnqueuedScriptConnectionPageInfo;
  RootQueryToEnqueuedScriptConnectionPageInfo?: RootQueryToEnqueuedScriptConnectionPageInfo;
  TermNodeToEnqueuedScriptConnectionPageInfo?: TermNodeToEnqueuedScriptConnectionPageInfo;
  UserToEnqueuedScriptConnectionPageInfo?: UserToEnqueuedScriptConnectionPageInfo;
}

export interface $EnqueuedStylesheetConnection {
  ContentNodeToEnqueuedStylesheetConnection?: ContentNodeToEnqueuedStylesheetConnection;
  RootQueryToEnqueuedStylesheetConnection?: RootQueryToEnqueuedStylesheetConnection;
  TermNodeToEnqueuedStylesheetConnection?: TermNodeToEnqueuedStylesheetConnection;
  UserToEnqueuedStylesheetConnection?: UserToEnqueuedStylesheetConnection;
}

export interface $EnqueuedStylesheetConnectionEdge {
  ContentNodeToEnqueuedStylesheetConnectionEdge?: ContentNodeToEnqueuedStylesheetConnectionEdge;
  RootQueryToEnqueuedStylesheetConnectionEdge?: RootQueryToEnqueuedStylesheetConnectionEdge;
  TermNodeToEnqueuedStylesheetConnectionEdge?: TermNodeToEnqueuedStylesheetConnectionEdge;
  UserToEnqueuedStylesheetConnectionEdge?: UserToEnqueuedStylesheetConnectionEdge;
}

export interface $EnqueuedStylesheetConnectionPageInfo {
  ContentNodeToEnqueuedStylesheetConnectionPageInfo?: ContentNodeToEnqueuedStylesheetConnectionPageInfo;
  RootQueryToEnqueuedStylesheetConnectionPageInfo?: RootQueryToEnqueuedStylesheetConnectionPageInfo;
  TermNodeToEnqueuedStylesheetConnectionPageInfo?: TermNodeToEnqueuedStylesheetConnectionPageInfo;
  UserToEnqueuedStylesheetConnectionPageInfo?: UserToEnqueuedStylesheetConnectionPageInfo;
}

export interface $HierarchicalContentNode {
  MediaItem?: MediaItem;
  Page?: Page;
}

export interface $HierarchicalNode {
  Category?: Category;
  MediaItem?: MediaItem;
  Page?: Page;
}

export interface $HierarchicalTermNode {
  Category?: Category;
}

export interface $MediaItemConnection {
  RootQueryToMediaItemConnection?: RootQueryToMediaItemConnection;
  UserToMediaItemConnection?: UserToMediaItemConnection;
}

export interface $MediaItemConnectionEdge {
  NodeWithFeaturedImageToMediaItemConnectionEdge?: NodeWithFeaturedImageToMediaItemConnectionEdge;
  RootQueryToMediaItemConnectionEdge?: RootQueryToMediaItemConnectionEdge;
  UserToMediaItemConnectionEdge?: UserToMediaItemConnectionEdge;
}

export interface $MediaItemConnectionPageInfo {
  RootQueryToMediaItemConnectionPageInfo?: RootQueryToMediaItemConnectionPageInfo;
  UserToMediaItemConnectionPageInfo?: UserToMediaItemConnectionPageInfo;
}

export interface $MenuConnection {
  RootQueryToMenuConnection?: RootQueryToMenuConnection;
}

export interface $MenuConnectionEdge {
  MenuItemToMenuConnectionEdge?: MenuItemToMenuConnectionEdge;
  RootQueryToMenuConnectionEdge?: RootQueryToMenuConnectionEdge;
}

export interface $MenuConnectionPageInfo {
  RootQueryToMenuConnectionPageInfo?: RootQueryToMenuConnectionPageInfo;
}

export interface $MenuItemConnection {
  MenuItemToMenuItemConnection?: MenuItemToMenuItemConnection;
  MenuToMenuItemConnection?: MenuToMenuItemConnection;
  RootQueryToMenuItemConnection?: RootQueryToMenuItemConnection;
}

export interface $MenuItemConnectionEdge {
  MenuItemToMenuItemConnectionEdge?: MenuItemToMenuItemConnectionEdge;
  MenuToMenuItemConnectionEdge?: MenuToMenuItemConnectionEdge;
  RootQueryToMenuItemConnectionEdge?: RootQueryToMenuItemConnectionEdge;
}

export interface $MenuItemConnectionPageInfo {
  MenuItemToMenuItemConnectionPageInfo?: MenuItemToMenuItemConnectionPageInfo;
  MenuToMenuItemConnectionPageInfo?: MenuToMenuItemConnectionPageInfo;
  RootQueryToMenuItemConnectionPageInfo?: RootQueryToMenuItemConnectionPageInfo;
}

export interface $MenuItemLinkable {
  Category?: Category;
  Page?: Page;
  Post?: Post;
  PostFormat?: PostFormat;
  Tag?: Tag;
}

export interface $MenuItemLinkableConnectionEdge {
  MenuItemToMenuItemLinkableConnectionEdge?: MenuItemToMenuItemLinkableConnectionEdge;
}

export interface $MenuItemObjectUnion {
  Category?: Category;
  Page?: Page;
  Post?: Post;
  PostFormat?: PostFormat;
  Tag?: Tag;
}

export interface $Node {
  Category?: Category;
  Comment?: Comment;
  CommentAuthor?: CommentAuthor;
  ContentType?: ContentType;
  EnqueuedScript?: EnqueuedScript;
  EnqueuedStylesheet?: EnqueuedStylesheet;
  MediaItem?: MediaItem;
  Menu?: Menu;
  MenuItem?: MenuItem;
  Page?: Page;
  Plugin?: Plugin;
  Post?: Post;
  PostFormat?: PostFormat;
  Tag?: Tag;
  Taxonomy?: Taxonomy;
  Theme?: Theme;
  User?: User;
  UserRole?: UserRole;
}

export interface $NodeWithAuthor {
  MediaItem?: MediaItem;
  Page?: Page;
  Post?: Post;
}

export interface $NodeWithComments {
  MediaItem?: MediaItem;
  Page?: Page;
  Post?: Post;
}

export interface $NodeWithContentEditor {
  Page?: Page;
  Post?: Post;
}

export interface $NodeWithExcerpt {
  Post?: Post;
}

export interface $NodeWithFeaturedImage {
  Page?: Page;
  Post?: Post;
}

export interface $NodeWithPageAttributes {
  Page?: Page;
}

export interface $NodeWithRevisions {
  Page?: Page;
  Post?: Post;
}

export interface $NodeWithTemplate {
  MediaItem?: MediaItem;
  Page?: Page;
  Post?: Post;
}

export interface $NodeWithTitle {
  MediaItem?: MediaItem;
  Page?: Page;
  Post?: Post;
}

export interface $NodeWithTrackbacks {
  Post?: Post;
}

export interface $OneToOneConnection {
  CategoryToParentCategoryConnectionEdge?: CategoryToParentCategoryConnectionEdge;
  CategoryToTaxonomyConnectionEdge?: CategoryToTaxonomyConnectionEdge;
  CommentToCommenterConnectionEdge?: CommentToCommenterConnectionEdge;
  CommentToContentNodeConnectionEdge?: CommentToContentNodeConnectionEdge;
  CommentToParentCommentConnectionEdge?: CommentToParentCommentConnectionEdge;
  ContentNodeToContentTypeConnectionEdge?: ContentNodeToContentTypeConnectionEdge;
  ContentNodeToEditLastConnectionEdge?: ContentNodeToEditLastConnectionEdge;
  ContentNodeToEditLockConnectionEdge?: ContentNodeToEditLockConnectionEdge;
  HierarchicalContentNodeToParentContentNodeConnectionEdge?: HierarchicalContentNodeToParentContentNodeConnectionEdge;
  MenuItemToMenuConnectionEdge?: MenuItemToMenuConnectionEdge;
  MenuItemToMenuItemLinkableConnectionEdge?: MenuItemToMenuItemLinkableConnectionEdge;
  NodeWithAuthorToUserConnectionEdge?: NodeWithAuthorToUserConnectionEdge;
  NodeWithFeaturedImageToMediaItemConnectionEdge?: NodeWithFeaturedImageToMediaItemConnectionEdge;
  NodeWithRevisionsToContentNodeConnectionEdge?: NodeWithRevisionsToContentNodeConnectionEdge;
  PageToPreviewConnectionEdge?: PageToPreviewConnectionEdge;
  PostFormatToTaxonomyConnectionEdge?: PostFormatToTaxonomyConnectionEdge;
  PostToPreviewConnectionEdge?: PostToPreviewConnectionEdge;
  TagToTaxonomyConnectionEdge?: TagToTaxonomyConnectionEdge;
}

export interface $PageConnection {
  PageToRevisionConnection?: PageToRevisionConnection;
  RootQueryToPageConnection?: RootQueryToPageConnection;
  UserToPageConnection?: UserToPageConnection;
}

export interface $PageConnectionEdge {
  PageToPreviewConnectionEdge?: PageToPreviewConnectionEdge;
  PageToRevisionConnectionEdge?: PageToRevisionConnectionEdge;
  RootQueryToPageConnectionEdge?: RootQueryToPageConnectionEdge;
  UserToPageConnectionEdge?: UserToPageConnectionEdge;
}

export interface $PageConnectionPageInfo {
  PageToRevisionConnectionPageInfo?: PageToRevisionConnectionPageInfo;
  RootQueryToPageConnectionPageInfo?: RootQueryToPageConnectionPageInfo;
  UserToPageConnectionPageInfo?: UserToPageConnectionPageInfo;
}

export interface $PageInfo {
  CategoryToAncestorsCategoryConnectionPageInfo?: CategoryToAncestorsCategoryConnectionPageInfo;
  CategoryToCategoryConnectionPageInfo?: CategoryToCategoryConnectionPageInfo;
  CategoryToContentNodeConnectionPageInfo?: CategoryToContentNodeConnectionPageInfo;
  CategoryToPostConnectionPageInfo?: CategoryToPostConnectionPageInfo;
  CommentToCommentConnectionPageInfo?: CommentToCommentConnectionPageInfo;
  ContentNodeToEnqueuedScriptConnectionPageInfo?: ContentNodeToEnqueuedScriptConnectionPageInfo;
  ContentNodeToEnqueuedStylesheetConnectionPageInfo?: ContentNodeToEnqueuedStylesheetConnectionPageInfo;
  ContentTypeToContentNodeConnectionPageInfo?: ContentTypeToContentNodeConnectionPageInfo;
  ContentTypeToTaxonomyConnectionPageInfo?: ContentTypeToTaxonomyConnectionPageInfo;
  HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo?: HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo;
  HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo?: HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo;
  MediaItemToCommentConnectionPageInfo?: MediaItemToCommentConnectionPageInfo;
  MenuItemToMenuItemConnectionPageInfo?: MenuItemToMenuItemConnectionPageInfo;
  MenuToMenuItemConnectionPageInfo?: MenuToMenuItemConnectionPageInfo;
  PageToCommentConnectionPageInfo?: PageToCommentConnectionPageInfo;
  PageToRevisionConnectionPageInfo?: PageToRevisionConnectionPageInfo;
  PostFormatToContentNodeConnectionPageInfo?: PostFormatToContentNodeConnectionPageInfo;
  PostFormatToPostConnectionPageInfo?: PostFormatToPostConnectionPageInfo;
  PostToCategoryConnectionPageInfo?: PostToCategoryConnectionPageInfo;
  PostToCommentConnectionPageInfo?: PostToCommentConnectionPageInfo;
  PostToPostFormatConnectionPageInfo?: PostToPostFormatConnectionPageInfo;
  PostToRevisionConnectionPageInfo?: PostToRevisionConnectionPageInfo;
  PostToTagConnectionPageInfo?: PostToTagConnectionPageInfo;
  PostToTermNodeConnectionPageInfo?: PostToTermNodeConnectionPageInfo;
  RootQueryToCategoryConnectionPageInfo?: RootQueryToCategoryConnectionPageInfo;
  RootQueryToCommentConnectionPageInfo?: RootQueryToCommentConnectionPageInfo;
  RootQueryToContentNodeConnectionPageInfo?: RootQueryToContentNodeConnectionPageInfo;
  RootQueryToContentTypeConnectionPageInfo?: RootQueryToContentTypeConnectionPageInfo;
  RootQueryToEnqueuedScriptConnectionPageInfo?: RootQueryToEnqueuedScriptConnectionPageInfo;
  RootQueryToEnqueuedStylesheetConnectionPageInfo?: RootQueryToEnqueuedStylesheetConnectionPageInfo;
  RootQueryToMediaItemConnectionPageInfo?: RootQueryToMediaItemConnectionPageInfo;
  RootQueryToMenuConnectionPageInfo?: RootQueryToMenuConnectionPageInfo;
  RootQueryToMenuItemConnectionPageInfo?: RootQueryToMenuItemConnectionPageInfo;
  RootQueryToPageConnectionPageInfo?: RootQueryToPageConnectionPageInfo;
  RootQueryToPluginConnectionPageInfo?: RootQueryToPluginConnectionPageInfo;
  RootQueryToPostConnectionPageInfo?: RootQueryToPostConnectionPageInfo;
  RootQueryToPostFormatConnectionPageInfo?: RootQueryToPostFormatConnectionPageInfo;
  RootQueryToRevisionsConnectionPageInfo?: RootQueryToRevisionsConnectionPageInfo;
  RootQueryToTagConnectionPageInfo?: RootQueryToTagConnectionPageInfo;
  RootQueryToTaxonomyConnectionPageInfo?: RootQueryToTaxonomyConnectionPageInfo;
  RootQueryToTermNodeConnectionPageInfo?: RootQueryToTermNodeConnectionPageInfo;
  RootQueryToThemeConnectionPageInfo?: RootQueryToThemeConnectionPageInfo;
  RootQueryToUserConnectionPageInfo?: RootQueryToUserConnectionPageInfo;
  RootQueryToUserRoleConnectionPageInfo?: RootQueryToUserRoleConnectionPageInfo;
  TagToContentNodeConnectionPageInfo?: TagToContentNodeConnectionPageInfo;
  TagToPostConnectionPageInfo?: TagToPostConnectionPageInfo;
  TaxonomyToContentTypeConnectionPageInfo?: TaxonomyToContentTypeConnectionPageInfo;
  TaxonomyToTermNodeConnectionPageInfo?: TaxonomyToTermNodeConnectionPageInfo;
  TermNodeToEnqueuedScriptConnectionPageInfo?: TermNodeToEnqueuedScriptConnectionPageInfo;
  TermNodeToEnqueuedStylesheetConnectionPageInfo?: TermNodeToEnqueuedStylesheetConnectionPageInfo;
  UserToCommentConnectionPageInfo?: UserToCommentConnectionPageInfo;
  UserToEnqueuedScriptConnectionPageInfo?: UserToEnqueuedScriptConnectionPageInfo;
  UserToEnqueuedStylesheetConnectionPageInfo?: UserToEnqueuedStylesheetConnectionPageInfo;
  UserToMediaItemConnectionPageInfo?: UserToMediaItemConnectionPageInfo;
  UserToPageConnectionPageInfo?: UserToPageConnectionPageInfo;
  UserToPostConnectionPageInfo?: UserToPostConnectionPageInfo;
  UserToRevisionsConnectionPageInfo?: UserToRevisionsConnectionPageInfo;
  UserToUserRoleConnectionPageInfo?: UserToUserRoleConnectionPageInfo;
}

export interface $PluginConnection {
  RootQueryToPluginConnection?: RootQueryToPluginConnection;
}

export interface $PluginConnectionEdge {
  RootQueryToPluginConnectionEdge?: RootQueryToPluginConnectionEdge;
}

export interface $PluginConnectionPageInfo {
  RootQueryToPluginConnectionPageInfo?: RootQueryToPluginConnectionPageInfo;
}

export interface $PostConnection {
  CategoryToPostConnection?: CategoryToPostConnection;
  PostFormatToPostConnection?: PostFormatToPostConnection;
  PostToRevisionConnection?: PostToRevisionConnection;
  RootQueryToPostConnection?: RootQueryToPostConnection;
  TagToPostConnection?: TagToPostConnection;
  UserToPostConnection?: UserToPostConnection;
}

export interface $PostConnectionEdge {
  CategoryToPostConnectionEdge?: CategoryToPostConnectionEdge;
  PostFormatToPostConnectionEdge?: PostFormatToPostConnectionEdge;
  PostToPreviewConnectionEdge?: PostToPreviewConnectionEdge;
  PostToRevisionConnectionEdge?: PostToRevisionConnectionEdge;
  RootQueryToPostConnectionEdge?: RootQueryToPostConnectionEdge;
  TagToPostConnectionEdge?: TagToPostConnectionEdge;
  UserToPostConnectionEdge?: UserToPostConnectionEdge;
}

export interface $PostConnectionPageInfo {
  CategoryToPostConnectionPageInfo?: CategoryToPostConnectionPageInfo;
  PostFormatToPostConnectionPageInfo?: PostFormatToPostConnectionPageInfo;
  PostToRevisionConnectionPageInfo?: PostToRevisionConnectionPageInfo;
  RootQueryToPostConnectionPageInfo?: RootQueryToPostConnectionPageInfo;
  TagToPostConnectionPageInfo?: TagToPostConnectionPageInfo;
  UserToPostConnectionPageInfo?: UserToPostConnectionPageInfo;
}

export interface $PostFormatConnection {
  PostToPostFormatConnection?: PostToPostFormatConnection;
  RootQueryToPostFormatConnection?: RootQueryToPostFormatConnection;
}

export interface $PostFormatConnectionEdge {
  PostToPostFormatConnectionEdge?: PostToPostFormatConnectionEdge;
  RootQueryToPostFormatConnectionEdge?: RootQueryToPostFormatConnectionEdge;
}

export interface $PostFormatConnectionPageInfo {
  PostToPostFormatConnectionPageInfo?: PostToPostFormatConnectionPageInfo;
  RootQueryToPostFormatConnectionPageInfo?: RootQueryToPostFormatConnectionPageInfo;
}

export interface $Previewable {
  Page?: Page;
  Post?: Post;
}

export interface $TagConnection {
  PostToTagConnection?: PostToTagConnection;
  RootQueryToTagConnection?: RootQueryToTagConnection;
}

export interface $TagConnectionEdge {
  PostToTagConnectionEdge?: PostToTagConnectionEdge;
  RootQueryToTagConnectionEdge?: RootQueryToTagConnectionEdge;
}

export interface $TagConnectionPageInfo {
  PostToTagConnectionPageInfo?: PostToTagConnectionPageInfo;
  RootQueryToTagConnectionPageInfo?: RootQueryToTagConnectionPageInfo;
}

export interface $TaxonomyConnection {
  ContentTypeToTaxonomyConnection?: ContentTypeToTaxonomyConnection;
  RootQueryToTaxonomyConnection?: RootQueryToTaxonomyConnection;
}

export interface $TaxonomyConnectionEdge {
  CategoryToTaxonomyConnectionEdge?: CategoryToTaxonomyConnectionEdge;
  ContentTypeToTaxonomyConnectionEdge?: ContentTypeToTaxonomyConnectionEdge;
  PostFormatToTaxonomyConnectionEdge?: PostFormatToTaxonomyConnectionEdge;
  RootQueryToTaxonomyConnectionEdge?: RootQueryToTaxonomyConnectionEdge;
  TagToTaxonomyConnectionEdge?: TagToTaxonomyConnectionEdge;
}

export interface $TaxonomyConnectionPageInfo {
  ContentTypeToTaxonomyConnectionPageInfo?: ContentTypeToTaxonomyConnectionPageInfo;
  RootQueryToTaxonomyConnectionPageInfo?: RootQueryToTaxonomyConnectionPageInfo;
}

export interface $TermNode {
  Category?: Category;
  PostFormat?: PostFormat;
  Tag?: Tag;
}

export interface $TermNodeConnection {
  PostToTermNodeConnection?: PostToTermNodeConnection;
  RootQueryToTermNodeConnection?: RootQueryToTermNodeConnection;
  TaxonomyToTermNodeConnection?: TaxonomyToTermNodeConnection;
}

export interface $TermNodeConnectionEdge {
  PostToTermNodeConnectionEdge?: PostToTermNodeConnectionEdge;
  RootQueryToTermNodeConnectionEdge?: RootQueryToTermNodeConnectionEdge;
  TaxonomyToTermNodeConnectionEdge?: TaxonomyToTermNodeConnectionEdge;
}

export interface $TermNodeConnectionPageInfo {
  PostToTermNodeConnectionPageInfo?: PostToTermNodeConnectionPageInfo;
  RootQueryToTermNodeConnectionPageInfo?: RootQueryToTermNodeConnectionPageInfo;
  TaxonomyToTermNodeConnectionPageInfo?: TaxonomyToTermNodeConnectionPageInfo;
}

export interface $ThemeConnection {
  RootQueryToThemeConnection?: RootQueryToThemeConnection;
}

export interface $ThemeConnectionEdge {
  RootQueryToThemeConnectionEdge?: RootQueryToThemeConnectionEdge;
}

export interface $ThemeConnectionPageInfo {
  RootQueryToThemeConnectionPageInfo?: RootQueryToThemeConnectionPageInfo;
}

export interface $UniformResourceIdentifiable {
  Category?: Category;
  ContentType?: ContentType;
  MediaItem?: MediaItem;
  Page?: Page;
  Post?: Post;
  PostFormat?: PostFormat;
  Tag?: Tag;
  User?: User;
}

export interface $UserConnection {
  RootQueryToUserConnection?: RootQueryToUserConnection;
}

export interface $UserConnectionEdge {
  ContentNodeToEditLastConnectionEdge?: ContentNodeToEditLastConnectionEdge;
  ContentNodeToEditLockConnectionEdge?: ContentNodeToEditLockConnectionEdge;
  NodeWithAuthorToUserConnectionEdge?: NodeWithAuthorToUserConnectionEdge;
  RootQueryToUserConnectionEdge?: RootQueryToUserConnectionEdge;
}

export interface $UserConnectionPageInfo {
  RootQueryToUserConnectionPageInfo?: RootQueryToUserConnectionPageInfo;
}

export interface $UserRoleConnection {
  RootQueryToUserRoleConnection?: RootQueryToUserRoleConnection;
  UserToUserRoleConnection?: UserToUserRoleConnection;
}

export interface $UserRoleConnectionEdge {
  RootQueryToUserRoleConnectionEdge?: RootQueryToUserRoleConnectionEdge;
  UserToUserRoleConnectionEdge?: UserToUserRoleConnectionEdge;
}

export interface $UserRoleConnectionPageInfo {
  RootQueryToUserRoleConnectionPageInfo?: RootQueryToUserRoleConnectionPageInfo;
  UserToUserRoleConnectionPageInfo?: UserToUserRoleConnectionPageInfo;
}

export interface $WPPageInfo {
  CategoryToAncestorsCategoryConnectionPageInfo?: CategoryToAncestorsCategoryConnectionPageInfo;
  CategoryToCategoryConnectionPageInfo?: CategoryToCategoryConnectionPageInfo;
  CategoryToContentNodeConnectionPageInfo?: CategoryToContentNodeConnectionPageInfo;
  CategoryToPostConnectionPageInfo?: CategoryToPostConnectionPageInfo;
  CommentToCommentConnectionPageInfo?: CommentToCommentConnectionPageInfo;
  ContentNodeToEnqueuedScriptConnectionPageInfo?: ContentNodeToEnqueuedScriptConnectionPageInfo;
  ContentNodeToEnqueuedStylesheetConnectionPageInfo?: ContentNodeToEnqueuedStylesheetConnectionPageInfo;
  ContentTypeToContentNodeConnectionPageInfo?: ContentTypeToContentNodeConnectionPageInfo;
  ContentTypeToTaxonomyConnectionPageInfo?: ContentTypeToTaxonomyConnectionPageInfo;
  HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo?: HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo;
  HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo?: HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo;
  MediaItemToCommentConnectionPageInfo?: MediaItemToCommentConnectionPageInfo;
  MenuItemToMenuItemConnectionPageInfo?: MenuItemToMenuItemConnectionPageInfo;
  MenuToMenuItemConnectionPageInfo?: MenuToMenuItemConnectionPageInfo;
  PageToCommentConnectionPageInfo?: PageToCommentConnectionPageInfo;
  PageToRevisionConnectionPageInfo?: PageToRevisionConnectionPageInfo;
  PostFormatToContentNodeConnectionPageInfo?: PostFormatToContentNodeConnectionPageInfo;
  PostFormatToPostConnectionPageInfo?: PostFormatToPostConnectionPageInfo;
  PostToCategoryConnectionPageInfo?: PostToCategoryConnectionPageInfo;
  PostToCommentConnectionPageInfo?: PostToCommentConnectionPageInfo;
  PostToPostFormatConnectionPageInfo?: PostToPostFormatConnectionPageInfo;
  PostToRevisionConnectionPageInfo?: PostToRevisionConnectionPageInfo;
  PostToTagConnectionPageInfo?: PostToTagConnectionPageInfo;
  PostToTermNodeConnectionPageInfo?: PostToTermNodeConnectionPageInfo;
  RootQueryToCategoryConnectionPageInfo?: RootQueryToCategoryConnectionPageInfo;
  RootQueryToCommentConnectionPageInfo?: RootQueryToCommentConnectionPageInfo;
  RootQueryToContentNodeConnectionPageInfo?: RootQueryToContentNodeConnectionPageInfo;
  RootQueryToContentTypeConnectionPageInfo?: RootQueryToContentTypeConnectionPageInfo;
  RootQueryToEnqueuedScriptConnectionPageInfo?: RootQueryToEnqueuedScriptConnectionPageInfo;
  RootQueryToEnqueuedStylesheetConnectionPageInfo?: RootQueryToEnqueuedStylesheetConnectionPageInfo;
  RootQueryToMediaItemConnectionPageInfo?: RootQueryToMediaItemConnectionPageInfo;
  RootQueryToMenuConnectionPageInfo?: RootQueryToMenuConnectionPageInfo;
  RootQueryToMenuItemConnectionPageInfo?: RootQueryToMenuItemConnectionPageInfo;
  RootQueryToPageConnectionPageInfo?: RootQueryToPageConnectionPageInfo;
  RootQueryToPluginConnectionPageInfo?: RootQueryToPluginConnectionPageInfo;
  RootQueryToPostConnectionPageInfo?: RootQueryToPostConnectionPageInfo;
  RootQueryToPostFormatConnectionPageInfo?: RootQueryToPostFormatConnectionPageInfo;
  RootQueryToRevisionsConnectionPageInfo?: RootQueryToRevisionsConnectionPageInfo;
  RootQueryToTagConnectionPageInfo?: RootQueryToTagConnectionPageInfo;
  RootQueryToTaxonomyConnectionPageInfo?: RootQueryToTaxonomyConnectionPageInfo;
  RootQueryToTermNodeConnectionPageInfo?: RootQueryToTermNodeConnectionPageInfo;
  RootQueryToThemeConnectionPageInfo?: RootQueryToThemeConnectionPageInfo;
  RootQueryToUserConnectionPageInfo?: RootQueryToUserConnectionPageInfo;
  RootQueryToUserRoleConnectionPageInfo?: RootQueryToUserRoleConnectionPageInfo;
  TagToContentNodeConnectionPageInfo?: TagToContentNodeConnectionPageInfo;
  TagToPostConnectionPageInfo?: TagToPostConnectionPageInfo;
  TaxonomyToContentTypeConnectionPageInfo?: TaxonomyToContentTypeConnectionPageInfo;
  TaxonomyToTermNodeConnectionPageInfo?: TaxonomyToTermNodeConnectionPageInfo;
  TermNodeToEnqueuedScriptConnectionPageInfo?: TermNodeToEnqueuedScriptConnectionPageInfo;
  TermNodeToEnqueuedStylesheetConnectionPageInfo?: TermNodeToEnqueuedStylesheetConnectionPageInfo;
  UserToCommentConnectionPageInfo?: UserToCommentConnectionPageInfo;
  UserToEnqueuedScriptConnectionPageInfo?: UserToEnqueuedScriptConnectionPageInfo;
  UserToEnqueuedStylesheetConnectionPageInfo?: UserToEnqueuedStylesheetConnectionPageInfo;
  UserToMediaItemConnectionPageInfo?: UserToMediaItemConnectionPageInfo;
  UserToPageConnectionPageInfo?: UserToPageConnectionPageInfo;
  UserToPostConnectionPageInfo?: UserToPostConnectionPageInfo;
  UserToRevisionsConnectionPageInfo?: UserToRevisionsConnectionPageInfo;
  UserToUserRoleConnectionPageInfo?: UserToUserRoleConnectionPageInfo;
}

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {
  AvatarRatingEnum: AvatarRatingEnum | undefined;
  CategoryIdType: CategoryIdType | undefined;
  CommentNodeIdTypeEnum: CommentNodeIdTypeEnum | undefined;
  CommentStatusEnum: CommentStatusEnum | undefined;
  CommentsConnectionOrderbyEnum: CommentsConnectionOrderbyEnum | undefined;
  ContentNodeIdTypeEnum: ContentNodeIdTypeEnum | undefined;
  ContentTypeEnum: ContentTypeEnum | undefined;
  ContentTypeIdTypeEnum: ContentTypeIdTypeEnum | undefined;
  ContentTypesOfCategoryEnum: ContentTypesOfCategoryEnum | undefined;
  ContentTypesOfPostFormatEnum: ContentTypesOfPostFormatEnum | undefined;
  ContentTypesOfTagEnum: ContentTypesOfTagEnum | undefined;
  MediaItemIdType: MediaItemIdType | undefined;
  MediaItemSizeEnum: MediaItemSizeEnum | undefined;
  MediaItemStatusEnum: MediaItemStatusEnum | undefined;
  MenuItemNodeIdTypeEnum: MenuItemNodeIdTypeEnum | undefined;
  MenuLocationEnum: MenuLocationEnum | undefined;
  MenuNodeIdTypeEnum: MenuNodeIdTypeEnum | undefined;
  MimeTypeEnum: MimeTypeEnum | undefined;
  OrderEnum: OrderEnum | undefined;
  PageIdType: PageIdType | undefined;
  PluginStatusEnum: PluginStatusEnum | undefined;
  PostFormatIdType: PostFormatIdType | undefined;
  PostIdType: PostIdType | undefined;
  PostObjectFieldFormatEnum: PostObjectFieldFormatEnum | undefined;
  PostObjectsConnectionDateColumnEnum:
    | PostObjectsConnectionDateColumnEnum
    | undefined;
  PostObjectsConnectionOrderbyEnum:
    | PostObjectsConnectionOrderbyEnum
    | undefined;
  PostStatusEnum: PostStatusEnum | undefined;
  RelationEnum: RelationEnum | undefined;
  ScriptLoadingStrategyEnum: ScriptLoadingStrategyEnum | undefined;
  TagIdType: TagIdType | undefined;
  TaxonomyEnum: TaxonomyEnum | undefined;
  TaxonomyIdTypeEnum: TaxonomyIdTypeEnum | undefined;
  TermNodeIdTypeEnum: TermNodeIdTypeEnum | undefined;
  TermObjectsConnectionOrderbyEnum:
    | TermObjectsConnectionOrderbyEnum
    | undefined;
  UserNodeIdTypeEnum: UserNodeIdTypeEnum | undefined;
  UserRoleEnum: UserRoleEnum | undefined;
  UsersConnectionOrderbyEnum: UsersConnectionOrderbyEnum | undefined;
  UsersConnectionSearchColumnEnum: UsersConnectionSearchColumnEnum | undefined;
}
