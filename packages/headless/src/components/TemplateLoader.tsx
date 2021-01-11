import React from 'react';
import { useNextUriInfo } from '../api';
import { UriInfo } from '../types';

function resolveTemplate(
  pageInfo: UriInfo | undefined,
): React.FunctionComponent {
  /**
   * List out files in main project using Webpack.
   */
  const context = require.context('theme', false, /.*/);

  if (!pageInfo || !pageInfo.templates) {
    return context(`./index`).default as React.FunctionComponent;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const template of pageInfo.templates) {
    try {
      const importedTemplate = context(`./${template}`);

      if (importedTemplate) {
        return importedTemplate.default as React.FunctionComponent;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.debug('Template not found.', e);
    }
  }

  return context(`./index`).default as React.FunctionComponent;
}

export default function TemplateLoader(): JSX.Element {
  const pageInfo = useNextUriInfo();

  const Component = resolveTemplate(pageInfo);

  return <Component />;
}
