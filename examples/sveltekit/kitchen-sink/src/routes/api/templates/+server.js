import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { json } from '@sveltejs/kit';
const TEMPLATE_PATH = 'wp-templates';

export const GET = async ({ url }) => {
	const uri = url.searchParams.get('uri');

	if (!uri) {
		return new Response('Missing URI', { status: 400 });
	}

	const files = await readdir(join('src', TEMPLATE_PATH));

	const templates = [];

	for (const file of files) {
		if (file.startsWith('+')) {
			continue;
		}

		const slug = file.replace('.svelte', '');

		templates.push({
			id: slug,
			path: join('/', TEMPLATE_PATH, slug),
		});
	}

	return json(templates);
};
