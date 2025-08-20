/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';

export default function Header() {
	return (
		<header className="bg-gray-800 text-white py-4 px-8">
			<div className="flex justify-between items-center max-w-4xl mx-auto">
				<div className="text-3xl font-semibold">
					<Link href="/">Headless</Link>
				</div>

				<nav className="space-x-6">
					<Link href="/" className="text-lg hover:underline">
						Home
					</Link>
				</nav>
			</div>
		</header>
	);
}
