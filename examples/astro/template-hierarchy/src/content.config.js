import { defineCollection } from "astro:content";
import { createTemplateCollection } from "@faustjs/astro";

// Set up WordPress template collection
const templates = defineCollection(createTemplateCollection());

export const collections = { templates };
