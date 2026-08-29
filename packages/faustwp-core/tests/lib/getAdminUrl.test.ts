import { createHooks } from '@wordpress/hooks';
import { hooks } from '../../src/wpHooks/index';
import { getAdminUrl } from '../../src/lib/getAdminUrl';
import { getWpUrl } from '../../src/lib/getWpUrl';

jest.mock('@wordpress/hooks', () => ({
  createHooks: jest.fn().mockReturnValue({
    applyFilters: jest.fn(),
  }),
}));

jest.mock('../../src/lib/getWpUrl', () => ({
  getWpUrl: jest.fn().mockReturnValue('http://example.com/wp-admin'),
}));

describe('getAdminUrl', () => {
  beforeEach(() => {
    hooks.actions = Object.create( null );
    hooks.filters = Object.create( null );
    (createHooks().applyFilters as jest.Mock).mockClear();
    (getWpUrl as jest.Mock).mockClear();
  });

  it('returns the admin URL without path when no path is provided', () => {
    const mockUrl = 'http://example.com/wp-admin';
    (createHooks().applyFilters as jest.Mock).mockReturnValue(mockUrl);

    const result = getAdminUrl();
    expect(result).toBe(mockUrl);
    expect(createHooks().applyFilters).toHaveBeenCalledWith(
      'wpAdminUrl',
      mockUrl,
      {},
    );
  });

  it('returns the admin URL with path when path is provided', () => {
    const mockUrl = 'http://example.com/wp-admin';
    const path = 'test-path';
    (createHooks().applyFilters as jest.Mock).mockReturnValue(mockUrl);

    const result = getAdminUrl(path);
    expect(result).toBe(`${mockUrl}/${path}`);
    expect(createHooks().applyFilters).toHaveBeenCalledWith(
      'wpAdminUrl',
      mockUrl,
      {},
    );
  });
});
