import { handleSitemapRequests } from '@faustjs/next';

export default function SitemapIndex() {
    return <div>Test</div>;
}

// getStaticProps - no context request object
export const getServerSideProps = (ctx) => {
    // console.log(ctx.req.url);

    // if(ctx.req.url === '/sitemap.xml') {
    //     // handlesitemaprequests.createrootsitemapindex()
    // }

    // if(ctx.req.url.includes('something')) {
    //     // handlesitemaprequests.handlesitemappath()
    // }

    // return getServerSideSitemapIndex(ctx, [
    //     'https://example.com/path-1.xml',
    //     'https://example.com/path-2.xml',
    // ]);

    return {
        props: {}
    };
}