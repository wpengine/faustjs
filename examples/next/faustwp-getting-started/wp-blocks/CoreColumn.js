import { gql } from '@apollo/client';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import getStyles from '../utilities/getStyles.js';

export default function CoreColumn(props) {
  const attributes = props.attributes;
  const style = getStyles(attributes);
  return (
    <div className={attributes?.cssClassName} style={style}>
      <WordPressBlocksViewer blocks={props?.children ?? []} />
    </div>
  );
}

CoreColumn.fragments = {
  entry: gql`
    fragment CoreColumnFragment on CoreColumn {
      attributes {
        cssClassName
        style
      }
    }
  `,
  key: `CoreColumnFragment`,
};
