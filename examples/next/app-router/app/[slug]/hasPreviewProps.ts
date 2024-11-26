export async function hasPreviewProps(props: any) {
  const { searchParams } = await props;
  const { preview, p } = await searchParams;

  return preview === 'true' && !!p;
}
