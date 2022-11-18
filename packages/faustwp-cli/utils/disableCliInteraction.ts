export const disableCliInteraction = () => {
  if (
    process.env.FAUST_NO_INTERACTION &&
    process.env.FAUST_NO_INTERACTION !== '0' &&
    process.env.FAUST_NO_INTERACTION?.toLowerCase() !== 'false'
  ) {
    return true;
  }

  return false;
}
