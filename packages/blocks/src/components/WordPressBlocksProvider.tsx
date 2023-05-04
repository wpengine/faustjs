import React, { FC } from 'react';
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

export type BlocksContextType = WordPressBlock[] | undefined;
export type ThemeContextType = ThemeJson | undefined;

export const BlocksContext = React.createContext<BlocksContextType>(undefined);
export const ThemeContext = React.createContext<ThemeContextType>(undefined);

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
    <BlocksContext.Provider value={blocks}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </BlocksContext.Provider>
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
export function useBlocksTheme() {
  const themeContext = React.useContext(ThemeContext);

  // If it's an empty object, the provider hasn't been initialized.
  if (themeContext === undefined) {
    throw new Error(
      'useBlocksTheme hook was called outside of context, make sure your app is wrapped with WordPressBlocksProvider',
    );
  }

  return themeContext;
}
