// Forwards requests to the FaustWP document store, authenticating with an
// Application Password so the credentials never reach the browser.

export const COLLECTION_PATTERN = /^[a-z0-9-]{1,64}$/;
export const ID_PATTERN = /^[a-z0-9-]{1,190}$/;
const NUMBER_PATTERN = /^[0-9]+$/;

// Builds a query string from the numeric parameters WordPress accepts, such
// as limit, cursor and version, and drops anything else.
export function numericQuery(query, names) {
	return names
		.filter((name) => NUMBER_PATTERN.test(query[name] ?? ''))
		.map((name) => `&${name}=${query[name]}`)
		.join('');
}

export function rejectMethod(req, res, allowed) {
	if (allowed.includes(req.method)) {
		return false;
	}
	res.setHeader('Allow', allowed.join(', '));
	res.status(405).json({ message: 'Method not allowed.' });
	return true;
}

export async function forwardToWordPress(req, res, path, query = '') {
	const { NEXT_PUBLIC_WORDPRESS_URL, WP_SERVICE_USER, WP_SERVICE_APP_PASSWORD } =
		process.env;
	if (!NEXT_PUBLIC_WORDPRESS_URL || !WP_SERVICE_USER || !WP_SERVICE_APP_PASSWORD) {
		return res.status(500).json({
			message:
				'Set NEXT_PUBLIC_WORDPRESS_URL, WP_SERVICE_USER and WP_SERVICE_APP_PASSWORD in .env.local.',
		});
	}

	const credentials = Buffer.from(
		`${WP_SERVICE_USER}:${WP_SERVICE_APP_PASSWORD}`,
	).toString('base64');
	const hasBody = req.method === 'PUT' || req.method === 'POST';

	let response;
	try {
		response = await fetch(
			`${NEXT_PUBLIC_WORDPRESS_URL}/?rest_route=/faustwp/v1/${path}${query}`,
			{
				method: req.method,
				headers: {
					Authorization: `Basic ${credentials}`,
					'Content-Type': 'application/json',
				},
				body: hasBody ? JSON.stringify(req.body) : undefined,
			},
		);
	} catch (error) {
		return res
			.status(502)
			.json({ message: `Could not reach WordPress: ${error.message}` });
	}

	// Pass WordPress's status and body through, including 404 for a document
	// that doesn't exist yet and 409 for a stale write.
	res.status(response.status);
	res.setHeader('Content-Type', 'application/json');
	return res.send(await response.text());
}
