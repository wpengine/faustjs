export default function ArchiveTemplate({ templateData }) {
	const { seedQuery } = templateData || {};
	const posts = seedQuery?.data?.posts?.nodes || [];
	const archiveInfo = seedQuery?.data?.category || seedQuery?.data?.tag || {};

	return (
		<>
			<h1>WordPress Archive Template</h1>
			<p>This template would render category, tag, or other archive pages.</p>
			<div className="content-area">
				{archiveInfo.name ? (
					<h2>Archive: {archiveInfo.name}</h2>
				) : (
					<h2>Archive Page</h2>
				)}
				{archiveInfo.description && <p>{archiveInfo.description}</p>}

				<h3>Posts in this archive:</h3>
				{posts.length > 0 ? (
					posts.map((post) => (
						<div key={post.id || Math.random()} className="post-preview">
							<h4>{post.title}</h4>
							<p>{post.excerpt || 'Post excerpt would appear here...'}</p>
						</div>
					))
				) : (
					<div className="post-preview">
						<h4>Sample Archive Post</h4>
						<p>
							Posts from this category, tag, or archive would be displayed here
							using data from the WordPress GraphQL API.
						</p>
					</div>
				)}
			</div>
		</>
	);
}
