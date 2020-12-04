import { GetServerSidePropsContext } from "next";
import { getUriInfo, getPosts, getContentNode } from './services';
import { initializeApollo, addApolloState } from "../graphql";
import { initializeServerCookie } from '../auth';
import { ensureAuthorization } from "../auth/authorize";

export async function initializeHeadlessProps(context: GetServerSidePropsContext) {
    const apolloClient = initializeApollo();
    initializeServerCookie(context.req?.headers?.cookie);

    const pageInfo = await getUriInfo(apolloClient, context.resolvedUrl ?? '');

    if (pageInfo.isPreview) {
        const redirected = await ensureAuthorization(apolloClient, `${context.req.headers.host as string}${context.resolvedUrl}`, context.query, context.res);

        if (redirected) {
            return addApolloState(apolloClient, {
                props: { preview: context.preview ?? false }
            });
        }
    }

    if (pageInfo.isPostsPage) {
        await getPosts(apolloClient);
    } else {
        await getContentNode(apolloClient, pageInfo.uriPath);
    }

    return addApolloState(apolloClient, {
        props: { preview: context.preview ?? false }
    });
}
