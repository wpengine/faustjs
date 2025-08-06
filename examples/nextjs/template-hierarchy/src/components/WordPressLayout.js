import Head from 'next/head';

export default function WordPressLayout({ title, children }) {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<main>{children}</main>
		</>
	);
}
