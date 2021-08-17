import { Header, Footer } from 'components';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Headless by WP Engine!</title>
      </Helmet>

      <Header />

      <main className="content content-single">
        <div className="wrap">
          <h1>Explore this Example Project</h1>

          <p>
            This headless example project uses{' '}
            <a href="https://nextjs.org/">Next.js</a>,{' '}
            <a href="https://graphql.org/">GraphQL</a>,{' '}
            <a href="https://gqty.dev">GQty</a>, and the{' '}
            <a href="https://github.com/wpengine/headless-framework">
              WP Engine headless packages
            </a>{' '}
            for WordPress integration. Dive in and edit this template at
            <code>/src/pages/home.tsx</code>.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
