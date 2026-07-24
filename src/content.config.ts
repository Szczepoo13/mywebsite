import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		// "personal" posts are mine; "nextrope" posts are the company blog.
		// A post gets its own local page unless it has an externalUrl (e.g. a
		// personal post published on Paragraph, or any Nextrope post), in which
		// case it only ever appears as an expandable summary linking out.
		source: z.enum(["personal", "nextrope"]).default("personal"),
		externalUrl: z.string().url().optional(),
		// Where an externalUrl post actually lives, e.g. "Nextrope" or "Paragraph".
		// Used for the "Read on {platform} →" link label.
		platform: z.string().optional(),
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
		// When set, groups this project with others sharing the same value into
		// a single "Research Paper" box on the projects index, instead of it
		// appearing as a standalone card.
		researchPaper: z.string().optional(),
		// Optional link (e.g. arXiv) the research paper's title points to.
		researchPaperUrl: z.string().url().optional(),
		// Overrides date-based sorting within a project's group/box on the
		// projects index. Lower numbers come first; unset projects keep their
		// date-sorted position after any ordered ones.
		order: z.number().optional(),
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
		// Use one or the other: description for a short paragraph, highlights
		// for a tight bullet list of what the work technically consisted of.
		description: z.string().optional(),
		highlights: z.array(z.string()).optional(),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { blog, projects, publications };
