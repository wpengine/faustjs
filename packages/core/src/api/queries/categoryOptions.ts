import { ListPostOptions } from './getPosts';

/**
 * Parts of an optionally paginated category URL path such as
 * /category/uncategorized/[before|after]/[abc123].
 */
interface CategoryUrlParts {
  basePath: string; // '/category/uncategorized'
  category: string; // 'uncategorized'
  direction?: string; // 'before'
  id?: string; // 'abc123'
}

/**
 * Converts a string or array into category URL parts assuming the
 * form /category/uncategorized/[before|after]/[abc123].
 */
const getCategoryUrlParts = (path: string | string[]): CategoryUrlParts => {
  const parts = Array.isArray(path) ? path : path.split('/').filter(Boolean);
  return {
    basePath: parts.slice(0, 2).join('/'),
    category: parts[1],
    direction: parts[2],
    id: parts[3],
  };
};

/**
 * Determines WPGraphQL query options from URL info.
 *
 * @see https://www.wpgraphql.com/2020/03/26/forward-and-backward-pagination-with-wpgraphql/.
 */
const getQueryOptions = (url: CategoryUrlParts, postsPerPage: number) => {
  return {
    variables: {
      first:
        url.direction === 'after' || !url.direction ? postsPerPage : undefined,
      last: url.direction === 'before' ? postsPerPage : undefined,
      after: url.direction === 'after' ? url.id : undefined,
      before: url.direction === 'before' ? url.id : undefined,
      where: {
        categoryName: url.category,
      },
    },
  };
};

/**
 * Provides WPGraphQL options for getPosts and usePosts based on the
 * passed category page URL.
 */
export function categoryOptions(
  urlPath: string | string[],
  postsPerPage: number,
): ListPostOptions {
  const url = getCategoryUrlParts(urlPath ?? []);
  return getQueryOptions(url, postsPerPage);
}
