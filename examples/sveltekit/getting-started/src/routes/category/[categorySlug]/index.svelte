<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	import { getCategory } from '$lib/client/getters';
	import { PostObjectFieldFormatEnum } from '$lib/client';

	export const hydrate = false;

	export async function load(loadApi) {
		const category = await getCategory(loadApi, (category) => {
			return {
				id: category.id,
				name: category.name,
				posts: category.posts().nodes.map((post) => {
					return {
						id: post.id,
						title: post.title({ format: PostObjectFieldFormatEnum.RENDERED }),
						excerpt: post.excerpt(),
						slug: post.slug
					};
				})
			};
		});

		if (!category) {
			return null;
		}

		return {
			props: {
				category: category
			},
			maxage: 5000
		};
	}
</script>

<script lang="ts">
	export let category: { id: string; name: string; posts: any[] };
</script>

<div>
	<header>
		<h1>{category.name}</h1>
		<div>
			<ul>
				{#each category.posts as post}
					<li>
						<a href={'/posts/' + post.slug}>
							<article>
								<h1>{post.title}</h1>
								<div>
									{@html post.excerpt}
								</div>
							</article>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</header>
</div>

<style>
	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	li {
		border: 2px black solid;
	}

	article {
		padding: 2rem;
	}
</style>
