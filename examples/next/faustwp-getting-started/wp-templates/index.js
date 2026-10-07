import dynamic from 'next/dynamic';
import { default as FrontPage } from './front-page.js';

const category = dynamic(() => import('./category.js'));
const tag = dynamic(() => import('./tag.js'));
const page = dynamic(() => import('./page.js'));
const single = dynamic(() => import('./single.js'));

export default {
	category,
	tag,
	'front-page': FrontPage,
	page,
	single,
};
