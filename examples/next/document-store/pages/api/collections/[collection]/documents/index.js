// Lists a collection's documents and adds documents with generated IDs.

import {
	COLLECTION_PATTERN,
	forwardToWordPress,
	numericQuery,
	rejectMethod,
} from '../../../../../lib/wordpress';

export default async function handler(req, res) {
	if (rejectMethod(req, res, ['GET', 'POST'])) {
		return;
	}

	const { collection } = req.query;
	if (!COLLECTION_PATTERN.test(collection)) {
		return res
			.status(400)
			.json({ message: 'Use lowercase letters, numbers and hyphens.' });
	}

	return forwardToWordPress(
		req,
		res,
		`collections/${collection}/documents`,
		numericQuery(req.query, ['limit', 'cursor']),
	);
}
