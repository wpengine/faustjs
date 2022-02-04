import * as React from 'react';
import { FaustContext } from "../client";

export function useFaustContext () {
  const context = React.useContext(FaustContext);
  let client = context?.client;
  if (client === undefined) {
    throw new Error('Could not find "client" in the context.' +
                    'Wrap the root component in an <FaustProvider>');
  }

  return context;
}
