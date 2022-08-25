import 'isomorphic-fetch';
import { NextRequest } from 'next/server';
import * as createSitemaps from '../../../src/middleware/sitemaps/createSitemaps';
import * as handleSitemapRequests from '../../../src/middleware/sitemaps/handleSitemapRequests';

describe('validateConfig', () => {
  it('throws an error if wpUrl is missing', () => {
    const config = {};

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'wpUrl is required',
    );
  });

  it('throws an error if wpUrl is not a string', () => {
    const config: any = { wpUrl: {} };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'wpUrl must be a string',
    );
  });

  it('throws an error if wpUrl is not a valid url', () => {
    const config: any = { wpUrl: 'testing' };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'wpUrl must be a valid URL.',
    );
  });

  it('throws an error if frontendUrl is missing', () => {
    const config = {
      wpUrl: 'http://headless.local',
    };

    expect(() => handleSitemapRequests.validateConfig(config, false)).toThrow(
      'frontendUrl is required',
    );
  });

  it('throws an error if frontendUrl is not a string', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      frontendUrl: {},
    };

    expect(() => handleSitemapRequests.validateConfig(config, false)).toThrow(
      'frontendUrl must be a string',
    );
  });

  it('throws an error if frontendUrl is not a valid url', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      frontendUrl: 'testing',
    };

    expect(() => handleSitemapRequests.validateConfig(config, false)).toThrow(
      'frontendUrl must be a valid URL.',
    );
  });

  it('throws an error if sitemapIndexPath is missing', () => {
    const config = {
      wpUrl: 'http://headless.local',
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'sitemapIndexPath is required',
    );
  });

  it('throws an error if sitemapIndexPath is not a string', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: {},
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'sitemapIndexPath must be a string',
    );
  });

  it('throws an error if sitemapIndexPath does not start with a forward slash', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: 'sitemap.xml',
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'sitemapIndexPath must start with a forward slash',
    );
  });

  it('throws an error if sitemapPathsToIgnore is not an array', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      sitemapPathsToIgnore: {},
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'sitemapPathsToIgnore must be an array',
    );
  });

  it('throws an error if sitemapPathsToIgnore is not an array of strings', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      sitemapPathsToIgnore: [{}],
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'sitemapPathsToIgnore must be an array of strings',
    );
  });

  it('throws an error if sitemapPathsToIgnore contains a path that does not start with a forward slash', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      sitemapPathsToIgnore: ['author-sitemap.xml'],
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'Each sitemapPathsToIgnore must start with a forward slash',
    );
  });

  it('throws an error if sitemapPathsToIgnore contains a path that contains a wildcard and does not end with a wildcard', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      sitemapPathsToIgnore: ['/author-*sitemap.xml'],
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'sitemapPathsToIgnore with a wildcard must end with a wildcard',
    );
  });

  it('throws an error if pages is not an array', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      pages: {},
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'pages must be an array',
    );
  });

  it('throws an error if pages is not an array of objects', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      pages: ['some-string'],
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'pages must be an array of objects',
    );
  });

  it('throws an error if pages contains an object with no path', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      pages: [{}],
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'pages must have a path property',
    );
  });

  it('throws an error if pages contains an object path that is not a string', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      pages: [{ path: {} }],
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'The pages path property must be a string',
    );
  });

  it('throws an error if replaceUrls is not a boolean', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: 'some-string',
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'replaceUrls must be a boolean',
    );
  });

  it('throws an error if robotsTxt is not a function', () => {
    const config: any = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      robotsTxt: 'some-string',
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'robotsTxt must be a function',
    );
  });
});

describe('handleSitemapRequests', () => {
  it('properly routes to the sitemap index', async () => {
    const createRootSitemapIndexSpy = jest
      .spyOn(createSitemaps, 'createRootSitemapIndex')
      .mockImplementation();

    let res = {
      url: 'http://localhost:3000/non-sitemap-route',
    } as NextRequest;

    const config: handleSitemapRequests.NormalizedMiddlewareConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: true,
    };

    await handleSitemapRequests.handleSitemapRequests(res, config);

    expect(createRootSitemapIndexSpy).not.toHaveBeenCalled();

    res = {
      url: 'http://localhost:3000/sitemap.xml',
    } as NextRequest;

    await handleSitemapRequests.handleSitemapRequests(res, config);

    expect(createRootSitemapIndexSpy).toHaveBeenCalledWith(res, config);
  });

  it('properly routes to the Faust pages sitemap', async () => {
    const createPagesSitemapSpy = jest
      .spyOn(createSitemaps, 'createPagesSitemap')
      .mockImplementation();

    let res = {
      url: 'http://localhost:3000/non-sitemap-route',
    } as NextRequest;

    const config: handleSitemapRequests.NormalizedMiddlewareConfig = {
      wpUrl: 'http://headless.local',
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

  it('does not create /robots.txt route when robotsTxt is not defined', async () => {
    const handleRobotsTxtSpy = jest
      .spyOn(createSitemaps, 'handleRobotsTxt')
      .mockImplementation();

    const res = {
      url: 'http://localhost:3000/robots.txt',
    } as NextRequest;

    const config: handleSitemapRequests.NormalizedMiddlewareConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: true,
    };

    await handleSitemapRequests.handleSitemapRequests(res, config);

    expect(handleRobotsTxtSpy).not.toHaveBeenCalled();
  });

  it('properly routes to the /robots.txt route when robotsTxt is specified', async () => {
    const handleRobotsTxtSpy = jest
      .spyOn(createSitemaps, 'handleRobotsTxt')
      .mockImplementation();

    let res = {
      url: 'http://localhost:3000/non-sitemap-route',
    } as NextRequest;

    const config: handleSitemapRequests.NormalizedMiddlewareConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: true,
      robotsTxt: async (sitemapUrl) => {
        return `
          User-agent: *
          Disallow: /
          Sitemap: ${sitemapUrl}
        `;
      },
    };

    await handleSitemapRequests.handleSitemapRequests(res, config);

    expect(handleRobotsTxtSpy).not.toHaveBeenCalled();

    res = {
      url: 'http://localhost:3000/robots.txt',
    } as NextRequest;

    await handleSitemapRequests.handleSitemapRequests(res, config);

    expect(handleRobotsTxtSpy).toHaveBeenCalledWith(res, config);
  });

  it('properly routes to a sitemap page', async () => {
    const handleSitemapPathSpy = jest
      .spyOn(createSitemaps, 'handleSitemapPath')
      .mockImplementation();

    let res = {
      url: 'http://localhost:3000/non-sitemap-route',
    } as NextRequest;

    const config: handleSitemapRequests.NormalizedMiddlewareConfig = {
      wpUrl: 'http://headless.local',
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

    const config: handleSitemapRequests.NormalizedMiddlewareConfig = {
      wpUrl: 'http://headless.local',
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
