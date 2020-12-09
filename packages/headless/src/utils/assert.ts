export function isServerSide() {
  return typeof window === 'undefined';
}

export function isBase64(str: string) {
  if (!str) {
    return false;
  }

  return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?\n?$/.test(
    str.replace(/\n/g, ''),
  );
}
