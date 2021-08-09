<script context="module" lang="ts">
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
		const pageContent = await resolved(() => {
			const content = query.page({
				asPreview: false,
				id: page.path,
				idType: 'URI'
			});

			return {
				title: content.title(),
				content: content.content()
			};
		});

		if (!pageContent) {
			return null;
		}

		return {
			props: {
				data: pageContent
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
