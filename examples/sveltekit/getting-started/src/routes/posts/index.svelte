<script context="module">
	// import { getPosts} from "@faustjs/core"
  import { browser, dev } from '$app/env';

	export const hydrate = false;


	export async function load (loadApi) {
		const { context: { client: { query, resolved }}} = loadApi

		const posts = await resolved(() => {
			const allPosts = query.posts().nodes
		
			return allPosts.map(post => {
				const result = {
					id: post.id,
					excerpt: post.excerpt(),
					title: post.title(),
					uri: post.uri,
				}

				return result
			})
		});



		return {
			props: {
				posts: posts
			},
			maxage: 5000,
		}
	}
</script>

<script>
	export let posts;

	// if (!posts) {
	// 	posts = [];
	// }
</script>

<div>
	<ul>
		<!-- {@debug posts} -->
		{#each posts as post}
			<li>
				<a href={post.uri}>
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
