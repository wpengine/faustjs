export default function SingleTemplate({ templateData }) {
	const { seedQuery } = templateData || {};
	const post = seedQuery?.data?.post;

	return (
		<>
			<h1>WordPress Single Post Template</h1>
			<p>This template would render individual blog posts.</p>
			<div className="content-area">
				{post ? (
					<article>
						<h2>{post.title}</h2>
						<div dangerouslySetInnerHTML={{ __html: post.content }} />
						{post.categories?.nodes && (
							<div>
								<strong>Categories: </strong>
								{post.categories.nodes.map((cat) => cat.name).join(', ')}
							</div>
						)}
						{post.tags?.nodes && (
							<div>
								<strong>Tags: </strong>
								{post.tags.nodes.map((tag) => tag.name).join(', ')}
							</div>
						)}
					</article>
				) : (
					<p>
						Blog post title, content, categories, tags, and other metadata would
						be displayed here using data from the WordPress GraphQL API.
					</p>
				)}
			</div>
		</>
	);
}
