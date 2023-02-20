import { gql } from '@apollo/client';
export default function UbCallToActionBlock(props) {
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
  } = props.attributes;
  return (
    <div className={props.className}>
      <div
        className="ub_call_to_action"
        style={{
          backgroundColor: ctaBackgroundColor,
          border: ctaBorderSize + 'px solid',
          borderColor: ctaBorderColor,
        }}>
        <div className="ub_call_to_action_headline">
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
        <div className="ub_call_to_action_content">
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
        <div className="ub_call_to_action_button">
          <a
            href={url}
            target={openInNewTab ? '_blank' : '_self'}
            rel={`${addNofollow ? 'nofollow ' : ''}noopener noreferrer`}
            className={`wp-block-button ub_cta_button`}
            style={{
              backgroundColor: buttonColor,
              width: buttonWidth + 'px',
            }}>
            <p
              className="ub_cta_button_text"
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
