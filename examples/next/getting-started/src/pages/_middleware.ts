import 'faust.config';
import { proxySitemapRequests } from '@faustjs/next';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const response = await proxySitemapRequests(req, {
    sitemapIndexPaths: [
      '/wp-sitemap-posts-post-1.xml',
      '/wp-sitemap-posts-page-1.xml',
    ],
    pages: [
      {
        loc: '/about',
        lastmod: new Date().toISOString(),
      },
    ],
  });

  if (response) {
    return response;
  }

  return NextResponse.next();
}
