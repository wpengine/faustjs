import 'faust.config';
import { handleSitemapRequests } from '@faustjs/next';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const isSitemapRequest = await handleSitemapRequests(req, {
    sitemapIndexPath: '/sitemap_index.xml',
    sitemapPathsToIgnore: ['/author-*'],
    replaceUrls: true,
  });

  if (isSitemapRequest) {
    return isSitemapRequest;
  }

  return NextResponse.next();
}
