import { WordPressBlocksViewer } from "@faustwp/blocks";

export default function CoreColumn(props) {
  const attributes = props.attributes;
  return (
    <div className={attributes?.cssClassName}>
      <WordPressBlocksViewer contentBlocks={props?.children ?? []} />
    </div>
  )
}
