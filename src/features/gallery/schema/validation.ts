import * as z from 'zod';

const validation = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  images: z
    .array(
      z.object({
        id: z.string(),
        file: z.any().optional(),
        url: z.string().optional(),
        caption: z.string().optional(),
        alt: z.string().min(1, 'Alt text is required'),
      })
    )
    .min(1, 'At least one image is required'),
  status: z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']),
  scheduledAt: z.string().optional().nullable(),
});

export default validation;
