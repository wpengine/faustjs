# Headless Source: WPGraphQL

An NPM package to simplify the integration between WPGraphQL and Next.js. Powered by `@apollo/client`.

This package supports Next.js' Data Fetching methods (e.g. 
[getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) and 
[getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)) as 
well as client-side requests. When requests are made server side, they'll be passed into a prop that's caught on the 
client-side to rehydrate Apollo's cache.
