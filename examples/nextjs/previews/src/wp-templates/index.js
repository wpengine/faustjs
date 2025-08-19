import dynamic from 'next/dynamic';

const single = dynamic(() => import('./single.js'), {
	loading: () => <p>Loading Single Template...</p>,
});

const page = dynamic(() => import('./page.js'), {
	loading: () => <p>Loading Page Template...</p>,
});

const archive = dynamic(() => import('./archive.js'), {
	loading: () => <p>Loading Archive Template...</p>,
});

const home = dynamic(() => import('./home.js'), {
	loading: () => <p>Loading Index Template...</p>,
});

export default { single, page, archive, home };
