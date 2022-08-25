import "faust.config";
import { getSitemapProps } from "@faustjs/next/server";


export default function SitemapIndex() {
    return <div>Test</div>;
}

// getStaticProps - no context request object
export const getServerSideProps = async (ctx: any) => {
    const sitemapConfig = {
        sitemapIndexPath: '/wp-sitemap.xml',
        frontendUrl: 'http://localhost:3000',
        wpUrl: 'http://localhost:10003',
        pages: [
            {
                path: '/about'
            }
        ],
        replaceUrls: true,
    };
    return getSitemapProps(ctx, sitemapConfig);
}