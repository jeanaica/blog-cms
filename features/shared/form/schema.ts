import * as z from 'zod';

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

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
  banner: z
    .any()
    .refine(file => file?.size >= MAX_FILE_SIZE, `Max image size is 10MB.`)
    .refine(file => {
      if (file) {
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      }
    }, 'Only .jpg, .jpeg, and .png formats are supported.'),
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
