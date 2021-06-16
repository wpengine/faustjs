export interface Post {
  id: string;
  slug?: string;
  title(): string;
  excerpt(): string;
  content(): string;
}

export enum PostIdType {
  DATABASE_ID = 'DATABASE_ID',
  ID = 'ID',
  SLUG = 'SLUG',
  URI = 'URI',
}

export interface Page {
  id: string;
  slug?: string;
  title(): string;
  content(): string;
}

export enum PageIdType {
  DATABASE_ID = 'DATABASE_ID',
  ID = 'ID',
  URI = 'URI',
}
