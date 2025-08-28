export const load = async (event) => {
	const { data } = event;

	const template = await import(`$wp/${data.templateData.template.id}.svelte`);

	return {
		...data,
		template: template.default,
	};
};
