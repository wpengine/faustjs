import "faust.config";
import { handleServerSitemapRequests } from "@faustjs/next";


export default function SitemapIndex() {
    return <div>Test</div>;
}

// getStaticProps - no context request object
export const getServerSideProps = (ctx: any) => {
    const paramsIndex = ctx.req.url.indexOf('?');
    const searchParamString = ctx.req.url.substr(paramsIndex);
    const urlParams = new URLSearchParams(searchParamString);

    // no robots.txt here
    if(!urlParams.get('sitemap')) {
        handleServerSitemapRequests.createRootSitemapIndex();
    } else if(urlParams.get('sitemap')) {
        handleServerSitemapRequests(ctx.req);
    }

    return {
        props: {}
    };
}