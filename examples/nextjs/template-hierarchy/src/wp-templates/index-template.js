import WordPressLayout from '../components/WordPressLayout';

export default function IndexTemplate({ templateData }) {
	const { seedQuery } = templateData || {};
	const posts = seedQuery?.data?.posts?.nodes || [];

	return (
		<WordPressLayout title="Index Template">
			<h1>WordPress Index Template</h1>
			<p>This is the fallback template for all WordPress content.</p>
			<div className="content-area">
				<p>
					Any WordPress content that doesn't have a specific template would use
					this one:
				</p>
				{posts.length > 0 ? (
					posts.map((post) => (
						<div key={post.id || Math.random()} className="post-preview">
							<h3>{post.title}</h3>
							<p>{post.excerpt || 'Content would appear here...'}</p>
						</div>
					))
				) : (
					<div className="post-preview">
						<h3>Sample Content</h3>
						<p>
							This is the default template that would render any WordPress
							content using data from the WordPress GraphQL API.
						</p>
					</div>
				)}
			</div>
		</WordPressLayout>
	);
}
