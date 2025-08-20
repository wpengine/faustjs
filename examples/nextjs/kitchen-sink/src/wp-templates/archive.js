import { GET_LAYOUT } from '@/queries/getLayout';
import { GET_ARCHIVE } from '@/queries/getArchive';
import Head from 'next/head';

export default function CategoryTemplate({ queriesData }) {
	const { getCategory } = queriesData || {};
	const categoryData = getCategory?.data?.nodeByUri;
	const { posts, name } = categoryData || {};

	return (
		<>
			<Head>
				<title>{name}</title>
			</Head>

			<div className="container max-w-4xl py-6 mx-auto">
				<h1 className="mb-4 text-2xl font-bold">{name}</h1>

				{posts?.edges?.map((item) => {
					const post = item.node;

					return (
						<article
							key={post.id}
							className="mb-8 p-6 border border-gray-200 rounded-lg">
							<h2 className="text-xl font-semibold mb-2">
								<a href={post.uri} className="hover:text-blue-600">
									{post.title}
								</a>
							</h2>

							{post.featuredImage && (
								<img
									src={post.featuredImage.node.sourceUrl}
									alt={post.featuredImage.node.altText || post.title}
									className="w-full h-48 object-cover rounded mb-4"
								/>
							)}

							<div className="text-gray-600 mb-2">
								By {post.author.node.name} on{' '}
								{new Date(post.date).toLocaleDateString()}
							</div>

							<div
								className="text-gray-800"
								dangerouslySetInnerHTML={{ __html: post.content }}
							/>
						</article>
					);
				})}
			</div>
		</>
	);
}

export const queries = [
	{
		name: 'getLayout',
		query: GET_LAYOUT,
	},
	{
		name: 'getCategory',
		query: GET_ARCHIVE,
		variables: ({ uri }) => ({
			uri,
		}),
	},
];
