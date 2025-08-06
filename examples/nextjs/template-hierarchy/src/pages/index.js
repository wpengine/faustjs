import Head from 'next/head';

export default function Home() {
	// Simple hardcoded template data like in the Astro example
	const templates = [
		{
			data: {
				name: 'Single',
				type: 'single',
				path: 'src/wp-templates/single.js',
				description: 'Displays individual blog posts with full content',
			},
		},
		{
			data: {
				name: 'Page',
				type: 'page',
				path: 'src/wp-templates/page.js',
				description: 'Displays individual WordPress pages',
			},
		},
		{
			data: {
				name: 'Archive',
				type: 'archive',
				path: 'src/wp-templates/archive.js',
				description: 'Displays category, tag, and other archive pages',
			},
		},
		{
			data: {
				name: 'Index',
				type: 'index',
				path: 'src/wp-templates/index-template.js',
				description:
					"Fallback template for any content that doesn't have a specific template",
			},
		},
	];

	return (
		<>
			<Head>
				<title>@faustjs/nextjs Example</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main>
				<h1>@faustjs/nextjs Template Hierarchy Example</h1>
				<p>
					This example demonstrates how the @faustjs/nextjs package discovers
					WordPress templates in your Next.js project using the WordPress
					template hierarchy.
				</p>

				<h2>Discovered Templates</h2>
				<p>
					The following templates were automatically discovered from the{' '}
					<code>wp-templates</code> directory:
				</p>

				<div className="templates-list">
					{templates.map((template) => (
						<div key={template.data.name} className="template-card">
							<h3>{template.data.name}</h3>
							<p>
								<strong>Type:</strong> {template.data.type}
							</p>
							<p>
								<strong>Path:</strong> <code>{template.data.path}</code>
							</p>
							<p>
								<strong>Description:</strong> {template.data.description}
							</p>
						</div>
					))}
				</div>

				<h2>How It Works</h2>
				<div className="how-it-works">
					<ol>
						<li>
							Templates are placed in the <code>src/wp-templates/</code>{' '}
							directory
						</li>
						<li>
							The <code>index.js</code> file exports all templates with dynamic
							imports
						</li>
						<li>
							Templates are organized by WordPress template hierarchy rules
						</li>
						<li>Each template gets metadata like type and path</li>
						<li>You can query templates using the template registry</li>
					</ol>
				</div>

				<h2>Live Template Router Demo</h2>
				<p>
					See the template hierarchy in action with our catch-all route that
					resolves WordPress URLs to templates:
				</p>
				<div className="router-links">
					<a href="/about">About Page → page.js</a>
					<a href="/hello-world">Blog Post → single.js</a>
					<a href="/category/uncategorized">Category Archive → archive.js</a>
					<a href="/tag/fun">Tag Archive → archive.js</a>
				</div>
			</main>
		</>
	);
}
