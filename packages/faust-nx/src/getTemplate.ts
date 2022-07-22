import { WordPressTemplate } from './getWordPressProps';
import { SeedNode } from './queries/seedQuery';

export function getPossibleTemplates(node: SeedNode) {
  const possibleTemplates = [];

  // Archive Page
  if (node.isTermNode) {
    const taxonomyName = node.taxonomyName;

    switch (taxonomyName) {
      case 'category': {
        possibleTemplates.push(`category-${node.slug}`);
        possibleTemplates.push(`category-${node.databaseId}`);
        possibleTemplates.push(`category`);

        break;
      }
      case 'post_tag': {
        possibleTemplates.push(`tag-${node.slug}`);
        possibleTemplates.push(`tag-${node.databaseId}`);
        possibleTemplates.push(`tag`);

        break;
      }
      default: {
        possibleTemplates.push(`taxonomy-${taxonomyName}-${node.slug}`);
        possibleTemplates.push(`taxonomy-${taxonomyName}-${node.databaseId}`);
        possibleTemplates.push(`taxonomy-${taxonomyName}`);
        possibleTemplates.push(`taxonomy`);
      }
    }

    possibleTemplates.push(`archive`);
  }

  if (node.userId) {
    possibleTemplates.push(`author-${node.name}`);
    possibleTemplates.push(`author-${node.userId}`);
    possibleTemplates.push(`author`);
    possibleTemplates.push(`archive`);
  }

  // Singular page
  if (node.isContentNode) {
    if (node?.contentType?.node?.name === 'page') {
      possibleTemplates.push(`page-${node.slug}`);
      possibleTemplates.push(`page-${node.databaseId}`);
      possibleTemplates.push(`page`);
    }

    if (node?.contentType?.node?.name === 'post') {
      possibleTemplates.push(
        `single-${node.contentType.node.name}-${node.slug}`,
      );
      possibleTemplates.push(`single-${node.contentType.node.name}`);
      possibleTemplates.push(`single`);
    }

    possibleTemplates.push(`singular`);
  }

  possibleTemplates.push('index');

  return possibleTemplates;
}

export function getTemplate(
  seedNode: SeedNode,
  templates: { [key: string]: WordPressTemplate },
) {
  const possibleTemplates = getPossibleTemplates(seedNode);
  console.log('possible templates: ', possibleTemplates);

  for (let i = 0; i < possibleTemplates.length; i++) {
    const possibleTemplate = possibleTemplates[i];
    if (templates[possibleTemplate]) {
      return templates[possibleTemplate];
    }
  }

  return null;
}
