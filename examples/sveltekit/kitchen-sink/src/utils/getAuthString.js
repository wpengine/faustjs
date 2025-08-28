// Forming the authentication string for WordPress App Password
// More info: https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/

export const getAuthString = () =>
	'Basic ' +
	Buffer.from(
		import.meta.env.WP_USERNAME + ':' + import.meta.env.WP_APP_PASSWORD,
	).toString('base64');
