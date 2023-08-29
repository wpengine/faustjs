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

export {};
