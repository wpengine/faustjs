import {
	ApolloClientOptions,
	DocumentNode,
	InMemoryCacheConfig,
	NormalizedCacheObject,
} from '@apollo/client';
import { _Hooks } from '@wordpress/hooks/build-types/createHooks.js';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { FaustToolbarNodes } from '../components/Toolbar/index.js';
import { SeedNode } from '../queries/seedQuery.js';

type FaustCoreFilters = {
	addFilter(
		hookName: 'apolloClientInMemoryCacheOptions',
		namespace: string,
		callback: (
			inMemoryCacheObject: InMemoryCacheConfig,
			context: Record<string, never>,
		) => InMemoryCacheConfig,
		priority?: number | undefined,
	): void;

	addFilter(
		hookName: 'apolloClientOptions',
		namespace: string,
		callback: (
			apolloClientOptions: ApolloClientOptions<NormalizedCacheObject>,
			context: Record<string, never>,
		) => ApolloClientOptions<NormalizedCacheObject>,
		priority?: number | undefined,
	): void;

	addFilter(
		hookName: 'possibleTemplatesList',
		namespace: string,
		callback: (
			possibleTemplates: string[],
			context: { seedNode: SeedNode },
		) => string[],
		priority?: number | undefined,
	): void;

	addFilter(
		hookName: 'seedQueryDocumentNode',
		namespace: string,
		callback: (
			seedQuery: DocumentNode,
			context: { resolvedUrl: string },
		) => DocumentNode,
		priority?: number | undefined,
	): void;

	addFilter(
		hookName: 'graphqlEndpoint',
		namespace: string,
		callback: (graphqlEndpoint: string, context: { wpUrl: string }) => string,
		priority?: number | undefined,
	): void;

	addFilter(
		hookName: 'wpHostname',
		namespace: string,
		callback: (wpHostname: string, context: { wpUrl: string }) => string,
		priority?: number | undefined,
	): void;

	addFilter(
		hookName: 'wpUrl',
		namespace: string,
		callback: (wpUrl: string, context: Record<string, never>) => string,
		priority?: number | undefined,
	): void;

	addFilter(
		hookName: 'toolbarNodes',
		namespace: string,
		callback: (
			toolbarNodes: FaustToolbarNodes,
			context: { seedNode?: SeedNode },
		) => string,
		priority?: number | undefined,
	): void;

	addFilter(
		hookName: 'resolvedUrl',
		namespace: string,
		callback: (
			resolvedUrl: string | null,
			context: {
				nextContext: GetServerSidePropsContext | GetStaticPropsContext;
			},
		) => string | null,
		priority?: number | undefined,
	): void;
};

export type FaustHooks = _Hooks & FaustCoreFilters;
