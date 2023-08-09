import { registerBlockType, BlockConfiguration } from '@wordpress/blocks';
import { WordPressBlock } from '@faustwp/blocks';

export interface RegisterFaustBlockMetadata<P> {
  // The block.json metadata object
  blockJson: BlockConfiguration;
  // A custom edit function
  editFn: (ctx: EditFnContext<P>) => React.ReactNode | null;
  // A custom save function
  saveFn: (ctx: SaveFnContext<P>) => React.ReactNode | null;
}

export interface EditFnContext<P> {
  block: WordPressBlock<P>;
  props: unknown;
  wp: unknown;
  config: WordPressBlock<P>['config'];
  blockJson: RegisterFaustBlockMetadata<P>['blockJson'];
}

export interface SaveFnContext<P> {
  block: WordPressBlock<P>;
  props: unknown;
  wp: unknown;
}

/**
 * The `registerFaustBlock` helper function registers a new React Component into the Gutenberg Editor.
 * By providing a valid `block.json` and some configuration, this helper function will generate custom `edit` and `save` functions that will be used a parameters to the
 * [registerBlockType](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/#registerblocktype) function.
 *
 * Users can provider their own custom edit or save functions by passing them as parameters to the ctx argument.
 * Use `editFn` to override the `edit` function and `saveFn` to override the `save` function
 *
 * @param block The React component to register as Gutenberg Block.
 * @param ctx  The metadata object that contains the block.json.
 */
export default function registerFaustBlock<P>(
  block: WordPressBlock<P>,
  { blockJson, editFn, saveFn }: RegisterFaustBlockMetadata<P>,
): ReturnType<typeof registerBlockType> {
  // Pass the block config as a separate argument
  const { config } = block;
  const name =
    blockJson.name ?? config?.name ?? block.displayName ?? block.name;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return registerBlockType(name, {
    ...blockJson,
    edit: (props: unknown) =>
      editFn({
        block,
        blockJson,
        config,
        props,
        wp,
      }),
    save: (props: unknown) =>
      saveFn({
        block,
        props,
        wp,
      }),
  } as BlockConfiguration);
}
