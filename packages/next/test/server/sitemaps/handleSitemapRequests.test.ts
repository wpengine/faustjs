import * as handleSitemapRequests from '../../../src/server/sitemaps/handleSitemapRequests';

describe('validateConfig', () => {
  it('throws an error if sitemapIndexPath is missing', () => {
    const config = {};

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'sitemapIndexPath is required',
    );
  });

  it('throws an error if sitemapIndexPath is not a string', () => {
    const config: any = {
      sitemapIndexPath: {},
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'sitemapIndexPath must be a string',
    );
  });

  it('throws an error if sitemapIndexPath does not start with a forward slash', () => {
    const config: any = {
      sitemapIndexPath: 'sitemap.xml',
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'sitemapIndexPath must start with a forward slash',
    );
  });

  it('throws an error if sitemapPathsToIgnore is not an array', () => {
    const config: any = {
      sitemapIndexPath: '/sitemap.xml',
      sitemapPathsToIgnore: {},
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'sitemapPathsToIgnore must be an array',
    );
  });

  it('throws an error if sitemapPathsToIgnore is not an array of strings', () => {
    const config: any = {
      sitemapIndexPath: '/sitemap.xml',
      sitemapPathsToIgnore: [{}],
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'sitemapPathsToIgnore must be an array of strings',
    );
  });

  it('throws an error if sitemapPathsToIgnore contains a path that does not start with a forward slash', () => {
    const config: any = {
      sitemapIndexPath: '/sitemap.xml',
      sitemapPathsToIgnore: ['author-sitemap.xml'],
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'Each sitemapPathsToIgnore must start with a forward slash',
    );
  });

  it('throws an error if sitemapPathsToIgnore contains a path that contains a wildcard and does not end with a wildcard', () => {
    const config: any = {
      sitemapIndexPath: '/sitemap.xml',
      sitemapPathsToIgnore: ['/author-*sitemap.xml'],
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'sitemapPathsToIgnore with a wildcard must end with a wildcard',
    );
  });

  it('throws an error if pages is not an array', () => {
    const config: any = {
      sitemapIndexPath: '/sitemap.xml',
      pages: {},
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'pages must be an array',
    );
  });

  it('throws an error if pages is not an array of objects', () => {
    const config: any = {
      sitemapIndexPath: '/sitemap.xml',
      pages: ['some-string'],
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'pages must be an array of objects',
    );
  });

  it('throws an error if pages contains an object with no path', () => {
    const config: any = {
      sitemapIndexPath: '/sitemap.xml',
      pages: [{}],
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'pages must have a path property',
    );
  });

  it('throws an error if pages contains an object path that is not a string', () => {
    const config: any = {
      sitemapIndexPath: '/sitemap.xml',
      pages: [{ path: {} }],
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'The pages path property must be a string',
    );
  });

  it('throws an error if replaceUrls is not a boolean', () => {
    const config: any = {
      sitemapIndexPath: '/sitemap.xml',
      replaceUrls: 'some-string',
    };

    expect(() => handleSitemapRequests.validateConfig(config)).toThrow(
      'replaceUrls must be a boolean',
    );
  });
});
