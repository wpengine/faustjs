import { gql } from '@apollo/client';
import { EmptyStar, FullStar } from './icons';
import styles from './UbStarRatingBlock.module.scss';

export default function UbStarRatingBlock({ attributes } = {}) {
  const {
    starCount,
    starSize,
    starColor,
    selectedStars,
    reviewText,
    reviewTextAlign,
    reviewTextColor,
    starAlign,
  } = attributes;
  return (
    <div className="ub-star-rating">
      <div
        className={styles['ub-star-outer-container']}
        style={{
          justifyContent:
            starAlign === 'center'
              ? 'center'
              : `flex-${starAlign === 'left' ? 'start' : 'end'}`,
        }}>
        <div className={styles['ub-star-inner-container']}>
          {[...Array(starCount)].map((e, i) => (
            <div key={i}>
              {i < selectedStars ? (
                <FullStar size={starSize} fillColor={starColor} />
              ) : (
                <EmptyStar size={starSize} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="ub-review-text" style={{ textAlign: reviewTextAlign, color: reviewTextColor }}>
        {reviewText}
      </div>
    </div>
  );
}

UbStarRatingBlock.fragments = {
  entry: gql`
    fragment UbStarRatingBlockFragment on UbStarRatingBlock {
      attributes {
        starSize
        className
        blockID
        starAlign
        starColor
        starCount
        selectedStars
        reviewTextColor
        reviewText
        reviewTextAlign
      }
    }
  `,
  key: `UbStarRatingBlockFragment`,
};
