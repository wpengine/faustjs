import type { WPTemplates } from '@wpengine/headless/dist/components/TemplateLoader';

const templates: WPTemplates = {
  '404': import('./404'),
  'front-page': import('./front-page'),
  index: import('./index'),
  page: import('./page'),
  single: import('./single'),
};

export default templates;
