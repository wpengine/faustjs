import React, { ReactNode } from 'react';
// eslint-disable-next-line import/extensions
import Head from 'next/head';
import { hooks } from '../hooks/index.js';

export function WPHead() {
  let elements: ReactNode[] = [];
  elements = hooks.applyFilters('wphead', elements, {}) as ReactNode[];

  return (
    <Head>
      {elements.map((element) => {
        return element;
      })}
    </Head>
  );
}
