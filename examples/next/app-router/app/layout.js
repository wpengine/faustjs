import { gql } from '@apollo/client';
import { getClient } from '@faustwp/experimental-app-router';
import Link from 'next/link';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }) {
  const client = getClient();

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
        <header>
          <div>
            <h1>{data.generalSettings.title}</h1>
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
      </body>
    </html>
  );
}
