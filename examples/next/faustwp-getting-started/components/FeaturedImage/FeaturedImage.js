import { gql } from '@apollo/client';
import Image from 'next/image';
export default function FeaturedImage({
  image,
  width,
  height,
  className,
  priority,
  layout,
  ...props
}) {
  const src = image?.sourceUrl;

  if (!src) return null;

  const { altText = '', mediaDetails = {} } = image ?? {};

  layout = layout ?? 'fill';

  const dimensions = {
    width: layout === 'fill' ? undefined : width ?? mediaDetails?.width,
    height: layout === 'fill' ? undefined : height ?? mediaDetails?.height
  };

  if (layout !== 'fill' && (!dimensions.width || !dimensions.height)) return null;

  return (
    <figure className={className}>
      <Image
        src={src}
        alt={altText}
        fill={layout}
        width={dimensions.width}
        height={dimensions.height}
        priority={priority}
        {...props}
      />
    </figure>
  );
}

FeaturedImage.fragments = {
  entry: gql`
    fragment FeaturedImageFragment on NodeWithFeaturedImage {
      featuredImage {
        node {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  `,
};
