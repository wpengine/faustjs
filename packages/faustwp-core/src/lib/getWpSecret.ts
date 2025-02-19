export function getWpSecret() {
	return process.env.FAUST_SECRET_KEY || process.env.FAUSTWP_SECRET_KEY;
}
