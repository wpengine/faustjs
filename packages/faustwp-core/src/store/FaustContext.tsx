import { createContext } from 'react';

export type FaustQueries = { [key: string]: any };

export const FaustContext = createContext<
  | {
      queries?: FaustQueries | null;
      setQueries: (newQueries: FaustQueries) => void;
    }
  | undefined
>(undefined);
