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

4. Open `http://localhost:3000` in two tabs. Change the notes in both, then save each tab. The first save works. The second is rejected with `409 Conflict`, because it's based on a version that's no longer current, and the page shows both versions so you can keep theirs or overwrite with yours.

Stop WordPress with `npm run wordpress:stop`. Add `-- --volumes` to also delete its database.

## How it works

- `mu-plugins/enable-document-store.php` is a must-use plugin that turns on the document store with the `faustwp_enable_document_store` filter.
- `pages/api/documents/[slug].js` forwards `GET` and `PUT` requests to `/?rest_route=/faustwp/v1/documents/<slug>` with the Application Password, and passes WordPress's status code back: `404` before the document exists, `201` when it's created, `200` when it's updated and `409` for a stale write.
- `pages/index.js` keeps the version it last read and sends it with every save. On a `409`, the response includes the current document.
