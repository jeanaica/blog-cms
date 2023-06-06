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
      .refine(file => {
        if (typeof file !== 'undefined' && typeof file !== 'string' && file) {
          return file?.size >= MAX_FILE_SIZE;
        }
        return true;
      }, `Max image size is 10MB.`)
      .refine(file => {
        if (
          typeof file !== 'undefined' &&
          typeof file !== 'string' &&
          file &&
          file?.size >= MAX_FILE_SIZE
        ) {
          return ACCEPTED_IMAGE_TYPES.includes(file.type);
        }
        return true;
      }, 'Only .jpg, .jpeg, and .png formats are supported.')
      .or(z.string())
      .optional(),
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
