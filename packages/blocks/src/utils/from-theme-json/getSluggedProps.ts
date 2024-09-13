import type { Slugged } from '../../types/slugged';

/**
 * Reduces the a list Slugged objects into key value pairs {slug: value} for each item in the original list.
 * @template T - Type extending the Slugged interface
 * @template Key - Type extending keyof T
 * @param {T[]} listProps - An array of objects of type `T`.
 * @param {Key} valueProp - A `Key` of type `keyof T`.
 * @returns {Record<string, T[Key]>} A `Record` object with keys as slugs and values as the specified valueProp.
 */
export function getSluggedProps<T extends Slugged, Key extends keyof T>(
  listProps: T[],
  valueProp: Key,
): Record<string, unknown> {
  const res = Object.entries(listProps).reduce(
    (acc, [, value]) => {
      acc[value.slug] = value[valueProp];
      return acc;
    },
    {} as Record<string, unknown>,
  );
  return res;
}
