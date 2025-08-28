<script>
	const { queriesData } = $props();
	const { getPost } = queriesData || {};
	const { title, content, featuredImage } = getPost?.data?.post || {};
</script>

<svelte:head>
	<title>{title || 'Single Post'}</title>
</svelte:head>

<article class="max-w-2xl px-6 py-24 mx-auto space-y-12">
	<div class="w-full mx-auto space-y-4 text-center">
		<h1 class="text-4xl font-bold leading-tight md:text-5xl">
			{title || 'Post Title'}
		</h1>
	</div>

	{#if featuredImage}
		<img
			src={featuredImage?.node?.sourceUrl}
			alt=""
			class="w-full h-72 object-cover rounded-lg mb-4"
		/>
	{/if}

	<div
		class="text-gray-800"
		>{@html content || 'Post content would appear here...'}
	</div>
</article>
