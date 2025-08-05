/**
 * @file Reusable content collection loader for WordPress templates
 */

import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { z } from 'astro:content';

/**
 * @typedef {Object} TemplateLoaderOptions
 * @property {string} [templatePath="wp-templates"] - Path to template files relative to src/pages
 * @property {string} [srcDir="src"] - Source directory path
 * @property {string} [pagesDir="pages"] - Pages directory path relative to srcDir
 * @property {string} [fileExtension=".astro"] - Template file extension
 */

/**
 * Schema for template collection entries
 */
export const templateSchema = z.object({
	id: z.string(),
	path: z.string(),
});

/**
 * Create a template loader for Astro content collections (internal function)
 * @param {TemplateLoaderOptions} [options={}] - Loader configuration options
 * @returns {Function} Astro content collection loader function
 */
function createTemplateLoader(options = {}) {
	const {
		templatePath = 'wp-templates',
		srcDir = 'src',
		pagesDir = 'pages',
		fileExtension = '.astro',
	} = options;

	/**
	 * Content collection loader function
	 * @returns {Promise<Array<{id: string, path: string}>>} Array of template entries
	 */
	return async function templateLoader() {
		const fullTemplatePath = join(srcDir, pagesDir, templatePath);

		try {
			const files = await readdir(fullTemplatePath);

			return files
				.filter((file) => file.endsWith(fileExtension))
				.map((file) => {
					const slug = file.replace(fileExtension, '');

					if (slug === 'index') {
						return {
							id: slug,
							path: join(templatePath, '/'),
						};
					}

					return {
						id: slug,
						path: join(templatePath, slug),
					};
				});
		} catch (error) {
			console.warn(
				`Template loader: Could not read directory ${fullTemplatePath}:`,
				error.message,
			);
			return [];
		}
	};
}

/**
 * Create a complete template collection configuration with loader and schema
 * @param {TemplateLoaderOptions} [options={}] - Loader configuration options
 * @returns {Object} Complete Astro content collection configuration
 */
export function createTemplateCollection(options = {}) {
	return {
		loader: createTemplateLoader(options),
		schema: templateSchema,
	};
}
