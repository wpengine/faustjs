import { BlogPostItem } from '@/components/BlogPostItem';
import { GET_POSTS } from '@/queries/getPosts';
import Head from 'next/head';

export default function HomeTemplate({ queriesData }) {
	const { getPosts } = queriesData || {};
	const posts = getPosts?.data?.posts;

	return (
		<>
			<Head>
				<title>{'Home'}</title>
			</Head>

			{posts?.edges?.map((item) => {
				const post = item.node;

				return <BlogPostItem key={post.id} post={post} />;
			})}
		</>
	);
}

export const queries = [
	{
		name: 'getPosts',
		query: GET_POSTS,
	},
];
