import "faust.config";
import { getSitemapProps } from "@faustjs/next/server";


export default function SitemapIndex() {
    return <div>Test</div>;
}

// getStaticProps - no context request object
export const getServerSideProps = (ctx: any) => {
    return getSitemapProps(ctx);
}