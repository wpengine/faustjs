// Reads, writes and deletes one document.

import {
	COLLECTION_PATTERN,
	ID_PATTERN,
	forwardToWordPress,
	numericQuery,
	rejectMethod,
} from '../../../../../lib/wordpress';

export default async function handler(req, res) {
	if (rejectMethod(req, res, ['GET', 'PUT', 'DELETE'])) {
		return;
	}

	const { collection, id } = req.query;
	if (!COLLECTION_PATTERN.test(collection) || !ID_PATTERN.test(id)) {
		return res
			.status(400)
			.json({ message: 'Use lowercase letters, numbers and hyphens.' });
	}

	// A delete sends the version it's based on as a query parameter.
	return forwardToWordPress(
		req,
		res,
		`collections/${collection}/documents/${id}`,
		numericQuery(req.query, ['version']),
	);
}
