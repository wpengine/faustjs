import React from 'react';

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
