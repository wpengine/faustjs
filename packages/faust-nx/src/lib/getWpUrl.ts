export function getWpUrl(): string {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return process.env.NEXT_PUBLIC_WORDPRESS_URL!;
}
