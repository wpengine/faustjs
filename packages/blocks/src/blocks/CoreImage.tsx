/* eslint-disable react/jsx-props-no-spreading */
import { gql } from '@apollo/client';
import Image from 'next/image.js';
import Link from 'next/link.js';
import React, { PropsWithChildren } from 'react';
import { useBlocksTheme } from '../components/WordPressBlocksProvider.js';
import { ContentBlock } from '../components/WordPressBlocksViewer.js';
import { getStyles } from '../utils/index.js';

export type CoreImageFragmentProps = ContentBlock & {
  attributes: {
    align?: string;
    alt?: string;
    anchor?: string;
    borderColor?: string;
    caption?: string;
    className?: string;
    width?: string;
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
    height?: string;
    cssClassName?: string;
  };
};

function LinkWrapper(props: PropsWithChildren<CoreImageFragmentProps>) {
  const { attributes, children } = props;

  if (!attributes.href) {
    /**
     * Fragment is used to fix the following TS error:
     * 'LinkWrapper' cannot be used as a JSX component.
     */
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <Link
      href={attributes.href}
      target={attributes?.linkTarget}
      className={attributes?.linkClass}
      rel={attributes?.rel}>
      {children}
    </Link>
  );
}

function ImgWrapper(props: PropsWithChildren<CoreImageFragmentProps>) {
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes } = props;

  if (!attributes.src) {
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
      <LinkWrapper {...props}>
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
