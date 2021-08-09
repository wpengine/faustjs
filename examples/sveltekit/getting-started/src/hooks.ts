import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ request, resolve }) => {
	if (request.query.has('preview')) {
		console.log('is preview');
	}

	const response = await resolve(request);

	return response;
};
