import { createContext } from 'react';
import { FaustPageProps } from '../components/FaustProvider.js';

export const FaustContext = createContext<
  | {
      queries: {
        [key: string]: any;
      };
      setContext: (newContext: any) => void;
    }
  | undefined
>(undefined);
