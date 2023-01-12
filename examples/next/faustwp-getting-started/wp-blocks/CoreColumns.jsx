import { gql } from '@apollo/client';
import { WordPressBlocksViewer } from "@faustwp/blocks";

export default function CoreColumns(props) {
  const attributes = props.attributes;
  return (
    <div className={attributes?.cssClassName}>
      <WordPressBlocksViewer contentBlocks={props?.children ?? []} />
    </div>
  )
}

CoreColumns.fragments = {
  entry: gql`
    fragment CoreColumnsFragment on CoreColumns {
      attributes {
        cssClassName
      }
    }
  `,
  key: `CoreColumnsFragment`,
};
