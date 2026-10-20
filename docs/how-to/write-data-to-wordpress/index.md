---
title: "Write Data to WordPress"
description: "Send authenticated WPGraphQL mutations from your Faust.js app, and understand how access tokens and concurrent edits behave."
---

The access token Faust.js uses to read private data also lets your app write back to WordPress. Your app can create posts, update fields, or run any other WPGraphQL mutation the logged-in user has permission to run.

This guide shows how to send mutations from the browser and explains how long tokens last and what happens when two people edit the same post.

## 0. Prerequisites

Follow the [Authentication](/docs/how-to/authentication/) guide first. You need a working login flow and `getApolloAuthClient()` returning data for `viewer`.

## 1. How authenticated requests work

When a user logs in, the FaustWP plugin issues two tokens:

| Token         | Lifetime  | Where it lives                                                    |
| ------------- | --------- | ----------------------------------------------------------------- |
| Access token  | 5 minutes | In memory in the browser. Fetched again after a page reload.      |
| Refresh token | 2 weeks   | An `httpOnly` cookie set by the Faust API route in your Next.js app |

`getApolloAuthClient()` returns an Apollo Client that sends the access token as an `Authorization: Bearer <token>` header. The FaustWP plugin reads that header and makes WordPress treat the request as coming from that user, so normal WordPress capability checks apply. An Author can create and edit their own posts but can't edit someone else's. A Subscriber can't create posts at all.

Faust.js refreshes the access token in the background 60 seconds before it expires, using the refresh token cookie. A page can stay open for hours without the user logging in again, as long as the refresh token is still valid.

## 2. Send a mutation

Pass the auth client to Apollo's `useMutation` hook, the same way you pass it to `useQuery`:

```js title="components/NewDraft.js"
import { getApolloAuthClient } from "@faustwp/core";
import { gql, useMutation } from "@apollo/client";

const CREATE_DRAFT = gql`
	mutation CreateDraft($title: String!, $content: String) {
		createPost(
			input: { title: $title, content: $content, status: DRAFT }
		) {
			post {
				databaseId
				title
				status
			}
		}
	}
`;

export function NewDraft() {
	const client = getApolloAuthClient();
	const [createDraft, { data, loading, error }] = useMutation(
		CREATE_DRAFT,
		{ client },
	);

	async function handleSubmit(event) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);

		try {
			await createDraft({
				variables: {
					title: form.get("title"),
					content: form.get("content"),
				},
			});
		} catch {
			// Apollo rejects on error; `error` below shows the message.
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input name="title" placeholder="Title" required />
			<textarea name="content" placeholder="Content" />
			<button type="submit" disabled={loading}>
				Save draft
			</button>

			{error && <p>Could not save: {error.message}</p>}
			{data && <p>Saved draft #{data.createPost.post.databaseId}</p>}
		</form>
	);
}
```

Render this component only when `useAuth()` reports `isAuthenticated === true`, as shown in the [Authentication](/docs/how-to/authentication/) guide. Until then there's no access token in memory, and the mutation runs as an anonymous visitor.

## 3. Handle permission errors

If the request reaches WordPress without a valid access token, WordPress treats it as an anonymous visitor. WPGraphQL then responds with HTTP 200 and a permission error in the response body, not a 401, so check `error` rather than the status code.

This usually means one of:

- The user doesn't have the WordPress capability the mutation needs.
- The refresh token has expired or was cleared by logging out, so the user needs to log in again.
- The device was asleep past the access token's expiry. The background refresh runs on wake, but a request sent at the same moment can still go out with the old token. Retrying a moment later usually succeeds.

> [!NOTE]
> Faust.js doesn't currently expose a public function to force a token refresh before retrying. For now, show the error and let the user try again.

## 4. Concurrent edits: last write wins

WordPress core and WPGraphQL don't check whether a post changed between when you read it and when you write it. If two users load the same post, both edit it, and both save, the second save overwrites the first without an error.

For most single-editor apps this doesn't matter. If several people or processes write to the same content, you can reduce the risk. Keep the post's `modified` value from when you loaded it, read it again immediately before writing, and stop if it has changed:

```js
// `modifiedWhenLoaded` is `modified` from your original query.
const client = getApolloAuthClient();

const { data } = await client.query({
	query: gql`
		query PostModified($id: ID!) {
			post(id: $id, idType: DATABASE_ID) {
				modified
			}
		}
	`,
	variables: { id: postId },
	fetchPolicy: "network-only",
});

if (data.post.modified !== modifiedWhenLoaded) {
	// Someone else saved first. Ask the user to reload.
}
```

`fetchPolicy: "network-only"` skips Apollo's cache so you get the current value from WordPress.

This narrows the window but doesn't close it: another save can still land between the check and your mutation. For app data that several writers update, the FaustWP document store below rejects stale writes instead.

## 5. Store app data with conflict detection

The FaustWP plugin includes an optional document store for app data such as settings or structured drafts. Documents are grouped into collections, like `preferences` or `drafts`. Each document has an ID that's unique within its collection, a version number, and data that's a JSON object or array. Every write names the version it was based on, and WordPress rejects the write if someone else saved first.

The store is off by default. Enable it with a filter in a small plugin or your theme's `functions.php`:

```php
add_filter( 'faustwp_enable_document_store', '__return_true' );
```

Documents live in their own database table, `wp_faustwp_documents` (with your site's table prefix), which FaustWP creates the first time WordPress loads with the store enabled. Deleting the FaustWP plugin deletes the table and its documents.

Administrators can read and write documents. To give other users access, add the `read_faustwp_documents` capability to read, and both `read_faustwp_documents` and `edit_faustwp_documents` to write. These capabilities don't grant access to anything else in WordPress.

The routes accept any WordPress REST API authentication, such as the [Application Password](#6-writing-from-the-server) described below.

Read a document:

```http
GET /?rest_route=/faustwp/v1/collections/preferences/documents/site-settings
```

```json
{
	"collection": "preferences",
	"id": "site-settings",
	"version": 3,
	"data": { "theme": "dark" },
	"created": "2026-10-01T09:30:00Z",
	"modified": "2026-10-20T15:04:05Z"
}
```

`created` and `modified` are UTC timestamps.

Write a document by sending the version you read. Use `0` to create a new document. A successful write returns the new version:

```http
PUT /?rest_route=/faustwp/v1/collections/preferences/documents/site-settings
Content-Type: application/json

{ "version": 3, "data": { "theme": "light" } }
```

If the document has changed since version 3, the write returns `409 Conflict` and doesn't change anything. The response includes the current document, so you can merge the changes or ask the user what to keep, then retry with the current version:

```json
{
	"code": "faustwp_document_conflict",
	"message": "The document has changed since the version this write was based on.",
	"data": {
		"status": 409,
		"collection": "preferences",
		"id": "site-settings",
		"version": 4,
		"document": { "collection": "preferences", "id": "site-settings", "version": 4, "data": { "theme": "blue" }, "created": "…", "modified": "…" }
	}
}
```

To create a document without choosing an ID, for example a form submission, `POST` to the collection. WordPress generates a random ID and returns the new document with `201 Created`:

```http
POST /?rest_route=/faustwp/v1/collections/waitlist/documents
Content-Type: application/json

{ "data": { "email": "ada@example.com" } }
```

List a collection's documents, newest first. Pass `limit` (1 to 100, default 20), and to get the next page, pass the `next_cursor` from the previous response as `cursor`. `next_cursor` is `null` on the last page:

```http
GET /?rest_route=/faustwp/v1/collections/waitlist/documents&limit=20
```

```json
{ "documents": [ { "collection": "waitlist", "id": "3f9c2a7e1b0d4c6a8e5f", "version": 1, "data": { "email": "ada@example.com" }, "created": "…", "modified": "…" } ], "next_cursor": null }
```

Delete a document by sending the version you read. Like a write, a stale version returns `409 Conflict`, and a document that doesn't exist returns `404`:

```http
DELETE /?rest_route=/faustwp/v1/collections/waitlist/documents/3f9c2a7e1b0d4c6a8e5f&version=1
```

To run code when documents change, for example to send an email for each form submission, use the `faustwp_document_saved` and `faustwp_document_deleted` actions:

```php
add_action(
	'faustwp_document_saved',
	function ( $document, $created ) {
		if ( $created && 'waitlist' === $document['collection'] ) {
			wp_mail( get_option( 'admin_email' ), 'New waitlist signup', $document['data']->email );
		}
	},
	10,
	2
);
```

Collection names and document IDs use lowercase letters, numbers and hyphens. A collection exists as soon as it has a document. Documents are limited to 100 KB of JSON by default, which you can change with the `faustwp_document_max_bytes` filter.

To see what your app has stored, go to **Tools → Faust Documents** in WordPress. It lists each document with its collection, version and when and by whom it was last saved, and shows a document's data. The screen is read-only.

To try it locally, see the [document store example](https://github.com/wpengine/faustjs/tree/canary/examples/next/document-store). It runs WordPress in Docker, shows a conflict between two browser tabs, and has a waitlist page that adds, lists and removes documents.

## 6. Writing from the server

The flow above runs in the browser on behalf of a logged-in user. Faust.js doesn't yet provide a supported way for server-side code (a build step, a cron job, an API route acting on its own) to authenticate to WordPress.

Until it does, create a dedicated low-privilege user and give it a WordPress [Application Password](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/). Avoid using a personal admin account. WPGraphQL accepts them as HTTP Basic auth (`Authorization: Basic <base64 of username:application-password>`). WordPress only allows Application Passwords over HTTPS, except on local development sites. Keep the credentials in server-side environment variables, never in variables prefixed with `NEXT_PUBLIC_`.

A scoped service user for server-side writes is proposed in [#2561](https://github.com/wpengine/faustjs/issues/2561).

## Security notes

- Logging out clears the refresh token cookie, but WordPress doesn't keep a list of issued tokens. A token that was copied before logout stays valid until it expires (at most 5 minutes for an access token, 2 weeks for a refresh token).
- Changing the Faust secret key invalidates every token at once. Tokens are encrypted with the secret key, so after you click **Regenerate** in **Settings → Faust** (and update `FAUST_SECRET_KEY` in your app), all users have to log in again.
- An access token can do anything its user can do in WordPress, so give each user only the role they need.
