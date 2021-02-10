import type { Templates } from '@wpengine/headless/dist/components/TemplateLoader';
import type { NextTemplate } from '@wpengine/headless/dist/next';

const templates: Templates<NextTemplate> = {
  '404': import('./404'),
  'front-page': import('./front-page'),
  index: import('./index'),
  page: import('./page'),
  single: import('./single'),
};

export default templates;
