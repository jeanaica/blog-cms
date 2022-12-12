import * as z from 'zod';

const schema = z.object({
  postId: z.string().min(1, { message: 'Required' }),
  postTitle: z.string().min(1, { message: 'Required' }),
  comment: z.string().min(4, { message: 'Minimum length: 4 characters' }),
});

export default schema;
