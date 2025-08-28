<script>
	const { templateData } = $props();
	const seedNode = templateData?.seedNode;
	const contentType = seedNode?.__typename || 'content';
</script>

<svelte:head>
	<title>Template Not Found</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-8 py-16">
	<div class="text-center mb-12">
		<h2 class="text-2xl font-semibold text-gray-700 mb-6">
			Template Not Found
		</h2>
		<p class="text-lg text-gray-600 mb-8">
			No specific template was found for the <strong>{contentType}</strong> type.
			This content is being displayed using the default fallback template.
		</p>
	</div>

	<div class="text-center">
		<a
			href="/"
			class="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
		>
			← Go back to the homepage
		</a>
	</div>

	<div class="bg-gray-50 rounded-lg p-6 mt-8">
		<h3 class="text-lg font-semibold text-gray-800 mb-4">
			Debug Information
		</h3>
		<div class="bg-white rounded border p-4 overflow-auto">
			<pre class="text-sm text-gray-700"><code>{JSON.stringify(templateData, null, 2)}</code></pre>
		</div>
	</div>
</div>
