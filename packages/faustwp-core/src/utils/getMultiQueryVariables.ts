import { FaustTemplateProps } from '../components/WordPressTemplate';

/**
 * Utility function to get the query variables for a specific query index.
 *
 * @param queryIndex The index of the query.
 * @param props The Faust template props.
 * @returns {Object} The query variables for the specified query index.
 */
export function getMultiQueryVariables(
	queryIndex: number,
	props: FaustTemplateProps<
		any | null,
		{ __TEMPLATE_MULTI_QUERY_VARIABLES__: any[]; [key: string]: any }
	>,
) {
	const multiQueryVariables = props?.__TEMPLATE_MULTI_QUERY_VARIABLES__;

	return multiQueryVariables?.[queryIndex];
}
