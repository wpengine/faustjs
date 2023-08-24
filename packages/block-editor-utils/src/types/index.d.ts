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
}

export type Field = {
  name: string;
  type: FieldType;
  control: FieldControl;
  location: FieldLocation;
  label?: string;
  default?: unknown;
}

type FieldType = "string" | "number" | "boolean" | "integer" | "object"
type FieldControl = "textarea" | "color" | "text" | "radio" | "select" | "range" | "number" | "checkbox"
type FieldLocation = "editor" | "inspector"

export interface ControlProps<T extends Record<string, any>> {
  config: Field;
  props: BlockEditProps<T>;
}
export type Control = React.FC<ControlProps>

export {};
