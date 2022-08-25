import { Header, Footer, Container, Main } from "components";

export default function Page() {
  return (
    <>
      <Header />
      <Main>
        <Container>
          <>
            <h1>Home</h1>
            <p>This page is a traditional <a href="https://nextjs.org/docs/routing/introduction#index-routes">Next.js file-system based page</a>.</p>
          </>
        </Container>
      </Main>
      <Footer />
    </>
  );
}
