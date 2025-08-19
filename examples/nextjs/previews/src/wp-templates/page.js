export default function Component({ templateData }) {
	const { seedQuery } = templateData || {};
	const page = seedQuery?.data?.page;

	return (
		<>
			<h1>WordPress Page Template</h1>
			<p>This template would render individual WordPress pages.</p>
			<div className="content-area">
				{page ? (
					<>
						<h2>{page.title}</h2>
						<div dangerouslySetInnerHTML={{ __html: page.content }} />
					</>
				) : (
					<p>
						Page title, content, and metadata would be displayed here using data
						from the WordPress GraphQL API.
					</p>
				)}
			</div>
		</>
	);
}
