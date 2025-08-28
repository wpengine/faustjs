<script>
	const { queriesData } = $props();
	
	const { getPage } = queriesData || {};
	const { title, content, featuredImage } = getPage?.data?.page || {};
</script>

<svelte:head>
	<title>{title || 'Page'}</title>
</svelte:head>

<article class="max-w-2xl px-6 py-24 mx-auto space-y-12">
	<div class="w-full mx-auto space-y-4 text-center">
		<h1 class="text-4xl font-bold leading-tight md:text-5xl">
			{title || 'Page Title'}
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
		>{@html content || 'Page content would appear here...'}
	</div>
</article>
