# Document store example

A small Next.js app that reads and writes a shared JSON document in the [FaustWP document store](https://faustjs.org/docs/how-to/write-data-to-wordpress/), and shows what happens when two people save at the same time.

The app's API route talks to WordPress with an [Application Password](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/), so the credentials stay on the server. It doesn't use Faust.js login: every visitor edits the document as the same WordPress user.

## Run it locally

You need Docker and Node.js.

1. Start WordPress with FaustWP and the document store enabled:

   ```bash
   npm run wordpress:setup
   ```

   This runs WordPress on `http://localhost:8090` (log in with `admin` / `password`), creates a user that can only read and write documents, and prints the values for the next step. Set `WP_PORT` or `DB_PORT` to use other ports, or `WP_VERSION` to pick a WordPress version.

2. Copy `.env.local.sample` to `.env.local` and paste in the printed values.

3. Install and start the app:

   ```bash
   npm install
   npm run dev
   ```

4. Open `http://localhost:3000` in two tabs and try a few conflicts. The first save in either tab always works. The second is rejected by WordPress with `409 Conflict`, because it's based on a version that's no longer current, and the page decides what to do:
   - **No edits in the second tab:** it loads the newer version.
   - **The tabs changed different fields** (for example, notes in one and status in the other): it merges both changes and saves a new version.
   - **The tabs changed the same field:** it lists just those fields with the earlier value, theirs and yours. Choose what to keep for each and click **Save merged**. Everything else is already merged.

Stop WordPress with `npm run wordpress:stop`. Add `-- --volumes` to also delete its database.

## Working on the document store

WordPress loads FaustWP straight from `plugins/faustwp` in this repository, so changes to the plugin take effect on the next request without restarting anything. To run WP-CLI against the site, for example to inspect a document:

```bash
docker compose --project-name faust-document-store exec wordpress wp --allow-root eval 'global $wpdb; print_r( $wpdb->get_results( "SELECT slug, version, modified_gmt FROM {$wpdb->prefix}faustwp_documents" ) );'
```

## How it works

- `mu-plugins/enable-document-store.php` is a must-use plugin that turns on the document store with the `faustwp_enable_document_store` filter.
- `pages/api/documents/[slug].js` forwards `GET` and `PUT` requests to `/?rest_route=/faustwp/v1/documents/<slug>` with the Application Password, and passes WordPress's status code back: `404` before the document exists, `201` when it's created, `200` when it's updated and `409` for a stale write.
- `pages/index.js` keeps the version it last read and sends it with every save. On a `409`, the response includes the current document, and the page merges it with the local edits.
- `lib/mergeDocuments.mjs` is the three-way merge: it compares the version the tab started from with theirs and yours, field by field, and reports fields both sides changed differently. Run its tests with `npm test`.
