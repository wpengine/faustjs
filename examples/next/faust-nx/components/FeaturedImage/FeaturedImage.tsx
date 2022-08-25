import className from 'classnames';
import Image from 'next/image';

import styles from './FeaturedImage.module.scss';

let cx = className.bind(styles);

type Props = {
  image: any,
  width?: number,
  height?: number,
  className?: string,
  priority?: boolean,
};

export default function FeaturedImage({
  image,
  width,
  height,
  className,
  priority,
  ...props
}: Props): JSX.Element | null {
  let src;
  if (image?.sourceUrl instanceof Function) {
    src = image?.sourceUrl();
  } else {
    src = image?.sourceUrl;
  }
  const { altText } = image || '';

  width = width ? width : image?.mediaDetails?.width;
  height = height ? height : image?.mediaDetails?.height;

  return src && width && height ? (
    <figure className={cx('featured-image', className)}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={altText}
        objectFit="cover"
        layout="responsive"
        priority={priority}
        {...props}
      />
    </figure>
  ) : null;
}
