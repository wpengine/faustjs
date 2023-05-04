import React, { FC } from 'react';
import get from 'lodash/get.js';
import { ThemeJson } from '../theme.js';

export type WordPressBlockBase = React.FC & {
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
export type WordPressBlock<P = Record<string, any>> = FC<P> &
  Partial<Pick<WordPressBlockBase, 'config' | 'displayName' | 'name'>>;

export type WordPressBlocksContextType = WordPressBlock[] | undefined;
export type WordPressThemeContextType = ThemeJson | undefined;

export const WordPressBlocksContext =
  React.createContext<WordPressBlocksContextType>(undefined);
export const WordPressThemeContext =
  React.createContext<WordPressThemeContextType>(undefined);

export type WordPressBlocksProviderConfig = {
  blocks: WordPressBlock[];
  theme?: ThemeJson;
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
  const { blocks, theme } = config;

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
export function useBlocksTheme(): ThemeJson;
export function useBlocksTheme(path: string): unknown;
export function useBlocksTheme(path?: string): ThemeJson | unknown {
  const themeContext = React.useContext(WordPressThemeContext);

  // If it's an empty object, the provider hasn't been initialized.
  if (themeContext === undefined) {
    throw new Error(
      'useBlocksTheme hook was called outside of context, make sure your app is wrapped with WordPressBlocksProvider',
    );
  }

  if (path) {
    return get(themeContext, path, undefined);
  }

  return themeContext;
}
