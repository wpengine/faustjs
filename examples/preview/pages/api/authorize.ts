import { authorizeExpressHandler } from '@wpengine/headless';

export default authorizeExpressHandler({
  baseUrl: process.env.NEXT_PUBLIC_WP_URL as string,
  authorizeEndpoint: process.env.NEXT_PUBLIC_AUTH_ENDPOINT as string,
  secret: process.env.WPE_HEADLESS_SECRET as string,
});
