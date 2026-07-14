import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		// "personal" posts get their own page here. "nextrope" posts live on the
		// company blog (externalUrl) and only ever appear as an expandable
		// summary on the list page — no local page is generated for them.
		source: z.enum(["personal", "nextrope"]).default("personal"),
		externalUrl: z.string().url().optional(),
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
