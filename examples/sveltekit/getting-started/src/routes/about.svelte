<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	// export const prerender = true;

	export async function load(loadApi) {
		const {
			page,
			context: {
				client: { query, resolved }
			}
		} = loadApi;
		const post = await resolved(() => {
			const post = query.post({
				asPreview: false,
				id: page.path,
				idType: 'URI'
			});

			if (!post) {
				return null;
			}

			return {
				title: post.title(),
				content: post.content()
			};
		});

		if (!post) {
			return null;
		}

		return {
			props: {
				data: post
			},
			maxage: 5000
		};
	}
</script>

<script>
	export let data;
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<div class="content">
	<h1>{data.title}</h1>
	{@html data.content}
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
