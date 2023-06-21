import { gql } from '@apollo/client';
import React from 'react';
import Image from 'next/image.js';
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
    id?: string;
    href?: string;
    height?: string;
    cssClassName?: string;
  };
};

export function CoreImage(props: CoreImageFragmentProps) {
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes } = props;
  const linkTarget = attributes.linkTarget ? '_blank' : undefined;

  if (attributes.width && attributes.height) {
    return (
      <figure className={attributes?.cssClassName}>
        <Image
          style={style}
          src={attributes.src || ''}
          width={attributes.width}
          height={attributes.height}
          alt={attributes.alt}
        />
        {attributes?.caption && <figcaption>{attributes.caption}</figcaption>}
      </figure>
    );
  }
  return (
    <figure id={attributes?.anchor} className={attributes?.cssClassName}>
      <img
        style={style}
        src={attributes.src}
        width={attributes.width}
        height={attributes.height}
        alt={attributes.alt}
      />
      {attributes?.caption && <figcaption>{attributes.caption}</figcaption>}
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
        imageId: id
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
