import * as z from 'zod';

const imageSchema = z.object({
  url: z.string().optional(),
  alt: z.string().min(1, 'Alt text is required'),
  caption: z.string().nullish(),
});

const validation = z.object({
  text: z.string().min(1, { message: 'Text is required' }),
  isQuote: z.boolean(),
  status: z.enum(['draft', 'published', 'scheduled']),
  tags: z.string().array().optional(),
  tagsInput: z.string().optional(),
  image: z.preprocess(
    val => {
      if (!val || typeof val !== 'object') return null;
      const obj = val as Record<string, unknown>;
      if (!obj.url && !obj.alt) return null;
      return val;
    },
    imageSchema.nullable().optional()
  ),
  imageFile: z.any().nullable().optional(),
  publishDate: z.string().nullable().optional(),
});

export default validation;
