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

export const WordPressBlocksContext =
  React.createContext<WordPressBlocksContextType>({});

export interface WordPressBlocksContextType {
  blocks?: WordPressBlock[];
  theme?: ThemeJson;
}

/**
 * WordPressBlocksProvider is used as a central store for the available list of WordPressBlock types.
 * @param props
 * @returns
 */
export function WordPressBlocksProvider(props: {
  children: React.ReactNode;
  config: WordPressBlocksContextType;
}) {
  const { children, config } = props;

  return (
    <WordPressBlocksContext.Provider value={config}>
      {children}
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
export function useBlocksTheme() {
  const context = React.useContext(WordPressBlocksContext);

  if (context === undefined) {
    throw new Error(
      'useBlocksTheme() must be used within a WordPressBlocksProvider',
    );
  }

  return context.theme;
}
