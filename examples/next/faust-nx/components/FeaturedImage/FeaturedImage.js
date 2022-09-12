import { gql } from '@apollo/client';
import Image from 'next/image';
export default function FeaturedImage({
  image,
  width,
  height,
  className,
  priority,
  ...props
}) {
  const src = image?.sourceUrl;
  const { altText } = image || '';

  width = width ? width : image?.mediaDetails?.width;
  height = height ? height : image?.mediaDetails?.height;

  return src && width && height ? (
    <figure className={className}>
      <Image
        src={src}
        alt={altText}
        layout="fill"
        priority={priority}
        {...props}
      />
    </figure>
  ) : null;
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
    }`
}
