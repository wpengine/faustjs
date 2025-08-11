<script>
	// Example WordPress archive template for SvelteKit
	// In a real implementation, you would receive archive data as props
	// from the parent route's load function
	
	// Example archive data (in real app this would come from props or store)
	let archiveType = 'Category';
	let archiveName = 'Technology';
	let posts = [
		{
			id: 1,
			title: 'Archive Post 1',
			excerpt: 'This would be a post from the archive...',
			date: 'March 15, 2024'
		},
		{
			id: 2,
			title: 'Archive Post 2', 
			excerpt: 'This would be another post from the archive...',
			date: 'March 10, 2024'
		}
	];
</script>

<svelte:head>
	<title>Archive Template - WordPress Archive</title>
</svelte:head>

<h1>WordPress Archive Template</h1>
<p>
	This template would render WordPress archive pages (category, tag, date,
	etc.).
</p>

<div class="content-area">
	<h2>Archive: {archiveType} - {archiveName}</h2>
	<p>Showing posts from this {archiveType.toLowerCase()}...</p>

	{#each posts as post (post.id)}
		<div class="post-preview">
			<h3>{post.title}</h3>
			<p>{post.excerpt}</p>
			<small>Posted on {post.date}</small>
		</div>
	{/each}
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

	.post-preview {
		background: #f0f8ff;
		padding: 15px;
		border-radius: 5px;
		margin-bottom: 15px;
		border-left: 4px solid #0066cc;
	}

	.post-preview h3 {
		margin-top: 0;
		color: #0066cc;
	}

	.post-preview small {
		color: #666;
		font-style: italic;
	}

	h2 {
		color: #333;
		margin-bottom: 15px;
	}

	p {
		line-height: 1.6;
		color: #555;
	}
</style>
