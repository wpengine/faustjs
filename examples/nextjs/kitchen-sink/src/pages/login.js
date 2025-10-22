import { default as LoginComponent } from '@/components/Login';
import { useRouter } from 'next/router';

export default function Login() {
	const router = useRouter();

	return (
		<div className="container max-w-md py-6 mx-auto">
			<h1 className="mb-4 text-2xl font-bold">Login</h1>
			<LoginComponent
				onSuccess={() => {
					router.push('/');
				}}
			/>
		</div>
	);
}
