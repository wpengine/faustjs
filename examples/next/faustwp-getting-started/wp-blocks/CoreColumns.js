import { gql } from '@apollo/client';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import getStyles from '../utilities/getStyles.js';

export default function CoreColumns(props) {
  const attributes = props.attributes;
  const style = getStyles(attributes);
  return (
    <div className={attributes?.cssClassName} style={style}>
      <WordPressBlocksViewer blocks={props?.children ?? []} />
    </div>
  );
}

CoreColumns.fragments = {
  entry: gql`
    fragment CoreColumnsFragment on CoreColumns {
      attributes {
        cssClassName
        style
      }
    }
  `,
  key: `CoreColumnsFragment`,
};
