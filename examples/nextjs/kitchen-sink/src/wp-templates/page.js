import { GET_LAYOUT } from '@/queries/getLayout';
import { GET_PAGE } from '@/queries/getPage';
import Head from 'next/head';

export default function PageTemplate({ queriesData }) {
	const { getPage } = queriesData || {};
	const { title, content, featuredImage } = getPage?.data?.page || {};

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>

			<article className="max-w-2xl px-6 py-24 mx-auto space-y-12 ">
				<div className="w-full mx-auto space-y-4 text-center">
					<h1 className="text-4xl font-bold leading-tight md:text-5xl">
						{title}
					</h1>
				</div>

				{featuredImage && (
					<img
						src={featuredImage?.node?.sourceUrl}
						alt=""
						className="w-full h-72 object-cover rounded-lg mb-4"
					/>
				)}

				<div
					className="text-gray-800"
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</article>
		</>
	);
}

export const queries = [
	{
		name: 'getLayout',
		query: GET_LAYOUT,
	},
	{
		name: 'getPage',
		query: GET_PAGE,
		variables: ({ databaseId }, ctx) => ({
			databaseId,
			asPreview: ctx?.asPreview,
		}),
	},
];
