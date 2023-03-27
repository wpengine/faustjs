import flatListToHierarchical from '../../src/utils/flatListToHierarchical';

const items = [
    { "Id": "1", "Name": "abc", "Parent": "2" },
    { "Id": "2", "Name": "abc", "Parent": "" },
    { "Id": "3", "Name": "abc", "Parent": "5" },
    { "Id": "4", "Name": "abc", "Parent": "2" },
    { "Id": "5", "Name": "abc", "Parent": "" },
    { "Id": "6", "Name": "abc", "Parent": "2" },
    { "Id": "7", "Name": "abc", "Parent": "6" },
    { "Id": "8", "Name": "abc", "Parent": "6" }
];

describe('utils/flatListToHierarchical', () => {
  test('base64Decode() returns the argument for a non-base64 string', () => {
    //@ts-ignore
    expect(base64Decode()).toBeUndefined();
    expect(base64Decode('test123')).toBe('test123');
  });

  test('base64Decode() returns a decoded base64 string', () => {
    expect(base64Decode('aGVsbG8td29ybGQ=')).toBe('hello-world');
  });

  test('base64Encode() returns an empty string for non-strings', () => {
    //@ts-ignore
    expect(base64Encode()).toBe('');
    //@ts-ignore
    expect(base64Encode(2)).toBe('');
    //@ts-ignore
    expect(base64Encode({})).toBe('');
  });
});
