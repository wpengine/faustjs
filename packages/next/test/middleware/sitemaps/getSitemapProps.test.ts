import 'isomorphic-fetch';
import { NextRequest } from 'next/server';
import * as createSitemaps from '../../../src/middleware/sitemaps/createSitemaps';
import * as getSitemapProps from '../../../src/server/getSitemapProps';
import * as handleSitemapRequests from '../../../src/middleware/sitemaps/handleSitemapRequests';
import { GetServerSidePropsContext } from 'next';

describe('getSitemapProps', () => {
  it('properly routes to the sitemap root index', async () => {
    const createRootSitemapIndexSpy = jest
      .spyOn(createSitemaps, 'createRootSitemapIndex')
      .mockImplementation();

    let res = {
      url: 'http://localhost:3000/sitemap.xml',
    } as any as NextRequest;

    let context = { res } as any as GetServerSidePropsContext;

    const config: handleSitemapRequests.NormalizedConfig = {
      wpUrl: 'http://headless.local',
      frontendUrl: 'http://localhost:3000',
      sitemapIndexPath: '/wp-sitemap.xml',
      replaceUrls: true,
    };

    getSitemapProps.getSitemapProps(context, config);

    expect(createRootSitemapIndexSpy).not.toHaveBeenCalled();

    res = {
      url: 'http://localhost:3000/sitemap.xml',
    } as NextRequest;

    context = { res } as any as GetServerSidePropsContext;

    await handleSitemapRequests.handleSitemapRequests(res, config);

    expect(createRootSitemapIndexSpy).toHaveBeenCalledWith(res, config);
    expect(createRootSitemapIndexSpy).toHaveBeenCalledTimes(2);
  });

  it('properly routes to the Faust pages sitemap', async () => {
    const createPagesSitemapSpy = jest
      .spyOn(createSitemaps, 'createPagesSitemap')
      .mockImplementation();

    let res = {
      url: 'http://localhost:3000/non-sitemap-route',
    } as NextRequest;

    const config: handleSitemapRequests.NormalizedConfig = {
      wpUrl: 'http://headless.local',
      frontendUrl: 'http://localhost:3000',
      sitemapIndexPath: '/sitemap.xml',
      pages: [
        {
          path: '/about',
        },
      ],
      replaceUrls: true,
    };

    await handleSitemapRequests.handleSitemapRequests(res, config);

    expect(createPagesSitemapSpy).not.toHaveBeenCalled();

    res = {
      url: 'http://localhost:3000/sitemap-faust-pages.xml',
    } as NextRequest;

    await handleSitemapRequests.handleSitemapRequests(res, config);

    expect(createPagesSitemapSpy).toHaveBeenCalledWith(res, config);
  });

  it('properly routes to a sitemap page', async () => {
    const handleSitemapPathSpy = jest
      .spyOn(createSitemaps, 'handleSitemapPath')
      .mockImplementation();

    let res = {
      url: 'http://localhost:3000/non-sitemap-route',
    } as NextRequest;

    const config: handleSitemapRequests.NormalizedConfig = {
      wpUrl: 'http://headless.local',
      frontendUrl: 'http://localhost:3000',
      sitemapIndexPath: '/sitemap.xml',
      pages: [
        {
          path: '/about',
        },
      ],
      replaceUrls: true,
    };

    await handleSitemapRequests.handleSitemapRequests(res, config);

    expect(handleSitemapPathSpy).not.toHaveBeenCalled();

    res = {
      url: 'http://localhost:3000/a-valid-sitemap-route.xml',
    } as NextRequest;

    await handleSitemapRequests.handleSitemapRequests(res, config);

    expect(handleSitemapPathSpy).toHaveBeenCalledWith(res, config);
  });

  it('does not return a response if the path is not a sitemap route', async () => {
    jest.restoreAllMocks();

    const createRootSitemapIndexSpy = jest.spyOn(
      createSitemaps,
      'createRootSitemapIndex',
    );
    const createPagesSitemapSpy = jest.spyOn(
      createSitemaps,
      'createPagesSitemap',
    );
    const handleSitemapPathSpy = jest.spyOn(
      createSitemaps,
      'handleSitemapPath',
    );

    const config: handleSitemapRequests.NormalizedConfig = {
      wpUrl: 'http://headless.local',
      frontendUrl: 'http://localhost:3000',
      sitemapIndexPath: '/sitemap.xml',
      pages: [
        {
          path: '/about',
        },
      ],
      replaceUrls: true,
    };

    // paths with "sitemap" should not be handled
    const res = {
      url: 'http://localhost:3000/my-sitemap',
    } as NextRequest;

    await handleSitemapRequests.handleSitemapRequests(res, config);
    expect(createRootSitemapIndexSpy).not.toHaveBeenCalled();
    expect(createPagesSitemapSpy).not.toHaveBeenCalled();
    expect(handleSitemapPathSpy).not.toHaveBeenCalled();

    // Regular XML files should not be handled
    (res as any).url = 'http://localhost:3000/an-xml-file.xml';
    await handleSitemapRequests.handleSitemapRequests(res, config);
    expect(createRootSitemapIndexSpy).not.toHaveBeenCalled();
    expect(createPagesSitemapSpy).not.toHaveBeenCalled();
    expect(handleSitemapPathSpy).not.toHaveBeenCalled();

    // path must end in .xml
    (res as any).url = 'http://localhost:3000/my-sitemap.xml.txt';
    await handleSitemapRequests.handleSitemapRequests(res, config);
    expect(createRootSitemapIndexSpy).not.toHaveBeenCalled();
    expect(createPagesSitemapSpy).not.toHaveBeenCalled();
    expect(handleSitemapPathSpy).not.toHaveBeenCalled();
  });
});
