import React from 'react';

/**
 * WordPressBlock is a React component that contains some optional properties that we are
 * used to match it with equivalent block data from the API
 */
export type WordPressBlock = React.FC & {
  displayName?: string;
  name?: string;
  config?: {
    name: string;
  };
};
export const WordPressBlocksContext =
  React.createContext<WordPressBlocksContextType>({});

export interface WordPressBlocksContextType {
  blocks?: WordPressBlock[];
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
