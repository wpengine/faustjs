<script>
	// Example WordPress index/home template for SvelteKit
	// In a real implementation, you would receive posts data as props
	// from the parent route's load function
	
	// Example posts data (in real app this would come from props or store)
	let posts = [
		{
			id: 1,
			title: 'Example Post 1',
			excerpt: 'This would be an excerpt from a WordPress post...',
			date: 'August 5, 2025',
			slug: 'example-post-1'
		},
		{
			id: 2,
			title: 'Example Post 2', 
			excerpt: 'This would be an excerpt from another WordPress post...',
			date: 'August 3, 2025',
			slug: 'example-post-2'
		},
		{
			id: 3,
			title: 'Example Post 3',
			excerpt: 'This would be an excerpt from yet another WordPress post...',
			date: 'August 1, 2025',
			slug: 'example-post-3'
		}
	];
</script>

<svelte:head>
	<title>Home Template - WordPress Blog</title>
</svelte:head>

<h1>WordPress Home/Index Template</h1>
<p>This template would render the WordPress homepage or blog index.</p>

<div class="content-area">
	<!-- WordPress posts list rendered dynamically -->
	{#each posts as post (post.id)}
		<article class="post-preview">
			<h3>
				<a href="/blog/{post.slug}" class="post-link">{post.title}</a>
			</h3>
			<p>{post.excerpt}</p>
			<small class="post-date">Posted on {post.date}</small>
		</article>
	{/each}
	
	{#if posts.length === 0}
		<p class="no-posts">No posts found.</p>
	{/if}
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
		margin-bottom: 10px;
	}

	.post-link {
		color: #0066cc;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.post-link:hover {
		color: #004499;
		text-decoration: underline;
	}

	.post-date {
		color: #666;
		font-style: italic;
	}

	.no-posts {
		text-align: center;
		color: #666;
		font-style: italic;
		padding: 20px;
	}

	p {
		line-height: 1.6;
		color: #555;
		margin-bottom: 10px;
	}
</style>
