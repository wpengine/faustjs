export function isDebug(): boolean {
  const isDebugEnvVar = process.env.FAUST_DEBUG;

  if (isDebugEnvVar === 'true' || isDebugEnvVar === '1') {
    return true;
  }

  return false;
}
