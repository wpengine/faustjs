export function isVerbose(): boolean {
  const isVerboseEnvVar = process.env.FAUST_VERBOSE;

  if (isVerboseEnvVar === 'true') {
    return true;
  }

  if (isVerboseEnvVar === '1') {
    return true;
  }

  return false;
}
