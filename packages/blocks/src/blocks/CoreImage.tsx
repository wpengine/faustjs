import { gql } from '@apollo/client';
import Image from 'next/image.js';
import React, { PropsWithChildren } from 'react';
import { useBlocksTheme } from '../components/WordPressBlocksProvider.js';
import { ContentBlock } from '../components/WordPressBlocksViewer.js';
import { getStyles } from '../utils/index.js';

export type CoreImageFragmentProps = ContentBlock & {
  attributes?: {
    align?: string;
    alt?: string;
    anchor?: string;
    borderColor?: string;
    caption?: string;
    className?: string;
    width?: number;
    id?: number;
    url?: string;
    title?: string;
    style?: string;
    src?: string;
    sizeSlug?: string;
    rel?: string;
    lock?: string;
    linkTarget?: string;
    linkDestination?: string;
    linkClass?: string;
    href?: string;
    height?: number;
    cssClassName?: string;
  };
};

function LinkWrapper(props: PropsWithChildren<CoreImageFragmentProps>) {
  const { attributes, children } = props;

  if (!attributes?.href) {
    /**
     * Fragment is used to fix the following TS error:
     * 'LinkWrapper' cannot be used as a JSX component.
     */
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  /**
   * Using a traditional "a" tag here instead of a Next link since Next links
   * only work with relative Next.js pages. Identifying that is tough.
   * We could conditionally use a Next.js Link for relative URLs, but since we
   * are seeing a hybrid approach of Faust apps with their monolithic WP counterparts,
   * for now it's best to stick with a simple "a" tag.
   */
  return (
    <a
      href={attributes.href}
      target={attributes?.linkTarget}
      className={attributes?.linkClass}
      rel={attributes?.rel}>
      {children}
    </a>
  );
}

function ImgWrapper(props: PropsWithChildren<CoreImageFragmentProps>) {
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes } = props;

  if (!attributes?.src) {
    return null;
  }

  /**
   * Next Image requires width, height, and alt
   *
   * @link https://nextjs.org/docs/pages/api-reference/components/image
   */
  if (attributes?.width && attributes?.height) {
    <Image
      style={style}
      src={attributes?.src}
      width={attributes.width}
      height={attributes.height}
      alt={attributes?.alt ?? ''}
      title={attributes?.title ?? undefined}
    />;
  }

  return (
    <img
      src={attributes.src}
      style={style}
      alt={attributes?.alt ?? ''}
      title={attributes?.title ?? undefined}
    />
  );
}

export function CoreImage(props: CoreImageFragmentProps) {
  const { attributes } = props;

  return (
    <figure
      id={attributes?.anchor ?? undefined}
      className={attributes?.cssClassName}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <LinkWrapper {...props}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <ImgWrapper {...props} />
      </LinkWrapper>
      {attributes?.caption && (
        <figcaption className="wp-element-caption">
          {attributes.caption}
        </figcaption>
      )}
    </figure>
  );
}

CoreImage.fragments = {
  key: `CoreImageBlockFragment`,
  entry: gql`
    fragment CoreImageBlockFragment on CoreImage {
      attributes {
        align
        alt
        anchor
        borderColor
        caption
        className
        width
        url
        title
        style
        src
        sizeSlug
        rel
        lock
        linkTarget
        linkDestination
        linkClass
        href
        height
        cssClassName
      }
    }
  `,
};

CoreImage.config = {
  name: 'CoreImage',
};

CoreImage.displayName = 'CoreImage';
