import { WordPressBlocksViewer } from "@faustwp/blocks";
import getStyles from '../utilities/getStyles.js';

export default function CoreColumn(props) {
  const attributes = props.attributes;
  const style = getStyles(attributes);
  return (
    <div className={attributes?.cssClassName} style={style}>
      <WordPressBlocksViewer contentBlocks={props?.children ?? []} />
    </div>
  )
}
