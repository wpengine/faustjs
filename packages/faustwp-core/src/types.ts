export interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: Array<string | number>;
  extensions?: Record<string, any>;
}

export interface GraphQLResponse<TData = any> {
  data?: TData;
  errors?: GraphQLError[];
  extensions?: Record<string, any>;
}
