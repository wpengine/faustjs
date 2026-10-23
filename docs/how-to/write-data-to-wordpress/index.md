---
title: "Write Data to WordPress"
description: "Send authenticated WPGraphQL mutations from your Faust.js app or server, and understand how access tokens and concurrent edits behave."
---

The access token Faust.js uses to read private data also lets your app write back to WordPress. Your app can create posts, update fields, or run any other WPGraphQL mutation the logged-in user has permission to run.

This guide shows how to send mutations from the browser and from server-side code, and explains how long tokens last and what happens when two people edit the same post.

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
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

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

This narrows the window but doesn't close it: another save can still land between the check and your mutation. Built-in conflict detection is proposed in [#2562](https://github.com/wpengine/faustjs/issues/2562).

## 5. Writing from the server

The flow above runs in the browser on behalf of a logged-in user. Server-side code that writes on its own, such as a build step, a cron job or an API route, should authenticate with a WordPress [Application Password](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/) instead. Application Passwords are built into WordPress, and each one can be revoked on its own without affecting Faust.js logins or previews.

### Create a dedicated user

Don't use a personal or admin account. Create a WordPress user just for your server code, give it the narrowest role that can do the job, and generate an Application Password for it under **Users → Profile → Application Passwords**.

If the built-in roles are too broad, give the user a custom role that can only edit one post type. The post type needs its own capabilities for this to work:

```php title="my-plugin.php"
add_action( 'init', function () {
	register_post_type( 'event', array(
		'public'              => true,
		'show_in_graphql'     => true,
		'graphql_single_name' => 'event',
		'graphql_plural_name' => 'events',
		// Gives events their own capabilities (edit_events, publish_events, ...)
		// instead of sharing the ones for posts.
		'capability_type'     => array( 'event', 'events' ),
		'map_meta_cap'        => true,
	) );
} );

// Roles are saved in the database, so add the role once, on activation.
register_activation_hook( __FILE__, function () {
	add_role( 'event_writer', 'Event writer', array(
		'read'                  => true,
		'edit_events'           => true,
		'edit_published_events' => true,
		'publish_events'        => true,
	) );
} );
```

A user with the `event_writer` role can create events and update the ones it created, but can't edit posts, pages or other users' events. Add `edit_others_events` if it also needs to update events created by someone else.

### Send authenticated requests

Send the credentials as HTTP Basic auth. WPGraphQL and the WordPress REST API both accept them:

```js title="lib/wordpress-server.js"
const credentials = Buffer.from(
	`${process.env.WP_SERVICE_USER}:${process.env.WP_SERVICE_APP_PASSWORD}`,
).toString("base64");

export async function wordpressMutation(query, variables) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${credentials}`,
			},
			body: JSON.stringify({ query, variables }),
		},
	);

	return response.json();
}
```

- WordPress only accepts Application Passwords over HTTPS, except on local development sites.
- Keep the credentials in server-side environment variables. Never put them in variables prefixed with `NEXT_PUBLIC_`, which are sent to the browser.
- To rotate the credentials, create a new Application Password, deploy it, then revoke the old one.

## Security notes

- Logging out clears the refresh token cookie, but WordPress doesn't keep a list of issued tokens. A token that was copied before logout stays valid until it expires (at most 5 minutes for an access token, 2 weeks for a refresh token).
- Changing the Faust secret key invalidates every token at once. Tokens are encrypted with the secret key, so after you click **Regenerate** in **Settings → Faust** (and update `FAUST_SECRET_KEY` in your app), all users have to log in again.
- An access token can do anything its user can do in WordPress, so give each user only the role they need.
