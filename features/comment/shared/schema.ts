import * as z from 'zod';

const schema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  content: z.string().min(1, { message: 'Required' }),
  slug: z
    .string()
    .min(1, { message: 'Required' })
    .max(60, 'Maximum length: 60 characters'),
  description: z
    .string()
    .min(70, { message: 'Minimum length: 70 characters' })
    .max(155, 'Maximum length: 155 characters'),
  banner: z.string().min(1, { message: 'Required' }),
  author: z.string().min(1, { message: 'Required' }),
  postDate: z.string().min(1, { message: 'Required' }),
  category: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .array(),
  tags: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .array(),
});

export default schema;
