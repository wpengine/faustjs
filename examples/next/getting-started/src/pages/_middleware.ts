import { handleSitemapRequests } from '@faustjs/next/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const isSitemapRequest = await handleSitemapRequests(req, {
    wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
    sitemapIndexPath: '/wp-sitemap.xml',
    sitemapPathsToIgnore: ['/wp-sitemap-users-*'],
    replaceUrls: true,
  });

  if (isSitemapRequest) {
    return isSitemapRequest;
  }

  return NextResponse.next();
}
