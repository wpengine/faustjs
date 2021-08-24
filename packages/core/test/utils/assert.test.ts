import {
  isBase64,
  isPreviewPath,
  isServerSide,
  isValidEmail,
} from '../../src/utils/assert';

describe('utils/assert', () => {
  test('isServerSide() is false when window is present', () => {
    expect(isServerSide()).toBe(typeof window === 'undefined');
  });

  test('isBase64() returns false for invalid base64 strings', () => {
    expect(isBase64(undefined as any)).toBe(false);
    expect(isBase64(null as any)).toBe(false);
    expect(isBase64(1 as any)).toBe(false);
    expect(isBase64({} as any)).toBe(false);
    expect(isBase64([] as any)).toBe(false);
    expect(isBase64('')).toBe(false);
    expect(isBase64('hello-world')).toBe(false);
  });

  test('isBase64() returns true for valid base64 strings', () => {
    expect(isBase64('aGVsbG8td29ybGQ=')).toBe(true);
  });

  test('isPreviewPath() returns false for non-preview strings', () => {
    expect(isPreviewPath(undefined as any)).toBe(false);
    expect(isPreviewPath(null as any)).toBe(false);
    expect(isPreviewPath(1 as any)).toBe(false);
    expect(isPreviewPath({} as any)).toBe(false);
    expect(isPreviewPath([] as any)).toBe(false);
    expect(isPreviewPath('')).toBe(false);
    expect(isPreviewPath('hello-world')).toBe(false);
  });

  test('isPreviewPath() returns true for preview strings', () => {
    expect(isPreviewPath('/posts/preview/hello-world')).toBe(true);
    expect(isPreviewPath('/preview/hello-world')).toBe(true);
  });

  test('isValidEmail returns true for valid emails', () => {
    expect(isValidEmail('name@wpengine.com')).toBe(true);
    expect(isValidEmail('name@gmail.com')).toBe(true);
    expect(isValidEmail('first-last@yahoo.com')).toBe(true);
  });

  test('isValidEmail returns false for invalid emails', () => {
    expect(isValidEmail('name@wpengine')).toBe(false);
    expect(isValidEmail('name@wpengine.2q3rom')).toBe(false);
  });
});
