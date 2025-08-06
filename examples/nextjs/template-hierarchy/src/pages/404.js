import Head from 'next/head';

export default function Custom404() {
	return (
		<>
			<Head>
				<title>404 - Page Not Found</title>
			</Head>
			<main style={{ textAlign: 'center', padding: '40px 20px' }}>
				<h1 style={{ color: '#dc2626' }}>404 - Page Not Found</h1>
				<p>Sorry, the page you are looking for could not be found.</p>
				<p>
					This might happen if the WordPress content doesn't exist or if there's
					no matching template for the requested URI.
				</p>
				<a href="/" style={{ color: '#3b82f6', fontWeight: '500' }}>
					← Back to Home
				</a>
			</main>
		</>
	);
}
