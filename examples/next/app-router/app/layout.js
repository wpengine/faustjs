import { gql } from '@apollo/client';
import { getClient } from '@faustwp/experimental-app-router';
import Link from 'next/link';
/**
 * For now, we will manually call the Faust config as we have not yet determined
 * how we want to set the config (Currently in Faust we call it in the [wordPressNode] file).
 *
 * @todo
 */
import '../faust.config.js';

import { loadErrorMessages } from '@apollo/client/dev';

loadErrorMessages();

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

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
      </body>
    </html>
  );
}
