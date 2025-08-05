import { isWordPressPreview } from '../../src/utils/isWordPressPreview';

describe('isWordPressPreview', () => {
	it('returns true if the search string contains preview=true', () => {
		expect(isWordPressPreview('?preview=true')).toBe(true);
		expect(isWordPressPreview('?foo=bar&preview=true')).toBe(true);
	});

	it('returns false if the search string does not contain preview=true', () => {
		expect(isWordPressPreview('?preview=false')).toBe(false);
		expect(isWordPressPreview('?foo=bar')).toBe(false);
		expect(isWordPressPreview('?otpreview=true')).toBe(false);
	});

	it('returns false if the search string is empty', () => {
		expect(isWordPressPreview('')).toBe(false);
	});

	it('returns false if the preview parameter is not exactly true', () => {
		expect(isWordPressPreview('?preview=1')).toBe(false);
		expect(isWordPressPreview('?preview=yes')).toBe(false);
	});
});
