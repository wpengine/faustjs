<script>
	const { post } = $props();
	const { title, date, excerpt, uri, featuredImage } = post ?? {};
	
	// Format the date
	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
		});
	};
</script>

<article class="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm bg-gray-50 mb-4">
	<time datetime={date} class="text-sm text-gray-600">
		{formatDate(date)}
	</time>

	{#if featuredImage}
		<img
			src={featuredImage?.node?.sourceUrl}
			alt=""
			class="w-full h-48 object-cover rounded-t-lg mt-2 mb-4"
		/>
	{/if}

	<h2 class="mt-3">
		<a href={uri} class="text-2xl font-bold hover:underline">
			{title}
		</a>
	</h2>

	<div class="mt-2 mb-4">
		{@html excerpt}
	</div>

	<a href={uri} class="hover:underline text-orange-600 mt-4">Read more</a>
</article>
