export interface ApiConfig {
  baseUrl: string;
  authorizeEndpoint: string;
  secret?: string;
}

export interface TemplateProps {
  pageInfo: UriInfo;
}

export interface HeadlessTheme {
  DefaultTemplate: import('react').FC<TemplateProps>;
  SingleTemplate?: import('react').FC<TemplateProps>;
  ListTemplate?: import('react').FC<TemplateProps>;
  NotFoundTemplate?: import('react').FC<TemplateProps>;
}

export interface ThemeContext {
  pageInfo?: UriInfo;
}

export enum ContentNodeIdType {
  DATABASE_ID = 'DATABASE_ID',
  ID = 'ID',
  URI = 'URI',
  SLUG = 'SLUG',
}

export interface ConnectionEdge<NodeType> {
  cursor: string;
  node: NodeType;
}

export interface Connection<NodeType> {
  pageInfo: PageInfo;
  edges: ConnectionEdge<NodeType>[];
}

export interface UriInfo {
  id?: string;
  isPostsPage?: boolean;
  isFrontPage?: boolean;
  isPreview?: boolean;
  is404?: boolean;
  uriPath: string;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

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

export interface PostPreview {
  node: Omit<Post, 'preview'>;
}

export interface PagePreview {
  node: Omit<Page, 'preview'>;
}

export interface Post extends ContentNode {
  excerpt: string;
  isSticky: boolean;
  preview?: PostPreview;
}

export interface Page extends ContentNode {
  isFrontPage: boolean;
  isPostsPage: boolean;
  preview?: PagePreview;
}

export interface GeneralSettings {
  title: string;
  description: string;
}
