import { WordPressBlocksViewer } from "@faustwp/blocks";

export default function CoreColumns(props) {
  const attributes = props.attributes;
  console.debug(props);
  return (
    <div className={attributes?.cssClassName}>
      <WordPressBlocksViewer contentBlocks={props?.children ?? []} />
    </div>
  )
}
