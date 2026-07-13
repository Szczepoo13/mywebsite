import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		repo: z.string().url().optional(),
		url: z.string().url().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

const publications = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
	schema: z.object({
		title: z.string(),
		authors: z.string(),
		venue: z.string(),
		date: z.coerce.date(),
		url: z.string().url().optional(),
	}),
});

export const collections = { blog, projects, publications };
