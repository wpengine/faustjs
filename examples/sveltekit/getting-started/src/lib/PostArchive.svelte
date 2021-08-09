<script lang="ts">
	import type { Post } from "$lib/client"
	export let posts: Post[];

</script>

<div>
	<ul>
		<!-- {@debug posts} -->
		{#each posts as post}
			<li>
				<a href={"/posts/" + post.slug}>
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
