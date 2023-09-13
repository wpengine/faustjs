import { BlockConfiguration } from '@wordpress/blocks';
import { Field, FieldControl, FieldType } from '../types/index.js';

const blockAttributeTypeToControlMap: Record<FieldType, FieldControl> = {
  string: 'text',
  boolean: 'radio',
  integer: 'number',
  number: 'number',
  object: 'textarea',
  array: 'textarea',
};

/**
 * Returns a list of Field objects that describe how the Component Editor Fields configuration.
 * Uses both the Block.json and the blocks editorFields config to create the final list.
 * The logic is explained in detail in the RFC document for React Components To Blocks.
 *
 * @param blockJson Block.json object
 * @param editorFields Block config editorFields metadata
 * @returns
 */
function getControlFields(
  blockJson: BlockConfiguration,
  editorFields: Partial<Field>[],
): Field[] {
  const fields: Field[] = [];
  Object.entries(blockJson.attributes).forEach(([key, value]) => {
    const fieldConfig = Object.entries(editorFields).find(([name]) => {
      return key === name;
    })?.[1];
    const fieldType: FieldType = (value as any).type;
    const control = blockAttributeTypeToControlMap[fieldType] ?? 'text';
    // Set default field by merging both blockAttributes meta and editorFields hints.
    if (fieldConfig) {
      fields.push({
        name: key,
        label: fieldConfig.label ?? key,
        type: fieldType,
        location: fieldConfig.location ?? 'editor',
        control: fieldConfig?.control ?? control,
        options: fieldConfig?.options ?? [],
      });
    } else {
      // Set default field by using only blockAttributes meta
      fields.push({
        name: key,
        label: key,
        type: fieldType,
        location: 'editor',
        control,
        options: [],
      });
    }
  });
  return fields;
}

export default getControlFields;
