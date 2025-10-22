import { sessionConfig } from '@/constants/sessionConfig';
import { authRouter } from '@faustjs/auth';
import { createDefaultClient, setGraphQLClient } from '@faustjs/nextjs/pages';

export default function handler(req, res) {
	const { action } = req.query;

	const client = createDefaultClient(process.env.NEXT_PUBLIC_WORDPRESS_URL);
	setGraphQLClient(client);

	return authRouter({
		client,
		ironOptions: sessionConfig,
		action,
		loginProvider: 'PASSWORD',
		req,
		res,
	});
}
