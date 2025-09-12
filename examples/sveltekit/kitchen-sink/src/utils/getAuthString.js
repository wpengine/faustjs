import { WP_APP_PASSWORD } from '$env/static/private';
import { WP_USERNAME } from '$env/static/private';

// Forming the authentication string for WordPress App Password
// More info: https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/

export const getAuthString = () =>
	'Basic ' +
	Buffer.from(WP_USERNAME + ':' + WP_APP_PASSWORD).toString('base64');
