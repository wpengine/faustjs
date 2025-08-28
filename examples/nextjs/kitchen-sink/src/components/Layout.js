import { useRouter } from 'next/router';
import Header from './Header';
import PreviewButton from './PreviewButton';

export default function Layout({ children }) {
	const router = useRouter();

	return (
		<>
			<Header />
			<main className="bg-stone-100 text-gray-800 pb-16 pt-8 min-h-screen">
				{children}

				{router.isPreview && <PreviewButton />}
			</main>
		</>
	);
}
