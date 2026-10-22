import { useEffect } from 'react';

/**
 * Add classes to the page's `<body>` while the component is mounted.
 *
 * The classes are removed when the component unmounts or the list changes.
 * If two components add the same class, the first to remove it removes it for
 * both.
 *
 * @param classes The classes to add.
 */
export function useBodyClass(classes: string[]): void {
	// Compare by value, so a new array with the same classes doesn't re-run the effect.
	const classNames = classes.filter(Boolean).join(' ');

	useEffect(() => {
		const list = classNames.split(' ').filter(Boolean);

		if (list.length === 0) {
			return undefined;
		}

		document.body.classList.add(...list);

		return () => {
			document.body.classList.remove(...list);
		};
	}, [classNames]);
}
