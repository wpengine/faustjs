import { GetStaticPathsResult } from 'next';
import { getNextStaticPaths } from '../src/getStaticPaths';

describe('getNextStaticPaths', () => {
  test('getNextStaticPaths default paths should be empty', () => {
    expect(getNextStaticPaths().paths).toStrictEqual([]);
  });

  test('getNextStaticPaths default fallback should be blocking', () => {
    expect(getNextStaticPaths().fallback).toStrictEqual('blocking');
  });

  test('getNextStaticPaths should be overridable', () => {
    const expected: GetStaticPathsResult = {
      paths: [{ params: { post: 'hello-world' } }],
      fallback: false,
    };

    expect(
      getNextStaticPaths({
        paths: [{ params: { post: 'hello-world' } }],
        fallback: false,
      }),
    ).toStrictEqual(expected);
  });
});
