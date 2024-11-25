/**
 * @jest-environment jsdom
 */
import React from 'react';
import { PropsWithChildren } from 'react';
import {
  WordPressBlocksProvider,
  useBlocksTheme,
} from '../../src/components/WordPressBlocksProvider';
import type { BlocksTheme } from '../../src/types/theme';
import { renderHook } from '@testing-library/react';  // Import from @testing-library/react

describe('useBlocksTheme', () => {
  it('Throws an error if not used within WordPressBlocksProvider', () => {
    // Assert that renderHook throws an error when used outside of WordPressBlocksProvider
    expect(() => {
      renderHook(() => useBlocksTheme());
    }).toThrow('useBlocksTheme hook was called outside of context, make sure your app is wrapped with WordPressBlocksProvider');
  });

  it('returns the passed in theme from WordPressBlocksProvider', () => {
    // Wrapping component to provide context
    const wrapper = ({ children }: PropsWithChildren<{}>) => {
      const theme: BlocksTheme = {
        colors: {
          palette: {
            primary: 'black',
          },
        },
        spacing: {},
      };

      return (
        <WordPressBlocksProvider config={{ blocks: {}, theme }}>
          {children}
        </WordPressBlocksProvider>
      );
    };

    // Rendering the hook with the wrapper
    const { result } = renderHook(() => useBlocksTheme(), {
      wrapper,
    });

    const theme = result.current;
    // Check the correct theme is returned
    expect(theme?.colors?.palette).toStrictEqual({ primary: 'black' });
  });
});