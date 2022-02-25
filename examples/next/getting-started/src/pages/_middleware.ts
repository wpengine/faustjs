import 'faust.config';
import { handleSitemapRequests } from '@faustjs/next';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const response = await handleSitemapRequests(req, {
    sitemapPathsToProxy: [
      '/wp-sitemap-posts-post-1.xml',
      '/wp-sitemap-posts-page-1.xml',
    ],
    pages: [
      {
        path: '/about',
        lastmod: new Date().toISOString(),
      },
    ],
  });

  if (response) {
    return response;
  }

  return NextResponse.next();
}
