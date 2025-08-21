declare namespace App {
	interface Locals {
		templateData?: import('./lib/templateHierarchy').TemplateData;
		isPreview?: boolean;
		client?: import('./lib/types').GraphQLClient;
	}
}
