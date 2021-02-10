import React from 'react';
import dynamic from 'next/dynamic';
import { useNextUriInfo } from '../api/hooks';
import TemplateLoader, { WPTemplates } from './TemplateLoader';

export default function NextTemplateLoader({
  templates,
}: {
  templates: WPTemplates;
}): JSX.Element | null {
  const uriInfo = useNextUriInfo();

  return (
    <TemplateLoader
      dynamicLoader={dynamic}
      templates={templates}
      uriInfo={uriInfo}
    />
  );
}
