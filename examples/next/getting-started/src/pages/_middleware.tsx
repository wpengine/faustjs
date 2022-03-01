import 'faust.config';
import { handleSitemapRequests } from '@faustjs/next';
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const isSitemapRequest = handleSitemapRequests(req, {
    sitemapIndexPath: '/sitemap_index.xml',
    sitemapPathsToIgnore: ['/author-*'],
    replaceUrls: true,
  });

  if (isSitemapRequest) {
    return isSitemapRequest;
  }

  return NextResponse.next();
}
