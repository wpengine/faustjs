declare global {
  let wp: unknown;
}
/**
 * A BlockFC is a React Component with a config property.
 */
export type BlockFC<T = {}> = React.FC<T> & {
  config: ConfigType;
};
export interface ConfigType {
  name?: string;
  editorFields?: Partial<Field>[];
}

export interface FieldOption {
  label: string;
  value: string;
}

export type Field = BasicField | SelectableField | RangeField | RichTextField

type BasicField = {
  name: string;
  type: FieldType
  control: FieldControl;
  location: FieldLocation;
  label?: string;
  default?: unknown;
  options?: FieldOption[];
};

export type SelectableField = BasicField & {
  control: 'select' | 'radio';
  options?: FieldOption[];
}

export type RangeField = BasicField & {
  control: 'range';
  min?: number;
  max?: number;
}

export type RichTextField = BasicField & {
  control: 'rich-text';
  tagName?: keyof HTMLElementTagNameMap;
}

export type FieldType = "string" | "number" | "boolean" | "integer" | "object" | "array"
export type FieldControl = "textarea" | "color" | "text" | "radio" | "select" | "range" | "number" | "checkbox" | "rich-text"
export type FieldLocation = "editor" | "inspector"

export interface ControlProps<T extends Record<string, any>> {
  config: Field;
  props: BlockEditProps<T>;
}
export type Control = React.FC<ControlProps>;

export {};
