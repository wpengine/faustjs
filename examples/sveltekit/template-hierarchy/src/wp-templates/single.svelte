<script>
	// Example WordPress post template for SvelteKit
	// In a real implementation, you would receive post data as props
	// from the parent route's load function
</script>

<svelte:head>
	<title>Single Post Template</title>
</svelte:head>

<h1>WordPress Single Post Template</h1>
<p>This template would render individual WordPress posts.</p>
<div class="content-area">
	<!-- WordPress post content would be rendered here -->
	<p>
		Post title, content, and metadata would be displayed here using data from
		the WordPress GraphQL API.
	</p>
</div>

<style>
	h1 {
		color: #333;
		border-bottom: 2px solid #0066cc;
		padding-bottom: 10px;
		margin-bottom: 20px;
	}

	.content-area {
		background: #e8f4f8;
		padding: 20px;
		border-radius: 8px;
		margin-top: 20px;
	}

	p {
		line-height: 1.6;
		color: #555;
	}
</style>
