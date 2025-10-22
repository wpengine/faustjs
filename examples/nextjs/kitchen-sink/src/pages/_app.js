import Layout from '@/components/Layout';
import '@/styles/globals.css';
import '@/toolbar/default.css';

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
