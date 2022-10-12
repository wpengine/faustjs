type Obj = { [k: string]: unknown };

export function omit<T extends Obj>(obj: T, keys: string[]): Partial<Obj> {
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => !keys.includes(k)),
  );
}
