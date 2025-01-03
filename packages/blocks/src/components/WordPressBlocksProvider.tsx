import React, { FC } from 'react';
import type { DocumentNode } from '@apollo/client';
import { BlocksTheme } from '../types/theme.js';

export type WordPressBlockBase = React.FC & {
  fragments: {
    key: string;
    entry: DocumentNode;
  };
  displayName: string;
  name: string;
  config: {
    name: string;
  };
};

/**
 * WordPressBlock is a React component that contains some optional properties that we are
 * used to match it with equivalent block data from the API
 */
export type WordPressBlock<P = { [key: string]: any }> = FC<P> &
  Partial<
    Pick<WordPressBlockBase, 'config' | 'displayName' | 'name' | 'fragments'>
  >;

export type WordPressBlocksContextType =
  | { [key: string]: WordPressBlock }
  | undefined;
export type WordPressThemeContextType = BlocksTheme | undefined;

export const WordPressBlocksContext =
  React.createContext<WordPressBlocksContextType>(undefined);
export const WordPressThemeContext =
  React.createContext<WordPressThemeContextType>(undefined);

export type WordPressBlocksProviderConfig = {
  blocks: { [key: string]: WordPressBlock };
  theme?: BlocksTheme;
};

/**
 * WordPressBlocksProvider is used as a central store for the available list of WordPressBlock types.
 * @param props
 * @returns
 */
export function WordPressBlocksProvider(props: {
  children: React.ReactNode;
  config: WordPressBlocksProviderConfig;
}) {
  const { children, config } = props;
  const { blocks, theme = {} } = config;

  return (
    <WordPressBlocksContext.Provider value={blocks}>
      <WordPressThemeContext.Provider value={theme}>
        {children}
      </WordPressThemeContext.Provider>
    </WordPressBlocksContext.Provider>
  );
}

/**
 * useBlocksTheme can be used to retrieve the theme
 * from within the WordPressBlocksProvider.
 *
 * @example
 * ```
 * const theme = useBlocksTheme();
 * ```
 */
export function useBlocksTheme(): BlocksTheme {
  const themeContext = React.useContext(WordPressThemeContext);

  // If it's an empty object, the provider hasn't been initialized.
  if (themeContext === undefined) {
    throw new Error(
      'useBlocksTheme hook was called outside of context, make sure your app is wrapped with WordPressBlocksProvider',
    );
  }

  return themeContext;
}
