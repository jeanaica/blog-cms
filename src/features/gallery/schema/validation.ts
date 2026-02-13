import * as z from 'zod';

const imageSchema = z
  .object({
    id: z.string().optional(),
    file: z.any().optional(),
    url: z.string().optional(),
    alt: z.string().min(1, 'Alt text is required'),
    caption: z.string().optional(),
  })
  .refine(data => data.file || data.url, {
    message: 'Image is required',
    path: ['file'],
  });

const validation = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  images: imageSchema.array().min(1, 'At least one image is required'),
  status: z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']),
  scheduledAt: z.string().nullable().optional(),
});

export default validation;
