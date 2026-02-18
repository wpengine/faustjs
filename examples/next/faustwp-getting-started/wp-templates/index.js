import dynamic from 'next/dynamic';

const category = dynamic(() => import('./category.js'), {
	loading: () => <p>Loading Category Template...</p>,
});

const tag = dynamic(() => import('./tag.js'), {
	loading: () => <p>Loading Tag Template...</p>,
});

const frontPage = dynamic(() => import('./front-page.js'), {
	loading: () => <p>Loading Front Page Template...</p>,
});

const page = dynamic(() => import('./page.js'), {
	loading: () => <p>Loading Page Template...</p>,
});

const single = dynamic(() => import('./single.js'), {
	loading: () => <p>Loading Single Post Template...</p>,
});

export default {
	category,
	tag,
	'front-page': frontPage,
	page,
	single,
};
