import { DocumentNode } from '@apollo/client';
// eslint-disable-next-line import/extensions
import { print } from '@apollo/client/utilities';
import { sha256 } from 'js-sha256';
import { useContext } from 'react';
import { FaustContext } from '../store/FaustContext.js';

export function useFaustQuery<TData>(query: DocumentNode): TData {
  const context = useContext(FaustContext);

  if (context === undefined) {
    throw new Error('useFaustQuery must be used within a FaustProvider');
  }

  const sha = sha256(print(query));

  // eslint-disable-next-line no-underscore-dangle
  return context?.queries?.[sha] as TData;
}
