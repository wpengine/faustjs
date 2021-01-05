/**
 * Must be called from getStaticPaths within a Next app in order to support SSG.
 *
 * This function currently returns only the root path to be built during build-time. Any other pages will be built using
 * incremental static regeneration (ISR) thanks to the fallback props.
 */
export function initializeNextStaticPaths() {
  return {
    paths: ['/'],
    fallback: true,
  };
}
