import { gql } from 'graphql-tag';

/**
 * @type {import('graphql').DocumentNode}
 */
export const SEED_QUERY = gql`
	query GetSeedNode(
		$id: ID! = 0
		$uri: String! = ""
		$asPreview: Boolean = false
	) {
		... on RootQuery @skip(if: $asPreview) {
			nodeByUri(uri: $uri) {
				__typename
				...GetNode
			}
		}
		... on RootQuery @include(if: $asPreview) {
			contentNode(id: $id, idType: DATABASE_ID, asPreview: true) {
				__typename
				...GetNode
			}
		}
	}

	fragment GetNode on UniformResourceIdentifiable {
		__typename
		uri
		id
		...DatabaseIdentifier
		...ContentType
		...User
		...TermNode
		...ContentNode
		...MediaItem
		...Page
	}

	fragment DatabaseIdentifier on DatabaseIdentifier {
		databaseId
	}

	fragment MediaItem on MediaItem {
		id
		mimeType
	}

	fragment ContentType on ContentType {
		name
		isFrontPage
		isPostsPage
	}

	fragment Page on Page {
		isFrontPage
		isPostsPage
	}

	fragment TermNode on TermNode {
		isTermNode
		slug
		taxonomyName
	}

	fragment ContentNode on ContentNode {
		isContentNode
		slug
		contentType {
			node {
				name
			}
		}
		template {
			templateName
		}
	}

	fragment User on User {
		name
		userId
		databaseId
	}
`;
