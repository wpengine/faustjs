import { gql } from '@apollo/client';
import styles from './UbCallToActionBlock.module.scss';

export default function UbCallToActionBlock({ className, attributes = {} }) {
  const {
    ctaBackgroundColor,
    ctaBorderSize,
    ctaBorderColor,
    headFontSize,
    headColor,
    headAlign,
    ubCallToActionHeadlineText,
    contentFontSize,
    contentColor,
    contentAlign,
    ubCtaContentText,
    buttonColor,
    buttonWidth,
    url,
    buttonTextColor,
    buttonFontSize,
    ubCtaButtonText,
    addNofollow,
    openInNewTab,
  } = attributes;

  return (
    <div className={className}>
      <div
        className={styles['ub_call_to_action']}
        style={{
          backgroundColor: ctaBackgroundColor,
          border: ctaBorderSize + 'px solid',
          borderColor: ctaBorderColor,
        }}>
        <div className={styles['ub_call_to_action_headline']}>
          <p
            className="ub_call_to_action_headline_text"
            style={{
              fontSize: headFontSize + 'px',
              color: headColor,
              textAlign: headAlign,
            }}>
            {ubCallToActionHeadlineText}
          </p>
        </div>
        <div className={styles['ub_call_to_action_content']}>
          <p
            className="ub_cta_content_text"
            style={{
              fontSize: contentFontSize + 'px',
              color: contentColor,
              textAlign: contentAlign,
            }}>
            {ubCtaContentText}
          </p>
        </div>
        <div className={styles['ub_call_to_action_button']}>
          <a
            href={url}
            target={openInNewTab ? '_blank' : '_self'}
            rel={`${addNofollow ? 'nofollow ' : ''}noopener noreferrer`}
            className={`wp-block-button ${styles['ub_cta_button']}`}
            style={{
              backgroundColor: buttonColor,
              width: buttonWidth + 'px',
            }}>
            <p
              className={styles['ub_cta_button_text']}
              style={{
                color: buttonTextColor,
                fontSize: buttonFontSize + 'px',
              }}>
              {ubCtaButtonText}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

UbCallToActionBlock.fragments = {
  key: `UbCallToActionBlockFragment`,
  entry: gql`
    fragment UbCallToActionBlockFragment on UbCallToActionBlock {
      attributes {
        ctaBackgroundColor
        ctaBorderSize
        ctaBorderColor
        headFontSize
        headColor
        headAlign
        ubCallToActionHeadlineText
        contentFontSize
        contentColor
        contentAlign
        ubCtaContentText
        buttonColor
        buttonWidth
        url
        buttonTextColor
        buttonFontSize
        ubCtaButtonText
        addNofollow
        openInNewTab
      }
    }
  `,
};
