import { ReactClient } from '@gqless/react';
import { GeneratedSchema } from '@wpengine/headless-core';
import React, { PropsWithChildren } from 'react';

export interface HeadlessProviderProps {
  client: ReactClient<GeneratedSchema>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HeadlessContext = React.createContext<{
  client?: ReactClient<GeneratedSchema>;
}>({});

export function HeadlessProvider({
  client,
  children,
}: PropsWithChildren<HeadlessProviderProps>): JSX.Element {
  return (
    <HeadlessContext.Provider value={{ client }}>
      {children}
    </HeadlessContext.Provider>
  );
}
