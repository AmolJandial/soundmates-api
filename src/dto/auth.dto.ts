import { z } from 'zod';

const authSchema = z.object({
  phoneNumber: z.string(),
});

export type AuthDto = z.infer<typeof authSchema>;
