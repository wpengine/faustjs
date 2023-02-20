import { gql } from '@apollo/client';
import getStyles from '../utilities/getStyles.js';

export default function CoreCode(props) {
  const className = 'wp-block-code';
  const styles = getStyles(props.attributes)
  return (
    <pre className={className} style={styles}>
      <code>{`${props.attributes?.content}`}</code>
    </pre>
  );
}

CoreCode.fragments = {
  key: `CoreCodeBlockFragment`,
  entry: gql`
    fragment CoreCodeBlockFragment on CoreCode {
      attributes {
        borderColor
        backgroundColor
        content
        style
        textColor
        fontSize
        fontFamily
      }
    }
  `,
};
