import React, { ReactNode } from 'react';
// eslint-disable-next-line import/extensions
import Head from 'next/head';
import { hooks } from '../hooks/index.js';
import { useFaustContext } from './FaustProvider.js';

export function WPHead() {
  const faustContext = useFaustContext();

  let elements: ReactNode[] = [];
  elements = hooks.applyFilters('wphead', elements, {
    // eslint-disable-next-line no-underscore-dangle
    seedNode: faustContext?.__SEED_NODE__,
  }) as ReactNode[];

  return (
    <Head>
      {elements.map((element) => {
        return element;
      })}
    </Head>
  );
}
