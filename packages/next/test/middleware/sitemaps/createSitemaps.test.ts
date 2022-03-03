import 'isomorphic-fetch';
import { NextRequest } from 'next/server';
import * as createSitemaps from '../../../src/middleware/sitemaps/createSitemaps';
import { HandleSitemapRequestsConfig } from '../../../src/middleware/sitemaps/handleSitemapRequests';
import * as sitemapUtils from '../../../src/middleware/sitemaps/sitemapUtils';

describe('createRootSitemapIndex', () => {
  const invalidSitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="//headless.local/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl"?>
  <!-- XML Sitemap generated by Yoast SEO -->`;

  const validSitemapIndex1RecordXML = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="//headless.local/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>http://headless.local/post-sitemap.xml</loc>
    </sitemap>
  </sitemapindex>
  <!-- XML Sitemap generated by Yoast SEO -->`;

  const validSitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="//headless.local/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>http://headless.local/post-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>http://headless.local/page-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>http://headless.local/category-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>http://headless.local/author-sitemap.xml</loc>
      <lastmod>2021-12-17T16:56:55+00:00</lastmod>
    </sitemap>
  </sitemapindex>
  <!-- XML Sitemap generated by Yoast SEO -->`;

  it('returns undefined when the response to the WP sitemap is not ok', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: false,
        status: 400,
      }) as Promise<Response>;
    });

    const req = {
      url: 'http://localhost:3000/sitemap.xml',
    } as NextRequest;

    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: true,
    };

    const result = await createSitemaps.createRootSitemapIndex(req, config);
    expect(result).toBeUndefined();
  });

  it('returns undefined if the parsed sitemap does not include a sitemapindex of sitemaps', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(invalidSitemapIndexXML),
      }) as Promise<Response>;
    });

    const req = {
      url: 'http://localhost:3000/sitemap.xml',
    } as NextRequest;

    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: false,
    };

    const result = await createSitemaps.createRootSitemapIndex(req, config);
    expect(result).toBeUndefined();
  });

  it('ignores sitemaps that match the sitemapPathsToIgnore property', async () => {
    const createSitemapIndexSpy = jest.spyOn(
      sitemapUtils,
      'createSitemapIndex',
    );
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(validSitemapIndexXML),
      }) as Promise<Response>;
    });

    const req = {
      url: 'http://localhost:3000/sitemap.xml',
    } as NextRequest;

    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      sitemapPathsToIgnore: ['/post-sitemap.xml', '/page-sitemap.xml'],
      replaceUrls: false,
    };

    await createSitemaps.createRootSitemapIndex(req, config);

    const expectedSitemaps = [
      {
        loc: 'http://headless.local/category-sitemap.xml',
      },
      {
        loc: 'http://headless.local/author-sitemap.xml',
        lastmod: '2021-12-17T16:56:55+00:00',
      },
    ];

    expect(createSitemapIndexSpy).toHaveBeenCalledWith(expectedSitemaps);
  });

  it('ignores sitemaps that match a sitemapPathsToIgnore wildcard', async () => {
    const createSitemapIndexSpy = jest.spyOn(
      sitemapUtils,
      'createSitemapIndex',
    );
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(validSitemapIndexXML),
      }) as Promise<Response>;
    });

    const req = {
      url: 'http://localhost:3000/sitemap.xml',
    } as NextRequest;

    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      sitemapPathsToIgnore: [
        '/post-sitemap.xml',
        '/category-sitemap.xml',
        '/author-*',
      ],
      replaceUrls: false,
    };

    await createSitemaps.createRootSitemapIndex(req, config);

    const expectedSitemaps = [
      {
        loc: 'http://headless.local/page-sitemap.xml',
      },
    ];

    expect(createSitemapIndexSpy).toHaveBeenCalledWith(expectedSitemaps);
  });

  it('returns the proper sitemap urls without replacing URLs', async () => {
    const createSitemapIndexSpy = jest.spyOn(
      sitemapUtils,
      'createSitemapIndex',
    );
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(validSitemapIndexXML),
      }) as Promise<Response>;
    });

    const req = {
      url: 'http://localhost:3000/sitemap.xml',
    } as NextRequest;

    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      pages: [
        {
          path: '/about',
        },
      ],
      sitemapPathsToIgnore: ['/author-sitemap.xml'],
      replaceUrls: false,
    };

    await createSitemaps.createRootSitemapIndex(req, config);

    const expectedSitemaps = [
      {
        loc: 'http://localhost:3000/sitemap-faust-pages.xml',
      },
      {
        loc: 'http://headless.local/post-sitemap.xml',
      },
      {
        loc: 'http://headless.local/page-sitemap.xml',
      },
      {
        loc: 'http://headless.local/category-sitemap.xml',
      },
    ];

    expect(createSitemapIndexSpy).toHaveBeenCalledWith(expectedSitemaps);
  });

  it('returns the proper sitemap urls with replacing URLs', async () => {
    const createSitemapIndexSpy = jest.spyOn(
      sitemapUtils,
      'createSitemapIndex',
    );
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(validSitemapIndexXML),
      }) as Promise<Response>;
    });

    const req = {
      url: 'http://localhost:3000/sitemap.xml',
    } as NextRequest;

    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      pages: [
        {
          path: '/about',
        },
      ],
      sitemapPathsToIgnore: ['/author-sitemap.xml'],
      replaceUrls: true,
    };

    await createSitemaps.createRootSitemapIndex(req, config);

    const expectedSitemaps = [
      {
        loc: 'http://localhost:3000/sitemap-faust-pages.xml',
      },
      {
        loc: 'http://localhost:3000/post-sitemap.xml',
      },
      {
        loc: 'http://localhost:3000/page-sitemap.xml',
      },
      {
        loc: 'http://localhost:3000/category-sitemap.xml',
      },
    ];

    expect(createSitemapIndexSpy).toHaveBeenCalledWith(expectedSitemaps);
  });

  /**
   * When there is only 1 record, the parser can return an object if not
   * configured properly. Ensure it returns an array of URLs
   */
  it('returns the proper sitemap urls with only 1 record', async () => {
    const createSitemapIndexSpy = jest.spyOn(
      sitemapUtils,
      'createSitemapIndex',
    );
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(validSitemapIndex1RecordXML),
      }) as Promise<Response>;
    });

    const req = {
      url: 'http://localhost:3000/sitemap.xml',
    } as NextRequest;

    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      sitemapPathsToIgnore: ['/author-sitemap.xml'],
      replaceUrls: true,
    };

    await createSitemaps.createRootSitemapIndex(req, config);

    const expectedSitemaps = [
      {
        loc: 'http://localhost:3000/post-sitemap.xml',
      },
    ];

    expect(createSitemapIndexSpy).toHaveBeenCalledWith(expectedSitemaps);
  });
});

describe('createPagesSitemap()', () => {
  it('returns undefined if no pages are specified in the config', () => {
    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: true,
    };

    let req = {
      url: 'http://localhost:3000/sitemap-faust-pages.xml',
    } as NextRequest;

    const result = createSitemaps.createPagesSitemap(req, config);

    expect(result).toBeUndefined();
  });

  it('calls createSitemap() with the correct pages when specified', () => {
    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      pages: [
        {
          path: '/',
          lastmod: '2020-01-01',
          changefreq: 'daily',
          priority: 1,
        },
        {
          path: '/about',
          lastmod: '2020-01-02',
          changefreq: 'weekly',
          priority: 0.5,
        },
        {
          path: '/contact',
        },
      ],
      replaceUrls: true,
    };

    const expectedUrls = [
      {
        loc: 'http://localhost:3000/',
        lastmod: '2020-01-01',
        changefreq: 'daily',
        priority: 1,
      },
      {
        loc: 'http://localhost:3000/about',
        lastmod: '2020-01-02',
        changefreq: 'weekly',
        priority: 0.5,
      },
      {
        loc: 'http://localhost:3000/contact',
      },
    ];

    const createSitemapSpy = jest.spyOn(sitemapUtils, 'createSitemap');

    let req = {
      url: 'http://localhost:3000/sitemap-faust-pages.xml',
    } as NextRequest;

    createSitemaps.createPagesSitemap(req, config);

    expect(createSitemapSpy).toHaveBeenCalledWith(expectedUrls);
  });
});

describe('handleRobotsTxt', () => {
  it('returns undefined if the robotsTxt config function is not defined', () => {
    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: true,
    };

    let req = {
      url: 'http://localhost:3000/robots.txt',
    } as NextRequest;

    const result = createSitemaps.createPagesSitemap(req, config);

    expect(result).toBeUndefined();
  });

  it('returns the proper robots.txt content specified in the robotsTxt() config function', async () => {
    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/wp-sitemap.xml',
      replaceUrls: true,
      robotsTxt: async (sitemapUrl) => {
        return `
          User-agent: *
          Disallow: /
          Sitemap: ${sitemapUrl}
        `;
      },
    };

    let req = {
      url: 'http://localhost:3000/robots.txt',
    } as NextRequest;

    const result = await createSitemaps.handleRobotsTxt(req, config);
    const text = await result!.text();

    expect(text).toMatchSnapshot();
  });
});

describe('handleSitemapPath()', () => {
  const validSitemapXML = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="//headless.local/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl"?>
  <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
          <loc>http://headless.local/</loc>
      </url>
      <url>
          <loc>http://headless.local/new-page/</loc>
      </url>
      <url>
          <loc>http://headless.local/sample-page/</loc>
      </url>
      <url>
          <loc>http://headless.local/new-draft-test/</loc>
          <lastmod>2021-12-22T14:53:40+00:00</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.5</priority>
      </url>

  </urlset>
  <!-- XML Sitemap generated by Yoast SEO -->`;

  const validSitemap1RecordXML = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="//headless.local/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl"?>
  <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
          <loc>http://headless.local/about</loc>
      </url>
  </urlset>
  <!-- XML Sitemap generated by Yoast SEO -->`;

  const invalidSitemapXML = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="//headless.local/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl"?>
  <!-- XML Sitemap generated by Yoast SEO -->`;

  it('returns undefined when the response to the WP sitemap is not ok', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: false,
        status: 400,
      }) as Promise<Response>;
    });

    const req = {
      url: 'http://localhost:3000/sitemap-posts.xml',
    } as NextRequest;

    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: true,
    };

    const result = await createSitemaps.handleSitemapPath(req, config);
    expect(result).toBeUndefined();
  });

  it('returns undefined if the parsed sitemap does not include a urlset of urls', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(invalidSitemapXML),
      }) as Promise<Response>;
    });

    const req = {
      url: 'http://localhost:3000/sitemap-posts.xml',
    } as NextRequest;

    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: true,
    };

    const result = await createSitemaps.handleSitemapPath(req, config);
    expect(result).toBeUndefined();
  });

  it('returns the proper sitemap urls without replacing URLs', async () => {
    const createSitemapSpy = jest.spyOn(sitemapUtils, 'createSitemap');

    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(validSitemapXML),
      }) as Promise<Response>;
    });

    const req = {
      url: 'http://localhost:3000/sitemap-pages.xml',
    } as NextRequest;

    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: false,
    };

    await createSitemaps.handleSitemapPath(req, config);

    const expectedUrls: sitemapUtils.SitemapSchemaUrlElement[] = [
      {
        loc: 'http://headless.local/',
      },
      {
        loc: 'http://headless.local/new-page/',
      },
      {
        loc: 'http://headless.local/sample-page/',
      },
      {
        loc: 'http://headless.local/new-draft-test/',
        lastmod: '2021-12-22T14:53:40+00:00',
        changefreq: 'weekly',
        priority: 0.5,
      },
    ];

    expect(createSitemapSpy).toHaveBeenCalledWith(expectedUrls);
  });

  it('returns the proper sitemap urls with replacing URLs', async () => {
    const createSitemapSpy = jest.spyOn(sitemapUtils, 'createSitemap');

    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(validSitemapXML),
      }) as Promise<Response>;
    });

    const req = {
      url: 'http://localhost:5000/sitemap-pages.xml',
    } as NextRequest;

    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: true,
    };

    await createSitemaps.handleSitemapPath(req, config);

    const expectedUrls: sitemapUtils.SitemapSchemaUrlElement[] = [
      {
        loc: 'http://localhost:5000/',
      },
      {
        loc: 'http://localhost:5000/new-page/',
      },
      {
        loc: 'http://localhost:5000/sample-page/',
      },
      {
        loc: 'http://localhost:5000/new-draft-test/',
        lastmod: '2021-12-22T14:53:40+00:00',
        changefreq: 'weekly',
        priority: 0.5,
      },
    ];

    expect(createSitemapSpy).toHaveBeenCalledWith(expectedUrls);
  });

  /**
   * When there is only 1 record, the parser can return an object if not
   * configured properly. Ensure it returns an array of URLs
   */
  it('returns the proper sitemap urls with only 1 record', async () => {
    const createSitemapSpy = jest.spyOn(sitemapUtils, 'createSitemap');

    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(validSitemap1RecordXML),
      }) as Promise<Response>;
    });

    const req = {
      url: 'http://localhost:3000/sitemap-pages.xml',
    } as NextRequest;

    const config: HandleSitemapRequestsConfig = {
      wpUrl: 'http://headless.local',
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: true,
    };

    await createSitemaps.handleSitemapPath(req, config);

    const expectedUrls: sitemapUtils.SitemapSchemaUrlElement[] = [
      {
        loc: 'http://localhost:3000/about',
      },
    ];

    expect(createSitemapSpy).toHaveBeenCalledWith(expectedUrls);
  });
});
