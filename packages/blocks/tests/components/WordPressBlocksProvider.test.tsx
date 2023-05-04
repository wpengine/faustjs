/**
 * @jest-environment jsdom
 */
import React from 'react';
import { PropsWithChildren } from 'react';
import {
  WordPressBlocksProvider,
  useBlocksTheme,
} from '../../src/components/WordPressBlocksProvider';
import type { ThemeJson } from '../../src/theme';
import { renderHook } from '@testing-library/react-hooks';

describe('useBlocksTheme', () => {
  it('Throws an error if not used within WordPressBlocksProvider', async () => {
    const { result } = renderHook(() => useBlocksTheme());

    expect(result.error?.message).toBe(
      'useBlocksTheme hook was called outside of context, make sure your app is wrapped with WordPressBlocksProvider',
    );
  });

  it('returns the passed in theme from WordPressBlocksProvider', async () => {
    const wrapper = ({ children }: PropsWithChildren<{}>) => {
      const theme: ThemeJson = {
        colors: {
          palette: {
            primary: 'black',
          },
        },
        spacing: {},
      };

      return (
        <WordPressBlocksProvider config={{ blocks: [], theme }}>
          {children}
        </WordPressBlocksProvider>
      );
    };

    const { result } = renderHook(() => useBlocksTheme(), {
      wrapper,
    });

    const theme = result.current;

    expect(result.error).toBeUndefined();
    expect(theme?.colors.palette).toStrictEqual({ primary: 'black' });
  });

  it('uses the path param', async () => {
    const wrapper = ({ children }: PropsWithChildren<{}>) => {
      const theme: ThemeJson = {
        colors: {
          palette: {
            primary: 'black',
          },
        },
        spacing: {},
      };

      return (
        <WordPressBlocksProvider config={{ blocks: [], theme }}>
          {children}
        </WordPressBlocksProvider>
      );
    };

    const { result } = renderHook(() => useBlocksTheme('colors.palette'), {
      wrapper,
    });

    expect(result.error).toBeUndefined();
    expect(result.current).toStrictEqual({ primary: 'black' });
  });
});
