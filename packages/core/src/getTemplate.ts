import { WordPressTemplate } from './getWordPressProps.js';
import { SeedNode } from './queries/seedQuery.js';
import { hooks } from './hooks/index.js';

export function getPossibleTemplates(node: SeedNode) {
  let possibleTemplates: string[] = [];

  // Front page
  if (node.isFrontPage) {
    possibleTemplates.push('front-page');
  }

  // Blog page
  if (node.isPostsPage) {
    possibleTemplates.push('home');
  }

  // CPT archive page
  // eslint-disable-next-line no-underscore-dangle
  if (node.__typename === 'ContentType' && node.isPostsPage === false) {
    if (node.name) {
      possibleTemplates.push(`archive-${node.name}`);
    }

    possibleTemplates.push('archive');
  }

  // Archive Page
  if (node.isTermNode) {
    const { taxonomyName } = node;

    switch (taxonomyName) {
      case 'category': {
        if (node.slug) {
          possibleTemplates.push(`category-${node.slug}`);
        }

        if (node.databaseId) {
          possibleTemplates.push(`category-${node.databaseId}`);
        }

        possibleTemplates.push(`category`);

        break;
      }
      case 'post_tag': {
        if (node.slug) {
          possibleTemplates.push(`tag-${node.slug}`);
        }

        if (node.databaseId) {
          possibleTemplates.push(`tag-${node.databaseId}`);
        }

        possibleTemplates.push(`tag`);

        break;
      }
      default: {
        if (taxonomyName) {
          if (node.slug) {
            possibleTemplates.push(`taxonomy-${taxonomyName}-${node.slug}`);
          }

          if (node.databaseId) {
            possibleTemplates.push(
              `taxonomy-${taxonomyName}-${node.databaseId}`,
            );
          }

          possibleTemplates.push(`taxonomy-${taxonomyName}`);
        }

        possibleTemplates.push(`taxonomy`);
      }
    }

    possibleTemplates.push(`archive`);
  }

  if (node.userId) {
    if (node.name) {
      possibleTemplates.push(`author-${node.name?.toLocaleLowerCase()}`);
    }

    possibleTemplates.push(`author-${node.userId}`);
    possibleTemplates.push(`author`);
    possibleTemplates.push(`archive`);
  }

  // Singular page
  if (node.isContentNode) {
    if (
      node?.contentType?.node?.name !== 'page' &&
      node?.contentType?.node?.name !== 'post'
    ) {
      if (node.contentType?.node?.name && node.slug) {
        possibleTemplates.push(
          `single-${node.contentType?.node?.name}-${node.slug}`,
        );
      }

      if (node.contentType?.node?.name) {
        possibleTemplates.push(`single-${node.contentType?.node?.name}`);
      }
    }

    if (node?.contentType?.node?.name === 'page') {
      if (node.slug) {
        possibleTemplates.push(`page-${node.slug}`);
      }

      if (node.databaseId) {
        possibleTemplates.push(`page-${node.databaseId}`);
      }

      possibleTemplates.push(`page`);
    }

    if (node?.contentType?.node?.name === 'post') {
      if (node.slug) {
        possibleTemplates.push(
          `single-${node.contentType.node.name}-${node.slug}`,
        );
      }

      possibleTemplates.push(`single-${node.contentType.node.name}`);
      possibleTemplates.push(`single`);
    }

    possibleTemplates.push(`singular`);
  }

  possibleTemplates.push('index');

  possibleTemplates = hooks.applyFilters(
    'possibleTemplatesList',
    possibleTemplates,
    { seedNode: node },
  ) as string[];

  return possibleTemplates;
}

export function getTemplate(
  seedNode: SeedNode | null | undefined,
  templates: { [key: string]: WordPressTemplate },
): WordPressTemplate | null {
  if (!seedNode) {
    return null;
  }

  const possibleTemplates = getPossibleTemplates(seedNode);
  // eslint-disable-next-line no-console
  console.log('possible templates: ', possibleTemplates);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < possibleTemplates.length; i++) {
    const possibleTemplate = possibleTemplates[i];
    if (templates[possibleTemplate]) {
      return templates[possibleTemplate];
    }
  }

  return null;
}
