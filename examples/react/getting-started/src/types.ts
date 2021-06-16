export type Nil<T> = T | null | undefined;

export interface Post {
  id: string | undefined;
  slug?: string | null;
  title(): Nil<string>;
  excerpt(): Nil<string>;
  content(): Nil<string>;
}

export enum PostIdType {
  DATABASE_ID = 'DATABASE_ID',
  ID = 'ID',
  SLUG = 'SLUG',
  URI = 'URI',
}

export interface Page {
  id: string | undefined;
  slug?: string | null;
  title(): Nil<string>;
  content(): Nil<string>;
}

export enum PageIdType {
  DATABASE_ID = 'DATABASE_ID',
  ID = 'ID',
  URI = 'URI',
}
