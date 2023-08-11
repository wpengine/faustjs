import {
  registerBlockType,
  BlockConfiguration,
  BlockEditProps,
  BlockSaveProps,
} from '@wordpress/blocks';
import { WordPressBlock } from '@faustwp/blocks';

export interface RegisterFaustBlockMetadata<P, T extends Record<string, any>> {
  // The block.json metadata object
  blockJson: BlockConfiguration;
  // A custom edit function
  editFn: (ctx: EditFnContext<P, T>) => React.ReactNode | null;
  // A custom save function
  saveFn: (ctx: SaveFnContext<P, T>) => React.ReactNode | null;
}

export interface EditFnContext<P, T extends Record<string, any>> {
  block: WordPressBlock<P>;
  props: BlockEditProps<T>;
  wp: unknown;
  config: WordPressBlock<P>['config'];
  blockJson: RegisterFaustBlockMetadata<P, T>['blockJson'];
}

export interface SaveFnContext<P, T extends Record<string, unknown>> {
  block: WordPressBlock<P>;
  props: BlockSaveProps<T>;
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
export default function registerFaustBlock<P, T extends Record<string, any>>(
  block: WordPressBlock<P>,
  { blockJson, editFn, saveFn }: RegisterFaustBlockMetadata<P, T>,
): ReturnType<typeof registerBlockType> {
  // Pass the block config as a separate argument
  const { config } = block;
  const name =
    blockJson.name ?? config?.name ?? block.displayName ?? block.name;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return registerBlockType(name, {
    ...blockJson,
    edit: (props: BlockEditProps<T>) =>
      editFn({
        block,
        blockJson,
        config,
        props,
        wp,
      }),
    save: (props: BlockSaveProps<T>) =>
      saveFn({
        block,
        props,
        wp,
      }),
  } as BlockConfiguration);
}
