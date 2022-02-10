import React from 'react';
import { FaustContextType } from '../client.js';

export function useCheckFaustContext<T extends FaustContextType>(
  reactContext: React.Context<T>,
) {
  const context = React.useContext(reactContext);
  const client = context?.client;

  if (client === undefined) {
    throw new Error(
      `Could not find "client" in the context. Wrap the root component in a <FaustProvider>. See: https://faustjs.org/docs/next/reference/faust-provider`,
    );
  }

  return context;
}
