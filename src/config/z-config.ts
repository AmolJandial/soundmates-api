import { z } from 'zod';

export function formatZodErrors(error: z.ZodError) {
  return error.issues[0].message;
}
