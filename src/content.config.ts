import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
const localeSchema = z.enum(["en", "fr"]);

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/blog",
  }),

  schema: z.object({
    translationKey: z
      .string()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Translation key must contain only lowercase letters, numbers, and hyphens",
      ),
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
    socialImage: z.string().optional(),
  }),
});

const about = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/about",
  }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  blog,
  about,
};

export type Locale = z.infer<typeof localeSchema>;
