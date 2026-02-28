import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string().transform((str) => new Date(str)),
    featured: z.boolean().default(false),
    tags: z.array(z.string()),
    role: z.string(),
    stack: z.array(z.string()),
    summary: z.string(),
    problem: z.string(),
    approach: z.string(),
    results: z.string(),
    links: z.object({
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
      paper: z.string().url().optional(),
    }).optional(),
    coverImage: z.string().optional(),
  })
});

export const collections = {
  'projects': projectsCollection,
};
