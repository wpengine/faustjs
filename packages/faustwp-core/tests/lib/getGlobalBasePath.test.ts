import { getGlobalBasePath } from '../../src/lib/getGlobalBasePath';
import { FaustConfig, setConfig } from '../../src/config';

describe('getGlobalBasePath()', () => {
  it("returns the application's basePath when defined in faust.config.js", async () => {
    const mockBasePath = '/blog';
    setConfig({ basePath: mockBasePath });
    expect(getGlobalBasePath()).toEqual(mockBasePath);
  });
  it('returns an empty string when basePath is not defined in faust.config.js', async () => {
    setConfig({});
    expect(getGlobalBasePath()).toEqual('');
  });
});
