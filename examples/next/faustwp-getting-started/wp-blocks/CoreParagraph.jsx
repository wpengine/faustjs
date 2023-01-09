import { gql } from '@apollo/client';
import React from 'react';

import getStyles from '../utilities/getStyles.js';

export default function CoreParagraph(props) {
  const attributes = props.attributes;
  const style = getStyles(attributes);
  return (
    <p
      style={style}
      className={attributes?.className}
      dangerouslySetInnerHTML={{ __html: attributes.content }}></p>
  );
}

CoreParagraph.fragments = {
  entry: gql`
    fragment CoreParagraphFragment on CoreParagraph {
      attributes {
        content
        fontSize
        textColor
        backgroundColor
        className
      }
    }
  `,
};
