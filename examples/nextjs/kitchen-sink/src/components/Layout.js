import Header from './Header';

export default function Layout({ children }) {
;

	return (
		<>
			<Header />
			<main className="bg-stone-100 text-gray-800 pb-16 pt-8 min-h-screen">
				{children}
			</main>
		</>
	);
}
