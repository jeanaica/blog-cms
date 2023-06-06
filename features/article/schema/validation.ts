import * as z from 'zod';

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const validation = z
  .object({
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
    banner: z
      .any()
      .optional()
      // Separate functions because we need to make the field error more specific to file size
      .refine(
        file => !file || typeof file === 'string' || file.size <= MAX_FILE_SIZE,
        `Max image size is 10MB.`
      )
      // Separate functions because we need to make the field error more specific to file format
      .refine(
        file =>
          !file ||
          typeof file === 'string' ||
          (file.size <= MAX_FILE_SIZE &&
            ACCEPTED_IMAGE_TYPES.includes(file.type)),
        'Only .jpg, .jpeg, and .png formats are supported.'
      )
      .or(z.string()),
    imageAlt: z.string(),
    caption: z.string().optional(),
    author: z.string().min(1, { message: 'Required' }),
    scheduledAt: z.string(),
    category: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .array()
      .min(1, { message: 'Required' }),
    tags: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .array(),
  })
  .refine(data => !(data.banner && data.caption === ''), {
    path: ['caption'],
    message: 'Required',
  })
  .refine(data => !(data.banner && data.imageAlt === ''), {
    path: ['imageAlt'],
    message: 'Required',
  });

export default validation;
