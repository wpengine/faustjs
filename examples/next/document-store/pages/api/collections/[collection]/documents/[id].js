// Forwards document reads and writes to the FaustWP document store,
// authenticating with an Application Password so the credentials never reach
// the browser.

const COLLECTION_PATTERN = /^[a-z0-9-]{1,64}$/;
const ID_PATTERN = /^[a-z0-9-]{1,190}$/;

export default async function handler(req, res) {
	if (req.method !== 'GET' && req.method !== 'PUT') {
		res.setHeader('Allow', 'GET, PUT');
		return res.status(405).json({ message: 'Method not allowed.' });
	}

	const { collection, id } = req.query;
	if (!COLLECTION_PATTERN.test(collection) || !ID_PATTERN.test(id)) {
		return res
			.status(400)
			.json({ message: 'Use lowercase letters, numbers and hyphens.' });
	}

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

	let response;
	try {
		response = await fetch(
			`${NEXT_PUBLIC_WORDPRESS_URL}/?rest_route=/faustwp/v1/collections/${collection}/documents/${id}`,
			{
				method: req.method,
				headers: {
					Authorization: `Basic ${credentials}`,
					'Content-Type': 'application/json',
				},
				body: req.method === 'PUT' ? JSON.stringify(req.body) : undefined,
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
