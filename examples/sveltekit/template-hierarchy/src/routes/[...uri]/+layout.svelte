<script>
  const { children } = $props();
</script>

<main>
  {@render children()}
</main>

<style>
	main {
		background: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		max-width: 800px;
		margin: 0 auto;
	}
</style>
