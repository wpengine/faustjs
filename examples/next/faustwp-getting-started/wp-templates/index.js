import dynamic from 'next/dynamic';
import { default as FrontPage } from './front-page.js';

const category = dynamic(() => import('./category.js'), {
	loading: () => <p>Loading Category Template...</p>,
	ssr: false,
});

const tag = dynamic(() => import('./tag.js'), {
	loading: () => <p>Loading Tag Template...</p>,
	ssr: false,
});

const page = dynamic(() => import('./page.js'), {
	loading: () => <p>Loading Page Template...</p>,
	ssr: false,
});

const single = dynamic(() => import('./single.js'), {
	loading: () => <p>Loading Single Post Template...</p>,
	ssr: false,
});

export default {
	category,
	tag,
	'front-page': FrontPage,
	page,
	single,
};
