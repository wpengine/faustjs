import { defaultIronOptions } from '@faustjs/auth';

export const sessionConfig = {
	...defaultIronOptions,
	password: process.env.SESSION_PASSWORD,
	cookieName: 'faust-auth',
};
