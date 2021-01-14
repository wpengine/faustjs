import { UriInfo } from '../types';
import type { Template } from '../components/TemplateLoader';

export function resolveTemplate(
  pageInfo: UriInfo | undefined,
): null | Template {
  /**
   * List out files in main project using Webpack.
   */
  let context;

  try {
    context = require.context('theme', false, /.*/);
  } catch (e) {
    console.warn(
      '"theme" directory not detected in Next.js project. Please add it to take advantage of <TemplateLoader />.',
    );
    return null;
  }

  if (!pageInfo || !pageInfo.templates) {
    return context(`./index`) as Template;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const template of pageInfo.templates) {
    try {
      const importedTemplate = context(`./${template}`);

      if (importedTemplate) {
        return importedTemplate as Template;
      }
    } catch (e) {
      // noop - swallow any module resolution errors as we're merely _trying_ templates.
    }
  }

  return context(`./index`) as Template;
}
