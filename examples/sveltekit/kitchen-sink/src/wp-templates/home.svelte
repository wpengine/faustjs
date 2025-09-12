<script>
	import BlogPostItem from '../components/BlogPostItem.svelte';
	
	const { queriesData } = $props();
	
	const { getPosts } = queriesData || {};
	const posts = getPosts?.data?.posts;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

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

