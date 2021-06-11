import {
  mockedServerSidePropsContext,
  mockedStaticPropsContext,
} from '../jest.setup';
import { isServerSidePropsContext, isStaticPropsContext } from '../src/utils';

describe('isServerSidePropsContext util', () => {
  test('isServerSidePropsContext should return true with server side props context', () => {
    expect(isServerSidePropsContext(mockedServerSidePropsContext)).toBe(true);
  });

  test('isServerSidePropsContext should return false with static props context', () => {
    expect(isServerSidePropsContext(mockedStaticPropsContext)).toBe(false);
  });
});

describe('isStaticPropsContext util', () => {
  test('isStaticPropsContext should return true with static props context', () => {
    expect(isStaticPropsContext(mockedStaticPropsContext)).toBe(true);
  });

  test('isStaticPropsContext should return false with server side props context', () => {
    expect(isStaticPropsContext(mockedServerSidePropsContext)).toBe(false);
  });
});
