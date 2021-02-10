/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  [prop: string]: any;
};

interface PreviewData {
  serverInfo: {
    host: string;
    protocol: 'http:' | 'https:';
    cookies: string | undefined;
  };
}
