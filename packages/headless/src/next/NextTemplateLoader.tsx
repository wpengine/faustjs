import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { useUriInfo } from './hooks';
import { TemplateLoader, Template, resolveTemplate, Templates } from '../react';
import { getCurrentPath } from './utils';
import { getUriInfo, getApolloClient } from '../api';
import { resolvePrefixedUrlPath } from '../utils';
import { headlessConfig } from '../config';

export interface NextTemplate extends Template {
  getStaticProps?: (context: GetStaticPropsContext) => Promise<unknown>;
  getServerSideProps?: (context: GetServerSidePropsContext) => Promise<unknown>;
}

export function NextTemplateLoader({
  templates,
}: {
  templates: Templates<NextTemplate>;
}): JSX.Element | null {
  const uriInfo = useUriInfo();

  if (!uriInfo) {
    return null;
  }

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
  const wpeConfig = headlessConfig();
  const currentUrlPath = resolvePrefixedUrlPath(
    getCurrentPath(context),
    wpeConfig.uriPrefix,
  );

  const pageInfo = await getUriInfo(client, currentUrlPath);

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
