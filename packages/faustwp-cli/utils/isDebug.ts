export function isDebug() {
  return process.env.FAUST_DEBUG === '1' || process.env.FAUST_DEBUG === 'true';
}
