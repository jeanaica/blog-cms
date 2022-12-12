import * as z from 'zod';

const schema = z.object({
  postId: z.string().min(1, { message: 'Required' }),
  postTitle: z.string().min(1, { message: 'Required' }),
  comment: z
    .string()
    .min(70, { message: 'Minimum length: 70 characters' })
    .max(155, 'Maximum length: 155 characters'),
});

export default schema;
