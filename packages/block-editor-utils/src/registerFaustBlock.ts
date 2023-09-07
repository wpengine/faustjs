import {
  registerBlockType,
  BlockConfiguration,
  BlockEditProps,
  BlockSaveProps,
} from '@wordpress/blocks';
import DefaultSaveFn from './components/Save.js';
import DefaultEditFn from './components/Edit.js';
import { BlockFC, ConfigType } from './types/index.js';
import './controls/index.js';

export interface RegisterFaustBlockMetadata<T extends Record<string, any>> {
  // The block.json metadata object
  blockJson: BlockConfiguration;
  // A custom edit function
  editFn: (ctx: EditFnContext<T>) => React.ReactNode | null;
  // A custom save function
  saveFn: (ctx: SaveFnContext<T>) => React.ReactNode | null;
}

export interface EditFnContext<T extends Record<string, any>> {
  block: BlockFC;
  props: BlockEditProps<T>;
  wp: unknown;
  config: ConfigType;
  blockJson: BlockConfiguration;
}

export interface SaveFnContext<T extends Record<string, unknown>> {
  block: BlockFC;
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
export default function registerFaustBlock<T extends Record<string, any>>(
  block: BlockFC,
  {
    blockJson,
    editFn = DefaultEditFn,
    saveFn = DefaultSaveFn,
  }: RegisterFaustBlockMetadata<T>,
): ReturnType<typeof registerBlockType> {
  // Pass the block config as a separate argument
  const { config } = block;
  const name: string =
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
