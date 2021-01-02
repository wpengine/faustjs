import dynamic, { LoaderComponent } from 'next/dynamic';
import React from 'react';
import { useNextUriInfo } from '../api';

export default function TemplateLoader() {
  const pageInfo = useNextUriInfo();

  const Component = dynamic(async () => {
    if (!pageInfo || !pageInfo.templates) {
      return import(`./theme/index`);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const template of pageInfo.templates) {
      /**
       * @todo make this relative to project root
       */
      try {
        // eslint-disable-next-line no-await-in-loop
        const importedTemplate: LoaderComponent = await import(
          `./theme/${template}`
        );

        // eslint-disable-next-line no-await-in-loop
        if (await importedTemplate) {
          return importedTemplate;
        }
      } catch (e) {
        console.debug('Template not found.', e);
      }
    }

    return import(`./theme/index`);
  });

  return <Component />;
}
