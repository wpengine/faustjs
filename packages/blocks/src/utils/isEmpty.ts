export const isEmpty = (value: any) => {
  return (
    value == null ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};
