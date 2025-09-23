import Link from 'next/link';
import { useState } from 'react';
import Login from './Login';
import { useLogout, useUser } from '@faustjs/nextjs/pages';
import { useRouter } from 'next/router';

export default function Header() {
	const { user, refetch, isAuthenticated } = useUser();
	const { logout } = useLogout();
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const route = useRouter();

	const openLoginModal = () => setIsLoginModalOpen(true);
	const closeLoginModal = () => setIsLoginModalOpen(false);

	const onLoggedIn = () => {
		closeLoginModal();
		refetch();
	};

	const logoutUser = () => {
		logout({
			onSuccess: () => {
				refetch();
			},
		});
	};

	return (
		<>
			<header className="bg-gray-800 text-white py-4 px-8">
				<div className="flex justify-between items-center max-w-4xl mx-auto">
					<div className="text-3xl font-semibold">
						<Link href="/">Headless</Link>
					</div>

					<nav className="flex items-center gap-4">
						<Link href="/" className="text-lg hover:underline">
							Home
						</Link>

						{isAuthenticated ? (
							<div className="relative group">
								<button className="text-lg hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 flex items-center space-x-1">
									<span>
										Welcome, <strong>{user?.name || user?.username || 'User'}</strong>
									</span>
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>

								<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
									<div className="py-1">
										<button
											onClick={logoutUser}
											className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
											Logout
										</button>
									</div>
								</div>
							</div>
						) : route.asPath !== '/login' ? (
							<button
								onClick={openLoginModal}
								className="text-lg hover:underline cursor-pointer bg-transparent border-none text-white">
								Login
							</button>
						) : null}
					</nav>
				</div>
			</header>

			{isLoginModalOpen && (
				<div className="fixed inset-0 bg-gray-900/30 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
						<button
							onClick={closeLoginModal}
							className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold">
							×
						</button>
						<h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

						<Login closeModal={onLoggedIn} />
					</div>
				</div>
			)}
		</>
	);
}
