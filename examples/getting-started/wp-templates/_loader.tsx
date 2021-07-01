import type { Templates } from '@wpengine/headless/react';
import type { NextTemplate } from '@wpengine/headless/next';

const templates: Templates<NextTemplate> = {
  '404': import('./404'),
  'front-page': import('./front-page'),
  index: import('./index'),
  category: import('./category'),
  page: import('./page'),
  single: import('./single'),
};

export default templates;
