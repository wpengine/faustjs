<script>
	const { data } = $props();
</script>

<header class="bg-gray-800 text-white py-4 px-8">
	<div class="flex justify-between items-center max-w-4xl mx-auto">
		<div class="text-3xl font-semibold">
			<a href="/">{data?.generalSettings?.title || 'Site Title'}</a>
		</div>

		<nav class="space-x-6">
			<a href="/" class="text-lg hover:underline">Home</a>
		</nav>
	</div>
</header>
