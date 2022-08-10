import { handleSitemapRequests } from '@faustjs/next';

export default function SitemapIndex() {
    return <div>Test</div>;
}

// getStaticProps - no context request object
export const getServerSideProps = (ctx: any) => {
    const paramsIndex = ctx.req.url.indexOf('?');
    const searchParamString = ctx.req.url.substr(paramsIndex);
    const urlParams = new URLSearchParams(searchParamString);

    // if(!urlParams.get('sitemap')) {
    //     handleSitemapRequests.createRootSitemapIndex();
    // } else if(urlParams.get('sitemap')) {
    //     handleSitemapRequests.handleSitemapPath()
    // }

    // return getServerSideSitemapIndex(ctx, [
    //     'https://example.com/path-1.xml',
    //     'https://example.com/path-2.xml',
    // ]);

    return {
        props: {}
    };
}