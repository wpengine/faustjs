import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { useNextUriInfo } from '../react';
import {
  TemplateLoader,
  Template,
  resolveTemplate,
  Templates,
} from '../react';
import { getCurrentUrlPath, isPreview } from './utils';
import { getUriInfo, getApolloClient } from '../api';

export interface NextTemplate extends Template {
  getStaticProps?: (context: GetStaticPropsContext) => Promise<unknown>;
  getServerSideProps?: (context: GetServerSidePropsContext) => Promise<unknown>;
}

export function NextTemplateLoader({
  templates,
}: {
  templates: Templates<NextTemplate>;
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

async function getTemplate(
  context: GetServerSidePropsContext | GetStaticPropsContext,
  templates: Templates<NextTemplate>,
) {
  const client = getApolloClient(context);
  const currentUrlPath = getCurrentUrlPath(context);
  const pageInfo = await getUriInfo(client, currentUrlPath, isPreview(context));

  return resolveTemplate(pageInfo, templates);
}

/* eslint-disable consistent-return */

export async function getServerSideProps(
  context: GetServerSidePropsContext,
  templates: Templates<NextTemplate>,
): Promise<unknown> {
  const template = await getTemplate(context, templates);

  if (template?.getServerSideProps) {
    return template.getServerSideProps(context);
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext,
  templates: Templates<NextTemplate>,
): Promise<unknown> {
  const template = await getTemplate(context, templates);

  if (template?.getStaticProps) {
    return template.getStaticProps(context);
  }
}

/* eslint-enable consistent-return */
