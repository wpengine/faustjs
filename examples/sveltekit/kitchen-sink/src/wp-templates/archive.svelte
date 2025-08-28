<script>
	import BlogPostItem from '../components/BlogPostItem.svelte';
	
	const { queriesData } = $props();
	
	const { getCategory } = queriesData || {};
	const categoryData = getCategory?.data?.nodeByUri;
	const { posts, name } = categoryData || {};
</script>

<div class='container max-w-4xl py-6 mx-auto'>
	<h1 class='mb-4 text-2xl font-bold'>{name || 'Archive'}</h1>

	{#if posts?.edges?.length > 0}
		{#each posts.edges as item (item.node.id)}
			<BlogPostItem post={item.node} />
		{/each}
	{:else if posts?.edges?.length === 0}
		<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
			<h2 class="text-xl font-semibold mb-2 text-yellow-800">No Posts Found</h2>
			<p class="text-yellow-700">There are no posts to display at this time.</p>
		</div>
	{:else}
		<div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
			<h2 class="text-xl font-semibold mb-2">Loading Posts...</h2>
			<p class="text-gray-700">
				Fetching the latest posts from WordPress...
			</p>
		</div>
	{/if}

</div>