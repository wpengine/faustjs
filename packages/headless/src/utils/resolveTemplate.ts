import { UriInfo } from '../types';
import type { Template, WPTemplates } from '../components/TemplateLoader';

export function resolveTemplate(
  pageInfo: UriInfo | undefined,
  templates: WPTemplates,
): Promise<Template> {
  if (!templates) {
    throw new Error('No templates provided to template resolver.');
  }

  if (!pageInfo || !pageInfo.templates) {
    return templates.index;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const template of pageInfo.templates) {
    if (typeof templates[template] !== 'undefined') {
      return templates?.[template];
    }
  }

  return templates.index;
}
