import { gql } from '@apollo/client';
import { getClient } from '@faustwp/experimental-app-router';
import Link from 'next/link';
import '@/faust.config.js';
import { FaustProvider } from '@faustwp/experimental-app-router/ssr';
export default async function RootLayout({ children }) {
  const client = await getClient();

  const { data } = await client.query({
    query: gql`
      query GetLayout {
        generalSettings {
          title
          description
        }
        primaryMenuItems: menuItems(where: { location: PRIMARY }) {
          nodes {
            id
            label
            uri
          }
        }
        footerMenuItems: menuItems(where: { location: FOOTER }) {
          nodes {
            id
            label
            uri
          }
        }
      }
    `,
  });

  return (
    <html lang="en">
      <body>
        <FaustProvider>
          <header>
            <div>
              <h1>
                <Link href="/">{data.generalSettings.title}</Link>
              </h1>

              <h5>{data.generalSettings.description}</h5>
            </div>

            <ul>
              {data.primaryMenuItems.nodes.map((node) => (
                <li>
                  <Link href={node.uri}>{node.label}</Link>
                </li>
              ))}
            </ul>
          </header>
          {children}
        </FaustProvider>
      </body>
    </html>
  );
}
