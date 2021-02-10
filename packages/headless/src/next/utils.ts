import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { resolvePrefixedUrlPath } from '../utils';
import { headlessConfig } from '../config';

export function getCurrentPath(
    context: GetServerSidePropsContext | GetStaticPropsContext,
): string {
    let url: string;

    if (context.params?.page && Array.isArray(context.params?.page)) {
        let pagePath: string[] = context.params?.page;

        /**
         * Remove preview and preview ID if provided as WP GraphQL will not be able to resolve queries such as nodeByUri
         * properly.
         */
        if (isPreviewPath(context)) {
            pagePath = pagePath.slice(0, pagePath.length - 2);
        }

        url = `/${ pagePath.join('/') }`;
    } else {
        url = `/${ (context.params?.page as string) ?? '' }`;
    }

    return url;
}

export function isPreviewPath(
    contextOrUrl: GetServerSidePropsContext | GetStaticPropsContext | string,
): boolean {
    if (typeof contextOrUrl === 'string') {
        const urlSplit = contextOrUrl.split('/');

        return urlSplit?.[urlSplit.length - 2] === 'preview';
    }

    if (contextOrUrl.params?.page && Array.isArray(contextOrUrl.params?.page)) {
        const { page } = contextOrUrl.params;

        /**
         * Remove preview and preview ID if provided as WP GraphQL will not be able to resolve queries such as nodeByUri
         * properly.
         */
        if (page?.[page.length - 2] === 'preview') {
            return true;
        }
    }

    return false;
}

export function isPreview(
    context: GetServerSidePropsContext | GetStaticPropsContext,
): boolean {
    if (!context.preview) {
        return false;
    }

    return isPreviewPath(context);
}

export function getCurrentUrlPath(context: GetServerSidePropsContext | GetStaticPropsContext) {
    const wpeConfig = headlessConfig();
    return resolvePrefixedUrlPath(
        getCurrentPath(context),
        wpeConfig.uriPrefix,
    );
}